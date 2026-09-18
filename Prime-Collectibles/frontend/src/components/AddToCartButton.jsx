"use client";

import { useCart } from "../context/CartContext";

export default function AddToCartButton({ product }) {

    const { addToCart } = useCart();

    return (
        <button
            onClick={() => addToCart(product)}
            className="mt-8 rounded-lg bg-black px-6 py-4 font-medium text-white hover:bg-gray-800"
        >
            Add to cart
        </button>
    );
}