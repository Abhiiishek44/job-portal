import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Navbar from "./component/navBar.jsx";
import HeroSection from "./component/heroSection.jsx";
import SearchBar from "./component/searchBar.jsx";
import JobCategories from "./component/jobCategeries.jsx";
import Footer from "./component/footer.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/registeration.jsx";
import CompanyDashboard from "./pages/CompanyDashboard.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import UserJobsView from "./pages/viewAllJobs.jsx";

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
        <Route path="/UserProfile" element={<UserProfile/>} />
        <Route path="/viewAllJobs" element={<UserJobsView />} />
      </Routes>
    </Router>
  );
}   

export default App;
