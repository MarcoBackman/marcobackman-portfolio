import './stylesheet/App.css';
import { Routes, Route } from 'react-router-dom';
import MainPage from "./mainpage/MainPage";
import PageNotFound from "./common/PageNotFound";

function App() {
  return (
    <div className="main">
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/main" element={<MainPage/>}/>
            <Route path="*" element={<PageNotFound/>}/>
        </Routes>
    </div>
  );
}

export default App;
