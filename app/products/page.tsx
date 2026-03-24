import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteShell from "@/components/site-shell";
import { createPageMetadata } from "@/data/seo";
import { applicationMatrix, productCategories } from "@/data/content";

// Sophisticated visual system with enhanced metadata
const categoryVisuals: Record<string, { hero: string; crop: string; accent: string; mood: string }> = {
  "botanical-powders": {
    hero: "/images/products/jamun-powder.jpg",
    crop: "/images/products/beetroot-powder.jpg",
    accent: "Botanical Alchemy",
    mood: "Vibrant & Vital"
  },
  "dehydrated-ingredients": {
    hero: "/images/products/ginger-powder.jpg",
    crop: "/images/products/garlic.jpg",
    accent: "Savory Architecture",
    mood: "Rich & Intense"
  },
  "export-staples": {
    hero: "/images/products/basmati-rice.jpg",
    crop: "/images/products/dry-red-chilli.jpg",
    accent: "Global Heritage",
    mood: "Pure & Premium"
  }
};

// Enhanced product visual system with premium metadata
const productVisualMap: Record<string, { 
  product: string; 
  origin: string; 
  originLabel: string;
  story: string;
  essence: string;
}> = {
  "Jamun Powder": {
    product: "/images/products/jamun-powder.jpg",
    origin: "/images/sections/farm-sourcing.jpg",
    originLabel: "Ancient Fruit",
    story: "Deep purple legacy from Indian orchards",
    essence: "Antioxidant Power"
  },
  "Beetroot Powder": {
    product: "/images/products/beetroot-powder.jpg",
    origin: "/images/sections/farm-sourcing.jpg",
    originLabel: "Earth Root",
    story: "Vibrant crimson from fertile soil",
    essence: "Natural Energy"
  },
  "Turmeric Powder": {
    product: "/images/products/turmeric-product.jpg",
    origin: "/images/products/turmeric-raw.jpg",
    originLabel: "Golden Spice",
    story: "5000 years of golden wellness",
    essence: "Curcumin Rich"
  },
  "Sea Buckthorn Powder": {
    product: "/images/products/sea-buckthorn-powder.jpg",
    origin: "/images/sections/farm-sourcing.jpg",
    originLabel: "Coastal Berry",
    story: "Tart brilliance from Himalayan slopes",
    essence: "Vitamin C Superpower"
  },
  "Dehydrated Onion Powder": {
    product: "/images/products/dehydrated-onion.jpg",
    origin: "/images/sections/ingredient-closeup.jpg",
    originLabel: "Sweet Bulb",
    story: "Transformed into savory gold",
    essence: "Flavor Foundation"
  },
  "Dehydrated Garlic Powder": {
    product: "/images/products/garlic.jpg",
    origin: "/images/sections/ingredient-closeup.jpg",
    originLabel: "Aromatic Pearl",
    story: "Intense essence from white cloves",
    essence: "Culinary Powerhouse"
  },
  "Fried Onion": {
    product: "/images/products/fried-onion.jpg",
    origin: "/images/sections/ingredient-closeup.jpg",
    originLabel: "Crisped Gold",
    story: "Perfect crunch, deep flavor",
    essence: "Texture Master"
  },
  "1121 White Sella Rice": {
    product: "/images/products/basmati-rice.jpg",
    origin: "/images/sections/farm-sourcing.jpg",
    originLabel: "Pearl Grain",
    story: "Extra-long heritage basmati",
    essence: "Royal Excellence"
  },
  "1509 Golden Sella Rice": {
    product: "/images/products/basmati-rice.jpg",
    origin: "/images/sections/farm-sourcing.jpg",
    originLabel: "Sun-Kissed Grain",
    story: "Golden harvest perfection",
    essence: "Premium Choice"
  },
  "Indian Raw Spices": {
    product: "/images/products/red-chilli-powder.jpg",
    origin: "/images/products/cumin-seeds.jpg",
    originLabel: "Spice Treasury",
    story: "India's aromatic wealth",
    essence: "Authentic Fire"
  }
};

