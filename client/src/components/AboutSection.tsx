export default function AboutSection() {
  return (
    <section className="relative w-full max-w-5xl mx-auto px-4 py-16 text-white">
      {/* soft glow background */}
      <div className="absolute inset-0 -z-10 mx-auto max-w-lg blur-[160px] opacity-30 bg-white/10"></div>

      {/* heading */}
      <h1 className="text-3xl font-semibold text-center text-white/90 [word-spacing:12px]">
        About Treo
      </h1>

      <p className="text-sm text-white/60 text-center mt-2 max-w-md mx-auto">
        Built to help creators, founders, and developers turn ideas into fully
        functioning web apps — in seconds.
      </p>

      {/* content */}
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10 mt-12">
        {/* image */}
        <img
          className="max-w-sm w-full rounded-xl bg-white/5 border border-white/10 shadow-lg backdrop-blur-sm"
          src="/svglogo.png"
          alt="AI Web Builder"
        />

        {/* text block */}
        <div>
          <h2 className="text-2xl font-semibold text-white/90">
            Transform Ideas Into Real Apps Instantly
          </h2>
          <p className="text-sm text-white/60 mt-2">
            Treo uses AI to generate production-ready frontends, components, and
            entire websites with clean, scalable code — all styled beautifully.
          </p>

          {/* features */}
          <div className="flex flex-col gap-8 mt-8">
            {/* 1 */}
            <div className="flex items-center gap-4">
              <div className="size-10 p-2 rounded bg-white/10 border border-white/15 backdrop-blur-sm">
                <img
                  src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/flashEmoji.png"
                  alt=""
                />
              </div>
              <div>
                <h3 className="text-base font-medium text-white/90">
                  Lightning-Fast Generation
                </h3>
                <p className="text-sm text-white/60">
                  Build complete layouts instantly using AI-powered code
                  creation.
                </p>
              </div>
            </div>

            {/* 2 */}
            <div className="flex items-center gap-4">
              <div className="size-10 p-2 rounded bg-white/10 border border-white/15 backdrop-blur-sm">
                <img
                  src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/colorsEmoji.png"
                  alt=""
                />
              </div>
              <div>
                <h3 className="text-base font-medium text-white/90">
                  Beautiful Modern UI
                </h3>
                <p className="text-sm text-white/60">
                  Clean, aesthetic, and production-ready components designed for
                  dark UIs.
                </p>
              </div>
            </div>

            {/* 3 */}
            <div className="flex items-center gap-4">
              <div className="size-10 p-2 rounded bg-white/10 border border-white/15 backdrop-blur-sm">
                <img
                  src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/puzzelEmoji.png"
                  alt=""
                />
              </div>
              <div>
                <h3 className="text-base font-medium text-white/90">
                  Plug-and-Play Integration
                </h3>
                <p className="text-sm text-white/60">
                  Works seamlessly with React, Next.js, Tailwind, APIs, and AI
                  workflows.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
