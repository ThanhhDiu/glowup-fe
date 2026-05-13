import { API_URL, fetchWithAuth } from "./auth";
export async function getInfo() {
        const data = await fetchWithAuth(`${API_URL}/auth/me`, {
        method: 'GET',
    });
    const jsonData = await data.json();
    return jsonData.data;
}