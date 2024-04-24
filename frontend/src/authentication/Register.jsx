import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { usersCreate } from "../slices/sliceUsers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser, faEye, faEyeSlash, faAddressCard, faPhone } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    nohp: "",
    address: "",
    password: "",
    confPassword: "",
  });

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await dispatch(usersCreate({
      userName: user.name,
      userAddress: user.address,
      userEmail: user.email,
      userPassword: user.password,
      userConfirmPassword: user.confPassword,
      userPhone: user.nohp,
    }));
  };

  return (
    <div className="fixed bg-gray-100 min-h-screen w-full flex justify-center items-center">
      <div className="w-full max-w-3xl rounded-lg shadow-xl bg-gray-100 mb-[150px]">
        {/* <div
          className="bg-cover bg-center h-32 mb-6 rounded-lg"
          style={{
            backgroundImage: ``,
            opacity: 0.8, 
          }}
        ></div> */}

        <div className="bg-white rounded-lg p-6 text-dark">
          <h2 className="text-2xl font-semibold text-center mb-4 font-sans">Register new account</h2>
          <form className="flex flex-col space-y-[20px] justify-center items-center" onSubmit={handleSubmit}>
            <div className="w-full flex flex-row space-x-[20px]">
              <div className="w-[50%] flex flex-col space-y-[20px]">
                <div className="relative">
                  <label htmlFor="name" className="block text-dark text-sm font-bold mb-2">
                    Nama
                  </label>
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-gray-600 mr-2"
                    />
                    <input
                      id="name"
                      type="text"
                      className="mt-1 py-2.5 px-4 w-[85%] border-2 rounded-lg border-gray-400 bg-gray-100 text-dark"
                      placeholder="Nama"
                      required
                      onChange={(e) => setUser({ ...user, name: e.target.value })}
                    />
                  </div>
                </div>
                <div className="relative">
                  <label htmlFor="email" className="block text-dark text-sm font-bold mb-2">
                    Email
                  </label>
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="text-gray-600 mr-2"
                    />
                    <input
                      id="email"
                      type="email"
                      className="mt-1 py-2.5 px-4 w-[85%] border-2 rounded-lg border-gray-400 bg-gray-100 text-dark"
                      placeholder="Email"
                      required
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="relative">
                  <label htmlFor="email" className="block text-dark text-sm font-bold mb-2">
                    No HP
                  </label>
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faPhone}
                      className="text-gray-600 mr-2"
                    />
                    <input
                      id="noHp"
                      type="tel"
                      className="mt-1 py-2.5 px-4 w-[85%] border-2 rounded-lg border-gray-400 bg-gray-100 text-dark"
                      placeholder="No Hp"
                      required
                      onChange={(e) => setUser({ ...user, nohp: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div className="w-[50%] flex flex-col space-y-[20px]">
                <div className="relative">
                  <label htmlFor="email" className="block text-dark text-sm font-bold mb-2">
                    Alamat
                  </label>
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faAddressCard}
                      className="text-gray-600 mr-2"
                    />
                    <input
                      id="address"
                      type="text"
                      className="mt-1 py-2.5 px-4 w-[85%] border-2 rounded-lg border-gray-400 bg-gray-100 text-dark"
                      placeholder="Address"
                      required
                      onChange={(e) => setUser({ ...user, address: e.target.value })}
                    />
                  </div>
                </div>
                <div className="relative">
                  <label htmlFor="password" className="block text-dark text-sm font-bold mb-2">
                    Kata Sandi
                  </label>
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faLock}
                      className="text-gray-600 mr-2"
                    />
                    <input
                      id="password"
                      type={showPassword1 ? "text" : "password"}
                      className="mt-1 py-2.5 px-4 w-[86%] border-2 rounded-lg border-gray-400 bg-gray-100 text-dark"
                      placeholder="Kata Sandi"
                      required
                      onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />
                    <button
                      type="button"
                      className="ml-2 text-gray-600 focus:outline-none"
                      onClick={togglePasswordVisibility1}
                    >
                      <FontAwesomeIcon
                        icon={showPassword1 ? faEyeSlash : faEye}
                      />
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <label htmlFor="password" className="block text-dark text-sm font-bold mb-2">
                    Ulangi Kata Sandi
                  </label>
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faLock}
                      className="text-gray-600 mr-2"
                    />
                    <input
                      id="password"
                      type={showPassword2 ? "text" : "password"}
                      className="mt-1 py-2.5 px-4 w-[86%] border-2 rounded-lg border-gray-400 bg-gray-100 text-dark"
                      placeholder="Ulangi Kata Sandi"
                      required
                      onChange={(e) => setUser({ ...user, confPassword: e.target.value })}
                    />
                    <button
                      type="button"
                      className="ml-2 text-gray-600 focus:outline-none"
                      onClick={togglePasswordVisibility2}
                    >
                      <FontAwesomeIcon
                        icon={showPassword2 ? faEyeSlash : faEye}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" className="w-full text-white bg-red-700 hover:bg-red-600 active:bg-orange-600 active:scale-95 rounded-lg text-lg px-4 py-2">
              Register
              {/* {auth.registerStatus === "pending" ? "Mendaftar..." : "Daftar"} */}
            </button>
            {/* {auth.registerStatus === "rejected" ? (
              <p className="text-red-600 text-center">{auth.registerError}</p>
            ) : null} */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
