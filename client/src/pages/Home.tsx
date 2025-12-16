// Home.tsx
import React from "react";
import {
  Loader2Icon,
  Atom,
  Database,
  Server,
  Cpu,
  Code,
  Terminal,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import AboutSection from "../components/AboutSection";
import FeaturesSection from "../components/FeatureSection";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import api from "@/configs/axios";
import { useNavigate } from "react-router-dom";

const icons = [
  { id: "react", label: "React", Icon: Atom },
  { id: "database", label: "Database", Icon: Database },
  { id: "node", label: "Node.js", Icon: Code }, // fallback to Code icon for node
  { id: "server", label: "Server", Icon: Server },
  { id: "cpu", label: "CPU", Icon: Cpu },
  { id: "terminal", label: "Terminal", Icon: Terminal },
  { id: "zap", label: "Realtime / Socket", Icon: Zap },
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const {data : session} = authClient.useSession();
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!session?.user) {
        return toast.error('Please sign in to create a project')
      }
      else if(!input.trim()){
        return toast.error('Please enter a message to create a project....')
      }

          setLoading(true);

          const {data} = await api.post('/api/user/project', {initial_prompt : input});

          setLoading(false);
          navigate(`/projects/${data.projectId}`)

    } catch (error:any) {
      setLoading(false);
      toast.error(error?.response?.data?.message || error.message)
      console.log(error);
    }

    // Simulate an API call
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <>
      <section className="mt-10 flex flex-col items-center text-white text-sm pb-20 px-4 font-poppins">
        <h1
          id="heading"
          className="text-center text-[32px] md:text-[48px] leading-40px md:leading-[58px] mt-4 font-semibold max-w-3xl text-white"
        >
          Turn Your Ideas Into Real Working Web App
        </h1>

        <p className="text-center text-base max-w-md mt-2">
          Create stunning web applications in minutes using AI-powered
          technology.
        </p>

        <form
          onSubmit={onSubmitHandler}
          className="bg-white/6 max-w-2xl w-full rounded-xl p-4 mt-10 border border-white/10 focus-within:ring-2 ring-indigo-500 transition-all backdrop-blur-sm"
        >
          <textarea
            onChange={(e) => setInput(e.target.value)}
            className="bg-transparent outline-none text-gray-200 resize-none w-full placeholder:text-gray-400"
            rows={4}
            placeholder="Describe your web app idea..."
            required
          />
          <div className="flex items-center justify-end mt-3">
            <button
              type="submit"
              className="ml-auto flex items-center gap-2 bg-white/6 hover:bg-white/10 text-white rounded-md px-4 py-2 border border-white/10 backdrop-blur-sm transition-colors"
            >
              {!loading ? (
                "Create with AI"
              ) : (
                <>
                  Creating...
                  <Loader2Icon className="animate-spin size-4 text-white" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Marquee / strip */}
        {/* single marquee strip - content duplicated inside one track */}
        <div className="w-full max-w-5xl mt-16 overflow-hidden">
          <div className="relative">
            <div className="marquee">
              <div className="marquee-track">
                {icons.concat(icons).map((it, idx) => (
                  <motion.div
                    key={it.id + "-" + idx}
                    className="marquee-item flex items-center gap-3 px-6 py-4"
                    whileHover={{ scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <it.Icon className="w-8 h-8 text-white/90" />
                    <span className="text-sm text-white/70">{it.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <AboutSection />
      <FeaturesSection />
      <Testimonials />
      <FAQ />
    </>
  );
};

export default Home;
