import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'animate.css';
import useWow from '../../hook/useWow';
import { FaChartBar, FaCalendarPlus, FaTachometerAlt, FaCalendarCheck, FaHistory, FaEdit } from 'react-icons/fa';

type RoleType = 'bcnKhoa' | 'giangVien' | 'thuKyKhoa';

export default function Dashboard() {
  const [role, setRole] = useState<RoleType | null>(null);
  useWow();

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
              <div className="z-50 text-center bg-white dark:bg-[#031C30] rounded-lg py-4 px-16">
                <h1 className="text-3xl font-bold text-gray-700 dark:text-darkPrimary mb-2">Welcome to the Thư ký Khoa Dashboard</h1>
                <p className="text-base text-primary dark:text-darkPrimary mb-5">
                  Manage your application with ease and efficiency.
                </p>
        
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <Link
                    to="/dashboard"
                    className="flex gap-5 justify-between items-center p-6 bg-white dark:bg-[#193247] text-primary dark:text-darkPrimary rounded-lg shadow-lg animate__animated animate__bounceIn"
                  >
                    <div className="text-start w-[150px]">
                      <h2 className="text-xl font-bold mt-4">Trang chủ</h2>
                      <p className="mt-2 text-xs">Quản lý và theo dõi.</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-[#4d6a81] text-center flex items-center justify-center">
                      <FaTachometerAlt size={20} className="text-indigo-400" />
                    </div>
                  </Link>
        
                  <Link
                    to="/open-schedule"
                    className="flex gap-5 justify-between items-center p-6 bg-white dark:bg-[#193247] text-primary dark:text-darkPrimary rounded-lg shadow-lg animate__animated animate__bounceIn"
                  >
                    <div className="text-start w-[150px]">
                      <h2 className="text-xl font-bold mt-4">Mở lịch trực</h2>
                      <p className="mt-2 text-xs">Mở đăng ký lịch trực mới.</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-[#4d6a81] text-center flex items-center justify-center">
                      <FaCalendarPlus size={20} className="text-green-400" />
                    </div>
                  </Link>
        
                  <Link
                    to="/register-schedule"
                    className="flex gap-5 justify-between items-center p-6 bg-white dark:bg-[#193247] text-primary dark:text-darkPrimary rounded-lg shadow-lg animate__animated animate__bounceIn"
                  >
                    <div className="text-start w-[150px]">
                      <h2 className="text-xl font-bold mt-4">Đăng ký</h2>
                      <p className="mt-2 text-xs">Đăng ký ca trực mới cho GV.</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-[#4d6a81] text-center flex items-center justify-center">
                      <FaCalendarCheck size={20} className="text-blue-400" />
                    </div>
                  </Link>
        
                  <Link
                    to="/history"
                    className="flex gap-5 justify-between items-center p-6 bg-white dark:bg-[#193247] text-primary dark:text-darkPrimary rounded-lg shadow-lg animate__animated animate__bounceIn"
                  >
                    <div className="text-start w-[150px]">
                      <h2 className="text-xl font-bold mt-4">Lịch sử trực</h2>
                      <p className="mt-2 text-xs">Xem lịch sử các ca trực.</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-[#4d6a81] text-center flex items-center justify-center">
                      <FaHistory size={20} className="text-orange-400" />
                    </div>
                  </Link>
        
                  <Link
                    to="/adjust-schedule"
                    className="flex gap-5 justify-between items-center p-6 bg-white dark:bg-[#193247] text-primary dark:text-darkPrimary rounded-lg shadow-lg animate__animated animate__bounceIn"
                  >
                    <div className="text-start w-[150px]">
                      <h2 className="text-xl font-bold mt-4">Điều chỉnh ca</h2>
                      <p className="mt-2 text-xs">Điều chỉnh các ca trực đã đăng ký.</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-[#4d6a81] text-center flex items-center justify-center">
                      <FaEdit size={20} className="text-purple-400" />
                    </div>
                  </Link>
        
                  <Link
                    to="/time-statistics"
                    className="flex gap-5 justify-between items-center p-6 bg-white dark:bg-[#193247] text-primary dark:text-darkPrimary rounded-lg shadow-lg animate__animated animate__bounceIn"
                  >
                    <div className="text-start w-[150px]">
                      <h2 className="text-xl font-bold mt-4">Thống kê</h2>
                      <p className="mt-2 text-xs">Xem thống kê thời gian trực.</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-[#4d6a81] text-center flex items-center justify-center">
                      <FaChartBar size={20} className="text-pink-400" />
                    </div>
                  </Link>
        
                  <Link
                    to="/request-list-gv"
                    className="flex gap-5 justify-between items-center p-6 bg-white dark:bg-[#193247] text-primary dark:text-darkPrimary rounded-lg shadow-lg animate__animated animate__bounceIn"
                  >
                    <div className="text-start w-[150px]">
                      <h2 className="text-xl font-bold mt-4">Các yêu cầu</h2>
                      <p className="mt-2 text-xs">Xem danh sách các yêu cầu.</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-[#4d6a81] text-center flex items-center justify-center">
                      <FaChartBar size={20} className="text-yellow-400" />
                    </div>
                  </Link>
                </div>
        

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
