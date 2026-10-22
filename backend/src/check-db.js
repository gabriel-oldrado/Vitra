import supabase from './services/supabase.js';

const { data, error } = await supabase
    .from('products')
    .select('id')
    .limit(1);

if (error) {
    console.error(error);
} else {
    console.log(data);
}