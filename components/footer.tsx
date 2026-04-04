import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-footer font-footerlink text-white text-sm">
      <div className="px-8 max-w-7xl mx-auto my-10 grid gap-y-8 grid-cols-1 md:grid-cols-3 md:grid-rows-[auto_auto]">
        <div className="order-1 md:order-0 justify-self-center self-center md:col-start-3 md:row-start-2 md:justify-self-end">
          <div className="relative w-40 aspect-3/1">
            <Image
              src="/secure.svg"
              alt="Secure badge"
              fill
              className="object-contain"
              loading="eager"
            />
          </div>
        </div>

        <div className="order-2 md:order-0 md:col-span-3 md:row-start-1 text-center">
          <div className="font-body font-medium leading-4">
            <small>Missold PCPClaims is a trading name of Financial Claims Helpline Ltd (FCA No. 833418). You can complain to your lender or to the Financial Ombudsman Service for free. We may refer you to an independent SRA-regulated solicitor; you are free to choose your own solicitor. Customer fees typically range from 15% to 30% plus VAT. The FCA is considering a Consumer Redress Scheme for motor finance, which may provide a free route to redress.</small>
            <br />
            <small>*Average payout figure. Outcomes may vary. <Link href="https://www.fca.org.uk/publications/consultation-papers/cp25-27-motor-finance-consumer-redress-scheme" target="_blank" className="hover:underline hover:underline-offset-2">https://www.fca.org.uk/publications/consultation-papers/cp25-27-motor-finance-consumer-redress-scheme</Link></small>
          </div>
        </div>

        <div className="order-3 justify-self-center self-center md:order-0 md:col-start-1 md:row-start-2 md:justify-self-start">
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <li>
              <Link href="#" className="hover:underline hover:underline-offset-4">
                Terms & conditions
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline hover:underline-offset-4">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline hover:underline-offset-4">
                Complaints
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline hover:underline-offset-4">
                Cookies
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline hover:underline-offset-4">
                Fees
              </Link>
            </li>
          </ul>
        </div>

        <div className="order-4 justify-self-center self-center md:text-center md:order-0 md:col-start-2 md:row-start-2">
          <small>Copyright © {new Date().getFullYear()} Financial Claims Helpline Ltd. All rights reserved.</small>
        </div>
      </div>
    </footer>
  )
}
