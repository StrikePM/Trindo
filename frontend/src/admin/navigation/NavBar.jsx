import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { meFetch, sessionDelete } from "../../slices/sliceAuth";
import { useEffect } from "react";

const NavBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.session);

    useEffect(() => {
        dispatch(meFetch());
    }, [dispatch]);

    const handleCartPage = (e) => {
        e.preventDefault();
        navigate("/cart");
    }

    const handleAdminPage = (e) => {
        e.preventDefault();
        navigate("/admin/products");
    }

    const handleLogout = async (e) => {
        e.preventDefault();

        await dispatch(sessionDelete());
        navigate("/login");
    }

    return (
        <nav className="fixed z-10 bg-white border-gray-200 dark:bg-gray-900 w-full h-[90px] border-b-[2px] shadow-md">
            <div className="max-w-screen flex flex-wrap items-center justify-between p-4 h-full ">
                <Link to="/">
                    <img src="https://res.cloudinary.com/dddrzjxb0/image/upload/v1717300092/cvttatjjgopfffjvguju.png" className="h-[60px] mr-3" alt="Flowbite Logo" />
                </Link>

                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0  border border-gray-100 rounded-lg bg-transparent md:flex-row md:space-x-8 md:mt-0 md:border-0">
                        {auth.status == "success" && auth.stateAuth.user_role == "admin" ? (
                            <div className="flex flex-row">
                                <li className="mr-[15px]">
                                    <button type="button" onClick={handleCartPage} className="hover:-translate-y-0 hover:scale-110 hover:text-red-500 duration-100 active:scale-100 active:text-black">
                                        Cart
                                    </button>
                                </li>
                                <li className="mr-[15px]">
                                    <button type="button" onClick={handleAdminPage} className="hover:-translate-y-0 hover:scale-110 hover:text-red-500 duration-100 active:scale-100 active:text-black">
                                        Admin
                                    </button>
                                </li>
                                <li>
                                    <button type="button" onClick={handleLogout} className="hover:-translate-y-0 hover:scale-110 hover:text-red-500 duration-100 active:scale-100 active:text-black">
                                        Logout
                                    </button>
                                </li>
                            </div>
                        ) : auth.status == "rejected" ? (
                            <div className="flex flex-row">
                                <li className="mr-[15px]">
                                    <Link to="/login">
                                        <button type="button" className="hover:-translate-y-0 hover:scale-110 hover:text-red-500 duration-100 active:scale-100 active:text-black">
                                            Login
                                        </button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/register">
                                        <button type="button" className="hover:-translate-y-0 hover:scale-110 hover:text-red-500 duration-100 active:scale-100 active:text-black">
                                            Register
                                        </button>
                                    </Link>
                                </li>
                            </div>
                        ) : (
                            <div className="flex flex-row">
                                <li className="mr-[15px]">
                                    <button type="button" onClick={handleCartPage} className="hover:-translate-y-0 hover:scale-110 hover:text-red-500 duration-100 active:scale-100 active:text-black">
                                        Cart
                                    </button>
                                </li>
                                <li>
                                    <button type="button" onClick={handleLogout} className="hover:-translate-y-0 hover:scale-110 hover:text-red-500 duration-100 active:scale-100 active:text-black">
                                        Logout
                                    </button>
                                </li>
                            </div>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;