import { FaSun, FaMoon } from 'react-icons/fa';
import { useThemeToggle } from '../hook/useThemeToggle';
type Props = {
  isOpen: boolean;
}
export default function ThemeToggleButton({isOpen} : Props) {
  const { isDarkMode, toggleTheme } = useThemeToggle();

  return (
    <div 
      onClick={toggleTheme} 
      className=""
      aria-label="Toggle Dark Mode"
    >
      {isDarkMode ? (
        <div className={`items-center cursor-pointer flex`}>
          <div className="items-center gap-3 flex">
            <button className='flex items-center shrink-0 justify-center w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700'>
            <FaSun className="text-yellow-600 text-xl" />
            </button>
            {isOpen &&(<p className='text-darkPrimary'>LightMode</p>)}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-3">
            <button className='flex items-center shrink-0 justify-center w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700'>
              <FaMoon className="text-blue-900 text-xl" /> 
            </button>
            {isOpen &&(<p>DarkMode</p>)}
          </div>
        </div>
      )}
    </div>
  );
}
