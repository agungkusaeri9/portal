# .NET Mid → Advanced Challenges

> Track ini ditujukan untuk Software Engineer yang sudah nyaman dengan
> C#, ASP.NET Core, REST API, database, dan Git.
>
> Fokus utama: **architecture, performance, concurrency, distributed
> systems, observability, reliability, security, deployment, dan
> production engineering.**

---

## 🎯 Learning Philosophy

Jangan sekadar menyelesaikan coding task.

Untuk setiap challenge:

```text
Understand
   ↓
Design
   ↓
Implement
   ↓
Measure
   ↓
Break
   ↓
Investigate
   ↓
Optimize
   ↓
Document
```

Target akhirnya:

> Bisa membangun, mengukur, debug, dan menjelaskan kenapa sebuah .NET
> system bekerja seperti sekarang.

---

# Level 1 --- Architecture & Code Quality

## Challenge 01 --- Refactor a Messy API

### Scenario

Diberikan ASP.NET Core API dengan controller besar, business logic
bercampur dengan database access, dan duplicated code.

### Task

Refactor tanpa mengubah external behavior API.

### Fokus

- Separation of concerns
- Dependency inversion
- Testability
- Refactoring strategy

### Questions

- Apa yang seharusnya menjadi responsibility controller?
- Mana business logic dan mana infrastructure logic?
- Bagaimana memastikan refactor tidak mengubah behavior?

### Success Criteria

- Controller lebih tipis
- Business logic terisolasi
- Existing tests tetap pass
- Tidak ada perubahan API contract

---

## Challenge 02 --- Clean Architecture

### Scenario

Build Order API menggunakan Clean Architecture.

### Layers

```text
API
 ↓
Application
 ↓
Domain
 ↓
Infrastructure
```

### Task

Implement: - Order - Customer - Product - Create Order - Cancel Order -
Get Order

### Focus

- Dependency rule
- Domain entities
- Application use cases
- Infrastructure boundaries

### Success Criteria

Domain layer tidak bergantung pada EF Core atau ASP.NET Core.

---

## Challenge 03 --- Vertical Slice Architecture

### Task

Implement fitur Order menggunakan Vertical Slice.

Contoh:

```text
Features/
└── Orders/
    ├── CreateOrder/
    ├── CancelOrder/
    └── GetOrder/
```

### Compare

Implement feature yang sama dengan:

1.  Layered Architecture
2.  Clean Architecture
3.  Vertical Slice

### Questions

- Mana yang paling mudah diubah?
- Mana yang paling mudah dinavigasi?
- Kapan abstraction menjadi overengineering?

---

## Challenge 04 --- CQRS

### Scenario

Pisahkan:

```text
Command
   ↓
Write Model

Query
   ↓
Read Model
```

### Task

Implement: - CreateOrderCommand - CancelOrderCommand - GetOrderQuery -
ListOrdersQuery

### Focus

- Command/query separation
- Read/write optimization
- DTO projection

### Success Criteria

Query tidak menggunakan entity yang tidak diperlukan.

---

## Challenge 05 --- Domain Modeling

### Scenario

Build order lifecycle:

```text
Pending
 ↓
Paid
 ↓
Processing
 ↓
Shipped
 ↓
Completed
```

Invalid transition harus ditolak.

### Task

Pastikan domain object sendiri menjaga invariants.

### Questions

- Kenapa state transition tidak boleh sepenuhnya dikontrol controller?
- Apa contoh invariant?
- Bagaimana mencegah object masuk state invalid?

---

## Challenge 06 --- Dependency Injection Lifetimes

### Task

Eksperimen dengan:

```text
Singleton
Scoped
Transient
```

Buat service yang menyimpan unique ID.

### Observe

Bandingkan ID pada: - satu request - beberapa request - beberapa thread

### Incident

Temukan bug akibat Singleton service yang menggunakan dependency Scoped.

### Success Criteria

Bisa menjelaskan lifecycle DI tanpa menghafal definisi.

---

# Level 2 --- ASP.NET Core Internals

## Challenge 07 --- Middleware Pipeline

### Task

Buat middleware:

```text
Request
 ↓
Logging
 ↓
Correlation ID
 ↓
Authentication
 ↓
Authorization
 ↓
Endpoint
 ↓
Response
```

### Measure

Catat: - request duration - status code - correlation ID

