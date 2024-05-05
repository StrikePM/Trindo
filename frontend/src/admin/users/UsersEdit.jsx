import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { usersEdit } from "../../slices/sliceUsers";

export default function UsersEdit() {
    const dispatch = useDispatch();
    const { stateUsers, createStatus } = useSelector((state) => state.users);
    const { uId } = useParams();
    const navigate = useNavigate();

    const [roleUsers, setRoleUsers] = useState("");
    const selectedUser = stateUsers.find((item) => item.user_id === parseInt(uId, 10));
    console.log(roleUsers);
    useEffect(() => {
        if (selectedUser) {
            setRoleUsers(selectedUser.user_role);
        }
    }, [uId, stateUsers]);

    const handleEditUsers = async (e) => {
        e.preventDefault();

        dispatch(usersEdit({
            user: {
                userId: parseInt(uId, 10),
                userRole: roleUsers,
            }
        }));

        navigate("/admin/users");
    };

    return (
        <div className="grid grid-cols-2">
            <div className="w-[400px]">
                <h1 className="font-bold text-xl mb-3">Edit User</h1>
                <form onSubmit={handleEditUsers}>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Role User :
                        </label>
                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setRoleUsers(e.target.value)}
                            required
                            defaultValue="cat"
                        >
                            <option value="cat" disabled hidden>
                                Pilih Role (current: {roleUsers})
                            </option>
                            <option value="user">
                                User
                            </option>
                            <option value="admin">
                                Admin
                            </option>
                        </select>
                    </div>
                    <button type="submit" className="bg-red-700 hover:bg-red-600 active:bg-orange-600 active:scale-95 text-white font-bold py-2 px-4 rounded">
                        {createStatus === "pending" ? "Submitting" : "Submit"}
                    </button>
                </form>
            </div>

        </div>
    );
}
