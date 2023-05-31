import { Typography } from "@mui/material";
import { Navigate, createBrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import FooterOutlet from "../outlets/FooterOutlet";
import WizardComponent from "../pages/WizardSteps/WizardComponent";
import HomePage from "../pages/homepage/HomePage";
import { Box } from "@mui/system";
import NoCollegePage from "../components/NoCollegePage";

function RequireAuth({ element }: { element: JSX.Element }): JSX.Element {
  // const auth = true;
  const auth: boolean = useSelector((store: any) => store.auth.isLoggedIn);
  return auth ? element : <Navigate to="/sbc" replace />;
}
export const appRoutes = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <NoCollegePage />,
      },
      {
        path: "/:collegeUrl",
        element: <FooterOutlet />,
        children: [
          {
            path: "",
            element: <HomePage />,
          },
          {
            path: "onboard",
            element: <RequireAuth element={<WizardComponent />} />,
          },
        ],
      },
    ],
  },
]);
