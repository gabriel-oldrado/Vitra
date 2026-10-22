import { useEffect, useState } from 'react';
import { checkApiHealth } from './services/api.js';
import { getProducts } from './services/api.js';
import { logout } from './services/auth.service.js';
import supabase from './services/supabase.js';
import styles from './App.module.css';
import LoginForm from './components/LoginForm.jsx';

export default function App() {
  const [message, setMessage] = useState(
    'Clique pra conferir a conexão com o backend'
  );
  // produtos
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState('');

  // bglh de sessão ne
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [ isSigningOut, setIsSigningOut] = useState(false);
  const [ logoutError, setLogoutError] = useState('');

  async function handleLogout() {
    setIsSigningOut(true);
    setLogoutError('');

    try {
      await logout();
    } catch {
      setLogoutError('erro no logout');
    } finally {
      setIsSigningOut(false);
    }
  }

  useEffect(() => {
    const authListener = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
      setAuthLoading(false);
    });

    return () => {
      authListener.data.subscription.unsubscribe();
    }

  }, []);

  useEffect(() => {

    if (!session) return;

    async function fetchProducts() {
      setProductsLoading(true);
      setProductsError('');

      try {
        const data = await getProducts(session.access_token);
        setProducts(data);
      } catch {
        setProductsError('Erro ao carregar produtos');
      } finally {
        setProductsLoading(false);
      }
    }

    fetchProducts();
  }, [session]);

  async function handleCheckApi() {
    setLoading(true);

    try {
      const data = await checkApiHealth();
      setMessage(data.message);
    } catch {
      setMessage(
        'deu erro :(',
      );
    } finally {
      setLoading(false);
    }
  }

  if (authLoading) {
    return <p>Verificandoo acesso...</p>;
  }

  if (!session) {
    return (
      <main className={styles.container}>
        <h1 className={styles.title}>Entrar no Vitra</h1> 
        <LoginForm /> 
      </main>
    )
  }

  let productsContent;

  if (productsLoading) {
    productsContent = <p>Carregando produtos...</p>;
  } else if (productsError) {
    productsContent = <p>{productsError}</p>;
  } else if (products.length === 0) {
    productsContent = <p>Nenhum produto encontrado.</p>;
  } else {
    productsContent = (
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.brand} - {(product.price_cents / 100).toLocaleString('pt-BR', { 
              style: 'currency', 
              currency: 'BRL' 
            })}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Vitra</h1>

      <p className={styles.description}>
        Preparação do projeto
      </p>

      <button
        type="button"
        className={styles.button}
        onClick={handleCheckApi}
        disabled={loading}
      >
        {loading ? 'Verificando…' : 'Verificar API'}
      </button>

      <p className={styles.message} role="status">
        {message}
      </p>
      <h2 className={styles.subtitle}>Produtos</h2>
      {productsContent}

      <button
        type="button"
        className={styles.button}
        onClick={handleLogout}
        disabled={isSigningOut}
      >
        {isSigningOut ? 'Saindo...' : 'Sair'}
      </button>

      {logoutError && <p role="alert">{logoutError}</p>}
    </main>
  );
}