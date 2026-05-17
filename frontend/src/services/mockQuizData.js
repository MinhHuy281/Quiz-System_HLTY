export const mockQuizzes = [
  {
    id: '1',
    title: 'Kiến thức cơ bản JavaScript',
    slug: 'javascript-fundamentals',
    category: 'Frontend',
    description: 'Cú pháp cơ bản, closure, mảng và xử lý bất đồng bộ.',
    durationSeconds: 75,
    questions: [
      {
        id: 'js-1',
        text: 'Từ khóa nào khai báo biến theo phạm vi khối?',
        options: [
          { id: 'a', text: 'var' },
          { id: 'b', text: 'let' },
          { id: 'c', text: 'define' },
          { id: 'd', text: 'static' },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'js-2',
        text: '`Array.prototype.map()` trả về gì?',
        options: [
          { id: 'a', text: 'Một mảng mới' },
          { id: 'b', text: 'Một chuỗi' },
          { id: 'c', text: 'Mảng gốc' },
          { id: 'd', text: 'Một giá trị boolean' },
        ],
        correctOptionId: 'a',
      },
      {
        id: 'js-3',
        text: 'Toán tử nào so sánh cả giá trị và kiểu dữ liệu?',
        options: [
          { id: 'a', text: '==' },
          { id: 'b', text: '=' },
          { id: 'c', text: '===' },
          { id: 'd', text: '!=' },
        ],
        correctOptionId: 'c',
      },
      {
        id: 'js-4',
        text: 'Hàm nào hẹn gọi callback sau một khoảng trễ?',
        options: [
          { id: 'a', text: 'setTimeout' },
          { id: 'b', text: 'setImmediate' },
          { id: 'c', text: 'queueMicrotask' },
          { id: 'd', text: 'requestAnimationFrame' },
        ],
        correctOptionId: 'a',
      },
    ],
  },
  {
    id: '2',
    title: 'Kiến thức cơ bản React',
    slug: 'react-essentials',
    category: 'React',
    description: 'Component, hook, pattern điều hướng và state của component.',
    durationSeconds: 90,
    questions: [
      {
        id: 'react-1',
        text: 'Hook nào dùng cho side effect?',
        options: [
          { id: 'a', text: 'useMemo' },
          { id: 'b', text: 'useState' },
          { id: 'c', text: 'useEffect' },
          { id: 'd', text: 'useRef' },
        ],
        correctOptionId: 'c',
      },
      {
        id: 'react-2',
        text: 'Một item trong danh sách React luôn nên có gì?',
        options: [
          { id: 'a', text: 'Prop key' },
          { id: 'b', text: 'Prop ref' },
          { id: 'c', text: 'Prop style' },
          { id: 'd', text: 'Hàm onClick' },
        ],
        correctOptionId: 'a',
      },
      {
        id: 'react-3',
        text: 'Component nào hiển thị nội dung route lồng nhau?',
        options: [
          { id: 'a', text: 'Link' },
          { id: 'b', text: 'Outlet' },
          { id: 'c', text: 'Route' },
          { id: 'd', text: 'Navigate' },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'react-4',
        text: 'State của input controlled thường nằm ở đâu?',
        options: [
          { id: 'a', text: 'Chỉ trong DOM' },
          { id: 'b', text: 'State của component' },
          { id: 'c', text: 'Bộ nhớ đệm trình duyệt' },
          { id: 'd', text: 'Service worker' },
        ],
        correctOptionId: 'b',
      },
    ],
  },
  {
    id: '3',
    title: 'Luyện tập Web API',
    slug: 'web-api-practice',
    category: 'HTTP',
    description: 'Luồng REST, phương thức HTTP, mã trạng thái và payload.',
    durationSeconds: 60,
    questions: [
      {
        id: 'api-1',
        text: 'Phương thức HTTP nào thường dùng để lấy dữ liệu?',
        options: [
          { id: 'a', text: 'POST' },
          { id: 'b', text: 'GET' },
          { id: 'c', text: 'PATCH' },
          { id: 'd', text: 'DELETE' },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'api-2',
        text: 'Mã trạng thái nào có nghĩa là chưa được xác thực?',
        options: [
          { id: 'a', text: '200' },
          { id: 'b', text: '404' },
          { id: 'c', text: '401' },
          { id: 'd', text: '500' },
        ],
        correctOptionId: 'c',
      },
      {
        id: 'api-3',
        text: 'Phản hồi của Axios nằm ở thuộc tính nào?',
        options: [
          { id: 'a', text: 'result' },
          { id: 'b', text: 'payload' },
          { id: 'c', text: 'data' },
          { id: 'd', text: 'body' },
        ],
        correctOptionId: 'c',
      },
      {
        id: 'api-4',
        text: 'Phương thức nào thường dùng để cập nhật một phần tài nguyên?',
        options: [
          { id: 'a', text: 'PUT' },
          { id: 'b', text: 'PATCH' },
          { id: 'c', text: 'HEAD' },
          { id: 'd', text: 'TRACE' },
        ],
        correctOptionId: 'b',
      },
    ],
  },
]