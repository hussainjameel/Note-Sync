import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <div
        className="navbar flex justify-between shadow bg-base-100  rounded-3xl "
        data-theme="autumn"
      >
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 border border-gray-300"
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/notes">Notes</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="">Account</Link>
                <ul className="p-2">
                  {!localStorage.getItem("token") ? (
                    <>
                      <li>
                        <Link to="/signup">Signup</Link>
                      </li>
                      <li>
                        <Link to="/login">Login</Link>
                      </li>
                    </>
                  ) : (
                    <li>
                      <Link to="/login" onClick={handleLogout}>
                        Logout
                      </Link>
                    </li>
                  )}
                </ul>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl">NoteSync</a>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/notes">Notes</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>

        <div className="navbar-end">
          <ul className="menu menu-horizontal px-1">
            <li tabIndex={0}>
              <details>
                <summary className="rounded-full bg-amber-900 bg-opacity-60 ">
                  Account
                </summary>
                <ul
                  className="p-2 border border-gray-200"
                  style={{ zIndex: 1 }}
                >
                  {!localStorage.getItem("token") ? (
                    <>
                      <li>
                        <Link to="/signup">Signup</Link>
                      </li>
                      <li>
                        <Link to="/login">Login</Link>
                      </li>
                    </>
                  ) : (
                    <li>
                      <Link to="/login" onClick={handleLogout}>
                        Logout
                      </Link>
                    </li>
                  )}
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
