import _, { set } from "lodash";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import { history } from "../../../../App";
import { ACCESS_TOKEN, USER_LOGIN } from "../../../../Util/setting";
import './Header.scss';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

export default function Header(props) {


  const { pathname } = useLocation();
  const headerRef = useRef(null);

  const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

  const [sidebar, setSidebar] = useState(false);
  const [activepage, setActivePage] = useState(0);

  const showSidebar = () => setSidebar(!sidebar);
  return (

    <div ref={headerRef} className="header shrink">
      <div className="header__wrap">
        <div className="logo">

          <Link to="/" className="text-white hover:text-yellow-400"><img src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt="cybersoft.edu.vn" /></Link>
        </div>
        <ul className=" mt-5 mr-10 items-stretch hidden space-x-3 lg:flex">
          <li className="flex">
            <NavLink to="/" onClick={() => { setActivePage(1) }}
              className={`flex items-center  border-b-2 px-4 border-transparent text-black ${activepage === 1 ? `text-yellow-400` : ''} hover:text-yellow-400 duration-300" activeClassName="border-b-2 border-white`}
            >
              Trang Chủ
            </NavLink>
          </li>
          <li className="flex">
            <a href="#phim"
              className={`flex items-center  border-b-2 px-4 border-transparent text-black ${activepage === 2 ? `text-yellow-400` : ''} hover:text-yellow-400 duration-300" activeClassName="border-b-2 border-white`}
              onClick={() => { setActivePage(2) }}
            >
              Phim
            </a>
          </li>
          <li className="flex">
            <a href="#cumrap"
              className={`flex items-center border-b-2 px-4 mr-10 border-transparent text-black  ${activepage === 3 ? `text-yellow-400` : ''} hover:text-yellow-400 duration-300" activeClassName="border-b-2 border-white`}
              onClick={() => { setActivePage(3) }}
            >
              Cụm Rạp
            </a>
          </li>
        </ul>
        <ul className="header__nav">

          <li className={pathname === '/' ? 'active' : ''}>
            <Link to="/" className="text-white md:text-black hover:text-yellow-400">
              <HomeOutlined />
            </Link>
          </li>

          {_.isEmpty(userLogin) ? (<li className={pathname === '/login' ? 'active' : ''}>
            <Link to="/login" className="text-white md:text-black hover:text-yellow-400">
              <UserOutlined />
            </Link>
          </li>) : (<li className={pathname === '/profile' ? 'active' : ''}>
            <Link to="/profile" className="text-white md:text-black hover:text-yellow-400">
              <UserOutlined />
            </Link>
          </li>)}
        </ul>
      </div>
    </div>
  );
}
