import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../../slices/sliceCart";
import { useEffect, useState } from "react";
import { profileEdit, usersFetch } from "../../slices/sliceUsers";
import { meFetch } from "../../slices/sliceAuth";

export default function ProfilePage() {
    const auth = useSelector((state) => state.session);
    const user = useSelector((state) => state.users);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [nameUser, setNameUser] = useState("");
    const [addressUser, setAddressUser] = useState("");
    const [phoneUser, setPhoneUser] = useState("");

    // const selectedUser = user.stateUsers.find((item) => item.user_id === auth.stateAuth.user_id);

    useEffect(() => {
        if (auth) {
            setNameUser(auth.stateAuth.user_name);
            setAddressUser(auth.stateAuth.user_address);
            setPhoneUser(auth.stateAuth.user_phone);
        }
    }, [auth, user]);

    useEffect(() => {
        dispatch(meFetch());
    }, [user.stateRefreshUsers]);

    console.log(auth);

    const handleEditProfile = async (e) => {
        e.preventDefault();

        await dispatch(profileEdit({
            userName: nameUser,
            userAddress: addressUser,
            userPhone: phoneUser,
        }));
    }

    return (
        <div className="flex bg-white w-full h-full items-center justify-center py-[40px]">
            <div className="flex flex-col w-[500px] h-fit rounded-md overflow-hidden border-gray-200 border-[1px] shadow-md">
                <div className="flex flex-col w-full h-[30%] items-center justify-center py-[30px] border-b-[2px]">
                    <h1 className="text-xl font-bold">{nameUser}</h1>
                    <h1 className="text-md">{auth && auth.stateAuth.user_email}</h1>
                </div>
                <div className="w-full h-[70%]">
                    <form onSubmit={handleEditProfile} className="flex flex-col h-fit mx-[10px] my-[10px]">
                        <div className="mb-[5px]">
                            <label className="block mb-[5px] text-sm font-medium text-gray-900 dark:text-white">
                                Nama :
                            </label>
                            <div className="flex flex-row items-center justify-center">
                                <input
                                    className="w-[90%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    type="text"
                                    placeholder="Isi Nama Kategori"
                                    value={nameUser}
                                    onChange={(e) => setNameUser(e.target.value)}
                                    required
                                />
                                <svg className="w-[10%] h-[30px] text-black dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                                </svg>
                            </div>
                        </div>
                        <div className="mb-[5px]">
                            <label className="block mb-[5px] text-sm font-medium text-gray-900 dark:text-white">
                                Alamat :
                            </label>
                            <div className="flex flex-row items-center justify-center">
                                <input
                                    className="w-[90%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    type="text"
                                    placeholder="Isi Deskripsi Kategori"
                                    value={addressUser}
                                    onChange={(e) => setAddressUser(e.target.value)}
                                    required
                                />
                                <svg className="w-[10%] h-[30px] text-black dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                                </svg>
                            </div>
                        </div>
                        <div className="mb-[15px]">
                            <label className="block mb-[5px] text-sm font-medium text-gray-900 dark:text-white">
                                No Hp :
                            </label>
                            <div className="flex flex-row items-center justify-center">
                                <input
                                    className="w-[90%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    type="text"
                                    placeholder="Isi Deskripsi Kategori"
                                    value={phoneUser}
                                    onChange={(e) => setPhoneUser(e.target.value)}
                                    required
                                />
                                <svg className="w-[10%] h-[30px] text-black dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                                </svg>
                            </div>
                        </div>
                        <button type="submit" className="bg-red-700 hover:bg-red-600 active:bg-orange-600 active:scale-95 text-white font-bold py-2 px-4 rounded">
                            {auth.editStatus === "pending" ? "Saving" : "Save Changes"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}