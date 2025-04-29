import Home from './pages/Home.tsx';
import Layout from "./pages/Layout.tsx";
import Cart from "./pages/Cart.tsx";
import TermsOfService from "./pages/TermsOfService.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import About from "./pages/About.tsx";
import AdminLogin from "./pages/AdminLogin.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import { Routes, Route } from "react-router-dom";
import { ShoppingCartProvider } from "./context/ShoppingCartContext.tsx";
import PrivateRoute from './components/PrivateRoute.tsx';

function App() {
  return (
    <ShoppingCartProvider>
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
    </ShoppingCartProvider>
  )
}

export default App