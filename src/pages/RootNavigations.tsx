import { Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import LandingPage from "@/components/landing-page";
import ContactForm from "@/components/contact-form";

const RootNavigations = () => {
  return (
    <Suspense fallback={<LandingPage />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create_contact" element={<ContactForm />} />
        <Route path="/create_contact_on_new_window" element={<ContactForm newWindow={true} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default RootNavigations;
