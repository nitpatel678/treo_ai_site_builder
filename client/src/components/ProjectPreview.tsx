import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import type { Project } from "../types";
import { iframeScript } from "../types/assets";
import EditorPanel from "./EditorPanel";
import LoaderSteps from "./LoaderSteps";

interface ProjectPreviewProps {
  project: Project;
  isGenerating: boolean;
  device?: "phone" | "tablet" | "desktop";
  showEditorPanel?: boolean;
}

export interface ProjectPreviewRef {
  getCode: () => string | undefined;
}

const ProjectPreview = forwardRef<ProjectPreviewRef, ProjectPreviewProps>(
  (
    { project, isGenerating, device = "desktop", showEditorPanel = true },
    ref
  ) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const [selectedElement, setSelectedElement] = useState<any>(null);

    const resolutions = {
      phone: "w-[412px]",
      tablet: "w-[768px]",
      desktop: "w-full",
    };

    useImperativeHandle(ref, () => ({
      getCode: () => {
        const doc = iframeRef.current?.contentDocument;
        if (!doc) {
          return undefined;
        }

        // 1. remove our selection class / attributes / outlines from all
        // elements

        doc
          .querySelectorAll(".ai-selected-element,[data-ai-selected]")
          .forEach((el) => {
            el.classList.remove("ai-selected-element");
            el.removeAttribute("data-ai-selected");
            (el as HTMLElement).style.outline = "";
          });

        // 2. Remove injected style + script from the document

        const previewStyle = doc.getElementById("ai-preview-style");
        if (previewStyle) {
          previewStyle.remove();
        }

        const previewScript = doc.getElementById("ai-preview-script");
        if (previewScript) {
          previewScript.remove();
        }

        // 3. Serialize clean HTML

        const html = doc.documentElement.outerHTML;

        return html;
      },
    }));

    useEffect(() => {
      const handleMessage = (event: MessageEvent) => {
        if (event.data.type === "ELEMENT_SELECTED") {
          setSelectedElement(event.data.payload);
        } else if (event.data.type === "CLEAR_SELECTION") {
          setSelectedElement(null);
        }
      };
      window.addEventListener("message", handleMessage);
      return () => window.removeEventListener("message", handleMessage);
    }, []);

    const handleUpdate = (updates: any) => {
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          {
            type: "UPDATE_ELEMENT",
            payload: updates,
          },
          "*"
        );
      }
    };

    const injectPreview = (html: string) => {
      if (!html) return "";
      if (!showEditorPanel) return html;

      const noScrollCSS = `
    <style>
      ::-webkit-scrollbar { display: none; }
      body { 
        scrollbar-width: none;
        -ms-overflow-style: none;
        overflow-x: hidden;
      }
    </style>
  `;

      if (html.includes("</head>")) {
        return html
          .replace("</head>", noScrollCSS + "</head>")
          .replace("</body>", iframeScript + "</body>");
      } else if (html.includes("</body>")) {
        return html.replace("</body>", noScrollCSS + iframeScript + "</body>");
      } else {
        return noScrollCSS + html + iframeScript;
      }
    };

    return (
      <div
        className="
          relative h-full flex-1 overflow-hidden max-sm:ml-2
          bg-black/20 backdrop-blur-sm
          text-white 
          no-scrollbar
        "
      >
        {project.current_code ? (
          <>
            <iframe
              ref={iframeRef}
              srcDoc={injectPreview(project.current_code)}
              className={`
                h-full max-sm:w-full ${resolutions[device]} mx-auto 
                transition-all duration-300
                overflow-hidden
                no-scrollbar
                bg-black
                border border-white/10
              `}
            />
            {showEditorPanel && selectedElement && (
              <EditorPanel
                selectedElement={selectedElement}
                onUpdate={handleUpdate}
                onClose={() => {
                  setSelectedElement(null);
                  if (iframeRef.current?.contentWindow) {
                    iframeRef.current.contentWindow.postMessage(
                      { type: "CLEAR_SELECTION_REQUEST" },
                      "*"
                    );
                  }
                }}
              />
            )}
          </>
        ) : (
          isGenerating && (
            <LoaderSteps/>
          )
        )}
      </div>
    );
  }
);

export default ProjectPreview;
