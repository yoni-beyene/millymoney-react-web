import { createBrowserRouter, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/login/LoginPage";
import RecipientPage from "../pages/recipient/RecipientPage";
import RegisterPage from "../pages/register/RegisterPage";
import StatisticsPage from "../pages/statistics/StatisticsPage";
import VerificationPage from "../pages/verification/VerificationPage";
import CardsPage from "../pages/card/CardPages";
import ProfilePage from "../pages/profile/ProfilePage";
import EnterAmount from "../components/sendMoney/EnterAmount";
import EnterRecipient from "../components/sendMoney/EnterRecipient";
import AddRecientPage from "../pages/recipient/AddRecientPage";
import TransferMoneyPage from "../pages/home/TransferMoneyPage";
import PaymentReviewPage from "../pages/home/PaymentReviewPage";
import Layout from "./Layout";
import ErrorBoundary from "../components/shared/exception/ErrorBoundary";
import TransactionPage from "../pages/home/TransactionPage";

const ProtectedRoute = ({ element }) => {
  const token = useSelector((state) => state.global.accessToken);
  const email = useSelector((state) => state.global?.sender?.email);
  return token && email ? element : <Navigate to="/login" replace />;
};

const RouteList = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <LoginPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/verification", element: <VerificationPage /> },
      { path: "/register", element: <RegisterPage /> },
      {
        path: "terms-condition",
        element: <VerificationPage />,
      },

      { path: "/home", element: <ProtectedRoute element={<HomePage />} /> },
      {
        path: "/transaction",
        element: <ProtectedRoute element={<TransactionPage />} />,
      },
      {
        path: "/transfer-money",
        element: <ProtectedRoute element={<TransferMoneyPage />} />,
      },
      {
        path: "/payment-review",
        element: <ProtectedRoute element={<PaymentReviewPage />} />,
      },
      {
        path: "/statistics",
        element: <ProtectedRoute element={<StatisticsPage />} />,
      },
      {
        path: "/recipient",
        element: <ProtectedRoute element={<RecipientPage />} />,
      },
      {
        path: "/recipient/add-new",
        element: <ProtectedRoute element={<AddRecientPage />} />,
      },
      { path: "/cards", element: <ProtectedRoute element={<CardsPage />} /> },
      {
        path: "/profile",
        element: <ProtectedRoute element={<ProfilePage />} />,
      },
      {
        path: "/send-money/enter-amount",
        element: <ProtectedRoute element={<EnterAmount />} />,
      },
      {
        path: "/send-money/enter-recipient",
        element: <ProtectedRoute element={<EnterRecipient />} />,
      },
    ],
    errorElement: (
      <div className="d-flex flex-column justify-content-between mt-5">
        <ErrorBoundary />
      </div>
    ),
  },
]);

export default RouteList;
