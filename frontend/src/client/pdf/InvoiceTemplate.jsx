import { useSelector } from "react-redux";


export default function InvoiceTemplate() {
    const cartItems = useSelector((state) => state.cart);
    const auth = useSelector((state) => state.session);

    console.log(cartItems);
    return (
        <div className="invoice bg-white rounded-lg shadow-lg px-8 py-10 max-w-xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                    <img className="w-[250px] h-[60px]" src="https://res.cloudinary.com/dddrzjxb0/image/upload/v1717300092/cvttatjjgopfffjvguju.png" alt="logo" />
                </div>
                <div className="text-gray-700">
                    <div className="font-bold text-xl mb-2">INVOICE</div>
                    <div className="text-sm">Date: {new Date().toLocaleString() + ''}</div>

                </div>
            </div>
            <div className="border-b-2 border-gray-300 pb-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">Bill To:</h2>
                <div className="text-gray-700 mb-2">{auth && auth.stateAuth.user_name}</div>
                <div className="text-gray-700 mb-2">{auth && auth.stateAuth.user_address}</div>
                <div className="text-gray-700">{auth && auth.stateAuth.user_email}</div>
            </div>
            <table className="w-full text-left mb-8">
                <thead>
                    <tr>
                        <th className="text-gray-700 font-bold uppercase py-2">Description</th>
                        <th className="text-gray-700 font-bold uppercase py-2">Quantity</th>
                        <th className="text-gray-700 font-bold uppercase py-2">Price</th>
                        <th className="text-gray-700 font-bold uppercase py-2">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems && cartItems.cartItems.map((item, index) => (
                        <tr key={index}>
                            <td className="text-xs py-4 text-gray-700">{item.product_name}</td>
                            <td className="text-xs py-4 text-gray-700">{item.cartQuantity}</td>
                            <td className="text-xs py-4 text-gray-700">Rp{item.product_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</td>
                            <td className="text-xs py-4 text-gray-700">Rp{item.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-end mb-8">
                <div className="text-gray-700 mr-2">Subtotal:</div>
                <div className="text-gray-700">Rp{cartItems && cartItems.cartTotalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</div>
            </div>
            <div className="flex justify-end mb-8">
                <div className="text-gray-700 mr-2">Total:</div>
                <div className="text-gray-700 font-bold text-xl">Rp{cartItems && cartItems.cartTotalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</div>
            </div>
            <div className="border-t-2 border-gray-300 pt-8 mb-8">
                <div className="text-gray-700 mb-2">Payment is due within 30 days. Late payments are subject to fees.</div>
                <div className="text-gray-700 mb-2">Please make checks payable to Your Company Name and mail to:</div>
                <div className="text-gray-700">123 Main St., Anytown, USA 12345</div>
            </div>
        </div>
    );
}

