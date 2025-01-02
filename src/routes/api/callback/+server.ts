import { redirect } from '@sveltejs/kit';
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from '$env/static/private';
// Declare a CLIENT_ID, CLIENT_SECRET, and REDIRECT_URI in a .env file. CLIENT_ID and CLIENT_SECRET comes from Spotify.

export async function GET({ url, cookies }: { url: URL; cookies: any }) {
	const code = url.searchParams.get('code');
	const storedState = cookies.get('spotify_auth_state');

	if (!storedState) {
		return redirect(302, '/?' + new URLSearchParams({ error: 'state_mismatch' }).toString());
	}

	cookies.delete('spotify_auth_state', { path: '/' });

	const params = new URLSearchParams({
		code: code || '',
		redirect_uri: REDIRECT_URI,
		grant_type: 'authorization_code'
	});

	const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`
		},
		body: params
	});

	const tokenData = await tokenResponse.json();

	if (!tokenResponse.ok) {
		console.error('Token exchange failed:', tokenData);
		return redirect(302, '/api/login');
	}

	cookies.set('access_token', tokenData.access_token, {
		path: '/',
		httpOnly: true,
		secure: true,
		maxAge: tokenData.expires_in
	});
	cookies.set('refresh_token', tokenData.refresh_token, {
		path: '/',
		httpOnly: true,
		secure: true
	});

	return redirect(302, '/');
}
