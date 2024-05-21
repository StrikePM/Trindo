import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { getMe, meFetch } from "../../slices/sliceAuth";
import { clearCart } from "../../slices/sliceCart";

const DashboardClient = () => {
  const auth = useSelector((state) => state.session);
  const navigate = useNavigate();
  
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(meFetch());
  }, [dispatch]);

  console.log(auth);

  useEffect(()=>{
    if (auth.status == "rejected") {
      dispatch(clearCart());
      navigate("/login");
    }
  }, [auth.status, navigate]);
  
  return (
    <div className="bg-gray-100 h-fit w-full pt-[90px]">
      <Outlet />
    </div>
  );
};

export default DashboardClient;