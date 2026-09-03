<script lang="ts">
	interface K8sChallenge {
		id: string;
		num: string;
		title: string;
		level: string;
		levelColor: string;
		objective: string;
		scenario: string;
		tasks?: string[];
		commands?: string;
		yamlSnippet?: string;
		architecture?: string;
		metrics?: string[];
		questions: string[];
		important?: string;
		bonus?: string;
	}

	const levels = [
		'All',
		'Level 1 — Fundamentals',
		'Level 2 — Configuration',
		'Level 3 — Resources & Scheduling',
		'Level 4 — Storage',
		'Level 5 — Autoscaling',
		'Level 6 — Networking & Reliability',
		'Final Challenge'
	];

	const k8sChallenges: K8sChallenge[] = [
		// LEVEL 1
		{
			id: 'k8s-01',
			num: '01',
			title: 'Your First Pod',
			level: 'Level 1 — Fundamentals',
			levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
			objective: 'Menjalankan container pertama menggunakan Kubernetes Pod declarative manifest.',
			scenario: `Gunakan image nginx:alpine dan buat manifest pod: nginx-pod.yaml`,
			tasks: [
				'Buat manifest Pod (nginx-pod.yaml)',
				'Deploy ke cluster dengan kubectl apply',
				'Cek status Pod (Running)',
				'Lihat stdout logs container',
				'Hapus Pod dan amati behavior cluster'
			],
			yamlSnippet: `apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  labels:
    app: web
spec:
  containers:
  - name: nginx
    image: nginx:alpine
    ports:
    - containerPort: 80`,
			commands: `kubectl apply -f nginx-pod.yaml
kubectl get pods
kubectl describe pod nginx-pod
kubectl logs nginx-pod
kubectl delete pod nginx-pod`,
			questions: [
				'Apa itu Pod di dalam Kubernetes?',
				'Kenapa Kubernetes menggunakan konsep Pod, bukan langsung container?',
				'Apa yang terjadi ketika Pod dihapus?'
			]
		},
		{
			id: 'k8s-02',
			num: '02',
			title: 'Deployment & Self-Healing',
			level: 'Level 1 — Fundamentals',
			levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
			objective: 'Menggunakan Deployment untuk menjalankan dan mereplikasi aplikasi secara declarative.',
			scenario: `Deploy API sederhana (api:v1) dengan 3 replicas.
Deployment ➔ ReplicaSet ➔ Pod #1, Pod #2, Pod #3`,
			tasks: [
				'Buat manifest Deployment dengan 3 replicas',
				'Deploy ke cluster dan amati ReplicaSet yang dibuat',
				'Scale manual menjadi 5 replicas',
				'Scale kembali menjadi 2 replicas'
			],
			yamlSnippet: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
      - name: api
        image: nginx:alpine # ganti dengan image api kamu
        ports:
        - containerPort: 80`,
			commands: `kubectl apply -f deployment.yaml
kubectl get deployments
kubectl get pods -l app=api
kubectl scale deployment api-deployment --replicas=5
kubectl scale deployment api-deployment --replicas=2`,
			questions: [
				'Apa bedanya Pod dengan Deployment?',
				'Apa yang terjadi jika satu Pod tiba-tiba di-kill secara paksa?',
				'Komponen Kubernetes apa yang bertugas membuat Pod pengganti?'
			]
		},
		{
			id: 'k8s-03',
			num: '03',
			title: 'Service & ClusterIP Load Balancing',
			level: 'Level 1 — Fundamentals',
			levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
			objective: 'Membuat aplikasi bisa diakses melalui stable network endpoint dan load balancing internal.',
			architecture: `Client ──► Service (ClusterIP)
                 ├── Pod #1 (IP: 10.244.1.5)
                 ├── Pod #2 (IP: 10.244.2.8)
                 └── Pod #3 (IP: 10.244.1.9)`,
			scenario: `Ekspos 3 API Pods menggunakan Service ClusterIP dengan selector label yang cocok.`,
			tasks: [
				'Buat manifest Service tipe ClusterIP',
				'Hubungkan Service dengan Deployment via label selector',
				'Cek endpoints terdaftar di Service',
				'Uji akses konektivitas internal'
			],
			yamlSnippet: `apiVersion: v1
kind: Service
metadata:
  name: api-service
spec:
  type: ClusterIP
  selector:
    app: api
  ports:
  - port: 80
    targetPort: 80`,
			commands: `kubectl apply -f service.yaml
kubectl get services
kubectl get endpoints api-service
kubectl describe service api-service`,
			questions: [
				'Kenapa client tidak sebaiknya connect langsung ke IP Pod?',
				'Apa fungsi utama Service di Kubernetes?',
				'Bagaimana Service tahu Pod mana saja yang berhak menerima traffic?'
			]
		},

		// LEVEL 2
		{
			id: 'k8s-04',
			num: '04',
			title: 'ConfigMap Configuration',
			level: 'Level 2 — Configuration',
			levelColor: 'bg-amber-50 text-amber-700 border-amber-200',
			objective: 'Memisahkan konfigurasi aplikasi dari container image tanpa perlu rebuild image.',
			scenario: `API membutuhkan konfigurasi environment:
APP_ENV=development
LOG_LEVEL=info
PORT=3000`,
			tasks: [
				'Buat manifest ConfigMap',
				'Inject environment variables dari ConfigMap ke Pod Deployment',
				'Ubah value di ConfigMap tanpa rebuild image Docker'
			],
			yamlSnippet: `apiVersion: v1
kind: ConfigMap
metadata:
  name: api-config
data:
  APP_ENV: "development"
  LOG_LEVEL: "info"
  PORT: "3000"
---
# Di dalam Deployment spec.template.spec.containers[0]:
# envFrom:
# - configMapRef:
#     name: api-config`,
			commands: `kubectl apply -f configmap.yaml
kubectl get configmaps
kubectl describe configmap api-config
kubectl exec -it <pod-name> -- printenv`,
			questions: [
				'Kenapa konfigurasi sebaiknya dipisahkan dari Docker image?',
				'Apa perbedaan mendasar antara ConfigMap dan Secret?'
			]
		},
		{
			id: 'k8s-05',
			num: '05',
			title: 'Secret Management',
			level: 'Level 2 — Configuration',
			levelColor: 'bg-amber-50 text-amber-700 border-amber-200',
			objective: 'Mengelola konfigurasi sensitif (password, token, connection string).',
			scenario: `API membutuhkan credentials sensitif:
DATABASE_URL=postgres://user:pass@db:5432/app
JWT_SECRET=super-secret-key-12345`,
			tasks: [
				'Buat Kubernetes Secret (Opaque)',
				'Inject Secret sebagai environment variables ke Pod Deployment',
				'Pastikan Secret tidak berada di git repository atau Dockerfile'
			],
			yamlSnippet: `apiVersion: v1
kind: Secret
metadata:
  name: api-secret
type: Opaque
stringData:
  DATABASE_URL: "postgres://user:secretpass@postgres:5432/portal"
  JWT_SECRET: "my-ultra-secure-jwt-signing-key"`,
			important: 'Default Kubernetes Secret di-encode Base64. Di production, pastikan cluster menggunakan KMS Encryption at Rest atau HashiCorp Vault.',
			questions: [
				'Apa perbedaan Secret vs ConfigMap?',
				'Siapa yang memiliki akses membaca Secret di RBAC Kubernetes?',
				'Bagaimana Secret seharusnya dikelola di lingkungan production?'
			]
		},
		{
			id: 'k8s-06',
			num: '06',
			title: 'Liveness & Readiness Health Checks',
			level: 'Level 2 — Configuration',
			levelColor: 'bg-amber-50 text-amber-700 border-amber-200',
			objective: 'Membuat Kubernetes tahu apakah aplikasi sehat dan siap menerima traffic jaringan.',
			scenario: `Implementasikan endpoint:
GET /health (livenessProbe: apakah pod hidup atau harus direstart?)
GET /ready (readinessProbe: apakah pod siap menerima traffic?)`,
			tasks: [
				'Tambahkan konfigurasi livenessProbe dan readinessProbe pada Deployment',
				'Simulasikan aplikasi dengan startup lambat (initialDelaySeconds)',
				'Simulasikan probe gagal dan amati reaksi auto-restart / drop traffic'
			],
			yamlSnippet: `spec:
  containers:
  - name: api
    image: my-api:v1
    livenessProbe:
      httpGet:
        path: /health
        port: 3000
      initialDelaySeconds: 15
      periodSeconds: 10
    readinessProbe:
      httpGet:
        path: /ready
        port: 3000
      initialDelaySeconds: 5
      periodSeconds: 5`,
			questions: [
				'Apa bedanya livenessProbe vs readinessProbe?',
				'Kenapa aplikasi yang belum ready TIDAK BOLEH menerima traffic?',
				'Apa yang terjadi ketika liveness probe gagal 3 kali berturut-turut?'
			]
		},

		// LEVEL 3
		{
			id: 'k8s-07',
			num: '07',
			title: 'CPU & Memory Limits (OOMKilled & Throttling)',
			level: 'Level 3 — Resources & Scheduling',
			levelColor: 'bg-orange-50 text-orange-700 border-orange-200',
			objective: 'Mengatur alokasi batas resource CPU dan RAM agar pod tidak memonopoli node cluster.',
			scenario: `Set resource requests & limits pada container:
requests: cpu: 100m, memory: 128Mi
limits: cpu: 500m, memory: 512Mi

Uji beban dengan k6 dan amati CPU throttling vs OOMKilled.`,
			tasks: [
				'Konfigurasikan requests dan limits di spec container',
				'Jalankan stress load k6 ke endpoint API',
				'Amati metrik dengan kubectl top pods',
				'Simulasikan memory leak hingga status OOMKilled muncul'
			],
			yamlSnippet: `resources:
  requests:
    cpu: "100m"
    memory: "128Mi"
  limits:
    cpu: "500m"
    memory: "512Mi"`,
			commands: `kubectl top pods
kubectl top nodes
kubectl describe pod <pod-name> # perhatikan status Last State: OOMKilled`,
			questions: [
				'Apa perbedaan antara Resource Request dan Resource Limit?',
				'Apa yang terjadi ketika memory melebihi Limit vs CPU melebihi Limit?',
				'Kenapa CPU limit yang terlalu ketat bisa merusak latency p95?'
			]
		},
		{
			id: 'k8s-08',
			num: '08',
			title: 'Manual Horizontal Scaling & Benchmark',
			level: 'Level 3 — Resources & Scheduling',
			levelColor: 'bg-orange-50 text-orange-700 border-orange-200',
			objective: 'Menguji performa throughput saat replica pod ditambah secara manual.',
			scenario: `Bandingkan kapasitas throughput:
2 Pods ➔ 5 Pods ➔ 10 Pods dengan k6 load test (100, 500, 1,000 VUs).`,
			tasks: [
				'Scale deployment ke 2, 5, dan 10 replicas',
				'Jalankan load test k6 pada setiap level replica',
				'Catat RPS, p95 latency, dan error rate ke tabel perbandingan'
			],
			commands: `kubectl scale deployment api-deployment --replicas=2
# Jalankan k6 test...
kubectl scale deployment api-deployment --replicas=5
# Jalankan k6 test...
kubectl scale deployment api-deployment --replicas=10`,
			questions: [
				'Apakah RPS naik secara linear seiring penambahan Pod?',
				'Apa bottleneck baru yang muncul setelah API di-scale?',
				'Kapan database mulai menjadi bottleneck utama?'
			]
		},
		{
			id: 'k8s-09',
			num: '09',
			title: 'Rolling Update & Rollback',
			level: 'Level 3 — Resources & Scheduling',
			levelColor: 'bg-orange-50 text-orange-700 border-orange-200',
			objective: 'Deploy update versi aplikasi baru secara bertahap tanpa downtime dan rollback jika terjadi bug.',
			scenario: `Update image dari api:v1 ➔ api:v2.
Kubernetes mengganti pod lama dengan pod baru satu per satu secara bertahap.`,
			tasks: [
				'Deploy image v1',
				'Update image ke v2 menggunakan kubectl set image',
				'Pantau status rollout dan history',
				'Simulasikan bug di v2 lalu lakukan rollback instan dengan rollout undo'
			],
			commands: `kubectl set image deployment/api-deployment api=my-api:v2 --record
kubectl rollout status deployment/api-deployment
kubectl rollout history deployment/api-deployment
kubectl rollout undo deployment/api-deployment`,
			questions: [
				'Bagaimana Kubernetes menghindari semua Pod mati bersamaan saat update?',
				'Apa peran vital readinessProbe dalam mekanisme rolling update?',
				'Bagaimana cara rollback ke versi revisi spesifik?'
			]
		},
		{
			id: 'k8s-10',
			num: '10',
			title: 'Zero-Downtime Deployment Verification',
			level: 'Level 3 — Resources & Scheduling',
			levelColor: 'bg-orange-50 text-orange-700 border-orange-200',
			objective: 'Membuktikan secara empiris bahwa proses deployment tidak menyebabkan 1 request pun gagal (0% Error Rate).',
			scenario: `Jalankan load test k6 kontinu (constant RPS) selama 3 menit.
Di tengah-tengah load test, lakukan rolling update v1 ➔ v2.`,
			tasks: [
				'Mulai pengujian k6 kontinu (e.g. 50 RPS)',
				'Eksekusi kubectl set image ke v2 saat load sedang berjalan',
				'Pastikan threshold http_req_failed rate < 0.001 (0% error)'
			],
			questions: [
				'Apakah ada request yang gagal saat transisi pod lama ke pod baru?',
				'Apa yang terjadi jika startup container v2 memakan waktu 30 detik tanpa readiness probe?'
			]
		},

		// LEVEL 4
		{
			id: 'k8s-11',
			num: '11',
			title: 'Persistent Volume (PV & PVC)',
			level: 'Level 4 — Storage',
			levelColor: 'bg-rose-50 text-rose-700 border-rose-200',
			objective: 'Menyimpan data stateful secara persisten agar data tidak hilang ketika pod restart atau crash.',
			architecture: `PostgreSQL Pod ──► PersistentVolumeClaim (PVC) ──► PersistentVolume (Disk)`,
			scenario: `Deploy PostgreSQL dengan PVC.
Insert data ➔ Hapus Pod PostgreSQL ➔ Tunggu Pod baru spawn ➔ Verifikasi data masih utuh.`,
			tasks: [
				'Buat PersistentVolumeClaim (1Gi RWO)',
				'Mount PVC ke /var/lib/postgresql/data pada Pod PostgreSQL',
				'Tulis data ke database dan delete pod secara manual',
				'Cek query pada pod baru untuk memastikan data selamat'
			],
			yamlSnippet: `apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: postgres-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi`,
			commands: `kubectl get pv
kubectl get pvc
kubectl delete pod <postgres-pod-name>
kubectl get pods -w`,
			questions: [
				'Kenapa filesystem internal container tidak cukup untuk database?',
				'Apa perbedaan antara PersistentVolume (PV) dan PersistentVolumeClaim (PVC)?',
				'Apa arti Access Mode ReadWriteOnce (RWO) vs ReadWriteMany (RWX)?'
			]
		},
		{
			id: 'k8s-12',
			num: '12',
			title: 'Full PostgreSQL + API Integration',
			level: 'Level 4 — Storage',
			levelColor: 'bg-rose-50 text-rose-700 border-rose-200',
			objective: 'Menghubungkan multi-instance API Pods dengan database PostgreSQL via Internal DNS Service.',
			architecture: `Client ──► API Service (Load Balanced)
                 ├── API Pod #1 ──┐
                 ├── API Pod #2 ──┼──► postgres-service:5432 ──► PVC
                 └── API Pod #3 ──┘`,
			scenario: `Deploy PostgreSQL + Service + PVC, lalu deploy API Deployment yang membaca DATABASE_URL dari Secret.`,
			tasks: [
				'Deploy PostgreSQL dengan stable Service name (postgres)',
				'Deploy API Deployment yang terhubung ke postgres:5432',
				'Test endpoint CRUD (Create, Read, Update, Delete) melalui API Service'
			],
			questions: [
				'Bagaimana API Pods menemukan alamat IP database PostgreSQL di Kubernetes (Kube-DNS)?',
				'Kenapa database membutuhkan Service meskipun hanya ada 1 replica database?'
			]
		},

		// LEVEL 5
		{
			id: 'k8s-13',
			num: '13',
			title: 'Horizontal Pod Autoscaler (HPA)',
			level: 'Level 5 — Autoscaling',
			levelColor: 'bg-purple-50 text-purple-700 border-purple-200',
			objective: 'Membuat cluster otomatis menambah dan mengurangi jumlah Pod berdasarkan metrik beban CPU/Memory.',
			scenario: `Konfigurasikan HPA:
minReplicas: 2
maxReplicas: 10
targetCPUUtilizationPercentage: 70%`,
			tasks: [
				'Pastikan Metrics Server aktif di cluster (kubectl top pods)',
				'Buat manifest HPA untuk API Deployment',
				'Beri beban tinggi menggunakan k6 dan amati autoscaling',
				'Hentikan beban dan amati proses cooldown scale-down'
			],
			yamlSnippet: `apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: api-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: api-deployment
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70`,
			commands: `kubectl get hpa
kubectl get pods -w
kubectl describe hpa api-hpa`,
			questions: [
				'Berapa lama waktu yang dibutuhkan HPA untuk mendeteksi beban dan membuat Pod baru?',
				'Kenapa proses scale-down memiliki cooldown period default (5 menit)?'
			]
		},
		{
			id: 'k8s-14',
			num: '14',
			title: 'HPA Autoscaling vs Fixed Replicas Benchmark',
			level: 'Level 5 — Autoscaling',
			levelColor: 'bg-purple-50 text-purple-700 border-purple-200',
			objective: 'Membandingkan efisiensi resource dan ketahanan latency antara kapasitas statis vs dynamic HPA.',
			scenario: `Bandingkan skenario:
1. Fixed 2 Replicas vs k6 Ramp-up 1,000 VUs
2. HPA (2 ➔ 10 Replicas) vs k6 Ramp-up 1,000 VUs`,
			metrics: ['RPS Throughput', 'p95 & p99 Latency', 'Error Rate', 'Scale-up Response Time (s)', 'Total CPU Cores Used'],
			questions: [
				'Apakah HPA meningkatkan performa atau kapasitas daya tampung?',
				'Apa yang terjadi jika traffic melonjak instan dalam 2 detik (Flash Spike) sebelum HPA sempat spin-up pod baru?'
			]
		},

		// LEVEL 6
		{
			id: 'k8s-15',
			num: '15',
			title: 'Ingress Controller & Routing',
			level: 'Level 6 — Networking & Reliability',
			levelColor: 'bg-red-50 text-red-700 border-red-200',
			objective: 'Mengarahkan traffic HTTP/HTTPS eksternal domain ke internal Service berdasarkan path dan hostname.',
			architecture: `Internet ──► Ingress Controller (NGINX / Traefik)
                 ├── api.example.com/api/* ──► API Service
                 └── portal.example.com/*   ──► Web Service`,
			scenario: `Buat manifest Ingress dengan host routing dan SSL/TLS termination.`,
			tasks: [
				'Install Ingress Controller (Ingress-NGINX)',
				'Buat resource Ingress dengan path routing',
				'Uji akses domain via HTTP header / curl --resolve'
			],
			yamlSnippet: `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
  - host: api.portal.local
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: api-service
            port:
              number: 80`,
			questions: [
				'Apa perbedaan mendasar antara Ingress vs Service (ClusterIP / NodePort / LoadBalancer)?',
				'Bagaimana Ingress menangani SSL/TLS termination menggunakan Kubernetes Secret?'
			]
		},
		{
			id: 'k8s-16',
			num: '16',
			title: 'Simulasi Pod Failure & Self-Healing',
			level: 'Level 6 — Networking & Reliability',
			levelColor: 'bg-red-50 text-red-700 border-red-200',
			objective: 'Menguji ketangguhan self-healing Kubernetes saat container mendadak mati.',
			scenario: `Jalankan 3 API Pods dengan live traffic k6.
Paksa kill 1 pod dengan: kubectl delete pod <pod-name> --now.`,
			tasks: [
				'Jalankan k6 continuous load test',
				'Hapus salah satu Pod aktif secara mendadak',
				'Amati apakah Service langsung mencopot IP Pod yang mati dari endpoints list'
			],
			commands: `kubectl get pods -w
kubectl delete pod <pod-name> --now
kubectl get endpoints api-service`,
			questions: [
				'Berapa milidetik waktu yang dibutuhkan Kubernetes untuk mereplace pod yang mati?',
				'Apakah ada request pengguna yang terputus (502 Bad Gateway) selama proses termination?'
			]
		},
		{
			id: 'k8s-17',
			num: '17',
			title: 'Troubleshooting CrashLoopBackOff & OOM',
			level: 'Level 6 — Networking & Reliability',
			levelColor: 'bg-red-50 text-red-700 border-red-200',
			objective: 'Menguasai diagnostik dan troubleshooting saat aplikasi mengalami CrashLoopBackOff atau OOMKilled.',
			scenario: `Deploy pod dengan bug startup (exit code 1) atau invalid config.
Lakukan step-by-step triage menggunakan kubectl debugging commands.`,
			tasks: [
				'Deploy pod bermasalah',
				'Amati status CrashLoopBackOff',
				'Gunakan kubectl describe dan kubectl logs --previous untuk menemukan root cause',
				'Perbaiki manifest dan deploy fix'
			],
			commands: `kubectl describe pod <pod-name> # cek bagian Events & Exit Code
kubectl logs <pod-name> --previous
kubectl get pod <pod-name> -o yaml`,
			questions: [
				'Apa arti status CrashLoopBackOff di Kubernetes?',
				'Mengapa kubectl logs tanpa flag --previous terkadang kosong saat pod restart?'
			]
		},

		// FINAL CHALLENGE
		{
			id: 'k8s-18',
			num: '18',
			title: 'Production-Grade Kubernetes Architecture',
			level: 'Final Challenge',
			levelColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
			objective: 'Membangun arsitektur produksi Kubernetes lengkap dari Ingress, HPA, Redis, PostgreSQL, hingga Secrets.',
			architecture: `                         Internet
                            │
                            ▼
                         Ingress
                            │
                            ▼
                       API Service
                            │
               ┌────────────┼────────────┐
               ▼            ▼            ▼
             API #1        API #2       API #3  (Auto-scale 3 ➔ 10 via HPA)
               │            │            │
               └────────────┼────────────┘
                            │
                  ┌─────────┴─────────┐
                  ▼                   ▼
                Redis             PostgreSQL
                                      │
                                      ▼
                                 PVC Storage`,
			scenario: `Deploy platform microservices lengkap:
• Ingress Controller + TLS
• API Deployment + ConfigMap + Secret + Probes + Limits
• Horizontal Pod Autoscaler (HPA 3–10 Pods)
• PostgreSQL + PersistentVolumeClaim
• Redis Caching Service
• k6 Stress Test Final: Normal ➔ Peak ➔ Flash Sale ➔ Login Storm`,
			tasks: [
				'Deploy seluruh manifest YAML arsitektur',
				'Jalankan pengujian k6 komprehensif',
				'Susun Laporan Performa Final (Peak RPS, p95, Error Rate, Max Pods, Scale-up Time)'
			],
			questions: [
				'Komponen apa yang pertama kali menjadi bottleneck saat traffic mencapai 2,000 VUs?',
				'Bagaimana strategi mitigasi database overload saat API Pods autoscaling ke 10 instances?',
				'Trade-off arsitektur apa yang Anda pilih untuk mencapai 99.99% availability?'
			]
		}
	];

	// Interactive States
	let selectedLevel = $state('All');
	let searchQuery = $state('');
	let completedChallenges = $state<string[]>([]);
	let activeChallengeId = $state<string>(k8sChallenges[0].id);
	let copiedYaml = $state(false);
	let copiedCmd = $state(false);

	// Load completion state from localStorage
	$effect(() => {
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('portal_k8s_completed');
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
			localStorage.setItem('portal_k8s_completed', JSON.stringify(completedChallenges));
		}
	}

	let filteredChallenges = $derived(
		k8sChallenges.filter((c) => {
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
		k8sChallenges.find((c) => c.id === activeChallengeId) || k8sChallenges[0]
	);

	let progressPercent = $derived(
		Math.round((completedChallenges.length / k8sChallenges.length) * 100)
	);

	function copyText(text: string, type: 'yaml' | 'cmd') {
		if (typeof navigator !== 'undefined' && navigator.clipboard) {
			navigator.clipboard.writeText(text);
			if (type === 'yaml') {
				copiedYaml = true;
				setTimeout(() => (copiedYaml = false), 2000);
			} else {
				copiedCmd = true;
				setTimeout(() => (copiedCmd = false), 2000);
			}
		}
	}
</script>

<svelte:head>
	<title>Kubernetes Challenges - Portal Sistem</title>
</svelte:head>

<main class="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
	
	<!-- Top Hero Banner -->
	<div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-50 via-indigo-50/40 to-white border border-blue-100/80 p-8 sm:p-10 mb-8 shadow-sm">
		<div class="absolute -right-10 -bottom-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl pointer-events-none"></div>
		
		<div class="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
			<div class="max-w-3xl">
				<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs font-semibold mb-3">
					<span class="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
					Cloud Native & Container Orchestration
				</div>
				<h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
					☸️ Kubernetes Challenges
				</h1>
				<p class="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
					<strong>Goal:</strong> Learn Kubernetes by deploying, scaling, breaking, and recovering a real application. Prinsip belajar: <em>Deploy ➔ Observe ➔ Break ➔ Fix ➔ Scale ➔ Automate</em>.
				</p>

				<!-- Learning Highlights -->
				<div class="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-700">
					<span class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">📦 Pods & Deployments</span>
					<span class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">🌐 Services & Ingress</span>
					<span class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">📈 Horizontal Pod Autoscaler</span>
					<span class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">💾 Persistent Storage</span>
					<span class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">🩺 Probes & Self-Healing</span>
				</div>
			</div>

			<!-- Progress Tracker Card -->
			<div class="bg-white/95 border border-slate-200/90 rounded-2xl p-5 shadow-xs shrink-0 w-full lg:w-72">
				<div class="flex items-center justify-between mb-2">
					<span class="text-xs font-bold text-slate-700 uppercase tracking-wider">Progress Path</span>
					<span class="text-xs font-black text-blue-600">{progressPercent}% Selesai</span>
				</div>
				<!-- Progress Bar -->
				<div class="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mb-3 border border-slate-200">
					<div
						class="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300 rounded-full"
						style="width: {progressPercent}%"
					></div>
				</div>
				<div class="flex items-center justify-between text-xs text-slate-500">
					<span>{completedChallenges.length} dari {k8sChallenges.length} Selesai</span>
					<span class="font-bold text-slate-700">18 Modul</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Filter & Search Toolbar -->
	<div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs">
		<!-- Level Filter Dropdown -->
		<div class="flex items-center gap-3">
			<span class="text-xs font-bold text-slate-700 uppercase tracking-wider shrink-0 flex items-center gap-1.5">
				<svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
				</svg>
				Filter Level:
			</span>
			<div class="relative w-full sm:w-64">
				<select
					bind:value={selectedLevel}
					class="w-full pl-3 pr-8 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer appearance-none transition"
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
				placeholder="Cari challenge k8s..."
				class="w-full pl-9 pr-3 py-2 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 text-xs text-slate-900 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 placeholder-slate-400 transition"
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
						class="w-full text-left p-4 rounded-2xl border transition duration-150 cursor-pointer flex flex-col justify-between {isActive ? 'bg-white border-blue-500 shadow-md ring-2 ring-blue-500/10' : 'bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-xs'}"
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
								<span class="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
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
							class="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl transition cursor-pointer {completedChallenges.includes(activeChallenge.id) ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs' : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'}"
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
						<p class="text-sm font-semibold text-slate-800 bg-blue-50/60 border border-blue-100 rounded-xl p-3.5">
							{activeChallenge.objective}
						</p>
					</div>

					<!-- 2. Scenario -->
					<div>
						<h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">📋 Scenario</h4>
						<pre class="text-xs text-slate-700 whitespace-pre-line bg-slate-50 border border-slate-200/80 rounded-2xl p-4 font-sans leading-relaxed">{activeChallenge.scenario}</pre>
					</div>

					<!-- Architecture diagram if available -->
					{#if activeChallenge.architecture}
						<div>
							<h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">🏗️ Architecture Overview</h4>
							<pre class="p-4 bg-slate-900 text-blue-400 rounded-2xl text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">{activeChallenge.architecture}</pre>
						</div>
					{/if}

					<!-- Tasks list -->
					{#if activeChallenge.tasks}
						<div>
							<h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">✅ Tasks to Complete</h4>
							<ul class="space-y-1.5">
								{#each activeChallenge.tasks as task}
									<li class="flex items-center gap-2 text-xs sm:text-sm text-slate-700 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200/60">
										<span class="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0"></span>
										<span>{task}</span>
									</li>
								{/each}
							</ul>
						</div>
					{/if}

					<!-- Manifest YAML Boilerplate if available -->
					{#if activeChallenge.yamlSnippet}
						<div>
							<div class="flex items-center justify-between mb-2">
								<h4 class="text-xs font-bold uppercase tracking-wider text-slate-400">📄 Kubernetes YAML Manifest</h4>
								<button
									type="button"
									onclick={() => copyText(activeChallenge.yamlSnippet!, 'yaml')}
									class="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition cursor-pointer"
								>
									{copiedYaml ? '✓ Tersalin' : '📋 Salin YAML'}
								</button>
							</div>
							<pre class="p-4 bg-slate-900 text-slate-100 rounded-2xl text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">{activeChallenge.yamlSnippet}</pre>
						</div>
					{/if}

					<!-- Useful Commands -->
					{#if activeChallenge.commands}
						<div>
							<div class="flex items-center justify-between mb-2">
								<h4 class="text-xs font-bold uppercase tracking-wider text-slate-400">⌨️ Useful kubectl Commands</h4>
								<button
									type="button"
									onclick={() => copyText(activeChallenge.commands!, 'cmd')}
									class="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition cursor-pointer"
								>
									{copiedCmd ? '✓ Tersalin' : '📋 Salin Command'}
								</button>
							</div>
							<pre class="p-4 bg-slate-900 text-amber-300 rounded-2xl text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">{activeChallenge.commands}</pre>
						</div>
					{/if}

					<!-- Analytical Questions -->
					<div>
						<h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">❓ Critical Questions to Answer</h4>
						<ul class="space-y-2">
							{#each activeChallenge.questions as q}
								<li class="flex items-start gap-2 text-xs sm:text-sm text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
									<span class="w-4 h-4 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
										?
									</span>
									<span>{q}</span>
								</li>
							{/each}
						</ul>
					</div>

					{#if activeChallenge.important}
						<div class="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900">
							<strong class="font-bold">⚠️ Catatan Penting:</strong> {activeChallenge.important}
						</div>
					{/if}

				</div>
			</div>
		</div>

	</div>

	<!-- Troubleshooting Checklist & Reflection -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
		
		<!-- Troubleshooting Checklist -->
		<div class="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs">
			<div class="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mb-4">
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
				</svg>
			</div>
			<h3 class="text-lg font-bold text-slate-900 mb-2">🔍 10-Step Troubleshooting Hierarchy</h3>
			<p class="text-xs text-slate-500 mb-4">Ketika Pod bermasalah, jangan langsung restart. Ikuti urutan investigasi ini:</p>
			
			<div class="space-y-1.5 text-xs font-mono text-slate-800 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 leading-relaxed">
				<p>1. kubectl get pods</p>
				<p>2. kubectl describe pod &lt;pod&gt; (Perhatikan Events & Exit Code)</p>
				<p>3. kubectl logs &lt;pod&gt; / kubectl logs --previous</p>
				<p>4. kubectl get svc & endpoints</p>
				<p>5. kubectl get configmap & secret</p>
				<p>6. kubectl top pods & top nodes (Cek CPU/OOM)</p>
				<p>7. Check Database & Persistent Storage connectivity</p>
				<p>8. kubectl exec -it &lt;pod&gt; -- sh (Internal network check)</p>
			</div>
		</div>

		<!-- Definition of Done -->
		<div class="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 shadow-xl flex flex-col justify-between">
			<div>
				<div class="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center mb-4">
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
					</svg>
				</div>
				<h3 class="text-lg font-bold text-white mb-2">🏁 Definition of Done</h3>
				<blockquote class="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs text-slate-200 leading-relaxed italic mb-4">
					"Challenge dianggap selesai bukan cuma saat kamu bisa menjalankan <code>kubectl apply -f ...</code>, tetapi saat kamu bisa menjelaskan: <strong>Kubernetes sedang mengelola apa, kenapa resource ini dibutuhkan, bagaimana traffic mengalir, bagaimana aplikasi scale & recover ketika failure, dan di mana bottleneck-nya.</strong>"
				</blockquote>
				<p class="text-xs text-blue-400 font-semibold">
					💡 Core Mindset: Don't memorize kubectl commands. Understand the system Kubernetes is managing.
				</p>
			</div>

			<div class="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
				<span>Progress: {completedChallenges.length} / 18 Selesai</span>
				<span class="text-blue-400 font-bold">{progressPercent}%</span>
			</div>
		</div>

	</div>

</main>
