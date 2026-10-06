const apiUrl = import.meta.env.VITE_API_URL;

export async function checkApiHealth() {
    const response = await fetch(`${apiUrl}/health`);

    if (!response.ok) {
        throw new Error(`A API respondeu com erro: ${response.status}`);
    }

    return response.json();
}