import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { shifts, users } from '../../Services/data/mockData';
import { FaUserCircle, FaHistory } from 'react-icons/fa';

const History: React.FC = () => {
  const [filterNoHistory, setFilterNoHistory] = useState(false);
  const [filteredShifts, setFilteredShifts] = useState(shifts);
  const [currentPage, setCurrentPage] = useState(1);
  const shiftsPerPage = 5;

  useEffect(() => {
    if (filterNoHistory) {
      setFilteredShifts(shifts.filter((shift) => shift.history.length === 0));
    } else {
      setFilteredShifts(shifts);
    }
    setCurrentPage(1); // Reset to the first page whenever the filter changes
  }, [filterNoHistory]);

  const handleAssignedUserClick = (userId: number | null) => {
    const assignedUser = users.find((user) => user.id === userId);

    if (assignedUser) {
      Swal.fire({
        title: 'Thông tin giảng viên được phân công',
        text: `Giảng viên: ${assignedUser.name}`,
        icon: 'info',
        background: 'white',
        color: '#031C30',
      });
    } else {
      Swal.fire({
        title: 'Chưa có giảng viên được phân công',
        text: 'Ca trực này hiện chưa có giảng viên nào được phân công.',
        icon: 'warning',
        background: 'white',
        color: '#031C30',
      });
    }
  };

  const handleHistoryClick = (shiftId: number) => {
    const shift = shifts.find((s) => s.id === shiftId);

    if (shift && shift.history.length > 0) {
      const historyDetails = shift.history
        .map(
          (record) => `
          <div style="padding: 10px; border-bottom: 1px solid #ccc; margin-bottom: 10px;">
            <p><strong>Ngày:</strong> ${record.date}</p>
            <p><strong>Giảng viên:</strong> ${record.userName}</p>
            <p><strong>Check-in:</strong> ${record.checkInTime}</p>
            <p><strong>Check-out:</strong> ${record.checkOutTime}</p>
          </div>
        `
        )
        .join('<hr>');

      Swal.fire({
        title: 'Chi tiết lịch sử trực',
        html: `<div style="text-align: left;">${historyDetails}</div>`,
        icon: 'info',
        background: 'white',
        color: '#031C30',
      });
    } else {
      Swal.fire({
        title: 'Chưa có lịch sử',
        text: 'Ca trực này hiện chưa có lịch sử trực.',
        icon: 'info',
        background: 'white',
        color: '#031C30',
      });
    }
  };

  // Pagination logic
  const indexOfLastShift = currentPage * shiftsPerPage;
  const indexOfFirstShift = indexOfLastShift - shiftsPerPage;
  const currentShifts = filteredShifts.slice(indexOfFirstShift, indexOfLastShift);
  const totalPages = Math.ceil(filteredShifts.length / shiftsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="container mx-auto p-8 bg-white dark:bg-[#031C30] shadow-lg rounded-lg h-[calc(100vh-80px)]">
      <h2 className="text-3xl font-bold mb-3 text-center text-gray-700 dark:text-darkPrimary">Lịch Sử Trực</h2>

      <div className="mb-4 flex justify-end">
        <label className="text-primary dark:text-darkPrimary">
          <input
            type="checkbox"
            checked={filterNoHistory}
            onChange={() => setFilterNoHistory(!filterNoHistory)}
            className="mr-2"
          />
          Chỉ hiển thị ca trực không có lịch sử
        </label>
      </div>

      <table className="min-w-full bg-white dark:bg-[#193247] text-primary dark:text-darkPrimary border border-gray-200 dark:border-gray-600">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b dark:border-gray-600 border-gray-200">Ca trực</th>
            <th className="py-2 px-4 border-b dark:border-gray-600 border-gray-200">Thời gian</th>
            <th className="py-2 px-4 border-b dark:border-gray-600 border-gray-200">Môn Học</th>
            <th className="py-2 px-4 border-b dark:border-gray-600 border-gray-200">Loại hình</th>
            <th className="py-2 px-4 border-b dark:border-gray-600 border-gray-200">Phòng</th>
            <th className="py-2 px-4 border-b dark:border-gray-600 border-gray-200">Trạng thái</th>
            <th className="py-2 px-4 border-b dark:border-gray-600 border-gray-200">Lịch sử</th>
            <th className="py-2 px-4 border-b dark:border-gray-600 border-gray-200">Giảng viên</th>
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
                {shift.isOpen ? 'Đang mở' : 'Đã đóng'}
              </td>
              <td className="py-2 px-4 border-b dark:border-gray-600 border-gray-200 text-sm">
                <button
                  onClick={() => handleHistoryClick(shift.id)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaHistory size={20} />
                </button>
              </td>
              <td className="py-2 px-4 border-b dark:border-gray-600 border-gray-200 text-sm">
                <button
                  onClick={() => handleAssignedUserClick(shift.assignedUser)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaUserCircle size={20} />
                </button>
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
          className="px-4 py-2 dark:bg-cyan-800 bg-cyan-200 rounded-md disabled:opacity-50 text-primary dark:text-darkPrimary"
        >
          Previous
        </button>
        <span className="text-primary dark:text-darkPrimary">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 dark:bg-cyan-800 bg-cyan-200 rounded-md disabled:opacity-50 text-primary dark:text-darkPrimary"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default History;
