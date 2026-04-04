import { Container } from "./components/container";
import { Cta } from "./components/cta";
import { Disclaimer } from "./components/disclaimer";
import { FinePrint } from "./components/fine-print";
import { LogoCloud } from "./components/logo-cloud";
import { WorkingWith } from "./components/working-with";

export default function Home() {
  return (
    <Container>
      <section className="grid grid-cols-1 md:grid-cols-2 md:gap-x-28 md:gap-y-16">
        <div className="order-4 md:order-1 self-center">
          <Disclaimer />
        </div>

        <div className="order-1 md:order-2">
          <Cta />
        </div>

        <div className="order-2 md:order-3 self-center justify-self-center">
          <WorkingWith />
        </div>

        <div className="order-3 md:order-4 self-center justify-self-center md:translate-x-100 lg:translate-x-70 xl:translate-x-48">
          <LogoCloud />
        </div>
      </section>
      <FinePrint />
    </Container>
  );
}
