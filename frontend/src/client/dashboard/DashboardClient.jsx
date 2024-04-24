import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { getMe, meFetch } from "../../slices/sliceAuth";

const DashboardClient = () => {
  const auth = useSelector((state) => state.session);
  const navigate = useNavigate();
  
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(meFetch());
  }, [dispatch]);

  useEffect(()=>{
    if (auth.status == "rejected") {
      navigate("/login");
    }
  }, [auth.status, navigate]);
  
  return (
    <div className="fixed bg-gray-100 min-h-screen w-full">
      <Outlet />
    </div>
  );
};

export default DashboardClient;