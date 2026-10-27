const REQUIRED_TEXT_FIELDS = ['name', 'brand', 'category', 'size_label'];
const NON_NEGATIVE_NUMBER_FIELDS = ['price_cents', 'minimum_stock'];

const isPlainObject = (value) => 
    typeof value === 'object' && value !== null && !Array.isArray(value);

const isFilledText = (value) => 
        typeof value === 'string' && value.trim().length > 0;

const isNonNegativeInteger = (value) => 
        Number.isInteger(value) && value >= 0;

const OPTIONAL_TEXT_FIELDS = ['description', 'image_path'];

export function validateProduct(product) {
    if (!isPlainObject(product)) {
        return {
            valid: false,
            errors: {product: "o produto deve ser um objeto."}
        }
    };

    const errors = {};

    for (const field of REQUIRED_TEXT_FIELDS) {
        if (!isFilledText(product[field])) {
            errors[field] = `o campo ${field} é obrigatório e deve ser um texto preenchido.`;
        }
    }


    for (const field of NON_NEGATIVE_NUMBER_FIELDS) {
        if (!isNonNegativeInteger(product[field])) {
            errors[field] = `o campo ${field} é obrigatório e deve ser um número inteiro não negativo.`;
        }
    }

    for (const field of OPTIONAL_TEXT_FIELDS) {
        if (
            product[field] !== undefined &&
            product[field] !== null &&
            typeof product[field] !== 'string'
        ) {
            errors[field] = `o campo ${field} deve ser um texto se fornecido.`;
        }
    }

    if (
        product.is_published !== undefined &&
        typeof product.is_published !== 'boolean'
    ) {
        errors.is_published = "o campo is_published deve ser um booleano se fornecido.";
    }

    return {
        valid: Object.keys(errors).length === 0,
        errors
    };
}