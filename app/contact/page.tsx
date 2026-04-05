import { ContactForm } from "@/components/contact-form";
import { Container } from "@/components/container";
import { Suspense } from "react";

export default function Contact() {
  return (
    <Container>
      <div className="font-sans w-full bg-white rounded-2xl p-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Get in touch</h1>
        <p className="text-gray-500 text-sm mb-8">
          Fill in your details and we'll contact you shortly.
        </p>
        <Suspense fallback={<div className="text-sm text-gray-400">Loading…</div>}>
          <ContactForm />
        </Suspense>
      </div>
    </Container>
  );
}
