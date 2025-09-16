import { useState } from "react";

const invoicesData = [
  {
    id: 1,
    client: "Client A",
    amount: "₹1,25,000",
    due: "2024-06-15",
    status: "Unpaid",
  },
  {
    id: 2,
    client: "Client B",
    amount: "₹1,25,000",
    due: "2024-06-15",
    status: "Paid",
  },
  {
    id: 3,
    client: "Client C",
    amount: "₹1,25,000",
    due: "2024-06-15",
    status: "Disputed",
  },
  {
    id: 4,
    client: "Client D",
    amount: "₹1,25,000",
    due: "2024-06-15",
    status: "Partially Paid",
  },
  {
    id: 5,
    client: "Client E",
    amount: "₹1,25,000",
    due: "2024-06-15",
    status: "Overdue",
  },
  {
    id: 6,
    client: "Client F",
    amount: "₹1,25,000",
    due: "2024-06-15",
    status: "Awaited",
  },
  {
    id: 7,
    client: "Client G",
    amount: "₹1,25,000",
    due: "2024-06-15",
    status: "Draft",
  },
];

const statusColors = {
  Paid: "bg-green-100 text-green-600",
  Unpaid: "bg-gray-100 text-gray-500",
  Overdue: "bg-red-100 text-red-600",
  Awaited: "bg-yellow-100 text-yellow-600",
  Draft: "bg-gray-200 text-gray-600",
  Disputed: "bg-red-200 text-red-700",
  "Partially Paid": "bg-yellow-200 text-yellow-700",
};

const filters = [
  "All",
  "Paid",
  "Unpaid",
  "Overdue",
  "Awaited",
  "Draft",
  "Disputed",
  "Partially Paid",
];

const InvoicesSection = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredInvoices = invoicesData.filter((invoice) => {
    const matchesSearch = invoice.client
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter = filter === "All" || invoice.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="w-full mx-auto  rounded-2xl">
      {/* Header */}
      <div className="flex flex-row  justify-between mb-4 gap-3">
        <h2 className="text-lg text-left font-semibold text-gray-600">Your Invoices</h2>
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
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-full border border-gray-300 text-sm transition ${
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
              className="flex justify-between items-center border border-gray-300 rounded-2xl p-3 hover:shadow-md transition"
            >
              <div>
                <h3 className="text-gray-700 font-medium">{invoice.client}</h3>
                <p className="text-sm text-gray-500">
                  {invoice.amount}, Due: {invoice.due}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  statusColors[invoice.status]
                }`}
              >
                {invoice.status}
              </span>
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
