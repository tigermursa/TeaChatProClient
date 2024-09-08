import { createBrowserRouter } from "react-router-dom";
import WelcomePage from "../pages/Home/WelcomePage/WelcomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import PrivateRoute from "../Providers/PrivateRoute";
import ProfilePage from "../pages/Home/ProfilePage/ProfilePage";
import ChatDashboard from "../Components/Conversation/ChatDashboard/ChatDashboard";
import PeopleYouMayKnow from "../Components/PagesComponents/PeopleYouMayKnow/PeopleYouMayKnow";
import MainLayout from "../Components/Layouts/MainLayout";
import { SocketProvider } from "../Providers/SocketProvider";
import DynamicProfilePage from "../pages/Home/ProfilePage/DynamicProfilePage";
import MyFriends from "../Components/SmallComponents/MyFriends/MyFriends";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <SocketProvider>
          <MainLayout />
        </SocketProvider>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <WelcomePage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "profile/:id",
        element: <DynamicProfilePage />,
      },
      {
        path: "chat",
        element: <ChatDashboard />,
      },
      {
        path: "people",
        element: <PeopleYouMayKnow />,
      },
      {
        path: "my-friends",
        element: <MyFriends />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
]);

export default router;
