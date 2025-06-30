import { Footer } from "./Footer";
import { Header } from "./Header";
import { About } from "./About";
import {Main} from "./Main-content"
import { Routes, Route} from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <div className="wrapper">
        <Header />
        <Routes>
          <Route path="*" element={<Main />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
