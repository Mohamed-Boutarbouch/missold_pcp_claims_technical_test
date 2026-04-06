import { ContactForm } from "@/components/contact-form"
import { Container } from "@/components/container"
import { getTrackingParams } from "@/lib/get-tracking-params"

export default async function Contact() {
  const tracking = await getTrackingParams()

  return (
    <Container>
      <div className="font-sans w-full bg-white rounded-2xl p-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Get in touch</h1>
        <p className="text-gray-500 text-sm mb-8">
          Fill in your details and we'll contact you shortly.
        </p>
        <ContactForm tracking={tracking} />
      </div>
    </Container>
  )
}
