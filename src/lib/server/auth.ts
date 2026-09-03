import { dev } from '$app/environment';
import type { Cookies } from '@sveltejs/kit';
import crypto from 'node:crypto';

// Kredensial statis (disimpan di server-side, tidak pernah terekspos ke browser client)
export const VALID_CREDENTIALS = {
	username: 'agungkusaeri9',
	password: 'Login.php123'
};

const SESSION_COOKIE_NAME = 'portal_session';
const SESSION_SECRET = 'portal-secret-key-agungkusaeri9-2026-auth-token';

/**
 * Membuat token session yang ditandatangani HMAC
 */
export function createSessionToken(username: string): string {
	const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 hari
	const payload = `${username}:${expiresAt}`;
	const signature = crypto
		.createHmac('sha256', SESSION_SECRET)
		.update(payload)
		.digest('hex');
	return `${payload}:${signature}`;
}

/**
 * Memvalidasi token session dan mengembalikan data user jika valid
 */
export function validateSessionToken(token: string): { username: string } | null {
	try {
		const parts = token.split(':');
		if (parts.length !== 3) return null;

		const [username, expiresAtStr, signature] = parts;
		const expiresAt = Number(expiresAtStr);

		if (isNaN(expiresAt) || Date.now() > expiresAt) {
			return null;
		}

		const expectedSignature = crypto
			.createHmac('sha256', SESSION_SECRET)
			.update(`${username}:${expiresAtStr}`)
			.digest('hex');

		if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
			return null;
		}

		return { username };
	} catch {
		return null;
	}
}

/**
 * Menyimpan session cookie dengan opsi keamanan tinggi (HttpOnly, SameSite, Secure)
 */
export function setSessionCookie(cookies: Cookies, username: string) {
	const token = createSessionToken(username);
	cookies.set(SESSION_COOKIE_NAME, token, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		secure: !dev,
		maxAge: 7 * 24 * 60 * 60 // 7 hari dalam detik
	});
}

/**
 * Menghapus session cookie saat logout
 */
export function clearSessionCookie(cookies: Cookies) {
	cookies.delete(SESSION_COOKIE_NAME, {
		path: '/'
	});
}

/**
 * Mengambil dan memvalidasi session dari cookie request
 */
export function getSessionFromCookies(cookies: Cookies): { username: string } | null {
	const token = cookies.get(SESSION_COOKIE_NAME);
	if (!token) return null;
	return validateSessionToken(token);
}
