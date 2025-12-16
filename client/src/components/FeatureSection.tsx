export default function FeaturesSection() {
  return (
    <section className="relative w-full max-w-5xl mx-auto px-4 py-16 text-white">
      {/* soft glow background */}
      <div className="absolute inset-0 -z-10 mx-auto max-w-lg blur-[170px] opacity-20 bg-white/10"></div>

      <h1 className="text-3xl font-semibold text-center text-white/90">
        Powerful Features
      </h1>
      <p className="text-sm text-white/60 text-center mt-2 max-w-md mx-auto">
        Treo gives you the tools to build modern, scalable web applications instantly with AI.
      </p>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

        {/* FEATURE 1 */}
        <div className="flex flex-col items-center justify-center max-w-80 mx-auto">
          <div className="
            p-6 aspect-square rounded-full
            bg-white/5 border border-white/10 backdrop-blur-sm
            flex items-center justify-center
          ">
            <svg
              width="34"
              height="34"
              viewBox="0 0 28 28"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-80"
            >
              <path d="M14 18.667V24.5m4.668-8.167V24.5m4.664-12.833V24.5m2.333-21L15.578 13.587a.584.584 0 0 1-.826 0l-3.84-3.84a.583.583 0 0 0-.825 0L2.332 17.5M4.668 21v3.5m4.664-8.167V24.5"/>
            </svg>
          </div>

          <div className="mt-5 space-y-2 text-center">
            <h3 className="text-base font-medium text-white/90">
              AI-Generated Layouts
            </h3>
            <p className="text-sm text-white/60">
              Instantly create modern, responsive UI components with AI assistance.
            </p>
          </div>
        </div>


        {/* FEATURE 2 */}
        <div className="flex flex-col items-center justify-center max-w-80 mx-auto">
          <div className="
            p-6 aspect-square rounded-full
            bg-white/5 border border-white/10 backdrop-blur-sm
            flex items-center justify-center
          ">
            <svg
              width="34"
              height="34"
              viewBox="0 0 28 28"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-80"
            >
              <path d="M14 11.667A2.333 2.333 0 0 0 11.667 14c0 1.19-.117 2.929-.304 4.667m4.972-3.36c0 2.776 0 7.443-1.167 10.36m5.004-1.144c.14-.7.502-2.683.583-3.523M2.332 14a11.667 11.667 0 0 1 21-7m-21 11.667h.01m23.092 0c.233-2.333.152-6.246 0-7"/>
            </svg>
          </div>

          <div className="mt-5 space-y-2 text-center">
            <h3 className="text-base font-medium text-white/90">
              Clean, Scalable Code
            </h3>
            <p className="text-sm text-white/60">
              Treo outputs developer-friendly code you can extend and deploy instantly.
            </p>
          </div>
        </div>


        {/* FEATURE 3 */}
        <div className="flex flex-col items-center justify-center max-w-80 mx-auto">
          <div className="
            p-6 aspect-square rounded-full
            bg-white/5 border border-white/10 backdrop-blur-sm
            flex items-center justify-center
          ">
            <svg
              width="34"
              height="34"
              viewBox="0 0 28 28"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-80"
            >
              <path d="M4.668 25.666h16.333a2.333 2.333 0 0 0 2.334-2.333V8.166L17.5 2.333H7a2.333 2.333 0 0 0-2.333 2.333v4.667"/>
              <path d="M16.332 2.333V7a2.334 2.334 0 0 0 2.333 2.333h4.667m-21 8.167h11.667M10.5 21l3.5-3.5-3.5-3.5"/>
            </svg>
          </div>

          <div className="mt-5 space-y-2 text-center">
            <h3 className="text-base font-medium text-white/90">
              Easy Export & Deployment
            </h3>
            <p className="text-sm text-white/60">
              Export your project or deploy instantly to the platform of your choice.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
