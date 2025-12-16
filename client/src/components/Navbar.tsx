import { authClient } from "@/lib/auth-client";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserButton } from "@daveyplate/better-auth-ui";
import api from "@/configs/axios";
import { toast } from "sonner";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [credits, setCredits] = useState(0);
  const navigate = useNavigate();

  const { data: session } = authClient.useSession();

  const getCredits = async () => {
  try {
    const { data } = await api.get("/api/user/credits");
    setCredits(data.credits);   // ✅ FIXED
  } catch (error: any) {
    toast.error(error?.response?.data?.message || error.message);
    console.log(error);
  }
};


  useEffect(() => {
    if (session?.user) {
      getCredits();
    }
  }, [session?.user]);

  return (
    <>
      <nav className="z-50 flex items-center justify-between w-full py-4 px-4 md:px-16 lg:px-24 xl:px-32 backdrop-blur border-b text-white border-slate-800">
        <Link to="/">
          <img src="/logo.png" alt="Logo" className="h-7" />
        </Link>

        <div
          id="subheading"
          className="hidden md:flex font-semibold items-center gap-8 transition duration-500"
        >
          <Link to="/">Home</Link>
          <Link to="projects">My Projects</Link>
          <Link to="/community">Community</Link>
          <Link to="/pricing">Pricing</Link>
        </div>

        <div className="flex items-center gap-3">
          {!session?.user ? (
            <button
              onClick={() => navigate("/auth/signin")}
              className="px-6 py-1.5 max-sm:text-sm 
             bg-white/10 hover:bg-white/20 
             text-white border border-white/10
             backdrop-blur-sm rounded 
             active:scale-95 transition"
            >
              Get started
            </button>
          ) : (
            <>
              <button
                className="
    flex items-center gap-1.5
    bg-white/5 backdrop-blur-md
    px-4 py-1.5
    text-xs sm:text-sm
    border border-white/10
    rounded-full
    text-white/80
    hover:bg-white/10 hover:text-white
    transition-all
  "
              >
                Credits:
                <span className="text-indigo-300 font-medium">{credits}</span>
              </button>

              <UserButton size="icon" />
            </>
          )}

          <button
            id="open-menu"
            className="md:hidden active:scale-90 transition"
            onClick={() => setMenuOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 5h16" />
              <path d="M4 12h16" />
              <path d="M4 19h16" />
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-100 bg-black/60 text-white backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/projects" onClick={() => setMenuOpen(false)}>
            My Projects
          </Link>{" "}
          <Link to="/community" onClick={() => setMenuOpen(false)}>
            Community
          </Link>{" "}
          <Link to="/pricing" onClick={() => setMenuOpen(false)}>
            Pricing
          </Link>
          <button
            className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-slate-100 hover:bg-slate-200 transition text-black rounded-md flex"
            onClick={() => setMenuOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
