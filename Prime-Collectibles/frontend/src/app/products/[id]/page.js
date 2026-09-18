import Link from "next/link";
import AddToCartButton from "../../../components/AddToCartButton";

export default async function ProductPage({ params }) {
    const { id } = await params;

const response = await fetch(
    "http://localhost:3000/api/products",
    {
        cache: "no-store",
    }
);

if (!response.ok) {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
                <h1 className="text-3xl font-bold">
                    Failed to fetch products
                </h1>

                <Link
                    href="/"
                    className="mt-6 inline-block rounded-lg bg-black px-6 py-3 text-white"
                >
                    Back to home
                </Link>
            </div>
        </div>
    );
}

const products = await response.json();

const product = products.find(
    (product) => product.id === Number(id)
);

if (!product) {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
                <h1 className="text-3xl font-bold">
                    Product not found
                </h1>

                <Link
                    href="/"
                    className="mt-6 inline-block rounded-lg bg-black px-6 py-3 text-white"
                >
                    Back to home
                </Link>
            </div>
        </div>
    );
}

    return (
        <div className="min-h-screen bg-gray-50">

            <div className="mx-auto max-w-6xl px-6 py-12">

                <Link
                    href="/"
                    className="text-sm text-gray-500 hover:text-black"
                >
                    ← Back to catalog
                </Link>

                <div className="mt-8 grid gap-12 md:grid-cols-2">

                    <div className="flex h-[500px] items-center justify-center rounded-2xl bg-white">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-contain"
                        />
                    </div>

                    <div className="flex flex-col justify-center">

                        <p className="text-sm font-medium text-gray-500">
                            {product.category}
                        </p>

                        <h1 className="mt-2 text-4xl font-bold text-black">
                            {product.name}
                        </h1>

                        <p className="mt-6 text-3xl font-semibold text-black">
                            ${Number(product.price).toFixed(2)}
                        </p>

                        <p className="mt-6 leading-7 text-gray-600">
                            {product.description}
                        </p>

                        <div className="mt-6">
                            <p className="font-medium text-gray-500">
                                Stock
                            </p>

                            <p className="mt-1 text-green-600">
                                {product.stock} units available
                            </p>
                        </div>

                        <AddToCartButton product={product} />

                    </div>

                </div>

            </div>

        </div>
    );
}