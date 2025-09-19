import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Calendar, Crown, Info, X } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";

export type PresetId = "1Month" | "3Months" | "1Year" | "Custom";

type Option = {
  id: PresetId;
  label: string;
  icon?: LucideIcon;
  premium?: boolean;
};

export type DateRange = {
  start: Date | null;
  end: Date | null;
};

export type DateSelectorProps = {
  value?: DateRange;
  defaultValue?: DateRange;
  onChange?: (range: DateRange, preset: PresetId) => void;
  className?: string;
  heading?: string;
};

function addMonths(date: Date, months: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

function addYears(date: Date, years: number): Date {
  const d = new Date(date);
  d.setFullYear(d.getFullYear() + years);
  return d;
}

const PRESETS: Option[] = [
  { id: "1Month", label: "1 Month" },
  { id: "3Months", label: "3 Months" },
  { id: "1Year", label: "1 Year", icon: Crown, premium: true },
  { id: "Custom", label: "Custom", icon: Calendar },
];

function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

const DateSelector: React.FC<DateSelectorProps> = ({
  value,
  defaultValue,
  onChange,
  className,
  heading = "Time Period",
}) => {
  const [preset, setPreset] = useState<PresetId>("3Months");
  const [internal, setInternal] = useState<DateRange>(() => ({
    start: defaultValue?.start ?? null,
    end: defaultValue?.end ?? null,
  }));
  const [showPicker, setShowPicker] = useState(false);

  const range: DateRange = value ?? internal;

  const display = useMemo(() => {
    if (range.start && range.end) {
      return `${format(range.start, "dd MMM yyyy")} – ${format(
        range.end,
        "dd MMM yyyy"
      )}`;
    }
    return "Select a range";
  }, [range.start, range.end]);

  const handleSelect = (id: PresetId) => {
    setPreset(id);

    const now = new Date();
    let next: DateRange = { start: null, end: null };

    if (id === "1Month") {
      next = { start: addMonths(now, -1), end: now };
    } else if (id === "3Months") {
      next = { start: addMonths(now, -3), end: now };
    } else if (id === "1Year") {
      next = { start: addYears(now, -1), end: now };
    } else {
      setShowPicker(true);
      next = { start: null, end: null };
    }

    if (id !== "Custom") setShowPicker(false);

    if (value === undefined) setInternal(next);
    onChange?.(next, id);
  };

  const handleCustomChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "start" | "end"
  ) => {
    const v = e.target.value ? new Date(e.target.value) : null;
    const next: DateRange = { ...range, [type]: v } as DateRange;

    if (value === undefined) setInternal(next);
    onChange?.(next, "Custom");
  };

  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") setShowPicker(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const invalid = range.start && range.end ? range.start > range.end : false;

  return (
    <div
      className={cn(
        "rounded-2xl border border-gray-200/70 p-5 w-full  bg-white/70 backdrop-blur",
        "shadow-sm hover:shadow transition-shadow",
        className
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-700">{heading}</h3>
        <span className="text-gray-500 text-sm" aria-live="polite">
          {display}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {PRESETS.map(({ id, label, icon: Icon }) => {
          const active = preset === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => handleSelect(id)}
              className={cn(
                "px-3 py-2 rounded-full border text-sm inline-flex items-center gap-1",
                "focus:outline-none focus:ring-2 focus:ring-offset-2",
                active
                  ? "bg-indigo-50/70 border-indigo-200 text-indigo-700"
                  : "bg-white border-gray-300 text-gray-600 hover:border-indigo-300"
              )}
              aria-pressed={active}
              aria-label={label}
            >
              {Icon ? <Icon className="h-4 w-4" aria-hidden /> : null}
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {showPicker && preset === "Custom" && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="mt-4"
          >
            <div className="">
              <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2">
                <Calendar className="h-4 w-4 text-gray-500" aria-hidden />
                <input
                  type="date"
                  className="outline-none text-sm text-gray-700 bg-transparent"
                  onChange={(e) => handleCustomChange(e, "start")}
                  aria-label="Start date"
                />
                <span className="text-gray-400">–</span>
                <input
                  type="date"
                  className="outline-none text-sm text-gray-700 bg-transparent"
                  onChange={(e) => handleCustomChange(e, "end")}
                  aria-label="End date"
                />
              </div>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => setShowPicker(false)}
                  className="px-3 mt-3 py-2 rounded-lg bg-indigo-600 text-white text-sm hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  Done
                </button>

                {(range.start || range.end) && (
                  <button
                    type="button"
                    onClick={() => {
                      const cleared = { start: null, end: null } as DateRange;
                      if (value === undefined) setInternal(cleared);
                      onChange?.(cleared, "Custom");
                    }}
                    className="p-2 ml-2 mt-3 rounded-lg border hover:bg-gray-50 text-gray-600"
                    aria-label="Clear custom dates"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {invalid && (
              <div className="mt-2 inline-flex items-center gap-2 text-red-600 text-xs">
                <Info className="h-3.5 w-3.5" />
                <span>End date must be on or after the start date.</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DateSelector;
