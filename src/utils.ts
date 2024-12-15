export const getBackgroundColorClass = (color: string) => {
  const colorMap: { [key: string]: string } = {
    "amber-400": "hover:bg-amber-400/30",
    "neutral-950": "hover:bg-neutral-950/30",
    "blue-700": "hover:bg-blue-700/30",
    "red-600": "hover:bg-red-600/30",
    "stone-700": "hover:bg-stone-700/30",
    "purple-700": "hover:bg-purple-700/30",
    "emerald-800": "hover:bg-emerald-800/30",
    "green-600": "hover:bg-green-600/30",
    "green-700": "hover:bg-green-700/30",
    "gray-500": "hover:bg-gray-500/30",
    "sky-400": "hover:bg-sky-400/30",
    "purple-800": "hover:bg-purple-800/30",
    "neutral-100": "hover:bg-neutral-100/30",
    "cyan-700": "hover:bg-cyan-700/30",
    "pink-400": "hover:bg-pink-400/30",
    "indigo-700": "hover:bg-indigo-700/30",
    "red-800": "hover:bg-red-800/30",
    "red-900": "hover:bg-red-900/30",
    "blue-600": "hover:bg-blue-600/30",
  };
  return colorMap[color] || "hover:bg-neutral-500/30";
};
