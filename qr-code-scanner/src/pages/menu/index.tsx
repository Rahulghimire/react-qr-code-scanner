import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearNotification,
  removeFromCart,
} from "../../redux/features/cartSlice";
import { useEffect } from "react";

const RestaurantMenu: React.FC = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart.items);
  const notification = useSelector((state: any) => state.cart.notification);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => dispatch(clearNotification()), 2000);
      return () => clearTimeout(timer);
    }
  }, [notification, dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-gradient-to-r from-rose-600 to-rose-800 text-white py-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Gourmet Bistro</h1>
        <p className="text-lg md:text-xl">Savor the Art of Fine Dining</p>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        {menuCategories.map((category, index) => (
          <section key={index} className="mb-12">
            <h2 className="text-3xl font-semibold text-rose-800 mb-6 border-b-2 border-rose-300 pb-2">
              {category.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <h3 className="text-xl font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-rose-600 font-medium mb-2">
                    Rs. {item.price.toFixed(2)}
                  </p>
                  <p className="text-gray-600">{item.description}</p>
                  <button
                    className="mt-4 bg-rose-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-rose-700 transition-colors duration-300"
                    onClick={() =>
                      dispatch(
                        addToCart({ name: item.name, price: item.price })
                      )
                    }
                  >
                    Order Now
                  </button>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* Cart Display */}
      <div className="fixed bottom-4 right-4 bg-white p-4 rounded shadow max-w-xs w-full">
        <h3 className="font-semibold mb-2">Your Cart</h3>
        {cart.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          cart.map((item: any) => (
            <div
              key={item.name}
              className="flex justify-between items-center mb-1"
            >
              <div>
                {item.name} x {item.quantity}
              </div>
              <button
                className="text-red-500 hover:text-red-700 cursor-pointer"
                onClick={() => dispatch(removeFromCart(item.name))}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 bg-rose-600 text-white px-4 py-2 rounded shadow">
          {notification}
        </div>
      )}

      <footer className="bg-rose-800 text-white text-center py-4">
        <p>&copy; 2025 Gourmet Bistro. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default RestaurantMenu;

const menuCategories = [
  {
    name: "Appetizers",
    items: [
      {
        name: "Bruschetta",
        price: 8.99,
        description:
          "Toasted bread topped with fresh tomatoes, basil, and balsamic glaze",
      },
      {
        name: "Calamari",
        price: 12.99,
        description: "Crispy fried squid served with marinara sauce",
      },
      {
        name: "Caprese Salad",
        price: 9.99,
        description: "Fresh mozzarella, tomatoes, basil, and olive oil",
      },
    ],
  },
  {
    name: "Main Courses",
    items: [
      {
        name: "Grilled Salmon",
        price: 22.99,
        description: "Fresh salmon fillet with lemon herb sauce",
      },
      {
        name: "Filet Mignon",
        price: 29.99,
        description: "8oz premium beef with red wine reduction",
      },
      {
        name: "Vegetarian Pasta",
        price: 16.99,
        description: "Penne with seasonal vegetables in pesto sauce",
      },
    ],
  },
  {
    name: "Desserts",
    items: [
      {
        name: "Tiramisu",
        price: 7.99,
        description: "Classic Italian dessert with coffee and mascarpone",
      },
      {
        name: "Cheesecake",
        price: 6.99,
        description: "New York style cheesecake with berry compote",
      },
    ],
  },
];
