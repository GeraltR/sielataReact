import { Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Suspense, lazy } from "react";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const AuthLayout = lazy(() => import("./layouts/AuthLayout"));
const GuestLayout = lazy(() => import("./layouts/GuestLayout"));
const Jury = lazy(() => import("./pages/Jury"));
const RegisteredModels = lazy(() => import("./pages/RegisteredModels"));
const ListResults = lazy(() => import("./pages/ListResults"));
const ConnecCategories = lazy(() => import("./pages/ConnecCategories"));
const ModelCard = lazy(() => import("./pages/print/ModelCard"));
const Qualification = lazy(() => import("./pages/Qualification"));
const GrandPrixes = lazy(() => import("./pages/GrandPrixes"));
const DiplomasList = lazy(() => import("./pages/DiplomasList"));
const ResultsCompetition = lazy(() => import("./pages/ResultsCompetition"));
const Parameters = lazy(() => import("./pages/Parameters"));

function App() {
  return (
    <>
      <Helmet htmlAttributes={{ lang: "pl" }} />
      <div className="min-h-screen bg-cover bg-no-repeat bg-[url('./assets/images/bg.jpg')] print:bg-none">
        <Suspense fallback={<div>Ładowanie...</div>}>
          <Routes>
            <Route element={<AuthLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/listresults" element={<ListResults />} />
              <Route path="/registeredmodels" element={<RegisteredModels />} />
              <Route path="/conneccategories" element={<ConnecCategories />} />
              <Route path="/qualification" element={<Qualification />} />
              <Route path="/grandprixes" element={<GrandPrixes />} />
              <Route path="/diplomaslist" element={<DiplomasList />} />
              <Route path="/jury" element={<Jury />} />
              <Route path="/parameters" element={<Parameters />} />
              <Route path="/printmodelcard" element={<ModelCard />} />
              <Route
                path="/competitionresults"
                element={<ResultsCompetition />}
              />
            </Route>
            <Route element={<GuestLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/password-reset/:token" element={<ResetPassword />} />
              <Route path="/results" element={<ResultsCompetition />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
