import { create } from "zustand";
import Product from "../models/Product";

export interface OrderItem {
  product: Product;
  quantity: number;
  pricePerUnit: number;
}

interface CartStore {
  orderItems: OrderItem[];
  addProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
  increaseQuantity: (product: Product) => void;
  decreaseQuantity: (product: Product) => void;
  clearCart: () => void;
}

const useCartStore = create<CartStore>((set) => ({
  orderItems: [],

  addProduct: (product) =>
    set((store) => {
      const existingItem = store.orderItems.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        return {
          orderItems: store.orderItems.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        orderItems: [
          ...store.orderItems,
          {
            product,
            quantity: 1,
            pricePerUnit: product.price,
          },
        ],
      };
    }),

  removeProduct: (product) =>
    set((store) => ({
      orderItems: store.orderItems.filter(
        (item) => item.product.id !== product.id
      ),
    })),

  increaseQuantity: (product) =>
    set((store) => ({
      orderItems: store.orderItems.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    })),

  decreaseQuantity: (product) =>
    set((store) => ({
      orderItems: store.orderItems.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ),
    })),

  clearCart: () =>
    set(() => ({
      orderItems: [],
    })),
}));

export default useCartStore;
