import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./utilities/axios";
import "./index.css";
import OnBoarding from "./pages/OnBoarding";
import GuestLayout from "./pages/Guestlayout";

import CreateOrganization from "./pages/Organization/CreateOrganization";
import Organization from "./pages/Organization/Organization";
import ListOrganization from "./pages/Organization/ListOrganization";
import HomeLayout from "./pages/HomeLayout";
import Analytics from "./pages/Analytics";
import Dashboard from "./pages/Dashboard";
import Contacts from "./pages/Contacts";

function App() {
  return (
    <Suspense fallback={<h6>Loading...</h6>}>
      <Routes>
        <Route path="/" element={<GuestLayout />}>
          <Route path="/" element={<OnBoarding />} />
          <Route path="/CreateOrganization" element={<CreateOrganization />} />
          {/* <Route path="/Organization" element={<Organization />} /> */}
          <Route path="/Organization" element={<ListOrganization />} />
        </Route>
        <Route element={<HomeLayout />}>
          <Route path="/Analytics" element={<Analytics />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Contacts" element={<Contacts />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
