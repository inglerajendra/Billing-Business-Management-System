import { useState, useEffect } from "react";
import InvoiceList from "../components/InvoiceList";
import InvoiceForm from "../components/InvoiceForm";
import { getInvoices, deleteInvoice } from "../services/InvoiceService";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);

  // Load all invoices
  const loadInvoices = async () => {
    try {
      const data = await getInvoices();
      setInvoices(data);
    } catch (err) {
      console.error("Error fetching invoices:", err);
    }
  };

  useEffect(() => {
    loadInvoices();
  }, []);

  // Open form to create new invoice
  const handleCreate = () => {
    setEditingInvoice(null);
    setShowForm(true);
  };

  // Open form to edit invoice
  const handleEdit = (invoice) => {
    setEditingInvoice(invoice);
    setShowForm(true);
  };

  // Delete invoice
  const handleDelete = async (id) => {
    try {
      await deleteInvoice(id);
      loadInvoices();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // When form submitted
  const handleSuccess = () => {
    setShowForm(false);
    setEditingInvoice(null);
    loadInvoices();
  };

  return (
    <div className="p-6">
      {/* Header + Create invoice button */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Invoices</h1>
        <button
          onClick={handleCreate}
          className="  border border-black font-bold hover:bg-gradient-to-r from-[#0d1117] to-[#153685] hover:text-white shadow-lg  rounded-lg px-5 py-2.5"
        >
          + Create Invoice
        </button>
      </div>

      {/* Show Form OR List */}
      {showForm ? (
        <InvoiceForm
          existingInvoice={editingInvoice}
          onSuccess={handleSuccess}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <InvoiceList
          invoices={invoices}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Invoices;
