import { useState, useEffect, useMemo, lazy, Suspense } from "react";
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { AuthContext } from "./components/contexts/AuthContext";
import { CircularProgress } from "@mui/material";
import ScrollToTop from "./components/layout/ScrollToTop";
import AdminRoute from "./components/routes/AdminRoute";
import ResidentRoute from "./components/routes/ResidentRoute";
import EmployeeRoute from "./components/routes/EmployeeRoute";
const Error404 = lazy(() => import("./components/pages/Error404"));
const AdminDashboard = lazy(() => import("./components/pages/admin/Dashboard"));
const ResidentDashboard = lazy(() =>
  import("./components/pages/resident/Dashboard")
);
const EmployeeDashboard = lazy(() =>
  import("./components/pages/employee/Dashboard")
);
const Main = lazy(() => import("./components/pages/main/Main"));
const NotFoundRedirect = () => <Redirect to="/404" />;

const mmainTheme = createTheme({
  palette: {
    primary: {
      main: "#6d213c",
    },
    secondary: {
      main: "#faff70",
    },
    text: {
      primary: "#946846",
      secondary: "#baab68",
      disabled: "#757575",
    },
    action: {
      disabledBackground: "#fff",
    },
  },
  typography: {
    fontFamily: "Roboto",
    fontWeightLight: 200,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 900,
    button: {
      textTransform: "none",
      borderRadius: "15px",
    },
  },
});

function App() {
  const [token, setToken] = useState("");
  const [resident, setResident] = useState(
    sessionStorage.getItem("resident-obj")
      ? JSON.parse(sessionStorage.getItem("resident-obj"))
      : null
  );
  const [employee, setEmployee] = useState(
    sessionStorage.getItem("employee-obj")
      ? JSON.parse(sessionStorage.getItem("employee-obj"))
      : null
  );
  const [admin, setAdmin] = useState(
    sessionStorage.getItem("admin-obj")
      ? JSON.parse(sessionStorage.getItem("admin-obj"))
      : null
  );

  const value = useMemo(
    () => ({
      resident,
      setResident,
      employee,
      setEmployee,
      admin,
      setAdmin,
    }),
    [resident, setResident, employee, setEmployee, admin, setAdmin]
  );

  useEffect(() => {
    let residentObj = sessionStorage.getItem("resident-obj");
    let employeeObj = sessionStorage.getItem("employee-obj");
    let adminObj = sessionStorage.getItem("admin-obj");
    if (residentObj && !resident) setResident(JSON.parse(residentObj));
    if (employeeObj && !employee) setEmployee(JSON.parse(employeeObj));
    if (adminObj && !admin) setAdmin(JSON.parse(adminObj));
  }, [admin, resident, employee]);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    }
  }, [token]);

  const connexion = (token) => {
    setToken(token);
  };

  const deconnexion = () => {
    setToken("");
    setResident(null);
    setEmployee(null);
    setAdmin(null);
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("resident-obj");
    sessionStorage.removeItem("employee-obj");
    sessionStorage.removeItem("admin-obj");
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={mmainTheme}>
        <Router>
          <AuthContext.Provider value={value}>
            <Suspense
              fallback={
                <div
                  style={{
                    width: "100vw",
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress color="primary" size="5rem" thickness={5} />
                </div>
              }
            >
              <ScrollToTop />
              <Switch>
                <Route path="/" exact>
                  <Main deconnexion={deconnexion} />
                </Route>
                {/* Resident routes */}
                <ResidentRoute path="/tableau-de-bord">
                  <ResidentDashboard deconnexion={deconnexion} />
                </ResidentRoute>
                {/* Employees routes */}
                <EmployeeRoute path="/dashboard">
                  <EmployeeDashboard deconnexion={deconnexion} />
                </EmployeeRoute>
                {/* Admin routes */}
                <AdminRoute path="/admin-dashboard" exact>
                  <AdminDashboard deconnexion={deconnexion} />
                </AdminRoute>
                <Route path="/404" exact>
                  <Error404 deconnexion={deconnexion} />
                </Route>
                <Route>
                  <NotFoundRedirect />
                </Route>
              </Switch>
            </Suspense>
          </AuthContext.Provider>
        </Router>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
