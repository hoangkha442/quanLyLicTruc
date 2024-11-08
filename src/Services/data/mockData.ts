export type RoleType = 'giangVien' | 'thuKyKhoa' | 'bcnKhoa';

export const shifts = [
  {
    id: 1,
    shiftName: 'Ca Sáng Thứ Hai',
    startTime: '08:00',
    endTime: '12:00',
    availableSlots: 3,
    isOpen: true,
    subject: 'Lập trình Java nâng cao',
    type: 'Lý thuyết',
    room: 'Phòng A1',
    assignedUser: 1,
    history: [
      { date: '2024-10-07', userId: 1, userName: 'Phan Thị Hồng', checkInTime: '08:00', checkOutTime: '12:00' },
      { date: '2024-10-14', userId: 2, userName: 'Lý Thị Huyền Châu', checkInTime: '08:10', checkOutTime: '12:00' },
    ],
  },
  {
    id: 2,
    shiftName: 'Ca Chiều Thứ Hai',
    startTime: '13:00',
    endTime: '17:00',
    availableSlots: 2,
    isOpen: false,
    subject: 'An ninh mạng máy tính',
    type: 'Thực hành',
    room: 'Phòng B2',
    assignedUser: 2,
    history: [
      { date: '2024-10-14', userId: 2, userName: 'Lý Thị Huyền Châu', checkInTime: '13:05', checkOutTime: '17:00' },
    ],
  },
  {
    id: 3,
    shiftName: 'Ca Tối Thứ Hai',
    startTime: '18:00',
    endTime: '21:00',
    availableSlots: 1,
    isOpen: true,
    subject: 'Lập trình ứng dụng di động',
    type: 'Lý thuyết',
    room: 'Phòng C3',
    assignedUser: null,
    history: [],
  },
  {
    id: 4,
    shiftName: 'Ca Sáng Thứ Ba',
    startTime: '08:00',
    endTime: '12:00',
    availableSlots: 4,
    isOpen: true,
    subject: 'Mã hóa và an toàn dữ liệu',
    type: 'Lý thuyết',
    room: 'Phòng D4',
    assignedUser: 3,
    history: [
      { date: '2024-10-15', userId: 3, userName: 'Kiều Linh', checkInTime: '08:15', checkOutTime: '12:00' },
    ],
  },
  {
    id: 5,
    shiftName: 'Ca Chiều Thứ Ba',
    startTime: '13:00',
    endTime: '17:00',
    availableSlots: 3,
    isOpen: true,
    subject: 'Nhập môn trí tuệ nhân tạo',
    type: 'Thực hành',
    room: 'Phòng E5',
    assignedUser: null,
    history: [],
  },
  {
    id: 6,
    shiftName: 'Ca Sáng Thứ Tư',
    startTime: '08:00',
    endTime: '12:00',
    availableSlots: 3,
    isOpen: true,
    subject: 'Số hóa và quản trị thông tin số',
    type: 'Lý thuyết',
    room: 'Phòng F6',
    assignedUser: 4,
    history: [
      { date: '2024-10-16', userId: 4, userName: 'Phạm Thị D', checkInTime: '08:00', checkOutTime: '12:00' },
    ],
  },
  {
    id: 7,
    shiftName: 'Ca Chiều Thứ Tư',
    startTime: '13:00',
    endTime: '17:00',
    availableSlots: 2,
    isOpen: false,
    subject: 'Kiểm thử phần mềm',
    type: 'Thực hành',
    room: 'Phòng G7',
    assignedUser: 1,
    history: [
      { date: '2024-10-16', userId: 1, userName: 'Phan Thị Hồng', checkInTime: '13:00', checkOutTime: '17:00' },
    ],
  },
  {
    id: 8,
    shiftName: 'Ca Sáng Thứ Năm',
    startTime: '08:00',
    endTime: '12:00',
    availableSlots: 5,
    isOpen: true,
    subject: 'Kỹ thuật lấy yêu cầu',
    type: 'Lý thuyết',
    room: 'Phòng H8',
    assignedUser: 1,
    history: [],
  },
  {
    id: 9,
    shiftName: 'Ca Chiều Thứ Năm',
    startTime: '13:00',
    endTime: '17:00',
    availableSlots: 4,
    isOpen: true,
    subject: 'Quản lý dự án phần mềm',
    type: 'Thực hành',
    room: 'Phòng I9',
    assignedUser: 2,
    history: [
      { date: '2024-10-17', userId: 2, userName: 'Lý Thị Huyền Châu', checkInTime: '13:00', checkOutTime: '17:00' },
    ],
  },
  {
    id: 10,
    shiftName: 'Ca Tối Thứ Năm',
    startTime: '18:00',
    endTime: '21:00',
    availableSlots: 1,
    isOpen: true,
    subject: 'Nhập môn học máy',
    type: 'Lý thuyết',
    room: 'Phòng J10',
    assignedUser: 7,
    history: [
      { date: '2024-11-06', userId: 7, userName: 'Phan Hồ Viết Trường', checkInTime: '18:10', checkOutTime: '21:00' },
    ],
  },
  {
    id: 11,
    shiftName: 'Ca Sáng Thứ Sáu',
    startTime: '08:00',
    endTime: '12:00',
    availableSlots: 5,
    isOpen: true,
    subject: 'Thiết kế và phân tích mạng',
    type: 'Lý thuyết',
    room: 'Phòng K11',
    assignedUser: null,
    history: [],
  },
  {
    id: 12,
    shiftName: 'Ca Chiều Thứ Sáu',
    startTime: '13:00',
    endTime: '17:00',
    availableSlots: 3,
    isOpen: true,
    subject: 'Các hệ hỗ trợ ra quyết định',
    type: 'Thực hành',
    room: 'Phòng L12',
    assignedUser: 6,
    history: [
      { date: '2024-11-07', userId: 6, userName: 'Đặng Đình Hòa', checkInTime: '13:05', checkOutTime: '17:00' },
    ],
  },
];

export const users = [
  { id: 1, name: 'Phan Thị Hồng', role: 'giangVien' as RoleType },
  { id: 2, name: 'Lý Thị Huyền Châu', role: 'giangVien' as RoleType },
  { id: 3, name: 'Kiều Linh', role: 'thuKyKhoa' as RoleType },
  { id: 5, name: 'Bùi Minh Phụng', role: 'bcnKhoa' as RoleType },
  { id: 6, name: 'Đặng Đình Hòa', role: 'giangVien' as RoleType },
  { id: 7, name: 'Phan Hồ Viết Trường', role: 'giangVien' as RoleType },
];

export const requests = [
  {
    id: 1,
    title: 'Xin đổi ca trực',
    description: 'Xin phép đổi ca trực sáng thứ Hai thành chiều thứ Hai.',
    status: 'Pending',
    createdDate: '2024-10-01',
    userId: 1,
    userName: 'Phan Thị Hồng',
  },
  {
    id: 2,
    title: 'Xin nghỉ phép',
    description: 'Xin nghỉ phép vào ngày 2024-10-15.',
    status: 'Approved',
    createdDate: '2024-10-02',
    userId: 2,
    userName: 'Lý Thị Huyền Châu',
  },
  {
    id: 3,
    title: 'Xin đổi phòng trực',
    description: 'Xin đổi phòng trực từ A1 sang B2 vào ca trực ngày 2024-10-10.',
    status: 'Rejected',
    createdDate: '2024-10-03',
    userId: 1,
    userName: 'Phan Thị Hồng',
  },
];
