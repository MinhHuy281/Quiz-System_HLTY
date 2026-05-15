# Quiz-System_HLTY
# Quiz-System_HLTY

## Giới thiệu

Quiz System là hệ thống làm bài trắc nghiệm online được xây dựng theo mô hình DevOps.

Hệ thống gồm:
- Frontend
- Backend API
- MySQL Database
- Docker
- CI/CD GitHub Actions

---

# Công nghệ sử dụng

## Backend
- Node.js
- ExpressJS
- Sequelize ORM
- MySQL

## DevOps
- Docker
- Docker Compose
- GitHub Actions

---

# Chức năng

- Làm bài quiz
- Chấm điểm tự động
- Lưu lịch sử kết quả
- CRUD câu hỏi
- CRUD đáp án
- Health check API

---

# API Endpoints

## Health Check

```bash
GET /api/health
```

---

## Questions

```bash
GET /api/questions
POST /api/questions
PUT /api/questions/:id
DELETE /api/questions/:id
```

---

## Answers

```bash
GET /api/answers
POST /api/answers
PUT /api/answers/:id
DELETE /api/answers/:id
```

---

## Results

```bash
GET /api/results
POST /api/results
```

---

## Quiz Submit

```bash
POST /api/quiz/submit
```

---

# Chạy project bằng Docker

## Build containers

```bash
docker compose build
```

## Run containers

```bash
docker compose up -d
```

## Kiểm tra container

```bash
docker ps
```

## Xem log backend

```bash
docker logs -f quiz_backend
```

## Xem log mysql

```bash
docker logs -f quiz_mysql
```

---

# Environment Variables

## Backend `.env`

```env
DB_HOST=mysql
DB_PORT=3306
DB_NAME=quiz_system
DB_USER=root
DB_PASSWORD=root

PORT=5000
```

---

# Docker Containers

- quiz_backend
- quiz_mysql

---

# Git Branching Strategy

```txt
main
develop
feature/*
```

---

# CI/CD

Sử dụng GitHub Actions để:
- install dependencies
- lint
- test
- build project

Pipeline tự động chạy khi:
- push
- pull request

---

# Debug & Incident

## Incident 1

### Hiện tượng
Cannot find module

### Layer lỗi
L3 - Backend

### Nguyên nhân
Sai đường dẫn import file trong controller và routes.

### Fix
Sửa lại relative path đúng structure project.

### Phòng tránh
Kiểm tra lại import path trước khi build Docker container.

---

## Incident 2

### Hiện tượng
ECONNREFUSED mysql:3306

### Layer lỗi
L2 - Database

### Nguyên nhân
MySQL container chưa khởi động hoàn tất khi backend kết nối.

### Fix
Retry database connection và restart container.

### Phòng tránh
Sử dụng retry logic và depends_on trong docker-compose.

---

## Incident 3

### Hiện tượng
Cannot PUT /api/questions/:id

### Layer lỗi
L3 - Backend API

### Nguyên nhân
Thiếu route PUT và controller updateQuestion.

### Fix
Thêm route PUT và update controller.

### Phòng tránh
Kiểm tra đầy đủ CRUD API trước khi test frontend.

---

# Kiểm tra hệ thống

## Health API

```bash
http://localhost:5000/api/health
```

---

# Docker Demo

## Build Docker

```bash
docker compose build
```

## Run Docker

```bash
docker compose up -d
```

## Kiểm tra container

```bash
docker ps
```

## Kiểm tra backend log

```bash
docker logs -f quiz_backend
```

## Kiểm tra mysql log

```bash
docker logs -f quiz_mysql
```

---

# Cấu trúc thư mục

```txt
Quiz-System_HLTY
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── models
│   │   ├── routes
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── .env
│   └── package.json
│
├── frontend
│
├── .github
│   └── workflows
│       └── ci.yml
│
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

---

# Git Commands

## Tạo branch feature

```bash
git checkout develop
git pull origin develop
git checkout -b feature/backend-api
```

---

## Commit code

```bash
git add .
git commit -m "feature: complete backend api"
```

---

## Push branch

```bash
git push -u origin feature/backend-api
```

---

# API Test bằng CURL

## Test Health API

```bash
curl http://localhost:5000/api/health
```

---

## Tạo Question

```bash
curl -X POST http://localhost:5000/api/questions ^
-H "Content-Type: application/json" ^
-d "{\"question_text\":\"React là gì?\"}"
```

---

## Update Question

```bash
curl -X PUT http://localhost:5000/api/questions/1 ^
-H "Content-Type: application/json" ^
-d "{\"question_text\":\"ReactJS là thư viện frontend\"}"
```

---

## Xóa Question

```bash
curl -X DELETE http://localhost:5000/api/questions/1
```

---

## Submit Quiz

```bash
curl -X POST http://localhost:5000/api/quiz/submit ^
-H "Content-Type: application/json" ^
-d "{\"username\":\"Huy\",\"answers\":[{\"question_id\":1,\"answer_id\":2}]}"
```

---

# Tiêu chí DevOps đã hoàn thành

- Backend API
- Docker
- Docker Compose
- Database MySQL
- CRUD API
- Health Check API
- Git Branching
- CI/CD Workflow
- Environment Variables
- Logging
- Incident Debugging

---

# Deploy

## Backend
- Render

## Frontend
- Vercel

---

# Tác giả

DevOps Project - Quiz System