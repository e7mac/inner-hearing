import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/pages/home/Home";
import Editor from "./components/pages/player/Editor";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />}></Route>
                <Route exact path="/editor/:filename" element={<Editor />}></Route>
            </Routes>
        </Router>
    );
}

export default App;
