<script lang="ts">
	import { enhance } from '$app/forms';

	interface Props {
		user: { username: string } | null;
	}

	interface MenuItem {
		title: string;
		desc: string;
		href?: string;
		badge?: string | null;
		isExternal?: boolean;
		isSoon?: boolean;
		children?: MenuItem[];
	}

	interface NavMenu {
		id: string;
		label: string;
		items: MenuItem[];
	}

	let { user }: Props = $props();

	// State untuk mengontrol dropdown mana yang sedang aktif
	let activeDropdown = $state<string | null>(null);
	let mobileMenuOpen = $state(false);

	function toggleDropdown(name: string, event: MouseEvent) {
		event.stopPropagation();
		activeDropdown = activeDropdown === name ? null : name;
	}

	function closeAll() {
		activeDropdown = null;
		mobileMenuOpen = false;
	}

	// Data navigasi & dropdown
	const navMenus: NavMenu[] = [
		{
			id: 'projects',
			label: 'Projects',
			items: [
				{
					title: 'Purwa Digital',
					desc: 'Platform ekosistem & layanan digital',
					children: [
						{
							title: 'Admin',
							desc: 'Dashboard & kontrol manajemen',
							href: 'https://admin.purwa-digital.purwatechsolutions.com',
							isExternal: true,
							badge: 'Admin'
						},
						{
							title: 'Guest',
							desc: 'Portal publik & pengunjung',
							href: 'https://purwa-digital.purwatechsolutions.com/',
							isExternal: true,
							badge: 'Live'
						}
					]
				},
				{
					title: 'Purwa Bengkel',
					desc: 'Sistem operasional & manajemen bengkel',
					badge: 'Soon',
					isSoon: true
				},
				{
					title: 'Purwa Mabar',
					desc: 'Komunitas & platform event gaming',
					badge: 'Soon',
					isSoon: true
				}
			]
		},
		{
			id: 'growth',
			label: 'Growth',
			items: [
				{
					title: 'English',
					desc: 'Pembelajaran & peningkatan kemampuan bahasa Inggris',
					badge: 'Soon',
					isSoon: true
				},
				{
					title: 'IOT',
					desc: 'Internet of Things, mikrokontroler & sensor ekosistem',
					badge: 'Soon',
					isSoon: true
				}
			]
		},
		{
			id: 'technologies',
			label: 'Technologies',
			items: [
				{
					title: '.NET Core',
					desc: 'Enterprise Backend, Web API & C# Ecosystem',
					badge: 'Soon',
					isSoon: true
				},
				{
					title: 'NestJS',
					desc: 'Modular Node.js & TypeScript Framework',
					badge: 'Soon',
					isSoon: true
				},
				{
					title: 'React.js & Svelte',
					desc: 'Modern Frontend & Reactive UI Ecosystem',
					badge: 'Soon',
					isSoon: true
				},
				{
					title: 'Logging & Tracing',
					desc: 'Structured Logging, OpenTelemetry & APM',
					badge: 'Soon',
					isSoon: true
				},
				{
					title: 'Security & Auth',
					desc: 'JWT, OAuth2, RBAC, Encryption & OWASP',
					badge: 'Soon',
					isSoon: true
				},
				{
					title: 'Database & Caching',
					desc: 'PostgreSQL, SQL Server & Redis In-Memory',
					badge: 'Soon',
					isSoon: true
				},
				{
					title: 'Message Broker',
					desc: 'RabbitMQ, Kafka & Async Event Processing',
					badge: 'Soon',
					isSoon: true
				}
			]
		},
		{
			id: 'challenges',
			label: 'Challenges',
			items: [
				{
					title: 'Programming',
					desc: 'Arsitektur backend, concurrency & distributed systems',
					children: [
						{
							title: '.NET Mid → Advanced',
							desc: '60 modul Architecture, EF Core, Outbox, K8s & Observability',
							href: '/challenges/dotnet',
							badge: 'Active'
						},
						{
							title: 'NestJS & TypeScript',
							desc: 'Microservices, DDD, GraphQL & CQRS pattern',
							badge: 'Soon',
							isSoon: true
						}
					]
				},
				{
					title: 'K6 Load Testing',
					desc: '15 level stress test, spike test & benchmark API',
					href: '/challenges/k6',
					badge: 'Active'
				},
				{
					title: 'Kubernetes & DevOps',
					desc: '18 modul Pod, HPA, Ingress, PV & zero-downtime deploy',
					href: '/challenges/kubernetes',
					badge: 'Active'
				},
				{
					title: 'Databases',
					desc: 'MySQL & Microsoft SQL Server deep dive architecture',
					children: [
						{
							title: 'MySQL Advanced',
							desc: '56 modul Index, MVCC, Replication, HA & PITR',
							href: '/challenges/mysql',
							badge: 'Active'
						},
						{
							title: 'SQL Server Advanced',
							desc: '59 modul T-SQL, Query Store, Always On & HA',
							href: '/challenges/sqlserver',
							badge: 'Active'
						}
					]
				}
			]
		},
		{
			id: 'links',
			label: 'Links',
			items: [
				{
					title: 'Jira Software',
					desc: 'Sprint board, backlog & task tracker',
					href: 'https://agungkusaeri.atlassian.net/jira/for-you?tab=workedon',
					isExternal: true,
					badge: 'Jira'
				},
				{
					title: 'GitHub Profile',
					desc: 'Profil & repository di GitHub',
					href: 'https://github.com/agungkusaeri9',
					isExternal: true,
					badge: 'GitHub'
				}
			]
		}
	];
