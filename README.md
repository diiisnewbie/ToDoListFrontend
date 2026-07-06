# ToDoList Frontend

Frontend cho ứng dụng Quản lý công việc (Todo List) được xây dựng bằng React + Vite. Giao diện cho phép người dùng xem, thêm, chỉnh sửa, xóa, đánh dấu hoàn thành và lọc công việc.

## 1. Công nghệ sử dụng

- React 19
- Vite
- Axios
- Tailwind CSS
- @dnd-kit (drag & drop)

## 2. Luồng hoạt động frontend

Frontend kết nối với backend qua các API REST. Khi người dùng thao tác trên giao diện:

1. Component gọi hook hoặc API service.
2. Service sử dụng Axios gọi đến backend.
3. Backend trả về dữ liệu.
4. State của React được cập nhật để render lại giao diện.

## 3. Cấu trúc dự án

```text
src/
├── App.jsx
├── main.jsx
├── constants/           # hằng số trạng thái công việc
├── components/
│   ├── layout/          # component layout chung
│   └── ui/              # component UI tái sử dụng
├── features/
│   └── todos/
│       ├── api.js       # gọi API backend
│       ├── components/  # các component giao diện Todo
│       └── hooks/       # hook quản lý state và fetch dữ liệu
└── service/
    └── axiosClient.js   # cấu hình Axios
```

## 4. Chức năng chính

- Hiển thị danh sách công việc theo các cột: Chưa làm, Đang làm, Hoàn thành
- Thêm công việc mới
- Chỉnh sửa công việc
- Xóa công việc
- Đánh dấu hoàn thành/chưa hoàn thành
- Tìm kiếm và lọc theo trạng thái
- Kéo thả công việc giữa các cột (drag & drop)

## 5. API frontend sử dụng

Frontend gọi các endpoint backend:

- `GET /toDos`
- `POST /toDos`
- `PUT /toDos/{id}`
- `DELETE /toDos/{id}`
- `PATCH /toDos/reorder`
- `PATCH /toDos/{id}/move`

## 6. Cách chạy dự án

### Yêu cầu

- Node.js 18+
- npm hoặc yarn

### Bước 1: Cài đặt dependency

```bash
npm install
```

### Bước 2: Chạy ở môi trường phát triển

```bash
npm run dev
```

Sau đó mở trình duyệt tại:

```text
http://localhost:5173
```

### Bước 3: Build production

```bash
npm run build
```

## 7. Cấu hình backend

Frontend đang gọi backend qua URL:

```js
https://java-application-1pv9.onrender.com
```

Nếu bạn chạy backend cục bộ, hãy đổi URL trong file [src/service/axiosClient.js](src/service/axiosClient.js) thành:

```js
http://localhost:8080
```

## 8. Ghi chú

- Giao diện có thể dùng được trực tiếp với backend đang chạy trên môi trường online.
- Nếu backend local chưa chạy, frontend sẽ không thể lấy dữ liệu từ API.
