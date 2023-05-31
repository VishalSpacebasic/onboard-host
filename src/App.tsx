import { RouterProvider } from "react-router-dom";
import { appRoutes } from "./router/AppRoutert";

function App() {
 
  return <RouterProvider router={appRoutes} />;
}

export default App;
