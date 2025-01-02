import { getTop } from '$lib/spotify';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const access_token = cookies.get('access_token');

	if (!access_token) {
		return {
			access_token: null,
			topList: null
		};
	}

	try {
		const topList = await getTop('tracks', access_token);
		return {
			access_token,
			topList
		};
	} catch {
		return {
			access_token,
			topList: null
		};
	}
};
