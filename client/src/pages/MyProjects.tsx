import { useEffect, useState } from "react";
import type { Project } from "../types";
import { Loader2Icon, PlusIcon, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "@/configs/axios";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const MyProjects = () => {
  const {data : session, isPending} = authClient.useSession();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);

  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const {data} = await api.get(`/api/user/projects`)
      setProjects(data.projects)
      setLoading(false)
    } catch (error : any) {
      console.log(error)
      toast.error(error?.response?.data?.message || error.message)
    }
  };

  const deleteProject = async (projectId: string) => {
    try {
      const confirm = window.confirm('Are you sure you want to delete this project?')
      if (!confirm) {
        return;
      }
      const {data} = await api.delete(`/api/project/${projectId}`)
      toast.success(data.message)
      fetchProjects()   
    } catch (error : any) {
      console.log(error)
      toast.error(error?.response?.data?.message || error.message)
    }
  };

  useEffect(() => {
    if (session?.user && !isPending) {
      fetchProjects()
    }
    else if(!isPending && !session?.user){
      navigate('/');
  toast('Please login to view your projects!')
    }
    
  }, [session?.user]);

  return (
    <>
      <div className="px-4 md:px-16 lg:px-24 xl:px-32">
        {loading ? (
          <div className="flex items-center justify-center h-[80vh]">
            <Loader2Icon className="size-7 animate-spin text-gray-500" />
          </div>
        ) : projects.length > 0 ? (
          <div className="py-10 min-h-[80vh]">
            <div className="flex items-center justify-between mb-12">
              <h1 className="text-2xl font-medium text-white">My Projects</h1>

              {/* v0.dev style button */}
              <button
                onClick={() => navigate("/")}
                className="
              flex items-center gap-2 
              text-white 
              px-3 sm:px-6 py-1 sm:py-2 
              rounded 
              bg-white/10 hover:bg-white/20 
              border border-white/10 
              backdrop-blur-sm 
              active:scale-95 transition-all
            "
              >
                <PlusIcon size={18} /> Add Project
              </button>
            </div>

            <div className="flex flex-wrap gap-3.5">
              {projects.map((project) => (
                <div
                  onClick={() => navigate(`/projects/${project.id}`)}
                  key={project.id}
                  className="
        relative group w-72 max-sm:mx-auto cursor-pointer
        bg-white/3 backdrop-blur-sm
        border border-white/6 rounded-lg overflow-hidden
        shadow-sm hover:shadow-md hover:border-white/8
        transition-all duration-300
      "
                >
                  {/* desktop-like mini preview */}
                  <div className="relative w-full h-40 bg-transparent overflow-hidden border-b border-white/6">
                    {project.current_code ? (
                      <iframe
                        srcDoc={project.current_code}
                        className="absolute top-0 left-0 w-[1200px] h-[800px] origin-top-left pointer-events-none"
                        sandbox="allow-scripts allow-same-origin"
                        style={{ transform: "scale(0.25)" }}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-white/60">
                        <p>No preview available</p>
                      </div>
                    )}
                  </div>

                  {/* project info */}
                  <div
                    className="
          p-4
          bg-transparent
          transition-colors
        "
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-2">
                        <h2 className="text-lg font-medium text-white/95 line-clamp-2">
                          {project.name}
                        </h2>
                        <span
                          className="
                ml-1 mt-1 text-xs
                bg-white/5 text-white/85
                border border-white/6
                rounded-full px-2 py-0.5
              "
                        >
                          Website
                        </span>
                      </div>
                    </div>

                    <p className="text-white/60 mt-2 text-sm line-clamp-2">
                      {project.initial_prompt}
                    </p>

                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="flex justify-between items-center mt-6"
                    >
                      <span className="text-xs text-white/60">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </span>

                      <div className="flex gap-3 text-white text-sm">
                        <button
                          onClick={() => navigate(`/preview/${project.id}`)}
                          className="
                px-3 py-1.5 rounded-md
                bg-white/10 hover:bg-white/15
                border border-white/6
                transition-all
              "
                        >
                          Preview
                        </button>

                        <button
                          onClick={() => navigate(`/projects/${project.id}`)}
                          className="
                px-3 py-1.5 rounded-md
                bg-white/10 hover:bg-white/15
                border border-white/6
                transition-colors
              "
                        >
                          Open
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* trash icon (stop propagation on wrapper and inner click) */}
                  <div onClick={(e) => e.stopPropagation()}>
                    <TrashIcon
                      className={`
            absolute top-3 right-3 transform scale-0
            group-hover:scale-100
            bg-white/6 p-1.5 rounded
            text-red-400
            size-7
            cursor-pointer
            transition-all duration-200
            `}
                      onClick={() => deleteProject(project.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[80vh]">
            <h1 className="text-3xl font-semibold text-gray-300">
              You have no projects yet.
            </h1>

            {/* v0.dev style button */}
            <button
              onClick={() => navigate("/")}
              className="
            text-white mt-5
            px-5 py-2 
            rounded-md 
            bg-white/10 hover:bg-white/20 
            border border-white/10 
            backdrop-blur-sm
            active:scale-95 transition-all
          "
            >
              Create New
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default MyProjects;
