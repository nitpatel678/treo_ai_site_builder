import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface EditorPanelProps {
  selectedElement: {
    tagName: string;
    className: string;
    text: string;
    styles: {
      padding: string;
      margin: string;
      backgroundColor: string;
      fontSize: string;
      color?: string; // FIXED missing color property
    };
  } | null;
  onUpdate: (updates: any) => void;
  onClose: () => void;
}

const EditorPanel = ({
  selectedElement,
  onUpdate,
  onClose,
}: EditorPanelProps) => {
  const [values, setValues] = useState(selectedElement);

  useEffect(() => {
    setValues(selectedElement);
  }, [selectedElement]);

  if (!selectedElement || !values) {
    return null;
  }

  const handleChange = (field: string, value: string) => {
    const newValues = { ...values, [field]: value };
    if (field in values.styles) {
      newValues.styles = { ...values.styles, [field]: value };
    }
    setValues(newValues);
    onUpdate({ [field]: value });
  };

  const handleStyleChange = (styleName: string, value: string) => {
    const newStyles = { ...values.styles, [styleName]: value };
    setValues({ ...values, styles: newStyles });
    onUpdate({ styles: { [styleName]: value } });
  };

  return (
    <div
      className="
        absolute top-4 right-4 w-80 p-4 rounded-xl
        bg-black/30 backdrop-blur-md border border-white/10
        shadow-lg text-white
        animate-fade-in fade-in slide-in-from-right-5
      "
    >
      {/* Panel Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-white/90">Edit Element</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-white/10 rounded-full transition"
        >
          <X className="w-4 h-4 text-white/60" />
        </button>
      </div>

      {/* Panel Fields */}
      <div className="space-y-4 text-white/90">
        {/* Text Content */}
        <div>
          <label className="block text-xs text-white/60 mb-1">
            Text Content
          </label>
          <textarea
            value={values.text}
            onChange={(e) => handleChange("text", e.target.value)}
            className="
              w-full text-sm p-2 rounded-md
              bg-white/5 border border-white/10
              focus:ring-2 focus:ring-indigo-500 outline-none
              min-h-20 text-white placeholder-white/40
            "
          />
        </div>

        {/* Class Name */}
        <div>
          <label className="block text-xs text-white/60 mb-1">
            Class Name
          </label>
          <input
            type="text"
            value={values.className || ""}
            onChange={(e) => handleChange("className", e.target.value)}
            className="
              w-full text-sm p-2 rounded-md
              bg-white/5 border border-white/10
              focus:ring-2 focus:ring-indigo-500 outline-none
              text-white placeholder-white/40
            "
          />
        </div>

        {/* Padding + Margin */}
        <div className="grid grid-cols-2 gap-3">
          {/* Padding */}
          <div>
            <label className="block text-xs text-white/60 mb-1">
              Padding
            </label>
            <input
              type="text"
              value={values.styles.padding}
              onChange={(e) => handleStyleChange("padding", e.target.value)}
              className="
                w-full text-sm p-2 rounded-md
                bg-white/5 border border-white/10
                focus:ring-2 focus:ring-indigo-500 outline-none
                text-white placeholder-white/40
              "
            />
          </div>

          {/* Margin */}
          <div>
            <label className="block text-xs text-white/60 mb-1">
              Margin
            </label>
            <input
              type="text"
              value={values.styles.margin}
              onChange={(e) => handleStyleChange("margin", e.target.value)}
              className="
                w-full text-sm p-2 rounded-md
                bg-white/5 border border-white/10
                focus:ring-2 focus:ring-indigo-500 outline-none
                text-white placeholder-white/40
              "
            />
          </div>
        </div>

        {/* Font Size */}
        <div>
          <label className="block text-xs text-white/60 mb-1">
            Font Size
          </label>
          <input
            type="text"
            value={values.styles.fontSize}
            onChange={(e) => handleStyleChange("fontSize", e.target.value)}
            className="
              w-full text-sm p-2 rounded-md
              bg-white/5 border border-white/10
              focus:ring-2 focus:ring-indigo-500 outline-none
              text-white placeholder-white/40
            "
          />
        </div>

        {/* BG + Text Color */}
        <div className="grid grid-cols-2 gap-3">
          {/* Background */}
          <div>
            <label className="block text-xs text-white/60 mb-1">
              Background
            </label>
            <div
              className="
                flex items-center gap-2 p-1 rounded-md
                bg-white/5 border border-white/10
              "
            >
              <input
                type="color"
                value={
                  values.styles.backgroundColor === "rgba(0,0,0,0)"
                    ? "#ffffff"
                    : values.styles.backgroundColor
                }
                onChange={(e) =>
                  handleStyleChange("backgroundColor", e.target.value)
                }
                className="w-6 h-6 cursor-pointer rounded"
              />
              <span className="text-xs text-white/60 truncate">
                {values.styles.backgroundColor}
              </span>
            </div>
          </div>

          {/* Text Color */}
          <div>
            <label className="block text-xs text-white/60 mb-1">
              Text Color
            </label>
            <div
              className="
                flex items-center gap-2 p-1 rounded-md
                bg-white/5 border border-white/10
              "
            >
              <input
                type="color"
                value={values.styles.color || "#ffffff"} // FIXED
                onChange={(e) =>
                  handleStyleChange("color", e.target.value)
                }
                className="w-6 h-6 cursor-pointer rounded"
              />
              <span className="text-xs text-white/60">
                {values.styles.color}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPanel;
