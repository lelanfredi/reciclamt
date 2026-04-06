import { Suspense, useState, useEffect } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import Dashboard from "./components/Dashboard";
import AdminPanel from "./components/AdminPanel";
import QuemSomos from "./components/QuemSomos";
import OProjeto from "./components/OProjeto";
import { ResetPassword } from "./components/ResetPassword";
import { useAuth } from "./hooks/useAuth";
import { Toaster } from "@/components/ui/toaster";
import { ADMIN_EMAILS } from "./config/constants";

function App() {
  const { user, loading, logout } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  // Debug logs
  console.log("[ReciclaMT][DEBUG] App render - user:", user, "loading:", loading);
  console.log("[ReciclaMT][DEBUG] Will render:", user ? "Dashboard" : "Home");

  // Force re-render when user changes
  useEffect(() => {
    console.log("[ReciclaMT][DEBUG] App useEffect - user changed:", user);
  }, [user]);


  useEffect(() => {
    // Check if user is admin based on email
    console.log("[ReciclaMT][DEBUG] Checking admin status for user:", user);
    console.log("[ReciclaMT][DEBUG] User email:", user?.email);
    console.log("[ReciclaMT][DEBUG] User role:", user?.role);
    
    if (user?.email && ADMIN_EMAILS.includes(user.email)) {
      console.log("[ReciclaMT][DEBUG] User is admin by email");
      setIsAdmin(true);
    } else if (user?.role === "admin") {
      console.log("[ReciclaMT][DEBUG] User is admin by role");
      setIsAdmin(true);
    } else {
      console.log("[ReciclaMT][DEBUG] User is not admin");
      setIsAdmin(false);
    }
  }, [user]);

  const handleLogin = (data: any) => {
    console.log("Login successful:", data);
    // Authentication is handled by the useAuth hook
  };

  const handleRegister = (data: any) => {
    console.log("Registration successful:", data);
    // Authentication is handled by the useAuth hook
  };

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-syntiro-500 mx-auto mb-4"></div>
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  // Render Dashboard or Home based on authentication
  if (user) {
    return (
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            Carregando...
          </div>
        }
      >
        <div className="min-h-screen bg-syntiro-50 w-full">
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  userName={user.name}
                  userEmail={user.email || undefined}
                  userPoints={user.points}
                  onLogout={handleLogout}
                  isAdmin={isAdmin}
                />
              }
            />
            <Route
              path="/admin"
              element={
                (() => {
                  console.log("[ReciclaMT][DEBUG] Admin route check - user:", user);
                  console.log("[ReciclaMT][DEBUG] Admin route check - user.role:", user?.role);
                  console.log("[ReciclaMT][DEBUG] Admin route check - isAdmin:", isAdmin);
                  
                  // Check if user is admin by email or role
                  const isUserAdmin = (user?.email && ADMIN_EMAILS.includes(user.email)) || user?.role === "admin";
                  
                  console.log("[ReciclaMT][DEBUG] isUserAdmin:", isUserAdmin);
                  
                  if (isUserAdmin) {
                    console.log("[ReciclaMT][DEBUG] Rendering AdminPanel");
                    return <AdminPanel />;
                  } else {
                    console.log("[ReciclaMT][DEBUG] Redirecting to home - not admin");
                    return <Navigate to="/" replace />;
                  }
                })()
              }
            />
            <Route path="/quemsomos" element={<QuemSomos />} />
            <Route path="/oprojeto" element={<OProjeto />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </div>
        <Toaster />
      </Suspense>
    );
  }

  // Render Home for unauthenticated users
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          Carregando...
        </div>
      }
    >
      <div className="min-h-screen bg-syntiro-50 w-full">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                isAuthenticated={!!user}
                onLogin={handleLogin}
                onRegister={handleRegister}
              />
            }
          />
          <Route path="/quemsomos" element={<QuemSomos />} />
          <Route path="/oprojeto" element={<OProjeto />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>
      <Toaster />
    </Suspense>
  );
}

export default App;
