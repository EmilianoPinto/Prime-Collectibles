import Link from "next/link";

export default function ProductCard({id, name, price, category, image}) {
    return(
        <div className="w-72 overflow-hidden rounded-x1 border bg-white shadow-sm">

            <div className="h-64 bg-gray-100">
                <img
                    src={image}
                    alt={name}
                    className="h-full w-full object-contain"
                />
            </div>

            <div className="p-5">

                <p className="text-sm text-black-500">
                    {category}
                </p>

                <h2 className="mt-1 text-x1 font-bold ">
                    {name}
                </h2>

                <p className="mt-3 text-lg font-semibold">
                    ${price}
                </p>

                <Link
                    href={`/products/${id}`}
                    className="mt-4 block w-full rounded-lg bg-black px-4 py-2 text-center text-white"
                >
                    View product
                </Link>

            </div>
        </div>

    );
}