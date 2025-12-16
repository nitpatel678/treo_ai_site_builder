import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { Project } from "../types";
import {
  ArrowBigDownDashIcon,
  EyeIcon,
  EyeOffIcon,
  FullscreenIcon,
  LaptopIcon,
  Loader2Icon,
  MessageSquareIcon,
  SaveIcon,
  SmartphoneIcon,
  TabletIcon,
  XIcon,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import ProjectPreview, { type ProjectPreviewRef } from "../components/ProjectPreview";
import api from "@/configs/axios";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
const Projects = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const {data : session , isPending} = authClient.useSession();

  const [project, setProject] = useState<Project | null>(null);

  const [loading, setLoading] = useState(true);

  const [isGenerating, setIsGenerating] = useState(true);

  const [device, setDevice] = useState<"phone" | "tablet" | "desktop">(
    "desktop"
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isSaving, setIsSaving] = useState(false);


  const previewRef = useRef<ProjectPreviewRef>(null);

  const fetchProject = async () => {
    try{
      const {data} = await api.get(`/api/user/project/${projectId}`);
      setProject(data.project)
      setIsGenerating(data.project.current_code?false : true)
      setLoading(false)
    } catch(error : any){
      toast.error(error?.response?.data?.message || error.message);
      console.log(error);
    }
  };

  const saveProject = async () => {
    if(!previewRef.current){
      return;
    }
    const code = previewRef.current.getCode();
    if (!code) {
      return;
    }
    setIsSaving(true);
    try {
      const {data} = await api.put(`/api/project/save/${projectId}`, {code});
      toast.success(data.message)
    } catch (error : any) {
      toast.error(error?.response?.data?.message || error.message);
      console.log(error)
    }
    finally{
      setIsSaving(false);
    }
  };

  // index.html file
  const downloadCode = () => {
    const code = previewRef.current?.getCode() || project?.current_code;
    if (!code) {
      if (isGenerating) {
        return
      }
      return
    }
    const element = document.createElement('a');
    const file = new Blob([code],{type:"text/html"})
    element.href = URL.createObjectURL(file);
    element.download = "index.html";
    document.body.appendChild(element)
    element.click();

  };

  const togglePublsih = async () => {
    try {
      const {data} = await api.post(`/api/user/publish-toggle/${projectId}`);
      toast.success(data.message)
      setProject((prev)=> prev? ({...prev, isPublished : !prev.isPublished}): null)
    } catch (error : any) {
      toast.error(error?.response?.data?.message || error.message);
      console.log(error)
    }
  };

  useEffect(()=>{
    if (session?.user) {
      fetchProject();
    }
    else if(!isPending && !session?.user){
      navigate('/');
      toast('Please login to view your projects')
    }
  },[session?.user])

  useEffect(() => {
    if (project && !project.current_code) {
      const intervalId = setInterval(fetchProject, 10000);
      return ()=> clearInterval(intervalId)
    }
    
  }, [project]);

  if (loading) {
    return (
      <>
        <div className="flex items-center justify-center h-screen">
          <Loader2Icon className="size-7 animate-spin text-gray-300/50" />
        </div>
      </>
    );
  }

  return project ? (
    <div className="flex flex-col h-screen w-full bg-linear-to-b from-black to-gray-900 text-white">
      {/* Builder navbar */}
      <div
        className="flex max-sm:flex-col sm:items-center gap-4 px-4 py-3
      no-scrollbar
      bg-transparent
      border-b border-white/6
      backdrop-blur-sm
      z-30"
      >
        {/* left side */}
        <div className="flex items-center gap-3 sm:min-w-90 text-nowrap">
          <img
            src="/svglogo.png"
            alt="Treo Logo"
            className="h-6 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <div className="max-w-64 sm:max-w-xs">
            <p className="text-sm font-medium capitalize truncate text-white/95">
              {project.name}
            </p>
            <p className="text-xs text-white/60 mt-0.5">
              Previewing last saved version
            </p>
          </div>

          <div className="sm:hidden flex-1 flex justify-end">
            {isMenuOpen ? (
              <MessageSquareIcon
                onClick={() => setIsMenuOpen(false)}
                className="size-6 cursor-pointer text-white/85"
              />
            ) : (
              <XIcon
                onClick={() => setIsMenuOpen(true)}
                className="size-6 cursor-pointer text-white/85"
              />
            )}
          </div>
        </div>

        {/* middle side (device switch) */}
        <div className="hidden sm:flex gap-2 p-1 rounded-md bg-white/3 border border-white/8">
          <SmartphoneIcon
            onClick={() => setDevice("phone")}
            className={`size-6 p-1 rounded cursor-pointer ${
              device == "phone" ? "bg-white/6 text-white/95" : "text-white/80"
            }`}
          />
          <TabletIcon
            onClick={() => setDevice("tablet")}
            className={`size-6 p-1 rounded cursor-pointer ${
              device == "tablet" ? "bg-white/6 text-white/95" : "text-white/80"
            }`}
          />
          <LaptopIcon
            onClick={() => setDevice("desktop")}
            className={`size-6 p-1 rounded cursor-pointer ${
              device == "desktop" ? "bg-white/6 text-white/95" : "text-white/80"
            }`}
          />
        </div>

        {/* right side */}
        <div className="flex items-center justify-end gap-3 flex-1 text-xs sm:text-sm">
          <button
            onClick={saveProject}
            disabled={isSaving}
            className="max-sm:hidden bg-white/8 hover:bg-white/12 text-white/95
          px-3.5 py-1 flex items-center gap-2 rounded sm:rounded-sm transition-colors
          border border-white/8 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <Loader2Icon className="animate-spin text-white/80" />
            ) : (
              <SaveIcon size={16} className="text-white/90" />
            )}
            <span className="text-white/90">Save</span>
          </button>

          <Link
            target="_blank"
            to={`/preview/${projectId}`}
            className="flex items-center gap-2 px-3.5 py-1 rounded sm:rounded-sm border border-white/8 hover:border-white/12 transition-colors text-white/90"
          >
            <FullscreenIcon size={16} />
            <span>Preview</span>
          </Link>

          <button
            onClick={downloadCode}
            className="px-3.5 py-1 flex items-center gap-2 rounded sm:rounded-sm
          bg-white/6 hover:bg-white/10 text-white/95 border border-white/9 transition-colors"
          >
            <ArrowBigDownDashIcon size={16} />
            <span>Download</span>
          </button>

          <button
            onClick={togglePublsih}
            className="px-3.5 py-1 flex items-center gap-2 rounded sm:rounded-sm
          bg-white/6 hover:bg-white/10 text-white/95 border border-white/9 transition-colors"
          >
            {project.isPublished ? (
              <EyeOffIcon size={16} />
            ) : (
              <EyeIcon size={16} />
            )}
            <span>{project.isPublished ? "Unpublish" : "Publish"}</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-auto">
        {/* Left sidebar */}
         <Sidebar isMenuOpen={isMenuOpen} project={project} setProject={(p)=>setProject(p)} isGenerating={isGenerating} setIsGenerating={setIsGenerating}/>

        {/* Project Preview */}
        <div className="flex-1  pl-0">
          <ProjectPreview ref={previewRef} project={project} isGenerating={isGenerating} device={device} />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <p className="text-2xl font-medium text-gray-300">
        Unable To Load Project
      </p>
    </div>
  );
};

export default Projects;
