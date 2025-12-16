import React, { useEffect, useRef, useState } from "react";
import type { Message, Project, Version } from "../types";
import {
  BotIcon,
  EyeIcon,
  Loader2Icon,
  SendIcon,
  UserIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import api from "@/configs/axios";
import { toast } from "sonner";

interface SidebarProps {
  isMenuOpen: boolean;
  project: Project;
  setProject: (project: Project) => void;
  isGenerating: boolean;
  setIsGenerating: (isGenerating: boolean) => void;
}

const Sidebar = ({
  isMenuOpen,
  project,
  setProject,
  isGenerating,
  setIsGenerating,
}: SidebarProps) => {
  const messageRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");

  // Fetch updated project from server
  const fetchProject = async () => {
    try {
      const { data } = await api.get(`/api/user/project/${project.id}`);
      setProject(data.project);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
      console.log(error);
    }
  };

  // Rollback to version — FIXED LOGIC
  const handleRollback = async (versionId: string) => {
    try {
      const confirmRollback = window.confirm(
        "Are you sure you want to rollback to this version?"
      );

      if (confirmRollback) {
        setIsGenerating(true);

        const { data } = await api.get(
          `/api/project/revision/${project.id}/${versionId}`
        );

        const { data: updatedProject } = await api.get(
          `/api/user/project/${project.id}`
        );

        setProject(updatedProject.project);
        toast.success(data.message);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
      console.log(error);
    } finally {
      setIsGenerating(false);
    }
  };

  // MAIN REVISION LOGIC — FIXED FOR LONG 5+ MIN AI DELAYS
  const handleRevisions = async (e: React.FormEvent) => {
    e.preventDefault();

    let interval: any;
    const previousVersion = project.current_version_index;

    try {
      setIsGenerating(true);

      // 🚀 Begin polling server every 3 seconds
      interval = setInterval(async () => {
        await fetchProject();

        // Stop polling once new version is created
        if (
          project.current_version_index &&
          project.current_version_index !== previousVersion
        ) {
          clearInterval(interval);
          setIsGenerating(false);
        }
      }, 3000);

      // Send revision request
      const { data } = await api.post(
        `/api/project/revision/${project.id}`,
        { message: input }
      );

      toast.success(data.message);
      setInput("");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
      console.log(error);
    }

    // 🛑 Safety timeout: stop polling after 7 minutes max
    setTimeout(() => {
      clearInterval(interval);
      setIsGenerating(false);
    }, 7 * 60 * 1000);
  };

  // Auto-scroll chat
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [project.conversation.length, isGenerating]);

  return (
    <div
      className={`
        h-full sm:max-w-sm
        bg-linear-to-b from-black/30 to-black/60
        border-r border-white/10
        backdrop-blur-md
        transition-all
        ${isMenuOpen ? "max-sm:w-0 overflow-hidden" : "w-full"}
      `}
    >
      <div className="flex flex-col h-full">
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-4 flex flex-col gap-5">
          {[...project.conversation, ...project.versions]
            .sort((a, b) => 
              new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
            )
            .map((message) => {
              const isMessage = "content" in message;

              if (isMessage) {
                const msg = message as Message;
                const isUser = msg.role === "user";

                return (
                  <div
                    key={msg.id}
                    className={`flex items-end gap-3 ${
                      isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!isUser && (
                      <div className="w-9 h-9 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm flex items-center justify-center">
                        <BotIcon className="size-5 text-white/90" />
                      </div>
                    )}

                    <div
                      className={`
                        max-w-[80%] p-3 px-4 rounded-2xl text-sm leading-relaxed shadow-sm
                        ${
                          isUser
                            ? "bg-white/10 text-white rounded-tr-none"
                            : "bg-white/5 text-white/85 rounded-tl-none border border-white/10"
                        }
                      `}
                    >
                      {msg.content}
                    </div>

                    {isUser && (
                      <div className="w-9 h-9 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm flex items-center justify-center">
                        <UserIcon className="size-5 text-white/90" />
                      </div>
                    )}
                  </div>
                );
              }

              // Version bubble
              const ver = message as Version;
              return (
                <div
                  key={ver.id}
                  className="
                    w-4/5 mx-auto my-2 p-4 rounded-xl
                    bg-white/5 border border-white/10 backdrop-blur-md
                    text-white shadow-sm flex flex-col gap-3
                  "
                >
                  <div className="text-xs font-medium text-white/80">
                    Code Updated <br />
                    <span className="text-white/50 text-xs font-normal">
                      {new Date(ver.timestamp).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    {project.current_version_index === ver.id ? (
                      <button
                        className="px-3 py-1 rounded-md text-xs bg-white/10 text-white/90 border border-white/10"
                        disabled
                      >
                        Current Version
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRollback(ver.id)}
                        className="px-3 py-1 rounded-md text-xs bg-indigo-600 hover:bg-indigo-500 transition text-white"
                      >
                        Rollback to This Version
                      </button>
                    )}
                  </div>

                  <Link
                    target="_blank"
                    to={`/preview/${project.id}/${ver.id}`}
                  >
                    <EyeIcon className="size-6 p-1 bg-white/10 border border-white/10 rounded text-white/80 hover:bg-white/20 transition" />
                  </Link>
                </div>
              );
            })}

          {/* AI typing */}
          {isGenerating && (
            <div className="flex items-end gap-3 justify-start">
              <div className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center">
                <BotIcon className="size-5 text-white/90" />
              </div>

              <div className="flex gap-1.5 items-end">
                <div className="w-2.5 h-2.5 bg-white/70 rounded-full animate-bounce delay-0"></div>
                <div className="w-2.5 h-2.5 bg-white/70 rounded-full animate-bounce delay-200"></div>
                <div className="w-2.5 h-2.5 bg-white/70 rounded-full animate-bounce delay-400"></div>
              </div>
            </div>
          )}

          <div ref={messageRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleRevisions} className="m-3 relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={4}
            placeholder="Describe what you want to modify…"
            className="
              flex-1 p-3 rounded-xl resize-none text-sm 
              bg-white/5 border border-white/10 backdrop-blur-sm
              text-white placeholder-white/50
              outline-none focus:border-indigo-500 transition
            "
            disabled={isGenerating}
          />

          <button
            disabled={isGenerating || !input.trim()}
            className="absolute bottom-3 right-3"
          >
            {isGenerating ? (
              <Loader2Icon className="size-7 p-1.5 animate-spin text-white/80" />
            ) : (
              <SendIcon className="size-7 p-1.5 text-white/90 hover:text-white transition" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sidebar;
