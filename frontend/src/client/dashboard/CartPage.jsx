import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addToCart, clearCart, decreaseCart, getTotals, removeFromCart } from "../../slices/sliceCart";
import { useEffect, useRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import InvoiceTemplate from "../pdf/InvoiceTemplate";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { processTransaction, transactionCreate, transactionFetch } from "../../slices/sliceTransaction";

export default function CartPage() {
    const cart = useSelector((state) => state.cart);
    const auth = useSelector((state) => state.session);
    const transaction = useSelector((state) => state.transaction);
    const { stateProducts } = useSelector((state) => state.products);

    const [token, setToken] = useState("");
    const [showDialog, setShowDialog] = useState(false);
    const [loader, setLoader] = useState(false);
    const [transFetch, setTransFetch] = useState(false);
    const [checkoutTrigger, setCheckoutTrigger] = useState(false);
    const [checkoutProcessTrigger, setCheckoutProcessTrigger] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const invoiceRef = useRef(null);

    const userTransactions = transaction.stateTransaction
        .filter(item => item.user_id === auth.stateAuth.user_id);

    const latestTransactions = userTransactions
        .sort((a, b) => b.transaction_id - a.transaction_id)
        .slice(0, cart.cartItems.length);

    console.log(latestTransactions);

    useEffect(() => {
        dispatch(getTotals());
    }, [cart, dispatch]);

    useEffect(() => {
        dispatch(transactionFetch());
    }, [transaction.stateRefreshTrans]);

    useEffect(() => {
        setTransFetch(transaction);
    }, [dispatch]);

    useEffect(() => {
        console.log(transaction);
        const handleCheckoutTrigger = async () => {
            if (checkoutTrigger) {
                await dispatch(processTransaction({
                    cart, auth, latestTransactions
                }));
                setCheckoutProcessTrigger(true);
            }
        };

        handleCheckoutTrigger();
    }, [checkoutTrigger]);

    useEffect(() => {
        if (checkoutProcessTrigger == true) {
            console.log(transaction.stateTransactionToken);
            setToken(transaction.stateTransactionToken);
        }
    }, [checkoutProcessTrigger]);

    useEffect(() => {
        console.log(token);
        if (token != "") {
            window.snap.pay(transaction.stateTransactionToken, {
                onSuccess: (result) => {
                    localStorage.setItem("Pembayaran", JSON.stringify(result));
                    setToken("");
                    setCheckoutTrigger(false);
                    setCheckoutProcessTrigger(false);
                },
                onPending: (result) => {
                    localStorage.setItem("Pembayaran", JSON.stringify(result));
                    setToken("");
                    setCheckoutTrigger(false);
                    setCheckoutProcessTrigger(false);
                },
                onError: (error) => {
                    console.log(error);
                    setToken("");
                    setCheckoutTrigger(false);
                    setCheckoutProcessTrigger(false);
                },
                onClose: () => {
                    console.log("Anda belum menyelesaikan pembayaran");
                    setToken("");
                    setCheckoutTrigger(false);
                    setCheckoutProcessTrigger(false);
                }
            })
        }
    }, [token]);

    useEffect(() => {
        const midtransUrl = process.env.REACT_APP_MIDTRANS_URL_SANDBOX;
        const midtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

        if (!midtransUrl || !midtransClientKey) {
            console.error('Midtrans URL or Client Key is not defined');
            return;
        }

        const scriptTag = document.createElement("script");
        scriptTag.src = midtransUrl;
        scriptTag.setAttribute("data-client-key", midtransClientKey);

        document.body.appendChild(scriptTag);
        return () => {
            document.body.removeChild(scriptTag);
        };
    }, []);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };
    const handleDecreaseCart = (product) => {
        dispatch(decreaseCart(product));
    };
    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product));
    };
    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleOpenInvoice = () => {
        setShowDialog(true);
    }
    const handleCloseInvoice = () => {
        setShowDialog(false);
    }

    const handleCheckout = async (cartItems) => {
        for (let i = 0; i < cartItems.cartTotalQuantity; i++) {
            const element = cartItems.cartItems[i];

            await dispatch(transactionCreate({
                transactionUser: auth.stateAuth.user_id,
                transactionProd: element.product_id,
                transactionQty: element.cartQuantity,
                transactionPrice: element.product_price,
                transactionTotal: element.totalPrice * element.cartQuantity,
                transactionDate: new Date().toLocaleString().split(',')[0],
                transactionStatus: "pending",
            }))
        }

        await dispatch(transactionFetch());

        setCheckoutTrigger(true);
    };

    const handleDownloadInvoice = () => {
        if (invoiceRef.current) {
            setLoader(true);
            html2canvas(invoiceRef.current, { allowTaint: true, useCORS: true }).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const doc = new jsPDF('p', 'mm', 'a4');
                const componentWidth = doc.internal.pageSize.getWidth();
                const componentHeight = doc.internal.pageSize.getHeight();
                doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
                setLoader(false);
                doc.save('receipt.pdf');
            }).catch(err => {
                console.error("Error capturing invoice: ", err);
                setLoader(false);
            });
        } else {
            console.error("Invoice element not found");
        }
    }

    console.log(cart.cartItems.length);
    console.log(transaction.stateTransactionToken);
    console.log(transFetch);
    console.log(new Date().toLocaleString().split(',')[0]);
    return (
        <div className="flex bg-white w-full h-full items-center justify-center py-[40px]">
            <div className="w-[900px] h-auto rounded-md overflow-hidden border-gray-200 border-[1px] shadow-md">
                <div className="flex w-full h-fit items-center justify-center border-b-[1px]">
                    <h2 className="text-2xl font-bold p-[20px]">Shopping Cart</h2>
                </div>
                {cart.cartItems.length === 0 ? (
                    <div className="flex w-full h-full">
                        <div className="flex flex-col w-full h-full     ">
                            <span className="mb-[10px]">Your cart is currently empty!</span>
                            <Link to="/">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    className="flex w-full bi bi-arrow-left justify-center"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                                    />
                                </svg>
                                <span className="font-bold">Start Shopping</span>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col w-full h-full p-[20px]">
                        <div className="flex w-full justify-between border-b-[1px] pb-[10px] mb-[10px]">
                            <h3 className="w-[40%] text-lg font-bold text-center">Product</h3>
                            <h3 className="w-[20%] text-lg font-bold text-center">Price</h3>
                            <h3 className="w-[20%] text-lg font-bold text-center">Quantity</h3>
                            <h3 className="w-[20%] text-lg font-bold text-center">Total</h3>
                        </div>
                        <div className="cart-items flex flex-col gap-[10px]">
                            {cart.cartItems &&
                                cart.cartItems.map((cartItem) => (
                                    <div className="cart-item flex w-full items-center border-b-[1px] pb-[10px] mb-[10px]" key={cartItem.product_id}>
                                        <div className="cart-product flex w-[40%] items-center">
                                            <Link to={"/product/" + cartItem.product_id}>
                                                <img className="w-[100px] h-[100px] object-fit" src={cartItem.product_image} alt={cartItem.product_name} />
                                            </Link>
                                            <div className="ml-[10px]">
                                                <h3 className="text-md font-semibold">{cartItem.product_name.split(' ').length > 6
                                                    ? cartItem.product_name.split(' ').slice(0, 6).join(' ') + ' ...'
                                                    : cartItem.product_name}
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    {cartItem.product_desc.split(' ').length > 6
                                                        ? cartItem.product_desc.split(' ').slice(0, 6).join(' ') + ' ...'
                                                        : cartItem.product_desc}
                                                </p>
                                                <button className="text-red-500 mt-[5px]" onClick={() => handleRemoveFromCart(cartItem)}>
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                        <div className="cart-product-price w-[20%] text-center">Rp{cartItem.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</div>
                                        <div className="cart-product-quantity w-[20%] text-center flex items-center justify-center">
                                            <button className="px-[5px] bg-gray-200 rounded" onClick={() => handleDecreaseCart(cartItem)}>
                                                -
                                            </button>
                                            <div className="px-[10px]">{cartItem.cartQuantity}</div>
                                            <button className="px-[5px] bg-gray-200 rounded" onClick={() => handleAddToCart(cartItem)}>+</button>
                                        </div>
                                        <div className="cart-product-total-price w-[20%] text-center">Rp{(cartItem.totalPrice * cartItem.cartQuantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</div>
                                    </div>
                                ))}
                        </div>
                        <div className="flex flex-row mt-[20px]">
                            <div className="flex flex-col w-[70%] h-full">
                                <button className="w-[150px] h-fit p-[10px] bg-red-700 hover:bg-red-600 active:bg-orange-600 active:scale-95 text-white font-bold rounded" onClick={handleClearCart}>
                                    Clear Cart
                                </button>
                                <button className="w-[150px] h-fit p-[10px] mt-[10px] bg-red-700 hover:bg-red-600 active:bg-orange-600 active:scale-95 text-white font-bold rounded"
                                    onClick={handleOpenInvoice}>Print Invoice
                                </button>
                            </div>
                            <div className="flex flex-col w-[30%]">
                                <div className="subtotal flex flex-col justify-between w-full mb-[10px]">
                                    <span className="text-lg font-bold text-center">Subtotal</span>
                                    <span className="text-lg font-bold text-center">Rp{cart.cartTotalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
                                </div>
                                <div>
                                    <button className="w-full h-fit p-[10px] bg-red-700 hover:bg-red-600 active:bg-orange-600 active:scale-95 text-white font-bold rounded"
                                        onClick={() => handleCheckout(cart)}>Proceed to Checkout</button>
                                </div>
                                <div className="continue-shopping mt-[10px]">
                                    <Link to="/" className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            fill="currentColor"
                                            className="bi bi-arrow-left mr-[5px]"
                                            viewBox="0 0 16 16"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                                            />
                                        </svg>
                                        <span>Continue Shopping</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Dialog
                open={showDialog}
                onClose={handleCloseInvoice}
                aria-labelledby="order-pdf-dialog-title"
                fullWidth
                maxWidth="md"
            >
                <DialogTitle id="order-pdf-dialog-title">Invoice PDF</DialogTitle>
                <DialogContent className="w-full h-[600px]">
                    {/* Render the PDF component here */}
                    <div ref={invoiceRef}>
                        <InvoiceTemplate />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDownloadInvoice} color="success">
                        Download
                    </Button>
                    <Button onClick={handleCloseInvoice} color="error">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}