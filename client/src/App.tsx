import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import LoginPage from "@/pages/auth/login";
import DashboardLayout from "@/components/layout/dashboard-layout";
import OverviewPage from "@/pages/dashboard/overview";
import SpotsPage from "@/pages/dashboard/spots";
import AccommodationsPage from "@/pages/dashboard/accommodations";
import AdminManagementPage from "@/pages/dashboard/admin-management";
import AssistantPage from "@/pages/dashboard/assistant";
import NotFound from "@/pages/not-found";

function ProtectedRoute({ component: Component, ...rest }: any) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <DashboardLayout>
      <Component />
    </DashboardLayout>
  ) : (
    <Redirect to="/auth/login" />
  );
}

function Router() {
  const { isAuthenticated } = useAuth();

  return (
    <Switch>
      <Route path="/auth/login">
        {isAuthenticated ? <Redirect to="/dashboard" /> : <LoginPage />}
      </Route>
      
      <Route path="/dashboard">
        {() => <ProtectedRoute component={OverviewPage} />}
      </Route>

      <Route path="/dashboard/spots">
        {() => <ProtectedRoute component={SpotsPage} />}
      </Route>
      
      <Route path="/dashboard/accommodations">
        {() => <ProtectedRoute component={AccommodationsPage} />}
      </Route>

      <Route path="/dashboard/assistant">
        {() => <ProtectedRoute component={AssistantPage} />}
      </Route>

      <Route path="/dashboard/reports">
        {() => <ProtectedRoute component={() => <div className="text-2xl font-bold text-muted-foreground p-10">Halaman Laporan (Coming Soon)</div>} />}
      </Route>
      
      <Route path="/dashboard/admin">
         {() => <ProtectedRoute component={AdminManagementPage} />}
      </Route>

      <Route path="/">
        <Redirect to="/dashboard" />
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
