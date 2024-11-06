import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { shifts, users } from '../../Services/data/mockData';
import { RoleType } from '../../Services/data/mockData';

interface User {
  id: number;
  name: string;
  role: RoleType;
}

const RegisterSchedule: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [shiftData, setShiftData] = useState(shifts);
  const [selectedShift, setSelectedShift] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const availableUsers = users.filter((user) => user.role === 'giangVien');
  const [currentPage, setCurrentPage] = useState(1);
  const shiftsPerPage = 5;

  useEffect(() => {
    const role = localStorage.getItem('userRole') as RoleType;
    const user = users.find((u) => u.role === role) ?? null;
    setCurrentUser(user);
  }, []);

  const handleRegister = () => {
    if (selectedShift && selectedUser) {
      const selectedShiftData = shiftData.find((shift) => shift.id === selectedShift);
      const selectedUserData = users.find((user) => user.id === selectedUser);

      if (selectedShiftData && selectedUserData) {
        Swal.fire({
          title: 'Xác nhận đăng ký',
          text: `Bạn có chắc chắn muốn đăng ký ca trực "${selectedShiftData.shiftName}" cho giảng viên "${selectedUserData.name}"?`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Có',
          cancelButtonText: 'Hủy',
          background: 'white',
          color: '#031C30',
        }).then((result) => {
          if (result.isConfirmed) {
            setShiftData((prevShifts) =>
              prevShifts.map((shift) =>
                shift.id === selectedShift
                  ? { ...shift, assignedUser: selectedUser }
                  : shift
              )
            );
            Swal.fire({
              title: 'Thành công!',
              text: `Đã đăng ký ca trực "${selectedShiftData.shiftName}" cho giảng viên "${selectedUserData.name}".`,
              icon: 'success',
              background: 'white',
              color: '#031C30',
            });
            setSelectedShift(null);
            setSelectedUser(null);
          }
        });
      }
    } else {
      Swal.fire('Lỗi', 'Vui lòng chọn giảng viên và ca trực.', 'error');
    }
  };

  const indexOfLastShift = currentPage * shiftsPerPage;
  const indexOfFirstShift = indexOfLastShift - shiftsPerPage;
  const currentShifts = shiftData.slice(indexOfFirstShift, indexOfLastShift);
  const totalPages = Math.ceil(shiftData.length / shiftsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="container mx-auto p-8 bg-white dark:bg-[#031C30] shadow-lg rounded-lg h-[calc(100vh-80px)]">
      <h2 className="text-3xl font-bold mb-3 text-center text-gray-700 dark:text-darkPrimary">Đăng Ký Lịch Trực Dùm</h2>

      {currentUser && currentUser.role === 'thuKyKhoa' ? (
        <>
          <p className="mb-4 text-center text-primary dark:text-darkPrimary">
            Xin chào, <strong>{currentUser.name}</strong> - Vai trò: Thư ký khoa
          </p>

          {/* Chọn giảng viên */}
          <div className="mb-6">
            <label className="block text-primary dark:text-darkPrimary mb-2">Chọn giảng viên:</label>
            <select
              value={selectedUser || ''}
              onChange={(e) => setSelectedUser(Number(e.target.value))}
              className="w-full px-4 py-2 border dark:border-gray-600 border-gray-200 rounded-md focus:ring-2 focus:ring-primary focus:outline-none bg-white dark:bg-[#193247] text-primary dark:text-darkPrimary"
            >
              <option value="" disabled>Chọn giảng viên</option>
              {availableUsers.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
          </div>

          {/* Bảng hiển thị ca trực */}
          <table className="min-w-full bg-white dark:bg-[#193247] text-primary dark:text-darkPrimary border border-gray-200 dark:border-gray-600">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b dark:border-gray-600 border-gray-200">Ca Trực</th>
                <th className="py-2 px-4 border-b dark:border-gray-600 border-gray-200">Thời Gian</th>
                <th className="py-2 px-4 border-b dark:border-gray-600 border-gray-200">Môn Học</th>
                <th className="py-2 px-4 border-b dark:border-gray-600 border-gray-200">Loại Hình</th>
                <th className="py-2 px-4 border-b dark:border-gray-600 border-gray-200">Phòng</th>
                <th className="py-2 px-4 border-b dark:border-gray-600 border-gray-200">Giảng Viên Đăng Ký</th>
                <th className="py-2 px-4 border-b dark:border-gray-600 border-gray-200">Chọn</th>
              </tr>
            </thead>
            <tbody>
              {currentShifts.map((shift) => (
                <tr key={shift.id} className="text-center">
                  <td className="py-2 px-4 border-b dark:border-gray-600 border-gray-200 text-sm">{shift.shiftName}</td>
                  <td className="py-2 px-4 border-b dark:border-gray-600 border-gray-200 text-sm">
                    {shift.startTime} - {shift.endTime}
                  </td>
                  <td className="py-2 px-4 border-b dark:border-gray-600 border-gray-200 text-sm">{shift.subject}</td>
                  <td className="py-2 px-4 border-b dark:border-gray-600 border-gray-200 text-sm">{shift.type}</td>
                  <td className="py-2 px-4 border-b dark:border-gray-600 border-gray-200 text-sm">{shift.room}</td>
                  <td className="py-2 px-4 border-b dark:border-gray-600 border-gray-200 text-sm">
                    {shift.assignedUser
                      ? users.find((user) => user.id === shift.assignedUser)?.name
                      : <p className='text-cyan-600'>Chưa có GV</p>}
                  </td>
                  <td className="py-2 px-4 border-b dark:border-gray-600 border-gray-200 text-sm">
                    <input
                      type="radio"
                      name="selectShift"
                      checked={selectedShift === shift.id}
                      onChange={() => setSelectedShift(shift.id)}
                      className="cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-end items-center mt-4 space-x-4">
            <button 
              onClick={handlePreviousPage} 
              disabled={currentPage === 1} 
              className="px-4 py-2 dark:bg-cyan-800 dark:hover:bg-cyan-900 duration-500 bg-cyan-200 hover:bg-cyan-300 transition-all rounded-md disabled:opacity-50 text-primary dark:text-darkPrimary"
            >
              Trước
            </button>
            <span className='text-primary dark:text-darkPrimary'>Page {currentPage} of {totalPages}</span>
            <button 
              onClick={handleNextPage} 
              disabled={currentPage === totalPages} 
              className="px-4 py-2 dark:bg-cyan-800 dark:hover:bg-cyan-900 duration-500 bg-cyan-200 hover:bg-cyan-300 transition-all rounded-md disabled:opacity-50 text-primary dark:text-darkPrimary"
            >
              Sau
            </button>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={handleRegister}
              className="px-6 py-2 dark:bg-cyan-800 dark:hover:bg-cyan-900 duration-500 bg-cyan-200 hover:bg-cyan-300 text-primary dark:text-darkPrimary rounded-lg transition"
              // disabled={!selectedUser || !selectedShift}
            >
              Đăng Ký Ca Trực
            </button>
          </div>
        </>
      ) : (
        <p>Không tìm thấy người dùng. Vui lòng đăng nhập.</p>
      )}
    </div>
  );
};

export default RegisterSchedule;
