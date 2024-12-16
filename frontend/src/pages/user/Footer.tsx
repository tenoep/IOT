import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-100 shadow-md">
      <div className="relative flex items-center justify-around w-full h-20">
        {/* AI Training */}
        <div className="flex flex-col items-center">
          <Link to="/user/training" className="flex flex-col items-center hover:opacity-80">
            <img
              src="https://cdn-icons-png.flaticon.com/128/10817/10817271.png"
              alt="AI Training Icon"
              className="w-8 h-8 mx-auto"
            />
            <div className="mt-1 text-xs font-semibold text-center text-black">
              AI TRAINING
            </div>
          </Link>
        </div>

        {/* My Statistics */}
        <div className="flex flex-col items-center">
          <Link
            to="/user/statistics"
            className="flex flex-col items-center hover:opacity-80"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/2041/2041643.png"
              alt="My Statistics Icon"
              className="w-8 h-8 mx-auto"
            />
            <div className="mt-1 text-xs font-semibold text-center text-black">
              MY STATISTICS
            </div>
          </Link>
        </div>

        {/* Support */}
        <div className="flex flex-col items-center">
          <Link
            to="/user/support"
            className="flex flex-col items-center hover:opacity-80"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/1086/1086581.png"
              alt="Support Icon"
              className="w-8 h-8 mx-auto"
            />
            <div className="mt-1 text-xs font-semibold text-center text-black">
              SUPPORT
            </div>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
