import { RouterProvider } from "react-router-dom";
import { appRoutes } from "./router/AppRoutert";
import './App.css'
function App() {
 
  return <RouterProvider router={appRoutes} />;
}

export default App;
