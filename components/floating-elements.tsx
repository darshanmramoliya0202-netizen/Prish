"use client";

export default function FloatingElements() {
  const particles = [
    { size: 6, left: "8%", top: "18%", delay: "0s", duration: "7s", color: "bg-saffron/10" },
    { size: 4, left: "92%", top: "12%", delay: "1.2s", duration: "8s", color: "bg-slate/8" },
    { size: 8, left: "78%", top: "65%", delay: "2.4s", duration: "9s", color: "bg-saffron/8" },
    { size: 5, left: "15%", top: "72%", delay: "0.8s", duration: "6s", color: "bg-forest/8" },
    { size: 3, left: "55%", top: "25%", delay: "3s", duration: "7.5s", color: "bg-saffron/6" },
    { size: 7, left: "35%", top: "85%", delay: "1.5s", duration: "8.5s", color: "bg-turmeric/6" },
    { size: 4, left: "68%", top: "40%", delay: "2s", duration: "6.5s", color: "bg-slate/6" },
    { size: 5, left: "45%", top: "55%", delay: "0.5s", duration: "7s", color: "bg-saffron/5" },
  ];

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {particles.map((p, i) => (
        <div
          key={i}
          className={`absolute rounded-full ${p.color}`}
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
            animation: `float ${p.duration} ease-in-out infinite`,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
