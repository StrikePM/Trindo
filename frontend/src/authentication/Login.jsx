import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser, meFetch, sessionCreate } from "../slices/sliceAuth";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.session);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  
  useEffect(()=>{
    dispatch(meFetch());
  }, [dispatch]);

  useEffect(() => {
    if (auth.status === "success") {
      navigate("/");
    }
  }, [auth.status, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(sessionCreate({
      userEmail: user.email,
      userPassword: user.password,
    }));
    navigate("/");
  };

  return (
    <div className="fixed bg-gray-100 min-h-screen w-full flex justify-center items-center">
      <div className="w-full max-w-md rounded-lg shadow-xl bg-gray-100 mb-[150px]">
        {/* Background Image */}
        {/* <div
          className="bg-cover bg-center h-32 mb-6 rounded-lg"
          style={{
            backgroundImage: ``,
            opacity: 0.8, // Adjust the opacity as needed
          }}
        ></div> */}

        {/* Login Form */}
        <div className="bg-white rounded-lg p-6 text-dark">
          <h2 className="text-2xl font-semibold text-center mb-4 font-sans">Log in to your account</h2>
          <form className="flex flex-col space-y-[20px]" onSubmit={handleSubmit}>
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
            <div className="relative mb-[50px]">
              <label htmlFor="password" className="block text-dark text-sm font-bold mb-2">
                Password
              </label>
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faLock}
                  className="text-gray-600 mr-2"
                />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="mt-1 py-2.5 px-4 w-[85%] border-2 rounded-lg border-gray-400 bg-gray-100 text-dark"
                  placeholder="Password"
                  required
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
                <button
                  type="button"
                  className="ml-2 text-gray-600 focus:outline-none"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                  />
                </button>
              </div>
            </div>
            <button type="submit" className="w-full text-white bg-red-700 hover:bg-red-600 active:bg-orange-600 active:scale-95 rounded-lg text-lg px-4 py-2">
              Login
              {/* {auth ? "Submitting..." : "Login"} */}
            </button>
            {/* {auth.loginStatus === "rejected" && (
              <p className="text-red-600 text-center">{auth.loginError}</p>
            )} */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