### Questions

- Apa yang terjadi jika middleware dipasang dalam urutan berbeda?
- Middleware mana yang bisa short-circuit request?

---

## Challenge 08 --- Global Exception Handling

### Scenario

API memiliki exception berbeda-beda.

### Task

Buat centralized error handling dengan consistent response:

```json
{
  "type": "...",
  "title": "...",
  "status": 500,
  "traceId": "..."
}
```

### Success Criteria

Tidak ada stack trace internal yang bocor ke client.

---

## Challenge 09 --- Request Cancellation

### Scenario

Client disconnects ketika API sedang melakukan expensive operation.

### Task

Gunakan:

```csharp
CancellationToken
```

Pastikan downstream operation ikut dihentikan.

### Experiment

Bandingkan: - request tanpa cancellation - request dengan cancellation

### Observe

CPU, DB query, dan external HTTP call.

---

## Challenge 10 --- HTTP Resilience

### Scenario

External Payment API sering: - timeout - 500 - 503 - response lambat

### Task

Implement: - timeout - retry - circuit breaker - fallback jika
appropriate

### Important

Jangan retry semua error.

### Questions

- Apakah retry POST selalu aman?
- Kapan retry memperburuk outage?
- Bagaimana exponential backoff membantu?

---

# Level 3 --- EF Core & Database Engineering

## Challenge 11 --- Find the N+1 Query

### Scenario

Endpoint:

```text
GET /orders
```

menghasilkan:

```text
1 query orders
+
N queries customer
+
N queries items
```

### Task

Identifikasi N+1 dan perbaiki.

### Measure

Bandingkan: - query count - latency - DB CPU

---

## Challenge 12 --- EF Core Tracking vs NoTracking

### Task

Benchmark:

```text
AsTracking()
AsNoTracking()
```

pada dataset besar.

### Questions

- Kapan tracking dibutuhkan?
- Kapan NoTracking lebih cocok?
- Apakah NoTracking selalu lebih cepat?

---

## Challenge 13 --- Projection Optimization

### Scenario

Jangan load:

```text
Order
Customer
Products
Payment
Address
...
```

jika response hanya membutuhkan:

```text
orderId
customerName
total
status
```

### Task

Gunakan projection ke DTO.

### Measure

- query execution time
- memory allocation
- payload size

---

## Challenge 14 --- Split Query vs Single Query

### Task

Buat query dengan beberapa relationships.

Compare:

```text
Single query
vs
Split query
```

### Questions

- Apa itu cartesian explosion?
- Kapan split query lebih baik?
- Apa trade-off jumlah round trip?

---

## Challenge 15 --- EF Core Transaction

### Scenario

Create Order membutuhkan:

```text
Create Order
+
Create Order Items
+
Update Inventory
```

Semua harus atomic.

### Task

Implement transaction.

### Failure Injection

Paksa failure setelah inventory update.

### Success Criteria

Tidak boleh ada partial transaction.

---

## Challenge 16 --- Optimistic Concurrency

### Scenario

Dua admin mengedit product stock secara bersamaan.

### Task

Implement optimistic concurrency.

### Test

```text
User A reads version 10
User B reads version 10

User A updates → version 11
User B updates → conflict
```

### Questions

- Kenapa lost update berbahaya?
- Bagaimana API merespons concurrency conflict?

---

## Challenge 17 --- Connection Pool Exhaustion

### Scenario

API tiba-tiba mengalami:

```text
Timeout waiting for database connection
```

### Task

Simulasikan connection pool exhaustion.

### Investigate

- connection lifetime
- max pool size
- long-running queries
- unclosed connections

### Metrics

- active connections
- waiting requests
- DB latency
- API latency

---

# Level 4 --- Concurrency & Performance

## Challenge 18 --- Async vs Blocking

### Task

Bandingkan:

```text
Thread.Sleep()
vs
await Task.Delay()
```

dalam high-concurrency API.

### Load

Gunakan k6.

### Measure

- throughput
- latency
- ThreadPool
- CPU

### Goal

Pahami kenapa blocking I/O bisa menghancurkan scalability.

---

## Challenge 19 --- ThreadPool Starvation

### Scenario

API menjadi lambat walaupun CPU tidak 100%.

### Task

Create artificial blocking workload.

### Investigate

- ThreadPool queue
- worker threads
- request latency
- throughput

