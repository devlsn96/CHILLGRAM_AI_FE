import { Header } from "./Header";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import ErrorBoundary from "../common/ErrorBoundary";

export function Layout({ children, isLoggedIn, setIsLoggedIn }) {
  const { pathname } = useLocation();

  const isAuthOnlyPage = pathname.startsWith("/signup");

  return (
    <div className="min-h-dvh flex flex-col bg-gray-100 w-full">
      {!isAuthOnlyPage && (
        <ErrorBoundary>
          <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </ErrorBoundary>
      )}

      <main className="flex-1">{children}</main>
      {!isAuthOnlyPage && (
        <ErrorBoundary>
          <Footer />
        </ErrorBoundary>
      )}
    </div>
  );
}
