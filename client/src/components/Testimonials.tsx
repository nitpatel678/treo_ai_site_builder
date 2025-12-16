import React from "react";
import { User } from "lucide-react";

export default function Testimonials() {
  const cardsData = [
    {
      name: "Alex Verma",
      handle: "@alexcodes",
      date: "April 20, 2025",
      review:
        "Treo helped me turn a rough idea into a polished web app in less than an hour. The AI-generated layouts are insanely accurate.",
    },
    {
      name: "Abhishek Sharma",
      handle: "@abhitech",
      date: "May 5, 2025",
      review:
        "I’ve used multiple AI builders, but Treo feels different — clean UI, modern components, and code that I can actually ship.",
    },
    {
      name: "Maya Singh",
      handle: "@maya.designs",
      date: "June 10, 2025",
      review:
        "As a designer, Treo saves me hours. The generated components already follow beautiful visual rules.",
    },
    {
      name: "Rakesh Patel",
      handle: "@rakeshbuilds",
      date: "May 18, 2025",
      review:
        "Treo generated an entire dashboard UI for my SaaS idea. Zero friction. Just pure productivity.",
    },
  ];

  // extra data for the second marquee (different people)
  const cardsData2 = [
    {
      name: "Daniel Roy",
      handle: "@danieldev",
      date: "June 1, 2025",
      review:
        "I shipped a landing page with Treo and deployed the same day — the code is clean and easy to iterate on.",
    },
    {
      name: "Priya Nair",
      handle: "@priya.design",
      date: "May 29, 2025",
      review:
        "Treo's presets & themes saved me a ton of design time. The dark glassy styles are gorgeous.",
    },
    {
      name: "Sameer Khan",
      handle: "@sameerbuilds",
      date: "April 30, 2025",
      review:
        "Integrations were smooth — I connected the generated frontend to our API in minutes.",
    },
    {
      name: "Nina Gupta",
      handle: "@ninacreates",
      date: "May 12, 2025",
      review:
        "Great for prototypes and production. Treo gives you an excellent starting point that’s already usable.",
    },
  ];

  // card component (dark, glassy)
  const CreateCard = ({ card }: { card: any }) => (
    <div
      className="
        p-4 rounded-xl mx-4 w-72 shrink-0
        bg-white/5 border border-white/10 backdrop-blur-md
        text-white shadow-sm hover:shadow-lg hover:bg-white/10
        transition-all duration-300
      "
    >
      {/* user info */}
      <div className="flex gap-3 items-center">
        <div
          className="w-11 h-11 rounded-full bg-white/6 border border-white/8 flex items-center justify-center"
          aria-hidden
        >
          <User className="w-5 h-5 text-white/90" />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-white/90">
            <p className="font-medium">{card.name}</p>

            {/* Verified badge */}
            <svg
              className="mt-0.5 text-blue-400"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="currentColor"
              aria-hidden
            >
              <path d="M6 .5l1.763 1.024 1.962-.09.09 1.962L10.5 6l-1.024 1.763.09 1.962-1.962-.09L6 11.5l-1.763-1.024-1.962.09.09-1.962L1.5 6l1.024-1.763-.09-1.962 1.962.09L6 .5zm0 3.351L4.356 6 6 8.149 7.644 6 6 3.851z" />
            </svg>
          </div>
          <span className="text-xs text-white/50">{card.handle}</span>
        </div>
      </div>

      {/* review */}
      <p className="text-sm py-4 text-white/70 leading-relaxed">{card.review}</p>

      {/* footer — only date (no "Posted on X") */}
      <div className="flex items-center justify-end text-white/50 text-xs">
        <p>{card.date}</p>
      </div>
    </div>
  );

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 mt-8 text-center">
        <h2 className="text-3xl font-semibold text-white/90">What Our Users Say</h2>
        <p className="text-sm text-white/60 mt-2 max-w-xl mx-auto">
          Real feedback from creators and developers who ship faster with Treo.
        </p>
      </div>

      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .marquee-inner {
          animation: marqueeScroll 25s linear infinite;
        }
        .marquee-reverse {
          animation-direction: reverse;
        }
      `}</style>

      {/* ROW 1 */}
      <div className="w-full mx-auto max-w-5xl overflow-hidden relative mt-10">
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-black/80 to-transparent"></div>

        <div className="marquee-inner flex transform-gpu min-w-[200%] pt-10 pb-6">
          {[...cardsData, ...cardsData].map((card, index) => (
            <CreateCard key={`r1-${index}`} card={card} />
          ))}
        </div>

        <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-black/80 to-transparent"></div>
      </div>

      {/* ROW 2 (different data, reverse) */}
      <div className="w-full mx-auto max-w-5xl overflow-hidden relative mt-6">
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-black/80 to-transparent"></div>

        <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] pt-10 pb-6">
          {[...cardsData2, ...cardsData2].map((card, index) => (
            <CreateCard key={`r2-${index}`} card={card} />
          ))}
        </div>

        <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-black/80 to-transparent"></div>
      </div>
    </>
  );
}
