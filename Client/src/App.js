import Home from "./pages/homePage/Home";
import Login from "./pages/loginPage/Login";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Account from "./pages/accountPage/Account";
import ErrorPage from "./pages/errorPage/ErrorPage";
import NotificationPage from "./pages/notificationPage/NotificationPage";

function App() {
  return (
    <div className="App"> 
     <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/" element={<Login />} />
          <Route path="/notifications" element={<NotificationPage />} /> 
          <Route path='*' element={<ErrorPage />} /> 
        </Routes>
      </BrowserRouter>,
    </div>
  );
}

export default App;
