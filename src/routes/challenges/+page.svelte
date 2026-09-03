<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	type Difficulty = 'Easy' | 'Medium' | 'Hard';
	type Track = 'All' | '.NET Core' | 'NestJS' | 'TypeScript' | 'DevOps & K6';

	interface Challenge {
		id: string;
		title: string;
		track: '.NET Core' | 'NestJS' | 'TypeScript' | 'DevOps & K6';
		difficulty: Difficulty;
		timeEst: string;
		xp: number;
		summary: string;
		problem: string;
		requirements: string[];
		starterCode: string;
		solutionCode: string;
		language: string;
	}

	const challenges: Challenge[] = [
		{
			id: 'ts-concurrency-queue',
			title: 'Async Task Queue dengan Limit Concurrency',
			track: 'TypeScript',
			difficulty: 'Medium',
			timeEst: '25 Menit',
			xp: 150,
			summary: 'Buat task executor async yang membatasi eksekusi maksimal N promise secara paralel.',
			problem: `Ketika mengirimkan ratusan request ke third-party API, sistem rentan terkena 429 Too Many Requests atau kehabisan socket koneksi jika dijalankan sekaligus dengan \`Promise.all()\`.

Tugas Anda adalah membuat class \`AsyncQueue<T>\` yang mampu menerima fungsi async berturut-turut, namun hanya mengeksekusi maksimal \`concurrency\` task dalam satu waktu. Hasil akhir harus mengembalikan array data sesuai urutan input asli.`,
			requirements: [
				'Menerima parameter `concurrency: number` saat inisialisasi class.',
				'Mampu menambahkan task via method `add(fn: () => Promise<T>): Promise<T>`.',
				'Maksimal task yang berjalan bersamaan tidak boleh melebihi nilai concurrency.',
				'Jika terjadi error pada satu task, task lain tetap berjalan dan error di-reject ke caller task terkait.'
			],
			language: 'typescript',
			starterCode: `export class AsyncQueue<T> {
  private concurrency: number;
  private running = 0;
  private queue: Array<() => void> = [];

  constructor(concurrency: number = 2) {
    this.concurrency = concurrency;
  }

  async add(task: () => Promise<T>): Promise<T> {
    // TODO: Implementasikan logika antrian dan kontrol concurrency
    throw new Error('Not implemented');
  }
}`,
			solutionCode: `export class AsyncQueue<T> {
  private concurrency: number;
  private running = 0;
  private queue: Array<() => void> = [];

  constructor(concurrency: number = 2) {
    this.concurrency = concurrency;
  }

  async add(task: () => Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const execute = async () => {
        this.running++;
        try {
          const result = await task();
          resolve(result);
        } catch (err) {
          reject(err);
        } finally {
          this.running--;
          this.next();
        }
      };

      if (this.running < this.concurrency) {
        execute();
      } else {
        this.queue.push(execute);
      }
    });
  }

  private next() {
    if (this.running < this.concurrency && this.queue.length > 0) {
      const nextTask = this.queue.shift();
      if (nextTask) nextTask();
    }
  }
}`
		},
		{
			id: 'dotnet-cache-stampede',
			title: 'Thread-Safe Cache dengan Anti-Stampede Lock',
			track: '.NET Core',
			difficulty: 'Medium',
			timeEst: '30 Menit',
			xp: 200,
			summary: 'Implementasikan in-memory generic cache yang mencegah thundering herd problem menggunakan SemaphoreSlim.',
			problem: `Cache Stampede (Thundering Herd) terjadi saat data cache kedaluwarsa dan ribuan request simultan secara bersamaan melakukan query berat ke database untuk mengisi ulang cache tersebut.

Buat implementasi \`SafeMemoryCache<T>\` di .NET yang mengunci per-key menggunakan \`ConcurrentDictionary\` dan \`SemaphoreSlim\` agar hanya 1 thread yang mengeksekusi factory delegate ke database.`,
			requirements: [
				'Menggunakan `IMemoryCache` dan `ConcurrentDictionary<string, SemaphoreSlim>` untuk granular key locking.',
				'Method `GetOrCreateAsync<T>(string key, Func<Task<T>> factory, TimeSpan ttl)` harus thread-safe.',
				'Thread lain yang meminta key yang sama harus menunggu thread pertama selesai lalu membaca hasil dari cache tanpa memanggil database lagi.'
			],
			language: 'csharp',
			starterCode: `using Microsoft.Extensions.Caching.Memory;
using System.Collections.Concurrent;

public class SafeMemoryCache
{
    private readonly IMemoryCache _memoryCache;
    private readonly ConcurrentDictionary<string, SemaphoreSlim> _locks = new();

    public SafeMemoryCache(IMemoryCache memoryCache)
    {
        _memoryCache = memoryCache;
    }

    public async Task<T> GetOrCreateAsync<T>(string key, Func<Task<T>> factory, TimeSpan ttl)
    {
        // TODO: Implementasikan cache lookup dengan SemaphoreSlim locking per key
        throw new NotImplementedException();
    }
}`,
			solutionCode: `using Microsoft.Extensions.Caching.Memory;
using System.Collections.Concurrent;

public class SafeMemoryCache
{
    private readonly IMemoryCache _memoryCache;
    private readonly ConcurrentDictionary<string, SemaphoreSlim> _locks = new();

    public SafeMemoryCache(IMemoryCache memoryCache)
    {
        _memoryCache = memoryCache;
    }

    public async Task<T> GetOrCreateAsync<T>(string key, Func<Task<T>> factory, TimeSpan ttl)
    {
        if (_memoryCache.TryGetValue(key, out T? cachedValue) && cachedValue != null)
        {
            return cachedValue;
        }

        var keyLock = _locks.GetOrAdd(key, _ => new SemaphoreSlim(1, 1));
        await keyLock.WaitAsync();

        try
        {
            // Double-check locking pattern
            if (_memoryCache.TryGetValue(key, out cachedValue) && cachedValue != null)
            {
                return cachedValue;
            }

            var result = await factory();
            _memoryCache.Set(key, result, ttl);
            return result;
        }
        finally
        {
            keyLock.Release();
        }
    }
}`
		},
		{
			id: 'nestjs-sliding-ratelimit',
			title: 'Custom Sliding-Window Rate Limiter Guard',
			track: 'NestJS',
			difficulty: 'Hard',
			timeEst: '40 Menit',
			xp: 300,
			summary: 'Buat NestJS CanActivate Guard untuk membatasi request per IP menggunakan sliding window log.',
			problem: `Sistem membutuhkan proteksi DDoS dan brute-force pada level endpoint publik. Default limiter berbasis fixed-window rentan terhadap spike di pergantian window.

Implementasikan NestJS Guard \`SlidingWindowThrottlerGuard\` yang melacak timestamp request sebelumnya per IP address dan menolak dengan status HTTP 429 jika melebihi batas limit dalam rentang waktu yang ditentukan.`,
			requirements: [
				'Mengimplementasikan interface `CanActivate` dari `@nestjs/common`.',
				'Membaca IP client dari `ExecutionContext` (`req.ip` atau header `x-forwarded-for`).',
				'Menghapus timestamp request yang sudah kedaluwarsa (di luar window range).',
				'Melempar `HttpException("Too Many Requests", HttpStatus.TOO_MANY_REQUESTS)` jika limit terlampaui.'
			],
			language: 'typescript',
			starterCode: `import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class SlidingWindowGuard implements CanActivate {
  private requestLogs = new Map<string, number[]>();
  private readonly limit = 10; // 10 request
  private readonly windowMs = 60 * 1000; // per 1 menit

  canActivate(context: ExecutionContext): boolean {
    // TODO: Implementasikan sliding window rate limiting
    return true;
  }
}`,
			solutionCode: `import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class SlidingWindowGuard implements CanActivate {
  private requestLogs = new Map<string, number[]>();
  private readonly limit = 10; // 10 request
  private readonly windowMs = 60 * 1000; // per 1 menit

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const clientIp = (req.headers['x-forwarded-for'] as string) || req.ip || 'unknown-ip';
    const now = Date.now();
    const windowStart = now - this.windowMs;

    const timestamps = this.requestLogs.get(clientIp) || [];
    // Filter out timestamps outside current window
    const activeTimestamps = timestamps.filter((t) => t > windowStart);

    if (activeTimestamps.length >= this.limit) {
      throw new HttpException(
        {
          statusCode: HttpStatus.TOO_MANY_REQUESTS,
          message: 'Batas kuota request terlampaui. Silakan coba beberapa saat lagi.',
          retryAfterMs: activeTimestamps[0] + this.windowMs - now
        },
        HttpStatus.TOO_MANY_REQUESTS
      );
    }

    activeTimestamps.push(now);
    this.requestLogs.set(clientIp, activeTimestamps);
    return true;
  }
}`
		},
		{
			id: 'k6-stress-scenario',
			title: 'K6 Stress Test & SLA Threshold Scenario',
			track: 'DevOps & K6',
			difficulty: 'Easy',
			timeEst: '20 Menit',
			xp: 100,
			summary: 'Tulis skenario K6 load test bertahap (ramp-up) dengan verifikasi threshold SLA p95.',
			problem: `Sebelum rilis ke production, endpoint transaksi harus diuji ketahanannya terhadap lonjakan trafik dari 0 hingga 500 Virtual Users (VU) selama 3 menit.

Tulis script K6 yang mengeksekusi request HTTP POST dengan payload JSON, memeriksa response status 200, dan menerapkan SLA:
1. 95% request response time (p95) harus di bawah 250ms.
2. Error rate keseluruhan tidak boleh lebih dari 1%.`,
			requirements: [
				'Menggunakan `options.stages` untuk ramp-up, steady state, dan ramp-down.',
				'Menambahkan custom metric / `check` untuk memastikan status response 200.',
				'Mengonfigurasi `thresholds` untuk `http_req_duration: [\'p(95)<250\']` dan `http_req_failed: [\'rate<0.01\']`.'
			],
			language: 'javascript',
			starterCode: `import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  // TODO: Konfigurasikan stages dan thresholds
};

export default function () {
  // TODO: Implementasikan HTTP request dan verifikasi check()
  sleep(1);
}`,
			solutionCode: `import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 100 },  // Ramp-up ke 100 VUs
    { duration: '1m',  target: 500 },  // Spike ke 500 VUs
    { duration: '1m',  target: 500 },  // Tahan beban 500 VUs
    { duration: '30s', target: 0 }     // Cooldown / Ramp-down
  ],
  thresholds: {
    http_req_duration: ['p(95)<250'], // 95% request harus selesai < 250ms
    http_req_failed: ['rate<0.01']     // Error rate < 1%
  }
};

export default function () {
  const url = 'https://api.portal.local/v1/checkout';
  const payload = JSON.stringify({
    userId: 'usr_agungkusaeri9',
    timestamp: Date.now()
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer test-token-k6'
    }
  };

  const res = http.post(url, payload, params);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'has transaction id': (r) => r.body.includes('trx_')
  });

  sleep(0.5);
}`
		}
	];

	// Interactive States
	let selectedTrack = $state<Track>('All');
	let searchQuery = $state('');
	let selectedDifficulty = $state<string>('All');
	let activeChallengeId = $state<string>(challenges[0].id);
	let activeTab = $state<'problem' | 'starter' | 'solution'>('problem');
	let copied = $state(false);
	let completedIds = $state<string[]>([]);

	// Inisialisasi status completed dari localStorage saat di browser
	$effect(() => {
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('portal_completed_challenges');
			if (saved) {
				try {
					completedIds = JSON.parse(saved);
				} catch {
					completedIds = [];
				}
			}
		}
	});

	function toggleCompleted(id: string) {
		if (completedIds.includes(id)) {
			completedIds = completedIds.filter((item) => item !== id);
		} else {
			completedIds = [...completedIds, id];
		}
		if (typeof window !== 'undefined') {
			localStorage.setItem('portal_completed_challenges', JSON.stringify(completedIds));
		}
	}

	let filteredChallenges = $derived(
		challenges.filter((c) => {
			const matchTrack = selectedTrack === 'All' || c.track === selectedTrack;
			const matchDifficulty = selectedDifficulty === 'All' || c.difficulty === selectedDifficulty;
			const matchQuery =
				searchQuery === '' ||
				c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				c.summary.toLowerCase().includes(searchQuery.toLowerCase());
			return matchTrack && matchDifficulty && matchQuery;
		})
	);

	let activeChallenge = $derived(
		challenges.find((c) => c.id === activeChallengeId) || challenges[0]
	);

	let totalXP = $derived(
		challenges
			.filter((c) => completedIds.includes(c.id))
			.reduce((acc, curr) => acc + curr.xp, 0)
	);

	function copyToClipboard(text: string) {
		if (typeof navigator !== 'undefined' && navigator.clipboard) {
			navigator.clipboard.writeText(text);
			copied = true;
			setTimeout(() => (copied = false), 2000);
		}
	}
