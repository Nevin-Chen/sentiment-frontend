
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { Header, HomePage, StockPage } from './components'

function App() {
  return (
    <>
      <div className="app-container">
        <Router>
          <Header />
            <div className="inner-container">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/stocks/:symbol" element={<StockPage />} />
              </Routes>
            </div>
        </Router>
      </div>
    </>
  )
}

export default App
