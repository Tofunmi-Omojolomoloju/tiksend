import React from 'react'
import { useEffect, useState } from 'react';

function Header() {

const [solid, setSolid] = useState(false);

  useEffect(() => {
    // When the hero leaves the viewport, make the header solid
    const hero = document.getElementById("hero");
    if (!hero) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        // if hero NOT intersecting => add solid style
        setSolid(!entry.isIntersecting);
      },
      { rootMargin: "-80px 0px 0px 0px", threshold: 0 }
    );

    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#070b14]/70 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            {/* Brand */}
            <a className="flex items-center gap-2 font-extrabold text-white" href="#home">
            <span
                className="inline-block h-7 w-7 rounded-md"
                style={{ background: "linear-gradient(75deg, var(--accent), #070b14)" }}
            />
            Tiksend
            </a>

            {/* Nav */}
            <nav className="hidden md:flex items-center gap-7 text-sm nav-ink">
            <a className="underline-anim" href="#home">Home</a>
            <a className="underline-anim" href="#track">Track</a>
            <a className="underline-anim" href="#services">Services</a>
            <a className="underline-anim" href="#rider">I am a Rider</a>
            <a className="underline-anim" href="#about">About</a>
            <a className="underline-anim" href="#contact">Contact Us</a>
            </nav>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-3">
            <a href="#signin" className="text-white/85 hover:text-white text-sm">Sign in</a>
            <a href="#start" className="px-4 py-2 rounded-md button-primary text-sm font-semibold">
                Start Delivery
            </a>
            </div>
        </div>
    </header>
  );
}



export default Header