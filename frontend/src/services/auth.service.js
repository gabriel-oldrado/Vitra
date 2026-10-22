import supabase from './supabase.js';

export async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        throw new Error(`Erro ao fazer login: ${error.message}`);
    }

    return data;
}

export async function logout() {
    const { error } = await supabase.auth.signOut({ scope: 'local'});
    
    if (error) {
        throw new Error(`erro no logout: ${error.message}`);
    }
}