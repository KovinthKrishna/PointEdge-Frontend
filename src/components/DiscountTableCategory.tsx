import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const DiscountTableDashborad = () => {
  const discounts = [
    { name: "Black Friday", type: "All - Item", start: "2024 | 11 | 12 - 12 AM", end: "2024 | 11 | 12 - 12 AM", remaining: "0D12H 38M 45S", status: "Enabled", discount: "10%" },
    { name: "Early Birds", type: "Category - Brand A", start: "2024 | 11 | 07 - 7 AM", end: "2024 | 11 | 07 - 7 AM", remaining: "2D 1H 00M 09S", status: "Enabled", discount: "Rs 500.00" },
    { name: "Weekly Offer", type: "Item - Product B", start: "2024 | 11 | 07 - 7 AM", end: "2024 | 11 | 07 - 7 AM", remaining: "2D 1H 00M 09S", status: "Disabled", discount: "Rs 100.00" },
    { name: "Weekend Offer", type: "Category - Brand F", start: "2024 | 11 | 07 - 7 AM", end: "2024 | 11 | 07 - 7 AM", remaining: "2D 1H 00M 09S", status: "Enabled", discount: "5%" },
    { name: "10000 Big Deal", type: "All - Item", start: "2024 | 11 | 07 - 7 AM", end: "-", remaining: "-", status: "Disabled", discount: "Rs 1000.00" },
  ];

  const getStatusDot = (status: string) => ({
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: status === "Enabled" ? '#36CD1D' : '#FF0000',
    display: 'inline-block',
    marginRight: '6px',
  });

  const getStatusStyle = (status: string) => ({
    display: 'inline-block',
    padding: '5px 15px',
    borderRadius: '20px',
    backgroundColor: status === 'Enabled' ? '#e9f7e6' : '#f8d7da', // Light background colors
    color: status === 'Enabled' ? '#36CD1D' : '#FF0000', // Light text color
    fontSize: '12px',
    fontWeight: 'bold',
  });

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
        <thead>
          <tr style={{ background: '#f5f5f5', textAlign: 'left' }}>
            <th style={{ padding: '10px', fontSize: '14px' }}>Name</th>
            <th style={{ padding: '10px', fontSize: '14px' }}>Type</th>
            <th style={{ padding: '10px', fontSize: '14px' }}>Start Date</th>
            <th style={{ padding: '10px', fontSize: '14px' }}>End Date</th>
            <th style={{ padding: '10px', fontSize: '14px' }}>Remaining</th>
            <th style={{ padding: '10px', fontSize: '14px' }}>Status</th>
            <th style={{ padding: '10px', fontSize: '14px' }}>Discount</th>
            <th style={{ padding: '10px', fontSize: '14px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {discounts.map((discount, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px', fontSize: '14px' }}>{discount.name}</td>
              <td style={{ padding: '10px', fontSize: '14px' }}>{discount.type}</td>
              <td style={{ padding: '10px', fontSize: '14px' }}>{discount.start}</td>
              <td style={{ padding: '10px', fontSize: '14px' }}>{discount.end}</td>
              <td style={{ padding: '10px', fontSize: '14px' }}>{discount.remaining}</td>
              <td style={{ padding: '10px', fontSize: '14px', display: 'flex', alignItems: 'center' }}>
                <div style={getStatusStyle(discount.status)}>
                  <span style={getStatusDot(discount.status)}></span>
                  {discount.status}
                </div>
              </td>
              <td style={{ padding: '10px', fontSize: '14px' }}>{discount.discount}</td>
              <td style={{ padding: '10px', fontSize: '14px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                <FaEdit style={{ color: '#008ED8', cursor: 'pointer' }} />
                <FaTrash style={{ color: '#FF0000', cursor: 'pointer' }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DiscountTableDashborad;
