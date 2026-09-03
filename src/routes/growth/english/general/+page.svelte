<script lang="ts">
	interface GeneralEnglishChallenge {
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
		rule?: string;
		task?: string;
	}

	const levels = [
		'All',
		'Level 1 — Survival English',
		'Level 2 — Daily Life',
		'Level 3 — Everyday Conversation',
		'Level 4 — Social English',
		'Level 5 — Practical English',
		'Level 6 — Listening',
		'Level 7 — Speaking',
		'Level 8 — Vocabulary',
		'Level 9 — Grammar',
		'Level 10 — Natural English',
		'Level 11 — Advanced Communication',
		'Level 12 — Real-Life Immersion'
	];

	const generalChallenges: GeneralEnglishChallenge[] = [
		// LEVEL 1 — SURVIVAL ENGLISH
		{
			id: 'gen-01',
			num: '01',
			title: 'Natural Everyday Greetings',
			level: 'Level 1 — Survival English',
			levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
			objective: 'Menguasai variasi sapaan alami dalam berbagai suasana santai dan formal.',
			phrases: [
				'Hi / Hey there!',
				'How\'s it going?',
				'How have you been lately?',
				'What\'s up? / What have you been up to?',
				'Good to see you again!'
			],
			rule: 'Jangan hanya terpaku pada "Hello, how are you? I am fine thank you."'
		},
		{
			id: 'gen-02',
			num: '02',
			title: 'Self-Introduction for Daily Life',
			level: 'Level 1 — Survival English',
			levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
			objective: 'Bicara lancar selama 1 menit mengenai nama, tempat tinggal, hobi, dan hal yang sedang dipelajari.',
			example: `"Hey, I'm Agung. I live in Indonesia and work in tech. Outside of work, I love playing video games, exploring coffee shops, and learning new languages."`
		},
		{
			id: 'gen-03',
			num: '03',
			title: 'Basic Personal Information & Origin',
			level: 'Level 1 — Survival English',
			levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
			objective: 'Menjawab pertanyaan umum seputar asal daerah, bahasa, keluarga, dan pekerjaan secara natural.'
		},
		{
			id: 'gen-04',
			num: '04',
			title: 'Numbers, Time, Dates & Prices',
			level: 'Level 1 — Survival English',
			levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
			objective: 'Menyebutkan angka nominal harga, jam, tanggal lahir, dan jadwal perjalanan tanpa ragu.',
			scenario: `Someone asks: "What time does the train leave?"
Answer: "It leaves at a quarter past eight (8:15 AM) from platform three."`
		},
		{
			id: 'gen-05',
			num: '05',
			title: 'Asking Essential 5W1H Questions',
			level: 'Level 1 — Survival English',
			levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
			objective: 'Melatih refleks bertanya dengan What, Where, When, Why, Who, How, How much, How many.'
		},

		// LEVEL 2 — DAILY LIFE
		{
			id: 'gen-06',
			num: '06',
			title: 'Describing Your Daily Lifestyle',
			level: 'Level 2 — Daily Life',
			levelColor: 'bg-teal-50 text-teal-700 border-teal-200',
			objective: 'Bicara selama 2 menit menceritakan kebiasaan dari bangun tidur, sarapan, bekerja, santai, hingga tidur malam.'
		},
		{
			id: 'gen-07',
			num: '07',
			title: 'Talking About Family & Relationships',
			level: 'Level 2 — Daily Life',
			levelColor: 'bg-teal-50 text-teal-700 border-teal-200',
			objective: 'Menceritakan tentang orang tua, saudara kandung, dan tradisi berkumpul keluarga selama 3 menit.'
		},
		{
			id: 'gen-08',
			num: '08',
			title: 'Talking About Friends & Memories',
			level: 'Level 2 — Daily Life',
			levelColor: 'bg-teal-50 text-teal-700 border-teal-200',
			objective: 'Menceritakan bagaimana pertama kali bertemu teman dekat, hobi bersama, dan pengalaman lucu.'
		},
		{
			id: 'gen-09',
			num: '09',
			title: 'Hobbies, Gaming & Free Time',
			level: 'Level 2 — Daily Life',
			levelColor: 'bg-teal-50 text-teal-700 border-teal-200',
			objective: 'Menjelaskan mengapa kamu menyukai hobi tertentu (game, musik, film, traveling, buku).'
		},
		{
			id: 'gen-10',
			num: '10',
			title: 'Food, Drinks & Taste Preferences',
			level: 'Level 2 — Daily Life',
			levelColor: 'bg-teal-50 text-teal-700 border-teal-200',
			objective: 'Mendeskripsikan makanan favorit, tingkat kepedasan, dan makanan yang sedang diidamkan (craving).',
			phrases: [
				'I\'m really craving spicy food right now.',
				'I prefer savory dishes over sweet desserts.',
				'This noodle dish has a rich and savory broth.'
			]
		},
		{
			id: 'gen-11',
			num: '11',
			title: 'Explaining a Recipe Step-by-Step',
			level: 'Level 2 — Daily Life',
			levelColor: 'bg-teal-50 text-teal-700 border-teal-200',
			objective: 'Menjelaskan cara memasak menu simpel dengan transisi sekuensial (First ➔ Then ➔ After that ➔ Finally).'
		},
		{
			id: 'gen-12',
			num: '12',
			title: 'Shopping & Asking for Sizes/Colors',
			level: 'Level 2 — Daily Life',
			levelColor: 'bg-teal-50 text-teal-700 border-teal-200',
			objective: 'Berinteraksi di toko retail pakaian/elektronik.',
			phrases: [
				'Do you have this in a medium size?',
				'Does this come in black or navy?',
				'Can I try this on in the fitting room?',
				'I\'m just browsing for now, thank you!'
			]
		},
		{
			id: 'gen-13',
			num: '13',
			title: 'Money, Payments & Returns',
			level: 'Level 2 — Daily Life',
			levelColor: 'bg-teal-50 text-teal-700 border-teal-200',
			objective: 'Menangani pembayaran cashless/kartu, struk belanja, dan proses retur barang cacat.'
		},
		{
			id: 'gen-14',
			num: '14',
			title: 'Describing Your Home & Neighborhood',
			level: 'Level 2 — Daily Life',
			levelColor: 'bg-teal-50 text-teal-700 border-teal-200',
			objective: 'Mendeskripsikan tata ruang rumah, perabotan, dan suasana lingkungan tempat tinggal.'
		},

		// LEVEL 3 — EVERYDAY CONVERSATION
		{
			id: 'gen-15',
			num: '15',
			title: '5-Minute Small Talk Challenge',
			level: 'Level 3 — Everyday Conversation',
			levelColor: 'bg-blue-50 text-blue-700 border-blue-200',
			objective: 'Menjaga percakapan kasual mengalir selama 5 menit tanpa jeda hening yang canggung.'
		},
		{
			id: 'gen-16',
			num: '16',
			title: 'Keep Conversation Going (Answer + Add + Ask)',
			level: 'Level 3 — Everyday Conversation',
			levelColor: 'bg-blue-50 text-blue-700 border-blue-200',
			objective: 'Menerapkan pola: Jawab ➔ Tambah info ➔ Lempar pertanyaan balik.',
			example: `Q: "Do you like movies?"
A: "Yeah, definitely! I've been really into sci-fi movies lately, especially Interstellar. Have you watched anything good recently?"`
		},
		{
			id: 'gen-17',
			num: '17',
			title: 'Active Listening & Follow-Up Questions',
			level: 'Level 3 — Everyday Conversation',
			levelColor: 'bg-blue-50 text-blue-700 border-blue-200',
			objective: 'Merespons cerita orang lain dengan antusias dan pertanyaan mendalam.',
			phrases: [
				'Really? How did that turn out?',
				'What happened next?',
				'What was the best part of the trip?'
			]
		},
		{
			id: 'gen-18',
			num: '18',
			title: 'Giving Personal Opinions with Nuance',
			level: 'Level 3 — Everyday Conversation',
			levelColor: 'bg-blue-50 text-blue-700 border-blue-200',
			objective: 'Menyampaikan sudut pandang dengan variasi: Personally, As far as I\'m concerned, I feel like.'
		},
		{
			id: 'gen-19',
			num: '19',
			title: 'Expressing Agreement Naturally',
			level: 'Level 3 — Everyday Conversation',
			levelColor: 'bg-blue-50 text-blue-700 border-blue-200',
			objective: 'Menyetujui pendapat teman dengan ekspresi: Exactly, Absolutely, That\'s so true, I couldn\'t agree more.'
		},
		{
			id: 'gen-20',
			num: '20',
			title: 'Polite Disagreement (Friendly Debate)',
			level: 'Level 3 — Everyday Conversation',
			levelColor: 'bg-blue-50 text-blue-700 border-blue-200',
			objective: 'Menolak pandangan orang lain tanpa menyinggung perasaan.',
			phrases: [
				'I see what you mean, but in my experience...',
				'That\'s a fair point, though I look at it a bit differently.'
			]
		},
		{
			id: 'gen-21',
			num: '21',
			title: 'Talking About Future Plans & Possibilities',
			level: 'Level 3 — Everyday Conversation',
			levelColor: 'bg-blue-50 text-blue-700 border-blue-200',
			objective: 'Mengungkapkan rencana pasti (I\'m going to...) vs rencana tentatif (I might / I\'m thinking about...).'
		},
		{
			id: 'gen-22',
			num: '22',
			title: 'Storytelling Past Experiences',
			level: 'Level 3 — Everyday Conversation',
			levelColor: 'bg-blue-50 text-blue-700 border-blue-200',
			objective: 'Menceritakan liburan berkesan atau kejadian tak terduga dengan alur yang seru.'
		},

		// LEVEL 4 — SOCIAL ENGLISH
		{
			id: 'gen-23',
			num: '23',
			title: 'Making Friends in a New Environment',
			level: 'Level 4 — Social English',
			levelColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
			objective: 'Membuka obrolan dengan orang baru di kafe, gathering, atau komunitas.',
			phrases: [
				'Mind if I sit here?',
				'How do you know the host of the event?',
				'What brings you here today?'
			]
		},
		{
			id: 'gen-24',
			num: '24',
			title: 'Giving Genuine Compliments',
			level: 'Level 4 — Social English',
			levelColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
			objective: 'Memuji gaya berpakaian, hasil karya, atau pencapaian seseorang secara tulus.'
		},
		{
			id: 'gen-25',
			num: '25',
			title: 'Making Invitations (Hangouts & Dinner)',
			level: 'Level 4 — Social English',
			levelColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
			objective: 'Mengajak teman jalan, nonton bioskop, atau nongkrong di akhir pekan.',
			phrases: [
				'Are you free to grab coffee this Saturday?',
				'Do you want to hang out after work?'
			]
		},
		{
			id: 'gen-26',
			num: '26',
			title: 'Accepting Invitations with Enthusiasm',
			level: 'Level 4 — Social English',
			levelColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
			objective: 'Menerima ajakan: "Sounds awesome!", "Count me in!", "I\'d love to, what time?"'
		},
		{
			id: 'gen-27',
			num: '27',
			title: 'Declining Invitations Gracefully',
			level: 'Level 4 — Social English',
			levelColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
			objective: 'Menolak ajakan tanpa merusak pertemanan: "I\'d love to, but I already have plans. Maybe next weekend?"'
		},
		{
			id: 'gen-28',
			num: '28',
			title: 'Sincere Apologies & Misunderstandings',
			level: 'Level 4 — Social English',
			levelColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
			objective: 'Meminta maaf saat terlambat atau salah paham: "My bad, I completely misread the time. Sorry to keep you waiting."'
		},
		{
			id: 'gen-29',
			num: '29',
			title: 'Expressing Gratitude & Appreciation',
			level: 'Level 4 — Social English',
			levelColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
			objective: 'Mengucapkan terima kasih mendalam: "I really appreciate your help, that means a lot to me."'
		},
		{
			id: 'gen-30',
			num: '30',
			title: 'Handling Difficult Conversations Calmly',
			level: 'Level 4 — Social English',
			levelColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
			objective: 'Menyampaikan ketidaknyamanan atau komplain secara tenang dan solutif.'
		},

		// LEVEL 5 — PRACTICAL TRAVEL & SURVIVAL
		{
			id: 'gen-31',
			num: '31',
			title: 'Ordering Food at a Restaurant',
			level: 'Level 5 — Practical English',
			levelColor: 'bg-purple-50 text-purple-700 border-purple-200',
			objective: 'Minta meja, tanya rekomendasi menu, request alergi, minta bon/bill.',
			phrases: [
				'Table for two, please.',
				'What do you recommend for the main course?',
				'Could I have the dressing on the side?',
				'Could we get the check/bill, please?'
			]
		},
		{
			id: 'gen-32',
			num: '32',
			title: 'Ordering at a Specialty Café',
			level: 'Level 5 — Practical English',
			levelColor: 'bg-purple-50 text-purple-700 border-purple-200',
			objective: 'Memesan kopi dengan preferensi susu (oat milk), kadar gula (less sugar), dan take-away.'
		},
		{
			id: 'gen-33',
			num: '33',
			title: 'Hotel Check-in, Amenities & Requests',
			level: 'Level 5 — Practical English',
			levelColor: 'bg-purple-50 text-purple-700 border-purple-200',
			objective: 'Check-in hotel, minta password Wi-Fi, minta handuk ekstra, dan komplain AC kamar.'
		},
		{
			id: 'gen-34',
			num: '34',
			title: 'Airport Navigation & Immigration',
			level: 'Level 5 — Practical English',
			levelColor: 'bg-purple-50 text-purple-700 border-purple-200',
			objective: 'Menjawab pertanyaan petugas imigrasi tentang tujuan kunjungan dan durasi tinggal.'
		},
		{
			id: 'gen-35',
			num: '35',
			title: 'Public Transportation & Ride-Sharing',
			level: 'Level 5 — Practical English',
			levelColor: 'bg-purple-50 text-purple-700 border-purple-200',
			objective: 'Tanya arah stasiun, beli tiket MRT/bus, dan konfirmasi titik jemput driver online.'
		},
		{
			id: 'gen-36',
			num: '36',
			title: 'Asking for & Giving Street Directions',
			level: 'Level 5 — Practical English',
			levelColor: 'bg-purple-50 text-purple-700 border-purple-200',
			objective: 'Tanya arah jalan kaki atau berkendara (turn left, go straight, across from, next to).'
		},
		{
			id: 'gen-37',
			num: '37',
			title: 'Doctor & Pharmacy Medical Situations',
			level: 'Level 5 — Practical English',
			levelColor: 'bg-purple-50 text-purple-700 border-purple-200',
			objective: 'Menjelaskan gejala sakit (headache, fever, stomach ache, sore throat) dan membeli obat di apotek.'
		},
		{
			id: 'gen-38',
			num: '38',
			title: 'Emergency Situations & Calling for Help',
			level: 'Level 5 — Practical English',
			levelColor: 'bg-purple-50 text-purple-700 border-purple-200',
			objective: 'Melaporkan barang hilang/dicopet atau meminta bantuan medis darurat secara cepat.'
		},

		// LEVEL 6 — LISTENING
		{
			id: 'gen-39',
			num: '39',
			title: 'Daily Conversation Listening Digest',
			level: 'Level 6 — Listening',
			levelColor: 'bg-amber-50 text-amber-700 border-amber-200',
			objective: 'Mendengarkan rekaman percakapan 5-10 menit dan merangkum ide pokok serta frasa baru.'
		},
		{
			id: 'gen-40',
			num: '40',
			title: 'Watching Short Clips Without Subtitles',
			level: 'Level 6 — Listening',
			levelColor: 'bg-amber-50 text-amber-700 border-amber-200',
			objective: 'Melatih otak menangkap makna dari konteks dan intonasi tanpa bergantung pada teks.'
		},
		{
			id: 'gen-41',
			num: '41',
			title: 'Subtitle Comparison (Notice What You Missed)',
			level: 'Level 6 — Listening',
			levelColor: 'bg-amber-50 text-amber-700 border-amber-200',
			objective: 'Tonton 2 kali: Pertama tanpa subtitle ➔ Kedua dengan subtitle untuk membedakan kata yang tersambung.'
		},
		{
			id: 'gen-42',
			num: '42',
			title: 'Shadowing for Natural Pronunciation',
			level: 'Level 6 — Listening',
			levelColor: 'bg-amber-50 text-amber-700 border-amber-200',
			objective: 'Tirukan penutur asli secara instan (Listen ➔ Pause ➔ Repeat with same rhythm).'
		},
		{
			id: 'gen-43',
			num: '43',
			title: 'Comprehending Global Accents',
			level: 'Level 6 — Listening',
			levelColor: 'bg-amber-50 text-amber-700 border-amber-200',
			objective: 'Mendengarkan aksen American, British, Australian, dan Asian English.'
		},

		// LEVEL 7 — SPEAKING
		{
			id: 'gen-44',
			num: '44',
			title: '60-Second Nonstop Speaking Challenge',
			level: 'Level 7 — Speaking',
			levelColor: 'bg-rose-50 text-rose-700 border-rose-200',
			objective: 'Bicara tentang topik acak (makanan, traveling, game) selama 60 detik penuh tanpa jeda terjemahan.'
		},
		{
			id: 'gen-45',
			num: '45',
			title: '2-Minute Structured Speech',
			level: 'Level 7 — Speaking',
			levelColor: 'bg-rose-50 text-rose-700 border-rose-200',
			objective: 'Menyusun monolog 2 menit dengan struktur: Pembuka ➔ Poin Utama ➔ Contoh Nyata ➔ Penutup.'
		},
		{
			id: 'gen-46',
			num: '46',
			title: 'Spontaneous Random Topic Talking',
			level: 'Level 7 — Speaking',
			levelColor: 'bg-rose-50 text-rose-700 border-rose-200',
			objective: 'Merespons topik tak terduga (Coffee, Cats, Money, AI) langsung dalam hitungan detik.'
		},
		{
			id: 'gen-47',
			num: '47',
			title: 'Explaining a Concept You Love',
			level: 'Level 7 — Speaking',
			levelColor: 'bg-rose-50 text-rose-700 border-rose-200',
			objective: 'Menjelaskan mekanisme game, cara memakai aplikasi, atau tips produktivitas kepada teman.'
		},
		{
			id: 'gen-48',
			num: '48',
			title: 'Dynamic Storytelling (Problem ➔ Result ➔ Lesson)',
			level: 'Level 7 — Speaking',
			levelColor: 'bg-rose-50 text-rose-700 border-rose-200',
			objective: 'Menceritakan sebuah drama/kejadian dengan membangun emosi dan pesan moral di akhir cerita.'
		},

		// LEVEL 8 — VOCABULARY
		{
			id: 'gen-49',
			num: '49',
			title: 'Everyday Collocations in Context',
			level: 'Level 8 — Vocabulary',
			levelColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
			objective: 'Menghafal kosakata dalam bentuk kalimat utuh, bukan kata terisolasi.',
			rule: 'Contoh: Jangan hafal "exhausted = lelah", tapi hafal "I\'m completely exhausted after a long drive."'
		},
		{
			id: 'gen-50',
			num: '50',
			title: 'Top 20 Essential Phrasal Verbs',
			level: 'Level 8 — Vocabulary',
			levelColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
			objective: 'Menguasai phrasal verbs harian: figure out, run out of, hang out, pick up, give up, look forward to.',
			phrases: [
				'I need to figure out how this works.',
				'We ran out of milk this morning.',
				'I\'m really looking forward to the weekend!'
			]
		},
		{
			id: 'gen-51',
			num: '51',
			title: 'Common Natural Expressions & Idioms',
			level: 'Level 8 — Vocabulary',
			levelColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
			objective: 'Menggunakan ungkapan: "Sounds good", "No worries", "Fair enough", "Give me a second", "It depends".'
		},
		{
			id: 'gen-52',
			num: '52',
			title: 'Casual Spoken Reductions (Gonna, Wanna, Gotta)',
			level: 'Level 8 — Vocabulary',
			levelColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
			objective: 'Memahami kapan menggunakan bahasa lisan santai (gonna, wanna, gotta, kinda) dalam obrolan santai.'
		},

		// LEVEL 9 — GRAMMAR
		{
			id: 'gen-53',
			num: '53',
			title: 'Present Tenses in Real Life (Simple vs Continuous)',
			level: 'Level 9 — Grammar',
			levelColor: 'bg-sky-50 text-sky-700 border-sky-200',
			objective: 'Membedakan kebiasaan umum (I work from home) vs hal yang sedang terjadi sekarang (I\'m working on a project).'
		},
		{
			id: 'gen-54',
			num: '54',
			title: 'Past Tenses & Present Perfect (I went vs I have been)',
			level: 'Level 9 — Grammar',
			levelColor: 'bg-sky-50 text-sky-700 border-sky-200',
			objective: 'Membedakan waktu lampau spesifik (I went yesterday) vs pengalaman hidup (I have visited Japan twice).'
		},
		{
			id: 'gen-55',
			num: '55',
			title: 'Future Tenses (Will vs Going to vs Planning to)',
			level: 'Level 9 — Grammar',
			levelColor: 'bg-sky-50 text-sky-700 border-sky-200',
			objective: 'Menggunakan bentuk masa depan sesuai tingkat kepastian rencana.'
		},
		{
			id: 'gen-56',
			num: '56',
			title: 'Auxiliary & Modal Questions (Do / Did / Would / Could)',
			level: 'Level 9 — Grammar',
			levelColor: 'bg-sky-50 text-sky-700 border-sky-200',
			objective: 'Membuat pertanyaan sopan menggunakan Would you mind...? atau Could you please...?'
		},
		{
			id: 'gen-57',
			num: '57',
			title: 'Conditional Situations (If I have time vs If I were you)',
			level: 'Level 9 — Grammar',
			levelColor: 'bg-sky-50 text-sky-700 border-sky-200',
			objective: 'Melatih pengandaian nyata (If it rains, I\'ll stay home) vs pengandaian imajinatif (If I won the lottery, I would travel).'
		},
		{
			id: 'gen-58',
			num: '58',
			title: 'Common Indonesian-English Mistakes Fix',
			level: 'Level 9 — Grammar',
			levelColor: 'bg-sky-50 text-sky-700 border-sky-200',
			objective: 'Memperbaiki kesalahan umum yang sering terjadi.',
			phrases: [
				'❌ "I am agree" ➔ ✅ "I agree"',
				'❌ "He don\'t know" ➔ ✅ "He doesn\'t know"',
				'❌ "I have 25 years" ➔ ✅ "I am 25 years old"',
				'❌ "Thanks before" ➔ ✅ "Thanks in advance"'
			]
		},

		// LEVEL 10 — NATURAL ENGLISH
		{
			id: 'gen-59',
			num: '59',
			title: 'Stop Direct Translation (Think in English)',
			level: 'Level 10 — Natural English',
			levelColor: 'bg-violet-50 text-violet-700 border-violet-200',
			objective: 'Merespons pertanyaan langsung dari makna ke bahasa Inggris tanpa menerjemahkan di dalam kepala.'
		},
		{
			id: 'gen-60',
			num: '60',
			title: 'Natural Filler Words (Well, Actually, Honestly)',
			level: 'Level 10 — Natural English',
			levelColor: 'bg-violet-50 text-violet-700 border-violet-200',
			objective: 'Menggunakan filler words untuk memberi waktu berpikir tanpa terdengar macet: "Well, to be honest...", "Let me think about that for a second..."'
		},
		{
			id: 'gen-61',
			num: '61',
			title: 'Rephrasing When You Forget a Specific Word',
			level: 'Level 10 — Natural English',
			levelColor: 'bg-violet-50 text-violet-700 border-violet-200',
			objective: 'Menjelaskan definisi kata saat lupa vocab tertentu (misal lupa "screwdriver" ➔ "that tool you use to turn screws").'
		},
		{
			id: 'gen-62',
			num: '62',
			title: 'Natural Conversational Reactions',
			level: 'Level 10 — Natural English',
			levelColor: 'bg-violet-50 text-violet-700 border-violet-200',
			objective: 'Merespons dengan emosi alami: "No way!", "Seriously?", "That\'s insane!", "Good for you!", "I get what you mean."'
		},
		{
			id: 'gen-63',
			num: '63',
			title: 'Conversation Recovery When You Miss a Word',
			level: 'Level 10 — Natural English',
			levelColor: 'bg-violet-50 text-violet-700 border-violet-200',
			objective: 'Meminta pengulangan dengan percaya diri: "Sorry, I didn\'t catch that last part. Could you say that again a bit slower?"'
		},

		// LEVEL 11 — ADVANCED COMMUNICATION
		{
			id: 'gen-64',
			num: '64',
			title: 'In-Depth Opinion & Counter-Arguments',
			level: 'Level 11 — Advanced Communication',
			levelColor: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200',
			objective: 'Menyampaikan opini mendalam seputar AI, sosial media, atau lifestyle dengan menyertakan sanggahan balik.'
		},
		{
			id: 'gen-65',
			num: '65',
			title: 'Friendly Debate (Remote vs Office, Console vs PC)',
			level: 'Level 11 — Advanced Communication',
			levelColor: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200',
			objective: 'Mempertahankan argumen logis dalam perdebatan santai tanpa tensi emosi.'
		},
		{
			id: 'gen-66',
			num: '66',
			title: 'Weighing Pros & Cons (Balanced Viewpoint)',
			level: 'Level 11 — Advanced Communication',
			levelColor: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200',
			objective: 'Membahas sisi positif dan risiko dari sebuah keputusan besar (pindah kota, beli gadget baru).'
		},
		{
			id: 'gen-67',
			num: '67',
			title: 'The Art of Persuasion & Recommendations',
			level: 'Level 11 — Advanced Communication',
			levelColor: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200',
			objective: 'Meyakinkan teman untuk mencoba film, restoran, game, atau destinasi wisata favoritmu.'
		},
		{
			id: 'gen-68',
			num: '68',
			title: '5-Minute Rich Narrative Storytelling',
			level: 'Level 11 — Advanced Communication',
			levelColor: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200',
			objective: 'Bercerita panjang dengan membangun karakter, konflik, puncak masalah, dan resolusi.'
		},

		// LEVEL 12 — REAL-LIFE IMMERSION
		{
			id: 'gen-69',
			num: '69',
			title: 'Full Day English Immersion',
			level: 'Level 12 — Real-Life Immersion',
			levelColor: 'bg-slate-900 text-amber-400 border-slate-700',
			objective: 'Ubah bahasa smartphone, OS komputer, browser search query, dan catatan harian ke dalam bahasa Inggris selama 1 hari penuh.'
		},
		{
			id: 'gen-70',
			num: '70',
			title: '60-Minute English-Only Challenge',
			level: 'Level 12 — Real-Life Immersion',
			levelColor: 'bg-slate-900 text-amber-400 border-slate-700',
			objective: 'Lakukan sesi membaca, menonton video YouTube, dan berbicara sendiri selama 1 jam tanpa beralih ke bahasa Indonesia.'
		},
		{
			id: 'gen-71',
			num: '71',
			title: 'Movie / TV Series Two-Pass Analysis',
			level: 'Level 12 — Real-Life Immersion',
			levelColor: 'bg-slate-900 text-amber-400 border-slate-700',
			objective: 'Tonton 1 episode serial favorit: Pass 1 dengan subtitle Inggris ➔ Pass 2 audio only, lalu tulis rangkuman 1 paragraf.'
		},
		{
			id: 'gen-72',
			num: '72',
			title: 'Unpaused Video Listening Tolerance',
			level: 'Level 12 — Real-Life Immersion',
			levelColor: 'bg-slate-900 text-amber-400 border-slate-700',
			objective: 'Tonton video selama 20 menit tanpa pernah menekan tombol pause untuk membiasakan otak menerima pemahaman parsial.'
		},
		{
			id: 'gen-73',
			num: '73',
			title: 'Live English Gaming Session',
			level: 'Level 12 — Real-Life Immersion',
			levelColor: 'bg-slate-900 text-amber-400 border-slate-700',
			objective: 'Gunakan voice chat saat bermain game online (callout musuh, koordinasi strategi, dan reaksi santai).',
			phrases: [
				'Watch out, enemies behind us!',
				'I\'m pushing the objective, cover me!',
				'Nice shot! Great teamwork.'
			]
		},
		{
			id: 'gen-74',
			num: '74',
			title: 'Daily English Voice Journal (Nightly Habit)',
			level: 'Level 12 — Real-Life Immersion',
			levelColor: 'bg-slate-900 text-amber-400 border-slate-700',
			objective: 'Rekam suara 2-3 menit setiap malam menceritakan: What happened today? What did I learn? What am I doing tomorrow?'
		}
	];

	// Interactive States
	let selectedLevel = $state('All');
	let searchQuery = $state('');
	let completedChallenges = $state<string[]>([]);
	let activeChallengeId = $state<string>(generalChallenges[0].id);
	let copiedSnippet = $state(false);

	// Load completion state from localStorage
	$effect(() => {
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('portal_general_english_completed');
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
			localStorage.setItem('portal_general_english_completed', JSON.stringify(completedChallenges));
		}
	}

	let filteredChallenges = $derived(
		generalChallenges.filter((c) => {
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
		generalChallenges.find((c) => c.id === activeChallengeId) || generalChallenges[0]
	);

	let progressPercent = $derived(
		Math.round((completedChallenges.length / generalChallenges.length) * 100)
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
	<title>Growth English - General & Daily Life Roadmap - Portal Sistem</title>
</svelte:head>

<main class="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
	
	<!-- Top Hero Banner -->
	<div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-50 via-cyan-50/40 to-white border border-teal-100/80 p-8 sm:p-10 mb-8 shadow-sm">
		<div class="absolute -right-10 -bottom-10 w-72 h-72 bg-teal-200/30 rounded-full blur-3xl pointer-events-none"></div>
		
		<div class="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
			<div class="max-w-3xl">
				<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/80 border border-teal-200 text-teal-800 text-xs font-semibold mb-3">
					<span class="w-2 h-2 rounded-full bg-teal-600 animate-pulse"></span>
					General & Everyday Life English Track
				</div>
				<h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
					🌍 Growth English — General & Daily Roadmap
				</h1>
				<p class="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
					Sistem pembelajaran praktis untuk kehidupan sehari-hari, percakapan sosial, kuliner, traveling, gaming, dan media hiburan — <em>Learn ➔ Use ➔ Make mistakes ➔ Correct ➔ Become natural</em>.
				</p>

				<!-- Learning Highlights -->
				<div class="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-700">
					<span class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">☕ Food, Café & Dining</span>
					<span class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">✈️ Travel, Hotels & Flights</span>
					<span class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">🎮 English Gaming & Chats</span>
					<span class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">🗣️ Small Talk & Socializing</span>
					<span class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">🎙️ Daily Voice Journaling</span>
				</div>
			</div>

			<!-- Progress Tracker Card -->
			<div class="bg-white/95 border border-slate-200/90 rounded-2xl p-5 shadow-xs shrink-0 w-full lg:w-72">
				<div class="flex items-center justify-between mb-2">
					<span class="text-xs font-bold text-slate-700 uppercase tracking-wider">Progress Path</span>
					<span class="text-xs font-black text-teal-600">{progressPercent}% Selesai</span>
				</div>
				<!-- Progress Bar -->
				<div class="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mb-3 border border-slate-200">
					<div
						class="h-full bg-gradient-to-r from-teal-500 to-cyan-600 transition-all duration-300 rounded-full"
						style="width: {progressPercent}%"
					></div>
				</div>
				<div class="flex items-center justify-between text-xs text-slate-500">
					<span>{completedChallenges.length} dari {generalChallenges.length} Selesai</span>
					<span class="font-bold text-slate-700">74 Modul</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Filter & Search Toolbar -->
	<div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs">
		<!-- Level Filter Dropdown -->
		<div class="flex items-center gap-3">
			<span class="text-xs font-bold text-slate-700 uppercase tracking-wider shrink-0 flex items-center gap-1.5">
				<svg class="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
				</svg>
				Filter Level:
			</span>
			<div class="relative w-full sm:w-64">
				<select
					bind:value={selectedLevel}
					class="w-full pl-3 pr-8 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold rounded-xl text-slate-800 focus:outline-none focus:border-teal-500 cursor-pointer appearance-none transition"
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
				placeholder="Cari topik percakapan..."
				class="w-full pl-9 pr-3 py-2 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 text-xs text-slate-900 rounded-xl focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 placeholder-slate-400 transition"
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
						class="w-full text-left p-4 rounded-2xl border transition duration-150 cursor-pointer flex flex-col justify-between {isActive ? 'bg-white border-teal-500 shadow-md ring-2 ring-teal-500/10' : 'bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-xs'}"
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
								<span class="inline-flex items-center gap-1 text-[11px] font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
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
							class="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl transition cursor-pointer {completedChallenges.includes(activeChallenge.id) ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-xs' : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'}"
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
						<p class="text-sm font-semibold text-slate-800 bg-teal-50/60 border border-teal-100 rounded-xl p-3.5">
							{activeChallenge.objective}
						</p>
					</div>

					<!-- Scenario -->
					{#if activeChallenge.scenario}
						<div>
							<h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">📋 Real-Life Scenario</h4>
							<pre class="text-xs text-slate-700 whitespace-pre-line bg-slate-50 border border-slate-200/80 rounded-2xl p-4 font-sans leading-relaxed">{activeChallenge.scenario}</pre>
						</div>
					{/if}

					<!-- Real Example -->
					{#if activeChallenge.example}
						<div>
							<div class="flex items-center justify-between mb-2">
								<h4 class="text-xs font-bold uppercase tracking-wider text-slate-400">💡 Natural Example</h4>
								<button
									type="button"
									onclick={() => copyText(activeChallenge.example!)}
									class="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition cursor-pointer"
								>
									{copiedSnippet ? '✓ Tersalin' : '📋 Salin Contoh'}
								</button>
							</div>
							<div class="p-4 bg-slate-900 text-teal-300 rounded-2xl text-xs sm:text-sm leading-relaxed border border-slate-800 font-sans italic">
								{activeChallenge.example}
							</div>
						</div>
					{/if}

					<!-- Useful Phrases -->
					{#if activeChallenge.phrases}
						<div>
							<div class="flex items-center justify-between mb-2">
								<h4 class="text-xs font-bold uppercase tracking-wider text-slate-400">💬 Useful Sentence Expressions</h4>
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
										<span class="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0 mt-2"></span>
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

				</div>
			</div>
		</div>

	</div>

	<!-- 30-Day Immersion Framework -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
		
		<!-- 30-Day Plan -->
		<div class="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs">
			<div class="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 text-teal-600 flex items-center justify-center mb-4">
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
				</svg>
			</div>
			<h3 class="text-lg font-bold text-slate-900 mb-2">📅 30-Day Daily Habit Plan</h3>
			<p class="text-xs text-slate-500 mb-4 leading-relaxed">Konsistensi harian 15–30 menit jauh lebih berdampak daripada belajar 5 jam seminggu sekali:</p>
			
			<div class="space-y-2 text-xs font-mono text-slate-800 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 leading-relaxed">
				<p>• <strong>Week 1 (Day 1-7):</strong> Survival, Family, Food, Small Talk</p>
				<p>• <strong>Week 2 (Day 8-14):</strong> Shopping, Home, Future Plans, Opinions</p>
				<p>• <strong>Week 3 (Day 15-21):</strong> Restaurant, Airport, Hotel, Directions</p>
				<p>• <strong>Week 4 (Day 22-30):</strong> Storytelling, Gaming, Immersion & Voice Journal</p>
			</div>
		</div>

		<!-- Final Mindset -->
		<div class="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 shadow-xl flex flex-col justify-between">
			<div>
				<div class="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center mb-4">
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
					</svg>
				</div>
				<h3 class="text-lg font-bold text-white mb-2">🏁 The Ultimate Philosophy</h3>
				<blockquote class="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs text-slate-200 leading-relaxed italic mb-4">
					"English is not a subject you finish. It is a practical life skill you continuously use to <strong>wake up, read, watch, chat, game, travel, and live</strong>."
				</blockquote>
				<p class="text-xs text-teal-400 font-semibold">
					💡 Target: Understand ➔ Speak ➔ Interact ➔ Express Ideas ➔ Live Naturally.
				</p>
			</div>

			<div class="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
				<span>Progress: {completedChallenges.length} / 74 Selesai</span>
				<span class="text-teal-400 font-bold">{progressPercent}%</span>
			</div>
		</div>

	</div>

</main>
