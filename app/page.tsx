import { Container } from "./components/container";
import Disclaimer from "./components/disclaimer";

export default function Home() {
  return (
    <Container>
      <section className="grid grid-cols-1 md:grid-cols-2">

        <div className="order-4 md:order-1">
          <Disclaimer />
        </div>

        <div className="order-1 md:order-2">
          {/* content */}
        </div>

        <div className="order-2 md:order-3">
          {/* content */}
        </div>

        <div className="order-3 md:order-4 -mr-6 md:mr-0">
          {/* content */}
        </div>

      </section>
    </Container>
  );
}
