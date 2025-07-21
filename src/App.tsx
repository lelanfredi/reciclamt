import { Suspense, useState, useEffect } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import Dashboard from "./components/Dashboard";
import AdminPanel from "./components/AdminPanel";
import QuemSomos from "./components/QuemSomos";
import OProjeto from "./components/OProjeto";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { user, loading, logout } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  // Import tempo routes conditionally
  let tempoRoutes = null;
  if (import.meta.env.VITE_TEMPO) {
    try {
      // Use import() for dynamic imports in Vite
      import("tempo-routes")
        .then((module) => {
          const routes = module.default;
          tempoRoutes = useRoutes(routes);
        })
        .catch((error) => {
          console.warn("Tempo routes not available:", error);
        });
    } catch (error) {
      console.warn("Tempo routes not available:", error);
    }
  }

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

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          Carregando...
        </div>
      }
    >
      <div className="min-h-screen bg-syntiro-50 w-full">
        {tempoRoutes}
        <Routes>
          {import.meta.env.VITE_TEMPO && (
            <Route path="/tempobook/*" element={<div />} />
          )}
          <Route
            path="/"
            element={
              user ? (
                <Dashboard
                  userName={user.name}
                  userEmail={user.email || undefined}
                  userPoints={user.points}
                  onLogout={handleLogout}
                  isAdmin={isAdmin}
                />
              ) : (
                <Home
                  isAuthenticated={!!user}
                  onLogin={handleLogin}
                  onRegister={handleRegister}
                />
              )
            }
          />
          <Route
            path="/admin"
            element={
              user && user.role === "admin" ? <AdminPanel /> : <Navigate to="/" replace />
            }
          />
          <Route path="/quemsomos" element={<QuemSomos />} />
          <Route path="/oprojeto" element={<OProjeto />} />
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
