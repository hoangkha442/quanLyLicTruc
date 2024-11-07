import Swal from 'sweetalert2';
import {
  FaTachometerAlt, FaPalette, FaComments, FaFileAlt, FaUsers, FaSignOutAlt,
  FaCalendarPlus, FaCalendarCheck, FaHistory, FaEdit, FaChartBar
} from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ThemeToggleButton from '../ThemeToggleButton';

type RoleType = 'bcnKhoa' | 'giangVien' | 'thuKyKhoa';

type Props = {
  isOpen: boolean;
  role: RoleType;
  changeRole: () => void;
};

type MenuItem = {
  path: string;
  icon: React.ReactNode;
  label: string;
};

const ROLE_KEY = 'userRole';

export const setRole = (role: string) => {
  localStorage.setItem(ROLE_KEY, role);
};

export const getRole = (): string | null => {
  return localStorage.getItem(ROLE_KEY);
};

export const clearRole = () => {
  localStorage.removeItem(ROLE_KEY);
};

const menuConfig: Record<RoleType, MenuItem[]> = {
  bcnKhoa: [
    { path: '/dashboard', icon: <FaTachometerAlt />, label: 'Trang Chủ' },
    { path: '/reports', icon: <FaFileAlt />, label: 'Báo Cáo' },
    { path: '/schedule', icon: <FaUsers />, label: 'Lịch Trực' },
    { path: '/violations', icon: <FaChartBar />, label: 'Quản Lý Vi Phạm' },
  ],
  giangVien: [
    { path: '/dashboard', icon: <FaTachometerAlt />, label: 'Trang Chủ' },
    { path: '/attendance', icon: <FaPalette />, label: 'Điểm Danh' },
    { path: '/request', icon: <FaComments />, label: 'Xin Nghỉ' },
    { path: '/my-history', icon: <FaHistory />, label: 'Lịch Sử Điểm Danh' },
  ],
  thuKyKhoa: [
    { path: '/dashboard', icon: <FaTachometerAlt />, label: 'Trang chủ' },
    { path: '/open-schedule', icon: <FaCalendarPlus />, label: 'Mở lịch trực' },
    { path: '/register-schedule', icon: <FaCalendarCheck />, label: 'Đăng ký lịch trực' },
    { path: '/history', icon: <FaHistory />, label: 'Xem Lịch Sử Trực' },
    { path: '/adjust-schedule', icon: <FaEdit />, label: 'Điều chỉnh ca trực' },
    { path: '/time-statistics', icon: <FaChartBar />, label: 'Thống kê thời gian trực' },
    { path: '/request-list-gv', icon: <FaChartBar />, label: 'Các yêu cầu' },
  ],
};

export default function Sidebar({ isOpen, role }: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const menuItems = menuConfig[role] || [];

  // const handleLogout = () => {
  //   clearRole();
  //   navigate('/login');
  // };

  const handleChangeRole = () => {
    Swal.fire({
      title: 'Đổi vai trò',
      text: 'Bạn sẽ đăng xuất và cần đăng nhập lại.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        clearRole();
        navigate('/login');
      }
    });
  };

  return (
    <section className={`h-screen dark:bg-[#031C30] transition-all fixed duration-500 ${isOpen ? 'w-[260px]' : 'w-[80px]'}  ${isOpen ? "" : '!w-16'}`}>
      <div className="flex flex-col justify-between px-2 py-8 h-full">
        <div className="flex flex-col gap-11">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => { navigate('/dashboard') }}>
            <div className="w-10 h-10 shadow-inner border border-gray-200 shrink-0"></div>
            {isOpen && (
                <span className="text-4xl text-primary dark:text-darkPrimary tracking-widest font-bold relative z-50 ml-2.5 inline-block before:absolute before:bottom-0 before:opacity-50 before:left-0 before:z-[-1] before:h-3 before:w-full before:bg-[#adfff8]">QLLT</span>
            )}
          </div>
          <ul className="flex flex-col gap-3 overflow-y-auto overflow-x-hidden h-[calc(100vh-300px)] scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  to={item.path}
                  key={index}
                  className={`flex items-center gap-2 text-primary hover:text-[#0C7FDA] hover:bg-blue-50 cursor-pointer rounded transition duration-200 dark:text-darkPrimary dark:hover:bg-[#667a8a3f]
                    ${isActive ? 'bg-blue-100 text-lightActive dark:text-darkPrimary dark:bg-[#667a8a3f]' : ''}`}
                >
                  <div className="w-11 h-11 flex justify-center items-center shrink-0">
                    <span className="text-lg">{item.icon}</span>
                  </div>
                  {isOpen && (
                    <span className={`font-normal text-sm transition-all duration-300 ${isActive ? '!font-bold' : ''}`}>
                      {item.label}
                    </span>
                  )}
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="shrink-0 flex flex-col gap-5">
          <ThemeToggleButton isOpen={isOpen}/>
          <div
            onClick={handleChangeRole} 
            className={`dark:bg-[#193247] bg-[#dbeaff] rounded items-center gap-3 text-primary dark:text-darkPrimary cursor-pointer flex`}
          >
            <div className="w-11 h-11 flex justify-center items-center shrink-0">
              <FaSignOutAlt className='text-2xl' />
            </div>
            {isOpen && (
              <span className='font-bold'>Đổi Vai Trò</span>
            )}
          </div>
          {/* <div
            onClick={handleLogout} 
            className={`dark:bg-[#193247] bg-[#dbeaff] rounded items-center gap-3 text-primary dark:text-darkPrimary cursor-pointer flex`}
          >
            <div className="w-11 h-11 flex justify-center items-center shrink-0">
              <FaSignOutAlt className='text-2xl' />
            </div>
            {isOpen && (
              <span className='font-bold'>Đăng Xuất</span>
            )}
          </div> */}
        </div>
      </div>
    </section>
  );
}
