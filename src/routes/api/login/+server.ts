import { redirect } from '@sveltejs/kit';
import { CLIENT_ID, REDIRECT_URI } from '$env/static/private';

const stateKey = 'spotify_auth_state';

function generateCodeVerifier(length: number): string {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

export async function GET({ cookies }: { cookies: any }) {
	const state = generateCodeVerifier(16);
	cookies.set(stateKey, state, { path: '/' });

	const scope = 'user-read-private user-top-read playlist-modify-private';
	const params = new URLSearchParams({
		response_type: 'code',
		client_id: CLIENT_ID ?? '',
		scope,
		redirect_uri: REDIRECT_URI ?? '',
		state
	});

	throw redirect(302, `https://accounts.spotify.com/authorize?${params}`);
}
