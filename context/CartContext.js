// context/CartContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, doc, getDocs, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (!user) {
      setCart([]);
      return;
    }
    const fetchCart = async () => {
      const cartRef = collection(db, "users", user.uid, "cartItems");
      const querySnapshot = await getDocs(cartRef);
      const cartItems = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCart(cartItems);
    };
    fetchCart();
  }, [user]);

  const addToCart = async (product) => {
    if (!user) {
      toast.error("Pleaselogin first!");
      return;
    }
    try {
      const cartRef = doc(db, "users", user.uid, "cartItems", product.id);
      const existingProduct = cart.find(item => item.id === product.id);
      if (existingProduct) {
        await updateDoc(cartRef, { quantity: existingProduct.quantity + 1 });
        setCart(cart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ));
        toast.success(` ${product.name} quantity updated in cart!`);
      } else {
        await setDoc(cartRef, { ...product, quantity: 1 });
        setCart([...cart, { ...product, quantity: 1 }]);
        toast.success(`${product.name} added to cart!`);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error(" Failed to add product. Try again!");
    }
  };

  const updateCartQuantity = async (id, quantity) => {
    if (!user) return alert("Please login first!");
    try {
      const cartRef = doc(db, "users", user.uid, "cartItems", id);
      await updateDoc(cartRef, { quantity });
      setCart(cart.map(item => item.id === id ? { ...item, quantity } : item));
    } catch (error) {
      console.error("Error updating cart quantity:", error);
    }
  };

  const removeFromCart = async (id) => {
    if (!user) return alert("Please login first!");
    try {
      const cartRef = doc(db, "users", user.uid, "cartItems", id);
      await deleteDoc(cartRef);
      setCart(cart.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, updateCartQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);