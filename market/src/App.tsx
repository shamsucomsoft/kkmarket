import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./state/language-context";
import { ToastProvider } from "./components/ui/toast-provider";
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

              {/* Admin routes */}
              <Route path="/admin/dashboard" element={<DashboardPage />} />
              <Route
                path="/admin/products"
                element={<ProductManagementPage />}
              />
              <Route path="/admin/users" element={<UserManagementPage />} />
              <Route path="/admin/orders" element={<OrderManagementPage />} />
              <Route path="/admin/analytics" element={<AnalyticsPage />} />
              <Route
                path="/admin/disputes"
                element={<DisputeResolutionPage />}
              />
              <Route
                path="/admin/notifications"
                element={<NotificationsPage />}
              />
              <Route path="/admin/settings" element={<SettingsPage />} />
              <Route path="/admin/support" element={<SupportPage />} />
            </Routes>
          </div>
        </Router>
      </LanguageProvider>
    </ToastProvider>
  );
}

export default App;
