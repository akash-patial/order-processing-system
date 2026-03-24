import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch orders from backend
  const fetchOrders = async () => {
    try {
      const res = await axios.get("/api/orders");
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Run on page load
  useEffect(() => {
    fetchOrders();
  }, []);

  const submit = async () => {
    if (!item || !quantity) return alert("Please fill all fields! 🥺");

    setLoading(true);

    try {
      await axios.post("/api/order", { item, quantity });

      // ✅ Refresh data from backend
      await fetchOrders();

      setItem("");
      setQuantity("");
    } catch (err) {
      console.error(err);
      alert("Failed to place order 😢");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* Animated background elements */}
      <div className="bg-decoration"></div>
      <div className="bg-decoration-2"></div>
      
      <div className="content-wrapper">
        <div className="header">
          <div className="icon-bounce">🛒</div>
          <h1 className="title">Order Processing System</h1>
          <p className="subtitle">Place your orders with love! 💖</p>
        </div>

        <div className="order-form">
          <div className="form-group">
            <label className="label">
              <span className="label-icon">📦</span>
              Item Name
            </label>
            <input
              className="input"
              placeholder="e.g., Cute plushie, Coffee beans..."
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="label">
              <span className="label-icon">🔢</span>
              Quantity
            </label>
            <input
              className="input"
              type="number"
              placeholder="How many?"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <button 
            className={`submit-button ${loading ? 'loading' : ''}`}
            onClick={submit} 
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Processing...
              </>
            ) : (
              <>
                <span>✨</span>
                Place Order
                <span>✨</span>
              </>
            )}
          </button>
        </div>

        <div className="orders-section">
          <div className="section-header">
            <h3 className="section-title">
              <span className="pulse">📦</span>
              Recent Orders
            </h3>
            <span className="order-count">{orders.length} {orders.length === 1 ? 'order' : 'orders'}</span>
          </div>

          {orders.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">🌟</div>
              <p>No orders yet!</p>
              <p className="empty-subtitle">Start by placing your first order above 👆</p>
            </div>
          )}

          <div className="orders-grid">
            {orders.map((order, index) => (
              <div key={index} className="order-card">
                <div className="order-header">
                  <span className="order-number">#{index + 1}</span>
                  <span className={`status-badge status-${order.status?.toLowerCase() || 'pending'}`}>
                    {order.status || 'Pending'}
                  </span>
                </div>
                <div className="order-body">
                  <div className="order-item">
                    <span className="item-icon">🎁</span>
                    <span className="item-name">{order.item}</span>
                  </div>
                  <div className="order-quantity">
                    <span className="quantity-label">Quantity:</span>
                    <span className="quantity-value">{order.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;