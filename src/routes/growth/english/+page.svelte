<script lang="ts">
	interface EnglishChallenge {
		id: string;
		num: string;
		title: string;
		level: string;
		levelColor: string;
		objective: string;
		scenario?: string;
		practicePrompts?: string[];
		phrases?: string[];
		example?: string;
		vocabulary?: string[];
		successCriteria?: string;
		rule?: string;
	}

	const levels = [
		'All',
		'Level 1 — Everyday English',
		'Level 2 — Speaking Confidence',
		'Level 3 — Listening & Shadowing',
		'Level 4 — Workplace English',
		'Level 5 — Meetings Mastery',
		'Level 6 — Software Engineering English',
		'Level 7 — Code Review & Git',
		'Level 8 — Technical Writing',
		'Level 9 — Professional Communication',
		'Level 10 — Interview English',
		'Level 11 — Advanced Workplace English'
	];

	const englishChallenges: EnglishChallenge[] = [
		// LEVEL 1 — EVERYDAY ENGLISH
		{
			id: 'eng-01',
			num: '01',
			title: 'Introduce Yourself Naturally',
			level: 'Level 1 — Everyday English',
			levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
			objective: 'Mampu memperkenalkan diri secara mengalir selama 1-2 menit tanpa menerjemahkan kata demi kata dari Bahasa Indonesia.',
			practicePrompts: [
				'Who are you & where do you live?',
				'What do you do for work?',
				'What are you currently working on or learning?',
				'What do you enjoy in your free time (hobbies)?'
			],
			example: `"Hi, I'm Agung. I'm a software engineer based in Indonesia. Currently, I focus on backend architecture, API performance, and cloud systems. In my free time, I enjoy exploring new tech and gaming."`,
			successCriteria: 'Bicara selama 2 menit lancar dengan pengucapan yang percaya diri.'
		},
		{
			id: 'eng-02',
			num: '02',
			title: 'Describe Your Daily Routine',
			level: 'Level 1 — Everyday English',
			levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
			objective: 'Mendeskripsikan rutinitas harian dari bangun pagi, ngoding, meeting, hingga istirahat.',
			practicePrompts: [
				'Morning: Wake up, breakfast, coffee, review daily tasks',
				'Work: Standup meeting, coding sprint, debugging, code review',
				'Evening: Exercise, gaming, reading, sleep'
			],
			phrases: [
				'I usually start my day at 7 AM.',
				'I kick off work by reviewing my pending pull requests.',
				'After lunch, I focus on deep work without distractions.'
			]
		},
		{
			id: 'eng-03',
			num: '03',
			title: 'Talk About Your Weekend & Future Plans',
			level: 'Level 1 — Everyday English',
			levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
			objective: 'Melatih penggunaan Past Tense (kejadian lampau) dan Future Tense (rencana akhir pekan berikutnya).',
			practicePrompts: [
				'What did you do last weekend?',
				'Where did you go and who did you hang out with?',
				'What are you planning to do this upcoming weekend?'
			]
		},
		{
			id: 'eng-04',
			num: '04',
			title: 'Small Talk Mastery (Break the Ice)',
			level: 'Level 1 — Everyday English',
			levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
			objective: 'Memulai dan menjaga percakapan santai (weather, weekend, hobbies, games) tanpa canggung.',
			rule: 'Jangan akhiri percakapan hanya dengan "I\'m good." Selalu lanjutkan dengan open question seperti "How about you?" atau "How was your weekend?"',
			phrases: [
				'How was your weekend? Did you do anything fun?',
				'How is the weather over there today?',
				'Have you tried that new coffee shop downtown?'
			]
		},
		{
			id: 'eng-05',
			num: '05',
			title: 'Natural Question Formations',
			level: 'Level 1 — Everyday English',
			levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
			objective: 'Mengubah pertanyaan kaku ("You work?") menjadi bentuk natural profesional.',
			phrases: [
				'❌ "You work?" ➔ ✅ "What do you do for work?"',
				'❌ "You do what now?" ➔ ✅ "What are you working on these days?"',
				'❌ "How long you work?" ➔ ✅ "How long have you been working there?"'
			]
		},
		{
			id: 'eng-06',
			num: '06',
			title: 'Expressing Opinions Politely',
			level: 'Level 1 — Everyday English',
			levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
			objective: 'Menyampaikan sudut pandang tentang teknologi, remote work, atau AI dengan variasi ekspresi.',
			phrases: [
				'In my opinion, remote work increases overall productivity.',
				'From my perspective, microservices add unnecessary complexity for small teams.',
				'Personally, I prefer writing clean SQL over heavy ORM abstractions.'
			]
		},
		{
			id: 'eng-07',
			num: '07',
			title: 'Agreeing & Disagreeing Professionally',
			level: 'Level 1 — Everyday English',
			levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
			objective: 'Menyetujui atau menolak ide rekan kerja dengan sopan tanpa menimbulkan friksi emosional.',
			phrases: [
				'✅ Agree: "That makes a lot of sense.", "Exactly, that\'s a solid point."',
				'⚠️ Disagree: "I see your point, but we might run into scalability issues.", "I look at it a bit differently because..."'
			]
		},

		// LEVEL 2 — SPEAKING CONFIDENCE
		{
			id: 'eng-08',
			num: '08',
			title: 'One-Minute Spontaneous Speaking',
			level: 'Level 2 — Speaking Confidence',
			levelColor: 'bg-amber-50 text-amber-700 border-amber-200',
			objective: 'Pilih 1 topik acak dan bicara nonstop selama 60 detik tanpa henti untuk melatih kelancaran berpikir.',
			practicePrompts: [
				'Topic 1: Why I chose Software Engineering',
				'Topic 2: My favorite programming framework and why',
				'Topic 3: The most interesting bug I fixed recently'
			]
		},
		{
			id: 'eng-09',
			num: '09',
			title: 'Two-Minute Structured Speaking (Intro ➔ Body ➔ Conclusion)',
			level: 'Level 2 — Speaking Confidence',
			levelColor: 'bg-amber-50 text-amber-700 border-amber-200',
			objective: 'Menyusun argumen lisan berdurasi 2 menit dengan struktur: Introduction ➔ Main Point ➔ Real Example ➔ Conclusion.'
		},
		{
			id: 'eng-10',
			num: '10',
			title: 'Explain Complex Tech Simply (ELI5)',
			level: 'Level 2 — Speaking Confidence',
			levelColor: 'bg-amber-50 text-amber-700 border-amber-200',
			objective: 'Menjelaskan konsep teknis rumit (API, Kubernetes, Database Indexing, Caching) kepada orang non-teknis.',
			rule: 'Hindari jargon teknis. Gunakan analogi dunia nyata (misal: REST API = pelayan restoran yang mengantar pesanan ke koki dapur).'
		},
		{
			id: 'eng-11',
			num: '11',
			title: 'Technical Storytelling Framework',
			level: 'Level 2 — Speaking Confidence',
			levelColor: 'bg-amber-50 text-amber-700 border-amber-200',
			objective: 'Bercerita dengan alur: What happened ➔ What I did ➔ What happened next ➔ Key takeaway / lessons learned.',
			example: `"Last month, our API latency spiked during a flash sale. I investigated the database logs and discovered an un-indexed query. After adding a composite index, response time dropped from 4 seconds to 80 milliseconds."`
		},
		{
			id: 'eng-12',
			num: '12',
			title: 'Think in English (Eliminate Translation Delay)',
			level: 'Level 2 — Speaking Confidence',
			levelColor: 'bg-amber-50 text-amber-700 border-amber-200',
			objective: 'Mendeskripsikan aktivitas di dalam pikiran secara langsung dalam bahasa Inggris tanpa proses terjemahan di otak.'
		},

		// LEVEL 3 — LISTENING & SHADOWING
		{
			id: 'eng-13',
			num: '13',
			title: 'Active Listening Without Subtitles',
			level: 'Level 3 — Listening & Shadowing',
			levelColor: 'bg-rose-50 text-rose-700 border-rose-200',
			objective: 'Mendengarkan rekaman podcast teknis 5-10 menit tanpa subtitle, lalu catat poin utama dan kata yang terlewat.'
		},
		{
			id: 'eng-14',
			num: '14',
			title: 'Shadowing Technique (Pronunciation & Rhythm)',
			level: 'Level 3 — Listening & Shadowing',
			levelColor: 'bg-rose-50 text-rose-700 border-rose-200',
			objective: 'Menirukan intonasi, ritme, dan jeda penutur asli secara instan (Listen ➔ Pause ➔ Shadow speak).',
			rule: 'Fokus pada connected speech (misal: "out of" dibaca "outta", "going to" dibaca "gonna").'
		},
		{
			id: 'eng-15',
			num: '15',
			title: 'Multi-Accent Comprehension',
			level: 'Level 3 — Listening & Shadowing',
			levelColor: 'bg-rose-50 text-rose-700 border-rose-200',
			objective: 'Membiasakan telinga mendengarkan aksen internasional di dunia tech (US, UK, Indian, Australian, Singaporean).'
		},
		{
			id: 'eng-16',
			num: '16',
			title: 'Meeting Minutes Note-Taking',
			level: 'Level 3 — Listening & Shadowing',
			levelColor: 'bg-rose-50 text-rose-700 border-rose-200',
			objective: 'Mencatat Action Items dari simulasi meeting: Problem ➔ Decision ➔ Action Item ➔ Owner ➔ Deadline.'
		},

		// LEVEL 4 — WORKPLACE ENGLISH
		{
			id: 'eng-17',
			num: '17',
			title: 'Daily Standup Update (Yesterday, Today, Blockers)',
			level: 'Level 4 — Workplace English',
			levelColor: 'bg-purple-50 text-purple-700 border-purple-200',
			objective: 'Menyampaikan update standup harian secara padat, jelas, dan percaya diri dalam 30-45 detik.',
			example: `"Yesterday, I finalized the refresh token rotation logic and wrote integration tests. Today, I'm working on the Redis caching layer for the product catalog. I don't have any blockers at the moment."`,
			phrases: [
				'Yesterday, I worked on...',
				'Today, my main priority is to...',
				'I\'m currently blocked by an issue with...'
			]
		},
		{
			id: 'eng-18',
			num: '18',
			title: 'Explaining What You Are Working On',
			level: 'Level 4 — Workplace English',
			levelColor: 'bg-purple-50 text-purple-700 border-purple-200',
			objective: 'Menjelaskan status fitur kepada Tech Lead atau Product Manager.',
			phrases: [
				'I\'m currently working on the checkout service.',
				'The goal is to reduce database connection bottlenecks.',
				'So far, I\'ve implemented the outbox pattern, and next, I\'ll verify the dead-letter queue.'
			]
		},
		{
			id: 'eng-19',
			num: '19',
			title: 'Asking for Clarification Politely',
			level: 'Level 4 — Workplace English',
			levelColor: 'bg-purple-50 text-purple-700 border-purple-200',
			objective: 'Meminta penjelasan ulang saat requirement tidak jelas tanpa terdengar tidak mengerti.',
			phrases: [
				'Could you clarify what you mean by real-time sync?',
				'Just to make sure we\'re on the same page, do you mean...?',
				'Could you walk me through an example of the expected user flow?'
			]
		},
		{
			id: 'eng-20',
			num: '20',
			title: 'Confirming Requirements & Acceptance Criteria',
			level: 'Level 4 — Workplace English',
			levelColor: 'bg-purple-50 text-purple-700 border-purple-200',
			objective: 'Mengulangi requirement dengan kata-kata sendiri untuk mengunci kesepakatan spesifikasi.',
			phrases: [
				'So, if I understand correctly, the API should return a 409 Conflict if the email already exists?',
				'Is that accurate, or did I miss anything?'
			]
		},
		{
			id: 'eng-21',
			num: '21',
			title: 'Talking About Blockers & Dependencies',
			level: 'Level 4 — Workplace English',
			levelColor: 'bg-purple-50 text-purple-700 border-purple-200',
			objective: 'Menyampaikan hambatan teknis tanpa terdengar menyalahkan orang lain.',
			phrases: [
				'I\'m currently blocked by the payment gateway credentials.',
				'I\'ve tried reproducing it locally, but it seems environment-specific.',
				'Could someone from DevOps take a look at the ingress configuration?'
			]
		},
		{
			id: 'eng-22',
			num: '22',
			title: 'Asking for Help Professionally',
			level: 'Level 4 — Workplace English',
			levelColor: 'bg-purple-50 text-purple-700 border-purple-200',
			objective: 'Meminta bantuan senior dengan menyertakan context upaya yang sudah dicoba.',
			phrases: [
				'❌ "I don\'t understand." ➔ ✅ "I\'m running into an issue with the EF Core transaction. I\'ve verified the connection string and migration, but still getting a timeout. Could you spare 5 minutes to take a look?"'
			]
		},

		// LEVEL 5 — MEETINGS
		{
			id: 'eng-23',
			num: '23',
			title: 'Joining & Opening a Meeting',
			level: 'Level 5 — Meetings Mastery',
			levelColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
			objective: 'Membuka meeting dan memeriksa kesiapan audio/video tim.',
			phrases: [
				'Hi everyone, can you hear and see my screen clearly?',
				'Thanks for jumping on the call. Let\'s get started.',
				'The main objective of today\'s session is to finalize the database schema.'
			]
		},
		{
			id: 'eng-24',
			num: '24',
			title: 'Giving a Comprehensive Status Update',
			level: 'Level 5 — Meetings Mastery',
			levelColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
			objective: 'Menyampaikan update progres sprint: Completed ➔ Ongoing ➔ Upcoming risks.'
		},
		{
			id: 'eng-25',
			num: '25',
			title: 'Interrupting Politely in Fast Discussions',
			level: 'Level 5 — Meetings Mastery',
			levelColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
			objective: 'Menyelipkan poin penting saat diskusi berjalan cepat tanpa memotong secara kasar.',
			phrases: [
				'Sorry to jump in, but can I add a quick point regarding database locking?',
				'If I may chime in for a second...'
			]
		},
		{
			id: 'eng-26',
			num: '26',
			title: 'Bringing the Discussion Back on Track',
			level: 'Level 5 — Meetings Mastery',
			levelColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
			objective: 'Mengarahkan kembali topik saat tim mulai membicarakan hal di luar agenda meeting.',
			phrases: [
				'That\'s a great topic, but let\'s park it for now and come back to our main agenda.',
				'In the interest of time, let\'s focus on the deployment timeline.'
			]
		},
		{
			id: 'eng-27',
			num: '27',
			title: 'Concluding & Summarizing Action Items',
			level: 'Level 5 — Meetings Mastery',
			levelColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
			objective: 'Menutup meeting dengan merangkum pembagian tugas dan batas waktu penyerahan.',
			phrases: [
				'To wrap up, I will handle the migration script by tomorrow, and John will test the endpoints.',
				'Thanks everyone for your time. Have a great rest of your day!'
			]
		},

		// LEVEL 6 — SOFTWARE ENGINEERING ENGLISH
		{
			id: 'eng-28',
			num: '28',
			title: 'Explaining an API Contract',
			level: 'Level 6 — Software Engineering English',
			levelColor: 'bg-teal-50 text-teal-700 border-teal-200',
			objective: 'Menjelaskan endpoint, HTTP verb, request payload, query params, response DTO, dan error status codes.',
			example: `"This POST /orders endpoint accepts an array of product IDs and quantities. It requires a Bearer JWT in the authorization header and returns 201 Created with the order summary DTO."`
		},
		{
			id: 'eng-29',
			num: '29',
			title: 'Explaining Database Design & Relationships',
			level: 'Level 6 — Software Engineering English',
			levelColor: 'bg-teal-50 text-teal-700 border-teal-200',
			objective: 'Menjelaskan relasi One-to-Many, Many-to-Many, Composite Indexes, dan Foreign Key constraints.'
		},
		{
			id: 'eng-30',
			num: '30',
			title: 'Explaining System Architecture End-to-End',
			level: 'Level 6 — Software Engineering English',
			levelColor: 'bg-teal-50 text-teal-700 border-teal-200',
			objective: 'Menjelaskan diagram alur arsitektur dari Client ➔ CDN ➔ Load Balancer ➔ API Pods ➔ Redis ➔ DB ➔ RabbitMQ.'
		},
		{
			id: 'eng-31',
			num: '31',
			title: 'Explaining a Bug (Problem ➔ Root Cause ➔ Fix ➔ Prevention)',
			level: 'Level 6 — Software Engineering English',
			levelColor: 'bg-teal-50 text-teal-700 border-teal-200',
			objective: 'Menyampaikan analisis bug secara sistematis.',
			phrases: [
				'The bug was triggered when concurrent requests updated the same stock row.',
				'The root cause was the absence of row-level locking.',
				'We resolved it by introducing SELECT ... FOR UPDATE, and added integration tests to prevent regression.'
			]
		},
		{
			id: 'eng-32',
			num: '32',
			title: 'Explaining Technical Trade-offs',
			level: 'Level 6 — Software Engineering English',
			levelColor: 'bg-teal-50 text-teal-700 border-teal-200',
			objective: 'Membandingkan Solusi A vs Solusi B (misal: Redis In-Memory vs Database Read Replica) berdasarkan throughput vs complexity.'
		},

		// LEVEL 7 — CODE REVIEW & GIT
		{
			id: 'eng-33',
			num: '33',
			title: 'Writing Constructive Code Review Comments',
			level: 'Level 7 — Code Review & Git',
			levelColor: 'bg-blue-50 text-blue-700 border-blue-200',
			objective: 'Memberikan masukan review kode yang solutif, sopan, dan jelas.',
			phrases: [
				'Could we extract this validation logic into a separate utility function?',
				'Nit: Consider using string interpolation here for better readability.',
				'I noticed this query is missing an index on user_id, which might cause table scans under high load.'
			]
		},
		{
			id: 'eng-34',
			num: '34',
			title: 'Pushing Back on a Code Review Suggestion',
			level: 'Level 7 — Code Review & Git',
			levelColor: 'bg-blue-50 text-blue-700 border-blue-200',
			objective: 'Mempertahankan keputusan arsitektur dengan argumen logis tanpa terkesan defensif.',
			phrases: [
				'That\'s a valid point. However, I chose this approach because it reduces database round-trips.',
				'Would you be open to keeping this as-is for this PR and addressing the refactoring in a follow-up ticket?'
			]
		},
		{
			id: 'eng-35',
			num: '35',
			title: 'Writing Professional Pull Request Descriptions',
			level: 'Level 7 — Code Review & Git',
			levelColor: 'bg-blue-50 text-blue-700 border-blue-200',
			objective: 'Menyusun deskripsi PR berstandar industri: Summary ➔ What changed ➔ Why ➔ Testing evidence ➔ Risk assessment.'
		},
		{
			id: 'eng-36',
			num: '36',
			title: 'Writing Conventional Git Commit Messages',
			level: 'Level 7 — Code Review & Git',
			levelColor: 'bg-blue-50 text-blue-700 border-blue-200',
			objective: 'Menulis commit presisi dengan format conventional commit (feat, fix, refactor, perf, docs, chore).'
		},

		// LEVEL 8 — TECHNICAL WRITING
		{
			id: 'eng-37',
			num: '37',
			title: 'Writing a Clear Technical Article / Wiki',
			level: 'Level 8 — Technical Writing',
			levelColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
			objective: 'Menulis dokumentasi internal 250 kata mengenai cara kerja Redis Caching di sistem portal.'
		},
		{
			id: 'eng-38',
			num: '38',
			title: 'Writing a Request for Comments (RFC)',
			level: 'Level 8 — Technical Writing',
			levelColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
			objective: 'Menulis proposal arsitektur baru: Problem ➔ Proposed Solution ➔ Alternatives Considered ➔ Trade-offs ➔ Rollout Plan.'
		},
		{
			id: 'eng-39',
			num: '39',
			title: 'Writing a Production Incident Postmortem',
			level: 'Level 8 — Technical Writing',
			levelColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
			objective: 'Menulis laporan insiden pasca-pemadaman: Incident Summary, Timeline, Root Cause (5 Whys), Recovery, Action Items.'
		},

		// LEVEL 9 — PROFESSIONAL COMMUNICATION
		{
			id: 'eng-40',
			num: '40',
			title: 'Concise Slack & Async Chat Communication',
			level: 'Level 9 — Professional Communication',
			levelColor: 'bg-sky-50 text-sky-700 border-sky-200',
			objective: 'Mengirim pesan chat kerja yang jelas, langsung ke inti permasalahan tanpa basa-basi bertele-tele.',
			phrases: [
				'Hey @team, I\'ve deployed the hotfix to staging. Could you verify the checkout flow when you have a chance?',
				'Quick heads up: The database migration will take place tonight at 11 PM UTC.'
			]
		},
		{
			id: 'eng-41',
			num: '41',
			title: 'Writing Professional Emails to Stakeholders',
			level: 'Level 9 — Professional Communication',
			levelColor: 'bg-sky-50 text-sky-700 border-sky-200',
			objective: 'Menyusun email bisnis dengan struktur: Subject ➔ Clear Context ➔ Specific Request ➔ Call to Action ➔ Professional Sign-off.'
		},
		{
			id: 'eng-42',
			num: '42',
			title: 'Saying "No" Professionally (Setting Boundaries)',
			level: 'Level 9 — Professional Communication',
			levelColor: 'bg-sky-50 text-sky-700 border-sky-200',
			objective: 'Menolak penambahan scope fitur dadakan tanpa merusak hubungan kerja.',
			phrases: [
				'We can definitely accommodate that feature, but we would need to push back the delivery date by one week.',
				'Given our current sprint commitments, I recommend prioritizing this in the next release.'
			]
		},
		{
			id: 'eng-43',
			num: '43',
			title: 'Delivering Bad News (Release Delay / Outage)',
			level: 'Level 9 — Professional Communication',
			levelColor: 'bg-sky-50 text-sky-700 border-sky-200',
			objective: 'Menyampaikan keterlambatan rilis dengan transparansi dan menyertakan rencana mitigasi konkret.',
			phrases: [
				'The release will be postponed to Friday because we detected an edge-case memory leak during load testing. We are actively mitigating it now.'
			]
		},

		// LEVEL 10 — INTERVIEW ENGLISH
		{
			id: 'eng-44',
			num: '44',
			title: '60-Second Elevators Pitch / Introduction',
			level: 'Level 10 — Interview English',
			levelColor: 'bg-violet-50 text-violet-700 border-violet-200',
			objective: 'Menjawab pertanyaan klasik "Tell me about yourself" dengan fokus pada keahlian, pencapaian, dan passion engineering.',
			example: `"I'm a backend engineer with extensive experience in .NET, MySQL, and cloud infrastructure. Over the past few years, I've designed scalable microservices and optimized high-traffic database workloads."`
		},
		{
			id: 'eng-45',
			num: '45',
			title: 'Deep Dive Project Presentation (STAR Method)',
			level: 'Level 10 — Interview English',
			levelColor: 'bg-violet-50 text-violet-700 border-violet-200',
			objective: 'Menjelaskan proyek terbesar yang pernah dikerjakan menggunakan kerangka: Context ➔ Problem ➔ Architecture ➔ Impact.'
		},
		{
			id: 'eng-46',
			num: '46',
			title: 'Behavioral Questions (Conflict, Failures, Leadership)',
			level: 'Level 10 — Interview English',
			levelColor: 'bg-violet-50 text-violet-700 border-violet-200',
			objective: 'Menjawab pertanyaan seputar situasi sulit dengan format STAR (Situation, Task, Action, Result).'
		},
		{
			id: 'eng-47',
			num: '47',
			title: 'System Design Interview Presentation',
			level: 'Level 10 — Interview English',
			levelColor: 'bg-violet-50 text-violet-700 border-violet-200',
			objective: 'Memimpin sesi live system design: Requirements ➔ Scale estimation ➔ High-level diagram ➔ Bottlenecks ➔ Trade-offs.'
		},

		// LEVEL 11 — ADVANCED WORKPLACE ENGLISH
		{
			id: 'eng-48',
			num: '48',
			title: 'Leading a Technical Architecture Discussion',
			level: 'Level 11 — Advanced Workplace English',
			levelColor: 'bg-slate-900 text-amber-400 border-slate-700',
			objective: 'Memimpin rapat pengambilan keputusan arsitektur tim dan menyelaraskan berbagai pendapat.',
			phrases: [
				'Let\'s kick off by outlining the core constraints.',
				'Option A gives us faster delivery, while Option B provides better horizontal scalability. What are your thoughts on this trade-off?'
			]
		},
		{
			id: 'eng-49',
			num: '49',
			title: 'Presenting a Technical Proposal to Leadership',
			level: 'Level 11 — Advanced Workplace English',
			levelColor: 'bg-slate-900 text-amber-400 border-slate-700',
			objective: 'Mempresentasikan proposal migrasi teknologi (e.g. Kubernetes adoption) ke level Management/CTO dengan metrik ROI & risiko bisnis.'
		},
		{
			id: 'eng-50',
			num: '50',
			title: 'Communicating Incidents Across Diverse Audiences',
			level: 'Level 11 — Advanced Workplace English',
			levelColor: 'bg-slate-900 text-amber-400 border-slate-700',
			objective: 'Menjelaskan insiden outage yang sama dengan gaya bahasa berbeda kepada: Engineers (Deep Technical), Product Manager (Timeline & Impact), Management (Business Risk), dan Customer (Apology & Resolution).'
		}
	];

	// Interactive States
	let selectedLevel = $state('All');
	let searchQuery = $state('');
	let completedChallenges = $state<string[]>([]);
	let activeChallengeId = $state<string>(englishChallenges[0].id);
	let copiedSnippet = $state(false);

	// Load completion state from localStorage
	$effect(() => {
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('portal_english_completed');
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
			localStorage.setItem('portal_english_completed', JSON.stringify(completedChallenges));
		}
	}

	let filteredChallenges = $derived(
		englishChallenges.filter((c) => {
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
		englishChallenges.find((c) => c.id === activeChallengeId) || englishChallenges[0]
	);

	let progressPercent = $derived(
		Math.round((completedChallenges.length / englishChallenges.length) * 100)
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
	<title>Growth English - Daily & Work English Roadmap - Portal Sistem</title>
</svelte:head>

<main class="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
	
	<!-- Top Hero Banner -->
	<div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50/40 to-white border border-emerald-100/80 p-8 sm:p-10 mb-8 shadow-sm">
		<div class="absolute -right-10 -bottom-10 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none"></div>
		
		<div class="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
			<div class="max-w-3xl">
				<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-3">
					<span class="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
					Global Software Engineering Communication Track
				</div>
				<h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
					🗣️ Growth English — Daily & Work Roadmap
				</h1>
				<p class="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
					<strong>Goal:</strong> Berkomunikasi secara natural, jelas, dan percaya diri dalam lingkungan kerja global — <em>Communication first, accuracy improves with practice</em>.
				</p>

				<!-- Daily Habits Pills -->
				<div class="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-700">
					<span class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">🎙️ 10 Min Listening</span>
					<span class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">🗣️ 10 Min Speaking</span>
					<span class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">📝 Standup & PR Writing</span>
					<span class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">🤝 Meetings & Negotiations</span>
					<span class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">💼 Technical Interviews</span>
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
						class="h-full bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-300 rounded-full"
						style="width: {progressPercent}%"
					></div>
				</div>
				<div class="flex items-center justify-between text-xs text-slate-500">
					<span>{completedChallenges.length} dari {englishChallenges.length} Selesai</span>
					<span class="font-bold text-slate-700">50 Modul</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Daily & Weekly Routine Quick Cards -->
	<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
		<!-- Card 1 -->
		<div class="bg-white border border-slate-200/90 rounded-2xl p-4.5 shadow-2xs">
			<div class="flex items-center gap-2 text-xs font-bold text-slate-900 mb-2">
				<span class="w-5 h-5 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px]">⏱️</span>
				Daily Routine (30-45 Mins)
			</div>
			<p class="text-xs text-slate-600 leading-relaxed font-mono">
				• 15m: Listening / Podcast<br>
				• 15m: Speaking / Shadowing<br>
				• 10m: Writing Standup / PRs
			</p>
		</div>

		<!-- Card 2 -->
		<div class="bg-white border border-slate-200/90 rounded-2xl p-4.5 shadow-2xs">
			<div class="flex items-center gap-2 text-xs font-bold text-slate-900 mb-2">
				<span class="w-5 h-5 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center text-[10px]">💼</span>
				During Work Principle
			</div>
			<p class="text-xs text-slate-600 leading-relaxed">
				Tulis semua Git commit, PR description, Slack update, dan catatan teknis 100% dalam bahasa Inggris.
			</p>
		</div>

		<!-- Card 3 -->
		<div class="bg-white border border-slate-200/90 rounded-2xl p-4.5 shadow-2xs">
			<div class="flex items-center gap-2 text-xs font-bold text-slate-900 mb-2">
				<span class="w-5 h-5 rounded-md bg-purple-100 text-purple-700 flex items-center justify-center text-[10px]">🎯</span>
				Mindset Utama
			</div>
			<p class="text-xs text-slate-600 leading-relaxed italic">
				"Kurangi memikirkan 'Apakah grammar saya sempurna?' dan fokus pada 'Apakah lawan bicara memahami maksud saya?'"
			</p>
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
				placeholder="Cari modul English..."
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
					Daftar Modul ({filteredChallenges.length})
				</h2>
				<span class="text-[11px] text-slate-400">Pilih topik latihan</span>
			</div>

			{#if filteredChallenges.length === 0}
				<div class="bg-white border border-slate-200/80 rounded-2xl p-8 text-center text-slate-500">
					<p class="text-sm font-medium">Tidak ada modul yang cocok.</p>
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
						<h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">🎯 Learning Goal</h4>
						<p class="text-sm font-semibold text-slate-800 bg-emerald-50/60 border border-emerald-100 rounded-xl p-3.5">
							{activeChallenge.objective}
						</p>
					</div>

					<!-- Practice Prompts -->
					{#if activeChallenge.practicePrompts}
						<div>
							<h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">🗣️ Practice Prompts</h4>
							<ul class="space-y-1.5">
								{#each activeChallenge.practicePrompts as p}
									<li class="flex items-center gap-2 text-xs sm:text-sm text-slate-700 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200/60">
										<span class="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0"></span>
										<span>{p}</span>
									</li>
								{/each}
							</ul>
						</div>
					{/if}

					<!-- Real Example -->
					{#if activeChallenge.example}
						<div>
							<div class="flex items-center justify-between mb-2">
								<h4 class="text-xs font-bold uppercase tracking-wider text-slate-400">💡 Example Demonstration</h4>
								<button
									type="button"
									onclick={() => copyText(activeChallenge.example!)}
									class="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition cursor-pointer"
								>
									{copiedSnippet ? '✓ Tersalin' : '📋 Salin Contoh'}
								</button>
							</div>
							<div class="p-4 bg-slate-900 text-emerald-300 rounded-2xl text-xs sm:text-sm leading-relaxed border border-slate-800 font-sans italic">
								{activeChallenge.example}
							</div>
						</div>
					{/if}

					<!-- Useful Phrases -->
					{#if activeChallenge.phrases}
						<div>
							<div class="flex items-center justify-between mb-2">
								<h4 class="text-xs font-bold uppercase tracking-wider text-slate-400">💬 Useful Sentence Patterns</h4>
								<button
									type="button"
									onclick={() => copyText(activeChallenge.phrases!.join('\n'))}
									class="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition cursor-pointer"
								>
									{copiedSnippet ? '✓ Tersalin' : '📋 Salin Frasa'}
								</button>
							</div>
							<ul class="space-y-2">
								{#each activeChallenge.phrases as ph}
									<li class="flex items-start gap-2 text-xs sm:text-sm text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-200/80 font-medium">
										<span class="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-2"></span>
										<span>{ph}</span>
									</li>
								{/each}
							</ul>
						</div>
					{/if}

					{#if activeChallenge.rule}
						<div class="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900">
							<strong class="font-bold">⚠️ Aturan Praktik:</strong> {activeChallenge.rule}
						</div>
					{/if}

					{#if activeChallenge.successCriteria}
						<div class="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-xs text-emerald-900">
							<strong class="font-bold">🎯 Success Criteria:</strong> {activeChallenge.successCriteria}
						</div>
					{/if}

				</div>
			</div>
		</div>

	</div>

	<!-- 7-Day Work in English Challenge & Definition of Done -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
		
		<!-- 7-Day Challenge Framework -->
		<div class="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs">
			<div class="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
				</svg>
			</div>
			<h3 class="text-lg font-bold text-slate-900 mb-2">🏆 7-Day Full English Challenge</h3>
			<p class="text-xs text-slate-500 mb-4 leading-relaxed">Terapkan bahasa Inggris ke alur kerja coding nyata selama 7 hari berturut-turut:</p>
			
			<div class="space-y-2 text-xs font-mono text-slate-800 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 leading-relaxed">
				<p>• <strong>Day 1:</strong> Write daily standup in English</p>
				<p>• <strong>Day 2:</strong> Write all Git commit messages in English</p>
				<p>• <strong>Day 3:</strong> Write Pull Request descriptions in English</p>
				<p>• <strong>Day 4:</strong> Write technical documentation & notes in English</p>
				<p>• <strong>Day 5:</strong> Explain a bug / root cause in English</p>
				<p>• <strong>Day 6:</strong> Do a 10-minute technical presentation</p>
				<p>• <strong>Day 7:</strong> Full workday communication in English</p>
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
				<h3 class="text-lg font-bold text-white mb-2">🏁 The Ultimate Target</h3>
				<blockquote class="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs text-slate-200 leading-relaxed italic mb-4">
					"Think less about <em>'Is my English perfect?'</em> and more about <strong>'Did the other person understand me clearly?'</strong>. Communication first, accuracy improves with daily practice."
				</blockquote>
				<p class="text-xs text-emerald-400 font-semibold">
					💡 Target: Daily Practice ➔ More Speaking ➔ More Confidence ➔ Better Career.
				</p>
			</div>

			<div class="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
				<span>Progress: {completedChallenges.length} / 50 Selesai</span>
				<span class="text-emerald-400 font-bold">{progressPercent}%</span>
			</div>
		</div>

	</div>

</main>
