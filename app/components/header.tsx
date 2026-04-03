import Image from "next/image";
import { Container } from "./container";

export function Header() {
  return (
    <Container>
      <div className="flex justify-between items-center">
        <Image
          src="/logo.svg"
          alt="application logo"
          width={366}
          height={78}
        />

        <Image
          src="/secure.svg"
          alt="secure ssl encryption"
          width={150}
          height={50}
        />
      </div>
    </Container>
  )
}
