import React from "react";
import { useSelector } from "react-redux";

type CartItem = {
  name: string;
  price: number;
  quantity: number;
  description?: string;
  image?: string;
};

export const Order: React.FC = () => {
  const cart = useSelector((state: any) => state.cart.items) as CartItem[];

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-6">Your Order</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="w-full mb-6 border-collapse border border-gray-300">
            <thead>
              <tr className="bg-rose-100">
                <th className="border border-gray-300 p-2 text-left">Item</th>
                <th className="border border-gray-300 p-2">Qty</th>
                <th className="border border-gray-300 p-2 text-right">Price</th>
                <th className="border border-gray-300 p-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(({ name, price, quantity }) => (
                <tr key={name} className="hover:bg-rose-50">
                  <td className="border border-gray-300 p-2">{name}</td>
                  <td className="border border-gray-300 p-2 text-center">
                    {quantity}
                  </td>
                  <td className="border border-gray-300 p-2 text-right">
                    ${price.toFixed(2)}
                  </td>
                  <td className="border border-gray-300 p-2 text-right">
                    ${(price * quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-right font-semibold text-lg mb-6">
            Total: ${total.toFixed(2)}
          </div>
          <button
            onClick={() => alert("Order placed!")}
            className="bg-rose-600 text-white px-6 py-3 rounded hover:bg-rose-700 transition"
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
};
