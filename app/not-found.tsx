import Link from "next/link";

export default function NotFound() {
  return (
    <div data-theme="light" className="min-h-dvh grid place-items-center container-x">
      <div className="text-center max-w-xl">
        <p className="eyebrow text-ink-500">404</p>
        <h1 className="text-display-lg mt-4">This page went to the wrong port.</h1>
        <p className="mt-6 text-lead text-ink-700">
          Happens to the best consignments. Let&apos;s get you back on the right route.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/" className="rounded-full bg-forest-900 px-6 py-3 text-cream-50 font-semibold">
            Back to the field
          </Link>
          <Link href="/products" className="rounded-full border border-forest-900 px-6 py-3 font-semibold">
            See products
          </Link>
        </div>
      </div>
    </div>
  );
}
