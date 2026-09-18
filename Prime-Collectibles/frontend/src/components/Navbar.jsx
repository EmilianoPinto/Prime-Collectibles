import CartButton from "./CartButton";

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 border-b border-zinc-600 bg-zinc-950/90 backdrop-blur-md">
            <div className="relative flex h-20 max-w-10xl items-center justify-between px-6 lg:px-8">
                <a
                    href="/"
                    className="group flex items-center gap-3"
                >

                    <div className="hidden sm:block">
                        <h1 className="font-orbitron text-lg font-black tracking-tight text-white">
                            Prime Collectibles
                        </h1>
                    </div>
                </a>
                <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
                    <a
                        href="/"
                        className="rounded-lg px-2 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 hover:text-purple-400"
                    >
                        Home
                    </a>

                    <a
                        href="/catalog"
                        className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                    >
                        Catalog
                    </a>

                    <a
                        href="/about"
                        className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                    >
                        About
                    </a>
                </div>

                <div className="flex items-center gap-3">
                    <CartButton />

                    <button
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 text-zinc-400 transition hover:border-zinc-700 hover:bg-zinc-800 hover:text-white md:hidden"
                        aria-label="Open menu"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
}