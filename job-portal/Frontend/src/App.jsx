import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Navbar from "./component/navBar.jsx";
import HeroSection from "./component/heroSection.jsx";
import SearchBar from "./component/searchBar.jsx";
import JobCategories from "./component/jobCategeries.jsx";
import Footer from "./component/footer.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/registeration.jsx";
import CompanyDashboard from "./pages/CompanyDashboard.jsx";
function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={
            <>
              <HeroSection />
              <SearchBar />
              <JobCategories />
              <Footer />
            </>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/CompanyDashboard" element={<CompanyDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
