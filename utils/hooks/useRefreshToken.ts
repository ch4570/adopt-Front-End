import {useRouter} from 'next/router';

function useRefreshToken() {
	const router = useRouter();
	async function refreshToken(token: string) {
		try {
			const response = await fetch(`https://ez-tour.org/token/refresh`, {
				method: 'POST',
				headers: {Authorization: token},
			});
			const result = await response.json();
			if (result.status === 200) {
				window.localStorage.setItem('accessToken', result.accessToken);
			} else {
				window.localStorage.removeItem('accessToken');
			}
			return result.accessToken;
		} catch {
			return undefined;
		}
	}

	async function refresh() {
		let token = window.localStorage.getItem('accessToken');

		if (!token) {
			router.reload();
			return;
		}

		return await refreshToken(token);
	}

	return refresh;
}

export default useRefreshToken;
