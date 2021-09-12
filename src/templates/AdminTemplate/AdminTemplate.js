import { Fragment, useEffect, useState } from "react";
import { Route, Redirect, NavLink } from 'react-router-dom';
import { ACCESS_TOKEN, USER_LOGIN } from "../../Util/setting";
import _ from 'lodash';

import { Layout, Menu, Breadcrumb } from 'antd';

import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { useSelector } from "react-redux";
import { history } from "../../App";
import styled from "styled-components";


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


export const AdminTemplate = (props) => { //path, exact, Component


    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = collapsed => {
        setCollapsed(collapsed)
    };

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


    const operations = <Fragment>
        {!_.isEmpty(userLogin) ? <Fragment>
            <button onClick={() => {
                history.push(`/profile`);
            }}><UserProfile className="ml-5 rounded-full bg-red-200 text-xl">{userLogin.taiKhoan.substr(0, 1)}</UserProfile></button>
            <button onClick={() => {
                localStorage.removeItem(USER_LOGIN);
                localStorage.removeItem(ACCESS_TOKEN);
                history.push('/');
                window.location.reload();
            }} className="text-blue-800 ml-10">Đăng xuất</button>
        </Fragment> : ''}
    </Fragment>;


    return <Route {...restProps} render={(propsRoute) => { //props.location, props.history, props.match
        return <Fragment>

            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                    <div className="logo p-5">
                        <img src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt="logo"/>
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<PieChartOutlined />}>
                            <NavLink to="/admin/users">Users</NavLink>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<DesktopOutlined />}>
                            <NavLink to="/admin/films">Films</NavLink>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<DesktopOutlined />}>
                            <NavLink to="/admin/showtime">Showtime</NavLink>
                        </Menu.Item>
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
                    <Header className="" style={{padding: 0, backgroundColor: '#fff'}}>
                        <div className="text-right pr-10 pt-1">{operations}</div>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            {/* <Breadcrumb.Item>User</Breadcrumb.Item> 
                            <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
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