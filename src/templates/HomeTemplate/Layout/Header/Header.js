import _ from "lodash";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { history } from "../../../../App";
import { ACCESS_TOKEN, USER_LOGIN } from "../../../../Util/setting";

export default function Header(props) {


  const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);


  const renderLogin = () => {
    if (_.isEmpty(userLogin)) {
      return <Fragment>
        <button className="self-center px-8 py-3 rounded" onClick={() => {
          history.push('/login')
        }}>Login</button>
        <button className="self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-coolGray-900" onClick={() => {
          history.push('/register')
        }}>
          Register
        </button>
      </Fragment>
    }
    return <Fragment>
      <button className="self-center px-8 py-3 rounded" onClick={() => {
        history.push('/profile')
      }}>Hello ! {userLogin.taiKhoan}</button>
      <button className="self-center pỹ-8 py-3 rounded" onClick={() => {
        localStorage.removeItem(USER_LOGIN);
        localStorage.removeItem(ACCESS_TOKEN);
        history.push('/');
        window.location.reload();
      }}>Đăng Xuất</button>
    </Fragment>
  }

  return (
    <header className="dark:bg-coolGray-800 dark:text-coolGray-100 bg-white text-black fixed w-full z-10 border border-b-1">
      <div className="container flex items-center justify-between h-16 mx-auto">
        <NavLink
          to="/home"
          aria-label="Back to homepage"
          className="flex items-center p-2"
        >
          <img src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt="cybersoft.edu.vn" />
        </NavLink>
        <ul className="mt-5 items-stretch hidden space-x-3 lg:flex">
          <li className="flex">
            <NavLink to="/home"
              className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-black hover:text-yellow-400 duration-300" activeClassName="border-b-2 border-white"
            >
              Home
            </NavLink>
          </li>
          <li className="flex">
            <NavLink to="/contact"
              className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-black hover:text-yellow-400 duration-300" activeClassName="border-b-2 border-white"
            >
              Contact
            </NavLink>
          </li>
          <li className="flex">
            <NavLink to="/news"
              className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-black hover:text-yellow-400 duration-300" activeClassName="border-b-2 border-white"
            >
              News
            </NavLink>
          </li>
        </ul>


        <div className="items-center flex-shrink-0 hidden lg:flex">

          {renderLogin()}


        </div>
        <button className="p-4 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 dark:text-coolGray-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>


  );
}
