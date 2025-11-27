const API = "http://localhost:5000/api/expenses";

export const getExpenses = async () => {
  const res = await fetch(API);
  return res.json();
};

export const createExpense = async (expense) => {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense),
  });
  return res.json();
};

export const updateExpense = async (id, expense) => {
  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense),
  });
  return res.json();
};

export const deleteExpense = async (id) => {
  const res = await fetch(`${API}/${id}`, { method: "DELETE" });
  return res.json();
};
