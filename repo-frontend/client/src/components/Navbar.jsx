import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  function logoutAction() {
    localStorage.clear();
    navigate("/login");
  }
  return (
    <>
      <div className="navbar bg-blue-300">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost hover:bg-blue-500 lg-hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-boneWhite rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <Link to="/">
                <li>
                  <a href="">Home</a>
                </li>
              </Link>
              <Link to="/bookmark">
                <li>
                  <a href="">Bookmark</a>
                </li>
              </Link>
            </ul>
          </div>
          <a
            href=""
            className="btn btn-ghost text-xl text-white hover:bg-blue-400"
          >
            MonsterPedia
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-4">
            <Link to="/">
              <li>
                <a className="font-semibold text-white hover:bg-blue-400">
                  Home
                </a>
              </li>
            </Link>
            <Link to="/bookmark">
              <li>
                <a className="font-semibold text-white hover:bg-blue-400">
                  Bookmark
                </a>
              </li>
            </Link>
          </ul>
        </div>
        <div className="navbar-end">
          <button className="btn btn-error" onClick={logoutAction}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
