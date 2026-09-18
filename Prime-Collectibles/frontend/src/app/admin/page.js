"use client";

import { useEffect, useState } from "react";
import {
    validateProductFields,
    PRODUCT_CATEGORIES,
} from "../../lib/validateProduct";

export default function AdminPage() {
    const [products, setProducts] = useState([]);

    const [name, setName] = useState("");
    const [category, setCategory] = useState(PRODUCT_CATEGORIES[0]);
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    const [editingId, setEditingId] = useState(null);
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        loadProducts();
    }, []);

    async function loadProducts() {
        const response = await fetch("/api/products");
        const data = await response.json();

        setProducts(data);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const productData = {
            name,
            category,
            price,
            stock,
            description,
            image,
        };

        const { valid, errors: fieldErrors } =
            validateProductFields(productData);

        if (!valid) {
            setErrors(fieldErrors);
            setMessage("");
            return;
        }

        setErrors({});

        const response = await fetch("/api/products", {
            method: editingId ? "PUT" : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                editingId ? { id: editingId, ...productData } : productData
            ),
        });

        if (!response.ok) {
            const data = await response.json().catch(() => ({}));

            setErrors(data.errors ?? {});
            setMessage(data.message ?? "Something went wrong.");
            return;
        }

        setMessage(
            editingId
                ? "Product updated successfully."
                : "Product created successfully."
        );

        clearForm();
        loadProducts();
    }

    function editProduct(product) {
        setEditingId(product.id);

        setName(product.name);
        setCategory(product.category);
        setPrice(product.price);
        setStock(product.stock);
        setDescription(product.description);
        setImage(product.image);

        setMessage("");
        setErrors({});
    }

    async function deleteProduct(id) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmed) {
            return;
        }

        await fetch("/api/products", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
        });

        setMessage("Product deleted successfully.");

        loadProducts();
    }

    function clearForm() {
        setEditingId(null);
        setName("");
        setCategory(PRODUCT_CATEGORIES[0]);
        setPrice("");
        setStock("");
        setDescription("");
        setImage("");
        setErrors({});
    }

    return (
        <main className="min-h-screen bg-gray-50 px-6 py-12 ">

            <div className="mx-auto max-w-6xl text-black">

                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-black">
                        Product Admin
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Manage your Transformers collection.
                    </p>
                </div>

                <div className="grid gap-10 lg:grid-cols-2 ">

                    <form
                        onSubmit={handleSubmit}
                        className="rounded-2xl bg-white p-8 shadow "
                    >

                        <h2 className="text-2xl font-bold text-black">
                            {editingId
                                ? "Edit Product"
                                : "Create Product"}
                        </h2>

                        <div className="mt-6 space-y-5 text-black">

                            <div>
                                <input
                                    type="text"
                                    placeholder="Product name"
                                    value={name}
                                    onChange={(event) =>
                                        setName(event.target.value)
                                    }
                                    className={`w-full rounded-lg border px-4 py-3 ${
                                        errors.name ? "border-red-500" : ""
                                    }`}
                                    required
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <select
                                    value={category}
                                    onChange={(event) =>
                                        setCategory(event.target.value)
                                    }
                                    className={`w-full rounded-lg border px-4 py-3 text-black ${
                                        errors.category
                                            ? "border-red-500"
                                            : ""
                                    }`}
                                >
                                    {PRODUCT_CATEGORIES.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                                {errors.category && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.category}
                                    </p>
                                )}
                            </div>

                            <div>
                                <input
                                    type="number"
                                    placeholder="Price"
                                    value={price}
                                    onChange={(event) =>
                                        setPrice(event.target.value)
                                    }
                                    min="0"
                                    step="0.01"
                                    className={`w-full rounded-lg border px-4 py-3 ${
                                        errors.price ? "border-red-500" : ""
                                    }`}
                                    required
                                />
                                {errors.price && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.price}
                                    </p>
                                )}
                            </div>

                            <div>
                                <input
                                    type="number"
                                    placeholder="Stock"
                                    value={stock}
                                    onChange={(event) =>
                                        setStock(event.target.value)
                                    }
                                    min="0"
                                    step="1"
                                    className={`w-full rounded-lg border px-4 py-3 ${
                                        errors.stock ? "border-red-500" : ""
                                    }`}
                                    required
                                />
                                {errors.stock && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.stock}
                                    </p>
                                )}
                            </div>

                            <div>
                                <textarea
                                    placeholder="Description"
                                    value={description}
                                    onChange={(event) =>
                                        setDescription(event.target.value)
                                    }
                                    className={`w-full rounded-lg border px-4 py-3 ${
                                        errors.description
                                            ? "border-red-500"
                                            : ""
                                    }`}
                                    rows="4"
                                    required
                                />
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            <div>
                                <input
                                    type="text"
                                    placeholder="Image URL"
                                    value={image}
                                    onChange={(event) =>
                                        setImage(event.target.value)
                                    }
                                    className={`w-full rounded-lg border px-4 py-3 ${
                                        errors.image ? "border-red-500" : ""
                                    }`}
                                />
                                {errors.image && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.image}
                                    </p>
                                )}
                            </div>

                            <div className="flex gap-3">

                                <button
                                    type="submit"
                                    className="flex-1 rounded-lg bg-black px-6 py-3 font-medium text-white"
                                >
                                    {editingId
                                        ? "Update product"
                                        : "Create product"}
                                </button>

                                {editingId && (
                                    <button
                                        type="button"
                                        onClick={clearForm}
                                        className="rounded-lg border px-6 py-3 text-black"
                                    >
                                        Cancel
                                    </button>
                                )}

                            </div>

                            {message && (
                                <p className="text-center font-medium">
                                    {message}
                                </p>
                            )}

                        </div>

                    </form>

                    <section className="rounded-2xl bg-white p-8 shadow">

                        <h2 className="text-2xl font-bold text-black">
                            Products
                        </h2>

                        <div className="mt-6 space-y-4">

                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="flex items-center justify-between rounded-lg border p-4"
                                >

                                    <div>
                                        <h3 className="font-bold text-black">
                                            {product.name}
                                        </h3>

                                        <p className="text-sm text-gray-500">
                                            ${product.price}
                                        </p>

                                        <p className="text-sm text-gray-500 text-black">
                                            Stock: {product.stock}
                                        </p>
                                    </div>

                                    <div className="flex gap-2">

                                        <button
                                            onClick={() =>
                                                editProduct(product)
                                            }
                                            className="rounded-lg border px-4 py-2 text-black"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() =>
                                                deleteProduct(product.id)
                                            }
                                            className="rounded-lg bg-red-600 px-4 py-2 text-black"
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>
                            ))}

                        </div>

                    </section>

                </div>

            </div>

        </main>
    );
}