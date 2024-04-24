import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../navigation/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { meFetch } from "../../slices/sliceAuth";
import { useEffect } from "react";

const DashboardAdmin = () => {
  const auth = useSelector((state) => state.session);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(meFetch());
  }, [dispatch]);

  useEffect(() => {
    if (auth.status == "rejected") {
      navigate("/login");
    }
  }, [auth.status, navigate]);

  useEffect(() => {
    if (auth.stateAuth.user_role == "user") {
      navigate("/");
    }
  }, [auth.stateAuth.user_role, navigate]);

  console.log(auth.stateAuth.user_role);

  return (
    <div className="flex w-[100%]">
      <SideBar />
      <div className="flex w-[100%] pl-[300px] py-[30px] pr-[30px]">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardAdmin;