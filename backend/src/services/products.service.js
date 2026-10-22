import supabase from './supabase.js';

export async function listProducts() {
    const {data, error} = await supabase
        .from('products')
        .select('id, name, brand, price_cents');

    if (error) {
        throw new Error(`Error fetching products: ${error.message}`);
    }

    return data;
}