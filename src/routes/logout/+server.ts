import { clearSessionCookie } from '$lib/server/auth';
import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
	clearSessionCookie(cookies);
	throw redirect(303, '/login');
};

export const POST: RequestHandler = async ({ cookies }) => {
	clearSessionCookie(cookies);
	throw redirect(303, '/login');
};
