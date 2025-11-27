const ExpenseTable = ({ expenses, onEdit, onDelete }) => {
  const statusColor = (s) =>
    s === "paid"
      ? " text-green-700 "
      : s === "partial"
      ? " text-yellow-700"
      : " text-red-700";
  return (
    <table className="w-full border-collapse text-left  mt-4">
      <thead className="bg-gray-100 text-xl text-sky-800 font-bold">
        <tr>
          <th className="p-6">Name</th>
          <th className="p-6">Amount</th>
          <th className="p-6">Status</th>
          <th className="p-6">Paid</th>
          <th className="p-6">Actions</th>
        </tr>{" "}
      </thead>

      <tbody>
        {expenses.map((e) => (
          <tr key={e.id} className="text-left border-t hover:bg-gray-200">
            <td className="p-6">{e.name}</td>
            <td className="p-6">{e.amount}</td>
            <td
              className={` inline-block p-6 rounded-full text-lg font-semibold ${statusColor(
                e.payment_status
              )}`}
            >
              {e.payment_status}
            </td>
            <td className="p-6">{e.paid_amount}</td>
            <td className="p-6 space-x-3">
              <button
                className="text-sm px-3 py-1 border rounded hover:bg-gradient-to-r from-[#0d1117] to-[#153685] hover:text-white"
                onClick={() => onEdit(e)}
              >
                Edit
              </button>
              <button
                className="text-sm px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 ml-3"
                onClick={() => onDelete(e.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}

        {expenses.length === 0 && (
          <tr>
            <td colSpan="5" className="p-3 text-center">
              No expenses found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ExpenseTable;
