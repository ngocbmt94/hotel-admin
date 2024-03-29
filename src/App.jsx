import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import GlobalStyle from "./styles/GlobalStyle";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";
import Cabins from "./pages/Cabins";
import Bookings from "./pages/Bookings";
import BookingPageDetail from "./pages/BookingPageDetail";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import AppLayOut from "./ui/AppLayOut";
import CheckIn from "./pages/CheckIn";
import ProtectedRoute from "./ui/ProtectedRoute";
import DarkModeProvider from "./context/DarkModeContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0, // the data in the cache will stay fresh after amount specifical time
    },
  },
});

function App() {
  const router = createBrowserRouter([
    {
      element: (
        <ProtectedRoute>
          <AppLayOut />
        </ProtectedRoute>
      ),
      errorElement: <PageNotFound />,
      children: [
        { path: "/", element: <Navigate replace to="dashboard" /> },
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "cabins",
          element: <Cabins />,
        },
        {
          path: "bookings",
          element: <Bookings />,
        },
        {
          path: "bookings/:bookingId",
          element: <BookingPageDetail />,
        },
        {
          path: "checkin/:bookingId",
          element: <CheckIn />,
        },
        {
          path: "account",
          element: <Account />,
        },
        {
          path: "settings",
          element: <Settings />,
        },
        {
          path: "users",
          element: <Users />,
        },
      ],
    },
    {
      path: "login",
      element: <Login />,
    },
  ]);
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyle />
      <Toaster
        position="top-center"
        gutter={20}
        toastOptions={{
          success: {
            duration: 1000,
          },
          error: {
            duration: 2000,
          },
          style: {
            color: "var(--color-grey-500)",
            padding: "18px 26px",
          },
        }}
      />
      <DarkModeProvider>
        <RouterProvider router={router} />
      </DarkModeProvider>
    </QueryClientProvider>
  );
}

export default App;