### Success Criteria

Bisa membedakan CPU saturation dengan ThreadPool starvation.

---

## Challenge 20 --- Memory Allocation

### Task

Buat endpoint yang memproses large collection.

Compare: - LINQ-heavy implementation - optimized loop - streaming

### Measure

- allocations
- GC collections
- memory usage
- latency

---

## Challenge 21 --- Large Payload Streaming

### Scenario

API harus mengirim file/data besar.

### Task

Compare:

```text
Load entire payload into memory
vs
Stream response
```

### Measure

- memory
- GC
- response time
- concurrent users supported

---

## Challenge 22 --- In-Memory Cache

### Task

Implement caching menggunakan:

```text
IMemoryCache
```

### Scenario

Product catalog dibaca jauh lebih sering daripada berubah.

### Test

Compare: - DB every request - memory cache

### Questions

- Apa masalah stale data?
- Kapan cache invalidation diperlukan?

---

## Challenge 23 --- Distributed Cache with Redis

### Architecture

```text
Client
  ↓
API 1 ─┐
API 2 ─┼── Redis
API 3 ─┘
```

### Task

Implement distributed caching.

### Experiment

Scale API menjadi 3 instances.

### Goal

Buktikan kenapa local memory cache berbeda dengan distributed cache.

---

## Challenge 24 --- Rate Limiting

### Scenario

Public API diserang:

```text
1000 requests/sec
```

### Task

Implement rate limiting.

Test: - per IP - per user - per API key

### Questions

- Apa risiko rate limiting hanya berdasarkan IP?
- Bagaimana distributed rate limiting bekerja?

---

## Challenge 25 --- k6 Performance Test

### Scenario

Registration API harus menangani:

```text
2,000 concurrent users
```

### Test

```text
Normal load
Spike
Sustained load
Ramp-up
```

### Metrics

```text
RPS
p50
p95
p99
error rate
CPU
RAM
DB CPU
DB connections
```

### Goal

Jangan hanya berkata:

> "API kuat 2,000 users."

Harus punya evidence.

---

# Level 5 --- Security

## Challenge 26 --- JWT Authentication

### Task

Implement: - login - access token - protected endpoint - token
expiration

### Investigate

- token claims
- signing key
- expiration
- issuer
- audience

---

## Challenge 27 --- Refresh Token Rotation

### Scenario

Access token short-lived.

### Task

Implement refresh token rotation.

### Security Requirements

- refresh token tidak disimpan plaintext jika desain memungkinkan
- token rotation
- revoke token
- detect token reuse

---

## Challenge 28 --- Authorization Model

### Implement

```text
Admin
Manager
User
```

dan permission:

```text
orders.read
orders.write
orders.cancel
users.manage
```

### Goal

Bandingkan: - Role-based authorization - Policy-based authorization

---

## Challenge 29 --- API Security Review

Review API untuk:

- broken authorization
- mass assignment
- sensitive data exposure
- injection
- insecure logging
- weak authentication
- missing rate limit

### Deliverable

Security checklist + findings + remediation.

---

## Challenge 30 --- Threat Modeling

### Scenario

Design:

```text
E-Commerce API
```

Identify:

```text
Asset
↓
Threat
↓
Attack
↓
Mitigation
```

Gunakan pendekatan STRIDE.

### Goal

Belajar security sebelum coding, bukan setelah production incident.

---

# Level 6 --- Distributed Systems

## Challenge 31 --- Background Worker

### Scenario

Order:

```text
API
 ↓
Queue
 ↓
Worker
 ↓
Email Service
```

### Task

Implement BackgroundService / hosted worker.

### Questions

- Apa yang terjadi ketika worker mati?
- Bagaimana memastikan job tidak hilang?

---

## Challenge 32 --- Producer / Consumer with Channel

### Task

Gunakan:

```csharp
System.Threading.Channels
```

untuk membuat in-process queue.

### Measure

- throughput
- queue depth
- processing latency

---

## Challenge 33 --- Retry & Dead Letter

### Scenario

Job gagal karena external service.

### Task

Implement:

```text
Attempt 1
 ↓
Retry
 ↓
Retry
 ↓
Dead Letter
```

### Questions

- Berapa maksimal retry?
- Apa exponential backoff?
- Kapan message harus masuk DLQ?

---

## Challenge 34 --- Idempotent API

### Scenario

