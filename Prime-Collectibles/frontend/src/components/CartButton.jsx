"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function CartButton() {

    const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

    const [isOpen, setIsOpen] = useState(false);

    const total = cart.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0
    );

    const totalItems = cart.reduce(
        (sum, product) => sum + product.quantity,
        0
    );

    return (
        <div className="relative">

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="rounded-lg bg-black px-4 py-2 text-white"
            >
                Cart ({totalItems})
            </button>

            {isOpen && (
                <div className="absolute right-2 z-50 mt-3 w-80 rounded-xl border bg-purple p-5 shadow-xl">

                    <h2 className="text-xl font-bold">
                        Your Cart
                    </h2>

                    {cart.length === 0 ? (
                        <p className="mt-4 text-gray-500">
                            Your cart is empty.
                        </p>
                    ) : (
                        <div className="mt-4 space-y-4">

                            {cart.map((product) => (
                                <div
                                    key={product.id}
                                    className="flex items-center justify-between border-b pb-3"
                                >
                                    <div>
                                        <p className="font-medium">
                                            {product.name}
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            ${product.price.toFixed(2)}
                                        </p>
                                    
                                    <div className="mt-3 flex items-center gap-3">
                                            <button
                                                onClick={() => decreaseQuantity(product.id)}
                                                className="flex h-8 w-8 items-center justify-center rounded border"
                                    >
                                        -
                                    </button>
                                    <span className="font-medium">
                                        {product.quantity}
                                    </span>

                                    <button
                                        onClick={() => increaseQuantity(product.id)}
                                        className="flex h-8 w-8 items-center justify-center rounded border"
                                    >
                                        +
                                    </button>
                                </div>

                                        <button
                                            onClick={() => removeFromCart(product.id)}
                                            className="mt-2 text-sm text-red-600 hover:underline"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <div className="mt-6 border-t pt-4">
                                <div className="flex justify-between font-bold">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>

                        </div>
                    )}
                </div>
            )}

        </div>
    );
}