import { BrowserRouter} from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./pages/routes/AppRoutes";

import  "./App.css"


function App() {
  return (
    <div className="head-office">
   

      <BrowserRouter>
      <Navbar/>
     <AppRoutes/>
    </BrowserRouter>


   

    


     
      </div>
  )
}

export default App