</script>

<!-- Global click listener to close dropdowns when clicking outside -->
<svelte:window onclick={() => (activeDropdown = null)} />

<header class="border-b border-slate-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-40 shadow-xs">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-16">
			
			<!-- Brand Logo -->
			<div class="flex items-center gap-3">
				<a href="/" class="flex items-center gap-2.5 group">
					<div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform duration-200">
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
						</svg>
					</div>
					<div>
						<span class="font-bold text-base text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">PORTAL</span>
						<span class="hidden sm:inline-block ml-1.5 px-2 py-0.5 text-[9px] font-semibold tracking-wider uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">v1.0</span>
					</div>
				</a>
			</div>

			<!-- Desktop Navigation Menus (Right Side) -->
			<nav class="hidden lg:flex items-center gap-1 xl:gap-2">
				{#each navMenus as menu}
					<div class="relative">
						<button
							type="button"
							onclick={(e) => toggleDropdown(menu.id, e)}
							class="flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer {activeDropdown === menu.id ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'}"
							aria-expanded={activeDropdown === menu.id}
						>
							<span>{menu.label}</span>
							<svg
								class="w-4 h-4 text-slate-400 transition-transform duration-200 {activeDropdown === menu.id ? 'rotate-180 text-indigo-600' : ''}"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
							</svg>
						</button>

						<!-- Dropdown Menu Content -->
						{#if activeDropdown === menu.id}
							<!-- svelte-ignore a11y_no_static_element_interactions -->
							<div
								onclick={(e) => e.stopPropagation()}
								onkeydown={(e) => { if (e.key === 'Escape') activeDropdown = null; }}
								class="absolute right-0 mt-2 w-72 rounded-2xl bg-white border border-slate-200/90 shadow-xl shadow-slate-300/30 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
							>
								<div class="px-3 py-1.5 border-b border-slate-100 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
									Menu {menu.label}
								</div>
								<div class="p-1 space-y-0.5">
									{#each menu.items as item}
										{#if item.children}
											<!-- Item with Nested Submenu (Flyout on Hover) -->
											<div class="relative group/sub">
												<div class="flex items-center justify-between p-2.5 rounded-xl hover:bg-indigo-50/70 transition cursor-pointer select-none group-hover/sub:bg-indigo-50/80">
													<div class="flex-1 pr-2">
														<span class="text-xs font-semibold text-slate-800 group-hover/sub:text-indigo-600 transition-colors">
															{item.title}
														</span>
														<p class="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{item.desc}</p>
													</div>
													<svg class="w-3.5 h-3.5 text-slate-400 group-hover/sub:text-indigo-600 group-hover/sub:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
													</svg>
												</div>

												<!-- Flyout Submenu Panel (muncul ke arah kiri agar tidak keluar viewport) -->
												<div class="absolute right-full top-0 mr-1.5 w-64 rounded-2xl bg-white border border-slate-200/90 shadow-xl shadow-slate-300/30 p-1.5 invisible opacity-0 group-hover/sub:visible group-hover/sub:opacity-100 transition-all duration-150 z-50">
													<div class="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
														{item.title} Portals
													</div>
													{#each item.children as sub}
														{#if sub.href}
															<a
																href={sub.href}
																target={sub.isExternal ? '_blank' : '_self'}
																rel={sub.isExternal ? 'noopener noreferrer' : ''}
																onclick={closeAll}
																class="flex items-center justify-between p-2 rounded-xl hover:bg-indigo-50/70 text-xs font-medium text-slate-700 transition group/sublink mb-1 last:mb-0"
															>
																<div>
																	<div class="flex items-center gap-1">
																		<span class="font-bold text-slate-800 group-hover/sublink:text-indigo-600 transition-colors">{sub.title}</span>
																		{#if sub.isExternal}
																			<svg class="w-3 h-3 text-slate-400 group-hover/sublink:text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
																			</svg>
																		{/if}
																	</div>
																	<p class="text-[10px] text-slate-500">{sub.desc}</p>
																</div>
																{#if sub.badge}
																	<span class="px-1.5 py-0.5 text-[9px] font-semibold rounded-md {sub.badge === 'Admin' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'} shrink-0">
																		{sub.badge}
																	</span>
																{/if}
															</a>
														{:else}
															<div class="flex items-center justify-between p-2 rounded-xl bg-slate-50/70 text-xs font-medium text-slate-700 mb-1 last:mb-0">
																<div>
																	<span class="font-semibold text-slate-800">{sub.title}</span>
																	<p class="text-[10px] text-slate-500">{sub.desc}</p>
																</div>
																{#if sub.badge}
																	<span class="px-1.5 py-0.5 text-[9px] font-semibold rounded-md bg-amber-50 text-amber-700 border border-amber-200 shrink-0">
																		{sub.badge}
																	</span>
																{/if}
															</div>
														{/if}
													{/each}
												</div>
											</div>
										{:else if item.isSoon || !item.href}
											<div class="flex items-start justify-between p-2.5 rounded-xl bg-slate-50/60 opacity-80 cursor-default select-none">
												<div class="flex-1 pr-2">
													<span class="text-xs font-semibold text-slate-700">
														{item.title}
													</span>
													<p class="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{item.desc}</p>
												</div>
												{#if item.badge}
													<span class="px-1.5 py-0.5 text-[9px] font-semibold rounded-md bg-amber-50 text-amber-700 border border-amber-200 shrink-0">
														{item.badge}
													</span>
												{/if}
											</div>
										{:else}
											<a
												href={item.href}
												target={item.isExternal ? '_blank' : '_self'}
												rel={item.isExternal ? 'noopener noreferrer' : ''}
												onclick={closeAll}
												class="flex items-start justify-between p-2.5 rounded-xl hover:bg-slate-50 transition group"
											>
												<div class="flex-1 pr-2">
													<div class="flex items-center gap-1.5">
														<span class="text-xs font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">
															{item.title}
														</span>
														{#if item.isExternal}
															<svg class="w-3 h-3 text-slate-400 group-hover:text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
															</svg>
														{/if}
													</div>
													<p class="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{item.desc}</p>
												</div>
												{#if item.badge}
													<span class="px-1.5 py-0.5 text-[9px] font-medium rounded-md bg-indigo-50 text-indigo-600 border border-indigo-100 shrink-0">
														{item.badge}
													</span>
												{/if}
											</a>
										{/if}
									{/each}
								</div>
							</div>
						{/if}
					</div>
				{/each}

				<!-- Separator -->
				<div class="h-5 w-[1px] bg-slate-200 mx-1"></div>

				<!-- User Profile & Logout -->
				{#if user}
					<div class="flex items-center gap-2 pl-1">
						<div class="flex items-center gap-2 bg-slate-100/90 border border-slate-200/80 rounded-full py-1 pl-1.5 pr-3">
							<div class="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-blue-500 text-white font-semibold flex items-center justify-center text-[10px] uppercase shadow-xs">
								{user.username.substring(0, 2)}
							</div>
							<span class="text-xs font-semibold text-slate-700 max-w-[100px] truncate">{user.username}</span>
						</div>

						<a
							href="/logout"
							data-sveltekit-reload
							title="Keluar dari sesi"
							class="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 rounded-lg transition duration-150 cursor-pointer"
							aria-label="Logout"
						>
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
							</svg>
						</a>
					</div>
				{/if}
			</nav>

			<!-- Mobile Hamburger Button -->
			<div class="flex lg:hidden items-center gap-2">
				{#if user}
					<a
						href="/logout"
						data-sveltekit-reload
						class="p-2 text-xs font-medium text-slate-600 hover:text-rose-600 bg-slate-100 rounded-lg"
						aria-label="Logout"
					>
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
						</svg>
					</a>
				{/if}
				<button
					type="button"
					onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
					class="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none cursor-pointer"
					aria-label="Toggle Menu"
				>
					{#if mobileMenuOpen}
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					{:else}
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
						</svg>
					{/if}
				</button>
			</div>

		</div>
	</div>

	<!-- Mobile Menu Drawer Dropdown -->
	{#if mobileMenuOpen}
		<div class="lg:hidden border-t border-slate-200/80 bg-white px-4 pt-3 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-200 max-h-[80vh] overflow-y-auto">
			{#if user}
				<div class="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl mb-3">
					<div class="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-blue-500 text-white font-bold flex items-center justify-center text-xs">
						{user.username.substring(0, 2).toUpperCase()}
					</div>
					<div>
						<p class="text-xs font-bold text-slate-800">{user.username}</p>
						<p class="text-[10px] text-slate-500">Administrator</p>
					</div>
				</div>
			{/if}

			{#each navMenus as menu}
				<div class="space-y-1.5">
					<div class="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2">
						{menu.label}
					</div>
					<div class="grid grid-cols-1 gap-1">
						{#each menu.items as item}
							{#if item.children}
								<div class="p-2.5 rounded-xl bg-slate-50/90 space-y-1.5">
									<span class="text-xs font-bold text-slate-800">{item.title}</span>
									<div class="pl-2 border-l-2 border-indigo-200 space-y-1 mt-1">
										{#each item.children as sub}
											{#if sub.href}
												<a
													href={sub.href}
													target={sub.isExternal ? '_blank' : '_self'}
													rel={sub.isExternal ? 'noopener noreferrer' : ''}
													onclick={closeAll}
													class="flex items-center justify-between p-1.5 text-xs text-slate-700 hover:text-indigo-600 rounded-lg hover:bg-slate-100"
												>
													<div>
														<p class="font-bold text-slate-800">{sub.title}</p>
														<p class="text-[10px] text-slate-500">{sub.desc}</p>
													</div>
													{#if sub.badge}
														<span class="px-1.5 py-0.5 text-[9px] font-semibold rounded-md {sub.badge === 'Admin' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}">
															{sub.badge}
														</span>
													{/if}
												</a>
											{:else}
												<div class="flex items-center justify-between p-1.5 text-xs text-slate-600">
													<div>
														<p class="font-medium text-slate-800">{sub.title}</p>
														<p class="text-[10px] text-slate-400">{sub.desc}</p>
													</div>
													{#if sub.badge}
														<span class="px-1.5 py-0.5 text-[9px] font-semibold rounded-md bg-amber-50 text-amber-700 border border-amber-200">
															{sub.badge}
														</span>
													{/if}
												</div>
											{/if}
										{/each}
									</div>
								</div>
							{:else if item.isSoon || !item.href}
								<div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 text-xs font-medium text-slate-500">
									<span>{item.title}</span>
									{#if item.badge}
										<span class="px-1.5 py-0.5 text-[9px] font-semibold rounded-md bg-amber-50 text-amber-700 border border-amber-200">
											{item.badge}
										</span>
									{/if}
								</div>
							{:else}
								<a
									href={item.href}
									target={item.isExternal ? '_blank' : '_self'}
									rel={item.isExternal ? 'noopener noreferrer' : ''}
									onclick={closeAll}
									class="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 text-xs font-medium text-slate-700"
								>
									<span>{item.title}</span>
									{#if item.badge}
										<span class="px-1.5 py-0.5 text-[9px] font-medium rounded-md bg-indigo-50 text-indigo-600 border border-indigo-100">
											{item.badge}
										</span>
									{/if}
								</a>
							{/if}
						{/each}
					</div>
				</div>
			{/each}
		</div>
	{/if}
</header>
