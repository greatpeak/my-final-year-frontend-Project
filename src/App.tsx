import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GetHealthTips from "./pages/getHealthTips";
import GetStarted from "./pages/getStarted";
import Login from "./pages/login";
import Signup from "./pages/signUp";
import HealthBot from "./pages/healthBot";
import VerifyOtp from "./pages/verifyOtp";
import SavedChat from "./pages/savedChat";
import ExplorePage from "./pages/explorePage";
import HealthNews from "./pages/healthNews";

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
