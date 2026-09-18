import pool from "../../../lib/db";
import { validateProductFields } from "../../../lib/validateProduct";

async function nameAlreadyExists(name, excludeId = null) {
    const result = excludeId
        ? await pool.query(
              "SELECT id FROM products WHERE LOWER(name) = LOWER($1) AND id != $2",
              [name, excludeId]
          )
        : await pool.query(
              "SELECT id FROM products WHERE LOWER(name) = LOWER($1)",
              [name]
          );

    return result.rows.length > 0;
}

export async function GET() {
    try {
        const result = await pool.query(
            "SELECT * FROM products ORDER BY id"
        );

        return Response.json(result.rows);
    } catch (error) {
        console.error(error);

        return Response.json(
            {
                message: "Failed to fetch products",
            },
            {
                status: 500,
            }
        );
    }
}

export async function POST(request) {
    try {
        const body = await request.json();

        const { valid, errors } = validateProductFields(body);

        if (!valid) {
            return Response.json(
                { message: "Invalid product data", errors },
                { status: 400 }
            );
        }

        if (await nameAlreadyExists(body.name.trim())) {
            return Response.json(
                {
                    message: "A product with this name already exists",
                    errors: { name: "Ya existe un producto con ese nombre." },
                },
                { status: 409 }
            );
        }

        const result = await pool.query(
            `INSERT INTO products
            (name, category, price, stock, description, image)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [
                body.name,
                body.category,
                Number(body.price),
                Number(body.stock),
                body.description,
                body.image,
            ]
        );

        return Response.json(result.rows[0], {
            status: 201,
        });
    } catch (error) {
        console.error(error);

        return Response.json(
            {
                message: "Failed to create product",
            },
            {
                status: 500,
            }
        );
    }
}

export async function PUT(request) {
    try {
        const body = await request.json();

        const { valid, errors } = validateProductFields(body);

        if (!valid) {
            return Response.json(
                { message: "Invalid product data", errors },
                { status: 400 }
            );
        }

        if (await nameAlreadyExists(body.name.trim(), Number(body.id))) {
            return Response.json(
                {
                    message: "A product with this name already exists",
                    errors: { name: "Ya existe un producto con ese nombre." },
                },
                { status: 409 }
            );
        }

        const result = await pool.query(
            `UPDATE products
            SET
                name = $1,
                category = $2,
                price = $3,
                stock = $4,
                description = $5,
                image = $6
            WHERE id = $7
            RETURNING *`,
            [
                body.name,
                body.category,
                Number(body.price),
                Number(body.stock),
                body.description,
                body.image,
                Number(body.id),
            ]
        );

        if (result.rows.length === 0) {
            return Response.json(
                {
                    message: "Product not found",
                },
                {
                    status: 404,
                }
            );
        }

        return Response.json(result.rows[0]);
    } catch (error) {
        console.error(error);

        return Response.json(
            {
                message: "Failed to update product",
            },
            {
                status: 500,
            }
        );
    }
}

export async function DELETE(request) {
    try {
        const body = await request.json();

        const result = await pool.query(
            `DELETE FROM products
            WHERE id = $1
            RETURNING *`,
            [Number(body.id)]
        );

        if (result.rows.length === 0) {
            return Response.json(
                {
                    message: "Product not found",
                },
                {
                    status: 404,
                }
            );
        }

        return Response.json({
            message: "Product deleted successfully",
            product: result.rows[0],
        });
    } catch (error) {
        console.error(error);

        return Response.json(
            {
                message: "Failed to delete product",
            },
            {
                status: 500,
            }
        );
    }
}