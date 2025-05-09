import Layout from "./pages/Layout.tsx";
import { Routes, Route } from "react-router-dom";
import { ShoppingCartProvider } from "./context/ShoppingCartContext.tsx";
import PrivateRoute from './components/PrivateRoute.tsx';
import ScrollToTop from './components/ScrollToTop.tsx';
import Loader from "./components/Loader.tsx";
import { lazy, Suspense } from "react";

function App() {
  const Home = lazy(() => import("./pages/Home.tsx"));
  const Cart = lazy(() => import("./pages/Cart.tsx"));
  const TermsOfService = lazy(() => import("./pages/TermsOfService.tsx"));
  const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.tsx"));
  const About = lazy(() => import("./pages/About.tsx"));
  const AdminLogin = lazy(() => import("./pages/AdminLogin.tsx"));
  const AdminDashboard = lazy(() => import("./pages/AdminDashboard.tsx"));

  return (
    <ShoppingCartProvider>
      <ScrollToTop/>
      <Suspense fallback={<Loader/>}>
        <Routes>
          <Route path="/" element={<Layout/>}> 
            <Route index element={<Home/>} />
            <Route path="cart" element={<Cart/>} />
            <Route path="about" element={<About/>} />
            <Route path="privacyPolicy" element={<PrivacyPolicy/>} />
            <Route path="termsOfService" element={<TermsOfService/>} />
            
            <Route path="admin-login" element={<AdminLogin/>}/>
            <Route
              path="admin-dashboard"
              element={
                <PrivateRoute>
                  <AdminDashboard/>
                </PrivateRoute>
              }/>

          </Route>
        </Routes>
      </Suspense>
    </ShoppingCartProvider>
  )
}

export default App