import { Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AuthLayout from "./layouts/AuthLayout";
import GuestLayout from "./layouts/GuestLayout";
import RegisteredModels from "./pages/RegisteredModels";
import Jury from "./pages/Jury";
import ListResults from "./pages/ListResults";
import ConnecCategories from "./pages/ConnecCategories";
import ModelCard from "./pages/print/ModelCard";
import Qualification from "./pages/Qualification";
import GrandPrixes from "./pages/GrandPrixes";
import Parameters from "./pages/Parameters";
import DiplomasList from "./pages/DiplomasList";
import ResultsCompetition from "./pages/ResultsCompetition";

function App() {
  return (
    <>
      <Helmet htmlAttributes={{ lang: "pl" }} />
      <div className="min-h-screen bg-cover bg-no-repeat bg-[url('./assets/images/bg.jpg')] print:bg-none">
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
      </div>
    </>
  );
}

export default App;
