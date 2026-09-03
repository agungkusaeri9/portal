<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();

	let showPassword = $state(false);
	let loading = $state(false);
</script>

<svelte:head>
	<title>Masuk - Portal Sistem</title>
</svelte:head>

<div class="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-indigo-50/30 to-blue-50/40 px-4 py-12 overflow-hidden select-none">
	<!-- Background Ambient Glow Effects -->
	<div class="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-200/50 rounded-full blur-3xl pointer-events-none"></div>
	<div class="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-200/50 rounded-full blur-3xl pointer-events-none"></div>
	<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-[100px] pointer-events-none"></div>

	<!-- Login Card Container -->
	<div class="relative w-full max-w-md">
		<!-- Card with subtle border and elevated soft shadow -->
		<div class="relative rounded-3xl bg-white/90 border border-slate-200/80 p-8 sm:p-10 shadow-2xl shadow-slate-300/40 backdrop-blur-xl">
			
			<!-- Logo & Header -->
			<div class="text-center mb-8">
				<div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-600 shadow-lg shadow-indigo-600/25 mb-4 text-white">
					<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
					</svg>
				</div>
				<h1 class="text-2xl font-bold tracking-tight text-slate-900">Portal Akses</h1>
				<p class="text-sm text-slate-500 mt-1.5">Masuk dengan akun terverifikasi untuk melanjutkan</p>
			</div>

			<!-- Error Alert -->
			{#if form?.error}
				<div class="mb-6 flex items-start gap-3 rounded-xl bg-rose-50 border border-rose-200 p-3.5 text-sm text-rose-700 animate-in fade-in slide-in-from-top-2 duration-200">
					<svg class="w-5 h-5 text-rose-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<span class="font-medium leading-relaxed">{form.error}</span>
				</div>
			{/if}

			<!-- Login Form -->
			<form
				method="POST"
				class="space-y-5"
				use:enhance={() => {
					loading = true;
					return async ({ update }) => {
						loading = false;
						await update();
					};
				}}
			>
				<!-- Username Field -->
				<div>
					<label for="username" class="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
						Username
					</label>
					<div class="relative">
						<div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
							</svg>
						</div>
						<input
							id="username"
							name="username"
							type="text"
							required
							autocomplete="username"
							value={form?.username ?? ''}
							placeholder="agungkusaeri9"
							class="w-full pl-11 pr-4 py-3 bg-slate-50/80 hover:bg-white focus:bg-white border border-slate-200 text-slate-900 placeholder-slate-400 text-sm rounded-xl focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/10 transition duration-150 ease-in-out"
						/>
					</div>
				</div>

				<!-- Password Field -->
				<div>
					<label for="password" class="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
						Password
					</label>
					<div class="relative">
						<div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
							</svg>
						</div>
						<input
							id="password"
							name="password"
							type={showPassword ? 'text' : 'password'}
							required
							autocomplete="current-password"
							placeholder="••••••••••••"
							class="w-full pl-11 pr-11 py-3 bg-slate-50/80 hover:bg-white focus:bg-white border border-slate-200 text-slate-900 placeholder-slate-400 text-sm rounded-xl focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/10 transition duration-150 ease-in-out"
						/>
						<button
							type="button"
							onclick={() => (showPassword = !showPassword)}
							class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none transition cursor-pointer"
							aria-label={showPassword ? 'Sembunyikan password' : 'Lihat password'}
						>
							{#if showPassword}
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
								</svg>
							{:else}
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
								</svg>
							{/if}
						</button>
					</div>
				</div>

				<!-- Submit Button -->
				<div class="pt-2">
					<button
						type="submit"
						disabled={loading}
						class="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-gradient-to-r from-indigo-600 hover:from-indigo-700 to-blue-600 hover:to-blue-700 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 transition duration-150 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
					>
						{#if loading}
							<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
								<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
							<span>Memvalidasi kredensial...</span>
						{:else}
							<span>Masuk ke Portal</span>
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
							</svg>
						{/if}
					</button>
				</div>
			</form>

			<!-- Footer Security Info -->
			<div class="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-500">
				<svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
				</svg>
				<span>Koneksi aman dengan enkripsi sesi server-side</span>
			</div>
		</div>
	</div>
</div>
