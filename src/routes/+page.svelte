<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const purwaProjects = [
		{
			title: 'Purwa Digital',
			desc: 'Platform ekosistem teknologi dan layanan digital terintegrasi.',
			badge: 'Soon'
		},
		{
			title: 'Purwa Bengkel',
			desc: 'Sistem operasional, pencatatan servis, dan manajemen bengkel.',
			badge: 'Soon'
		},
		{
			title: 'Purwa Mabar',
			desc: 'Platform komunitas interaktif dan penyelenggaraan event gaming.',
			badge: 'Soon'
		}
	];
</script>

<svelte:head>
	<title>Dashboard - Portal Sistem</title>
</svelte:head>

<main class="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
	<!-- Welcome Hero -->
	<div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-50 via-blue-50/40 to-white border border-indigo-100/80 p-8 sm:p-10 mb-8 shadow-sm">
		<div class="absolute -right-10 -bottom-10 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none"></div>
		<div class="relative z-10 max-w-2xl">
			<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100/70 border border-indigo-200 text-indigo-800 text-xs font-medium mb-4">
				<span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
				Autentikasi Terverifikasi
			</div>
			<h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
				Selamat Datang, <span class="text-indigo-600">{data.user?.username}</span>!
			</h1>
			<p class="text-slate-600 text-sm sm:text-base leading-relaxed">
				Anda berada di pusat kendali Portal Sistem. Akses menu navigasi di atas (Projects, Growth, Challenges, Github, dan Links) untuk membuka integrasi kerja Anda.
			</p>
		</div>
	</div>

	<!-- Section: Purwa Projects Showcase -->
	<div class="mb-8">
		<div class="flex items-center justify-between mb-4">
			<div>
				<h2 class="text-lg font-bold text-slate-900">Purwa Projects</h2>
				<p class="text-xs text-slate-500">Daftar project dan platform dalam pipeline pengembangan</p>
			</div>
			<span class="px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-600 border border-slate-200">
				3 Pipeline Projects
			</span>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			{#each purwaProjects as project}
				<div class="rounded-2xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
					<div>
						<div class="flex items-center justify-between mb-3">
							<div class="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
								{project.title.substring(6, 8)}
							</div>
							<span class="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-amber-50 text-amber-700 border border-amber-200">
								{project.badge}
							</span>
						</div>
						<h3 class="text-base font-bold text-slate-900 mb-1.5">{project.title}</h3>
						<p class="text-xs text-slate-500 leading-relaxed mb-4">
							{project.desc}
						</p>
					</div>
					<div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
						<span>Status Peluncuran</span>
						<span class="font-medium text-amber-600">Coming Soon</span>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Quick Integrations & Status Grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
		<!-- Card 1: Jira & Tools Eksternal -->
		<div class="rounded-2xl bg-white border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between">
			<div>
				<div class="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mb-4">
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
					</svg>
				</div>
				<h3 class="text-base font-bold text-slate-900 mb-1">Tautan Cepat (Jira & Docs)</h3>
				<p class="text-xs text-slate-500 leading-relaxed mb-4">
					Menu <strong>Links</strong> di navbar menyediakan shortcut langsung ke Jira Software, Confluence, dan Figma.
				</p>
			</div>
			<div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-semibold">
				<span>Integrasi Jira Ready</span>
				<span class="text-slate-400 font-normal">Direct Link</span>
			</div>
		</div>

		<!-- Card 2: Keamanan Sesi -->
		<div class="rounded-2xl bg-white border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between">
			<div>
				<div class="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
					</svg>
				</div>
				<h3 class="text-base font-bold text-slate-900 mb-1">Keamanan & Sesi Server</h3>
				<p class="text-xs text-slate-500 leading-relaxed mb-4">
					Sesi diamankan dengan Cookie <code>HttpOnly</code>, enkripsi HMAC SHA-256 dan route guard server-side.
				</p>
			</div>
			<div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-semibold">
				<span class="inline-flex items-center gap-1.5">
					<span class="w-2 h-2 rounded-full bg-emerald-500"></span>
					Aktif Terproteksi
				</span>
			</div>
		</div>
	</div>
</main>
