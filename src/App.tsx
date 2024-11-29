import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GetHealthTips from "./pages/getHealthTips";
import GetStarted from "./pages/getStarted";
import Login from "./pages/login";
import MobileSavedChat from "./pages/mobileSavedChat";
import Signup from "./pages/signUp";
import HealthBot from "./pages/healthBot";
import VerifyEmail from "./pages/verify-email";
import SavedChat from "./pages/savedChat";
import ExplorePage from "./pages/explorePage";
import HealthNews from "./pages/healthNews";
import ForgetPassword from "./pages/forgetPassword";
import ResetPassword from "./pages/reset-password";
import ProtectedRoute from "./components/ProtectedRoute"; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email/:email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        {/* Protect the `/app` route */}
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <SavedChat />
            </ProtectedRoute>
          }
        >
          <Route path="health-tips" element={<GetHealthTips />} />
          <Route path="explore" element={<ExplorePage />} />
          <Route path="health-news" element={<HealthNews />} />
          <Route path="health-bot/:chatId" element={<HealthBot />} />
          <Route path="mobileSavedChat" element={<MobileSavedChat />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
