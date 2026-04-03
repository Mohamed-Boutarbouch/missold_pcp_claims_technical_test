import Image from "next/image";
import { Container } from "./container";

export function Header() {
  return (
    <Container>
      <div className="flex justify-between items-center">
        <div className="w-36 md:w-48 lg:w-72">
          <Image
            src="/logo.svg"
            alt="Application logo"
            width={366}
            height={78}
            className="w-full h-auto"
          />
        </div>

        <div className="w-20 md:w-36">
          <Image
            src="/secure.svg"
            alt="Secure badge"
            width={150}
            height={50}
            className="w-full h-auto"
          />
        </div>
      </div>
    </Container>
  );
}