Client mengirim:

```text
POST /payments
```

dua kali karena network timeout.

### Requirement

```text
Same Idempotency-Key
=
Same operation
```

### Goal

Hanya satu payment yang tercatat.

---

## Challenge 35 --- Outbox Pattern

### Scenario

```text
DB transaction succeeds
BUT
event publishing fails
```

### Task

Implement:

```text
Business Data
+
Outbox Event
        ↓
Single DB Transaction
        ↓
Outbox Worker
        ↓
Message Broker
```

### Success Criteria

Tidak kehilangan event ketika broker sementara unavailable.

---

## Challenge 36 --- Event-Driven Architecture

### Build

```text
Order Service
      ↓
OrderCreated
      ↓
 ┌────┼────┐
 ↓    ↓    ↓
Email Inventory Analytics
```

### Questions

- Apa keuntungan event-driven architecture?
- Apa kelemahannya?
- Bagaimana menangani duplicate event?

---

## Challenge 37 --- Saga Pattern

### Scenario

Order membutuhkan:

```text
Reserve Inventory
 ↓
Charge Payment
 ↓
Create Shipment
```

Jika payment gagal:

```text
Release Inventory
```

### Task

Implement saga/orchestration sederhana.

### Goal

Pahami distributed transaction tanpa mengandalkan single DB transaction.

---

## Challenge 38 --- External Dependency Failure

### Scenario

Payment provider mengalami outage.

### Task

API harus tetap responsive.

Implement: - timeout - circuit breaker - fallback - retry policy -
graceful degradation

### Incident Question

Apa behavior user ketika payment provider unavailable?

---

# Level 7 --- Observability

## Challenge 39 --- Structured Logging

### Task

Implement structured logging.

Log fields:

```text
timestamp
traceId
userId
requestId
endpoint
duration
statusCode
```

### Avoid

Logging: - password - access token - sensitive personal data

---

## Challenge 40 --- Correlation ID

### Scenario

Satu request melewati:

```text
API
 ↓
Order Service
 ↓
Payment Service
 ↓
Email Service
```

### Task

Track request menggunakan correlation/trace identifier.

---

## Challenge 41 --- Metrics

Expose metrics:

```text
HTTP requests
Request duration
Error rate
Active requests
DB latency
Queue depth
Cache hit rate
```

### Goal

Buat dashboard sederhana.

---

## Challenge 42 --- Distributed Tracing

### Task

Instrument:

```text
Client
 ↓
API
 ↓
DB
 ↓
Redis
 ↓
External API
```

### Goal

Ketika request lambat, bisa mengetahui bottleneck berada di mana.

---

## Challenge 43 --- OpenTelemetry

### Task

Implement OpenTelemetry untuk:

- traces
- metrics
- logs

### Deliverable

Architecture diagram + sample trace + explanation.

---

## Challenge 44 --- Production Incident Investigation

### Scenario

```text
p95 latency: 200ms → 5s
error rate: 0.1% → 12%
```

### Evidence

Diberikan: - logs - metrics - traces - DB metrics

### Task

Find root cause.

### Deliverable

```text
Incident
Impact
Timeline
Root Cause
Evidence
Fix
Prevention
```

---

# Level 8 --- Docker & Kubernetes

## Challenge 45 --- Production Dockerfile

### Task

Create multi-stage Docker build.

Requirements: - small runtime image - non-root user - deterministic
build - environment configuration

### Compare

Naive Dockerfile vs optimized Dockerfile.

---

## Challenge 46 --- Docker Compose Production Stack

Build:

```text
API
PostgreSQL
Redis
Message Broker
Observability
```

### Goal

One command starts the entire local production-like environment.

---

## Challenge 47 --- Kubernetes Deployment

Deploy:

```text
.NET API
 ↓
Service
 ↓
3 Pods
```

### Requirement

All Pods listen on:

```text
Port 8080
```

### Test

Endpoint returns Pod identity.

### Goal

Observe requests distributed across Pods.

---

## Challenge 48 --- Kubernetes Readiness & Liveness

Implement:

```text
/health/live
/health/ready
```

### Scenario

Database unavailable.

### Question

Should the Pod be: - restarted? - removed from traffic? - both?

Explain why.

---

## Challenge 49 --- Horizontal Scaling

### Architecture

