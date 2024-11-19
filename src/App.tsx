import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GetHealthTips from "./components/getHealthTips";
import GetStarted from "./components/getStarted";
import Login from "./components/login";
import Signup from "./components/signUp";
import HealthBot from "./components/healthBot";
import VerifyOtp from "./components/verifyOtp";
import SavedChat from "./components/savedChat";
import ExplorePage from "./components/explorePage";
import HealthNews from "./components/healthNews";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />

        {/* Add /loginIn route here with nested routes */}
        <Route path="/loginIn" element={<SavedChat />}>
          <Route path="health-tips" element={<GetHealthTips />} />
          <Route path="explore" element={<ExplorePage />} />
          <Route path="health-news" element={<HealthNews />} />
          <Route path="health-bot" element={<HealthBot />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
