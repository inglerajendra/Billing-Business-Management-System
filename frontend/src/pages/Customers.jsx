import React, { useEffect, useState, useCallback } from "react";
import CustomerForm from "../components/CustomerForm";
import Customer from "../components/Customer";
import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../services/CustomerService";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load customers");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const handleSave = async (formData) => {
    try {
      if (editingCustomer) {
        await updateCustomer(editingCustomer.id, formData);
        setSuccessMsg("Customer updated successfully");
      } else {
        await createCustomer(formData);
        setSuccessMsg("Customer created successfully");
      }
      await fetchCustomers();
      setFormOpen(false);
      setEditingCustomer(null);
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error(err);
      setError("Failed to save customer");
    }
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this customer?");
    if (!ok) return;
    try {
      await deleteCustomer(id);
      setCustomers((prev) => prev.filter((c) => c.id !== id));
      setSuccessMsg("Customer deleted successfully");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error(err);
      alert("Failed to delete customer");
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Customer List</h1>
        <div className="flex items-center gap-3">
          {successMsg && <div className="text-green-600">{successMsg}</div>}
          <button
            className=" border border-black font-bold hover:bg-gradient-to-r from-[#0d1117] to-[#153685] hover:text-white shadow-lg  rounded-lg px-5 py-2.5"
            onClick={() => {
              setEditingCustomer(null);
              setFormOpen(true);
            }}
          >
            + Create Customer
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded">
        {loading ? (
          <div className="p-6">Loading customers...</div>
        ) : error ? (
          <div className="p-6 text-red-600">{error}</div>
        ) : customers.length === 0 ? (
          <div className="p-6">No customers yet. Create one.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs  text-sky-800 font-bold uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs  text-sky-800 font-bold uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs  text-sky-800 font-bold uppercase tracking-wider">
                    Mobile
                  </th>
                  <th className="px-6 py-3 text-right text-xs  text-sky-800 font-bold uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y">
                {customers.map((c) => (
                  <Customer
                    key={c.id}
                    customer={c}
                    onEdit={(customer) => {
                      setEditingCustomer(customer);
                      setFormOpen(true); // this opens the modal
                    }}
                    onDelete={handleDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <CustomerForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        initialData={editingCustomer}
        onSaved={handleSave}
      />
    </div>
  );
}
