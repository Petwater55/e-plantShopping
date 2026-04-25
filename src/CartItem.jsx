import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, addItem } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all items in cart
  const calculateTotalAmount = (cart) => {
    let total = 0;
    cart.forEach((item) => {
      const quantity = item.quantity;
      const cost = parseFloat(item.cost.substring(1));
      total += cost * quantity;
    });
    return total;
  };

  const calculateTotalQuantity = (cart) => {
    return cart ? cart.reduce((total, item) => total + item.quantity, 0) : 0;
  };
  const totalAmount = calculateTotalAmount(cart);
  const totalQuantity = calculateTotalQuantity(cart);

  // Calculate total cost for a single item
  const calculateTotalCost = (item) => {
    const quantity = item.quantity;
    const unitPrice = parseFloat(item.cost.substring(1));
    return quantity * unitPrice;
  };

  // Handlers for cart item actions
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleContinueShopping = (e) => {
    alert('Functionality to be added for future reference');
  };


  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>
        Total Cart Amount: ${totalAmount.toFixed(2)}
      </h2>
      <p>Total Items: {totalQuantity}</p>
      <p>Total Amount: ${totalAmount.toFixed(2)}</p>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                Total: ${calculateTotalCost(item).toFixed(2)}
              </div>
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={onContinueShopping || handleContinueShopping}
        >
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;