```text
Client
 ↓
Service
 ├── Pod 1
 ├── Pod 2
 ├── Pod 3
 └── Pod N
```

### Task

Scale:

```text
3 → 5 → 10 replicas
```

### Measure

- throughput
- latency
- CPU
- request distribution

---

## Challenge 50 --- HPA

### Scenario

Traffic increases continuously.

### Task

Configure Horizontal Pod Autoscaler.

### Observe

```text
Load ↑
 ↓
CPU / custom metric ↑
 ↓
Replica count ↑
 ↓
Latency stabilizes
```

### Goal

Understand scaling behavior, not just YAML syntax.

---

# Level 9 --- Reliability & Production Engineering

## Challenge 51 --- Zero-Downtime Deployment

### Scenario

Deploy new API version while traffic continues.

### Task

Implement rolling deployment.

### Test

Ensure: - no downtime - old Pods terminate gracefully - new Pods become
ready before receiving traffic

---

## Challenge 52 --- Graceful Shutdown

### Scenario

Pod receives termination signal while processing request.

### Task

Implement graceful shutdown.

### Questions

- What happens to active requests?
- What happens to background jobs?
- How long should shutdown wait?

---

## Challenge 53 --- Traffic Spike Incident

### Scenario

Normal:

```text
200 RPS
```

Spike:

```text
5,000 RPS
```

### Task

Find system bottleneck.

Possible bottlenecks:

```text
CPU
Memory
ThreadPool
DB
Redis
Connection Pool
External API
```

### Deliverable

Capacity analysis + mitigation plan.

---

## Challenge 54 --- Database Bottleneck Incident

### Scenario

API p95 increases dramatically.

Evidence:

```text
DB CPU = 95%
API CPU = 35%
```

### Task

Investigate: - slow query - missing index - N+1 - connection pool -
locking

### Goal

Root cause based on evidence.

---

## Challenge 55 --- Memory Leak Investigation

### Scenario

Memory:

```text
500 MB
 ↓
1 GB
 ↓
2 GB
 ↓
3 GB
```

GC does not recover expected memory.

### Task

Investigate using profiling tools.

### Questions

- Is it actually a memory leak?
- Which objects remain referenced?
- Which code path retains them?

---

## Challenge 56 --- Dependency Outage

### Scenario

External API:

```text
Payment API
```

is unavailable for 30 minutes.

### Requirements

Your API should: - fail fast - avoid retry storm - expose meaningful
status - preserve recoverability - avoid data corruption

### Deliverable

Failure strategy + architecture diagram.

---

# Level 10 --- Final Production Simulation

## Challenge 57 --- Build a Production-Grade Order System

### Architecture

```text
                    ┌─────────────┐
                    │   Client    │
                    └──────┬──────┘
                           ↓
                    ┌─────────────┐
                    │ LoadBalancer│
                    └──────┬──────┘
                           ↓
                  ┌──────────────────┐
                  │ ASP.NET Core API │
                  └────────┬─────────┘
                           │
          ┌────────────────┼────────────────┐
          ↓                ↓                ↓
      PostgreSQL         Redis          Message Broker
          │                                 │
          ↓                                 ↓
      Read Model                         Workers
```

### Features

- Authentication
- Authorization
- Orders
- Payments
- Inventory
- Redis caching
- Background processing
- Idempotency
- Outbox pattern
- Retry
- Circuit breaker
- Rate limiting
- Observability
- Docker
- Kubernetes

---

## Challenge 58 --- Production Load Test

### Target

Simulate:

```text
10,000 users
1,000+ RPS
```

with realistic traffic distribution.

Example:

```text
60% Read
20% Product
10% Order
5% Login
5% Payment
```

### Measure

```text
RPS
p50
p95
p99
Error Rate
CPU
RAM
GC
ThreadPool
DB CPU
DB Connections
Redis Hit Rate
Queue Depth
```

### Deliverable

Performance report:

```text
Baseline
Peak
Bottleneck
Optimization
After Optimization
Capacity
```

---

## Challenge 59 --- Chaos / Failure Simulation

Intentionally break:

```text
Redis
Database
Message Broker
External Payment API
One API Pod
Multiple API Pods
```

### Observe

What happens to:

```text
Availability
Latency
Errors
Data consistency
Queue
Recovery
```

### Goal

Don't ask:

> "Does the system work?"

Ask:

> "How does the system fail?"

