import { Container } from "@/components/container";
import { Cta } from "@/components/cta";
import { Disclaimer } from "@/components/disclaimer";
import { FinePrint } from "@/components/fine-print";
import { LogoCloud } from "@/components/logo-cloud";
import { WorkingWith } from "@/components/working-with";
import { TRACKED_PARAMS } from "@/data/tracked-params";
import { cookies } from "next/headers";

type Props = {
  searchParams: Promise<Record<string, string>>
}

export default async function Home({ searchParams }: Props) {
  const params = await searchParams

  const trackingParams: Record<string, string> = {}
  for (const key of TRACKED_PARAMS) {
    if (params[key]) trackingParams[key] = params[key]
  }

  if (Object.keys(trackingParams).length > 0) {
    const cookieStore = await cookies()
    cookieStore.set("_tracking", JSON.stringify(trackingParams), {
      httpOnly: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 day
    })
  }

  return (
    <Container>
      <section className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-28 md:gap-y-16">
        <div className="order-4 md:order-1 self-center">
          <Disclaimer />
        </div>

        <div className="order-1 md:order-2">
          <Cta />
        </div>

        <div className="order-2 md:order-3 self-center justify-self-center">
          <WorkingWith />
        </div>

        <div className="order-3 md:order-4 self-center justify-self-center translate-x-18 sm:translate-x-26 md:translate-x-100 lg:translate-x-70 xl:translate-x-48">
          <LogoCloud />
        </div>
      </section>
      <FinePrint />
    </Container>
  );
}
