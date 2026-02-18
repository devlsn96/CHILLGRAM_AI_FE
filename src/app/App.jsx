import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useAuthStore } from "@/stores/authStore";
import { refreshApi } from "@/data/authApi";
import PrivateRoute from "@/routes/PrivateRoute";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import ScrollToTop from "@/components/common/ScrollToTop";

import SignupPage from "@/pages/SignupPage";
import SignupEmailSentPage from "@/pages/SignupEmailSentPage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import PrivacyConsentPage from "@/pages/PrivacyConsentPage";
import HomePage from "@/pages/home/HomePage";
import QnAPage from "@/pages/qna/QnAPage";
import QnaWritePage from "@/pages/qna/QnaWritePage";
import QnaDetailPage from "@/pages/qna/QnaDetailPage";
import QnaEditPage from "@/pages/qna/QnaEditPage";

import DashboardPage from "@/pages/dashboard/DashboardPage";
import AdminDashboardPage from "@/pages/dashboard/AdminDashboardPage";
import ProductPackagePage from "@/pages/dashboard/products/ProductPackagePage";
import ADPage from "@/pages/dashboard/products/ad/ADPage";
import SnsManagementPage from "@/pages/dashboard/SnsManagement";
import ProductManagementPage from "@/pages/dashboard/products/ProductManagement";
import ProductAdStatusPage from "@/pages/dashboard/products/ProductAdStatus";
import AnalyticsReportPage from "@/pages/dashboard/AnalyticsReportPage";
// ProjectAdDetail & ProjectDesignDetail now consolidated into ADResultPage
import ADResultPage from "@/pages/dashboard/products/ad/ADResultPage";
import YoutubeCallbackPage from "@/pages/oauth/YoutubeCallbackPage";

import { parseJwt } from "@/utils/jwt";

export default function App() {
  const login = useAuthStore((s) => s.login);
  const setBootstrapped = useAuthStore((s) => s.setBootstrapped);

  // 앱 시작 시 silent refresh (중요)
  useEffect(() => {
    (async () => {
      try {
        const { accessToken } = await refreshApi();
        // 토큰 디코딩하여 유저 정보 복원
        const user = parseJwt(accessToken);
        console.log("[App] Silent Refresh 성공 - User 복원:", user);
        login(accessToken, user);
      } catch {
        // refresh 없으면 비로그인
      } finally {
        setBootstrapped(true);
      }
    })();
  }, [login, setBootstrapped]);

  return (
    <Layout>
      <ErrorBoundary>
        <ScrollToTop />
        <Routes>
          {/* Public */}
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signup/sent" element={<SignupEmailSentPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/privacy/consent" element={<PrivacyConsentPage />} />
          <Route path="/qna" element={<QnAPage />} />
          <Route path="/qna/:questionId" element={<QnaDetailPage />} />

          {/* Private : 로그인 라우트 */}
          <Route element={<PrivateRoute />}>
            {/* QNA */}
            <Route path="/qna/new" element={<QnaWritePage />} />
            <Route path="/qna/:questionId/edit" element={<QnaEditPage />} />

            {/* ADMIN */}
            <Route path="/admin" element={<AdminDashboardPage />} />

            {/* DASHBOARD */}
            <Route path="/dashboard">
              <Route index element={<DashboardPage />} />

              {/* PRODUCTS */}
              <Route path="products">
                <Route index element={<ProductManagementPage />} />
                <Route path=":productId">
                  <Route index element={<ProductAdStatusPage />} />
                  {/* CREATE */}
                  <Route path="addPackage" element={<ProductPackagePage />} />
                  <Route path="addAD">
                    <Route index element={<ADPage />} />
                    <Route path="result" element={<ADResultPage />} />
                  </Route>
                </Route>

                <Route
                  path="projectAdDetail/:projectId"
                  element={<ADResultPage />}
                />

                <Route
                  path="projectDesignDetail/:projectId"
                  element={<ADResultPage />}
                />
              </Route>

              {/* SNS MANAGEMENT */}
              <Route path="sns" element={<SnsManagementPage />} />
              {/* ANALYTICS REPORTS */}
              <Route path="analytics" element={<AnalyticsReportPage />} />
            </Route>

            <Route
              path="/login/oauth/youtube"
              element={<YoutubeCallbackPage />}
            />
          </Route>
        </Routes>
      </ErrorBoundary>
    </Layout>
  );
}
