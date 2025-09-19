import { Check, ChevronDown } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { getInvoices } from "../api";

// Types
export type Invoice = {
  id: number;
  client_name: string;
  due_amount: string;
  due_date: string;
  status: StatusKey;
};

// Status meta (single source of truth)
const STATUS_META = {
  paid: {
    pill: "bg-green-100 text-green-700 ring-green-200",
    dot: "bg-green-500",
  },
  unpaid: {
    pill: "bg-gray-100 text-gray-700 ring-gray-200",
    dot: "bg-gray-500",
  },
  overdue: {
    pill: "bg-red-100 text-red-700 ring-red-200",
    dot: "bg-red-500",
  },
  awaited: {
    pill: "bg-yellow-100 text-yellow-800 ring-yellow-200",
    dot: "bg-yellow-500",
  },
  draft: {
    pill: "bg-slate-100 text-slate-700 ring-slate-200",
    dot: "bg-slate-500",
  },
  disputed: {
    pill: "bg-rose-100 text-rose-700 ring-rose-200",
    dot: "bg-rose-500",
  },
  "partially Paid": {
    pill: "bg-amber-100 text-amber-800 ring-amber-200",
    dot: "bg-amber-500",
  },
  null: {
    pill: "bg-transparent text-gray-600 ring-gray-400",
    dot: "bg-gray-600",
  },
} as const;

type StatusKey = keyof typeof STATUS_META;

const FILTERS: ("All" | StatusKey)[] = [
  "All",
  "paid",
  "unpaid",
  "overdue",
  "awaited",
  "draft",
  "disputed",
  "partially Paid",
  "null"
];

const STATUS_VALUES: StatusKey[] = [
  "paid",
  "unpaid",
  "overdue",
  "awaited",
  "draft",
  "disputed",
  "partially Paid",
  "null"
];

// Small colored dot
const Dot: React.FC<{ className?: string }> = ({ className = "" }) => (
  <span className={`inline-block size-2 rounded-full ${className}`} />
);


const StatusSelect: React.FC<{
  value: StatusKey;
  onChange: (v: StatusKey) => void;
}> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        !menuRef.current ||
        !buttonRef.current ||
        menuRef.current.contains(e.target as Node) ||
        buttonRef.current.contains(e.target as Node)
      )
        return;
      setOpen(false);
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Keyboard handling
  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") setOpen(false);
    if (e.key === "Enter" || e.key === " ") setOpen((p) => !p);
  }

  const selectedMeta = STATUS_META[value];

  return (
    <div className="relative inline-block text-left">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((p) => !p)}
        onKeyDown={onKeyDown}
        className={`group inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-purple-400 ${selectedMeta?.pill}  ${value == null ? "border border-gray-400" : "border-transparent"}`}
      >
        <Dot className={selectedMeta?.dot} />
        <span>{value === null ? "not set" : value}</span>
        <ChevronDown className="size-4 opacity-70 group-hover:opacity-100" />
      </button>

      {open && (
        <div
          ref={menuRef}
          role="listbox"
          tabIndex={-1}
          className="absolute right-0 z-20 mt-2 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg ring-1 ring-black/5"
        >
          <div className="max-h-72 overflow-y-auto p-1">
            {STATUS_VALUES.map((s) => {
              const meta = STATUS_META[s];
              const active = s === value;
              return (
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  key={s}
                  onClick={() => {
                    onChange(s);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition hover:bg-gray-50 focus:bg-gray-50 focus:outline-none ${
                    active ? "bg-gray-50" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Dot className={meta.dot} />
                    <span className="text-gray-800">{s}</span>
                  </div>
                  {active ? <Check className="size-4" /> : null}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const InvoicesSection: React.FC = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | StatusKey>("All");
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      const data = await getInvoices();
      setInvoices(data);
    };
    fetchInvoices();
  }, []);

  const filteredInvoices = useMemo(() => {
    const s = search.toLowerCase();
    return invoices.filter((invoice) => {
      const matchesSearch = invoice.client_name.toLowerCase().includes(s);
      const matchesFilter = filter === "All" || invoice.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [invoices, search, filter]);

  const updateInvoiceStatus = (id: number, newStatus: StatusKey) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, status: newStatus } : inv))
    );
  };

  return (
    <div className="w-full mx-auto rounded-2xl">
      {/* Header */}
      <div className="flex flex-row justify-between mb-4 gap-3">
        <h2 className="text-lg text-left font-semibold text-gray-700">
          Your Invoices
        </h2>
        <input
          type="text"
          placeholder="Search by client name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-xs w-auto sm:w-64 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap mt-2 gap-2 mb-4">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-full border text-sm transition ${
              filter === f
                ? "bg-purple-100 border-purple-400 text-purple-600"
                : "bg-white border-gray-300 text-gray-500 hover:border-purple-300"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Invoices List */}
      <div className="space-y-5">
        {filteredInvoices.length > 0 ? (
          filteredInvoices.map((invoice) => (
            <div
              key={invoice.id}
              className="flex justify-between items-center border border-gray-200 rounded-2xl p-4 hover:shadow-md transition bg-white"
            >
              <div>
                <h3 className="text-gray-800 font-medium">{invoice.client_name}</h3>
                <p className="text-sm text-gray-500">
                  {invoice.due_amount}, Due: {invoice.due_date}
                </p>
              </div>

              {/* Enhanced, color-synced status dropdown */}
              <StatusSelect
                value={invoice.status}
                onChange={(s) => updateInvoiceStatus(invoice.id, s)}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No invoices found.</p>
        )}
      </div>
    </div>
  );
};

export default InvoicesSection;