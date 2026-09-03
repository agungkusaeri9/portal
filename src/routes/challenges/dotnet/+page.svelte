<script lang="ts">
	interface DotnetChallenge {
		id: string;
		num: string;
		title: string;
		level: string;
		levelColor: string;
		objective: string;
		scenario?: string;
		tasks?: string[];
		codeSnippet?: string;
		architecture?: string;
		questions?: string[];
		deliverable?: string;
		successCriteria?: string;
		important?: string;
		bonus?: string;
	}

	const levels = [
		'All',
		'Level 1 — Architecture & Code Quality',
		'Level 2 — ASP.NET Core Internals',
		'Level 3 — EF Core & Database Engineering',
		'Level 4 — Concurrency & Performance',
		'Level 5 — Security',
		'Level 6 — Distributed Systems',
		'Level 7 — Observability',
		'Level 8 — Docker & Kubernetes',
		'Level 9 — Reliability & Production Engineering',
		'Level 10 — Final Production Simulation'
	];

	const dotnetChallenges: DotnetChallenge[] = [
		// LEVEL 1 — ARCHITECTURE & CODE QUALITY
		{
			id: 'net-01',
			num: '01',
			title: 'Refactor a Messy API Controller',
			level: 'Level 1 — Architecture & Code Quality',
			levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
			objective: 'Refactor controller gemuk yang mencampur aduk business logic, database access, dan duplikasi kode tanpa mengubah external API contract.',
			tasks: [
				'Pisahkan business logic dari controller ke domain/application service',
				'Terapkan Dependency Inversion (Interface-driven)',
				'Pastikan unit & integration tests tetap pass 100%'
			],
			questions: [
				'Apa saja batasan responsibility yang seharusnya ada di Controller?',
				'Bagaimana memisahkan business logic murni dari infrastructure logic (EF Core/HTTP)?'
			],
			successCriteria: 'Controller tipis (<30 baris per action), logic terisolasi, contracts tidak berubah.'
		},
		{
			id: 'net-02',
			num: '02',
			title: 'Clean Architecture Implementation',
			level: 'Level 1 — Architecture & Code Quality',
			levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
			objective: 'Membangun Order API dengan strict dependency rule (Domain tidak boleh depend ke framework apa pun).',
			architecture: `API Layer ──► Application Layer ──► Domain Layer (Core Entities & Invariants)
     ▲                     ▲
     └────── Infrastructure (EF Core / External Services)`,
			tasks: [
				'Buat project struktur: Domain, Application, Infrastructure, WebApi',
				'Implement Domain Entities (Order, Customer, Product)',
				'Implement Use Cases (CreateOrder, CancelOrder, GetOrder)',
				'Buktikan Domain layer 0 dependency ke EF Core atau ASP.NET Core'
			]
		},
		{
			id: 'net-03',
			num: '03',
			title: 'Vertical Slice Architecture vs Clean Architecture',
			level: 'Level 1 — Architecture & Code Quality',
			levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
			objective: 'Membandingkan kohesi fitur per-fitur (Features/Orders/CreateOrder) vs horizontal layering.',
			architecture: `Features/
└── Orders/
    ├── CreateOrder/ (Endpoint, Command, Handler, Validator, DTO)
    ├── CancelOrder/
    └── GetOrder/`,
			questions: [
				'Kapan Horizontal Clean Architecture menjadi over-engineering?',
				'Mengapa Vertical Slice meminimalkan coupling antar fitur?'
			]
		},
		{
			id: 'net-04',
			num: '04',
			title: 'CQRS (Command Query Responsibility Segregation)',
			level: 'Level 1 — Architecture & Code Quality',
			levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
			objective: 'Memisahkan model penulisan (Command) dari model pembacaan data (Query) dengan MediatR / Wolverine.',
			tasks: [
				'Implement CreateOrderCommand & CancelOrderCommand (Write Model)',
				'Implement GetOrderQuery & ListOrdersQuery dengan projection DTO langsung (Read Model)',
				'Optimasi query agar tidak me-load full aggregate entity'
			]
		},
		{
			id: 'net-05',
			num: '05',
			title: 'Domain Modeling & State Invariants',
			level: 'Level 1 — Architecture & Code Quality',
			levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
			objective: 'Menjaga state transition order lifecycle (Pending ➔ Paid ➔ Processing ➔ Shipped ➔ Completed) di dalam Domain Entity.',
			codeSnippet: `public class Order
{
    public OrderStatus Status { get; private set; } = OrderStatus.Pending;

    public void MarkAsPaid()
    {
        if (Status != OrderStatus.Pending)
            throw new InvalidOperationException("Hanya order pending yang dapat dibayar.");
        Status = OrderStatus.Paid;
    }
}`,
			questions: [
				'Kenapa state transition tidak boleh sepenuhnya dikontrol oleh controller/DTO?',
				'Bagaimana mencegah object masuk ke state invalid?'
			]
		},
		{
			id: 'net-06',
			num: '06',
			title: 'Dependency Injection Lifetimes (Captive Dependency)',
			level: 'Level 1 — Architecture & Code Quality',
			levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
			objective: 'Memahami lifecycle Singleton vs Scoped vs Transient dan mendeteksi bug Captive Dependency.',
			questions: [
				'Apa bahaya Singleton service yang menginjeksi Scoped DbContext (Captive Dependency)?',
				'Bagaimana IServiceProvider.CreateScope() menyelesaikan concurrency di background worker?'
			]
		},

		// LEVEL 2 — ASP.NET CORE INTERNALS
		{
			id: 'net-07',
			num: '07',
			title: 'Middleware Pipeline & Short-Circuiting',
			level: 'Level 2 — ASP.NET Core Internals',
			levelColor: 'bg-amber-50 text-amber-700 border-amber-200',
			objective: 'Membangun urutan middleware: Logging ➔ Correlation ID ➔ Auth ➔ Endpoint dan memahami execution order.',
			architecture: `Request ──► CorrelationIdMiddleware ──► RequestTimingMiddleware ──► Auth ──► Endpoint
Response ◄──────────────────────────────────────────────────────────────────────────┘`
		},
		{
			id: 'net-08',
			num: '08',
			title: 'Global Exception Handling & RFC 7807 ProblemDetails',
			level: 'Level 2 — ASP.NET Core Internals',
			levelColor: 'bg-amber-50 text-amber-700 border-amber-200',
			objective: 'Menyediakan centralized error handling yang konsisten menggunakan IExceptionHandler (.NET 8).',
			codeSnippet: `app.UseExceptionHandler();
// Menghasilkan format RFC 7807:
// { "type": "https://errors.portal.com/404", "title": "Not Found", "status": 404, "traceId": "00-4bf92f..." }`
		},
		{
			id: 'net-09',
			num: '09',
			title: 'CancellationToken Propagation in Async Pipelines',
			level: 'Level 2 — ASP.NET Core Internals',
			levelColor: 'bg-amber-50 text-amber-700 border-amber-200',
			objective: 'Menghentikan downstream DB queries dan HTTP calls saat client memutuskan koneksi / browser reload.',
			codeSnippet: `[HttpGet("orders")]
public async Task<IActionResult> GetOrders(CancellationToken ct)
{
    var orders = await _dbContext.Orders.ToListAsync(ct);
    return Ok(orders);
}`
		},
		{
			id: 'net-10',
			num: '10',
			title: 'HTTP Resilience with Polly (Retry, Circuit Breaker, Timeout)',
			level: 'Level 2 — ASP.NET Core Internals',
			levelColor: 'bg-amber-50 text-amber-700 border-amber-200',
			objective: 'Mencegah cascading failures saat berinteraksi dengan external payment gateway yang tidak stabil.',
			questions: [
				'Mengapa retry pada request POST (Non-Idempotent) sangat berbahaya tanpa Idempotency Key?',
				'Kapan Circuit Breaker harus beralih ke state Open?'
			]
		},

		// LEVEL 3 — EF CORE & DATABASE
		{
			id: 'net-11',
			num: '11',
			title: 'Detecting & Fixing N+1 Query Problem',
			level: 'Level 3 — EF Core & Database Engineering',
			levelColor: 'bg-orange-50 text-orange-700 border-orange-200',
			objective: 'Mengeliminasi ledakan N query child dengan Eager Loading (.Include()) atau Projection Select.',
			codeSnippet: `-- ❌ N+1 Problem (1 query orders + 100 queries customer + 100 queries items)
-- ✅ Eager Loading Solution:
var orders = await _dbContext.Orders
    .Include(o => o.Customer)
    .Include(o => o.OrderItems)
    .ToListAsync();`
		},
		{
			id: 'net-12',
			num: '12',
			title: 'EF Core AsNoTracking() Memory & Speed Benchmark',
			level: 'Level 3 — EF Core & Database Engineering',
			levelColor: 'bg-orange-50 text-orange-700 border-orange-200',
			objective: 'Membuktikan penghematan alokasi memori Change Tracker pada read-only endpoint besar.',
			codeSnippet: `var orders = await _dbContext.Orders.AsNoTracking().ToListAsync();`
		},
		{
			id: 'net-13',
			num: '13',
			title: 'DTO Projection Optimization (.Select())',
			level: 'Level 3 — EF Core & Database Engineering',
			levelColor: 'bg-orange-50 text-orange-700 border-orange-200',
			objective: 'Menginstruksikan SQL query hanya mengambil kolom yang dibutuhkan di response, bukan SELECT *.'
		},
		{
			id: 'net-14',
			num: '14',
			title: 'AsSplitQuery() vs Single Query Cartesian Explosion',
			level: 'Level 3 — EF Core & Database Engineering',
			levelColor: 'bg-orange-50 text-orange-700 border-orange-200',
			objective: 'Mencegah Cartesian Product duplikasi data pada relasi 1-to-many ganda menggunakan .AsSplitQuery().'
		},
		{
			id: 'net-15',
			num: '15',
			title: 'Atomic Database Transactions in EF Core',
			level: 'Level 3 — EF Core & Database Engineering',
			levelColor: 'bg-orange-50 text-orange-700 border-orange-200',
			objective: 'Membungkus multi-table SaveChanges dalam BeginTransactionAsync() dan rollback saat failure injection.'
		},
		{
			id: 'net-16',
			num: '16',
			title: 'Optimistic Concurrency with RowVersion / IsConcurrencyToken',
			level: 'Level 3 — EF Core & Database Engineering',
			levelColor: 'bg-orange-50 text-orange-700 border-orange-200',
			objective: 'Mendeteksi lost update saat 2 admin mengedit produk bersamaan dan melempar DbUpdateConcurrencyException.'
		},
		{
			id: 'net-17',
			num: '17',
			title: 'Connection Pool Starvation & Leak Investigation',
			level: 'Level 3 — EF Core & Database Engineering',
			levelColor: 'bg-orange-50 text-orange-700 border-orange-200',
			objective: 'Mendiagnosis timeout "Timeout waiting for database connection" akibat unclosed connections.'
		},

		// LEVEL 4 — CONCURRENCY & PERFORMANCE
		{
			id: 'net-18',
			num: '18',
			title: 'Async/Await vs Thread.Sleep() Blocking',
			level: 'Level 4 — Concurrency & Performance',
			levelColor: 'bg-rose-50 text-rose-700 border-rose-200',
			objective: 'Membuktikan bagaimana thread blocking menghancurkan kapasitas throughput server di bawah beban k6.',
			questions: [
				'Mengapa Task.Delay() melepaskan thread kembali ke ThreadPool sedangkan Thread.Sleep() menahannya mati?'
			]
		},
		{
			id: 'net-19',
			num: '19',
			title: 'ThreadPool Starvation Diagnosis',
			level: 'Level 4 — Concurrency & Performance',
			levelColor: 'bg-rose-50 text-rose-700 border-rose-200',
			objective: 'Mendiagnosis antrian ThreadPool queue saat CPU hanya 20% namun respon API timeout detik ke detik.'
		},
		{
			id: 'net-20',
			num: '20',
			title: 'Memory Allocation & GC Gen 0/1/2 Pressure',
			level: 'Level 4 — Concurrency & Performance',
			levelColor: 'bg-rose-50 text-rose-700 border-rose-200',
			objective: 'Mengurangi alokasi heap dan GC Pause menggunakan Span<T>, Memory<T>, dan ArrayPool<T>.'
		},
		{
			id: 'net-21',
			num: '21',
			title: 'Large Payload Streaming with IAsyncEnumerable<T>',
			level: 'Level 4 — Concurrency & Performance',
			levelColor: 'bg-rose-50 text-rose-700 border-rose-200',
			objective: 'Menyajikan streaming data ratusan ribu record langsung ke client tanpa buffer memori raksasa di RAM.'
		},
		{
			id: 'net-22',
			num: '22',
			title: 'In-Memory Caching (IMemoryCache) & Eviction',
			level: 'Level 4 — Concurrency & Performance',
			levelColor: 'bg-rose-50 text-rose-700 border-rose-200',
			objective: 'Mengimplementasikan sliding expiration dan memory size limits pada katalog produk lokal.'
		},
		{
			id: 'net-23',
			num: '23',
			title: 'Distributed Caching with Redis (IDistributedCache)',
			level: 'Level 4 — Concurrency & Performance',
			levelColor: 'bg-rose-50 text-rose-700 border-rose-200',
			objective: 'Membangun cache terdistribusi lintas multi-instance API pods di Kubernetes.'
		},
		{
			id: 'net-24',
			num: '24',
			title: 'Rate Limiting Middleware (.NET 8 Built-in)',
			level: 'Level 4 — Concurrency & Performance',
			levelColor: 'bg-rose-50 text-rose-700 border-rose-200',
			objective: 'Menerapkan Sliding Window / Token Bucket limiter untuk melindungi public API dari traffic abuse.'
		},
		{
			id: 'net-25',
			num: '25',
			title: 'k6 Performance Benchmark & SLO Validation',
			level: 'Level 4 — Concurrency & Performance',
			levelColor: 'bg-rose-50 text-rose-700 border-rose-200',
			objective: 'Menjalankan load test 2,000 concurrent users dan mengumpulkan bukti empiris p95 < 200ms.'
		},

		// LEVEL 5 — SECURITY
		{
			id: 'net-26',
			num: '26',
			title: 'JWT Authentication & Claims Validation',
			level: 'Level 5 — Security',
			levelColor: 'bg-purple-50 text-purple-700 border-purple-200',
			objective: 'Mengkonfigurasi JWT Bearer token authentication dengan asymmetric signing key & token lifetime.'
		},
		{
			id: 'net-27',
			num: '27',
			title: 'Refresh Token Rotation & Reuse Detection',
			level: 'Level 5 — Security',
			levelColor: 'bg-purple-50 text-purple-700 border-purple-200',
			objective: 'Mendeteksi pencurian token dan otomatis me-revoke seluruh sesi saat token reuse terdeteksi.'
		},
		{
			id: 'net-28',
			num: '28',
			title: 'Policy-Based & Permission-Based Authorization',
			level: 'Level 5 — Security',
			levelColor: 'bg-purple-50 text-purple-700 border-purple-200',
			objective: 'Membangun otorisasi granular (orders.read, orders.cancel) menggunakan custom AuthorizationHandler.'
		},
		{
			id: 'net-29',
			num: '29',
			title: 'API Security Audit (OWASP Top 10 for API)',
			level: 'Level 5 — Security',
			levelColor: 'bg-purple-50 text-purple-700 border-purple-200',
			objective: 'Mengaudit celah BOLA (Broken Object Level Auth), Mass Assignment, dan Insecure Direct Object References.'
		},
		{
			id: 'net-30',
			num: '30',
			title: 'Threat Modeling with STRIDE Framework',
			level: 'Level 5 — Security',
			levelColor: 'bg-purple-50 text-purple-700 border-purple-200',
			objective: 'Menganalisis potensi Spoofing, Tampering, Repudiation, Info Disclosure, DoS, dan Elevation of Privilege.'
		},

		// LEVEL 6 — DISTRIBUTED SYSTEMS
		{
			id: 'net-31',
			num: '31',
			title: 'BackgroundService & Hosted Service Workers',
			level: 'Level 6 — Distributed Systems',
			levelColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
			objective: 'Menjalankan asynchronous queue processing di background thread dengan graceful shutdown cancellation.'
		},
		{
			id: 'net-32',
			num: '32',
			title: 'In-Process Channel (System.Threading.Channels)',
			level: 'Level 6 — Distributed Systems',
			levelColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
			objective: 'Membangun bounded producer-consumer queue berkinerja ultra-tinggi dengan backpressure control.'
		},
		{
			id: 'net-33',
			num: '33',
			title: 'Exponential Backoff Retry & Dead Letter Queue (DLQ)',
			level: 'Level 6 — Distributed Systems',
			levelColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
			objective: 'Memindahkan pesan gagal berulang kali ke DLQ untuk mencegah poison message loop.'
		},
		{
			id: 'net-34',
			num: '34',
			title: 'Idempotent Consumer & Idempotency-Key Header',
			level: 'Level 6 — Distributed Systems',
			levelColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
			objective: 'Menjamin request POST /payments yang dikirim 2x akibat network timeout hanya menghasilkan 1 kali pembayaran.'
		},
		{
			id: 'net-35',
			num: '35',
			title: 'Transactional Outbox Pattern',
			level: 'Level 6 — Distributed Systems',
			levelColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
			objective: 'Menyimpan data bisnis dan event antrian dalam 1 transaksi DB lokal sebelum dipush ke Message Broker.'
		},
		{
			id: 'net-36',
			num: '36',
			title: 'Event-Driven Architecture (RabbitMQ / MassTransit)',
			level: 'Level 6 — Distributed Systems',
			levelColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
			objective: 'Memisahkan servis pemesanan (OrderCreated) dengan notifikasi email dan audit log secara asynchronous.'
		},
		{
			id: 'net-37',
			num: '37',
			title: 'Saga Pattern (Orchestration with MassTransit)',
			level: 'Level 6 — Distributed Systems',
			levelColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
			objective: 'Mengeksekusi transaksi terdistribusi multi-layanan (Reserve Inventory ➔ Charge ➔ Ship) dengan compensating actions.'
		},
		{
			id: 'net-38',
			num: '38',
			title: 'Graceful Degradation Under External Dependency Outage',
			level: 'Level 6 — Distributed Systems',
			levelColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
			objective: 'Menjaga API tetap responsif dan melayani read catalog saat servis payment external mengalami pemadaman 30 menit.'
		},

		// LEVEL 7 — OBSERVABILITY
		{
			id: 'net-39',
			num: '39',
			title: 'Structured Logging with Serilog & Masking',
			level: 'Level 7 — Observability',
			levelColor: 'bg-teal-50 text-teal-700 border-teal-200',
			objective: 'Menulis log terstruktur JSON dengan automasking data sensitif (kartu kredit/password).'
		},
		{
			id: 'net-40',
			num: '40',
			title: 'Distributed Correlation ID & W3C TraceContext',
			level: 'Level 7 — Observability',
			levelColor: 'bg-teal-50 text-teal-700 border-teal-200',
			objective: 'Meneruskan traceparent & correlation id melintasi panggilan HTTP antar microservices.'
		},
		{
			id: 'net-41',
			num: '41',
			title: 'Prometheus Metrics & Health Checks',
			level: 'Level 7 — Observability',
			levelColor: 'bg-teal-50 text-teal-700 border-teal-200',
			objective: 'Mengekspos endpoint /metrics dan /health/ready dengan aspnetcore-healthchecks.'
		},
		{
			id: 'net-42',
			num: '42',
			title: 'Distributed Tracing with OpenTelemetry & Jaeger',
			level: 'Level 7 — Observability',
			levelColor: 'bg-teal-50 text-teal-700 border-teal-200',
			objective: 'Melacak visual timeline latensi request dari API ➔ EF Core ➔ Redis ➔ External HTTP call.'
		},
		{
			id: 'net-43',
			num: '43',
			title: 'OpenTelemetry Unified Collector Pipeline',
			level: 'Level 7 — Observability',
			levelColor: 'bg-teal-50 text-teal-700 border-teal-200',
			objective: 'Mengintegrasikan logs, traces, dan metrics ke satu pipeline OpenTelemetry Collector.'
		},
		{
			id: 'net-44',
			num: '44',
			title: 'Production Incident Root Cause Triage',
			level: 'Level 7 — Observability',
			levelColor: 'bg-teal-50 text-teal-700 border-teal-200',
			objective: 'Mendiagnosis lonjakan latensi p95 dari 200ms ke 5s menggunakan bukti log, traces, dan DB metrics.'
		},

		// LEVEL 8 — DOCKER & KUBERNETES
		{
			id: 'net-45',
			num: '45',
			title: 'Production-Grade Multi-Stage Dockerfile (.NET 8)',
			level: 'Level 8 — Docker & Kubernetes',
			levelColor: 'bg-blue-50 text-blue-700 border-blue-200',
			objective: 'Membangun Docker image minimalis berbasis chiseled Ubuntu / Alpine dengan user non-root.'
		},
		{
			id: 'net-46',
			num: '46',
			title: 'Full Local Stack with Docker Compose',
			level: 'Level 8 — Docker & Kubernetes',
			levelColor: 'bg-blue-50 text-blue-700 border-blue-200',
			objective: 'Menjalankan API, PostgreSQL, Redis, RabbitMQ, dan Jaeger hanya dengan satu perintah docker compose up -d.'
		},
		{
			id: 'net-47',
			num: '47',
			title: 'Kubernetes Pod & Service Deployment',
			level: 'Level 8 — Docker & Kubernetes',
			levelColor: 'bg-blue-50 text-blue-700 border-blue-200',
			objective: 'Mendeploy 3 replica Pods .NET API dan menghubungkannya dengan Service ClusterIP.'
		},
		{
			id: 'net-48',
			num: '48',
			title: 'Kubernetes Readiness & Liveness Probes',
			level: 'Level 8 — Docker & Kubernetes',
			levelColor: 'bg-blue-50 text-blue-700 border-blue-200',
			objective: 'Mengkonfigurasi /health/live dan /health/ready agar traffic tidak dikirim sebelum DB terhubung.'
		},
		{
			id: 'net-49',
			num: '49',
			title: 'Manual Scaling & Load Balancing Verification',
			level: 'Level 8 — Docker & Kubernetes',
			levelColor: 'bg-blue-50 text-blue-700 border-blue-200',
			objective: 'Melakukan scaling 3 ➔ 5 ➔ 10 Pods dan memverifikasi distribusi beban request merata.'
		},
		{
			id: 'net-50',
			num: '50',
			title: 'Horizontal Pod Autoscaler (HPA)',
			level: 'Level 8 — Docker & Kubernetes',
			levelColor: 'bg-blue-50 text-blue-700 border-blue-200',
			objective: 'Mengkonfigurasi HPA otomatis berdasarkan utilisasi target CPU 70% di bawah beban k6.'
		},

		// LEVEL 9 — RELIABILITY & PRODUCTION ENGINEERING
		{
			id: 'net-51',
			num: '51',
			title: 'Zero-Downtime Rolling Deployment in Kubernetes',
			level: 'Level 9 — Reliability & Production Engineering',
			levelColor: 'bg-slate-800 text-teal-400 border-slate-700',
			objective: 'Deploy update versi aplikasi baru dengan k6 traffic tanpa menghasilkan 1 error request pun (0% error).'
		},
		{
			id: 'net-52',
			num: '52',
			title: 'Graceful Shutdown & SIGTERM Handling',
			level: 'Level 9 — Reliability & Production Engineering',
			levelColor: 'bg-slate-800 text-teal-400 border-slate-700',
			objective: 'Menyelesaikan active HTTP requests dan flushing buffered logs saat Pod menerima sinyal shutdown.'
		},
		{
			id: 'net-53',
			num: '53',
			title: 'Traffic Spike Bottleneck Analysis (5,000 RPS)',
			level: 'Level 9 — Reliability & Production Engineering',
			levelColor: 'bg-slate-800 text-teal-400 border-slate-700',
			objective: 'Menemukan titik kegagalan sistem saat traffic melonjak dari 200 RPS ke 5,000 RPS.'
		},
		{
			id: 'net-54',
			num: '54',
			title: 'Database Saturation Incident Triage',
			level: 'Level 9 — Reliability & Production Engineering',
			levelColor: 'bg-slate-800 text-teal-400 border-slate-700',
			objective: 'Menginvestigasi DB CPU 95% sedangkan API CPU hanya 35% untuk mendeteksi missing index dan lock contention.'
		},
		{
			id: 'net-55',
			num: '55',
			title: 'Memory Leak Investigation with dotnet-dump & dotnet-gcdump',
			level: 'Level 9 — Reliability & Production Engineering',
			levelColor: 'bg-slate-800 text-teal-400 border-slate-700',
			objective: 'Mendiagnosis objek yang tidak ter-garbage collect akibat static event handler atau captive dependency.'
		},
		{
			id: 'net-56',
			num: '56',
			title: 'External Payment Gateway Outage Recovery',
			level: 'Level 9 — Reliability & Production Engineering',
			levelColor: 'bg-slate-800 text-teal-400 border-slate-700',
			objective: 'Membangun arsitektur degradasi saat payment provider mati selama 30 menit tanpa merusak konsistensi data.'
		},

		// LEVEL 10 — FINAL PRODUCTION SIMULATION
		{
			id: 'net-57',
			num: '57',
			title: 'Production-Grade Distributed E-Commerce Backend',
			level: 'Level 10 — Final Production Simulation',
			levelColor: 'bg-slate-900 text-amber-400 border-slate-700',
			objective: 'Menggabungkan seluruh pilar arsitektur: ASP.NET Core, EF Core, Redis, RabbitMQ, Outbox, OpenTelemetry, dan K8s.',
			architecture: `                    Internet ──► Load Balancer
                                       │
                                       ▼
                              ASP.NET Core API (Pods)
                                       │
                    ┌──────────────────┼──────────────────┐
                    ▼                  ▼                  ▼
                PostgreSQL           Redis           RabbitMQ
                    │                                     │
                    ▼                                     ▼
                Read Model                           Workers`
		},
		{
			id: 'net-58',
			num: '58',
			title: 'Production Load Test Benchmark (10,000 Users / 1,000+ RPS)',
			level: 'Level 10 — Final Production Simulation',
			levelColor: 'bg-slate-900 text-amber-400 border-slate-700',
			objective: 'Mengeksekusi load test realistis campuran (60% Read, 20% Product, 10% Order, 5% Login, 5% Payment).'
		},
		{
			id: 'net-59',
			num: '59',
			title: 'Chaos Engineering & Failure Injection Drill',
			level: 'Level 10 — Final Production Simulation',
			levelColor: 'bg-slate-900 text-amber-400 border-slate-700',
			objective: 'Secara sengaja mematikan Redis, Database, RabbitMQ, dan API Pods untuk mengamati bagaimana sistem pulih.'
		},
		{
			id: 'net-60',
			num: '60',
			title: 'Full Production Incident On-Call Simulation & Postmortem',
			level: 'Level 10 — Final Production Simulation',
			levelColor: 'bg-slate-900 text-amber-400 border-slate-700',
			objective: 'Menangani insiden kritis di hari Jumat jam 14:00 (p95 6s, error 18%, DB 95%) dan menulis Postmortem profesional.',
			deliverable: `Postmortem Document:
1. Incident Summary & Severity
2. Impact (Downtime, affected users)
3. Timeline investigasi
4. Root Cause Analysis (5 Whys)
5. Action Items & Prevention Plan`
		}
	];

	// Interactive States
	let selectedLevel = $state('All');
	let searchQuery = $state('');
	let completedChallenges = $state<string[]>([]);
	let activeChallengeId = $state<string>(dotnetChallenges[0].id);
	let copiedSnippet = $state(false);

	// Load completion state from localStorage
	$effect(() => {
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('portal_dotnet_completed');
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
			localStorage.setItem('portal_dotnet_completed', JSON.stringify(completedChallenges));
		}
	}

	let filteredChallenges = $derived(
		dotnetChallenges.filter((c) => {
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
		dotnetChallenges.find((c) => c.id === activeChallengeId) || dotnetChallenges[0]
	);

	let progressPercent = $derived(
		Math.round((completedChallenges.length / dotnetChallenges.length) * 100)
	);

	function copyText(text: string) {
		if (typeof navigator !== 'undefined' && navigator.clipboard) {
			navigator.clipboard.writeText(text);
			copiedSnippet = true;
			setTimeout(() => (copiedSnippet = false), 2000);
		}
	}
</script>

<svelte:head>
	<title>.NET Mid → Advanced Challenges - Portal Sistem</title>
</svelte:head>

<main class="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
	
	<!-- Top Hero Banner -->
	<div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-50 via-indigo-50/40 to-white border border-purple-100/80 p-8 sm:p-10 mb-8 shadow-sm">
		<div class="absolute -right-10 -bottom-10 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl pointer-events-none"></div>
		
		<div class="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
			<div class="max-w-3xl">
				<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100/80 border border-purple-200 text-purple-800 text-xs font-semibold mb-3">
					<span class="w-2 h-2 rounded-full bg-purple-600 animate-pulse"></span>
					.NET Core & ASP.NET Engineering Mastery
				</div>
				<h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
					🔷 .NET Mid → Advanced Challenges
				</h1>
				<p class="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
					Fokus utama: <strong>Architecture, Performance, Concurrency, Distributed Systems, Observability, Reliability, Security, dan Production Engineering.</strong>
				</p>

				<!-- Learning Highlights -->
				<div class="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-700">
					<span class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">🏛️ Clean & Vertical Slice</span>
					<span class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">⚡ EF Core Query Tuning</span>
					<span class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">🔄 Outbox & Idempotency</span>
					<span class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">📊 OpenTelemetry & Tracing</span>
					<span class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">🐳 Docker & Kubernetes HPA</span>
				</div>
			</div>

			<!-- Progress Tracker Card -->
			<div class="bg-white/95 border border-slate-200/90 rounded-2xl p-5 shadow-xs shrink-0 w-full lg:w-72">
				<div class="flex items-center justify-between mb-2">
					<span class="text-xs font-bold text-slate-700 uppercase tracking-wider">Progress Path</span>
					<span class="text-xs font-black text-purple-600">{progressPercent}% Selesai</span>
				</div>
				<!-- Progress Bar -->
				<div class="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mb-3 border border-slate-200">
					<div
						class="h-full bg-gradient-to-r from-purple-500 to-indigo-600 transition-all duration-300 rounded-full"
						style="width: {progressPercent}%"
					></div>
				</div>
				<div class="flex items-center justify-between text-xs text-slate-500">
					<span>{completedChallenges.length} dari {dotnetChallenges.length} Selesai</span>
					<span class="font-bold text-slate-700">60 Modul</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Filter & Search Toolbar -->
	<div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs">
		<!-- Level Filter Dropdown -->
		<div class="flex items-center gap-3">
			<span class="text-xs font-bold text-slate-700 uppercase tracking-wider shrink-0 flex items-center gap-1.5">
				<svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
				</svg>
				Filter Level:
			</span>
			<div class="relative w-full sm:w-64">
				<select
					bind:value={selectedLevel}
					class="w-full pl-3 pr-8 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold rounded-xl text-slate-800 focus:outline-none focus:border-purple-500 cursor-pointer appearance-none transition"
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
				placeholder="Cari challenge .NET..."
				class="w-full pl-9 pr-3 py-2 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 text-xs text-slate-900 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 placeholder-slate-400 transition"
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
				<span class="text-[11px] text-slate-400">Pilih modul untuk detail</span>
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
						class="w-full text-left p-4 rounded-2xl border transition duration-150 cursor-pointer flex flex-col justify-between {isActive ? 'bg-white border-purple-500 shadow-md ring-2 ring-purple-500/10' : 'bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-xs'}"
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
								<span class="inline-flex items-center gap-1 text-[11px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
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
							class="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl transition cursor-pointer {completedChallenges.includes(activeChallenge.id) ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-xs' : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'}"
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
						<p class="text-sm font-semibold text-slate-800 bg-purple-50/60 border border-purple-100 rounded-xl p-3.5">
							{activeChallenge.objective}
						</p>
					</div>

					<!-- 2. Scenario -->
					{#if activeChallenge.scenario}
						<div>
							<h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">📋 Scenario</h4>
							<pre class="text-xs text-slate-700 whitespace-pre-line bg-slate-50 border border-slate-200/80 rounded-2xl p-4 font-sans leading-relaxed">{activeChallenge.scenario}</pre>
						</div>
					{/if}

					<!-- Architecture diagram if available -->
					{#if activeChallenge.architecture}
						<div>
							<h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">🏗️ Architecture Overview</h4>
							<pre class="p-4 bg-slate-900 text-purple-300 rounded-2xl text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">{activeChallenge.architecture}</pre>
						</div>
					{/if}

					<!-- Tasks list -->
					{#if activeChallenge.tasks}
						<div>
							<h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">✅ Tasks to Complete</h4>
							<ul class="space-y-1.5">
								{#each activeChallenge.tasks as task}
									<li class="flex items-center gap-2 text-xs sm:text-sm text-slate-700 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200/60">
										<span class="w-1.5 h-1.5 rounded-full bg-purple-600 shrink-0"></span>
										<span>{task}</span>
									</li>
								{/each}
							</ul>
						</div>
					{/if}

					<!-- C# Code Snippet -->
					{#if activeChallenge.codeSnippet}
						<div>
							<div class="flex items-center justify-between mb-2">
								<h4 class="text-xs font-bold uppercase tracking-wider text-slate-400">📄 C# / .NET Code Implementation</h4>
								<button
									type="button"
									onclick={() => copyText(activeChallenge.codeSnippet!)}
									class="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition cursor-pointer"
								>
									{copiedSnippet ? '✓ Tersalin' : '📋 Salin Kode'}
								</button>
							</div>
							<pre class="p-4 bg-slate-900 text-slate-100 rounded-2xl text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">{activeChallenge.codeSnippet}</pre>
						</div>
					{/if}

					<!-- Analytical Questions -->
					{#if activeChallenge.questions}
						<div>
							<h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">❓ Critical Questions to Answer</h4>
							<ul class="space-y-2">
								{#each activeChallenge.questions as q}
									<li class="flex items-start gap-2 text-xs sm:text-sm text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
										<span class="w-4 h-4 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
											?
										</span>
										<span>{q}</span>
									</li>
								{/each}
							</ul>
						</div>
					{/if}

					{#if activeChallenge.successCriteria}
						<div class="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-xs text-emerald-900">
							<strong class="font-bold">🎯 Success Criteria:</strong> {activeChallenge.successCriteria}
						</div>
					{/if}

					{#if activeChallenge.deliverable}
						<div>
							<h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">📦 Expected Deliverable</h4>
							<pre class="text-xs text-slate-800 whitespace-pre-line bg-amber-50/60 border border-amber-200/70 rounded-2xl p-3.5 font-mono">{activeChallenge.deliverable}</pre>
						</div>
					{/if}

				</div>
			</div>
		</div>

	</div>

	<!-- Incident Report & Definition of Done -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
		
		<!-- Scorecard Framework -->
		<div class="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs">
			<div class="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center mb-4">
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
				</svg>
			</div>
			<h3 class="text-lg font-bold text-slate-900 mb-2">🧠 Mid ➔ Advanced Definition</h3>
			<p class="text-xs text-slate-500 mb-4 leading-relaxed">Anda melangkah ke level Advanced saat mampu menjawab pertanyaan-pertanyaan ini berdasarkan bukti empiris:</p>
			
			<div class="space-y-2 text-xs font-mono text-slate-800 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 leading-relaxed">
				<p>• <strong>Architecture:</strong> Why did you choose this architecture over another?</p>
				<p>• <strong>Performance:</strong> Why is p95 slow & how to prove the bottleneck?</p>
				<p>• <strong>Concurrency:</strong> What happens when 2 requests modify the same state?</p>
				<p>• <strong>Reliability:</strong> How does the system degrade gracefully when Redis/Payment is down?</p>
				<p>• <strong>Production:</strong> What happens when traffic increases 10x?</p>
			</div>
		</div>

		<!-- Definition of Done -->
		<div class="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 shadow-xl flex flex-col justify-between">
			<div>
				<div class="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center mb-4">
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
					</svg>
				</div>
				<h3 class="text-lg font-bold text-white mb-2">🏁 Definition of Done</h3>
				<blockquote class="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs text-slate-200 leading-relaxed italic mb-4">
					"Target: Bukan menjadi orang yang paling banyak tahu syntax C#/.NET, tetapi engineer yang mampu membawa sistem dari <strong>'works on my machine' ➔ measurable ➔ scalable ➔ observable ➔ resilient ➔ production-ready</strong>."
				</blockquote>
				<p class="text-xs text-purple-400 font-semibold">
					💡 Mindset: Measure ➔ Understand ➔ Change ➔ Measure again.
				</p>
			</div>

			<div class="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
				<span>Progress: {completedChallenges.length} / 60 Selesai</span>
				<span class="text-purple-400 font-bold">{progressPercent}%</span>
			</div>
		</div>

	</div>

</main>
