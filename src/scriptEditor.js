import { useState } from "react";

const ScriptEditor = () => {
  const [lines, setLines] = useState([""]);

  const handleChange = (e, index) => {
    const newLines = [...lines];
    newLines[index] = e.target.value;
    if (e.key === "Enter" && index === lines.length - 1) {
      e.preventDefault();
      setLines([...lines, ""]);
    } else {
      setLines(newLines);
    }
  };

  const detectType = (line) => {
    const trimmed = line.trim();
    if (/^(INT\.|EXT\.|פנים|חוץ|داخلي|خارجي)/i.test(trimmed)) return "scene";
    if (/^[A-Zא-תء-ي\s]{2,}$/.test(trimmed)) return "character";
    if (/^\(.*\)$/.test(trimmed)) return "parenthetical";
    if (/(:)$/.test(trimmed)) return "transition";
    return "dialogue";
  };

  const getDirection = (text) => {
    const firstChar = text.trim().charAt(0);
    return /[א-תء-ي]/.test(firstChar) ? "rtl" : "ltr";
  };

  return (
    <div className="p-6 max-w-3xl mx-auto font-mono space-y-2">
      {lines.map((line, index) => {
        const type = detectType(line);
        const dir = getDirection(line);
        const styleMap = {
          scene: "font-bold uppercase text-blue-500",
          character: "font-semibold text-center text-green-600",
          parenthetical: "italic text-sm text-gray-500 text-center",
          transition: "uppercase text-right text-orange-500",
          dialogue: "text-lg text-gray-800 text-center",
        };

        return (
          <textarea
            key={index}
            dir={dir}
            className={`w-full resize-none border-b border-gray-300 outline-none bg-transparent ${styleMap[type]}`}
            rows={1}
            value={line}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleChange(e, index)}
            placeholder="Type your script here..."
          />
        );
      })}
    </div>
  );
};

export default ScriptEditor;
