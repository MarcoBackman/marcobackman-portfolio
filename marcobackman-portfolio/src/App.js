import './stylesheet/App.css';
import { Routes, Route } from 'react-router-dom';
import MainPage from "./mainpage/MainPage";
import PageNotFound from "./common/PageNotFound";
import smoothscroll from 'smoothscroll-polyfill';
import NavBar from "./common/bar/NavBar";
import useAuthStore from "./context/UserContext";
import Footer from "./common/bar/Footer";

function App() {

    const {user, isAuthenticated, login, logout, hydrateAuthState} = useAuthStore();

    smoothscroll.polyfill();
  return (
    <div className="main">
        <NavBar/>
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/main" element={<MainPage/>}/>
            <Route path="*" element={<PageNotFound/>}/>
        </Routes>
        <Footer/>
    </div>
  );
}

export default App;
