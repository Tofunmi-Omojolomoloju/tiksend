import { useEffect } from "react";
import "./App.css";
import Header from "./Components/Header";

export default function App() {
  useEffect(() => {
    // Reveal on scroll
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("show");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    // Subtle pointer glow for buttons
    document.querySelectorAll(".button-primary, .button-ghost").forEach((btn) => {
      btn.addEventListener("pointermove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left, y = e.clientY - rect.top;
        btn.style.setProperty("--mx", x + "px");
        btn.style.setProperty("--my", y + "px");
      });
    });

    return () => io.disconnect();
  }, []);

  return (
    <div className="w-full overflow-hidden">
      <Header />


      {/* HERO — DARK (keeps your gradient/orbs) */}
      <section id="hero"className="relative -mt-16 pt-16 ">
        <div className="hero-bg" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-12 gap-10 items-center">
          {/* LEFT */}
          <div className="lg:col-span-6 text-white">
            <div className="glass badge reveal inline-flex items-center w px-3 py-1 text-xs">Dispatch & Delivery</div>
            <h1 className="reveal mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              Send anything <span style={{ color: "#8ab4ff" }}>across the city</span> in minutes.
            </h1>
            <p className="reveal mt-4 text-lg text-white/80 max-w-xl">
              On-demand <strong>dispatch</strong> with real-time tracking, verified couriers,
              upfront pricing, and photo + PIN proof of delivery.
            </p>

            <div className="reveal mt-8 flex flex-wrap gap-3">
              <a className="px-5 py-3 rounded-lg button-primary font-semibold shadow-xl-soft" href="#cta">Download App</a>
              <a className="px-5 py-3 rounded-lg button-ghost font-semibold" href="#how">Start a Delivery</a>
            </div>

            {/* mini stats */}
            <div className="reveal mt-12 grid grid-cols-3 gap-4 text-center">
              <div className="glass rounded-2xl py-4">
                <div className="text-2xl font-extrabold text-white">3 min</div>
                <div className="text-white/70 text-xs">Avg pickup</div>
              </div>
              <div className="glass rounded-2xl py-4">
                <div className="text-2xl font-extrabold text-white">PIN + Photo</div>
                <div className="text-white/70 text-xs">Proof of delivery</div>
              </div>
              <div className="glass rounded-2xl py-4">
                <div className="text-2xl font-extrabold text-white">4.9★</div>
                <div className="text-white/70 text-xs">User rating</div>
              </div>
            </div>
          </div>

          {/* RIGHT / PHONE */}
          <div className="lg:col-span-6 relative">
            {/* Floaty cards (ONLY change requested) */}
            <div className="absolute -left-15 top-10 glass rounded-2xl p-4 text-white hidden sm:block floaty">
              <div className="text-xs text-white/70">Dispatch</div>
              <div className="font-semibold">Pickup courier found</div>
            </div>
            <div className="absolute -right-8 bottom-16 glass rounded-2xl p-4 text-white hidden sm:block floaty delay">
              <div className="text-xs text-white/70">Status</div>
              <div className="font-semibold">Arriving in 3 min</div>
            </div>

            <div className="phone mx-auto reveal">
              <div className="notch" />
              <div className="screen">
                {/* Map layer (SVG) sits behind the UI cards */}
{/* 60 / 40 layout inside the phone */}
<div className="h-full w-full flex flex-col">

  {/* TOP: 60% — Animated SVG map */}
  <div className="relative" style={{ height: "60%" }}>
    <svg
      viewBox="0 0 360 720"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* subtle grid hint for “map” feel */}
      <g opacity="0.08">
        {Array.from({ length: 16 }).map((_, i) => (
          <line key={"v"+i} x1={i*24} y1="0" x2={i*24} y2="720" stroke="#0A2540" strokeWidth="1" />
        ))}
        {Array.from({ length: 30 }).map((_, i) => (
          <line key={"h"+i} x1="0" y1={i*24} x2="360" y2={i*24} stroke="#0A2540" strokeWidth="1" />
        ))}
      </g>

      {/* Orange route path (animated dashes) */}
      <path
        id="routePath"
        d="
          M 60 560
          C 110 520, 130 460, 120 410
          S 160 330, 200 320
          S 250 280, 230 240
          S 260 210, 300 200
          S 320 180, 300 160
        "
        fill="none"
        stroke="#FF6B00"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#glow)"
        strokeDasharray="14 10"
      >
        <animate attributeName="stroke-dashoffset" from="0" to="-48" dur="2.4s" repeatCount="indefinite" />
      </path>

      {/* Pickup marker */}
      <g>
        <circle cx="60" cy="560" r="7" fill="#16a34a" />
        <circle cx="60" cy="560" r="7" fill="#16a34a" opacity="0.35">
          <animate attributeName="r" values="7;13;7" dur="1.8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.35;0;0.35" dur="1.8s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Destination marker */}
      <g>
        <circle cx="300" cy="160" r="7" fill="#ef4444" />
        <path d="M300 160 l0 -18 l10 6 l-10 6" fill="#ef4444" />
        <circle cx="300" cy="160" r="7" fill="#ef4444" opacity="0.30">
          <animate attributeName="r" values="7;13;7" dur="1.8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.30;0;0.30" dur="1.8s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Moving courier dot */}
      <circle r="6" fill="#FF6B00">
        <animateMotion dur="8s" repeatCount="indefinite" rotate="auto">
          <mpath href="#routePath" />
        </animateMotion>
      </circle>
    </svg>
  </div>

  {/* BOTTOM: 40% — Your glass cards UI */}
  <div className="flex-1 p-4 sm:p-5 grid gap-3 content-start">
    <div className="ui">
      <div className="text-xs text-white/70">From → To</div>
      <div className="mt-1 flex items-center gap-2">
        <span className="inline-block h-2 w-2 rounded-full" style={{ background: "#34d399" }} />
        <span className="text-sm">Abule Egba → Lekki Phase 1</span>
      </div>
    </div>

    <div className="ui">
      <div className="text-xs text-white/70">ETA & Fare</div>
      <div className="mt-1 flex items-center justify-between">
        <span className="text-sm">Pickup 3 min • ₦1,800</span>
        <span className="text-xs bg-white/10 px-2 py-1 rounded">Bike</span>
      </div>
    </div>

    <div className="ui">
      <div className="text-xs text-white/70">Proof</div>
      <div className="mt-1 text-sm">Photo + 4-digit PIN on delivery</div>
    </div>

    <div className="mt-auto grid grid-cols-2 gap-3">
      <button className="rounded-lg button-primary py-2 font-semibold">Start</button>
      <button className="rounded-lg button-ghost py-2 font-semibold">Track</button>
    </div>
  </div>
