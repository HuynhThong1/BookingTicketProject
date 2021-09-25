import { Fragment, useEffect, useState } from "react";
import { Route, Redirect, NavLink, Link } from 'react-router-dom';
import { ACCESS_TOKEN, USER_LOGIN } from "../../Util/setting";
import _ from 'lodash';

import { Layout, Menu, Breadcrumb, Avatar, Select } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    UserOutlined,
    InsertRowBelowOutlined
} from '@ant-design/icons';
import { useSelector } from "react-redux";
import { history } from "../../App";
import styled from "styled-components";
const { Option } = Select;
const { SubMenu } = Menu;


const { Header, Content, Footer, Sider } = Layout;


export const AdminTemplate = (props) => { //path, exact, Component


    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = collapsed => {
        setCollapsed(collapsed)
    };
    const getPath = props.location.pathname;
    const path = getPath.split("/");
    const { Component, ...restProps } = props;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])


    if (!localStorage.getItem(USER_LOGIN)) {
        alert('Bạn không có quyền truy cập vào trang này!!!');
        return <Redirect to='/' />
    }

    if (userLogin.maLoaiNguoiDung !== 'QuanTri') {
        alert('Bạn không có quyền truy cập vào trang này!!!');
        return <Redirect to='/' />
    }

    const username = localStorage.getItem(USER_LOGIN) ? JSON.parse(localStorage.getItem(USER_LOGIN)).taiKhoan : '';

    // const operations = <Fragment>
    //     {!_.isEmpty(userLogin) ? <Fragment>
    //         <button onClick={() => {
    //             history.push(`/profile`);
    //         }}><UserProfile className="ml-5 rounded-full bg-red-200 text-xl">{userLogin.taiKhoan.substr(0, 1)}</UserProfile></button>
    //         <button onClick={() => {
    //             localStorage.removeItem(USER_LOGIN);
    //             localStorage.removeItem(ACCESS_TOKEN);
    //             history.push('/');
    //             window.location.reload();
    //         }} className="text-blue-800 ml-10">Đăng xuất</button>
    //     </Fragment> : ''}
    // </Fragment>;
    const handleChange = async (value) => {
        if (value == 'logout') {
            localStorage.removeItem(USER_LOGIN);
            localStorage.removeItem(ACCESS_TOKEN);
            history.push('/');
            window.location.reload();
    
        }
    }
    const ListRouter = (props) => {
        switch (props) {
            case 'admin':
                return `/admin`;
            case 'user':
                return `/admin/users`;
            case 'films':
                return `/admin/films`;
            case 'films-shedule':
                return `/admin/films-shedule`;
            default: 
                return 'other'
        }
    }

    return <Route {...restProps} render={(propsRoute) => { //props.location, props.history, props.match
        return <Fragment>

            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <NavLink className="navbar-brand" to="/">
                    <div className="logo p-5">
                        <Link to="/"><img src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt="logo"/></Link>
                    </div>
                    </NavLink>
                  
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<PieChartOutlined />}>
                            <NavLink to="/admin">Dashboard</NavLink>
                            
                        </Menu.Item>
                        {/* <Menu.Item key="2" icon={<UserOutlined />}>
                            <NavLink to="/admin/users">Users</NavLink>
                        </Menu.Item> */}
                        <SubMenu key="sub1" icon={<UserOutlined />} title="Users">
                            <Menu.Item key="2" icon={<UserOutlined />}>
                                <NavLink to="/admin/users">Users</NavLink>
                            </Menu.Item>
                            <Menu.Item key="3" icon={<FileOutlined />}>
                                <NavLink to="/admin/users/addnew">Add new</NavLink>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<DesktopOutlined />} title="Films">
                            <Menu.Item key="4" icon={<FileOutlined />}>
                                <NavLink to="/admin/films">Films</NavLink>
                            </Menu.Item>
                            <Menu.Item key="5" icon={<FileOutlined />}>
                                <NavLink to="/admin/films/addnew">Add new</NavLink>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" icon={<InsertRowBelowOutlined />} title="MOfficeTicket">
                            <Menu.Item key="6" icon={<FileOutlined />}>
                                <NavLink to="/admin/films-shedule">Schedule Films</NavLink>
                            </Menu.Item>

                        </SubMenu>
                        {/* <Menu.Item key="4" icon={<DesktopOutlined />}>
                            <NavLink to="/admin/showtime">Showtime</NavLink>
                        </Menu.Item> */}
                        {/* <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                            <Menu.Item key="3">Tom</Menu.Item>
                            <Menu.Item key="4">Bill</Menu.Item>
                            <Menu.Item key="5">Alex</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                            <Menu.Item key="6">Team 1</Menu.Item>
                            <Menu.Item key="8">Team 2</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="9" icon={<FileOutlined />}>
                            Files
                        </Menu.Item> */}
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="" style={{padding: 0, backgroundColor: '#fff', alignItems: 'center', display:'flex', justifyContent: 'flex-end' }}>
                        <div className="text-right pr-10 pt-1" style={{display:'flex', alignItems:'center', height:'auto'}}>
                        <Avatar size="large" style={{ color: '#FFFFFF', backgroundColor: '#40ADFF', marginRight: "10px" }} icon={<UserOutlined onClick={()=>{
                            history.push(`/profile`);
                        }} />} />
                        <Select value={username} style={{ width: 120 }} onChange={handleChange}>
                            <Option value="logout" >Logout</Option>
                        </Select>
                        </div>
                        {/* <div className="text-right pr-10 pt-1">{operations}</div> */}
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            {/* <Breadcrumb.Item>User</Breadcrumb.Item> 
                            <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
                
                             {path.map((v, index) => {
                                console.log('page',v )
                                return <Breadcrumb.Item><NavLink key={index} to={ListRouter(v)==='other' ? `/${v}` : ListRouter(v)}>{v}</NavLink></Breadcrumb.Item>
                            })
                            }
                        </Breadcrumb>
                        <div className="bg-white h-full" style={{ padding: 24, minHeight: 360 }}>
                            <Component {...propsRoute} />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>


        </Fragment>

    }} />
}


const UserProfile = styled.div`
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
`