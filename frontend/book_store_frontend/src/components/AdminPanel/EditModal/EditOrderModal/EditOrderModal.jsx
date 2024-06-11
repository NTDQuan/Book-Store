import React, { useState, useEffect } from 'react';
import { updateOrder, getOrderDataByID } from '../../../../service/OrderService.js';

const EditOrderModal = ({ slug, setOpen, refreshOrders, params }) => {
  const [order, setOrder] = useState(params);
  const [status, setStatus] = useState(order.status);

  useEffect(() => {
    setOrder(params);
  }, [params]);

  const handleUpdate = async () => {
    try {
      const updatedOrder = { ...order, status };
      await updateOrder(order.id, updatedOrder);
      refreshOrders();
      setOpen(false);
      alert('Order updated successfully');
    } catch (error) {
      console.error('Error updating order', error);
    }
  };

  return (
    <div className="edit-order-modal">
      <h2>Edit Order</h2>
      <label>Status</label>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="PENDING">Pending</option>
        <option value="CONFIRMED">Confirmed</option>
        <option value="SHIPPED">Shipped</option>
        <option value="DELIVERED">Delivered</option>
        <option value="CANCELLED">Cancelled</option>
      </select>
      <button onClick={handleUpdate}>Update Order</button>
      <button onClick={() => setOpen(false)}>Cancel</button>
    </div>
  );
};

export default EditOrderModal;
