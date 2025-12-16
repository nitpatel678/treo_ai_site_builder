// Footer.tsx
import React, { useEffect, useState } from "react";
import { GitBranch } from "lucide-react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const [now, setNow] = useState(new Date());

  // live clock (updates every second)
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const year = now.getFullYear();
  const timeString = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const dateString = now.toLocaleDateString();

  return (
    <footer
      aria-labelledby="footer-heading"
      className="
        w-full
        border-t border-white/6
        bg-gradient-to-b from-transparent to-black/40
        backdrop-blur-sm
        text-white/90
      "
    >
      <div className="max-w-6xl mx-auto px-6 py-8 md:py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Brand & copy */}
          <div className="flex items-start md:items-center gap-4">
            <div className="flex items-center gap-3">
             
             <img src="/logo.png" className="h-5" alt="" />
            </div>

            <div className="hidden sm:block text-xs text-white/60">
              <div>Build beautiful web apps in minutes — powered by AI.</div>
            </div>
          </div>

          {/* center: links */}
          <nav aria-label="footer" className="flex gap-6 flex-wrap items-center justify-center">
            <Link to="/" className="text-sm text-white/75 hover:text-white/95 transition">
              Home
            </Link>
            
            <Link to="/pricing" className="text-sm text-white/75 hover:text-white/95 transition">
              Pricing
            </Link>
            <Link to="/community" className="text-sm text-white/75 hover:text-white/95 transition">
              Community
            </Link>
            
          </nav>

          {/* right: social & realtime */}
          <div className="flex items-center gap-4 justify-end">
            <div className="flex items-center gap-2 text-xs text-white/60">
              <span className="hidden sm:inline">{dateString}</span>
              <span className="font-mono text-white/80">{timeString}</span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://github.com/your-repo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2 rounded-md bg-white/6 border border-white/8 hover:bg-white/8 transition"
              >
                <GitBranch className="w-4 h-4 text-white/90" />
              </a>

            
             
            </div>
          </div>
        </div>

        {/* bottom row: copyright */}
        <div className="mt-6 border-t border-white/6 pt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="text-xs text-white/60">
            &copy; {year} Treo — All rights reserved.
          </div>

          <div className="text-xs text-white/60">
            Built with <span className="text-white/80">React</span> •{" "}
            <span className="text-white/80">Node.js</span> • AI
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