// Editorial featured products with enhanced storytelling
const featuredProducts = [
  {
    name: "Jamun Powder",
    category: "Botanical Jewel",
    image: productVisualMap["Jamun Powder"].product,
    crop: productVisualMap["Jamun Powder"].origin,
    originLabel: productVisualMap["Jamun Powder"].originLabel,
    story: productVisualMap["Jamun Powder"].story,
    essence: productVisualMap["Jamun Powder"].essence,
    tagline: "Purple Revolution",
    impact: "Polyphenol powerhouse"
  },
  {
    name: "Sea Buckthorn Powder",
    category: "Coastal Elixir",
    image: productVisualMap["Sea Buckthorn Powder"].product,
    crop: productVisualMap["Sea Buckthorn Powder"].origin,
    originLabel: productVisualMap["Sea Buckthorn Powder"].originLabel,
    story: productVisualMap["Sea Buckthorn Powder"].story,
    essence: productVisualMap["Sea Buckthorn Powder"].essence,
    tagline: "Orange Miracle",
    impact: "Vitamin C titan"
  },
  {
    name: "Turmeric Powder",
    category: "Golden Legacy",
    image: productVisualMap["Turmeric Powder"].product,
    crop: productVisualMap["Turmeric Powder"].origin,
    originLabel: productVisualMap["Turmeric Powder"].originLabel,
    story: productVisualMap["Turmeric Powder"].story,
    essence: productVisualMap["Turmeric Powder"].essence,
    tagline: "Sacred Gold",
    impact: "Ancient wellness"
  },
  {
    name: "Dehydrated Garlic Powder",
    category: "Aromatic Pearl",
    image: productVisualMap["Dehydrated Garlic Powder"].product,
    crop: productVisualMap["Dehydrated Garlic Powder"].origin,
    originLabel: productVisualMap["Dehydrated Garlic Powder"].originLabel,
    story: productVisualMap["Dehydrated Garlic Powder"].story,
    essence: productVisualMap["Dehydrated Garlic Powder"].essence,
    tagline: "White Fire",
    impact: "Flavor revolution"
  },
  {
    name: "1121 White Sella Rice",
    category: "Royal Grain",
    image: productVisualMap["1121 White Sella Rice"].product,
    crop: productVisualMap["1121 White Sella Rice"].origin,
    originLabel: productVisualMap["1121 White Sella Rice"].originLabel,
    story: productVisualMap["1121 White Sella Rice"].story,
    essence: productVisualMap["1121 White Sella Rice"].essence,
    tagline: "Pearl Excellence",
    impact: "Basmati perfection"
  },
  {
    name: "Indian Raw Spices",
    category: "Spice Treasury",
    image: productVisualMap["Indian Raw Spices"].product,
    crop: productVisualMap["Indian Raw Spices"].origin,
    originLabel: productVisualMap["Indian Raw Spices"].originLabel,
    story: productVisualMap["Indian Raw Spices"].story,
    essence: productVisualMap["Indian Raw Spices"].essence,
    tagline: "Aromatic Wealth",
    impact: "Authentic fire"
  }
] as const;

export const metadata: Metadata = createPageMetadata({
  title: "Products | Botanical Powders, Dehydrated Ingredients, Rice, and Spice Supply",
  description:
    "Explore Prish Overseas product categories across botanical powders, dehydrated ingredients, export staples, and application-led sourcing solutions.",
  path: "/products",
  keywords: ["product catalog", "jamun powder exporter", "dehydrated onion powder", "rice exporter India"]
});

