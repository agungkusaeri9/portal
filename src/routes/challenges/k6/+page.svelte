<script lang="ts">
	interface K6Challenge {
		id: string;
		num: string;
		title: string;
		level: string;
		levelColor: string;
		objective: string;
		scenario: string;
		metrics?: string[];
		questions: string[];
		deliverable?: string;
		getK6Code?: (baseUrl: string) => string;
		architecture?: string;
		bonus?: string;
	}

	const levels = [
		'All',
		'Level 1 — Fundamentals',
		'Level 2 — Registration & Auth',
		'Level 3 — Traffic Simulation',
		'Level 4 — Stress & Spike',
		'Level 5 — Scaling',
		'Level 6 — Reliability',
		'Final Challenge'
	];

	// Target URL Sandbox Selector State
	let selectedTargetType = $state<'sandbox' | 'k6test' | 'custom'>('sandbox');
	let customUrl = $state('http://localhost:8082');

	let currentBaseUrl = $derived(
		selectedTargetType === 'sandbox'
			? 'http://localhost:5173/api/mock'
			: selectedTargetType === 'k6test'
				? 'https://test.k6.io'
				: customUrl.replace(/\/$/, '')
	);

	const k6Challenges: K6Challenge[] = [
		// LEVEL 1
		{
			id: 'k6-ch-01',
			num: '01',
			title: 'API Baseline',
			level: 'Level 1 — Fundamentals',
			levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
			objective: 'Cari tahu seberapa cepat API kamu sebelum diberi load.',
			scenario: `Uji endpoint sederhana:
GET /products

Test menggunakan:
• 1 virtual user
• 10 virtual users
• 50 virtual users`,
			metrics: ['http_req_duration (avg, p95, p99)', 'http_req_failed', 'iterations', 'vus'],
			questions: [
				'Berapa average latency?',
				'Berapa p95?',
				'Apakah latency meningkat ketika VU bertambah?',
				'Apakah ada request yang gagal?'
			],
			deliverable: `Baseline Report:
10 VUs  → p95: ___ ms
50 VUs  → p95: ___ ms`,
			getK6Code: (base: string) => `import http from 'k6/http';
import { check, sleep } from 'k6';

// Fleksibel: Jalankan k6 dengan -e BASE_URL=http://localhost:PORT jika port berbeda
const BASE_URL = __ENV.BASE_URL || '${base}';

export const options = {
  stages: [
    { duration: '30s', target: 1 },
    { duration: '1m', target: 10 },
    { duration: '1m', target: 50 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<200'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const res = http.get(\`\${BASE_URL}/products\`);
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
  sleep(1);
}`
		},
		{
			id: 'k6-ch-02',
			num: '02',
			title: '1,000 Concurrent Users',
			level: 'Level 1 — Fundamentals',
			levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
			objective: 'Memahami behavior API ketika banyak user aktif secara bersamaan.',
			scenario: `Simulasikan 1,000 concurrent users yang melakukan akses rutin ke:
• GET /products
• GET /products?search=keyboard`,
			questions: [
				'Berapa RPS yang tercapai?',
				'Berapa p95 latency?',
				'Apakah error rate meningkat?',
				'CPU server berapa persen?',
				'Memory berapa persen?'
			],
			deliverable: `Success Criteria:
p95 < 500ms
error rate < 1%
(Catatan: Jangan menganggap 1,000 concurrent users = 1,000 RPS)`,
			getK6Code: (base: string) => `import http from 'k6/http';
import { check, group, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 500 },
    { duration: '3m', target: 1000 },
    { duration: '1m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  group('Browsing Flow', function () {
    const res = http.get('${base}/products');
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(0.5);
    
    http.get('${base}/products?search=keyboard');
    sleep(1);
  });
}`
		},

		// LEVEL 2
		{
			id: 'k6-ch-03',
			num: '03',
			title: '2,000 User Registration Burst',
			level: 'Level 2 — Registration & Auth',
			levelColor: 'bg-amber-50 text-amber-700 border-amber-200',
			objective: 'Test kemampuan backend menangani registration traffic yang besar.',
			scenario: `Simulasikan 2,000 users melakukan pendaftaran serentak:
POST /register
Payload: { "email": "user-{{uuid}}@example.com", "password": "Password123!" }`,
			metrics: ['API CPU & Memory', 'DB CPU & Connections', 'Query latency', 'Connection pool exhaustion', 'p95 latency & error rate'],
			questions: [
				'Bottleneck ada di API atau database?',
				'Password hashing (bcrypt/argon2) memakan CPU berapa banyak?',
				'Apakah database mampu menerima semua connection?',
				'Apakah request mulai timeout?'
			],
			getK6Code: (base: string) => `import http from 'k6/http';
import { check } from 'k6';
import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

export const options = {
  stages: [
    { duration: '30s', target: 500 },
    { duration: '2m', target: 2000 },
    { duration: '30s', target: 0 }
  ]
};

export default function () {
  const payload = JSON.stringify({
    email: \`user-\${uuidv4()}@example.com\`,
    password: 'Password123!'
  });

  const res = http.post('${base}/register', payload, {
    headers: { 'Content-Type': 'application/json' }
  });

  check(res, {
    'registered': (r) => r.status === 201 || r.status === 200
  });
}`
		},
		{
			id: 'k6-ch-04',
			num: '04',
			title: 'Same Email Race Condition',
			level: 'Level 2 — Registration & Auth',
			levelColor: 'bg-amber-50 text-amber-700 border-amber-200',
			objective: 'Menguji race condition ketika banyak request membuat account dengan email yang sama persis secara bersamaan.',
			scenario: `100 concurrent requests:
POST /register
Dengan email yang sama: { "email": "test@example.com" }

Expected Behavior:
Hanya 1 request yang berhasil (201). Sisanya harus mendapatkan response 409 Conflict.`,
			questions: [
				'Apakah database punya UNIQUE(email)?',
				'Apakah application layer saja cukup?',
				'Apakah terjadi duplicate user di database?',
				'Apakah database transaction dan isolation level sudah benar?'
			],
			bonus: 'Coba test tanpa database UNIQUE constraint dan bandingkan hasilnya.',
			getK6Code: (base: string) => `import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 100,
  duration: '10s'
};

export default function () {
  const payload = JSON.stringify({
    email: 'test@example.com',
    password: 'Password123!'
  });

  const res = http.post('${base}/register', payload, {
    headers: { 'Content-Type': 'application/json' }
  });

  check(res, {
    'created or conflict': (r) => r.status === 201 || r.status === 409
  });
}`
		},
		{
			id: 'k6-ch-05',
			num: '05',
			title: 'Login Storm',
			level: 'Level 2 — Registration & Auth',
			levelColor: 'bg-amber-50 text-amber-700 border-amber-200',
			objective: 'Menguji authentication endpoint ketika banyak user login bersamaan.',
			scenario: `2,000 users melakukan POST /login secara serentak. Password hashing dieksekusi dalam proses verifikasi credential.`,
			metrics: ['API CPU Utilization', 'Authentication Latency', 'RPS', 'Error Rate', 'DB Active Connections'],
			questions: [
				'Apakah CPU menjadi bottleneck utama akibat password verify?',
				'Apakah login latency jauh lebih tinggi daripada GET endpoint?',
				'Apakah work-factor password hashing perlu di-tune?',
				'Apa yang terjadi jika server hanya memiliki 1 CPU core?'
			],
			getK6Code: (base: string) => `import http from 'k6/http';
import { check } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 500 },
    { duration: '1m', target: 2000 },
    { duration: '30s', target: 0 }
  ]
};

export default function () {
  const payload = JSON.stringify({
    email: 'user@example.com',
    password: 'Password123!'
  });

  const res = http.post('${base}/login', payload, {
    headers: { 'Content-Type': 'application/json' }
  });

  check(res, {
    'login ok': (r) => r.status === 200
  });
}`
		},

		// LEVEL 3
		{
			id: 'k6-ch-06',
			num: '06',
			title: 'Mixed Traffic Simulation',
			level: 'Level 3 — Traffic Simulation',
			levelColor: 'bg-orange-50 text-orange-700 border-orange-200',
			objective: 'Membuat simulasi distribusi traffic produksi yang realistis.',
			scenario: `Distribusi traffic:
• 60% GET /products
• 20% GET /products?search=keyboard
• 10% POST /register
• 10% POST /login`,
			questions: [
				'Endpoint mana paling banyak menerima traffic?',
				'Endpoint mana paling lambat?',
				'Apakah transaksi tulis mempengaruhi latency endpoint baca?',
				'Apakah database query tertentu menjadi bottleneck?'
			],
			deliverable: `Deliverable Matrix:
| Endpoint          | RPS | p95 | Error |
| GET /products     | ___ | ___ | _____ |
| POST /register    | ___ | ___ | _____ |
| POST /login       | ___ | ___ | _____ |`
		},
		{
			id: 'k6-ch-07',
			num: '07',
			title: 'Ramp-up Breaking Point Test',
			level: 'Level 3 — Traffic Simulation',
			levelColor: 'bg-orange-50 text-orange-700 border-orange-200',
			objective: 'Mengetahui titik presisi (breaking point) ketika sistem mulai mengalami degradasi performa.',
			scenario: `Naikkan load secara bertahap:
100 VUs → 250 VUs → 500 VUs → 750 VUs → 1,000 VUs → 1,500 VUs → 2,000 VUs
Setiap stage berjalan 2–3 menit.`,
			deliverable: `Contoh Analisis Degradasi:
0–500 VUs   → Healthy
500–1,000   → Healthy
1,000–1,500 → Degradation (Latency Naik)
1,500+      → High error rate`,
			questions: [
				'Pada VU berapa latency mulai naik signifikan?',
				'Pada VU berapa error mulai muncul?',
				'Apakah CPU sudah 100%?',
				'Apakah DB connection habis?'
			]
		},

		// LEVEL 4
		{
			id: 'k6-ch-08',
			num: '08',
			title: 'Spike Test',
			level: 'Level 4 — Stress & Spike',
			levelColor: 'bg-rose-50 text-rose-700 border-rose-200',
			objective: 'Mengetahui apakah sistem mampu bertahan dan recover saat menghadapi lonjakan traffic tiba-tiba (Flash Sale / Viral).',
			scenario: `100 VUs ➔ (Sudden Spike) ➔ 2,000 VUs ➔ 100 VUs
Simulasikan skenario Flash sale, rilis tiket event, atau breaking news.`,
			questions: [
				'Berapa lama sistem recover setelah spike berakhir?',
				'Apakah request queue meningkat dan memicu OOM?',
				'Apakah database crash?',
				'Apakah service kembali normal tanpa restart?'
			]
		},
		{
			id: 'k6-ch-09',
			num: '09',
			title: 'Database Bottleneck & Indexing',
			level: 'Level 4 — Stress & Spike',
			levelColor: 'bg-rose-50 text-rose-700 border-rose-200',
			objective: 'Menemukan dan memperbaiki bottleneck akibat query database yang berat.',
			scenario: `Buat endpoint: GET /products?search=keyboard
Test dengan dataset database berisi: 10,000 rows → 100,000 rows → 1,000,000 rows.`,
			deliverable: `Eksperimen:
1. Test tanpa Index: SELECT * FROM products WHERE name LIKE '%keyboard%';
2. Tambahkan B-Tree / GIN Fulltext Index yang relevan.
3. Bandingkan Before vs After Indexing.`,
			questions: [
				'Berapa perubahan query latency di database?',
				'Apakah API p95 ikut membaik drastis?',
				'Apakah database CPU turun?',
				'Kapan index tidak lagi menyelesaikan masalah?'
			]
		},
		{
			id: 'k6-ch-10',
			num: '10',
			title: 'Connection Pool Exhaustion',
			level: 'Level 4 — Stress & Spike',
			levelColor: 'bg-rose-50 text-rose-700 border-rose-200',
			objective: 'Memahami batasan database connection pool dan trade-off konkurensi.',
			scenario: `API instances: 1, DB pool size: 10
Beri beban 1,000 concurrent users.

Uji coba variasi Pool:
Pool = 10 vs Pool = 25 vs Pool = 50 vs Pool = 100`,
			metrics: ['Active connections', 'Waiting / Queued connections', 'Query latency', 'Request timeout'],
			questions: [
				'Apakah pool lebih besar selalu lebih cepat?',
				'Kapan database mulai overload akibat context switching?',
				'Apa hubungan pool size dengan DB max_connections?'
			]
		},

		// LEVEL 5
		{
			id: 'k6-ch-11',
			num: '11',
			title: 'Horizontal Scaling',
			level: 'Level 5 — Scaling',
			levelColor: 'bg-purple-50 text-purple-700 border-purple-200',
			objective: 'Menguji apakah menambah API instance meningkatkan throughput secara linear.',
			architecture: `             ┌── API #1
Load Balancer ├── API #2
             └── API #3
                    │
                    ▼
                 PostgreSQL`,
			scenario: `Test 1 API instance vs 2 API instances vs 4 API instances dengan beban load yang sama.`,
			deliverable: `Comparison Table:
| Instances | RPS | p95 | Error |
| 1         | ___ | ___ | _____ |
| 2         | ___ | ___ | _____ |
| 4         | ___ | ___ | _____ |`,
			questions: [
				'Apakah throughput meningkat secara linear?',
				'Apa bottleneck baru setelah API di-scale?',
				'Apakah database sekarang menjadi single point bottleneck?'
			]
		},
		{
			id: 'k6-ch-12',
			num: '12',
			title: 'Redis Caching Optimization',
			level: 'Level 5 — Scaling',
			levelColor: 'bg-purple-50 text-purple-700 border-purple-200',
			objective: 'Mengurangi beban database hingga 80%+ menggunakan caching Redis.',
			architecture: `Request ──► Redis (Cache Hit)
              │
              └─► (Cache Miss) ──► PostgreSQL`,
			scenario: `Endpoint: GET /products/:id
Bandingkan performa: Without Redis vs With Redis Cache.`,
			metrics: ['API latency', 'DB CPU', 'DB queries executed', 'Redis hit rate', 'p95 latency'],
			questions: [
				'Seberapa besar peningkatan latency (ms)?',
				'Berapa cache hit rate yang tercapai?',
				'Kapan cache menjadi tidak berguna?',
				'Bagaimana strategi menangani stale data / cache invalidation?'
			]
		},
		{
			id: 'k6-ch-13',
			num: '13',
			title: 'Async Queue Processing',
			level: 'Level 5 — Scaling',
			levelColor: 'bg-purple-50 text-purple-700 border-purple-200',
			objective: 'Memahami kapan pekerjaan berat sebaiknya dipindahkan ke background worker queue.',
			scenario: `Registration memerlukan: Create User, Send Email, Generate Welcome Notification, dan Analytics.

Bandingkan:
1. Synchronous: Request ➔ User ➔ Email ➔ Analytics ➔ Response
2. Asynchronous: Request ➔ User ➔ Queue ➔ Response (Worker memproses Email & Analytics)`,
			questions: [
				'Berapa perbedaan latency request yang dirasakan pengguna?',
				'Berapa throughput RPS yang meningkat?',
				'Apa risiko dan trade-off dari async processing?'
			],
			bonus: 'Uji queue dengan variasi 1 worker, 5 workers, dan 10 workers.'
		},

		// LEVEL 6
		{
			id: 'k6-ch-14',
			num: '14',
			title: 'Distributed Rate Limiting',
			level: 'Level 6 — Reliability',
			levelColor: 'bg-red-50 text-red-700 border-red-200',
			objective: 'Melindungi API dari traffic berlebihan dan abuse menggunakan rate limiting.',
			scenario: `Batas: 100 requests / minute / IP
Ketika limit tercapai, kembalikan HTTP 429 Too Many Requests.
Kirim 50, 100, 500, dan 1,000 requests.`,
			questions: [
				'Apakah rate limiter bekerja dengan presisi?',
				'Apakah legitimate users ikut terdampak?',
				'Apakah rate limiter menggunakan memory lokal atau Redis?',
				'Bagaimana behavior ketika API di-scale menjadi 4 instances?'
			],
			bonus: 'Implementasikan distributed rate limiting menggunakan Redis Sliding Window / Token Bucket.'
		},

		// FINAL CHALLENGE
		{
			id: 'k6-ch-15',
			num: '15',
			title: 'Production Traffic Simulation',
			level: 'Final Challenge',
			levelColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
			objective: 'Menggabungkan semua teknik (Scaling, Caching, Queue, Limiter) dalam simulasi arsitektur produksi utuh.',
			architecture: `                   ┌── API #1
                   ├── API #2
Internet ──► LB ───┼── API #3
                   └── API #4
                         │
                ┌────────┴────────┐
                ▼                 ▼
             Redis           PostgreSQL
                                  │
                                  ▼
                                Queue ──► Worker`,
			scenario: `Jalankan 5 skenario berurutan pada E-Commerce API lengkap:
1. Normal Traffic: 100 VUs
2. Peak Traffic: 1,000 VUs
3. Flash Sale: 2,000 VUs Spike
4. Login Storm: 2,000 Concurrent Logins
5. Registration Storm: 2,000 Concurrent Registrations`,
			deliverable: `Final Performance Report:
• System: CPU, RAM, Instances, DB, Redis, Worker
• Metrics: Avg RPS, Peak RPS, p50, p95, p99, Error Rate
• Bottleneck Analysis: Primary vs Secondary
• Before vs After Optimization Table`,
			questions: [
				'What happened ketika load dinaikkan?',
				'Why behavior tersebut terjadi?',
				'Where bottleneck utama berada?',
				'How solusi diimplementasikan?',
				'Trade-off apa yang harus diterima?'
			]
		}
	];

	// Interactive States
	let selectedLevel = $state('All');
	let searchQuery = $state('');
	let completedChallenges = $state<string[]>([]);
	let activeChallengeId = $state<string>(k6Challenges[0].id);
	let copiedCode = $state(false);

	// Load completion state from localStorage
	$effect(() => {
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('portal_k6_completed');
			if (saved) {
				try {
					completedChallenges = JSON.parse(saved);
				} catch {
					completedChallenges = [];
				}
			}
		}
	});

	function toggleCompleted(id: string) {
		if (completedChallenges.includes(id)) {
			completedChallenges = completedChallenges.filter((item) => item !== id);
		} else {
			completedChallenges = [...completedChallenges, id];
		}
		if (typeof window !== 'undefined') {
			localStorage.setItem('portal_k6_completed', JSON.stringify(completedChallenges));
		}
	}

	let filteredChallenges = $derived(
		k6Challenges.filter((c) => {
			const matchLevel = selectedLevel === 'All' || c.level === selectedLevel;
			const matchQuery =
				searchQuery === '' ||
				c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				c.objective.toLowerCase().includes(searchQuery.toLowerCase()) ||
				c.num.includes(searchQuery);
			return matchLevel && matchQuery;
		})
	);

	let activeChallenge = $derived(
		k6Challenges.find((c) => c.id === activeChallengeId) || k6Challenges[0]
	);

	let activeK6Code = $derived(
		activeChallenge.getK6Code ? activeChallenge.getK6Code(currentBaseUrl) : null
	);

	let progressPercent = $derived(
		Math.round((completedChallenges.length / k6Challenges.length) * 100)
	);

	function copySnippet(code: string) {
		if (typeof navigator !== 'undefined' && navigator.clipboard) {
			navigator.clipboard.writeText(code);
			copiedCode = true;
			setTimeout(() => (copiedCode = false), 2000);
		}
	}
