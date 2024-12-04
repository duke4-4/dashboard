import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Logo from "../../assets/Logoo.png";

function DashboardSidebar({ items, openSidebarToggle, OpenSidebar }) {
  const location = useLocation();

  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        openSidebarToggle ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <Link to="/" className="flex items-center">
            <img src={Logo} alt="Logo" className="h-8" />
          </Link>
          <button
            onClick={OpenSidebar}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <span className="sr-only">Close sidebar</span>
            ×
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {items.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-[#FF8227] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className={`mr-3 text-lg ${isActive ? 'text-white' : 'text-gray-400'}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-[#FF8227] flex items-center justify-center text-white font-semibold">
                A
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">Admin User</p>
              <p className="text-xs text-gray-500">admin@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

DashboardSidebar.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired
    })
  ).isRequired,
  openSidebarToggle: PropTypes.bool.isRequired,
  OpenSidebar: PropTypes.func.isRequired
};

export default DashboardSidebar; 