"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

export default function Home() {
    const [products, setProducts] = useState([]);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [sort, setSort] = useState("default");

    useEffect(() => {
        async function loadProducts() {
            const response = await fetch("/api/products");
            const data = await response.json();

            setProducts(data);
        }

        loadProducts();
    }, []);

    const filteredProducts = products
        .filter((product) =>
            product.name.toLowerCase().includes(search.toLowerCase())
        )
        .filter((product) =>
            category === "All" ? true : product.category === category
        );

  return (
        <main className="min-h-screen bg-zinc-950 text-white">
            <Navbar />
            <section className="relative overflow-hidden border-b border-zinc-800">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-zinc-950 to-black-950 opacity-80" />

                <div className="relative mx-auto flex min-h-[600px] max-w-7xl flex-col items-center justify-center px-6 text-center">
                    <span className="mb-6 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm font-medium uppercase tracking-[0.3em] text-purple-400">
                        Prime Collectibles
                    </span>

                    <h1 className="font-orbitron max-w-4xl text-5xl font-black tracking-tight sm:text-6xl lg:text-90xl">
                        TRANSFORM YOUR
                        <span className="block bg-gradient-to-r from-black-500 via-purple-400 to-blue-500 bg-clip-text text-transparent">
                            COLLECTION
                        </span>
                    </h1>

                    <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400 sm:text-xl">
                        Discover premium figures for collectors who want
                        something more than ordinary.
                    </p>

                    <button
                        onClick={() =>
                            document
                                .getElementById("catalog")
                                ?.scrollIntoView({ behavior: "smooth" })
                        }
                        className="mt-10 rounded-full bg-white px-8 py-4 font-bold text-black transition hover:scale-105 hover:bg-zinc-200"
                    >
                        Explore Collection
                    </button>
                </div>
            </section>

            <section
                id="catalog"
                className="mx-auto max-w-7xl px-6 py-20"
            >
                <div className="mb-10">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-purple-500">
                        Our Collection
                    </p>

                    <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                        Featured Products
                    </h2>

                    <p className="mt-3 max-w-2xl text-zinc-400">
                        Explore our selection of collectible figures and find
                        the perfect addition to your collection.
                    </p>
                </div>

                <div className="mb-12 rounded-2xl border border-zinc-900 bg-zinc-90/70 p-4 shadow-2xl">
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search figures..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-5 py-4 text-white outline-none transition placeholder:text-zinc-500 focus:border-purple-500"
                            />
                        </div>

                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="rounded-xl border border-zinc-700 bg-zinc-950 px-5 py-4 text-white outline-none transition focus:border-purple-500"
                        >
                            <option value="All">All categories</option>
                            <option value="Transformers">Transformers</option>
                            <option value="Gundam">Gundam</option>
                        </select>

                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="rounded-xl border border-zinc-700 bg-zinc-950 px-5 py-4 text-white outline-none transition focus:border-purple-500"
                        >
                            <option value="default">Sort by</option>
                            <option value="price-low">
                                Price: Low to High
                            </option>
                            <option value="price-high">
                                Price: High to Low
                            </option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 text-gray-600">
                    {filteredProducts.length === 0 && (
                        <p className="col-span-full py-20 text-center text-zinc-500">
                            No products found.
                        </p>
                    )}

                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            category={product.category}
                            image={product.image}
                        />
                    ))}
                </div>
            </section>

            <section className="border-t border-zinc-800 bg-zinc-900 px-6 py-24 text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-600">
                    Built for collectors
                </p>

                <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
                    Your collection starts here.
                </h2>

                <p className="mx-auto mt-4 max-w-xl text-zinc-400">
                    Find unique figures, discover new characters and build a
                    collection worth showing off.
                </p>
            </section>
        </main>
    );
}