</script>

<svelte:head>
	<title>k6 Performance Testing Challenges - Portal Sistem</title>
</svelte:head>

<main class="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
	
	<!-- Top Hero Banner -->
	<div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50/40 to-white border border-emerald-100/80 p-8 sm:p-10 mb-8 shadow-sm">
		<div class="absolute -right-10 -bottom-10 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none"></div>
		
		<div class="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
			<div class="max-w-3xl">
				<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-3">
					<span class="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
					Performance Engineering Learning Path
				</div>
				<h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
					🚀 k6 Performance Testing Challenges
				</h1>
				<p class="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
					<strong>Goal:</strong> Learn performance testing by actually breaking, measuring, and improving an API. Jalur belajar komprehensif dari <em>API Baseline ➔ Concurrency ➔ DB Bottleneck ➔ Scaling ➔ Caching ➔ Async Queue ➔ Production Simulation</em>.
				</p>

				<!-- Target Base URL Selector (No Backend Required) -->
				<div class="bg-white/90 border border-emerald-200/90 rounded-2xl p-3.5 shadow-xs max-w-2xl">
					<div class="flex items-center justify-between gap-2 mb-2">
						<span class="text-xs font-bold text-slate-800">🎯 Target API Host untuk Uji Coba k6:</span>
						<span class="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
							Active: {currentBaseUrl}
						</span>
					</div>

					<div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
						<button
							type="button"
							onclick={() => (selectedTargetType = 'sandbox')}
							class="p-2 rounded-xl text-left border transition cursor-pointer {selectedTargetType === 'sandbox' ? 'bg-emerald-50 border-emerald-500 font-bold text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}"
						>
							<div class="flex items-center gap-1.5">
								<span class="w-2 h-2 rounded-full {selectedTargetType === 'sandbox' ? 'bg-emerald-500' : 'bg-slate-400'}"></span>
								<span>Built-in Mock API</span>
							</div>
							<p class="text-[10px] text-slate-500 font-normal mt-0.5">Langsung jalan tanpa backend luar</p>
						</button>

						<button
							type="button"
							onclick={() => (selectedTargetType = 'k6test')}
							class="p-2 rounded-xl text-left border transition cursor-pointer {selectedTargetType === 'k6test' ? 'bg-emerald-50 border-emerald-500 font-bold text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}"
						>
							<div class="flex items-center gap-1.5">
								<span class="w-2 h-2 rounded-full {selectedTargetType === 'k6test' ? 'bg-emerald-500' : 'bg-slate-400'}"></span>
								<span>Public k6 Server</span>
							</div>
							<p class="text-[10px] text-slate-500 font-normal mt-0.5">https://test.k6.io (Grafana)</p>
						</button>

						<button
							type="button"
							onclick={() => (selectedTargetType = 'custom')}
							class="p-2 rounded-xl text-left border transition cursor-pointer {selectedTargetType === 'custom' ? 'bg-emerald-50 border-emerald-500 font-bold text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}"
						>
							<div class="flex items-center gap-1.5">
								<span class="w-2 h-2 rounded-full {selectedTargetType === 'custom' ? 'bg-emerald-500' : 'bg-slate-400'}"></span>
								<span>Custom API Host</span>
							</div>
							<p class="text-[10px] text-slate-500 font-normal mt-0.5">Input URL backend sendiri</p>
						</button>
					</div>

					{#if selectedTargetType === 'custom'}
						<div class="mt-2.5">
							<input
								type="text"
								bind:value={customUrl}
								placeholder="https://api.yourdomain.com atau http://localhost:8082"
								class="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono text-slate-800 focus:outline-none focus:border-emerald-500"
							/>
						</div>
					{/if}
				</div>
			</div>

			<!-- Progress Tracker Card -->
			<div class="bg-white/95 border border-slate-200/90 rounded-2xl p-5 shadow-xs shrink-0 w-full lg:w-72">
				<div class="flex items-center justify-between mb-2">
					<span class="text-xs font-bold text-slate-700 uppercase tracking-wider">Progress Path</span>
					<span class="text-xs font-black text-emerald-600">{progressPercent}% Selesai</span>
				</div>
				<!-- Progress Bar -->
				<div class="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mb-3 border border-slate-200">
					<div
						class="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300 rounded-full"
						style="width: {progressPercent}%"
					></div>
				</div>
				<div class="flex items-center justify-between text-xs text-slate-500">
					<span>{completedChallenges.length} dari {k6Challenges.length} Challenge</span>
					<span class="font-bold text-slate-700">15 Modul</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Filter & Search Toolbar -->
	<div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs">
		<!-- Level Filter Dropdown -->
		<div class="flex items-center gap-3">
			<span class="text-xs font-bold text-slate-700 uppercase tracking-wider shrink-0 flex items-center gap-1.5">
				<svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
				</svg>
				Filter Level:
			</span>
			<div class="relative w-full sm:w-64">
				<select
					bind:value={selectedLevel}
					class="w-full pl-3 pr-8 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold rounded-xl text-slate-800 focus:outline-none focus:border-emerald-500 cursor-pointer appearance-none transition"
				>
					{#each levels as lvl}
						<option value={lvl}>{lvl}</option>
					{/each}
				</select>
				<div class="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-slate-400">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
					</svg>
				</div>
			</div>
		</div>

		<!-- Search Input -->
		<div class="relative w-full sm:w-72">
			<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
				</svg>
			</div>
			<input
				type="text"
				bind:value={searchQuery}
				placeholder="Cari challenge atau skenario..."
				class="w-full pl-9 pr-3 py-2 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 text-xs text-slate-900 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 placeholder-slate-400 transition"
			/>
		</div>
	</div>

	<!-- Main Challenges Workspace Split Grid -->
	<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
		
		<!-- Left: Challenge List (5 cols) -->
		<div class="lg:col-span-5 space-y-3">
			<div class="flex items-center justify-between px-1">
				<h2 class="text-xs font-bold uppercase tracking-wider text-slate-400">
					Daftar Challenge ({filteredChallenges.length})
				</h2>
				<span class="text-[11px] text-slate-400">Pilih modul untuk melihat detail</span>
			</div>

			{#if filteredChallenges.length === 0}
				<div class="bg-white border border-slate-200/80 rounded-2xl p-8 text-center text-slate-500">
					<p class="text-sm font-medium">Tidak ada challenge yang cocok.</p>
				</div>
			{:else}
				{#each filteredChallenges as ch}
					{@const isCompleted = completedChallenges.includes(ch.id)}
					{@const isActive = activeChallengeId === ch.id}
					<button
						type="button"
						onclick={() => (activeChallengeId = ch.id)}
						class="w-full text-left p-4 rounded-2xl border transition duration-150 cursor-pointer flex flex-col justify-between {isActive ? 'bg-white border-emerald-500 shadow-md ring-2 ring-emerald-500/10' : 'bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-xs'}"
					>
						<div class="flex items-start justify-between gap-2 mb-2">
							<div class="flex items-center gap-2">
								<span class="w-6 h-6 rounded-lg bg-slate-900 text-white font-mono text-xs font-bold flex items-center justify-center">
									{ch.num}
								</span>
								<span class="px-2 py-0.5 text-[10px] font-bold rounded-md border {ch.levelColor}">
									{ch.level}
								</span>
							</div>

							{#if isCompleted}
								<span class="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
									<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
									</svg>
									Selesai
								</span>
							{/if}
						</div>

						<h3 class="text-sm font-bold text-slate-900 mb-1 leading-snug">
							{ch.title}
						</h3>
						<p class="text-xs text-slate-500 line-clamp-2 leading-relaxed">
							{ch.objective}
						</p>
					</button>
				{/each}
			{/if}
		</div>

		<!-- Right: Active Challenge Detail & Instructions (7 cols) -->
		<div class="lg:col-span-7">
			<div class="bg-white border border-slate-200/90 rounded-3xl shadow-sm overflow-hidden sticky top-24">
				
				<!-- Detail Header -->
				<div class="p-6 border-b border-slate-100 bg-slate-50/50">
					<div class="flex flex-wrap items-center justify-between gap-3 mb-3">
						<div class="flex items-center gap-2">
							<span class="px-2.5 py-1 text-xs font-mono font-black rounded-lg bg-slate-900 text-white">
								CHALLENGE {activeChallenge.num}
							</span>
							<span class="px-2.5 py-1 text-xs font-bold rounded-lg border {activeChallenge.levelColor}">
								{activeChallenge.level}
							</span>
						</div>

						<!-- Mark Completed Toggle Button -->
						<button
							type="button"
							onclick={() => toggleCompleted(activeChallenge.id)}
							class="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl transition cursor-pointer {completedChallenges.includes(activeChallenge.id) ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs' : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'}"
						>
							{#if completedChallenges.includes(activeChallenge.id)}
								<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
								</svg>
								<span>Terselesaikan</span>
							{:else}
								<svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								<span>Tandai Selesai</span>
							{/if}
						</button>
					</div>

					<h2 class="text-2xl font-black text-slate-900 tracking-tight">
						{activeChallenge.title}
					</h2>
				</div>

				<!-- Detail Content Body -->
				<div class="p-6 space-y-6 max-h-[600px] overflow-y-auto">
					
					<!-- 1. Objective -->
					<div>
						<h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">🎯 Objective</h4>
						<p class="text-sm font-semibold text-slate-800 bg-emerald-50/60 border border-emerald-100 rounded-xl p-3.5">
							{activeChallenge.objective}
						</p>
					</div>

					<!-- 2. Scenario -->
					<div>
						<h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">📋 Scenario & Setup</h4>
						<pre class="text-xs text-slate-700 whitespace-pre-line bg-slate-50 border border-slate-200/80 rounded-2xl p-4 font-sans leading-relaxed">{activeChallenge.scenario}</pre>
					</div>

					<!-- Architecture diagram if available -->
					{#if activeChallenge.architecture}
						<div>
							<h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">🏗️ Architecture Overview</h4>
							<pre class="p-4 bg-slate-900 text-emerald-400 rounded-2xl text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">{activeChallenge.architecture}</pre>
						</div>
					{/if}

					<!-- Sample k6 Script if available -->
					{#if activeK6Code}
						<div>
							<div class="flex items-center justify-between mb-2">
								<h4 class="text-xs font-bold uppercase tracking-wider text-slate-400">⚡ k6 Test Script Boilerplate</h4>
								<button
									type="button"
									onclick={() => copySnippet(activeK6Code!)}
									class="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition cursor-pointer"
								>
									{copiedCode ? '✓ Tersalin' : '📋 Salin Script k6'}
								</button>
							</div>
							<div class="text-[11px] text-slate-500 font-mono mb-1.5 flex items-center gap-1">
								<span>Target URL:</span>
								<code class="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">{currentBaseUrl}</code>
							</div>
							<pre class="p-4 bg-slate-900 text-slate-100 rounded-2xl text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">{activeK6Code}</pre>
						</div>
					{/if}

					<!-- 3. Metrics to Observe -->
					{#if activeChallenge.metrics}
						<div>
							<h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">📊 k6 Metrics to Observe</h4>
							<div class="flex flex-wrap gap-2">
								{#each activeChallenge.metrics as m}
									<span class="px-2.5 py-1 text-xs font-mono bg-slate-100 text-slate-800 border border-slate-200 rounded-lg">
										{m}
									</span>
								{/each}
							</div>
						</div>
					{/if}

					<!-- 4. Analytical Questions -->
					<div>
						<h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">❓ Critical Questions to Answer</h4>
						<ul class="space-y-2">
							{#each activeChallenge.questions as q}
								<li class="flex items-start gap-2 text-xs sm:text-sm text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
									<span class="w-4 h-4 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
										?
									</span>
									<span>{q}</span>
								</li>
							{/each}
						</ul>
					</div>

					<!-- 5. Deliverables / Bonus -->
					{#if activeChallenge.deliverable}
						<div>
							<h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">📦 Expected Deliverable</h4>
							<pre class="text-xs text-slate-800 whitespace-pre-line bg-amber-50/60 border border-amber-200/70 rounded-2xl p-3.5 font-mono">{activeChallenge.deliverable}</pre>
						</div>
					{/if}

					{#if activeChallenge.bonus}
						<div class="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200/80 text-xs text-indigo-900">
							<span class="font-bold">🌟 Bonus Challenge:</span> {activeChallenge.bonus}
						</div>
					{/if}

				</div>
			</div>
		</div>

	</div>

	<!-- Reflection & Definition of Done Section -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
		<!-- 5 Core Reflection Framework -->
		<div class="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs">
			<div class="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
				</svg>
			</div>
			<h3 class="text-lg font-bold text-slate-900 mb-2">🧠 5 Pertanyaan Refleksi Setiap Challenge</h3>
			<p class="text-xs text-slate-500 mb-4 leading-relaxed">Setelah setiap pengujian selesai, pastikan Anda bisa menjawab kelima pertanyaan berikut:</p>
			
			<div class="space-y-2.5 text-xs text-slate-700">
				<div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
					<strong class="text-slate-900">1. What happened?</strong> Apa yang terjadi ketika load dinaikkan?
				</div>
				<div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
					<strong class="text-slate-900">2. Why?</strong> Kenapa behavior tersebut terjadi di sistem?
				</div>
				<div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
					<strong class="text-slate-900">3. Where?</strong> Di mana bottleneck berada? (App, DB, Network, CPU, Memory, Pool?)
				</div>
				<div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
					<strong class="text-slate-900">4. How?</strong> Solusi apa yang Anda implementasikan?
				</div>
				<div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
					<strong class="text-slate-900">5. Trade-off?</strong> Apa konsekuensi/biaya dari solusi tersebut?
				</div>
			</div>
		</div>

		<!-- Definition of Done -->
		<div class="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 shadow-xl flex flex-col justify-between">
			<div>
				<div class="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mb-4">
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
					</svg>
				</div>
				<h3 class="text-lg font-bold text-white mb-2">🏁 Definition of Done</h3>
				<blockquote class="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs text-slate-200 leading-relaxed italic mb-4">
					"Challenge dianggap selesai bukan cuma saat kamu bisa menjalankan k6, tetapi saat kamu bisa menjelaskan: <strong>System gue bottleneck di mana, kenapa bottleneck itu terjadi, bagaimana cara membuktikannya dengan metrics, dan apa trade-off dari solusi yang gue pilih.</strong>"
				</blockquote>
				<p class="text-xs text-emerald-400 font-semibold">
					💡 Don't optimize blindly. Measure ➔ Understand ➔ Change ➔ Measure again.
				</p>
			</div>

			<div class="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
				<span>Progress Anda: {completedChallenges.length} / 15 Selesai</span>
				<span class="text-emerald-400 font-bold">{progressPercent}%</span>
			</div>
		</div>
	</div>

</main>
