const SPOTIFY_API_BASE_URL = 'https://api.spotify.com';

async function fetchWebApi(
	endpoint: string,
	method: 'GET' | 'POST' | 'PUT' | 'DELETE',
	access_token: string,
	body?: Record<string, unknown>
): Promise<any> {
	if (!access_token) throw new Error('Access token is missing.');

	const res = await fetch(`${SPOTIFY_API_BASE_URL}/${endpoint}`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${access_token}`
		},
		method,
		body: body ? JSON.stringify(body) : undefined
	});

	if (!res.ok) {
		const error = await res.json();
		throw new Error(error.error || 'Failed to fetch from Spotify API');
	}

	return await res.json();
}

export async function fetchProfile(access_token: string): Promise<any> {
	return await fetchWebApi('v1/me', 'GET', access_token);
}

export async function getTop(
	type: 'tracks' | 'artists',
	access_token: string
): Promise<Record<string, any>> {
	const short_term = await fetchWebApi(
		`v1/me/top/${type}?time_range=short_term&limit=10`,
		'GET',
		access_token
	);
	const medium_term = await fetchWebApi(
		`v1/me/top/${type}?time_range=medium_term&limit=10`,
		'GET',
		access_token
	);
	const long_term = await fetchWebApi(
		`v1/me/top/${type}?time_range=long_term&limit=10`,
		'GET',
		access_token
	);

	return {
		short_term: short_term.items,
		medium_term: medium_term.items,
		long_term: long_term.items
	};
}

export async function createPlaylist(
	date: string,
	time_range: 'short_term' | 'medium_term' | 'long_term',
	access_token: string
): Promise<any> {
	const topTracks = await getTop('tracks', access_token);
	const profile = await fetchProfile(access_token);
	const user_id = profile.id;

	const tracksUri = topTracks[time_range].map(
		(track: { id: string }) => `spotify:track:${track.id}`
	);

	const playlistBody = {
		name: `Top 10 (${time_range.replace('_', ' ')})`,
		description: `As of ${date}; by Mirage App`,
		public: false
	};

	const playlist = await fetchWebApi(
		`v1/users/${user_id}/playlists`,
		'POST',
		access_token,
		playlistBody
	);

	await fetchWebApi(
		`v1/playlists/${playlist.id}/tracks?uris=${tracksUri.join(',')}`,
		'POST',
		access_token
	);

	return playlist;
}
