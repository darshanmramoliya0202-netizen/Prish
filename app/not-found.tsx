import Link from "next/link";
import SiteShell from "@/components/site-shell";

export default function NotFound() {
  return (
    <SiteShell>
      <section className="mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center px-6 py-20 text-center sm:px-8">
        <p className="text-xs uppercase tracking-[0.4em] text-copper/80">Page not found</p>
        <h1 className="mt-6 font-serif text-5xl text-mist sm:text-6xl">This route is not part of the current export journey.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-mist/66">
          The page you are looking for may have moved, or the address may be incorrect. Continue into the main site experience below.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link href="/" className="inline-flex items-center justify-center rounded-full bg-copper px-6 py-3 text-sm font-semibold text-ink transition hover:bg-[#e0b885]">
            Return home
          </Link>
          <Link href="/inquiry" className="inline-flex items-center justify-center rounded-full border border-white/12 px-6 py-3 text-sm font-semibold text-mist transition hover:border-white/25 hover:bg-white/[0.06]">
            Start an inquiry
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
