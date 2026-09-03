import { json, type RequestHandler } from '@sveltejs/kit';

const registeredEmails = new Set<string>();

export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();
		const { email, password } = body;

		if (!email || !password) {
			return json({ success: false, message: 'Email and password required' }, { status: 400 });
		}

		// Simulate race condition / duplicate check
		if (registeredEmails.has(email)) {
			return json({ success: false, message: 'Email already registered' }, { status: 409 });
		}

		registeredEmails.add(email);

		// Keep set size reasonable in dev
		if (registeredEmails.size > 5000) {
			registeredEmails.clear();
		}

		return json(
			{
				success: true,
				message: 'User registered successfully',
				user: { email, id: Math.floor(Math.random() * 100000) }
			},
			{ status: 201 }
		);
	} catch {
		return json({ success: false, message: 'Invalid JSON payload' }, { status: 400 });
	}
};
