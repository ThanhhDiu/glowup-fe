import { API_URL, getAccessToken } from "./auth";
export async function getInfo() {
    const accessToken = getAccessToken()
    if (accessToken) {
        const data = await fetch(`${API_URL}/auth/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    });
    const jsonData = await data.json();
    return jsonData.data;
    } else {
        window.location.href = '/login';
    }
    
}