import { useState } from 'react';
import { checkApiHealth } from './services/api.js';
import styles from './App.module.css';

export default function App() {
  const [message, setMessage] = useState(
    'Clique pra conferir a conexão com o backend'
  );
  const [loading, setLoading] = useState(false);

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
    </main>
  );

}