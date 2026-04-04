import { Container } from "@/components/container";
import Link from "next/link";

export default function Contact() {
  return (
    <Container>
      <Link href="/" className="text-white">Go back</Link>
      <h1 className="text-white">Hello</h1>
    </Container>
  );
}
