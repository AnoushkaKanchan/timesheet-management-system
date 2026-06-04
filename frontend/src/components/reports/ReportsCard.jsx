function ReportsCard({
  title,
  description,
  buttonText,
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-slate-900">
        {title}
      </h3>

      <p className="text-slate-500 mt-2">
        {description}
      </p>

      <button className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg">
        {buttonText}
      </button>
    </div>
  );
}

export default ReportsCard;