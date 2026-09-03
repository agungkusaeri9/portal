import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const search = url.searchParams.get('search') || '';
	
	// Mock products data
	const products = Array.from({ length: 20 }, (_, i) => ({
		id: i + 1,
		name: `Product ${i + 1} - ${i % 2 === 0 ? 'Mechanical Keyboard RGB' : 'Wireless Mouse Pro'}`,
		price: 50000 + i * 15000,
		category: i % 2 === 0 ? 'Keyboard' : 'Mouse',
		stock: 100 - i * 3
	})).filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()));

	return json({
		success: true,
		total: products.length,
		data: products,
		timestamp: new Date().toISOString()
	});
};
