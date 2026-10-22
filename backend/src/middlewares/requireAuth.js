import supabase from '../services/supabase.js';

export async function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'header de autorização ausente' });
    }
    
    const [scheme, token, extra] = authHeader.trim().split(/\s+/);

    if (scheme.toLowerCase() !== 'bearer' || !token || extra) {
        return res.status(401).json({ error: 'autorização inválida'});
    }

    try {
        const { data, error } = await supabase.auth.getUser(token);
        if (error || !data?.user) {
            return res.status(401).json({ error: 'token inválido' });
        }

        if (data.user.id !== process.env.VITRA_OWNER_ID) {
            return res.status(403).json({ error: 'acesso negado' });
        }
        
        req.user = data.user;
        next();
    } catch (error) {
        res.status(500).json({ error: 'erro interno do servidor' });
    }
}