import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/login/LoginPage";
import RecipientPage from "../pages/recipient/RecipientPage";
import RegisterPage from "../pages/register/RegisterPage";
import StatisticsPage from "../pages/statistics/StatisticsPage";
import VerificationPage from "../pages/verification/VerificationPage";
import { createBrowserRouter } from "react-router-dom";
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

const RouteList = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/verification",
        element: <VerificationPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/transaction",
        element: <TransactionPage />,
      },
      {
        path: "/transfer-money",
        element: <TransferMoneyPage />,
      },
      {
        path: "/payment-review",
        element: <PaymentReviewPage />,
      },

      {
        path: "/statistics",
        element: <StatisticsPage />,
      },
      {
        path: "/recipient",
        element: <RecipientPage />,
      },
      {
        path: "/recipient/add-new",
        element: <AddRecientPage />,
      },
      {
        path: "/cards",
        element: <CardsPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/send-money/enter-amount",
        element: <EnterAmount />,
      },
      {
        path: "/send-money/enter-recipient",
        element: <EnterRecipient />,
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
