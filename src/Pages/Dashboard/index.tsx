import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'animate.css';
import useWow from '../../hook/useWow';
import { FaCalendarAlt, FaChalkboardTeacher, FaClipboardList, FaChartPie } from 'react-icons/fa';

type RoleType = 'bcnKhoa' | 'giangVien' | 'thuKyKhoa';

export default function Dashboard() {
  const [role, setRole] = useState<RoleType | null>(null);
  useWow();

  // Lấy vai trò từ localStorage
  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    console.log('storedRole: ', storedRole);
    if (storedRole) {
      setRole(storedRole as RoleType);
    }
  }, []);

  const renderContent = () => {
    switch (role) {
      case 'bcnKhoa':
        return (
          <div className="flex flex-col items-center justify-center">
            Chủ nhiệm khoa
          </div>
        );

      case 'giangVien':
        return (
          <div className="flex flex-col items-center justify-center">
            Giảng viên
          </div>
        );

      case 'thuKyKhoa':
        return (
          <div className="flex flex-col items-center justify-center">
            <div className="z-50 text-center bg-white dark:bg-[#031C30] rounded-lg py-4 px-36">
            <h1 className="text-3xl font-bold text-gray-700 dark:text-darkPrimary mb-2">Welcome to the Thư ký Khoa Dashboard</h1>
            <p className="text-base text-primary dark:text-darkPrimary mb-5">
              Manage your application with ease and efficiency.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link
              to="/open-schedule"
              className="flex gap-5 justify-between items-center p-6 bg-white dark:bg-[#193247] text-primary dark:text-darkPrimary rounded-lg shadow-lg animate__animated animate__bounceIn"
            >
              <div className="text-start w-[150px]">
                <h2 className="text-xl font-bold mt-4">Mở lịch trực</h2>
                <p className="mt-2 text-xs">Mở đăng ký lịch trực mới.</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-[#4d6a81] text-center flex items-center justify-center">
                <FaClipboardList size={20} className="text-indigo-400" />
              </div>
            </Link>

            <Link
              to="/manage-schedule"
              className="flex gap-5 justify-between items-center p-6 bg-white dark:bg-[#193247] text-primary dark:text-darkPrimary rounded-lg shadow-lg animate__animated animate__bounceIn"
            >
              <div className="text-start w-[150px]">
                <h2 className="text-xl font-bold mt-4">Quản lý</h2>
                <p className="mt-2 text-xs">Xem và quản lý lịch trực.</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-[#4d6a81] text-center flex items-center justify-center">
                <FaClipboardList size={20} className="text-green-400" />
              </div>
            </Link>

            <Link
              to="/faculty-report"
              className="flex gap-5 justify-between items-center p-6 bg-white dark:bg-[#193247] text-primary dark:text-darkPrimary rounded-lg shadow-lg animate__animated animate__bounceIn"
            >
              <div className="text-start w-[150px]">
                <h2 className="text-xl font-bold mt-4">Báo cáo khoa</h2>
                <p className="mt-2 text-xs">Xem các báo cáo tổng hợp.</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-[#4d6a81] text-center flex items-center justify-center">
                <FaChartPie size={20} className="text-orange-400" />
              </div>
            </Link>

            <Link
              to="/schedule"
              className="flex gap-5 justify-between items-center p-6 bg-white dark:bg-[#193247] text-primary dark:text-darkPrimary rounded-lg shadow-lg animate__animated animate__bounceIn"
            >
              <div className="text-start w-[150px]">
                <h2 className="text-xl font-bold mt-4">Lịch trực</h2>
                <p className="mt-2 text-xs">Đăng ký lịch trực.</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-[#4d6a81] text-center flex items-center justify-center">
                <FaCalendarAlt size={20} className="text-purple-400" />
              </div>
            </Link>

            <Link
              to="/attendance"
              className="flex gap-5 justify-between items-center p-6 bg-white dark:bg-[#193247] text-primary dark:text-darkPrimary rounded-lg shadow-lg animate__animated animate__bounceIn"
            >
              <div className="text-start w-[150px]">
                <h2 className="text-xl font-bold mt-4">Điểm danh</h2>
                <p className="mt-2 text-xs">Quản lý điểm danh.</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-[#4d6a81] text-center flex items-center justify-center">
                <FaChalkboardTeacher size={20} className="text-blue-400" />
              </div>
            </Link>

            <Link
              to="/time-statistics"
              className="flex gap-5 justify-between items-center p-6 bg-white dark:bg-[#193247] text-primary dark:text-darkPrimary rounded-lg shadow-lg animate__animated animate__bounceIn"
            >
              <div className="text-start w-[150px]">
                <h2 className="text-xl font-bold mt-4">Thống Kê</h2>
                <p className="mt-2 text-xs">Xem thống kê thời gian trực.</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-[#4d6a81] text-center flex items-center justify-center">
                <FaChartPie size={20} className="text-pink-400" />
              </div>
            </Link>


            </div>
              <footer className="mt-12 text-primary dark:text-darkPrimary">
                Thư Ký Khoa Dashboard
              </footer>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center">
            <h1 className="text-5xl font-bold">Welcome to the Dashboard</h1>
            <p>Hãy đăng nhập để tiếp tục.</p>
          </div>
        );
    }
  };

  return <div className="container mx-auto w-full h-[calc(100vh-80px)]">{renderContent()}</div>;
}
