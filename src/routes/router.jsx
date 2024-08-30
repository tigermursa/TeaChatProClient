import { createBrowserRouter } from "react-router-dom";
import WelcomePage from "../pages/Home/WelcomePage/WelcomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import PrivateRoute from "../Providers/PrivateRoute";
import ProfilePage from "../pages/Home/ProfilePage/ProfilePage";
import ChatDashboard from "../Components/Conversation/ChatDashboard/ChatDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <WelcomePage />
      </PrivateRoute>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "chat",
    element: <ChatDashboard />,
  },
]);

export default router;
