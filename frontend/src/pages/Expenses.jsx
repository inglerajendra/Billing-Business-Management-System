import { useEffect, useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import Expense from "../components/Expense";
import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../services/ExpenseService";

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const load = async () => {
    const data = await getExpenses();
    setExpenses(data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (formData) => {
    if (editing) {
      await updateExpense(editing.id, formData);
    } else {
      await createExpense(formData);
    }

    setEditing(null);
    setShowForm(false);
    load();
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    await deleteExpense(id);
    load();
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Expenses</h1>

        <button
          className=" border border-black font-bold hover:bg-gradient-to-r from-[#0d1117] to-[#153685] hover:text-white shadow-lg  rounded-lg px-5 py-2.5"
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
        >
          + Add Expense
        </button>
      </div>

      {showForm && (
        <ExpenseForm
          existing={editing}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      <Expense
        expenses={expenses}
        onEdit={(e) => {
          setEditing(e);
          setShowForm(true);
        }}
        onDelete={handleDelete}
      />
    </div>
  );
}
