import { setSessionCookie, VALID_CREDENTIALS } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	// Jika user sudah terotentikasi, alihkan ke dashboard utama
	if (locals.user) {
		throw redirect(303, '/');
	}
	return {};
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const username = data.get('username')?.toString().trim() ?? '';
		const password = data.get('password')?.toString() ?? '';

		if (!username || !password) {
			return fail(400, {
				error: 'Username dan password wajib diisi.',
				username
			});
		}

		// Validasi kredensial statis
		const isValidUsername = username === VALID_CREDENTIALS.username;
		const isValidPassword = password === VALID_CREDENTIALS.password;

		if (!isValidUsername || !isValidPassword) {
			return fail(400, {
				error: 'Username atau password tidak valid. Silakan periksa kembali.',
				username
			});
		}

		// Set HttpOnly secure session cookie
		setSessionCookie(cookies, username);

		// Redirect ke portal setelah login sukses
		throw redirect(303, '/');
	}
};
