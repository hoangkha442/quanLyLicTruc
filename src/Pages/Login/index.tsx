import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setRole } from '../../Services/localStorage';
import Swal from 'sweetalert2';
import login from "../../assets/login.svg";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

type RoleType = 'bcnKhoa' | 'giangVien' | 'thuKyKhoa';

const Login: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<RoleType | null>(null);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const credentials: Record<RoleType, { username: string; password: string }> = {
    bcnKhoa: { username: 'bcnKhoaUser', password: 'bcnKhoaPass' },
    giangVien: { username: 'giangVienUser', password: 'giangVienPass' },
    thuKyKhoa: { username: 'thuKyKhoaUser', password: 'thuKyKhoaPass' },
  };

  const handleRoleChange = (role: RoleType) => {
    setSelectedRole(role);
    const { username, password } = credentials[role];
    setUsername(username);
    setPassword(password);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedRole) {
      const correctCredentials = credentials[selectedRole];
      
      if (username === correctCredentials.username && password === correctCredentials.password) {
        setRole(selectedRole);

        if (selectedRole === 'giangVien') {
          Swal.fire({
            title: 'Quét FaceID',
            text: 'Vui lòng nhìn vào camera để quét khuôn mặt.',
            icon: 'info',
            showCancelButton: false,
            showConfirmButton: true,
            confirmButtonText: 'Quét xong'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire('Thành công!', 'Đăng nhập thành công với vai trò Giảng Viên.', 'success').then(() => {
                navigate('/dashboard'); // Redirect here
              });
            }
          });
        } else {
          Swal.fire('Thành công!', `Đăng nhập thành công với vai trò ${selectedRole}.`, 'success').then(() => {
            navigate('/dashboard'); // Redirect here
          });
        }
      } else {
        Swal.fire('Lỗi', 'Tên đăng nhập hoặc mật khẩu không đúng.', 'error');
      }
    } else {
      Swal.fire('Lỗi', 'Vui lòng chọn vai trò.', 'error');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden w-[90%]">
        
        <div className="md:w-1/2 bg-white hidden md:flex items-center justify-center">
          <img src={login} alt="Login" className="object-cover w-full h-full p-3" />
        </div>
        
        <div className="md:w-1/2 bg-white p-8 md:py-24 md:px-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Đăng Nhập</h2>
          
          <div className="flex flex-col gap-4 mb-6">
            <label htmlFor="role" className="text-gray-600 font-semibold">Chọn vai trò</label>
            <select
              id="role"
              value={selectedRole || ''}
              onChange={(e) => handleRoleChange(e.target.value as RoleType)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option value="" disabled>Chọn vai trò</option>
              <option value="bcnKhoa">Ban Chủ Nhiệm Khoa</option>
              <option value="giangVien">Giảng Viên</option>
              <option value="thuKyKhoa">Thư Ký Khoa</option>
            </select>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="username" className="text-gray-600 font-semibold">Tên đăng nhập</label>
              <input
                id="username"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-1 relative">
              <label htmlFor="password" className="text-gray-600 font-semibold">Mật khẩu</label>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-600 top-1/3"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-[#21499a] hover:bg-[#213c73] text-white font-bold py-2 px-4 rounded-md transition duration-300"
              >
                Đăng Nhập
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