</div>


              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== LIGHT / ORANGE SECTIONS (scaffold to continue building) ===== */}

      {/* Download band (dark is OK here; change to light later if you prefer) */}
      <section id="download" className="py-14 bg-[#0f1115] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold">Download the GoRide Courier App</h2>
          <p className="mt-2 text-white/80 max-w-2xl">Available on iOS and Android.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a className="px-4 py-3 rounded-lg bg-white text-[#0f1115] font-semibold" href="#">Google Play</a>
            <a className="px-4 py-3 rounded-lg bg-white text-[#0f1115] font-semibold" href="#">App Store</a>
          </div>
        </div>
      </section>

      {/* How it works (light) */}
      <section id="how" className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-sm text-amber-700 flex items-center gap-2">
            <span className="inline-block w-6 h-0.5 bg-amber-600 rounded" />
            How it works
          </div>
          <h3 className="text-3xl font-extrabold mt-1">Book a <span style={{ color: "var(--accent)" }}>Delivery</span> in 3 Steps</h3>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="border border-[rgba(2,6,23,.08)] rounded-xl p-6">
              <div className="h-10 w-10 rounded-full bg-(--accent) text-white flex items-center justify-center font-bold">1</div>
              <h4 className="mt-3 font-semibold">Enter Pickup & Dropoff</h4>
              <p className="text-sm text-slate-600 mt-1">Address or live location.</p>
            </div>
            <div className="border border-[rgba(2,6,23,.08)] rounded-xl p-6">
              <div className="h-10 w-10 rounded-full bg-(--accent) text-white flex items-center justify-center font-bold">2</div>
              <h4 className="mt-3 font-semibold">Choose Vehicle</h4>
              <p className="text-sm text-slate-600 mt-1">Bike, car, or van.</p>
            </div>
            <div className="border border-[rgba(2,6,23,.08)] rounded-xl p-6">
              <div className="h-10 w-10 rounded-full bg-(--accent) text-white flex items-center justify-center font-bold">3</div>
              <h4 className="mt-3 font-semibold">Track Live</h4>
              <p className="text-sm text-slate-600 mt-1">Shareable ETA link + POD.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features (light) */}
      <section id="features" className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-sm text-amber-700 flex items-center gap-2">
            <span className="inline-block w-6 h-0.5 bg-amber-600 rounded" />
            Benefits
          </div>
          <h3 className="text-3xl font-extrabold mt-1">Why businesses trust <span style={{ color: "var(--accent)" }}>GoRide</span></h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div className="border border-[rgba(2,6,23,.08)] rounded-xl p-6">
              <div className="h-12 w-12 rounded-full bg-(--accent)/90 text-white flex items-center justify-center font-bold">₦</div>
              <h4 className="mt-3 font-semibold">Instant Quotes</h4>
              <p className="text-sm text-slate-600 mt-1">Upfront pricing.</p>
            </div>
            <div className="border border-[rgba(2,6,23,.08)] rounded-xl p-6">
              <div className="h-12 w-12 rounded-full bg-(--accent)/90 text-white flex items-center justify-center font-bold">✓</div>
              <h4 className="mt-3 font-semibold">Secure Payments</h4>
              <p className="text-sm text-slate-600 mt-1">Multiple methods.</p>
            </div>
            <div className="border border-[rgba(2,6,23,.08)] rounded-xl p-6">
              <div className="h-12 w-12 rounded-full bg-(--accent)/90 text-white flex items-center justify-center font-bold">⚑</div>
              <h4 className="mt-3 font-semibold">Live Tracking</h4>
              <p className="text-sm text-slate-600 mt-1">Real-time status.</p>
            </div>
            <div className="border border-[rgba(2,6,23,.08)] rounded-xl p-6">
              <div className="h-12 w-12 rounded-full bg-(--accent)/90 text-white flex items-center justify-center font-bold">📷</div>
              <h4 className="mt-3 font-semibold">Proof of Delivery</h4>
              <p className="text-sm text-slate-600 mt-1">Photo + PIN.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing (light) */}
      {/* <section id="pricing" className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-sm text-amber-700 flex items-center gap-2">
            <span className="inline-block w-6 h-[2px] bg-amber-600 rounded" />
            Pricing & Plans
          </div>
          <h3 className="text-3xl font-extrabold mt-1">Choose a plan</h3>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="border border-[rgba(2,6,23,.08)] rounded-xl p-6">
              <div className="text-3xl font-extrabold">₦0</div>
              <div className="text-sm text-slate-600 mt-1">Pay-as-you-go</div>
              <a className="mt-6 inline-block px-4 py-2 rounded-md border border-[rgba(2,6,23,.08)]" href="#">Choose</a>
            </div>
            <div className="border border-[rgba(2,6,23,.08)] rounded-xl p-6 bg-[var(--accent)]/10">
              <div className="text-3xl font-extrabold text-amber-800">₦49k</div>
              <div className="text-sm text-slate-700 mt-1">Business</div>
              <a className="mt-6 inline-block px-4 py-2 rounded-md button-primary" href="#">Choose</a>
            </div>
            <div className="border border-[rgba(2,6,23,.08)] rounded-xl p-6">
              <div className="text-3xl font-extrabold">₦99k</div>
              <div className="text-sm text-slate-600 mt-1">Enterprise</div>
              <a className="mt-6 inline-block px-4 py-2 rounded-md border border-[rgba(2,6,23,.08)]" href="#">Choose</a>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA + Footer (light/orange) */}
      <section id="cta" className="py-14 bg-linear-to-b from-amber-500 to-amber-600 text-white text-center">
        <h3 className="text-3xl font-extrabold">Download the App Now!</h3>
        <p className="mt-2 text-white/90">Book a courier in seconds and track deliveries live.</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <a className="px-4 py-3 rounded-lg bg-white text-slate-900 font-semibold" href="#">Google Play</a>
          <a className="px-4 py-3 rounded-lg bg-white text-slate-900 font-semibold" href="#">App Store</a>
        </div>
      </section>

      <footer className="bg-[#0f1115] text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-8">
          <div>
            <div className="font-extrabold">GoRide Courier</div>
            <p className="mt-2 text-white/70 text-sm">On-demand dispatch & delivery. Live tracking and proof of delivery.</p>
          </div>
          <div>
            <div className="font-semibold">Company</div>
            <ul className="text-white/70 text-sm mt-2 space-y-2">
              <li><a href="#how">How it works</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold">Contact</div>
            <ul className="text-white/70 text-sm mt-2 space-y-2">
              <li>+234 555-0120</li>
              <li>support@goride.app</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold">Get updates</div>
            <form className="mt-2 flex gap-2">
              <input className="w-full rounded-md px-3 py-2 text-sm bg-white/10 border border-white/20 placeholder:text-white/60" placeholder="Email address" />
              <button className="button-primary px-4 rounded-md">›</button>
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
}
