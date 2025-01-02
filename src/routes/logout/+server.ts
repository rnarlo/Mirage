import { redirect } from '@sveltejs/kit';

function logout({ cookies }) {
	cookies.delete('access_token', { path: '/' });
	cookies.delete('refresh_token', { path: '/' });

	throw redirect(302, `/`);
}

export const POST = logout;
