import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./state/language-context";
import { ToastProvider } from "./components/ui/toast-provider";
import { PrivateRoute } from "./components/auth/private-route";
import { HomePage } from "./pages/home-page";
import { ProductListPage } from "./pages/product-list-page";
import { ProductDetailPage } from "./pages/product-detail-page";
import { CartPage } from "./pages/cart-page";
import { WishlistPage } from "./pages/wishlist-page";
import { DashboardPage } from "./pages/admin/dashboard-page";
import { ProductManagementPage } from "./pages/admin/product-management-page";
import { OrderManagementPage } from "./pages/admin/order-management-page";
import { AnalyticsPage } from "./pages/admin/analytics-page";
import { SettingsPage } from "./pages/admin/settings-page";
import { UserManagementPage } from "./pages/admin/user-management-page";
import { DisputeResolutionPage } from "./pages/admin/dispute-resolution-page";
import { NotificationsPage } from "./pages/admin/notifications-page";
import { SupportPage } from "./pages/admin/support-page";
import { CategoriesPage } from "./pages/categories-page";
import { DealsPage } from "./pages/deals-page";
import { LoginPage } from "./pages/auth/login-page";
import { RegisterPage } from "./pages/auth/register-page";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { VendorProductListPage } from "./pages/vendor/product-list-page";
import { VendorProductFormPage } from "./pages/vendor/product-form-page";

function App() {
  return (
    <ToastProvider>
      <LanguageProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/category/:category" element={<ProductListPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route
                path="/categories/:category"
                element={<ProductListPage />}
              />
              <Route
                path="/categories/:category/:subcategory"
                element={<ProductListPage />}
              />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/search" element={<ProductListPage />} />
              <Route path="/deals" element={<DealsPage />} />
              
              {/* Auth routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Utility pages */}
              <Route
                path="/shipping-details"
                element={<div>Shipping Details</div>}
              />
              <Route
                path="/notify-signup"
                element={<div>Notification Signup</div>}
              />
              <Route path="/sms-signup" element={<div>SMS Signup</div>} />
              <Route path="/stores" element={<div>Store Locator</div>} />
              <Route
                path="/shipping"
                element={<div>Shipping Information</div>}
              />
              <Route path="/returns" element={<div>Returns & Exchanges</div>} />
              <Route path="/privacy" element={<div>Privacy Policy</div>} />
              <Route path="/terms" element={<div>Terms of Use</div>} />
              <Route
                path="/transparency"
                element={<div>CA Transparency</div>}
              />
              <Route path="/accessibility" element={<div>Accessibility</div>} />
              <Route path="/contact" element={<div>Contact Us</div>} />
              <Route path="/logout" element={<div>Logging out...</div>} />

              {/* Vendor routes */}
              <Route path="/vendor/products" element={<ProtectedRoute roles={["vendor"]}><VendorProductListPage /></ProtectedRoute>} />
              <Route path="/vendor/products/new" element={<ProtectedRoute roles={["vendor"]}><VendorProductFormPage /></ProtectedRoute>} />
              <Route path="/vendor/products/:id/edit" element={<ProtectedRoute roles={["vendor"]}><VendorProductFormPage /></ProtectedRoute>} />

              {/* Admin routes */}
              <Route path="/admin/dashboard" element={
                <PrivateRoute requireAdmin>
                  <DashboardPage />
                </PrivateRoute>
              } />
              <Route
                path="/admin/products"
                element={
                  <PrivateRoute requireAdmin>
                    <ProductManagementPage />
                  </PrivateRoute>
                }
              />
              <Route path="/admin/users" element={
                <PrivateRoute requireAdmin>
                  <UserManagementPage />
                </PrivateRoute>
              } />
              <Route path="/admin/orders" element={
                <PrivateRoute requireAdmin>
                  <OrderManagementPage />
                </PrivateRoute>
              } />
              <Route path="/admin/analytics" element={
                <PrivateRoute requireAdmin>
                  <AnalyticsPage />
                </PrivateRoute>
              } />
              <Route
                path="/admin/disputes"
                element={
                  <PrivateRoute requireAdmin>
                    <DisputeResolutionPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/notifications"
                element={
                  <PrivateRoute requireAdmin>
                    <NotificationsPage />
                  </PrivateRoute>
                }
              />
              <Route path="/admin/settings" element={
                <PrivateRoute requireAdmin>
                  <SettingsPage />
                </PrivateRoute>
              } />
              <Route path="/admin/support" element={
                <PrivateRoute requireAdmin>
                  <SupportPage />
                </PrivateRoute>
              } />
            </Routes>
          </div>
        </Router>
      </LanguageProvider>
    </ToastProvider>
  );
}

export default App;
