import './stylesheet/App.css';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react'; // 1. Import useState
import MainPage from "./mainpage/MainPage";
import PageNotFound from "./common/PageNotFound";
import NavBar from "./common/bar/NavBar";
import Footer from "./common/bar/Footer";

function App() {
    // 2. Create state to track footer visibility
    const [isFooterVisible, setIsFooterVisible] = useState(false);

    return (
        <div className="main">
            <NavBar/>
            <Routes>
                {/* 3. Pass the state setter function down as a prop */}
                <Route path="/" element={<MainPage setIsFooterVisible={setIsFooterVisible} />}/>
                <Route path="/main" element={<MainPage setIsFooterVisible={setIsFooterVisible} />}/>
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
            {/* The <hr/> is removed as the footer will now slide over the content */}
            {/* 4. Pass the visibility state to the Footer component */}
            <Footer isVisible={isFooterVisible} />
        </div>
    );
}

export default App;