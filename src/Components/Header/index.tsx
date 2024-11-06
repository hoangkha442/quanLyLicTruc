import { FaBars } from 'react-icons/fa';

type RoleType = 'bcnKhoa' | 'giangVien' | 'thuKyKhoa';

type Props = {
  toggleSidebar: () => void;
  role: RoleType;
};

const getRoleName = (role: RoleType): string => {
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

export default function Header({ toggleSidebar, role }: Props) {
  return (
    <section className="h-20 flex items-center justify-between px-4 bg-white dark:bg-[#031C30]">
      <button 
        onClick={toggleSidebar} 
        className="text-2xl text-primary dark:text-darkPrimary hover:text-red-600 transition-colors duration-300"
        aria-label="Toggle Sidebar"
      >
        <FaBars />
      </button>
      <h1 className="text-xl font-semibold text-primary dark:text-darkPrimary">
        {getRoleName(role)}
      </h1>
    </section>
  );
}
