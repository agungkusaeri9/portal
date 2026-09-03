import { clearSessionCookie } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	clearSessionCookie(cookies);
	throw redirect(303, '/login');
};

export const actions: Actions = {
	default: async ({ cookies }) => {
		clearSessionCookie(cookies);
		throw redirect(303, '/login');
	}
};
