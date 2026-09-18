import pool from "../../../../lib/db";

export async function GET(request, { params }) {

    const { id } = await params;

    try {
        const result = await pool.query(
            "SELECT * FROM products WHERE id = $1",
            [Number(id)]
        );

        if (result.rows.length === 0) {
            return Response.json(
                { error: "Product not found" },
                { status: 404 }
            );
        }

        return Response.json(result.rows[0]);
    } catch (error) {
        console.error(error);

        return Response.json(
            { message: "Failed to fetch product" },
            { status: 500 }
        );
    }
}