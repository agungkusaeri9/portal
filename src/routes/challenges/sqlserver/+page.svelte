<script lang="ts">
	interface SqlServerChallenge {
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
		'Level 2 — Query & Performance',
		'Level 3 — Transactions & Concurrency',
		'Level 4 — SQL Server Internals',
		'Level 5 — Advanced T-SQL',
		'Level 6 — Observability & Query Store',
		'Level 7 — Backup & Recovery',
		'Level 8 — Replication & Always On HA',
		'Level 9 — Scaling',
		'Level 10 — Production Incidents'
	];

	const sqlServerChallenges: SqlServerChallenge[] = [
		// LEVEL 1 — FUNDAMENTALS
		{
			id: 'mssql-01',
			num: '01',
			title: 'SQL Server 2022 Setup with Docker',
			level: 'Level 1 — Fundamentals',
			levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
			objective: 'Menjalankan Microsoft SQL Server 2022 container dan memahami sistem database default.',
			commands: `docker run \\
  -e "ACCEPT_EULA=Y" \\
  -e "MSSQL_SA_PASSWORD=YourStrongPassword123!" \\
  -p 1433:1433 \\
  --name sqlserver \\
  -d mcr.microsoft.com/mssql/server:2022-latest`,
			questions: [
				'Apa fungsi port default 1433 di SQL Server?',
				'Apa fungsi 4 system database default: master, model, msdb, dan tempdb?',
				'Apa perbedaan antara SQL Server Instance, Database, dan Schema?'
			]
		},
		{
			id: 'mssql-02',
			num: '02',
			title: 'GrowthStore Schema Design & Relational Tables',
			level: 'Level 1 — Fundamentals',
			levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
			objective: 'Mendesain database relasional e-commerce dengan T-SQL DDL, PK, FK, dan constraint integritas.',
			architecture: `Users (1) ──► (N) Orders (1) ──► (N) OrderItems (N) ◄── (1) Products`,
			tasks: [
				'Buat database GrowthStore dan schema dbo',
				'Buat tabel Users, Products, Orders, OrderItems',
				'Definisikan PK IDENTITY(1,1), FK, dan constraints',
				'Insert sample record'
			],
			sqlSnippet: `CREATE DATABASE GrowthStore;
GO
USE GrowthStore;
GO

CREATE TABLE Users (
    Id BIGINT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Email NVARCHAR(150) UNIQUE NOT NULL,
    CreatedAt DATETIME2 DEFAULT SYSDATETIME()
);

CREATE TABLE Products (
    Id BIGINT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(150) NOT NULL,
    Price DECIMAL(18,2) NOT NULL CHECK (Price >= 0),
    Stock INT NOT NULL DEFAULT 0 CHECK (Stock >= 0)
);

CREATE TABLE Orders (
    Id BIGINT IDENTITY(1,1) PRIMARY KEY,
    UserId BIGINT NOT NULL,
    Status NVARCHAR(50) DEFAULT 'Pending',
    TotalAmount DECIMAL(18,2) NOT NULL DEFAULT 0,
    CreatedAt DATETIME2 DEFAULT SYSDATETIME(),
    CONSTRAINT FK_Orders_Users FOREIGN KEY (UserId) REFERENCES Users(Id)
);

CREATE TABLE OrderItems (
    Id BIGINT IDENTITY(1,1) PRIMARY KEY,
    OrderId BIGINT NOT NULL,
    ProductId BIGINT NOT NULL,
    Quantity INT NOT NULL CHECK (Quantity > 0),
    Price DECIMAL(18,2) NOT NULL,
    CONSTRAINT FK_OrderItems_Orders FOREIGN KEY (OrderId) REFERENCES Orders(Id),
    CONSTRAINT FK_OrderItems_Products FOREIGN KEY (ProductId) REFERENCES Products(Id)
);`
		},
		{
			id: 'mssql-03',
			num: '03',
			title: 'T-SQL CRUD & OUTPUT Clause',
			level: 'Level 1 — Fundamentals',
			levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
			objective: 'Memanipulasi data dengan klausa OUTPUT untuk menangkap identitas row yang baru diinsert/update.',
			sqlSnippet: `-- INSERT dengan klausa OUTPUT
INSERT INTO Products (Name, Price, Stock)
OUTPUT INSERTED.Id, INSERTED.Name, INSERTED.Price
VALUES ('Mechanical Keyboard', 850000, 25);

-- UPDATE dengan klausa OUTPUT (Audit perubahan)
UPDATE Products
SET Stock = Stock - 1
OUTPUT DELETED.Stock AS OldStock, INSERTED.Stock AS NewStock
WHERE Id = 1;`
		},
		{
			id: 'mssql-04',
			num: '04',
			title: 'Multi-Table JOINs (INNER, LEFT, RIGHT, FULL OUTER)',
			level: 'Level 1 — Fundamentals',
			levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
			objective: 'Menggabungkan tabel secara presisi dan memahami perbedaan FULL OUTER JOIN di SQL Server.',
			sqlSnippet: `SELECT 
    u.Name AS CustomerName,
    o.Id AS OrderId,
    o.Status AS OrderStatus,
    p.Name AS ProductName,
    oi.Quantity,
    oi.Price,
    (oi.Quantity * oi.Price) AS Subtotal
FROM Orders o
INNER JOIN Users u ON o.UserId = u.Id
INNER JOIN OrderItems oi ON o.Id = oi.OrderId
INNER JOIN Products p ON oi.ProductId = p.Id
WHERE o.Status = 'Paid';`
		},
		{
			id: 'mssql-05',
			num: '05',
			title: 'Aggregations & Business Metrics',
			level: 'Level 1 — Fundamentals',
			levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
			objective: 'Menghitung KPI bisnis: Revenue, Orders per User, Sales per Product, dan AOV.',
			sqlSnippet: `SELECT 
    p.Id,
    p.Name,
    SUM(oi.Quantity) AS TotalUnitsSold,
    SUM(oi.Quantity * oi.Price) AS TotalRevenue,
    AVG(oi.Price) AS AvgSellingPrice
FROM OrderItems oi
INNER JOIN Products p ON oi.ProductId = p.Id
GROUP BY p.Id, p.Name
HAVING SUM(oi.Quantity) > 10
ORDER BY TotalRevenue DESC;`
		},
		{
			id: 'mssql-06',
			num: '06',
			title: 'Data Integrity Constraints',
			level: 'Level 1 — Fundamentals',
			levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
			objective: 'Menguji penolakan data invalid oleh SQL Server via PRIMARY KEY, CHECK, dan FOREIGN KEY constraint.'
		},
		{
			id: 'mssql-07',
			num: '07',
			title: 'Transactional Stored Procedure (CreateOrder)',
			level: 'Level 1 — Fundamentals',
			levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
			objective: 'Membungkus alur checkout kompleks dalam Stored Procedure dengan TRY...CATCH dan transaction rollback.',
			sqlSnippet: `CREATE OR ALTER PROCEDURE dbo.CreateOrder
    @UserId BIGINT,
    @ProductId BIGINT,
    @Quantity INT
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        BEGIN TRANSACTION;
        
        -- 1. Validasi Stok Produk
        DECLARE @CurrentStock INT, @Price DECIMAL(18,2);
        SELECT @CurrentStock = Stock, @Price = Price 
        FROM Products WITH (UPDLOCK, ROWLOCK) 
        WHERE Id = @ProductId;
        
        IF @CurrentStock < @Quantity
            THROW 50001, 'Insufficient product stock!', 1;
            
        -- 2. Buat Order
        DECLARE @NewOrderId BIGINT;
        INSERT INTO Orders (UserId, Status, TotalAmount)
        VALUES (@UserId, 'Pending', @Price * @Quantity);
        SET @NewOrderId = SCOPE_IDENTITY();
        
        -- 3. Buat Order Item
        INSERT INTO OrderItems (OrderId, ProductId, Quantity, Price)
        VALUES (@NewOrderId, @ProductId, @Quantity, @Price);
        
        -- 4. Kurangi Stok
        UPDATE Products SET Stock = Stock - @Quantity WHERE Id = @ProductId;
        
        COMMIT TRANSACTION;
        SELECT @NewOrderId AS OrderId, 'Success' AS Message;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END;`
		},

		// LEVEL 2 — QUERY & PERFORMANCE
		{
			id: 'mssql-08',
			num: '08',
			title: 'Index Basics & Table Scan Elimination',
			level: 'Level 2 — Query & Performance',
			levelColor: 'bg-amber-50 text-amber-700 border-amber-200',
			objective: 'Membandingkan biaya I/O (Logical Reads) dan duration antara Table Scan vs Index Seek pada 1 juta baris.',
			sqlSnippet: `-- Aktifkan I/O dan Time Statistics
SET STATISTICS IO ON;
SET STATISTICS TIME ON;

SELECT * FROM Users WHERE Email = 'user99999@example.com';`
		},
		{
			id: 'mssql-09',
			num: '09',
			title: 'Clustered Index & Physical Data Sorting',
			level: 'Level 2 — Query & Performance',
			levelColor: 'bg-amber-50 text-amber-700 border-amber-200',
			objective: 'Memahami bahwa Clustered Index adalah tabel itu sendiri yang datanya tersusun fisik secara berurutan.',
			questions: [
				'Mengapa hanya boleh ada 1 Clustered Index per tabel?',
				'Apa risiko menggunakan Random GUID (NEWID()) sebagai Clustered Key dibandingkan sequential identity (Page Split)?'
			]
		},
		{
			id: 'mssql-10',
			num: '10',
			title: 'Nonclustered Index & Row Pointer',
			level: 'Level 2 — Query & Performance',
			levelColor: 'bg-amber-50 text-amber-700 border-amber-200',
			objective: 'Mempelajari struktur terpisah Nonclustered B-Tree yang menyimpan pointer ke Clustered Key.',
			sqlSnippet: `CREATE NONCLUSTERED INDEX IX_Users_Email ON Users(Email);`
		},
		{
			id: 'mssql-11',
			num: '11',
			title: 'Composite Index & Leftmost Key Order',
			level: 'Level 2 — Query & Performance',
			levelColor: 'bg-amber-50 text-amber-700 border-amber-200',
			objective: 'Membuktikan efektivitas urutan kolom pada multi-column index terhadap Index Seek vs Scan.',
			sqlSnippet: `CREATE NONCLUSTERED INDEX IX_Orders_UserId_Status ON Orders(UserId, Status);

-- Index Seek (Efisien)
SELECT * FROM Orders WHERE UserId = 123 AND Status = 'Completed';`
		},
		{
			id: 'mssql-12',
			num: '12',
			title: 'Covering Index with INCLUDE Columns',
			level: 'Level 2 — Query & Performance',
			levelColor: 'bg-amber-50 text-amber-700 border-amber-200',
			objective: 'Menghilangkan Key Lookup yang mahal dengan menyimpan kolom payload pada level leaf index via INCLUDE.',
			sqlSnippet: `-- Nonclustered Index dengan INCLUDE
CREATE NONCLUSTERED INDEX IX_Orders_UserId_Covering 
ON Orders(UserId) 
INCLUDE (Status, CreatedAt, TotalAmount);

-- Query ini 100% dipenuhi oleh Index (0 Key Lookup!)
SELECT UserId, Status, CreatedAt, TotalAmount 
FROM Orders 
WHERE UserId = 123;`
		},
		{
			id: 'mssql-13',
			num: '13',
			title: 'Actual Execution Plan Operators Analysis',
			level: 'Level 2 — Query & Performance',
			levelColor: 'bg-amber-50 text-amber-700 border-amber-200',
			objective: 'Menganalisis operator termahal: Index Seek vs Scan, Key Lookup, Nested Loops, Hash Match, dan Sort Warning.',
			questions: [
				'Kapan SQL Server Query Optimizer memilih Hash Match vs Nested Loops?',
				'Apa arti tanda seru kuning (Warning) pada operator Sort di execution plan?'
			]
		},
		{
			id: 'mssql-14',
			num: '14',
			title: 'Database Statistics & Cardinality Estimation',
			level: 'Level 2 — Query & Performance',
			levelColor: 'bg-amber-50 text-amber-700 border-amber-200',
			objective: 'Memahami bagaimana histogram statistik mempengaruhi keakuratan perkiraan baris (Estimated vs Actual Rows).',
			commands: `DBCC SHOW_STATISTICS('Orders', 'IX_Orders_UserId_Status');
UPDATE STATISTICS Orders WITH FULLSCAN;`
		},
		{
			id: 'mssql-15',
			num: '15',
			title: 'Sargable T-SQL Optimization',
			level: 'Level 2 — Query & Performance',
			levelColor: 'bg-amber-50 text-amber-700 border-amber-200',
			objective: 'Mengubah query lambat non-sargable (e.g. CONVERT/YEAR/ISNULL) menjadi query yang ramah index seek.'
		},

		// LEVEL 3 — TRANSACTIONS & CONCURRENCY
		{
			id: 'mssql-16',
			num: '16',
			title: 'ACID Guarantee in T-SQL Transactions',
			level: 'Level 3 — Transactions & Concurrency',
			levelColor: 'bg-orange-50 text-orange-700 border-orange-200',
			objective: 'Menjamin integritas data saldo akun dengan transaksi atomik dan isolation level yang ketat.'
		},
		{
			id: 'mssql-17',
			num: '17',
			title: '5 Isolation Levels in SQL Server',
			level: 'Level 3 — Transactions & Concurrency',
			levelColor: 'bg-orange-50 text-orange-700 border-orange-200',
			objective: 'Menguji perbedaan perilaku Read Uncommitted, Read Committed, Repeatable Read, Snapshot, dan Serializable.',
			sqlSnippet: `SET TRANSACTION ISOLATION LEVEL SNAPSHOT;
-- atau: REPEATABLE READ / SERIALIZABLE`
		},
		{
			id: 'mssql-18',
			num: '18',
			title: 'Locking Granularity (Shared, Exclusive, Update Locks)',
			level: 'Level 3 — Transactions & Concurrency',
			levelColor: 'bg-orange-50 text-orange-700 border-orange-200',
			objective: 'Memantau lock hierarchy dari Row Lock (RID/KEY), Page Lock (PAG), hingga Table Lock (TAB).',
			commands: `SELECT * FROM sys.dm_tran_locks WHERE resource_database_id = DB_ID();`
		},
		{
			id: 'mssql-19',
			num: '19',
			title: 'Investigating Blocking Chains & Lead Blocker',
			level: 'Level 3 — Transactions & Concurrency',
			levelColor: 'bg-orange-50 text-orange-700 border-orange-200',
			objective: 'Mendiagnosis session yang menahan lock dan memblokir puluhan request lainnya menggunakan DMV.',
			sqlSnippet: `SELECT 
    blocking_session_id AS BlockerSPID,
    session_id AS BlockedSPID,
    wait_type,
    wait_time,
    wait_resource,
    text AS QueryText
FROM sys.dm_exec_requests r
CROSS APPLY sys.dm_exec_sql_text(r.sql_handle)
WHERE blocking_session_id <> 0;`
		},
		{
			id: 'mssql-20',
			num: '20',
			title: 'Deadlock Graph Extraction & Deadlock Priority',
			level: 'Level 3 — Transactions & Concurrency',
			levelColor: 'bg-orange-50 text-orange-700 border-orange-200',
			objective: 'Menganalisis Deadlock XML Graph dan mengatur SET DEADLOCK_PRIORITY LOW pada background job.',
			sqlSnippet: `SET DEADLOCK_PRIORITY LOW;`
		},
		{
			id: 'mssql-21',
			num: '21',
			title: 'Read Committed Snapshot Isolation (RCSI)',
			level: 'Level 3 — Transactions & Concurrency',
			levelColor: 'bg-orange-50 text-orange-700 border-orange-200',
			objective: 'Mengaktifkan RCSI agar SELECT tidak pernah memblokir UPDATE dan UPDATE tidak pernah memblokir SELECT via Version Store.',
			sqlSnippet: `ALTER DATABASE GrowthStore SET READ_COMMITTED_SNAPSHOT ON WITH ROLLBACK IMMEDIATE;`
		},

		// LEVEL 4 — SQL SERVER INTERNALS
		{
			id: 'mssql-22',
			num: '22',
			title: 'Buffer Pool Memory & Page Life Expectancy (PLE)',
			level: 'Level 4 — SQL Server Internals',
			levelColor: 'bg-rose-50 text-rose-700 border-rose-200',
			objective: 'Memantau kesehatan alokasi memori buffer cache dan metrik Page Life Expectancy.',
			sqlSnippet: `SELECT cntr_value AS PageLifeExpectancy_Seconds
FROM sys.dm_os_performance_counters
WHERE counter_name = 'Page life expectancy'
  AND object_name LIKE '%Buffer Manager%';`
		},
		{
			id: 'mssql-23',
			num: '23',
			title: 'Transaction Log Architecture & VLF Management',
			level: 'Level 4 — SQL Server Internals',
			levelColor: 'bg-rose-50 text-rose-700 border-rose-200',
			objective: 'Memahami Write-Ahead Logging (WAL) dan mencegah fragmentasi Virtual Log Files (VLF) yang membengkak.',
			commands: `DBCC LOGINFO;
DBCC SQLPERF(LOGSPACE);`
		},
		{
			id: 'mssql-24',
			num: '24',
			title: 'tempdb Contention & Allocation Maps (PFS/GAM/SGAM)',
			level: 'Level 4 — SQL Server Internals',
			levelColor: 'bg-rose-50 text-rose-700 border-rose-200',
			objective: 'Mengoptimalkan tempdb dengan multi data files sesuai jumlah CPU core untuk menghilangkan PAGELATCH contention.'
		},
		{
			id: 'mssql-25',
			num: '25',
			title: 'Checkpoint & Recovery Interval Tuning',
			level: 'Level 4 — SQL Server Internals',
			levelColor: 'bg-rose-50 text-rose-700 border-rose-200',
			objective: 'Memahami bagaimana Automatic Checkpoint menulis dirty pages ke disk untuk mempercepat recovery saat crash.'
		},
		{
			id: 'mssql-26',
			num: '26',
			title: 'Recovery Models (SIMPLE vs FULL vs BULK_LOGGED)',
			level: 'Level 4 — SQL Server Internals',
			levelColor: 'bg-rose-50 text-rose-700 border-rose-200',
			objective: 'Memahami mengapa FULL recovery model wajib disertai backup Transaction Log berkala agar LDF tidak memenuhi disk.',
			important: 'Pada FULL recovery model, Transaction Log tidak akan pernah di-truncate sebelum dilakukan BACKUP LOG!'
		},

		// LEVEL 5 — ADVANCED T-SQL
		{
			id: 'mssql-27',
			num: '27',
			title: 'Common Table Expressions (CTE)',
			level: 'Level 5 — Advanced T-SQL',
			levelColor: 'bg-purple-50 text-purple-700 border-purple-200',
			objective: 'Menyederhanakan subquery berlapis menjadi struktur deklaratif modular menggunakan WITH.',
			sqlSnippet: `WITH HighValueOrders AS (
    SELECT UserId, SUM(TotalAmount) AS TotalSpent
    FROM Orders
    WHERE Status = 'Completed'
    GROUP BY UserId
    HAVING SUM(TotalAmount) > 5000000
)
SELECT u.Name, u.Email, hvo.TotalSpent
FROM Users u
INNER JOIN HighValueOrders hvo ON u.Id = hvo.UserId;`
		},
		{
			id: 'mssql-28',
			num: '28',
			title: 'Recursive CTE for Hierarchy & Organization Trees',
			level: 'Level 5 — Advanced T-SQL',
			levelColor: 'bg-purple-50 text-purple-700 border-purple-200',
			objective: 'Menjelajahi struktur hirarki multi-level (Manager ➔ Karyawan) secara rekursif hingga leaf level.',
			sqlSnippet: `WITH OrgHierarchy AS (
    -- Anchor member (CEO)
    SELECT Id, Name, ManagerId, 1 AS Level
    FROM Employees
    WHERE ManagerId IS NULL
    
    UNION ALL
    
    -- Recursive member
    SELECT e.Id, e.Name, e.ManagerId, o.Level + 1
    FROM Employees e
    INNER JOIN OrgHierarchy o ON e.ManagerId = o.Id
)
SELECT * FROM OrgHierarchy ORDER BY Level, ManagerId;`
		},
		{
			id: 'mssql-29',
			num: '29',
			title: 'Window Functions (ROW_NUMBER, DENSE_RANK, LAG, LEAD)',
			level: 'Level 5 — Advanced T-SQL',
			levelColor: 'bg-purple-50 text-purple-700 border-purple-200',
			objective: 'Menghitung peringkat dalam kategori dan membandingkan selisih nilai antar baris tanpa subquery.',
			sqlSnippet: `SELECT 
    UserId,
    Id AS OrderId,
    TotalAmount,
    ROW_NUMBER() OVER (PARTITION BY UserId ORDER BY CreatedAt DESC) AS UserOrderSeq,
    LAG(TotalAmount, 1) OVER (PARTITION BY UserId ORDER BY CreatedAt ASC) AS PrevOrderAmount,
    SUM(TotalAmount) OVER (PARTITION BY UserId ORDER BY CreatedAt ASC) AS RunningTotalSpent
FROM Orders;`
		},
		{
			id: 'mssql-30',
			num: '30',
			title: 'JSON Processing (JSON_VALUE, OPENJSON, FOR JSON)',
			level: 'Level 5 — Advanced T-SQL',
			levelColor: 'bg-purple-50 text-purple-700 border-purple-200',
			objective: 'Menyimpan, mem-parse, dan meng-query atribut JSON semi-structured langsung di dalam T-SQL.',
			sqlSnippet: `SELECT JSON_VALUE(AttributesJson, '$.specs.ram') AS RAM_Size
FROM Products
WHERE ISJSON(AttributesJson) = 1;`
		},
		{
			id: 'mssql-31',
			num: '31',
			title: 'Full-Text Search (CONTAINS & FREETEXT)',
			level: 'Level 5 — Advanced T-SQL',
			levelColor: 'bg-purple-50 text-purple-700 border-purple-200',
			objective: 'Membangun pencarian teks linguistik cepat pada katalog produk menggunakan Full-Text Catalog & Index.'
		},
		{
			id: 'mssql-32',
			num: '32',
			title: 'System-Versioned Temporal Tables',
			level: 'Level 5 — Advanced T-SQL',
			levelColor: 'bg-purple-50 text-purple-700 border-purple-200',
			objective: 'Menyimpan histori seluruh perubahan data secara otomatis untuk audit dan time-travel query.',
			sqlSnippet: `CREATE TABLE dbo.ProductsAudit (
    Id BIGINT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Price DECIMAL(18,2) NOT NULL,
    SysStartTime DATETIME2 GENERATED ALWAYS AS ROW START,
    SysEndTime DATETIME2 GENERATED ALWAYS AS ROW END,
    PERIOD FOR SYSTEM_TIME (SysStartTime, SysEndTime)
) WITH (SYSTEM_VERSIONING = ON (HISTORY_TABLE = dbo.ProductsHistory));

-- Time Travel Query:
SELECT * FROM dbo.ProductsAudit FOR SYSTEM_TIME AS OF '2026-09-01 10:00:00';`
		},

		// LEVEL 6 — PERFORMANCE & OBSERVABILITY
		{
			id: 'mssql-33',
			num: '33',
			title: 'Query Store & Regressed Plan Forcing',
			level: 'Level 6 — Observability & Query Store',
			levelColor: 'bg-teal-50 text-teal-700 border-teal-200',
			objective: 'Merekam histori query execution plan dan memaksa (force) plan yang bagus saat terjadi regresi performa.',
			sqlSnippet: `ALTER DATABASE GrowthStore SET QUERY_STORE = ON;
-- Force Execution Plan yang cepat:
EXEC sp_query_store_force_plan @query_id = 42, @plan_id = 101;`
		},
		{
			id: 'mssql-34',
			num: '34',
			title: 'Extended Events for Deadlocks & Slow Queries',
			level: 'Level 6 — Observability & Query Store',
			levelColor: 'bg-teal-50 text-teal-700 border-teal-200',
			objective: 'Menangkap event deadlock dan query lambat dengan overhead CPU yang sangat rendah (<1%).'
		},
		{
			id: 'mssql-35',
			num: '35',
			title: 'SQL Server Profiler vs Extended Events',
			level: 'Level 6 — Observability & Query Store',
			levelColor: 'bg-teal-50 text-teal-700 border-teal-200',
			objective: 'Memahami mengapa SQL Server Profiler deprecated dan Extended Events menjadi standar modern.'
		},
		{
			id: 'mssql-36',
			num: '36',
			title: 'Wait Statistics Diagnosis (CXPACKET, PAGEIOLATCH, LCK_M_X)',
			level: 'Level 6 — Observability & Query Store',
			levelColor: 'bg-teal-50 text-teal-700 border-teal-200',
			objective: 'Mendiagnosis apa yang sebenarnya ditunggu oleh SQL Server saat CPU tinggi atau query terasa lambat.',
			sqlSnippet: `SELECT TOP 10 
    wait_type, 
    waiting_tasks_count, 
    wait_time_ms / 1000.0 AS TotalWaitSeconds,
    (wait_time_ms - signal_wait_time_ms) / 1000.0 AS ResourceWaitSeconds
FROM sys.dm_os_wait_stats
WHERE wait_type NOT IN ('CLR_SEMAPHORE', 'LAZYWRITER_SLEEP', 'SLEEP_TASK')
ORDER BY wait_time_ms DESC;`
		},
		{
			id: 'mssql-37',
			num: '37',
			title: 'Real-time Performance DMV Dashboard',
			level: 'Level 6 — Observability & Query Store',
			levelColor: 'bg-teal-50 text-teal-700 border-teal-200',
			objective: 'Membuat query agregat DMV untuk memantau Batch Requests/sec, Compilations, dan Memory Grant Pending.'
		},

		// LEVEL 7 — BACKUP & RECOVERY
		{
			id: 'mssql-38',
			num: '38',
			title: 'Full Database Backup & Integrity Check (DBCC CHECKDB)',
			level: 'Level 7 — Backup & Recovery',
			levelColor: 'bg-blue-50 text-blue-700 border-blue-200',
			objective: 'Memvalidasi integritas struktur fisik database dan membuat Full Backup .bak.',
			sqlSnippet: `DBCC CHECKDB('GrowthStore') WITH NO_INFOMSGS;
BACKUP DATABASE GrowthStore TO DISK = '/var/opt/mssql/backup/GrowthStore_Full.bak' WITH COMPRESSION, STATS = 10;`
		},
		{
			id: 'mssql-39',
			num: '39',
			title: 'Differential Backup Strategy',
			level: 'Level 7 — Backup & Recovery',
			levelColor: 'bg-blue-50 text-blue-700 border-blue-200',
			objective: 'Merekam hanya data page yang berubah (Extent Map) sejak Full Backup terakhir untuk menghemat storage dan waktu.',
			sqlSnippet: `BACKUP DATABASE GrowthStore TO DISK = '/var/opt/mssql/backup/GrowthStore_Diff.bak' WITH DIFFERENTIAL;`
		},
		{
			id: 'mssql-40',
			num: '40',
			title: 'Transaction Log Backup & LDF Truncation',
			level: 'Level 7 — Backup & Recovery',
			levelColor: 'bg-blue-50 text-blue-700 border-blue-200',
			objective: 'Membuat backup transaction log berkala (misal setiap 15 menit) dan mengosongkan inactive VLF.',
			sqlSnippet: `BACKUP LOG GrowthStore TO DISK = '/var/opt/mssql/backup/GrowthStore_Log_1.trn' WITH COMPRESSION;`
		},
		{
			id: 'mssql-41',
			num: '41',
			title: 'Full Restore Chain (Full + Diff + Multi-Log)',
			level: 'Level 7 — Backup & Recovery',
			levelColor: 'bg-blue-50 text-blue-700 border-blue-200',
			objective: 'Merestore rantai backup dengan opsi NORECOVERY hingga file log terakhir direstore dengan RECOVERY.',
			sqlSnippet: `-- 1. Restore Full (Belum selesai: WITH NORECOVERY)
RESTORE DATABASE GrowthStore FROM DISK = 'Full.bak' WITH NORECOVERY;

-- 2. Restore Diff (WITH NORECOVERY)
RESTORE DATABASE GrowthStore FROM DISK = 'Diff.bak' WITH NORECOVERY;

-- 3. Restore Log Terakhir (Selesai: WITH RECOVERY)
RESTORE LOG GrowthStore FROM DISK = 'Log1.trn' WITH RECOVERY;`
		},
		{
			id: 'mssql-42',
			num: '42',
			title: 'Point-in-Time Recovery with STOPAT',
			level: 'Level 7 — Backup & Recovery',
			levelColor: 'bg-blue-50 text-blue-700 border-blue-200',
			objective: 'Memulihkan database tepat pada jam 10:24:59 sebelum kesalahan query terjadi pada 10:25:00.',
			sqlSnippet: `RESTORE LOG GrowthStore FROM DISK = 'Log_Active.trn' 
WITH STOPAT = '2026-09-03 10:24:59', RECOVERY;`
		},
		{
			id: 'mssql-43',
			num: '43',
			title: 'Disaster Recovery Drill & RTO/RPO Measurement',
			level: 'Level 7 — Backup & Recovery',
			levelColor: 'bg-blue-50 text-blue-700 border-blue-200',
			objective: 'Mensimulasikan kerusakan disk total dan mengukur Recovery Time Objective (RTO) dan Recovery Point Objective (RPO).'
		},

		// LEVEL 8 — REPLICATION & ALWAYS ON HA
		{
			id: 'mssql-44',
			num: '44',
			title: 'Transactional Replication (Publisher ➔ Distributor ➔ Subscriber)',
			level: 'Level 8 — Replication & Always On HA',
			levelColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
			objective: 'Mendistribusikan perubahan data tabel individual secara asinkron ke reporting database server.'
		},
		{
			id: 'mssql-45',
			num: '45',
			title: 'Read-Scale Availability Groups (Without WSFC)',
			level: 'Level 8 — Replication & Always On HA',
			levelColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
			objective: 'Membangun Read-Scale AG di Linux/Docker tanpa Windows Server Failover Cluster.'
		},
		{
			id: 'mssql-46',
			num: '46',
			title: 'Always On Availability Groups (AG) Architecture',
			level: 'Level 8 — Replication & Always On HA',
			levelColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
			objective: 'Mengkonfigurasi High Availability tingkat enterprise dengan Availability Group Listener dan multi-replica.',
			architecture: `                 AG Listener (DNS)
                        │
             ┌──────────┴──────────┐
             ▼                     ▼
      Primary Replica       Secondary Replica
      (Read/Write)          (Synchronous / Async)`
		},
		{
			id: 'mssql-47',
			num: '47',
			title: 'Synchronous vs Asynchronous Commit Commit Latency',
			level: 'Level 8 — Replication & Always On HA',
			levelColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
			objective: 'Mengukur trade-off latency transaksi penulisan (Sync Commit) vs risiko data loss (Async Commit).'
		},
		{
			id: 'mssql-48',
			num: '48',
			title: 'Automatic Failover Simulation & Recovery',
			level: 'Level 8 — Replication & Always On HA',
			levelColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
			objective: 'Mematikan Primary node secara mendadak dan memverifikasi Secondary otomatis menjadi Primary dalam hitungan detik.'
		},
		{
			id: 'mssql-49',
			num: '49',
			title: 'Read-Only Routing with ReadIntent Connection String',
			level: 'Level 8 — Replication & Always On HA',
			levelColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
			objective: 'Mengatur listener agar koneksi dengan parameter ApplicationIntent=ReadOnly otomatis diarahkan ke Secondary.'
		},

		// LEVEL 9 — SCALING
		{
			id: 'mssql-50',
			num: '50',
			title: 'Table Partitioning (Partition Function & Scheme)',
			level: 'Level 9 — Scaling',
			levelColor: 'bg-purple-50 text-purple-700 border-purple-200',
			objective: 'Memecah tabel Orders puluhan juta baris ke filegroup terpisah berdasarkan tahun pemesanan.',
			sqlSnippet: `CREATE PARTITION FUNCTION OrderDateRangePF (DATETIME2)
AS RANGE RIGHT FOR VALUES ('2024-01-01', '2025-01-01', '2026-01-01');

CREATE PARTITION SCHEME OrderDateRangePS
AS PARTITION OrderDateRangePF ALL TO ([PRIMARY]);`
		},
		{
			id: 'mssql-51',
			num: '51',
			title: 'Read Scale Benchmark with Multiple Secondaries',
			level: 'Level 9 — Scaling',
			levelColor: 'bg-purple-50 text-purple-700 border-purple-200',
			objective: 'Menguji throughput query SELECT dengan 1, 2, dan 3 readable secondary replicas di bawah beban k6.'
		},
		{
			id: 'mssql-52',
			num: '52',
			title: 'Write Throughput Bottleneck & WRITELOG Wait',
			level: 'Level 9 — Scaling',
			levelColor: 'bg-purple-50 text-purple-700 border-purple-200',
			objective: 'Mengidentifikasi batas maksimum penulisan TPS pada disk log dan mengoptimalkan Delayed Durability.'
		},
		{
			id: 'mssql-53',
			num: '53',
			title: 'Capacity Planning & Hardware Estimation (10,000 RPS)',
			level: 'Level 9 — Scaling',
			levelColor: 'bg-purple-50 text-purple-700 border-purple-200',
			objective: 'Menghitung proyeksi Core CPU, Buffer RAM, IOPS NVMe, dan bandwidth AG replikasi saat traffic naik 10x.'
		},

		// LEVEL 10 — PRODUCTION INCIDENTS
		{
			id: 'mssql-54',
			num: '54',
			title: 'Production Incident: 10x Traffic Spike & CPU Saturation',
			level: 'Level 10 — Production Incidents',
			levelColor: 'bg-slate-900 text-amber-400 border-slate-700',
			objective: 'Menyelidiki lonjakan CPU 100% mendadak menggunakan DMV dan Query Store untuk menemukan query penyebab regresi.'
		},
		{
			id: 'mssql-55',
			num: '55',
			title: 'Production Incident: Severe Blocking Chain Triage',
			level: 'Level 10 — Production Incidents',
			levelColor: 'bg-slate-900 text-amber-400 border-slate-700',
			objective: 'Mengatasi antrian blocking yang menyebabkan request API timeout dengan membunuh Lead Blocker (KILL SPID).'
		},
		{
			id: 'mssql-56',
			num: '56',
			title: 'Production Incident: Rapid Deadlock Storm Resolution',
			level: 'Level 10 — Production Incidents',
			levelColor: 'bg-slate-900 text-amber-400 border-slate-700',
			objective: 'Mengekstrak XML Deadlock Graph dari Extended Events dan memperbaiki urutan indexing/locking di kode aplikasi.'
		},
		{
			id: 'mssql-57',
			num: '57',
			title: 'Production Incident: Primary Hard Crash & Failover',
			level: 'Level 10 — Production Incidents',
			levelColor: 'bg-slate-900 text-amber-400 border-slate-700',
			objective: 'Mengeksekusi failover Availability Group tanpa kehilangan transaksi data perbankan yang sah.'
		},
		{
			id: 'mssql-58',
			num: '58',
			title: 'Production Incident: Accidental TRUNCATE & PITR Recovery',
			level: 'Level 10 — Production Incidents',
			levelColor: 'bg-slate-900 text-amber-400 border-slate-700',
			objective: 'Memulihkan data tabel yang tidak sengaja terhapus menggunakan Point-in-Time Recovery STOPAT.'
		},
		{
			id: 'mssql-59',
			num: '59',
			title: 'The Ultimate SQL Server Production Architecture Simulation',
			level: 'Level 10 — Production Incidents',
			levelColor: 'bg-slate-900 text-amber-400 border-slate-700',
			objective: 'Mensimulasikan ekosistem produksi penuh: AG Listener, Read-Scale Replicas, Query Store, Temporal Tables, dan k6 Load Test.',
			architecture: `                           k6 Load Test
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
                                ▼
                       SQL Server AG Listener
                                │
                    ┌───────────┴───────────┐
                    ▼                       ▼
            Primary Replica         Secondary Replica
            (Read / Write)          (Read Intent Only)
                    │                       │
                    └────── Replication ────┘`,
			deliverable: `Final Scorecard Verification:
• T-SQL, Stored Procedures & Constraints
• Clustered, Nonclustered & Covering Indexes
• RCSI, Lock Contention & Deadlock Resolution
• Always On AG & Auto-Failover
• Point-in-Time Recovery & Query Store`
		}
	];

	// Interactive States
	let selectedLevel = $state('All');
	let searchQuery = $state('');
	let completedChallenges = $state<string[]>([]);
	let activeChallengeId = $state<string>(sqlServerChallenges[0].id);
	let copiedSnippet = $state(false);

	// Load completion state from localStorage
	$effect(() => {
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('portal_mssql_completed');
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
			localStorage.setItem('portal_mssql_completed', JSON.stringify(completedChallenges));
		}
	}

	let filteredChallenges = $derived(
		sqlServerChallenges.filter((c) => {
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
		sqlServerChallenges.find((c) => c.id === activeChallengeId) || sqlServerChallenges[0]
	);

	let progressPercent = $derived(
		Math.round((completedChallenges.length / sqlServerChallenges.length) * 100)
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
	<title>SQL Server Advanced Challenges - Portal Sistem</title>
</svelte:head>

<main class="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
	
	<!-- Top Hero Banner -->
	<div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-50 via-rose-50/40 to-white border border-red-100/80 p-8 sm:p-10 mb-8 shadow-sm">
		<div class="absolute -right-10 -bottom-10 w-72 h-72 bg-red-200/30 rounded-full blur-3xl pointer-events-none"></div>
		
		<div class="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
			<div class="max-w-3xl">
				<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100/80 border border-red-200 text-red-800 text-xs font-semibold mb-3">
					<span class="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
					Enterprise Database Engineering Roadmap
				</div>
				<h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
					🗄️ SQL Server Advanced Challenges
				</h1>
				<p class="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
					<strong>Goal:</strong> Master Microsoft SQL Server from T-SQL fundamentals to production-grade database architecture. Prinsip belajar: <em>Build ➔ Measure ➔ Break ➔ Investigate ➔ Optimize ➔ Recover</em>.
				</p>

				<!-- Learning Highlights -->
				<div class="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-700">
					<span class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">⚡ Clustered & Covering Index</span>
					<span class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">🔒 Locking, Blocking & RCSI</span>
					<span class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">📊 Query Store & Wait Stats</span>
					<span class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">🛡️ Always On Availability Groups</span>
					<span class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">💾 Point-in-Time STOPAT Recovery</span>
				</div>
			</div>

			<!-- Progress Tracker Card -->
			<div class="bg-white/95 border border-slate-200/90 rounded-2xl p-5 shadow-xs shrink-0 w-full lg:w-72">
				<div class="flex items-center justify-between mb-2">
					<span class="text-xs font-bold text-slate-700 uppercase tracking-wider">Progress Path</span>
					<span class="text-xs font-black text-red-600">{progressPercent}% Selesai</span>
				</div>
				<!-- Progress Bar -->
				<div class="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mb-3 border border-slate-200">
					<div
						class="h-full bg-gradient-to-r from-red-500 to-rose-600 transition-all duration-300 rounded-full"
						style="width: {progressPercent}%"
					></div>
				</div>
				<div class="flex items-center justify-between text-xs text-slate-500">
					<span>{completedChallenges.length} dari {sqlServerChallenges.length} Selesai</span>
					<span class="font-bold text-slate-700">59 Modul</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Filter & Search Toolbar -->
	<div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs">
		<!-- Level Filter Dropdown -->
		<div class="flex items-center gap-3">
			<span class="text-xs font-bold text-slate-700 uppercase tracking-wider shrink-0 flex items-center gap-1.5">
				<svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
				</svg>
				Filter Level:
			</span>
			<div class="relative w-full sm:w-64">
				<select
					bind:value={selectedLevel}
					class="w-full pl-3 pr-8 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold rounded-xl text-slate-800 focus:outline-none focus:border-red-500 cursor-pointer appearance-none transition"
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
				placeholder="Cari challenge SQL Server..."
				class="w-full pl-9 pr-3 py-2 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 text-xs text-slate-900 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/10 placeholder-slate-400 transition"
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
						class="w-full text-left p-4 rounded-2xl border transition duration-150 cursor-pointer flex flex-col justify-between {isActive ? 'bg-white border-red-500 shadow-md ring-2 ring-red-500/10' : 'bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-xs'}"
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
								<span class="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
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
							class="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl transition cursor-pointer {completedChallenges.includes(activeChallenge.id) ? 'bg-red-600 hover:bg-red-700 text-white shadow-xs' : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'}"
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
						<p class="text-sm font-semibold text-slate-800 bg-red-50/60 border border-red-100 rounded-xl p-3.5">
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
							<pre class="p-4 bg-slate-900 text-red-400 rounded-2xl text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">{activeChallenge.architecture}</pre>
						</div>
					{/if}

					<!-- Tasks list -->
					{#if activeChallenge.tasks}
						<div>
							<h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">✅ Tasks to Complete</h4>
							<ul class="space-y-1.5">
								{#each activeChallenge.tasks as task}
									<li class="flex items-center gap-2 text-xs sm:text-sm text-slate-700 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200/60">
										<span class="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0"></span>
										<span>{task}</span>
									</li>
								{/each}
							</ul>
						</div>
					{/if}

					<!-- T-SQL Code Snippet -->
					{#if activeChallenge.sqlSnippet}
						<div>
							<div class="flex items-center justify-between mb-2">
								<h4 class="text-xs font-bold uppercase tracking-wider text-slate-400">📄 T-SQL Script / Query</h4>
								<button
									type="button"
									onclick={() => copyText(activeChallenge.sqlSnippet!)}
									class="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition cursor-pointer"
								>
									{copiedSnippet ? '✓ Tersalin' : '📋 Salin T-SQL'}
								</button>
							</div>
							<pre class="p-4 bg-slate-900 text-slate-100 rounded-2xl text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">{activeChallenge.sqlSnippet}</pre>
						</div>
					{/if}

					<!-- Commands if available -->
					{#if activeChallenge.commands}
						<div>
							<div class="flex items-center justify-between mb-2">
								<h4 class="text-xs font-bold uppercase tracking-wider text-slate-400">⌨️ Terminal / CLI Commands</h4>
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
										<span class="w-4 h-4 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
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
			<div class="w-10 h-10 rounded-xl bg-red-50 border border-red-100 text-red-600 flex items-center justify-center mb-4">
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
				</svg>
			</div>
			<h3 class="text-lg font-bold text-slate-900 mb-2">📝 Incident Report Template</h3>
			<p class="text-xs text-slate-500 mb-4">Gunakan format ini untuk setiap kegagalan/investigasi SQL Server:</p>
			
			<div class="space-y-2 text-xs font-mono text-slate-800 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 leading-relaxed">
				<p>• <strong>Incident:</strong> Title, Date, Severity (P1/P2/P3)</p>
				<p>• <strong>Impact:</strong> Users affected, Downtime (s), Blocking sessions</p>
				<p>• <strong>Timeline:</strong> Started ➔ Alert ➔ Root cause ➔ Restored</p>
				<p>• <strong>Evidence:</strong> Query Store, Execution Plan, Extended Events, Wait Stats</p>
				<p>• <strong>Resolution & Prevention:</strong> Mitigasi permanen</p>
			</div>
		</div>

		<!-- Definition of Done -->
		<div class="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 shadow-xl flex flex-col justify-between">
			<div>
				<div class="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 flex items-center justify-center mb-4">
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
					</svg>
				</div>
				<h3 class="text-lg font-bold text-white mb-2">🏁 Definition of Done</h3>
				<blockquote class="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs text-slate-200 leading-relaxed italic mb-4">
					"The goal is not knowing SQL Server commands. The goal is knowing how to keep a database <strong>correct, fast, scalable, observable, highly available, and recoverable under failure</strong>."
				</blockquote>
				<p class="text-xs text-red-400 font-semibold">
					💡 Mindset: Kenapa query scan vs seek? Kenapa transaction blocking? Kalau data terhapus jam 10:25, bagaimana restore ke 10:24?
				</p>
			</div>

			<div class="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
				<span>Progress: {completedChallenges.length} / 59 Selesai</span>
				<span class="text-red-400 font-bold">{progressPercent}%</span>
			</div>
		</div>

	</div>

</main>
