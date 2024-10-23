// import React, { useEffect, useState } from "react";
// import "./Product.css";
// import data from "../../Data.json"; // Import the product data

// const Product = () => {
//     const [products, setProducts] = useState([]);
  
//     useEffect(() => {
//       setProducts(data); // Load product data
//     }, []);
  
//     return (
//       <div className="invoice-container">
//         <h2>Product Invoice</h2>
//         <table className="invoice-table">
//           <thead>
//             <tr>
//               <th>Product Name</th>
//               <th>Quantity</th>
//               <th>Sale Price (₹)</th>
//               <th>Discount (%)</th>
//               <th>GST (%)</th>
//               <th>Final Price (₹)</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product) => (
//               <tr key={product.productId}>
//                 <td>{product.productName}</td>
//                 <td>{product.quantity}</td>
//                 <td>{product.salePrice}</td>
//                 <td>{product.discount}</td>
//                 <td>{product.gstPercent}</td>
//                 <td>{product.finalPrice}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
  
//         <div className="print-section">
//           <button className="print-button" onClick={() => window.print()}>
//             Print Invoice
//           </button>
//         </div>
//       </div>
//     );
//   };
  

// export default Product;

import React, { useEffect, useState } from "react";
import "./Product.css";
import data from "../../Data.json"; // Import the product data

const Product = () => {
  const [products, setProducts] = useState([]);
  // const [invoiceSize, setInvoiceSize] = useState("3inch"); // Default to 3-inch size

  useEffect(() => {
    setProducts(data); // Load product data
  }, []);

  // Function to change the invoice size
  // const handleSizeChange = (size) => {
  //   setInvoiceSize(size);
  // };

  // Print function
  const handlePrint = (size) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Product Invoice</title>
          <style>
            @media print {
              body {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
              }
              .invoice-container {
                width: ${size === '2inch' ? '5in' : '8in'};
                margin: 0 auto;
                padding: 10px;
                border: 1px solid #000;
                border-radius: 8px;
              }
              h2 {
                text-align: center;
              }
              .invoice-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
                background-color: white;
              }
              .invoice-table th, .invoice-table td {
                padding: 10px;
                text-align: left;
                border-bottom: 1px solid #ddd;
              }
              .invoice-table th {
                background-color: #34495e;
                color: white;
              }
              .invoice-table tr:hover {
                background-color: #f1f1f1;
              }
            }
          </style>
        </head>
        <body>
          <div class="invoice-container">
            <h2>Product Invoice (${size === '2inch' ? '2-Inch' : '3-Inch'})</h2>
            <table class="invoice-table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Sale Price (₹)</th>
                  <th>Discount (%)</th>
                  <th>GST (%)</th>
                  <th>Final Price (₹)</th>
                </tr>
              </thead>
              <tbody>
                ${products.map(product => `
                  <tr>
                    <td>${product.productName}</td>
                    <td>${product.quantity}</td>
                    <td>${product.salePrice}</td>
                    <td>${product.discount}</td>
                    <td>${product.gstPercent}</td>
                    <td>${product.finalPrice}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className={`invoice-container `}>
      <h2>Product Invoice</h2>

      {/* <div className="size-buttons">
        <button className="size-button" onClick={() => handleSizeChange("2inch")}>
          2 Inch Invoice
        </button>
        <button className="size-button" onClick={() => handleSizeChange("3inch")}>
          3 Inch Invoice
        </button>
      </div> */}

      <table className="invoice-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Sale Price (₹)</th>
            <th>Discount (%)</th>
            <th>GST (%)</th>
            <th>Final Price (₹)</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.productId}>
              <td>{product.productName}</td>
              <td>{product.quantity}</td>
              <td>{product.salePrice}</td>
              <td>{product.discount}</td>
              <td>{product.gstPercent}</td>
              <td>{product.finalPrice}</td>
            
            </tr>
          ))}
        </tbody>
      </table>

      <div className="print-section">
        <button className="print-button" onClick={() => window.print()}>
          Print Invoice
        </button>
        <button onClick={() => handlePrint('2inch')}>
                  Print 2-Inch
                </button>
                <button onClick={() => handlePrint('3inch')}>
                  Print 3-Inch
                </button>
      </div>
    </div>
  );
};

export default Product;


 