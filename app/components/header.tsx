import Image from "next/image";
import { Container } from "./container";

export function Header() {
  return (
    <Container>
      <div className="flex justify-between items-center">
        <div className="relative w-64 md:w-80 aspect-366/78">
          <Image
            src="/logo.svg"
            alt="Application logo"
            fill
            className="object-contain"
            loading="eager"
          />
        </div>

        <div className="relative w-40 md:w-60 aspect-3/1">
          <Image
            src="/secure.svg"
            alt="Secure badge"
            fill
            className="object-contain"
            loading="eager"
          />
        </div>
      </div>
    </Container>
  );
}
