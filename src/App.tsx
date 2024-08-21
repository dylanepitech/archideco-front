import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Faq from "./pages/Faq";
import CgvCgu from "./pages/CgvCgu";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import HistoirePage from "./pages/HistoirePage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/FAQ" Component={Faq} />
        <Route path="/CGV-CGU" Component={CgvCgu} />
        <Route path="/privaci-politique" Component={PolitiqueConfidentialite} />
        <Route path="/about-us" Component={HistoirePage} />
      </Routes>
    </Router>
  );
}

export default App;
