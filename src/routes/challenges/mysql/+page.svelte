<script lang="ts">
	interface MySqlChallenge {
		id: string;
		num: string;
		title: string;
		level: string;
		levelColor: string;
		objective: string;
		scenario?: string;
		tasks?: string[];
		sqlSnippet?: string;
		commands?: string;
		architecture?: string;
		questions?: string[];
		deliverable?: string;
		important?: string;
		bonus?: string;
	}

	const levels = [
		'All',
		'Level 1 — Fundamentals',
		'Level 2 — Performance',
		'Level 3 — Transactions',
		'Level 4 — InnoDB Internals',
		'Level 5 — Replication',
		'Level 6 — High Availability',
		'Level 7 — Scaling',
		'Level 8 — Backup & Recovery',
		'Level 9 — Observability',
		'Level 10 — Production Simulation'
	];

	const mysqlChallenges: MySqlChallenge[] = [
		// LEVEL 1 — FUNDAMENTALS
		{
			id: 'mysql-01',
			num: '01',
			title: 'MySQL Setup with Docker',
			level: 'Level 1 — Fundamentals',
			levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
			objective: 'Menjalankan container MySQL 8 dan memahami environment konfigurasi database server.',
			scenario: 'Deploy MySQL 8 instance menggunakan Docker dan uji koneksi client via terminal/GUI.',
			commands: `docker run --name mysql-dev \\
  -e MYSQL_ROOT_PASSWORD=root \\
  -e MYSQL_DATABASE=growth \\
  -p 3306:3306 \\
  -d mysql:8

# Connect via CLI:
mysql -h 127.0.0.1 -P 3306 -u root -p`,
			questions: [
				'Apa fungsi port default 3306 di MySQL?',
				'Apa perbedaan mendasar antara database, schema, dan table?',
				'Apa fungsi utama MySQL server daemon (mysqld)?'
			]
		},
		{
			id: 'mysql-02',
			num: '02',
			title: 'E-Commerce Schema Design & Constraints',
			level: 'Level 1 — Fundamentals',
			levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
			objective: 'Mendesain relational database e-commerce dengan relasi PK, FK, dan constraint integritas data.',
			architecture: `users (1) ──► (N) orders (1) ──► (N) order_items (N) ◄── (1) products`,
			tasks: [
				'Design schema 4 tabel: users, products, orders, order_items',
				'Definisikan Primary Key, Foreign Key, dan ON DELETE RESTRICT/CASCADE',
				'Definisikan constraints: NOT NULL, UNIQUE, CHECK',
				'Insert sample data minimal 5 record per tabel'
			],
			sqlSnippet: `CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    price DECIMAL(12, 2) NOT NULL CHECK (price >= 0),
    stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0)
);

CREATE TABLE orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    status ENUM('pending', 'paid', 'shipped', 'completed', 'cancelled') DEFAULT 'pending',
    total_amount DECIMAL(12, 2) NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    price DECIMAL(12, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);`,
			questions: [
				'Kenapa tabel order_items dibutuhkan (relasi many-to-many)?',
				'Kenapa harga (price) harus disimpan ulang di order_items, bukan hanya di products?'
			]
		},
		{
			id: 'mysql-03',
			num: '03',
			title: 'CRUD Operations & Safe Updates',
			level: 'Level 1 — Fundamentals',
			levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
			objective: 'Menguasai manipulasi data CRUD dan memahami risiko manipulasi tanpa klausa WHERE.',
			sqlSnippet: `-- INSERT
INSERT INTO products (name, price, stock) VALUES ('Mechanical Keyboard', 850000, 25);

-- SELECT dengan Filtering
SELECT * FROM products WHERE stock > 0 AND price < 1000000;

-- UPDATE
UPDATE products SET stock = stock - 1 WHERE id = 1 AND stock > 0;

-- DELETE
DELETE FROM products WHERE id = 99;`,
			questions: [
				'Apa risiko fatal menjalankan UPDATE atau DELETE tanpa klausa WHERE?',
				'Bagaimana cara mengaktifkan sql_safe_updates di MySQL?'
			]
		},
		{
			id: 'mysql-04',
			num: '04',
			title: 'Multi-Table Relational JOINs',
			level: 'Level 1 — Fundamentals',
			levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
			objective: 'Menggabungkan data dari berbagai tabel relasional secara presisi dan efisien.',
			sqlSnippet: `SELECT 
    u.name AS customer_name,
    o.id AS order_id,
    o.status AS order_status,
    p.name AS product_name,
    oi.quantity,
    oi.price,
    (oi.quantity * oi.price) AS subtotal
FROM orders o
INNER JOIN users u ON o.user_id = u.id
INNER JOIN order_items oi ON o.id = oi.order_id
INNER JOIN products p ON oi.product_id = p.id
WHERE o.status = 'paid';`,
			bonus: 'Uji perbedaan output antara INNER JOIN, LEFT JOIN, dan RIGHT JOIN ketika ada user yang belum pernah membuat order.'
		},
		{
			id: 'mysql-05',
			num: '05',
			title: 'Aggregations & Analytics',
			level: 'Level 1 — Fundamentals',
			levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
			objective: 'Menghitung statistik performa bisnis menggunakan fungsi agregasi SQL.',
			sqlSnippet: `-- Total Revenue, Total Orders, dan Average Order Value (AOV)
SELECT 
    COUNT(id) AS total_orders,
    SUM(total_amount) AS total_revenue,
    AVG(total_amount) AS average_order_value,
    MIN(total_amount) AS min_order,
    MAX(total_amount) AS max_order
FROM orders
WHERE status = 'completed';

-- Top 5 Produk Terlaris
SELECT 
    p.id,
    p.name,
    SUM(oi.quantity) AS total_sold,
    SUM(oi.quantity * oi.price) AS total_sales
FROM order_items oi
INNER JOIN products p ON oi.product_id = p.id
GROUP BY p.id, p.name
HAVING total_sold > 5
ORDER BY total_sold DESC
LIMIT 5;`
		},
		{
			id: 'mysql-06',
			num: '06',
			title: 'Data Constraints & Integrity Validation',
			level: 'Level 1 — Fundamentals',
			levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
			objective: 'Menguji ketatnya integritas database terhadap data anomali atau duplikat.',
			sqlSnippet: `-- Eksperimen 1: Uji Duplicate Email (Harus Error 1062)
INSERT INTO users (name, email) VALUES ('User B', 'duplicate@example.com');
INSERT INTO users (name, email) VALUES ('User C', 'duplicate@example.com');

-- Eksperimen 2: Uji CHECK Constraint Nilai Negatif (Harus Error 3819)
INSERT INTO products (name, price, stock) VALUES ('Invalid Item', -50000, 10);`
		},

		// LEVEL 2 — PERFORMANCE
		{
			id: 'mysql-07',
			num: '07',
			title: 'Single-Column B-Tree Indexing',
			level: 'Level 2 — Performance',
			levelColor: 'bg-amber-50 text-amber-700 border-amber-200',
			objective: 'Membuktikan perbedaan performa query jutaan baris antara Full Table Scan vs B-Tree Index Lookup.',
			scenario: 'Isi tabel users dengan 1,000,000 data. Bandingkan execution time sebelum dan sesudah index dibuat.',
			sqlSnippet: `-- Tanpa Index: Execution time ~250ms+ (Full Table Scan)
SELECT * FROM users WHERE email = 'target_999999@example.com';

-- Tambahkan B-Tree Index
CREATE INDEX idx_users_email ON users(email);

-- Dengan Index: Execution time ~0.5ms (Index Lookup)
SELECT * FROM users WHERE email = 'target_999999@example.com';`
		},
		{
			id: 'mysql-08',
			num: '08',
			title: 'Composite Index & Leftmost Prefix Rule',
			level: 'Level 2 — Performance',
			levelColor: 'bg-amber-50 text-amber-700 border-amber-200',
			objective: 'Memahami prinsip urutan kolom pada multi-column index dan Leftmost Prefix Rule.',
			sqlSnippet: `CREATE INDEX idx_orders_user_status ON orders(user_id, status);

-- Query 1: Menggunakan Index (user_id & status)
EXPLAIN SELECT * FROM orders WHERE user_id = 123 AND status = 'completed';

-- Query 2: Menggunakan Index (user_id saja - Leftmost prefix valid)
EXPLAIN SELECT * FROM orders WHERE user_id = 123;

-- Query 3: TIDAK bisa menggunakan index idx_orders_user_status (status saja - Non-leftmost)
EXPLAIN SELECT * FROM orders WHERE status = 'completed';`,
			questions: [
				'Mengapa urutan kolom pada composite index sangat menentukan?',
				'Apa yang terjadi jika query memfilter kolom kedua tanpa menyertakan kolom pertama?'
			]
		},
		{
			id: 'mysql-09',
			num: '09',
			title: 'EXPLAIN & Query Execution Plan Analysis',
			level: 'Level 2 — Performance',
			levelColor: 'bg-amber-50 text-amber-700 border-amber-200',
			objective: 'Membaca dan mendiagnosis query plan: type (ALL, ref, eq_ref, index), rows examined, dan Extra.',
			sqlSnippet: `EXPLAIN FORMAT=JSON
SELECT * FROM orders 
WHERE user_id = 500 AND created_at >= '2026-01-01';`,
			deliverable: `Target Optimasi:
Ubah status type dari 'ALL' (Full Table Scan) menjadi 'ref' / 'range' / 'eq_ref'.`
		},
		{
			id: 'mysql-10',
			num: '10',
			title: 'Sargable Queries & Anti-Patterns',
			level: 'Level 2 — Performance',
			levelColor: 'bg-amber-50 text-amber-700 border-amber-200',
			objective: 'Menghindari function wrapping pada kolom ber-index yang mematikan efektivitas index.',
			sqlSnippet: `-- ❌ BURUK (Non-Sargable): Fungsi YEAR() mematikan index created_at!
EXPLAIN SELECT * FROM orders WHERE YEAR(created_at) = 2026;

-- ✅ OPTIMAL (Sargable): Range comparison memanfaatkan B-Tree index secara penuh!
EXPLAIN SELECT * FROM orders 
WHERE created_at >= '2026-01-01 00:00:00' AND created_at < '2027-01-01 00:00:00';`
		},
		{
			id: 'mysql-11',
			num: '11',
			title: 'Offset Pagination vs Keyset / Cursor Pagination',
			level: 'Level 2 — Performance',
			levelColor: 'bg-amber-50 text-amber-700 border-amber-200',
			objective: 'Mengatasi bottleneck OFFSET pagination pada dataset 10 juta baris menggunakan Keyset Cursor.',
			sqlSnippet: `-- ❌ OFFSET Pagination (Lambat: Membaca & membuang 1,000,000 baris pertama)
SELECT * FROM orders ORDER BY id ASC LIMIT 20 OFFSET 1000000;

-- ✅ Cursor / Keyset Pagination (Cepat konstan: Lompat langsung ke ID)
SELECT * FROM orders WHERE id > 1000000 ORDER BY id ASC LIMIT 20;`
		},
		{
			id: 'mysql-12',
			num: '12',
			title: 'Covering Index (Using Index)',
			level: 'Level 2 — Performance',
			levelColor: 'bg-amber-50 text-amber-700 border-amber-200',
			objective: 'Mengambil data langsung dari B-Tree index tanpa perlu membaca tabel utama (Index-Only Scan).',
			sqlSnippet: `CREATE INDEX idx_orders_covering ON orders(user_id, status, created_at);

-- Query yang hanya meminta kolom yang ada di index
EXPLAIN SELECT user_id, status, created_at 
FROM orders 
WHERE user_id = 123 AND status = 'completed';

-- Amati kolom 'Extra' bertuliskan: "Using index"`
		},
		{
			id: 'mysql-13',
			num: '13',
			title: 'Connection Pool Sizing & Load Test',
			level: 'Level 2 — Performance',
			levelColor: 'bg-amber-50 text-amber-700 border-amber-200',
			objective: 'Mencari sweet spot ukuran connection pool backend terhadap throughput dan CPU server.',
			scenario: 'Uji variasi Pool Size: 10 vs 25 vs 50 vs 100 dengan beban 1,000 virtual users k6.',
			questions: [
				'Mengapa pool size yang terlalu besar (misal 500) justru memperlambat respon akibat CPU context switching?',
				'Apa rumus optimal connection pool sizing (misal: Pool = (Core * 2) + Disk Count)?'
			]
		},

		// LEVEL 3 — TRANSACTIONS
		{
			id: 'mysql-14',
			num: '14',
			title: 'ACID Guarantee in Financial Transfers',
			level: 'Level 3 — Transactions',
			levelColor: 'bg-orange-50 text-orange-700 border-orange-200',
			objective: 'Menerapkan transaksi atomik perbankan di mana pengurangan saldo dan penambahan saldo wajib sukses bersamaan.',
			sqlSnippet: `START TRANSACTION;

-- Kurangi saldo Pengirim
UPDATE accounts SET balance = balance - 500000 WHERE id = 1 AND balance >= 500000;

-- Tambah saldo Penerima
UPDATE accounts SET balance = balance + 500000 WHERE id = 2;

-- Catat Ledger Audit
INSERT INTO transfers (from_id, to_id, amount) VALUES (1, 2, 500000);

COMMIT;`
		},
		{
			id: 'mysql-15',
			num: '15',
			title: 'Explicit Transaction Rollback',
			level: 'Level 3 — Transactions',
			levelColor: 'bg-orange-50 text-orange-700 border-orange-200',
			objective: 'Memverifikasi pembatalan transaksi saat terjadi error atau validasi gagal di tengah eksekusi.',
			sqlSnippet: `START TRANSACTION;
UPDATE accounts SET balance = balance - 1000000 WHERE id = 1;
-- Kondisi validasi gagal:
ROLLBACK;
-- Verifikasi saldo akun tidak berubah sama sekali
SELECT * FROM accounts WHERE id = 1;`
		},
		{
			id: 'mysql-16',
			num: '16',
			title: 'Transaction Isolation Levels',
			level: 'Level 3 — Transactions',
			levelColor: 'bg-orange-50 text-orange-700 border-orange-200',
			objective: 'Menguji anomali Dirty Read, Non-Repeatable Read, dan Phantom Read pada 4 level isolasi.',
			sqlSnippet: `-- Ubah isolasi session
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
-- atau: REPEATABLE READ (Default MySQL)
-- atau: SERIALIZABLE`,
			questions: [
				'Apa itu Dirty Read, Non-Repeatable Read, dan Phantom Read?',
				'Mengapa MySQL memilih REPEATABLE READ sebagai default isolation level?'
			]
		},
		{
			id: 'mysql-17',
			num: '17',
			title: 'InnoDB Multi-Version Concurrency Control (MVCC)',
			level: 'Level 3 — Transactions',
			levelColor: 'bg-orange-50 text-orange-700 border-orange-200',
			objective: 'Memahami bagaimana InnoDB menyediakan non-blocking read snapshot menggunakan Undo Log.',
			scenario: `Buka 2 session terminal:
Session A: START TRANSACTION; SELECT * FROM products WHERE id=1;
Session B: UPDATE products SET price = 999 WHERE id=1; COMMIT;
Session A: SELECT * FROM products WHERE id=1; (Melihat snapshot lama tanpa terblokir write lock!)`
		},
		{
			id: 'mysql-18',
			num: '18',
			title: 'Pessimistic Row Locking (SELECT ... FOR UPDATE)',
			level: 'Level 3 — Transactions',
			levelColor: 'bg-orange-50 text-orange-700 border-orange-200',
			objective: 'Mencegah race condition overselling tiket/stok produk saat 100 user checkout barang terakhir bersamaan.',
			sqlSnippet: `START TRANSACTION;
-- Kunci baris produk secara eksklusif (Exclusive X-Lock)
SELECT stock FROM products WHERE id = 10 FOR UPDATE;

-- Hanya proses jika stok masih ada
UPDATE products SET stock = stock - 1 WHERE id = 10;
COMMIT;`
		},
		{
			id: 'mysql-19',
			num: '19',
			title: 'Deadlock Simulation & Resolution',
			level: 'Level 3 — Transactions',
			levelColor: 'bg-orange-50 text-orange-700 border-orange-200',
			objective: 'Membuat deadlock buatan antara 2 transaksi konkruen, membaca log deadlock, dan memperbaikinya.',
			scenario: `Session 1: Kunci Row A ➔ lalu coba kunci Row B
Session 2: Kunci Row B ➔ lalu coba kunci Row A
InnoDB otomatis mendeteksi deadlock dan me-rollback salah satu transaksi dengan Error 1213.`,
			commands: `SHOW ENGINE INNODB STATUS; # Cek bagian LATEST DETECTED DEADLOCK`,
			questions: [
				'Bagaimana strategi mencegah deadlock (contoh: Menyamakan urutan sorting ID saat locking)?'
			]
		},

		// LEVEL 4 — INNODB INTERNALS
		{
			id: 'mysql-20',
			num: '20',
			title: 'InnoDB Buffer Pool Optimization',
			level: 'Level 4 — InnoDB Internals',
			levelColor: 'bg-rose-50 text-rose-700 border-rose-200',
			objective: 'Memahami mekanisme cache in-memory halaman data dan index di RAM.',
			commands: `SHOW VARIABLES LIKE 'innodb_buffer_pool_size';
SHOW STATUS LIKE 'Innodb_buffer_pool_read%';`,
			questions: [
				'Berapa rekomendasi ukuran innodb_buffer_pool_size di server database dedicated (e.g. 70-80% dari total RAM)?',
				'Apa perbedaan Cold Cache vs Warm Cache?'
			]
		},
		{
			id: 'mysql-21',
			num: '21',
			title: 'Write-Ahead Logging (WAL) & Redo Log',
			level: 'Level 4 — InnoDB Internals',
			levelColor: 'bg-rose-50 text-rose-700 border-rose-200',
			objective: 'Memahami bagaimana Redo Log menjamin Durability transaksi dan crash recovery tanpa synchronous disk flush ke data page.',
			questions: [
				'Mengapa menulis secara sequential ke Redo Log jauh lebih cepat daripada menulis random IO ke data tablespace?',
				'Apa yang terjadi saat server mati mendadak saat Redo Log belum sempat di-flush ke data file?'
			]
		},
		{
			id: 'mysql-22',
			num: '22',
			title: 'Undo Log & Rollback Segments',
			level: 'Level 4 — InnoDB Internals',
			levelColor: 'bg-rose-50 text-rose-700 border-rose-200',
			objective: 'Mempelajari struktur data Undo Log untuk rollback transaksi dan pembuatan snapshot read view MVCC.'
		},
		{
			id: 'mysql-23',
			num: '23',
			title: 'Binary Log (Binlog) Formats (ROW vs STATEMENT)',
			level: 'Level 4 — InnoDB Internals',
			levelColor: 'bg-rose-50 text-rose-700 border-rose-200',
			objective: 'Mengaktifkan dan menginspeksi event log perubahan database untuk replikasi dan disaster recovery.',
			commands: `SHOW BINARY LOGS;
SHOW MASTER STATUS;
mysqlbinlog --base64-output=DECODE-ROWS -v /var/lib/mysql/binlog.000001`
		},
		{
			id: 'mysql-24',
			num: '24',
			title: 'Durability Flush Settings (innodb_flush_log_at_trx_commit)',
			level: 'Level 4 — InnoDB Internals',
			levelColor: 'bg-rose-50 text-rose-700 border-rose-200',
			objective: 'Memahami trade-off performa write IOPS vs risiko kehilangan data (Value 1 vs 2 vs 0).',
			important: 'Nilai 1 = Full ACID (Setiap commit di-flush ke disk). Nilai 2 = Flush ke OS buffer (Potensi hilang 1 detik jika listrik padam tapi write 10x lebih kencang).'
		},

		// LEVEL 5 — REPLICATION
		{
			id: 'mysql-25',
			num: '25',
			title: 'Primary ➔ Replica Asynchronous Replication',
			level: 'Level 5 — Replication',
			levelColor: 'bg-purple-50 text-purple-700 border-purple-200',
			objective: 'Membangun master-slave replication antara 2 container MySQL.',
			architecture: `Primary (Write + Binlog) ──► Replica (IO Thread ➔ Relay Log ➔ SQL Thread)`,
			commands: `# Di Replica:
CHANGE REPLICATION SOURCE TO
  SOURCE_HOST='mysql-primary',
  SOURCE_USER='repl_user',
  SOURCE_PASSWORD='password',
  SOURCE_AUTO_POSITION=1;

START REPLICA;
SHOW REPLICA STATUS\\G`
		},
		{
			id: 'mysql-26',
			num: '26',
			title: 'Read/Write Splitting with Read Replicas',
			level: 'Level 5 — Replication',
			levelColor: 'bg-purple-50 text-purple-700 border-purple-200',
			objective: 'Mengarahkan query SELECT ke Read Replica dan transaksi INSERT/UPDATE ke Primary.',
			architecture: `Backend ──► WRITE (INSERT/UPDATE) ──► Primary
        └──► READ  (SELECT)         ──► Read Replica #1 / #2`
		},
		{
			id: 'mysql-27',
			num: '27',
			title: 'Measuring & Diagnosing Replication Lag',
			level: 'Level 5 — Replication',
			levelColor: 'bg-purple-50 text-purple-700 border-purple-200',
			objective: 'Mengidentifikasi delay waktu data masuk di Primary hingga selesai dieksekusi di Replica.',
			commands: `SHOW REPLICA STATUS\\G # Pantau nilai: Seconds_Behind_Source`,
			questions: [
				'Apa penyebab umum Seconds_Behind_Source membengkak (Single-threaded SQL thread, DDL lock, atau heavy write burst)?',
				'Bagaimana multi-threaded replication (replica_parallel_workers) membantu mengurangi lag?'
			]
		},
		{
			id: 'mysql-28',
			num: '28',
			title: 'Global Transaction Identifiers (GTID)',
			level: 'Level 5 — Replication',
			levelColor: 'bg-purple-50 text-purple-700 border-purple-200',
			objective: 'Mengkonfigurasi replikasi berbasis UUID transaksi unik tanpa perlu manual binlog file & coordinate position.'
		},
		{
			id: 'mysql-29',
			num: '29',
			title: 'Semi-Synchronous Replication',
			level: 'Level 5 — Replication',
			levelColor: 'bg-purple-50 text-purple-700 border-purple-200',
			objective: 'Menjamin zero data loss dengan memastikan minimal 1 replica menerima event sebelum commit di-acknowledge ke client.'
		},
		{
			id: 'mysql-30',
			num: '30',
			title: 'Replica Catch-up & Recovery Drill',
			level: 'Level 5 — Replication',
			levelColor: 'bg-purple-50 text-purple-700 border-purple-200',
			objective: 'Mematikan replica selama 10 menit saat primary terus menerima ribuan write, lalu menyalakannya kembali dan memantau catch-up.'
		},

		// LEVEL 6 — HIGH AVAILABILITY
		{
			id: 'mysql-31',
			num: '31',
			title: 'Primary Sudden Failure Simulation',
			level: 'Level 6 — High Availability',
			levelColor: 'bg-red-50 text-red-700 border-red-200',
			objective: 'Mensimulasikan crash pada Primary database dan mengukur dampak downtime pada aplikasi.'
		},
		{
			id: 'mysql-32',
			num: '32',
			title: 'Manual Replica Promotion',
			level: 'Level 6 — High Availability',
			levelColor: 'bg-red-50 text-red-700 border-red-200',
			objective: 'Mengangkat (promote) Replica menjadi Primary baru (STOP REPLICA, SET read_only=OFF).',
			commands: `STOP REPLICA;
RESET REPLICA ALL;
SET GLOBAL read_only = OFF;`
		},
		{
			id: 'mysql-33',
			num: '33',
			title: 'Automated Failover Architecture (Orchestrator)',
			level: 'Level 6 — High Availability',
			levelColor: 'bg-red-50 text-red-700 border-red-200',
			objective: 'Membangun sistem auto-failover otomatis menggunakan Orchestrator / MHA.'
		},
		{
			id: 'mysql-34',
			num: '34',
			title: 'MySQL Router Dynamic Traffic Routing',
			level: 'Level 6 — High Availability',
			levelColor: 'bg-red-50 text-red-700 border-red-200',
			objective: 'Menggunakan MySQL Router sebagai proxy layer pintar yang otomatis mengalihkan koneksi saat terjadi failover.'
		},
		{
			id: 'mysql-35',
			num: '35',
			title: 'MySQL InnoDB Cluster (Group Replication)',
			level: 'Level 6 — High Availability',
			levelColor: 'bg-red-50 text-red-700 border-red-200',
			objective: 'Membangun 3-node MySQL Group Replication dengan konsensus quorum Paxos dan auto-failover native.'
		},

		// LEVEL 7 — SCALING
		{
			id: 'mysql-36',
			num: '36',
			title: 'Read Scaling Benchmark with 3 Replicas',
			level: 'Level 7 — Scaling',
			levelColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
			objective: 'Menguji throughput SELECT dengan 1 Replica vs 2 Replicas vs 3 Replicas menggunakan k6 benchmark.'
		},
		{
			id: 'mysql-37',
			num: '37',
			title: 'Write Throughput Bottleneck & Disk IOPS',
			level: 'Level 7 — Scaling',
			levelColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
			objective: 'Menemukan batas maksimum penulisan data per detik (TPS) pada single primary instance sebelum Disk IO saturasi.'
		},
		{
			id: 'mysql-38',
			num: '38',
			title: 'Table Partitioning (Range by Date)',
			level: 'Level 7 — Scaling',
			levelColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
			objective: 'Memecah tabel raksasa (orders 50 juta baris) menjadi partisi tahunan agar query pruning hanya memindai partisi aktif.',
			sqlSnippet: `ALTER TABLE orders PARTITION BY RANGE (YEAR(created_at)) (
    PARTITION p2024 VALUES LESS THAN (2025),
    PARTITION p2025 VALUES LESS THAN (2026),
    PARTITION p2026 VALUES LESS THAN (2027),
    PARTITION p_future VALUES LESS THAN MAXVALUE
);

-- Buktikan Partition Pruning dengan EXPLAIN
EXPLAIN SELECT * FROM orders WHERE created_at >= '2026-01-01';`
		},
		{
			id: 'mysql-39',
			num: '39',
			title: 'Database Sharding Strategy (Shard Key Routing)',
			level: 'Level 7 — Scaling',
			levelColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
			objective: 'Memecah database ke 3 database server independen berdasarkan shard key (misal: user_id % 3).'
		},
		{
			id: 'mysql-40',
			num: '40',
			title: 'Distributed ID Generation (UUIDv7, ULID, Snowflake)',
			level: 'Level 7 — Scaling',
			levelColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
			objective: 'Menghindari benturan AUTO_INCREMENT pada arsitektur sharding menggunakan ID terurut berdasarkan waktu (Time-ordered ID).'
		},

		// LEVEL 8 — BACKUP & RECOVERY
		{
			id: 'mysql-41',
			num: '41',
			title: 'Logical Backup with mysqldump & mydumper',
			level: 'Level 8 — Backup & Recovery',
			levelColor: 'bg-blue-50 text-blue-700 border-blue-200',
			objective: 'Membuat backup SQL dump berstruktur konsisten dengan parameter --single-transaction.',
			commands: `mysqldump -u root -p --single-transaction --quick --routines --triggers growth > backup_growth.sql`
		},
		{
			id: 'mysql-42',
			num: '42',
			title: 'Physical Backup with Percona XtraBackup',
			level: 'Level 8 — Backup & Recovery',
			levelColor: 'bg-blue-50 text-blue-700 border-blue-200',
			objective: 'Membuat physical binary backup tanpa mengunci tabel (*non-blocking hot backup*) untuk database ratusan GB.'
		},
		{
			id: 'mysql-43',
			num: '43',
			title: 'Disaster Simulation: DROP DATABASE & Restore',
			level: 'Level 8 — Backup & Recovery',
			levelColor: 'bg-blue-50 text-blue-700 border-blue-200',
			objective: 'Mensimulasikan tabel terhapus dan mengukur RTO (Recovery Time Objective) hingga data pulih.'
		},
		{
			id: 'mysql-44',
			num: '44',
			title: 'Point-in-Time Recovery (PITR) with Binlog Replay',
			level: 'Level 8 — Backup & Recovery',
			levelColor: 'bg-blue-50 text-blue-700 border-blue-200',
			objective: 'Mengembalikan database ke status detik 10:24:59 tepat 1 detik sebelum query DROP/DELETE salah dieksekusi di 10:25:00.',
			commands: `# 1. Restore full backup jam 10:00
mysql -u root -p growth < backup_10_00.sql

# 2. Replay Binlog sampai stop-datetime spesifik
mysqlbinlog --stop-datetime="2026-09-03 10:24:59" /var/lib/mysql/binlog.000001 | mysql -u root -p growth`
		},
		{
			id: 'mysql-45',
			num: '45',
			title: 'Disaster Recovery (DR) Drill Runbook',
			level: 'Level 8 — Backup & Recovery',
			levelColor: 'bg-blue-50 text-blue-700 border-blue-200',
			objective: 'Menyusun SOP dokumentasi pemulihan bencana saat seluruh cluster database mengalami kerusakan.'
		},

		// LEVEL 9 — OBSERVABILITY
		{
			id: 'mysql-46',
			num: '46',
			title: 'Performance Schema Deep Dive',
			level: 'Level 9 — Observability',
			levelColor: 'bg-teal-50 text-teal-700 border-teal-200',
			objective: 'Mendiagnosis query terberat, memory allocation, dan lock wait event langsung dari tabel sys / performance_schema.'
		},
		{
			id: 'mysql-47',
			num: '47',
			title: 'Slow Query Log & pt-query-digest',
			level: 'Level 9 — Observability',
			levelColor: 'bg-teal-50 text-teal-700 border-teal-200',
			objective: 'Merekam seluruh query yang berjalan di atas threshold (misal > 200ms) dan membuat ranking query bottleneck dengan Percona Toolkit.'
		},
		{
			id: 'mysql-48',
			num: '48',
			title: 'Core Database Metrics (QPS, TPS, Buffer Pool Hit Rate)',
			level: 'Level 9 — Observability',
			levelColor: 'bg-teal-50 text-teal-700 border-teal-200',
			objective: 'Memantau metrik krusial: Queries Per Second, Transactions Per Second, Threads Connected, dan Cache Hit Ratio.'
		},
		{
			id: 'mysql-49',
			num: '49',
			title: 'Proactive Alerting Rules',
			level: 'Level 9 — Observability',
			levelColor: 'bg-teal-50 text-teal-700 border-teal-200',
			objective: 'Memasang alert threshold (CPU > 80%, Active Connections > 85%, Replica Lag > 15s) sebelum pengguna mengeluhkan error.'
		},
		{
			id: 'mysql-50',
			num: '50',
			title: 'Grafana MySQL Dashboard Integration',
			level: 'Level 9 — Observability',
			levelColor: 'bg-teal-50 text-teal-700 border-teal-200',
			objective: 'Membangun dashboard visual time-series interaktif menggunakan Prometheus mysqld_exporter dan Grafana.'
		},

		// LEVEL 10 — PRODUCTION SIMULATION
		{
			id: 'mysql-51',
			num: '51',
			title: 'High-Traffic E-Commerce Workload (30M Records)',
			level: 'Level 10 — Production Simulation',
			levelColor: 'bg-slate-900 text-amber-400 border-slate-700',
			objective: 'Menjalankan load test intensif pada dataset realistis: 1M Users, 100K Products, 10M Orders, 30M Order Items.'
		},
		{
			id: 'mysql-52',
			num: '52',
			title: 'Production Incident: Heavy Replica Lag Investigation',
			level: 'Level 10 — Production Simulation',
			levelColor: 'bg-slate-900 text-amber-400 border-slate-700',
			objective: 'Menyelidiki dan menyelesaikan insiden saat read replica tertinggal 120 detik di tengah lonjakan checkout flash sale.'
		},
		{
			id: 'mysql-53',
			num: '53',
			title: 'Production Incident: Primary Server Crash & Failover',
			level: 'Level 10 — Production Simulation',
			levelColor: 'bg-slate-900 text-amber-400 border-slate-700',
			objective: 'Mengeksekusi failover instan tanpa data loss saat primary node mengalami crash mendadak.'
		},
		{
			id: 'mysql-54',
			num: '54',
			title: 'Production Incident: Accidental Data Deletion & PITR',
			level: 'Level 10 — Production Simulation',
			levelColor: 'bg-slate-900 text-amber-400 border-slate-700',
			objective: 'Menyelamatkan data order pelanggan yang terhapus akibat bug migrasi tanpa menghentikan transaksi baru yang sah.'
		},
		{
			id: 'mysql-55',
			num: '55',
			title: 'Capacity Planning & Hardware Estimation (10x Growth)',
			level: 'Level 10 — Production Simulation',
			levelColor: 'bg-slate-900 text-amber-400 border-slate-700',
			objective: 'Menghitung kebutuhan RAM, CPU Cores, Disk IOPS, dan Replicas saat traffic diproyeksikan naik dari 1,000 RPS ke 10,000 RPS.'
		},
		{
			id: 'mysql-56',
			num: '56',
			title: 'The Ultimate MySQL Production Architecture',
			level: 'Level 10 — Production Simulation',
			levelColor: 'bg-slate-900 text-amber-400 border-slate-700',
			objective: 'Menggabungkan seluruh pilar arsitektur database: Group Replication, Router, Read Scaling, Caching, PITR, dan Monitoring.',
			architecture: `                           INTERNET
                              │
                              ▼
                         Load Balancer
                              │
                     ┌────────┼────────┐
                     ▼        ▼        ▼
                   API #1   API #2   API #3
                     │        │        │
                     └────────┼────────┘
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
                  Redis              Router (Split Read/Write)
                                      │
                         ┌────────────┼────────────┐
                         ▼            ▼            ▼
                      MySQL #1     MySQL #2     MySQL #3
                      PRIMARY      REPLICA      REPLICA
                         │
                         └────── Replication ──────┘`,
			deliverable: `Final Scorecard Verification:
• SQL & Index Optimization
• MVCC, ACID & Lock Resolution
• High Availability & Auto-Failover
• Point-in-Time Recovery
• Full Observability Metrics`
		}
	];

	// Interactive States
	let selectedLevel = $state('All');
	let searchQuery = $state('');
	let completedChallenges = $state<string[]>([]);
	let activeChallengeId = $state<string>(mysqlChallenges[0].id);
	let copiedSnippet = $state(false);

	// Load completion state from localStorage
	$effect(() => {
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('portal_mysql_completed');
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
			localStorage.setItem('portal_mysql_completed', JSON.stringify(completedChallenges));
		}
	}

	let filteredChallenges = $derived(
		mysqlChallenges.filter((c) => {
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
		mysqlChallenges.find((c) => c.id === activeChallengeId) || mysqlChallenges[0]
	);

	let progressPercent = $derived(
		Math.round((completedChallenges.length / mysqlChallenges.length) * 100)
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
	<title>MySQL Advanced Challenges - Portal Sistem</title>
</svelte:head>

<main class="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
	
	<!-- Top Hero Banner -->
	<div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-50 via-blue-50/40 to-white border border-sky-100/80 p-8 sm:p-10 mb-8 shadow-sm">
		<div class="absolute -right-10 -bottom-10 w-72 h-72 bg-sky-200/30 rounded-full blur-3xl pointer-events-none"></div>
		
		<div class="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
			<div class="max-w-3xl">
				<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/80 border border-sky-200 text-sky-800 text-xs font-semibold mb-3">
					<span class="w-2 h-2 rounded-full bg-sky-600 animate-pulse"></span>
					Production Database Engineering Roadmap
				</div>
				<h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
					🐬 MySQL Advanced Challenges
				</h1>
				<p class="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
					<strong>Goal:</strong> Master MySQL from SQL fundamentals to production-grade database architecture. Prinsip belajar: <em>Build ➔ Measure ➔ Break ➔ Investigate ➔ Optimize ➔ Recover</em>.
				</p>

				<!-- Learning Highlights -->
				<div class="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-700">
					<span class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">⚡ B-Tree & Covering Index</span>
					<span class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">🔒 MVCC & Deadlock</span>
					<span class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">🔁 Read Replicas & GTID</span>
					<span class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">🛡️ Auto-Failover & Router</span>
					<span class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">💾 Point-in-Time Recovery</span>
				</div>
			</div>

			<!-- Progress Tracker Card -->
			<div class="bg-white/95 border border-slate-200/90 rounded-2xl p-5 shadow-xs shrink-0 w-full lg:w-72">
				<div class="flex items-center justify-between mb-2">
					<span class="text-xs font-bold text-slate-700 uppercase tracking-wider">Progress Path</span>
					<span class="text-xs font-black text-sky-600">{progressPercent}% Selesai</span>
				</div>
				<!-- Progress Bar -->
				<div class="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mb-3 border border-slate-200">
					<div
						class="h-full bg-gradient-to-r from-sky-500 to-blue-600 transition-all duration-300 rounded-full"
						style="width: {progressPercent}%"
					></div>
				</div>
				<div class="flex items-center justify-between text-xs text-slate-500">
					<span>{completedChallenges.length} dari {mysqlChallenges.length} Selesai</span>
					<span class="font-bold text-slate-700">56 Modul</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Filter & Search Toolbar -->
	<div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs">
		<!-- Level Filter Dropdown -->
		<div class="flex items-center gap-3">
			<span class="text-xs font-bold text-slate-700 uppercase tracking-wider shrink-0 flex items-center gap-1.5">
				<svg class="w-4 h-4 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
				</svg>
				Filter Level:
			</span>
			<div class="relative w-full sm:w-64">
				<select
					bind:value={selectedLevel}
					class="w-full pl-3 pr-8 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold rounded-xl text-slate-800 focus:outline-none focus:border-sky-500 cursor-pointer appearance-none transition"
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
				placeholder="Cari challenge MySQL..."
				class="w-full pl-9 pr-3 py-2 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 text-xs text-slate-900 rounded-xl focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/10 placeholder-slate-400 transition"
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
						class="w-full text-left p-4 rounded-2xl border transition duration-150 cursor-pointer flex flex-col justify-between {isActive ? 'bg-white border-sky-500 shadow-md ring-2 ring-sky-500/10' : 'bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-xs'}"
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
								<span class="inline-flex items-center gap-1 text-[11px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
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
							class="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl transition cursor-pointer {completedChallenges.includes(activeChallenge.id) ? 'bg-sky-600 hover:bg-sky-700 text-white shadow-xs' : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'}"
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
						<p class="text-sm font-semibold text-slate-800 bg-sky-50/60 border border-sky-100 rounded-xl p-3.5">
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
							<pre class="p-4 bg-slate-900 text-sky-400 rounded-2xl text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">{activeChallenge.architecture}</pre>
						</div>
					{/if}

					<!-- Tasks list -->
					{#if activeChallenge.tasks}
						<div>
							<h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">✅ Tasks to Complete</h4>
							<ul class="space-y-1.5">
								{#each activeChallenge.tasks as task}
									<li class="flex items-center gap-2 text-xs sm:text-sm text-slate-700 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200/60">
										<span class="w-1.5 h-1.5 rounded-full bg-sky-600 shrink-0"></span>
										<span>{task}</span>
									</li>
								{/each}
							</ul>
						</div>
					{/if}

					<!-- SQL Code Snippet -->
					{#if activeChallenge.sqlSnippet}
						<div>
							<div class="flex items-center justify-between mb-2">
								<h4 class="text-xs font-bold uppercase tracking-wider text-slate-400">📄 SQL Script / Query</h4>
								<button
									type="button"
									onclick={() => copyText(activeChallenge.sqlSnippet!)}
									class="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition cursor-pointer"
								>
									{copiedSnippet ? '✓ Tersalin' : '📋 Salin SQL'}
								</button>
							</div>
							<pre class="p-4 bg-slate-900 text-slate-100 rounded-2xl text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">{activeChallenge.sqlSnippet}</pre>
						</div>
					{/if}

					<!-- Commands if available -->
					{#if activeChallenge.commands}
						<div>
							<div class="flex items-center justify-between mb-2">
								<h4 class="text-xs font-bold uppercase tracking-wider text-slate-400">⌨️ Terminal Commands</h4>
								<button
									type="button"
									onclick={() => copyText(activeChallenge.commands!)}
									class="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition cursor-pointer"
								>
									{copiedSnippet ? '✓ Tersalin' : '📋 Salin Command'}
								</button>
							</div>
							<pre class="p-4 bg-slate-900 text-amber-300 rounded-2xl text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">{activeChallenge.commands}</pre>
						</div>
					{/if}

					<!-- Analytical Questions -->
					{#if activeChallenge.questions}
						<div>
							<h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">❓ Critical Questions to Answer</h4>
							<ul class="space-y-2">
								{#each activeChallenge.questions as q}
									<li class="flex items-start gap-2 text-xs sm:text-sm text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
										<span class="w-4 h-4 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
											?
										</span>
										<span>{q}</span>
									</li>
								{/each}
							</ul>
						</div>
					{/if}

					{#if activeChallenge.important}
						<div class="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900">
							<strong class="font-bold">⚠️ Catatan Penting:</strong> {activeChallenge.important}
						</div>
					{/if}

					{#if activeChallenge.deliverable}
						<div>
							<h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">📦 Expected Deliverable</h4>
							<pre class="text-xs text-slate-800 whitespace-pre-line bg-amber-50/60 border border-amber-200/70 rounded-2xl p-3.5 font-mono">{activeChallenge.deliverable}</pre>
						</div>
					{/if}

					{#if activeChallenge.bonus}
						<div class="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200/80 text-xs text-indigo-900">
							<span class="font-bold">🌟 Bonus:</span> {activeChallenge.bonus}
						</div>
					{/if}

				</div>
			</div>
		</div>

	</div>

	<!-- Incident Report & Definition of Done -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
		
		<!-- Incident Report Template -->
		<div class="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs">
			<div class="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 text-sky-600 flex items-center justify-center mb-4">
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
				</svg>
			</div>
			<h3 class="text-lg font-bold text-slate-900 mb-2">📝 Incident Report Template</h3>
			<p class="text-xs text-slate-500 mb-4">Gunakan format ini untuk setiap kegagalan/investigasi database:</p>
			
			<div class="space-y-2 text-xs font-mono text-slate-800 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 leading-relaxed">
				<p>• <strong>Incident:</strong> Title, Date, Severity (P1/P2/P3)</p>
				<p>• <strong>Impact:</strong> Users affected, Downtime (s), Data loss</p>
				<p>• <strong>Timeline:</strong> Issue started ➔ Alert ➔ Root cause ➔ Recovered</p>
				<p>• <strong>Evidence:</strong> Metrics, Slow query logs, Binlog position</p>
				<p>• <strong>Resolution & Prevention:</strong> Mitigasi permanen</p>
			</div>
		</div>

		<!-- Definition of Done -->
		<div class="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 shadow-xl flex flex-col justify-between">
			<div>
				<div class="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center mb-4">
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
					</svg>
				</div>
				<h3 class="text-lg font-bold text-white mb-2">🏁 Definition of Done</h3>
				<blockquote class="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs text-slate-200 leading-relaxed italic mb-4">
					"The goal is not just knowing MySQL commands. The goal is knowing how to keep a database <strong>correct, fast, scalable, observable, and recoverable under failure</strong>."
				</blockquote>
				<p class="text-xs text-sky-400 font-semibold">
					💡 Mindset: Kalau traffic naik 10x apa yang bottleneck? Kalau primary crash, bagaimana failover otomatis bekerja?
				</p>
			</div>

			<div class="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
				<span>Progress: {completedChallenges.length} / 56 Selesai</span>
				<span class="text-sky-400 font-bold">{progressPercent}%</span>
			</div>
		</div>

	</div>

</main>
