import { useState } from 'react';
import {login} from '../services/auth.service.js';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        setIsSubmitting(true);
        setError('');
        
        try {
            await login(email.trim(), password);
            // console.log('Login successful:', data);
        } catch {
            setError('Não foi possível entrar. Confira seus dados e tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="login-email">E-mail:</label>
            <input 
                id="login-email"
                type="email"
                value={email} 
                required
                onChange={(e) => setEmail(e.target.value)} 
            />

            <label htmlFor="login-password">Senha:</label>
            <input 
                id="login-password"
                type="password"
                value={password} 
                required
                onChange={(e) => setPassword(e.target.value)} 
            />
            
            {error && <p role="alert">{error}</p>}
            <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Entrando...' : 'Entrar'}</button>
        </form>
    )
}