import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';
import Swal from 'sweetalert2';
import { getRole, setRole } from '../Services/localStorage';

type RoleType = 'bcnKhoa' | 'giangVien' | 'thuKyKhoa';

export default function Layout() {
  const [isOpen, setIsOpen] = useState(true);
  
  // Lấy role từ localStorage khi component mount
  const [userRole, setUserRole] = useState<RoleType>(() => {
    const savedRole = getRole();
    return (savedRole as RoleType) || 'giangVien';  // Mặc định là 'giangVien' nếu chưa có role
  });

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Hàm chuyển đổi role sang tên tiếng Việt
  const getRoleNameInVietnamese = (role: RoleType): string => {
    switch (role) {
      case 'bcnKhoa':
        return 'Ban Chủ Nhiệm Khoa';
      case 'giangVien':
        return 'Giảng Viên';
      case 'thuKyKhoa':
        return 'Thư Ký Khoa';
      default:
        return '';
    }
  };

  // Hàm thay đổi role và lưu vào localStorage với xác nhận từ SweetAlert2
  const changeRole = () => {
    const nextRole: RoleType = userRole === 'bcnKhoa' 
      ? 'giangVien' 
      : userRole === 'giangVien' 
      ? 'thuKyKhoa' 
      : 'bcnKhoa';

    Swal.fire({
      title: 'Thay đổi vai trò',
      text: `Bạn có chắc chắn muốn đổi vai trò thành ${getRoleNameInVietnamese(nextRole)}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý, đổi vai trò!',
      cancelButtonText: 'Không, giữ vai trò hiện tại',
    }).then((result) => {
      if (result.isConfirmed) {
        setUserRole(nextRole); 
        setRole(nextRole);   
        Swal.fire('Đã đổi vai trò!', `Vai trò hiện tại của bạn là ${getRoleNameInVietnamese(nextRole)}.`, 'success');
      }
    });
  };

  return (
    <section className="flex overflow-hidden">
      <Sidebar isOpen={isOpen} role={userRole} changeRole={changeRole} />
      <div className={`flex transition-all duration-500 flex-col ${isOpen ? "w-[calc(100%-260px)]": "w-[calc(100%-64px)]"} w-full ${isOpen ? "ml-[260px]": "ml-16"}`}>
        <Header toggleSidebar={toggleSidebar} role={userRole} /> 
        <div className="h-[calc(100%-80px)] bg-white dark:bg-[#031C30]">
          <Outlet />
        </div>
      </div>
    </section>
  );
}
