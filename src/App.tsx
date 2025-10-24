
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { Header, HomePage, StockPage } from './components'

function App() {
  return (
    <>
      <div className="app-container">
        <Header />
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:symbol" element={<StockPage />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
