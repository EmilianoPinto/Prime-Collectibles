// Reglas de validación para un producto.
// Se usa tanto en el formulario del admin (para mostrar errores al instante)
// como en la API (para no confiar nunca solo en lo que valida el navegador).

export const PRODUCT_CATEGORIES = ["Transformers", "Gundam"];

export function validateProductFields(data) {
    const errors = {};

    const name = String(data.name ?? "").trim();
    const category = String(data.category ?? "").trim();
    const description = String(data.description ?? "").trim();
    const image = String(data.image ?? "").trim();

    const price = Number(data.price);
    const stock = Number(data.stock);

    if (name.length < 2) {
        errors.name = "The name must be at least 2 characters long.";
    } else if (name.length > 100) {
        errors.name = "The name cannot exceed 100 characters.";
    }

    if (!PRODUCT_CATEGORIES.includes(category)) {
        errors.category =
            "Select a valid category (Transformers, Gundam).";
    }

    if (!Number.isFinite(price) || price <= 0) {
        errors.price = "El precio debe ser un número mayor a 0.";
    } else if (price > 999999) {
        errors.price = "El precio es demasiado alto.";
    }

    if (!Number.isInteger(stock) || stock < 0) {
        errors.stock = "El stock debe ser un número entero de 0 o más.";
    }

    if (description.length < 10) {
        errors.description =
            "La descripción debe tener al menos 10 caracteres.";
    } else if (description.length > 2000) {
        errors.description =
            "La descripción no puede superar los 2000 caracteres.";
    }

    if (image.length > 500) {
        errors.image = "La URL de la imagen es demasiado larga.";
    }

    return {
        valid: Object.keys(errors).length === 0,
        errors,
    };
}