---

## Challenge 60 --- Full Production Incident

### Scenario

Friday 14:00.

Traffic suddenly increases.

At the same time:

```text
API p95      = 6 seconds
Error rate   = 18%
DB CPU       = 95%
Redis        = high latency
Queue        = growing
Pods         = 100% CPU
```

### Your Job

You are the on-call engineer.

Do NOT immediately restart everything.

### Step 1 --- Detect

Collect:

```text
Logs
Metrics
Traces
DB metrics
Kubernetes metrics
```

### Step 2 --- Hypothesis

Create possible causes.

```text
DB bottleneck?
CPU?
Memory?
ThreadPool?
Redis?
External dependency?
Traffic spike?
Recent deployment?
```

### Step 3 --- Investigate

Use evidence to eliminate incorrect hypotheses.

### Step 4 --- Mitigate

Possible actions:

```text
Scale API
Rate limit
Disable expensive feature
Enable fallback
Reduce DB load
Rollback deployment
Protect dependency
```

### Step 5 --- Recover

Restore normal traffic and verify system health.

### Step 6 --- Postmortem

Write:

```text
Incident Summary
Impact
Timeline
Root Cause
Contributing Factors
Detection
Mitigation
Resolution
Lessons Learned
Action Items
```

---

# 📊 Final Scorecard

Score yourself from 1--5.

Area Score

---

C# / .NET Internals /5
ASP.NET Core /5
Architecture /5
EF Core /5
Database /5
Concurrency /5
Performance /5
Security /5
Distributed Systems /5
Caching /5
Messaging /5
Observability /5
Docker /5
Kubernetes /5
Reliability /5
Incident Response /5

---

# 🧠 Mid → Advanced Definition

You are progressing toward advanced when you can answer:

### Architecture

> Why did you choose this architecture?

### Performance

> Why is p95 slow?

### Database

> Why is the query slow?

### Concurrency

> What happens when 2 requests modify the same resource?

### Distributed Systems

> What happens when the message is delivered twice?

### Reliability

> What happens when Redis is down?

### Security

> What happens if this token is stolen?

### Kubernetes

> What happens when one Pod dies?

### Production

> What happens when traffic becomes 10x?

---

# 🏆 Final Project

Build a production-like:

## **E-Commerce Platform**

```text
                    Internet
                       │
                       ↓
                Load Balancer
                       │
                       ↓
              ASP.NET Core API
                       │
       ┌───────────────┼───────────────┐
       ↓               ↓               ↓
   PostgreSQL        Redis        Message Broker
       │                               │
       ↓                               ↓
 Read/Write                         Workers
       │                               │
       └───────────────┬───────────────┘
                       ↓
                 Observability
                       │
             ┌─────────┼─────────┐
             ↓         ↓         ↓
           Logs      Metrics    Traces
```

### Requirements

- ASP.NET Core
- EF Core
- PostgreSQL / SQL Server
- Redis
- Message Broker
- JWT
- Idempotency
- Outbox
- Retry
- Circuit Breaker
- Rate Limiting
- OpenTelemetry
- Docker
- Kubernetes
- HPA
- CI/CD
- k6

### Final Test

```text
10,000 concurrent users
        ↓
Traffic spike
        ↓
Database pressure
        ↓
Redis failure
        ↓
External API failure
        ↓
Pod failure
        ↓
Recovery
```

---

# Definition of Done

A challenge belum dianggap selesai hanya karena:

```text
☑ Code works
```

Harus:

```text
☑ Code works
☑ Tests pass
☑ Performance measured
☑ Failure tested
☑ Root cause understood
☑ Trade-off documented
☑ Architecture explained
☑ Metrics collected
☑ Production implication understood
```

---

# Recommended Order

```text
Architecture
    ↓
ASP.NET Core Internals
    ↓
EF Core + Database
    ↓
Concurrency
    ↓
Performance
    ↓
Security
    ↓
Redis
    ↓
Messaging
    ↓
Outbox / Idempotency
    ↓
Observability
    ↓
Docker
    ↓
Kubernetes
    ↓
Reliability
    ↓
Production Simulation
```

> **Target:** bukan menjadi orang yang paling banyak tahu syntax .NET,
> tetapi engineer yang mampu mengambil sebuah system dari **"works on my
> machine" → measurable → scalable → observable → resilient →
> production-ready**.
