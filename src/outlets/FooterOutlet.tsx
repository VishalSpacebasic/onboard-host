import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../components/FooterComonent/Footer";
import Topbar from "../components/FooterComonent/Topbar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { login } from "../redux/Reducers/authReducer";
import { setApplicationInfo } from "../redux/Reducers/applicationReducer";
import { setCollegeName } from "../redux/Reducers/collegeContextReducer";

function FooterOutlet() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("IMA CALLLLLLLLED");

    const accessToken = sessionStorage.getItem("accessToken");
    const appId = sessionStorage.getItem("appId");
    if (accessToken) {
      dispatch(login({ isLoggedIn: true, accessToken }));
      dispatch(setApplicationInfo(appId));
      dispatch(setCollegeName(sessionStorage.getItem("collegeName")));
      navigate("onboard");
    }
  }, []);
  return (
    <div>
      <Topbar />
      <Outlet />
    </div>
  );
}

export default FooterOutlet;
