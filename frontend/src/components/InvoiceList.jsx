import { useNavigate } from "react-router-dom";
const InvoiceList = ({ invoices, onDelete, onEdit }) => {
  const navigate = useNavigate();
  const statusColor = (s) =>
    s === "paid"
      ? " text-green-700 font-semibold "
      : s === "partial"
      ? " text-yellow-700 font-semibold"
      : "text-red-700 font-semibold";
  return (
    <div className="mt-4 pb-6 bg-white rounded-lg  overflow-hidden">
      {invoices.length === 0 ? (
        <p className="text-center text-white-600 p-4">No invoices found.</p>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-xl text-sky-800 font-bold tracking-wider">
            <tr>
              <th className="p-3">Sr.No.</th>
              <th className="p-3">Customer</th>
              <th className="p-3">TotalAmount</th>
              <th className="p-3">PaidAmount</th>
              <th className="p-3">TransactionStatus</th>
              <th className="p-3">Date</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((invoice, index) => (
              <tr
                key={invoice.id}
                className="border-t border-gray-200 hover:bg-gray-200"
              >
                <td className="p-3">#{index + 1}</td>
                <td className="p-3">{invoice.customer_name}</td>
                <td className="p-3">₹{invoice.total_amount}</td>
                <td className="p-3">₹{invoice.paid_amount}</td>
                <td
                  className={`p-3 capitalize ${statusColor(
                    invoice.transaction_status
                  )}`}
                >
                  {invoice.transaction_status}
                </td>
                <td className="p-3">
                  {new Date(invoice.created_at).toLocaleDateString()}
                </td>

                <td className="p-3  text-center">
                  <button
                    onClick={() => onEdit(invoice)}
                    className="text-sm px-3 py-1 border rounded hover:bg-gradient-to-r from-[#0d1117] to-[#153685] hover:text-white"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(invoice.id)}
                    className="text-sm px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 ml-3"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => navigate(`/invoice/${invoice.id}`)}
                    className="text-sm px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 ml-3"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InvoiceList;
