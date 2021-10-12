import _, { set } from "lodash";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import { history } from "../../../../App";
import { ACCESS_TOKEN, USER_LOGIN } from "../../../../Util/setting";
import './Header.scss';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

// const headerNav = [
//   {
//     display: 'Trang Chủ',
//     path: '/'
//   },
//   {
//     display: 'Đăng Nhập',
//     path: '/login'
//   },
// ];

export default function Header(props) {


  const { pathname } = useLocation();
  const headerRef = useRef(null);

  // const active = headerNav.findIndex(e => e.path === pathname);

  const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);


  const renderLogin = () => {
    if (_.isEmpty(userLogin)) {
      return <Fragment>
        <button className="duration-500 self-center px-5 py-2 rounded border border-yellow-400 bg-yellow-400 hover:bg-white hover" onClick={() => {
          history.push('/login')
        }}>Đăng Nhập</button>
      </Fragment>
    }
    return <Fragment>
      <button className="self-center px-8 py-3 rounded" onClick={() => {
        history.push('/profile')
      }}>Xin Chào ! {userLogin.taiKhoan}</button>
      <button className="self-center pỹ-8 py-3 rounded" onClick={() => {
        localStorage.removeItem(USER_LOGIN);
        localStorage.removeItem(ACCESS_TOKEN);
        history.push('/');
        window.location.reload();
      }}>Đăng Xuất</button>
    </Fragment>
  }


  return (

    <div ref={headerRef} className="header shrink">
      <div className="header__wrap container">
        <div className="logo">

          <Link to="/" className="text-white hover:text-yellow-400"><img src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt="cybersoft.edu.vn" /></Link>
        </div>
        <ul className="header__nav">

          <li className={pathname==='/' ? 'active' : ''}>
            <Link to="/" className="text-white md:text-black hover:text-yellow-400">
              <HomeOutlined />
            </Link>
          </li>

          {_.isEmpty(userLogin) ? (<li className={pathname==='/login' ? 'active' : ''}>
            <Link to="/login" className="text-white md:text-black hover:text-yellow-400">
              <UserOutlined />
            </Link>
          </li>) : (<li className={pathname==='/profile' ? 'active' : ''}>
            <Link to="/profile" className="text-white md:text-black hover:text-yellow-400">
              <UserOutlined />
            </Link>
          </li>)}

        </ul>
      </div>
    </div>



    // <header className="dark:bg-coolGray-800 dark:text-coolGray-100 bg-white text-black fixed w-full z-10 border border-b-1">
    //   <div className="container flex items-center justify-between h-16 mx-auto">
    //     <NavLink
    //       to="/home"
    //       aria-label="Back to homepage"
    //       className=" flex items-center p-2"
    //     >
    //       <img src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt="cybersoft.edu.vn" />
    //     </NavLink>
    //     <ul className="mt-5 items-stretch hidden space-x-3 lg:flex">
    //       <li className="flex">
    //         <NavLink to="/home"
    //           className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-black hover:text-yellow-400 duration-300" activeClassName="border-b-2 border-white"
    //         >
    //           Trang Chủ
    //         </NavLink>
    //       </li>
    //       <li className="flex">
    //         <a href="#phim"
    //           className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-black hover:text-yellow-400 duration-300" activeClassName="border-b-2 border-white"
    //         >
    //           Phim
    //         </a>
    //       </li>
    //       <li className="flex">
    //         <a href="#cumrap"
    //           className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-black hover:text-yellow-400 duration-300" activeClassName="border-b-2 border-white"
    //         >
    //           Cụm Rạp
    //         </a>
    //       </li>
    //     </ul>


    //     <div className="items-center flex-shrink-0 hidden lg:flex">
    //       {renderLogin()}
    //     </div>
    //     <button className="p-4 lg:hidden" onClick={showSidebar}>
    //       <svg
    //         xmlns="http://www.w3.org/2000/svg"
    //         fill="none"
    //         viewBox="0 0 24 24"
    //         stroke="currentColor"
    //         className="w-6 h-6 dark:text-coolGray-100"
    //       >
    //         <path
    //           strokeLinecap="round"
    //           strokeLinejoin="round"
    //           strokeWidth={2}
    //           d="M4 6h16M4 12h16M4 18h16"
    //         />
    //       </svg>
    //     </button>
    //   </div>

    //   {sidebar ? (
    //     <Fragment>
    //       <div className={`lg:hidden sidebar h-screen bg-gray-50 text-gray-900 w-64 px-2 space-y-6 py-4 absolute top-0 right-0  inset-y-0 left-0 transform  transition duration-200 ease-in-out z-50`}>
    //         {/* logo */}
    //         <a href="#123123" className="text-gray-900 flex items-center px-4" alt="...">
    //           <img src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt="cybersoft.edu.vn" />

    //           <button className="fixed rounded-full top-5 -right-3 bg-red-500 h-7 w-7 flex items-center justify-center hover:text-black" onClick={showSidebar}><CloseOutlined /></button>
    //         </a>
    //         {/* nav */}
    //         <nav>
    //           <Link to="/" className="block py-2 px-4 rounded hover:bg-yellow-400 hover:text-black transition duration-200 text-black" onClick={showSidebar}>Trang Chủ</Link>
    //           <Link to="#phim" className="block py-2 px-4 rounded hover:bg-yellow-400 hover:text-black transition duration-200 text-black" onClick={showSidebar}>Phim</Link>
    //           <Link to="#cumrap" className="block py-2 px-4 rounded hover:bg-yellow-400 hover:text-black transition duration-200 text-black" onClick={showSidebar}>Cụm Rạp</Link>
    //           {renderLoginMobile()}
    //         </nav>
    //       </div>
    //     </Fragment>
    //   ) : ''}

    //   {sidebar ? <div className="lg:hidden fixed w-screen h-screen top-0 right-0 bg-gray-500 z-10 opacity-50"></div> : ''}

    // </header>




  );
}
