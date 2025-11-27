import { useState, useEffect } from "react";

const ExpenseForm = ({ onSubmit, onCancel, existing }) => {
  const [form, setForm] = useState({
    name: "",
    amount: "",
    payment_status: "unpaid",
    paid_amount: "",
  });

  useEffect(() => {
    if (existing) setForm(existing);
  }, [existing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 p-4 bg-white shadow rounded"
    >
      <input
        type="text"
        placeholder="Expense Name"
        value={form.name}
        className="border p-2 rounded w-full"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />

      <input
        type="number"
        placeholder="Amount"
        value={form.amount}
        className="border p-2 rounded w-full"
        onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
        required
      />

      <select
        value={form.payment_status}
        className="border p-2 rounded w-full"
        onChange={(e) => setForm({ ...form, payment_status: e.target.value })}
      >
        <option value="Paid">paid</option>
        <option value="Unpaid">unpaid</option>
        <option value="Partial">partial</option>
      </select>

      {(form.payment_status === "partial" ||
        form.payment_status === "paid") && (
        <input
          type="number"
          placeholder="Paid Amount"
          value={form.paid_amount}
          className="border p-2 rounded w-full"
          onChange={(e) =>
            setForm({ ...form, paid_amount: Number(e.target.value) })
          }
        />
      )}

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 px-3 py-1 rounded"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
