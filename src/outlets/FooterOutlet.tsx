import { Outlet, useNavigate, useParams } from "react-router-dom";
import Footer from "../components/FooterComonent/Footer";
import Topbar from "../components/FooterComonent/Topbar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { login } from "../redux/Reducers/authReducer";
import { setApplicationInfo } from "../redux/Reducers/applicationReducer";
import {
  setCollegeId,
  setCollegeLogo,
  setCollegeName,
  setCollegeUrl,
} from "../redux/Reducers/collegeContextReducer";
import axiosInstance from "../api/axios.instance";

function FooterOutlet() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { collegeUrl } = useParams();

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
  useEffect(() => {
    console.log("HOMEPAGE LOG");
    axiosInstance
      .get("api/v3/onboarding/init/info", {
        params: {
          collegeUrl,
        },
        headers: {
          Authorization: "",
        },
      })
      .then(({ data }) => {
        dispatch(setCollegeUrl(collegeUrl));
        dispatch(setCollegeLogo(data.result.collegeLogo));

        dispatch(setCollegeName(data.result.collegeName));
        sessionStorage.setItem("collegeId", data.result.collegeId);
        sessionStorage.setItem("collegeName", data.result.collegeName);

        dispatch(setCollegeId(data.result.collegeId));
      })
      .catch(() => {
        navigate("/");
      });
  }, [collegeUrl]);
  return (
    <div>
      <Topbar />
      <Outlet />
    </div>
  );
}

export default FooterOutlet;
