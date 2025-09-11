import { Suspense, useState, useEffect } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import Dashboard from "./components/Dashboard";
import AdminPanel from "./components/AdminPanel";
import QuemSomos from "./components/QuemSomos";
import OProjeto from "./components/OProjeto";
import PreLaunchLanding from "./components/PreLaunchLanding";
import { ResetPassword } from "./components/ResetPassword";
import { useAuth } from "./hooks/useAuth";
import { Toaster } from "@/components/ui/toaster";

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
    if (
      user?.email &&
      (user.email === "reciclamt.projeto@gmail.com" ||
        user.email === "admin@reciclamt.com" ||
        user.email === "admin@example.com")
    ) {
      setIsAdmin(true);
    } else {
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
                user.role === "admin" ? <AdminPanel /> : <Navigate to="/" replace />
              }
            />
            <Route path="/quemsomos" element={<QuemSomos />} />
            <Route path="/oprojeto" element={<OProjeto />} />
            <Route path="/pre-lancamento" element={<PreLaunchLanding />} />
            <Route path="/lancamento" element={<PreLaunchLanding />} />
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
          <Route path="/pre-lancamento" element={<PreLaunchLanding />} />
          <Route path="/lancamento" element={<PreLaunchLanding />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>
      <Toaster />
    </Suspense>
  );
}

export default App;
