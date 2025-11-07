import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Header, HomePage, StockPage, Footer, NotFound, Login, Callback  } from "./components";

function App() {
  return (
    <>
      <div className="app-container">
        <Header />
        <div className="inner-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/stocks/:symbol" element={<StockPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/callback" element={<Callback />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
