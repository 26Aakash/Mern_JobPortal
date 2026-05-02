const statusClasses = {
  Applied: "bg-sky-100 text-sky-700",
  Reviewed: "bg-amber-100 text-amber-700",
  Rejected: "bg-rose-100 text-rose-700",
  Selected: "bg-emerald-100 text-emerald-700",
  Open: "bg-emerald-100 text-emerald-700",
  Closed: "bg-slate-200 text-slate-700",
  Interview: "bg-amber-100 text-amber-700",
  Offer: "bg-emerald-100 text-emerald-700",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        statusClasses[status] || "bg-slate-100 text-slate-700"
      }`}
    >
      {status}
    </span>
  );
}
