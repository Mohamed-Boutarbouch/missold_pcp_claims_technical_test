import Image from "next/image";

export function Disclaimer() {
  return (
    <div className="relative p-12 opacity-90 rounded-4xl bg-primary/90">
      <div className="absolute -top-5 -left-5 w-20">
        <Image
          src="/exclamation_mark.svg"
          alt="Disclaimer"
          width={40}
          height={20}
          className="w-full h-auto"
        />
      </div>
      <p className="font-body text-white font-medium">You do not need to use a claims management company or solicitors, you can complain directly to your lender or to the Financial Ombudsman Service free of charge. The Financial Conduct Authority FCA is consulting on a potential redress scheme for specific motor-finance commission complaints. Lenders have until 4 December 2025 to respond to eligible complaints.</p>
    </div>
  )
}
