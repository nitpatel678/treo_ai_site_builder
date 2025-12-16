import React from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const faqsData = [
    {
      question: "How fast can Treo generate a site?",
      answer:
        "Most simple landing pages and component sets are generated within seconds. Complex multi-page apps typically complete in a few minutes depending on your prompts.",
    },
    {
      question: "Can I customize the generated code?",
      answer:
        "Absolutely — Treo outputs clean, readable React + Tailwind code intended for production. You can edit, extend, or replace any part of the codebase.",
    },
    {
      question: "Which frameworks does Treo support?",
      answer:
        "Treo focuses on React-first output (React + Tailwind). You can export projects for Next.js, Vercel, or adapt the code for other frameworks easily.",
    },
    {
      question: "Is my project private?",
      answer:
        "Yes — projects you create are private by default. We also offer team/org settings for collaboration and private deployments.",
    },
    {
      question: "Does Treo support dark mode and themes?",
      answer:
        "Built-in theme system supports dark and light presets. You can also customize tokens to match your brand and export the theme with your project.",
    },
  ];

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-12 text-white">
      <div className="text-center mb-8">
        <p className="text-sm text-white/60 font-medium">FAQ</p>
        <h2 className="text-3xl font-semibold text-white/90 mt-2">
          Frequently Asked Questions
        </h2>
        <p className="text-sm text-white/60 mt-2 max-w-xl mx-auto">
          Clear answers about Treo — how it works, what you can export, and how to
          ship faster with AI-generated code.
        </p>
      </div>

      <div className="space-y-4">
        {faqsData.map((faq, index) => {
          const open = openIndex === index;
          return (
            <div
              key={index}
              className="
                bg-white/5 backdrop-blur-sm border border-white/10
                rounded-xl overflow-hidden
                transition-shadow duration-200
                shadow-sm hover:shadow-md
              "
            >
              <button
                onClick={() => toggle(index)}
                aria-expanded={open}
                className={`
                  w-full flex items-center justify-between gap-4 p-4
                  text-left
                  ${open ? "bg-white/6" : "bg-transparent"}
                  transition-colors duration-200
                `}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium text-white/90">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="mt-1">
                    <p className="text-xs text-white/60">
                      { /* short preview (optional) */ }
                      {faq.answer.slice(0, 80)}{faq.answer.length > 80 ? "…" : ""}
                    </p>
                  </div>
                </div>

                <ChevronDown
                  className={`w-5 h-5 text-white/70 transform transition-transform duration-300 ${
                    open ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              {/* animated panel */}
              <div
                className={`
                  px-4 pb-4 transition-all duration-300 ease-in-out overflow-hidden
                  ${open ? "opacity-100 max-h-[500px] translate-y-0 pt-2" : "opacity-0 max-h-0 -translate-y-2"}
                `}
                aria-hidden={!open}
              >
                <p className="text-sm text-white/70 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
