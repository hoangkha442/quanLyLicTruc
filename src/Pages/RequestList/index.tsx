import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { requests, users } from '../../Services/data/mockData';
import { FaEdit } from 'react-icons/fa';

const RequestList: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [requestData, setRequestData] = useState(requests);
  const [currentPage, setCurrentPage] = useState(1);
  const requestsPerPage = 5;

  const handleUpdateStatus = (requestId: number) => {
    Swal.fire({
      title: 'Cập nhật trạng thái yêu cầu',
      text: 'Bạn muốn chấp nhận, từ chối hay đóng yêu cầu này?',
      icon: 'question',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Chấp nhận',
      denyButtonText: 'Từ chối',
      cancelButtonText: 'Đóng',
      background: 'white',
      color: '#031C30',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        updateRequestStatus(requestId, 'Approved');
      } else if (result.isDenied) {
        updateRequestStatus(requestId, 'Rejected');
      }
    });
  };

  const updateRequestStatus = (requestId: number, status: string) => {
    setRequestData((prevData) =>
      prevData.map((request) =>
        request.id === requestId ? { ...request, status } : request
      )
    );
    Swal.fire({
      title: `Yêu cầu đã được ${status === 'Approved' ? 'chấp nhận' : 'từ chối'}.`,
      icon: 'success',
      background: 'white',
      color: '#031C30',
    });
  };

  const filteredRequests = requestData.filter((request) => {
    return statusFilter === 'All' || request.status === statusFilter;
  });

  // Pagination logic
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirstRequest, indexOfLastRequest);
  const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="container mx-auto p-8 bg-white dark:bg-[#031C30] shadow-lg rounded-lg h-[calc(100vh-80px)]">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-700 dark:text-darkPrimary">Danh Sách Yêu Cầu</h2>

      {/* Bộ lọc theo trạng thái */}
      <div className="mb-6 flex justify-center">
        <label className="text-primary dark:text-darkPrimary mr-4">
          Trạng thái:
        </label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
        >
          <option value="All">Tất cả</option>
          <option value="Pending">Đang chờ duyệt</option>
          <option value="Approved">Đã duyệt</option>
          <option value="Rejected">Từ chối</option>
        </select>
      </div>

      {/* Bảng hiển thị danh sách yêu cầu */}
      <table className="min-w-full bg-white dark:bg-[#193247] text-primary dark:text-darkPrimary border border-gray-200 dark:border-gray-600">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b dark:border-gray-600 border-gray-200">Tiêu Đề</th>
            <th className="py-2 px-4 border-b dark:border-gray-600 border-gray-200">Mô Tả</th>
            <th className="py-2 px-4 border-b dark:border-gray-600 border-gray-200">Trạng Thái</th>
            <th className="py-2 px-4 border-b dark:border-gray-600 border-gray-200">Ngày Tạo</th>
            <th className="py-2 px-4 border-b dark:border-gray-600 border-gray-200">Người Tạo</th>
            <th className="py-2 px-4 border-b dark:border-gray-600 border-gray-200">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {currentRequests.map((request) => (
            <tr key={request.id} className="text-center">
              <td className="py-2 px-4 border-b dark:border-gray-600 border-gray-200 text-sm">{request.title}</td>
              <td className="py-2 px-4 border-b dark:border-gray-600 border-gray-200 text-sm">{request.description}</td>
              <td className="py-2 px-4 border-b dark:border-gray-600 border-gray-200 text-sm">
                <span
                  className={`px-2 py-1 rounded ${
                    request.status === 'Approved'
                      ? 'bg-[#96b9d0] text-primary dark:text-darkPrimary dark:bg-[#1E374E] dark:border dark:border-gray-200'
                      : request.status === 'Rejected'
                      ? 'bg-[#8ca6c2] text-primary dark:text-darkPrimary dark:bg-[#23313A] dark:border dark:border-gray-200'
                      : 'bg-[#dfe2e6] text-primary dark:text-darkPrimary dark:bg-[#2B445C] dark:border dark:border-gray-200'
                  }`}
                >
                  {request.status}
                </span>
              </td>
              <td className="py-2 px-4 border-b dark:border-gray-600 border-gray-200 text-sm">{request.createdDate}</td>
              <td className="py-2 px-4 border-b dark:border-gray-600 border-gray-200 text-sm">{request.userName}</td>
              <td className="py-2 px-4 border-b dark:border-gray-600 border-gray-200 text-sm">
                {request.status === 'Pending' ? (
                  <button
                    onClick={() => handleUpdateStatus(request.id)}
                    className="text-blue-500 hover:text-blue-700 flex items-center gap-2"
                  >
                    <FaEdit /> Cập nhật trạng thái
                  </button>
                ) : (
                  <span>-</span>
                )}
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

      {filteredRequests.length === 0 && (
        <p className="text-center text-gray-600 dark:text-gray-300 mt-4">Không có yêu cầu nào.</p>
      )}
    </div>
  );
};

export default RequestList;
