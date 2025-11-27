import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

const InvoiceDetails = () => {
  const printRef = useRef();

  const HandleDownload = useReactToPrint({
    contentRef: printRef,
    documentTitle: `RoyalChoiceBill`,
    removeAfterPrint: true,
  });

  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/invoices/${id}`);
        const data = await res.json();
        setInvoice(data);
      } catch (error) {
        console.error("Error fetching invoice:", error);
      }
    };

    fetchInvoice();
  }, [id]);

  if (!invoice) return <p>Loading invoice...</p>;

  return (
    <div className="">
      <div className="mt-2 absolute right-130">
        <button
          onClick={HandleDownload}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-gradient-to-r from-[#0d1117] to-[#153685] hover:text-white shadow-lg"
        >
          Save Invoice
        </button>
      </div>

      <div
        ref={printRef}
        className="p-6 rounded shadow-2xl max-w-2xl mx-auto mt-8 bg-white "
      >
        {/* Company Header */}
        <div className="flex justify-around gap-2 mb-4 ">
          <div className="logo">
            <img
              src="/logo.png" // your logo file inside public folder
              alt="Company Logo"
              className="h-35 mx-auto"
            />
          </div>
          <div className="royalChoice">
            <h2 className="text-2xl font-bold mt-4 mb-2">
              Royal Choice Menswear
            </h2>
            <p className="text-gray-600">Clothing | Footwear</p>
            <p className="text-gray-600">Sangrampur, Maharashtra - 444202</p>
            <p className="text-gray-600">Phone: +91 76200 18009</p>
            <p className="text-gray-600">Email: royalchoice@gmail.com</p>
          </div>
        </div>

        {/* Invoice Info */}
        <h3 className="text-2xl font-bold mb-4 ">Billing Details</h3>

        <div className="grid grid-cols-2 gap-10 text-gray-700 text-center">
          <div className="text-left">
            <p>
              <b> Date:</b>
              {new Date(invoice.created_at).toLocaleDateString()}
            </p>

            <p className=" mt-3">
              <b>Invoice ID:</b> {invoice.id}
            </p>

            <p className=" mt-3">
              <b>Payment Status:</b> {invoice.transaction_status}
            </p>
          </div>

          <div className="text-left">
            <p>
              <b>Customer Name:</b>
              {invoice.customer_name}
            </p>

            <p className=" mt-3">
              <b>Phone:</b>
              {invoice.customer_phone}
            </p>

            <p className=" mt-3">
              <b>Email:</b> {invoice.customer_email || "Not Provided"}
            </p>
          </div>
        </div>
        {/* Items */}
        <h2 className="mt-10 mb-3 text-xl font-bold">Items</h2>
        <table className="w-full border">
          <thead className="bg-blue-50">
            <tr className="text-left">
              <th className="p-3 border">Item</th>
              <th className="p-3 border">Quantity</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border">Total</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items?.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="p-3 border">{item.name}</td>
                <td className="p-3 border">{item.quantity}</td>
                <td className="p-3 border">₹ {item.price}</td>
                <td className="p-3 border">₹ {item.quantity * item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Summary */}
        <div className="mt-6 text-right pr-4">
          <p className="font-bold">Total Amount: ₹ {invoice.total_amount}</p>
          <p className="font-bold mt-2">Paid Amount: ₹ {invoice.paid_amount}</p>
          <p className="font-bold mt-2">
            Remaining: ₹ {invoice.total_amount - invoice.paid_amount}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center bg-blue-50 text-gray-500 border-t pt-4">
          <p>Thank you for choosing Royal Choice!</p>
          <p className="mt-2">S.S.Gawai</p>
        </div>

        <hr className="my-4" />
      </div>
    </div>
  );
};

export default InvoiceDetails;
