import Image from "next/image";

export function WorkingWith() {
  return (
    <section className="relative w-105 aspect-366/78">
      <Image
        src="/working_with.svg"
        alt="Trusted UK law firms working with PCPClaims"
        fill
        className="object-contain"
        loading="eager"
      />
    </section>
  )
}

