# Hệ Thống Đặt Vé Xem Phim

<p align="center">
  <img src="https://img.icons8.com/color/96/000000/cinema-.png" alt="Movie Booking Logo" width="120"/>
</p>

<p align="center">
  Hệ thống đặt vé xem phim hiện đại được xây dựng bằng NestJS và Next.js
</p>

## 📋 Mục Lục

- [Tính Năng](#-tính-năng)
- [Công Nghệ Sử Dụng](#-công-nghệ-sử-dụng)
- [Yêu Cầu Hệ Thống](#-yêu-cầu-hệ-thống)
- [Cài Đặt](#-cài-đặt)
- [Cấu Hình](#-cấu-hình)
- [Chạy Ứng Dụng](#-chạy-ứng-dụng)
- [API Documentation](#-api-documentation)
- [Logging](#-logging)
- [Kiểm Thử](#-kiểm-thử)
- [Triển Khai](#-triển-khai)
- [Đóng Góp](#-đóng-góp)
- [Giấy Phép](#-giấy-phép)

## ✨ Tính Năng

- 🎬 Xem danh sách phim và lịch chiếu với hiệu ứng 3D
- 🎟️ Đặt vé và quản lý vé đã đặt
- 👤 Quản lý tài khoản người dùng
- 🔒 Xác thực và phân quyền bảo mật
- 📱 Giao diện thân thiện, responsive
- 📊 Dashboard quản trị với thống kê chi tiết
- 🔔 Thông báo real-time về lịch chiếu và vé
- 💳 Hỗ trợ nhiều phương thức thanh toán
- 🔍 Tìm kiếm nâng cao với Elasticsearch
- 🎥 Xem trailer phim với hiệu ứng 3D

## 🛠️ Công Nghệ Sử Dụng

### Backend
- **Framework**: [NestJS](https://nestjs.com/) - Framework Node.js tiến bộ
- **Database**: [Prisma](https://www.prisma.io/) với PostgreSQL
- **Message Queue**: RabbitMQ cho xử lý bất đồng bộ
- **Search Engine**: Elasticsearch cho tìm kiếm nâng cao
- **WebSocket**: Socket.io cho real-time communication
- **Logging**: Winston logger với ELK Stack
- **Authentication**: JWT và OAuth2
- **API Documentation**: Swagger/OpenAPI
- **Testing**: Jest cho unit test và integration test
- **Containerization**: Docker và Docker Compose
- **CI/CD**: Jenkins và GitHub Actions
- **Reverse Proxy**: Nginx

### Frontend
- **Framework**: [Next.js 15](https://nextjs.org/) với TypeScript
- **UI Framework**: Ant Design (antd)
- **3D Graphics**: Three.js cho hiệu ứng 3D
- **State Management**: Redux Toolkit
- **Data Fetching**: React Query
- **Real-time**: Socket.io Client
- **Animation**: Framer Motion
- **Testing**: Jest và React Testing Library

## 📋 Yêu Cầu Hệ Thống

### Development
- Node.js (v18 trở lên)
- npm hoặc yarn
- Docker và Docker Compose
- Git

### Production
- Docker Engine
- Docker Compose
- Nginx
- PostgreSQL (v14 trở lên)
- Redis
- RabbitMQ
- Elasticsearch
- Jenkins
- GitHub Actions

## 🚀 Cài Đặt

1. Clone repository:
```bash
git clone https://github.com/your-username/movie-booking.git
cd movie-booking
```

2. Cài đặt dependencies:
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. Tạo file `.env` từ `.env.example`:
```bash
# Backend
cd backend
cp .env.example .env

# Frontend
cd ../frontend
cp .env.example .env
```

## ⚙️ Cấu Hình

### Backend (.env)
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/movie_booking"

# JWT
JWT_SECRET="your-secret-key"
JWT_EXPIRATION="1d"

# Redis
REDIS_HOST="localhost"
REDIS_PORT=6379

# RabbitMQ
RABBITMQ_URL="amqp://localhost:5672"
RABBITMQ_QUEUE="movie_booking"

# Elasticsearch
ELASTICSEARCH_URL="http://localhost:9200"

# WebSocket
WS_PORT=3001

# Email
SMTP_HOST="smtp.example.com"
SMTP_PORT=587
SMTP_USER="your-email@example.com"
SMTP_PASS="your-password"

# Payment Gateway
PAYMENT_GATEWAY_API_KEY="your-api-key"
```

### Frontend (.env)
```env
NEXT_PUBLIC_API_URL="http://localhost:3000"
NEXT_PUBLIC_WS_URL="ws://localhost:3001"
```

## 🏃 Chạy Ứng Dụng

### Development

1. Chạy backend:
```bash
cd backend
npm run start:dev
```

2. Chạy frontend:
```bash
cd frontend
npm run dev
```

### Production với Docker

1. Build và chạy containers:
```bash
docker-compose up --build
```

## 📚 API Documentation

Truy cập Swagger UI tại: `http://localhost:3000/api/docs`

## 📝 Logging

Hệ thống sử dụng ELK Stack (Elasticsearch, Logstash, Kibana) với Winston logger:
- Ghi log ra console với màu sắc
- Lưu log vào Elasticsearch
- Phân tích log với Kibana
- Monitoring với Grafana

## 🧪 Kiểm Thử

### Backend
```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

### Frontend
```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e
```

## 🚀 Triển Khai

### CI/CD Pipeline
1. **GitHub Actions** cho automated testing
2. **Jenkins** cho deployment
3. **Docker** cho containerization
4. **Nginx** cho reverse proxy và load balancing

### Deployment Steps
1. Push code lên GitHub
2. GitHub Actions chạy tests
3. Jenkins build Docker images
4. Deploy lên production server
5. Nginx cấu hình SSL và load balancing

## 🤝 Đóng Góp

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add some amazing feature'`)
4. Push lên branch (`git push origin feature/amazing-feature`)
5. Mở Pull Request

## 📄 Giấy Phép

Dự án được phân phối dưới giấy phép MIT. Xem file `LICENSE` để biết thêm chi tiết.

---

<p align="center">
  Made with ❤️ by Hari
</p>