export default function ProductsPage() {
  return (
    <SiteShell>
      {/* Dramatic Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background gradient with sophisticated overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,58,180,0.3),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(217,119,6,0.2),transparent_50%)]" />
        </div>
        
        {/* Hero content with sophisticated layout */}
        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid w-full items-center gap-16 lg:grid-cols-[1.2fr_0.8fr]">
            
            {/* Left: Typography masterpiece */}
            <div className="space-y-8">
              {/* Sophisticated eyebrow */}
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400/80">
                  Prish Overseas
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-amber-400/20 to-amber-400" />
                  <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-200">
                    Portfolio Excellence
                  </p>
                  <div className="h-px flex-1 bg-gradient-to-l from-amber-400/20 to-amber-400" />
                </div>
              </div>
              
              {/* Dramatic headline */}
              <div className="space-y-4">
                <h1 className="max-w-4xl font-serif text-5xl font-normal leading-[0.95] text-white sm:text-6xl lg:text-7xl xl:text-8xl">
                  <span className="block text-amber-100 drop-shadow-[0_6px_24px_rgba(0,0,0,0.45)]">
                    Nature's Finest
                  </span>
                  <span className="block text-3xl font-normal text-white sm:text-4xl lg:text-5xl">
                    Transformed
                  </span>
                </h1>
                <p className="max-w-2xl text-lg font-normal leading-relaxed text-slate-100 sm:text-xl">
                  Botanical powders, dehydrated ingredients, and export staples 
                  <br />
                  <span className="text-amber-200">crafted for the world's most discerning buyers</span>
                </p>
              </div>
              
              {/* Sophisticated value propositions */}
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { 
                    icon: "✦", 
                    label: "Visual Excellence", 
                    value: "Editorial-grade portfolio"
                  },
                  { 
                    icon: "◆", 
                    label: "Global Reach", 
                    value: "Export-ready perfection"
                  },
                  { 
                    icon: "●", 
                    label: "Craft Heritage", 
                    value: "Indian origin mastery"
                  }
                ].map((item) => (
                  <div 
                    key={item.label} 
                    className="group rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-md transition-all duration-500 hover:border-amber-300/30 hover:bg-white/15"
                  >
                    <div className="space-y-3">
                      <p className="text-2xl text-amber-200 group-hover:text-amber-100">
                        {item.icon}
                      </p>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-100">
                        {item.label}
                      </p>
                      <p className="text-sm font-medium leading-6 text-slate-100/90">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Sophisticated CTA */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link 
                  href="/inquiry" 
                  className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-4 text-sm font-semibold text-white transition-all duration-500 hover:from-amber-600 hover:to-amber-700 hover:shadow-[0_20px_60px_rgba(217,119,6,0.3)]"
                >
                  <span className="mr-2 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                  Request Portfolio Access
                </Link>
                <Link 
                  href="/quality" 
                  className="inline-flex items-center justify-center rounded-full border border-amber-400/20 px-8 py-4 text-sm font-semibold text-amber-200 transition-all duration-500 hover:border-amber-400/40 hover:bg-amber-400/5"
                >
                  Quality Standards
                </Link>
              </div>
            </div>
            
            {/* Right: Visual showcase */}
            <div className="space-y-6">
              {/* Main hero image with sophisticated treatment */}
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.32)] backdrop-blur-md">
                <div className="relative h-96">
                  <Image
                    src="/images/products/product-portfolio.jpg"
                    alt="Prish Overseas Portfolio Excellence"
                    fill
                    sizes="(min-width: 1024px) 35vw, 100vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-8">
                    <div className="space-y-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
                        Portfolio Showcase
                      </p>
                      <p className="max-w-sm font-serif text-2xl font-normal leading-tight text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.4)]">
                        Where nature meets precision
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Application insights */}
              <div className="space-y-3">
                {applicationMatrix.slice(0, 2).map((item) => (
                  <div 
                    key={item.sector} 
                    className="group rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-md transition-all duration-500 hover:border-amber-300/30 hover:bg-white/15"
                  >
                    <div className="space-y-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-100">
                        {item.sector}
                      </p>
                      <p className="text-sm font-medium leading-6 text-slate-100/90">
                        {item.requirement}
                      </p>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-200/90">
                        {item.solutions.slice(0, 2).join(" · ")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Featured Section */}
      <section className="relative py-24">
        {/* Sophisticated background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(217,119,6,0.1),transparent_70%)]" />
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          {/* Sophisticated section header */}
          <div className="mb-20 text-center">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-amber-400/20 bg-amber-400/5 px-6 py-3 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
                Featured Selections
              </p>
              <div className="h-1 w-8 rounded-full bg-gradient-to-r from-amber-400 to-amber-600" />
            </div>
            <div className="space-y-6">
              <h2 className="font-serif text-4xl font-normal leading-tight text-white sm:text-5xl lg:text-6xl">
                <span className="text-amber-100">
                  Editorial Excellence
                </span>
              </h2>
              <p className="mx-auto max-w-3xl text-lg font-normal leading-relaxed text-slate-100/90">
                Each product tells a story of origin, craft, and purpose 
                <br />
                <span className="text-amber-200">curated for the world's most discerning formulations</span>
              </p>
            </div>
          </div>
          
          {/* Editorial product grid */}
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {featuredProducts.map((product) => (
              <article 
                key={product.name} 
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-md transition-all duration-700 hover:border-amber-300/30 hover:shadow-[0_40px_120px_rgba(217,119,6,0.18)]"
              >
                {/* Product visual showcase */}
                <div className="relative h-80">
                  <div className="absolute inset-0">
                    <Image 
                      src={product.image} 
                      alt={product.name} 
                      fill 
                      sizes="(min-width: 1280px) 28vw, (min-width: 768px) 42vw, 100vw" 
                      className="object-cover object-center transition-all duration-1000 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                  </div>
                  
                  {/* Floating category badge */}
                  <div className="absolute left-6 top-6 rounded-full border border-white/15 bg-slate-950/55 px-4 py-2 backdrop-blur-md">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-100">
                      {product.category}
                    </p>
                  </div>
                  
                  {/* Origin visual */}
                  <div className="absolute right-6 top-6 h-20 w-20 overflow-hidden rounded-2xl border border-white/15 bg-slate-950/55 backdrop-blur-md">
                    <Image 
                      src={product.crop} 
                      alt={`${product.name} origin`} 
                      fill 
                      sizes="80px" 
                      className="object-cover object-center" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                    <div className="absolute inset-x-0 bottom-1 p-2 text-center">
                      <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-amber-100">
                        {product.originLabel}
                      </p>
                    </div>
                  </div>
                  
                  {/* Product info overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-8">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-serif text-2xl font-normal leading-tight text-white">
                          {product.name}
                        </h3>
                        <p className="mt-2 text-sm font-medium leading-6 text-slate-100/95">
                          {product.story}
                        </p>
                      </div>
                      
                      {/* Essence and tagline */}
                      <div className="flex items-center gap-4">
                        <div className="rounded-full border border-white/15 bg-slate-950/55 px-3 py-1.5 backdrop-blur-md">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-100">
                            {product.essence}
                          </p>
                        </div>
                        <div className="h-px flex-1 bg-gradient-to-r from-amber-400/20 to-transparent" />
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-100/90">
                          {product.tagline}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Impact statement */}
                <div className="border-t border-white/10 bg-slate-900/80 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-100">
                        Impact
                      </p>
                      <p className="mt-1 text-sm font-medium text-slate-100/90">
                        {product.impact}
                      </p>
                    </div>
                    <div className="rounded-full bg-gradient-to-r from-amber-500 to-amber-600 p-2">
                      <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Sophisticated Category Showcase */}
      <section className="relative py-24">
        {/* Premium background with animated gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(120,58,180,0.08),transparent_60%)] animate-pulse" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(217,119,6,0.06),transparent_60%)] animate-pulse" style={{animationDelay: '2s'}} />
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          {/* Editorial section header with enhanced typography */}
          <div className="mb-20 text-center">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-amber-400/20 bg-amber-400/5 px-6 py-3 backdrop-blur-sm transition-all duration-500 hover:border-amber-400/30 hover:bg-amber-400/10">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
                Product Families
              </p>
              <div className="h-1 w-8 rounded-full bg-gradient-to-r from-amber-400 to-amber-600" />
            </div>
            <div className="space-y-6">
              <h2 className="font-serif text-4xl font-normal leading-tight text-white sm:text-5xl lg:text-6xl">
                <span className="text-amber-100">
                  Curated Collections
                </span>
              </h2>
              <p className="mx-auto max-w-3xl text-lg font-normal leading-relaxed text-slate-100/90">
                Three distinct families of excellence 
                <br />
                <span className="text-amber-200">each with its own story, purpose, and promise</span>
              </p>
            </div>
          </div>
          
          {/* Category showcase with enhanced interactions */}
          <div className="space-y-24">
            {productCategories.map((category) => (
              <article 
                key={category.slug} 
                className="group"
              >
                <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr]">
                  {/* Left: Category story */}
                  <div className="space-y-8">
                    {/* Category header */}
                    <div className="space-y-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
                        {category.eyebrow}
                      </p>
                      <h3 className="font-serif text-3xl font-normal leading-tight text-white sm:text-4xl lg:text-5xl">
                        {category.title}
                      </h3>
                      <p className="text-lg font-normal leading-relaxed text-slate-100/88">
                        {category.overview}
                      </p>
                    </div>
                    
                    {/* Enhanced visual showcase */}
                    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.32)] backdrop-blur-md transition-all duration-700 group-hover:border-amber-300/25 group-hover:shadow-[0_40px_120px_rgba(217,119,6,0.2)]">
                      <div className="relative h-64">
                        <Image
                          src={categoryVisuals[category.slug]?.hero ?? "/images/products/product-portfolio.jpg"}
                          alt={category.title}
                          fill
                          sizes="(min-width: 1024px) 35vw, 100vw"
                          className="object-cover object-center transition-all duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-8">
                          <div className="space-y-3">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">
                              {categoryVisuals[category.slug]?.accent ?? "Portfolio Selection"}
                            </p>
                            <p className="max-w-sm font-serif text-2xl font-normal leading-tight text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.4)]">
                              {categoryVisuals[category.slug]?.mood ?? "Premium Quality"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-[1fr_auto] items-center gap-4 border-t border-white/10 bg-slate-900/80 p-6">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-100">
                            Origin Story
                          </p>
                          <p className="mt-1 text-sm font-medium text-slate-100/90">
                            {category.sourcing}
                          </p>
                        </div>
                        <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-amber-400/20 bg-amber-400/10 transition-all duration-500 group-hover:scale-110">
                          <Image
                            src={categoryVisuals[category.slug]?.crop ?? "/images/sections/ingredient-closeup.jpg"}
                            alt={`${category.title} origin`}
                            fill
                            sizes="64px"
                            className="object-cover object-center"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Enhanced applications and formats */}
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-md transition-all duration-500 hover:border-amber-300/25 hover:shadow-[0_20px_60px_rgba(217,119,6,0.1)]">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-100">
                          Applications
                        </p>
                        <ul className="mt-4 space-y-3">
                          {category.applications.map((application) => (
                            <li key={application} className="flex items-center gap-3">
                              <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                              <span className="text-sm font-medium text-slate-100/90">{application}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-md transition-all duration-500 hover:border-amber-300/25 hover:shadow-[0_20px_60px_rgba(217,119,6,0.1)]">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-100">
                          Formats
                        </p>
                        <ul className="mt-4 space-y-3">
                          {category.formats.map((format) => (
                            <li key={format} className="flex items-center gap-3">
                              <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                              <span className="text-sm font-medium text-slate-100/90">{format}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right: Enhanced product grid */}
                  <div className="space-y-8">
                    <div className="grid gap-6">
                      {category.products.map((product) => (
                        <div 
                          key={product.name} 
                          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-md transition-all duration-700 hover:border-amber-300/25 hover:shadow-[0_30px_90px_rgba(217,119,6,0.15)] hover:-translate-y-1"
                        >
                          {/* Enhanced product visual */}
                          {productVisualMap[product.name] && (
                            <div className="mb-6">
                              <div className="grid gap-4 sm:grid-cols-[1.3fr_0.7fr]">
                                <div className="relative h-48 overflow-hidden rounded-2xl border border-amber-400/10">
                                  <Image
                                    src={productVisualMap[product.name].product}
                                    alt={product.name}
                                    fill
                                    sizes="(min-width: 1024px) 20vw, 100vw"
                                    className="object-cover object-center transition-all duration-1000 group-hover:scale-110"
                                  />
                                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/80 to-transparent p-4">
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-200">
                                      Finished Product
                                    </p>
                                  </div>
                                </div>
                                <div className="grid gap-4">
                                  <div className="relative h-24 overflow-hidden rounded-2xl border border-amber-400/10 transition-all duration-500 group-hover:scale-105">
                                    <Image
                                      src={productVisualMap[product.name].origin}
                                      alt={`${product.name} origin`}
                                      fill
                                      sizes="(min-width: 1024px) 10vw, 100vw"
                                      className="object-cover object-center"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/80 to-transparent p-3">
                                      <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-amber-200">
                                        {productVisualMap[product.name].originLabel}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="rounded-2xl border border-white/10 bg-slate-900/75 p-4 transition-all duration-500 hover:border-amber-300/25">
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-100">
                                      Essence
                                    </p>
                                    <p className="mt-2 text-xs font-medium leading-5 text-slate-100/90">
                                      {productVisualMap[product.name].essence}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {/* Enhanced product details */}
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-serif text-2xl font-normal leading-tight text-white">
                                {product.name}
                              </h4>
                              <p className="mt-3 text-sm font-medium leading-6 text-slate-100/88">
                                {product.profile}
                              </p>
                            </div>
                            
                            {/* Enhanced use cases */}
                            <div className="flex flex-wrap gap-2">
                              {product.useCases.map((useCase) => (
                                <span 
                                  key={useCase} 
                                  className="rounded-full border border-amber-400/20 bg-amber-400/5 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-200/80 backdrop-blur-sm transition-all duration-300 hover:border-amber-400/40 hover:bg-amber-400/10"
                                >
                                  {useCase}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      
      {/* Premium CTA Section */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-amber-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(217,119,6,0.15),transparent_70%)]" />
        </div>
        
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center sm:px-8 lg:px-10">
          <div className="space-y-8">
            <h2 className="font-serif text-4xl font-normal leading-tight text-white sm:text-5xl lg:text-6xl">
              <span className="text-amber-100">
                Ready to Transform
              </span>
              <br />
              <span className="text-3xl font-normal text-white sm:text-4xl">
                Your Formulations?
              </span>
            </h2>
            <p className="mx-auto text-lg font-normal leading-relaxed text-slate-100/90">
              Connect with our portfolio specialists to discover how our botanical powders, 
              dehydrated ingredients, and export staples can elevate your products
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link 
                href="/inquiry" 
                className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-4 text-sm font-semibold text-white transition-all duration-500 hover:from-amber-600 hover:to-amber-700 hover:shadow-[0_30px_90px_rgba(217,119,6,0.4)]"
              >
                <span className="mr-2 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
                Request Portfolio Access
              </Link>
              <Link 
                href="/quality" 
                className="inline-flex items-center justify-center rounded-full border border-amber-400/20 px-8 py-4 text-sm font-semibold text-amber-200 transition-all duration-500 hover:border-amber-400/40 hover:bg-amber-400/5"
              >
                Quality Standards
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
