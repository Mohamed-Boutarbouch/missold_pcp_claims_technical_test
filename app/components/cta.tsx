import Link from "next/link";

export function Cta() {
  return (
    <section className="flex flex-col justify-between gap-4">
      <div className="font-display text-white font-bold text-4xl capitalize">
        <h1>
          claim money back
        </h1>

        <h2>
          from mis-sold car finance
        </h2>
      </div>

      <h3 className="font-body font-medium text-subheader">
        You could be one of 14 million* drivers owed money due to mis-sold PCP or HP between 2007-2024.
      </h3>

      <Link
        href="/contact"
        className="font-display font-black bg-cta text-white text-center text-4xl uppercase p-8 rounded-4xl transition-colors duration-300 ease-in-out hover:bg-cta/80"
      >
        check my claim now
      </Link>

      <div className="font-body font-medium text-white text-2xl text-center">
        <p>✅ Takes just a few moments.</p>
        <p>⭐ Trusted by thousands of UK claimants</p>
      </div>
    </section>
  );
}
