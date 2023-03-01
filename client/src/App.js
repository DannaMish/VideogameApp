import style from "./App.module.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "../src/LandingPage/LandingPage";
import HomePage from "./HomePage/Homepage";
import VideogameId from "./VideogameId/VideogameId"

function App() {
  return (
    <Router>
      <div className={style.fullfondo}>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/videogame/:id" element={<VideogameId />}></Route> 
        </Routes>
      </div>
    </Router>

  );
}

export default App;