</script>

<svelte:head>
	<title>Programming Challenges - Portal Sistem</title>
</svelte:head>

<main class="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
	<!-- Top Hero Header -->
	<div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-50 via-blue-50/50 to-white border border-indigo-100/80 p-8 sm:p-10 mb-8 shadow-sm">
		<div class="absolute -right-10 -bottom-10 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none"></div>
		<div class="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
			<div class="max-w-2xl">
				<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100/80 border border-indigo-200 text-indigo-800 text-xs font-semibold mb-3">
					<span class="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
					Engineering Lab & Challenges
				</div>
				<h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
					Programming Challenges
				</h1>
				<p class="text-slate-600 text-sm sm:text-base leading-relaxed">
					Asah kemampuan logika, pola desain Clean Architecture (.NET & NestJS), konkurensi TypeScript, serta optimasi performa beban K6.
				</p>
			</div>

			<!-- Stats Card -->
			<div class="flex items-center gap-4 bg-white/90 border border-slate-200/80 rounded-2xl p-4 shadow-xs shrink-0">
				<div class="text-center px-3 border-r border-slate-100">
					<p class="text-2xl font-black text-indigo-600">{completedIds.length} / {challenges.length}</p>
					<p class="text-[11px] font-medium text-slate-500 uppercase">Selesai</p>
				</div>
				<div class="text-center px-3">
					<p class="text-2xl font-black text-emerald-600">{totalXP} XP</p>
					<p class="text-[11px] font-medium text-slate-500 uppercase">Poin Didapat</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Filter & Search Bar -->
	<div class="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white border border-slate-200/80 rounded-2xl p-3 shadow-xs">
		<!-- Track Filter Tabs -->
		<div class="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
			{#each (['All', '.NET Core', 'NestJS', 'TypeScript', 'DevOps & K6'] as Track[]) as track}
				<button
					type="button"
					onclick={() => (selectedTrack = track)}
					class="px-3.5 py-1.5 text-xs font-semibold rounded-xl transition cursor-pointer shrink-0 {selectedTrack === track ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}"
				>
					{track}
				</button>
			{/each}
		</div>

		<!-- Search Input & Difficulty Filter -->
		<div class="flex items-center gap-2.5 w-full sm:w-auto">
			<select
				bind:value={selectedDifficulty}
				class="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
			>
				<option value="All">Semua Level</option>
				<option value="Easy">Easy</option>
				<option value="Medium">Medium</option>
				<option value="Hard">Hard</option>
			</select>

			<div class="relative w-full sm:w-64">
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Cari challenge..."
					class="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 text-xs rounded-xl focus:outline-none focus:border-indigo-500 placeholder-slate-400"
				/>
				<svg class="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
				</svg>
			</div>
		</div>
	</div>

	<!-- Main Workspace Split Grid -->
	<div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
		
		<!-- Left: Challenge List (5 cols) -->
		<div class="lg:col-span-5 space-y-3">
			<h2 class="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
				Daftar Tantangan ({filteredChallenges.length})
			</h2>

			{#if filteredChallenges.length === 0}
				<div class="bg-white border border-slate-200/80 rounded-2xl p-8 text-center text-slate-500">
					<p class="text-sm font-medium">Tidak ada challenge yang cocok dengan filter.</p>
				</div>
			{:else}
				{#each filteredChallenges as ch}
					{@const isCompleted = completedIds.includes(ch.id)}
					{@const isActive = activeChallengeId === ch.id}
					<button
						type="button"
						onclick={() => (activeChallengeId = ch.id)}
						class="w-full text-left p-4 rounded-2xl border transition duration-150 cursor-pointer flex flex-col justify-between {isActive ? 'bg-white border-indigo-500 shadow-md ring-2 ring-indigo-500/10' : 'bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-xs'}"
					>
						<div class="flex items-start justify-between gap-2 mb-2">
							<div class="flex items-center gap-2">
								<span class="px-2 py-0.5 text-[10px] font-bold uppercase rounded-md {ch.track === '.NET Core' ? 'bg-purple-50 text-purple-700 border border-purple-200' : ch.track === 'NestJS' ? 'bg-rose-50 text-rose-700 border border-rose-200' : ch.track === 'TypeScript' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}">
									{ch.track}
								</span>
								<span class="px-2 py-0.5 text-[10px] font-semibold rounded-md {ch.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-700' : ch.difficulty === 'Medium' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'}">
									{ch.difficulty}
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
						<p class="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
							{ch.summary}
						</p>

						<div class="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
							<span class="flex items-center gap-1">
								<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								{ch.timeEst}
							</span>
							<span class="font-bold text-indigo-600">+{ch.xp} XP</span>
						</div>
					</button>
				{/each}
			{/if}
		</div>

		<!-- Right: Active Challenge Detail & Workspace (7 cols) -->
		<div class="lg:col-span-7">
			<div class="bg-white border border-slate-200/90 rounded-3xl shadow-sm overflow-hidden sticky top-24">
				
				<!-- Detail Header -->
				<div class="p-6 border-b border-slate-100 bg-slate-50/50">
					<div class="flex flex-wrap items-center justify-between gap-3 mb-3">
						<div class="flex items-center gap-2">
							<span class="px-2.5 py-1 text-xs font-bold rounded-lg bg-indigo-100 text-indigo-800 border border-indigo-200">
								{activeChallenge.track}
							</span>
							<span class="px-2.5 py-1 text-xs font-semibold rounded-lg {activeChallenge.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-800' : activeChallenge.difficulty === 'Medium' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'}">
								Level: {activeChallenge.difficulty}
							</span>
							<span class="text-xs font-semibold text-slate-500">
								⏳ {activeChallenge.timeEst}
							</span>
						</div>

						<!-- Mark Completed Toggle Button -->
						<button
							type="button"
							onclick={() => toggleCompleted(activeChallenge.id)}
							class="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl transition cursor-pointer {completedIds.includes(activeChallenge.id) ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs' : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'}"
						>
							{#if completedIds.includes(activeChallenge.id)}
								<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
								</svg>
								<span>Sudah Selesai</span>
							{:else}
								<svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								<span>Tandai Selesai</span>
							{/if}
						</button>
					</div>

					<h2 class="text-xl font-extrabold text-slate-900 tracking-tight">
						{activeChallenge.title}
					</h2>
				</div>

				<!-- Navigation Tabs (Deskripsi vs Starter Code vs Solusi Referensi) -->
				<div class="flex items-center border-b border-slate-200 px-6 gap-6 bg-white">
					<button
						type="button"
						onclick={() => (activeTab = 'problem')}
						class="py-3 text-xs font-bold border-b-2 transition cursor-pointer {activeTab === 'problem' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'}"
					>
						Problem & Syarat
					</button>
					<button
						type="button"
						onclick={() => (activeTab = 'starter')}
						class="py-3 text-xs font-bold border-b-2 transition cursor-pointer {activeTab === 'starter' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'}"
					>
						Starter Template
					</button>
					<button
						type="button"
						onclick={() => (activeTab = 'solution')}
						class="py-3 text-xs font-bold border-b-2 transition cursor-pointer {activeTab === 'solution' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-500 hover:text-slate-800'}"
					>
						Solusi Referensi ✨
					</button>
				</div>

				<!-- Tab Contents -->
				<div class="p-6 max-h-[550px] overflow-y-auto">
					{#if activeTab === 'problem'}
						<div class="space-y-6">
							<div>
								<h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Skenario Masalah</h3>
								<div class="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
									{activeChallenge.problem}
								</div>
							</div>

							<div>
								<h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Ketentuan & Syarat Implementasi</h3>
								<ul class="space-y-2">
									{#each activeChallenge.requirements as req}
										<li class="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
											<span class="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
												✓
											</span>
											<span>{req}</span>
										</li>
									{/each}
								</ul>
							</div>
						</div>
					{:else if activeTab === 'starter'}
						<div>
							<div class="flex items-center justify-between mb-3">
								<span class="text-xs font-bold text-slate-500 uppercase">Bahasa: {activeChallenge.language}</span>
								<button
									type="button"
									onclick={() => copyToClipboard(activeChallenge.starterCode)}
									class="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition cursor-pointer"
								>
									{copied ? '✓ Tersalin' : '📋 Salin Kode'}
								</button>
							</div>
							<pre class="p-4 bg-slate-900 text-slate-100 rounded-2xl text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">{activeChallenge.starterCode}</pre>
						</div>
					{:else if activeTab === 'solution'}
						<div>
							<div class="flex items-center justify-between mb-3">
								<span class="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
									Solusi Clean Code
								</span>
								<button
									type="button"
									onclick={() => copyToClipboard(activeChallenge.solutionCode)}
									class="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition cursor-pointer"
								>
									{copied ? '✓ Tersalin' : '📋 Salin Solusi'}
								</button>
							</div>
							<pre class="p-4 bg-slate-900 text-slate-100 rounded-2xl text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">{activeChallenge.solutionCode}</pre>
						</div>
					{/if}
				</div>

			</div>
		</div>

	</div>
</main>
