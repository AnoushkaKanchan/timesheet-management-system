function StatCard({
  title,
  value,
  valueColor = "text-slate-900",
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <p className="text-sm text-slate-500">
        {title}
      </p>

      <h2
        className={`text-3xl font-bold mt-2 ${valueColor}`}
      >
        {value}
      </h2>
    </div>
  );
}

export default StatCard;