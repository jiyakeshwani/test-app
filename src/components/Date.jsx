import { Calendar, Crown } from "lucide-react";
import { useState } from "react";

const Date = () => {
  const [selected, setSelected] = useState("3Months");

  const options = [
    { id: "1Month", label: "1 Month" },
    { id: "3Months", label: "3 Months" },
    { id: "1Year", label: "1 Year", icon: <Crown size={16} className="text-purple-500 inline ml-1" /> },
    { id: "Custom", label: "Custom", icon: <Calendar size={16} className="inline ml-1" /> },
  ];

  return (
    <div className="border border-gray-200 mt-1 rounded-2xl p-5.5 w-fit">
      {/* Title & Date */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-gray-500 font-medium">Time Period</h3>
        <span className="text-gray-400 text-sm">dd:mm:yyyy - dd:mm:yyyy</span>
      </div>

      {/* Options */}
      <div className="flex gap-3 flex-wrap">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setSelected(opt.id)}
            className={`px-4 py-2 rounded-full border flex items-center justify-center gap-1 transition
              ${selected === opt.id
                ? "bg-purple-200 border-purple-200 bg-gradient-to-b from-[#CF3097] to-[#444CD3] bg-clip-text text-transparent"
                : "bg-white border-gray-300 text-gray-500 hover:border-purple-300"}`}
          >
            {opt.label}
            {opt.icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Date;
