import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { shifts as initialShifts } from '../../Services/data/mockData';
import { FaEdit } from 'react-icons/fa';

const AdjustSchedule: React.FC = () => {
  const [shiftData, setShiftData] = useState(initialShifts);
  const [currentPage, setCurrentPage] = useState(1);
  const shiftsPerPage = 5;

  const handleAdjustClick = (shiftId: number) => {
    const shift = shiftData.find((s) => s.id === shiftId);

    if (shift) {
      Swal.fire({
        title: `<strong>Điều Chỉnh Thời Gian Ca Trực: ${shift.shiftName}</strong>`,
        html: `
          <div style="text-align: left; padding: 1rem; max-width: 500px; margin: 0 auto;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Giờ vào:</label>
            <input type="time" id="checkInTime" value="${shift.startTime}" class="swal2-input" style="width: 100%;" />
            <label style="display: block; margin-top: 1rem; margin-bottom: 0.5rem; font-weight: bold;">Giờ ra:</label>
            <input type="time" id="checkOutTime" value="${shift.endTime}" class="swal2-input" style="width: 100%;" />
          </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Lưu',
        cancelButtonText: 'Hủy',
        focusConfirm: false,
        width: 'auto',
        customClass: {
          popup: 'bg-white dark:bg-[#031C30]',
          title: 'text-primary dark:text-darkPrimary font-bold',
          htmlContainer: 'text-primary dark:text-darkPrimary',
          confirmButton: 'bg-blue-500 text-white rounded px-4 py-2 mr-2',
          cancelButton: 'bg-gray-300 text-primary rounded px-4 py-2 ml-2',
        },
        preConfirm: () => {
          const checkIn = (document.getElementById('checkInTime') as HTMLInputElement).value;
          const checkOut = (document.getElementById('checkOutTime') as HTMLInputElement).value;
          return { checkIn, checkOut };
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const { checkIn, checkOut } = result.value as { checkIn: string; checkOut: string };

          setShiftData((prevShifts) =>
            prevShifts.map((s) =>
              s.id === shiftId ? { ...s, startTime: checkIn, endTime: checkOut } : s
            )
          );

          Swal.fire({
            title: 'Thành công!',
            text: 'Thời gian ca trực đã được cập nhật.',
            icon: 'success',
            background: 'white',
            color: '#031C30',
          });
        }
      });
    }
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
      <h2 className="text-3xl font-bold mb-3 text-center text-gray-700 dark:text-darkPrimary">Điều Chỉnh Thời Gian Ca Trực</h2>

      <table className="min-w-full bg-white dark:bg-[#193247] text-primary dark:text-darkPrimary border border-gray-200 dark:border-gray-600">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b dark:border-gray-600 border-gray-200">Ca Trực</th>
            <th className="py-2 px-4 border-b dark:border-gray-600 border-gray-200">Thời Gian</th>
            <th className="py-2 px-4 border-b dark:border-gray-600 border-gray-200">Môn Học</th>
            <th className="py-2 px-4 border-b dark:border-gray-600 border-gray-200">Loại Hình</th>
            <th className="py-2 px-4 border-b dark:border-gray-600 border-gray-200">Phòng</th>
            <th className="py-2 px-4 border-b dark:border-gray-600 border-gray-200">Hành Động</th>
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
                <button
                  onClick={() => handleAdjustClick(shift.id)}
                  className="text-blue-500 hover:text-blue-700 flex items-center gap-2"
                >
                  <FaEdit size={16} />
                  Điều Chỉnh
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

export default AdjustSchedule;
