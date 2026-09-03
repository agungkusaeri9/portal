import { getSessionFromCookies } from '$lib/server/auth';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Dapatkan sesi user dari HttpOnly Cookie
	const user = getSessionFromCookies(event.cookies);
	event.locals.user = user;

	const isLoginPage = event.url.pathname.startsWith('/login');

	// Jika belum login dan mencoba mengakses halaman selain login, arahkan ke /login
	if (!user && !isLoginPage) {
		throw redirect(303, '/login');
	}

	// Jika sudah login dan membuka halaman /login, arahkan ke dashboard/portal utama
	if (user && isLoginPage) {
		throw redirect(303, '/');
	}

	return resolve(event);
};
