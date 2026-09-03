import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();
		const { email, password } = body;

		if (!email || !password) {
			return json({ success: false, message: 'Email and password required' }, { status: 400 });
		}

		// Simulate password hashing computational load (bcrypt-like latency)
		const start = Date.now();
		while (Date.now() - start < 15) {
			// CPU spin 15ms
		}

		return json({
			success: true,
			token: 'mock-jwt-token-' + Math.random().toString(36).substring(2),
			expiresIn: 3600
		});
	} catch {
		return json({ success: false, message: 'Invalid JSON payload' }, { status: 400 });
	}
};
