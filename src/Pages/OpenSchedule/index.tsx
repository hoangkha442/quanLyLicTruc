import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { shifts, users } from '../../Services/data/mockData';
import { RoleType } from '../../Services/data/mockData';

interface User {
  id: number;
  name: string;
  role: RoleType;
}

const OpenSchedule: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [shiftData, setShiftData] = useState(shifts);
  const [currentPage, setCurrentPage] = useState(1);
  const shiftsPerPage = 5;

  useEffect(() => {
    const role = localStorage.getItem('userRole') as RoleType;
    const user = users.find((u) => u.role === role) ?? null;
    setCurrentUser(user);
  }, []);

  const toggleShiftStatus = (shiftId: number, currentStatus: boolean) => {
    Swal.fire({
      title: 'Xác nhận thay đổi',
      text: `Bạn có chắc chắn muốn ${currentStatus ? 'đóng' : 'mở'} ca trực này không?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Có, tiếp tục',
      cancelButtonText: 'Hủy',
      background: 'white', 
      color: '#031C30',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setShiftData((prevShifts) =>
          prevShifts.map((shift) =>
            shift.id === shiftId ? { ...shift, isOpen: !currentStatus } : shift
          )
        );
        Swal.fire({
          title: 'Thành công!',
          text: `Ca trực đã được ${currentStatus ? 'đóng' : 'mở'}.`,
          icon: 'success',
          background: 'white',
          color: '#031C30',
        });
      }
    });
  };

  // Pagination logic
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
      <h2 className="text-3xl font-bold mb-3 text-center text-gray-700 dark:text-darkPrimary">Mở Đăng Ký Lịch Trực</h2>

      {currentUser ? (
        <>
          <p className="mb-4 text-center text-primary dark:text-darkPrimary">Xin chào, <strong>{currentUser.name}</strong> - Vai trò: {currentUser.role === "thuKyKhoa" ? "Thư ký khoa" : "N/A"}</p>

          <table className="min-w-full bg-white dark:bg-[#193247] text-primary dark:text-darkPrimary border border-gray-200 dark:border-gray-600">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b dark:border-gray-600 border-gray-200">Ca Trực</th>
                <th className="py-2 px-4 border-b dark:border-gray-600 border-gray-200">Thời Gian</th>
                <th className="py-2 px-4 border-b dark:border-gray-600 border-gray-200">Môn Học</th>
                <th className="py-2 px-4 border-b dark:border-gray-600 border-gray-200">Loại Hình</th>
                <th className="py-2 px-4 border-b dark:border-gray-600 border-gray-200">Phòng</th>
                <th className="py-2 px-4 border-b dark:border-gray-600 border-gray-200">Trạng Thái</th>
                {currentUser.role === 'thuKyKhoa' && <th className="py-2 px-4 border-b dark:border-gray-600 border-gray-200">Hành Động</th>}
              </tr>
            </thead>
            <tbody>
              {currentShifts.map((shift) => (
                <tr key={shift.id} className="text-center">
                  <td className="py-2 px-4 border-b dark:border-gray-600 border-gray-200 text-sm">{shift.shiftName}</td>
                  <td className="py-2 px-4 border-b dark:border-gray-600 border-gray-200 text-sm">{shift.startTime} - {shift.endTime}</td>
                  <td className="py-2 px-4 border-b dark:border-gray-600 border-gray-200 text-sm">{shift.subject}</td>
                  <td className="py-2 px-4 border-b dark:border-gray-600 border-gray-200 text-sm">{shift.type}</td>
                  <td className="py-2 px-4 border-b dark:border-gray-600 border-gray-200 text-sm">{shift.room}</td>
                  <td className="py-2 px-4 border-b dark:border-gray-600 border-gray-200 text-sm">
                    {shift.isOpen ? 'Đang mở' : 'Đã đóng'}
                  </td>
                  {currentUser.role === 'thuKyKhoa' && (
                    <td className="py-2 px-4 border-b dark:border-gray-600 border-gray-200 text-sm">
                      <button
                        className={`px-4 py-2 rounded ${
                          shift.isOpen ? 'dark:bg-teal-600 bg-teal-200' : 'dark:bg-cyan-600 bg-cyan-200'
                        } text-primary dark:text-darkPrimary`}
                        onClick={() => toggleShiftStatus(shift.id, shift.isOpen)}
                      >
                        {shift.isOpen ? 'Đóng' : 'Mở'}
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-end items-center mt-4 space-x-4">
            <button 
              onClick={handlePreviousPage} 
              disabled={currentPage === 1} 
              className="px-4 py-2 dark:bg-cyan-800 bg-cyan-200 rounded-md disabled:opacity-50 text-primary dark:text-darkPrimary"
            >
              Pre
            </button>
            <span className='text-primary dark:text-darkPrimary'>Page {currentPage} of {totalPages}</span>
            <button 
              onClick={handleNextPage} 
              disabled={currentPage === totalPages} 
              className="px-4 py-2 dark:bg-cyan-800 bg-cyan-200 rounded-md disabled:opacity-50 text-primary dark:text-darkPrimary"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p>Không tìm thấy người dùng. Vui lòng đăng nhập.</p>
      )}
    </div>
  );
};

export default OpenSchedule;
