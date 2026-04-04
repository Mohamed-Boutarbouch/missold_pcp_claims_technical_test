import Image from "next/image";

export function LogoCloud() {
  return (
    <section className="relative w-fit">
      <div className="absolute -top-12 -left-26 w-46">
        <Image
          src="/locksley_law_1.svg"
          alt="Locksley law 1"
          width={144}
          height={48}
          className="h-auto w-full"
          priority
        />
      </div>

      <div className="w-244 max-w-full">
        <Image
          src="/locksley_law_2.svg"
          alt="Locksley law 2"
          width={975}
          height={120}
          className="h-auto w-full"
          priority
        />
      </div>
    </section>
  );
}
