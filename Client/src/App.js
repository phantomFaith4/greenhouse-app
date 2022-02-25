import Home from "./pages/homePage/Home";
import Login from "./pages/loginPage/Login";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
    <div className="App"> 
     <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>,
    </div>
  );
}

export default App;
