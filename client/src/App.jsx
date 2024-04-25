import { useContext, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/react";

const MainHeader = lazy(() => import("./components/header/main-header"));
const ErrorPage = lazy(() => import("./pages/public/error404"));
const LoginPage = lazy(() => import("./pages/public/login"));
const SignupPage = lazy(() => import("./pages/public/signup"));
const ProfilePage = lazy(() => import("./pages/private/profile"));
const AddBookPage = lazy(() => import("./pages/private/add-book"));
const ChangePasswordPage = lazy(() =>
  import("./pages/private/change-password")
);
const HomePage = lazy(() => import("./pages/public/home"));
const BookDetailsPage = lazy(() => import("./pages/public/book-details"));
const AdminBooksPage = lazy(() => import("./pages/private/admin-books"));
const DeleteAccountPage = lazy(() => import("./pages/private/delete-account"));
const EditBookPage = lazy(() => import("./pages/private/edit-book"));
const ForgotPasswordPage = lazy(() => import("./pages/public/forgot-password"));
const ResetPasswordPage = lazy(() => import("./pages/public/reset-password"));
const Footer = lazy(() => import("./components/footer/footer"));

import ContextApi from "./context/context-api";
import LazyLoader from "./components/lazy loader/lazy-loader";

function App() {
  const { isLoggedin } = useContext(ContextApi);

  return (
    <>
      {/*notification toast*/}
      <div>
        <Toaster style={{ fontFamily: "Poppins" }} richColors closeButton />
      </div>

      {/*header*/}
      <MainHeader />

      {/*main content*/}
      <Switch>
        <Route path="/" exact>
          <Suspense fallback={<LazyLoader />}>
            <HomePage />
          </Suspense>
        </Route>

        {!isLoggedin && (
          <Route path="/login" exact>
            <Suspense fallback={<LazyLoader />}>
              <LoginPage />
            </Suspense>
          </Route>
        )}

        {!isLoggedin && (
          <Route path="/signup" exact>
            <Suspense fallback={<LazyLoader />}>
              <SignupPage />
            </Suspense>
          </Route>
        )}

        {!isLoggedin && (
          <Route path="/forgot-password" exact>
            <Suspense fallback={<LazyLoader />}>
              <ForgotPasswordPage />
            </Suspense>
          </Route>
        )}

        {!isLoggedin && (
          <Route path="/reset-password/:userId/:token" exact>
            <Suspense fallback={<LazyLoader />}>
              <ResetPasswordPage />
            </Suspense>
          </Route>
        )}

        <Route path="/book/:bookId" exact>
          <Suspense fallback={<LazyLoader />}>
            <BookDetailsPage />
          </Suspense>
        </Route>

        {isLoggedin && (
          <Route path="/admin/profile" exact>
            <Suspense fallback={<LazyLoader />}>
              <ProfilePage />
            </Suspense>
          </Route>
        )}

        {isLoggedin && (
          <Route path="/admin/add-book" exact>
            <Suspense fallback={<LazyLoader />}>
              <AddBookPage />
            </Suspense>
          </Route>
        )}

        {isLoggedin && (
          <Route path="/admin/edit-book/:bookId" exact>
            <Suspense fallback={<LazyLoader />}>
              <EditBookPage />
            </Suspense>
          </Route>
        )}

        {isLoggedin && (
          <Route path="/admin/books" exact>
            <Suspense fallback={<LazyLoader />}>
              <AdminBooksPage />
            </Suspense>
          </Route>
        )}

        {isLoggedin && (
          <Route path="/admin/change-password" exact>
            <Suspense fallback={<LazyLoader />}>
              <ChangePasswordPage />
            </Suspense>
          </Route>
        )}

        {isLoggedin && (
          <Route path="/admin/delete-account" exact>
            <Suspense fallback={<LazyLoader />}>
              <DeleteAccountPage />
            </Suspense>
          </Route>
        )}

        <Route path="*">
          <Suspense fallback={<LazyLoader />}>
            <ErrorPage />
          </Suspense>
        </Route>
      </Switch>

      {/*footer*/}
      <Footer />

      <SpeedInsights />
    </>
  );
}

export default App;
