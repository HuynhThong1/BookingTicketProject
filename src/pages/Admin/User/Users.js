import React, { Fragment, useEffect, useState } from 'react'

import { Button, Table, Popover, Input } from 'antd';

import {  EditOutlined, DeleteOutlined, CalendarOutlined  } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { history } from '../../../App';
import Swal from 'sweetalert2';
import { layDanhSachNguoiDungAction, xoaNguoiDungAction } from '../../../redux/actions/QuanLyNguoiDungAction';
import { Row, Col, Divider  } from 'antd';
const { Search } = Input;

export default function Users() {


    const { danhSachNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);

    console.log('DanhSachNguoiDungClient', danhSachNguoiDung)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(layDanhSachNguoiDungAction());
    }, [])
    
    const columns = [
        {
            title: 'TÀI KHOẢN',
            dataIndex: 'taiKhoan',
            width: '10%',
            sorter: (a, b) => {
                let taiKhoanA = a.taiKhoan.toLowerCase().trim();
                let taiKhoanB = b.taiKhoan.toLowerCase().trim();

                if (taiKhoanA > taiKhoanB) {
                    return 1;
                }
                return -1;
            },
            sortDirections: ['descend', 'ascend'],
            // sortOrder: ['descend']
        },
        {
            title: 'HỌ TÊN',
            dataIndex: 'hoTen',
            sorter: (a, b) => {
                let hoTenA = a.hoTen.toLowerCase().trim();
                let hoTenB = b.hoTen.toLowerCase().trim();

                if (hoTenA > hoTenB) {
                    return 1;
                }
                return -1;
            },
            width: '10%',
        },
        {
            title: 'EMAIL',
            dataIndex: 'email',
            width: '10%',
            sorter: (a, b) => {
                let emailA = a.email.toLowerCase().trim();
                let emailB = b.email.toLowerCase().trim();

                if (emailA > emailB) {
                    return 1;
                }
                return -1;
            },
    
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'SĐT',
            dataIndex: 'soDt',
            sorter: (a, b) => a.soDt - b.soDt,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'MẬT KHẨU',
            dataIndex: 'matKhau',
        },
        {
            title: 'MÃ LOẠI NGƯỜI DÙNG',
            dataIndex: 'maLoaiNguoiDung',
            responsive: ["sm"]
        },
        {
            title: 'Hành Động',
            dataIndex: 'hanhDong',
            responsive: ["sm"],
            render: (text, NguoiDung) => (<Fragment>
                
                <NavLink key={1} className="hover:text-blue-400 text-xl text-black" to={`/admin/users/edit/${NguoiDung.taiKhoan}`}><Popover content="Cập nhật"><EditOutlined /> </Popover></NavLink>
                <NavLink key={2} className="hover:text-red-800 text-xl text-black"to={`/admin/users`} onClick={()=>{
                    // if(window.confirm('Bạn có chăc'+ NguoiDung.hoTen)){
                    //     dispatch(xoaNguoiDungAction(NguoiDung.taiKhoan))
                    // }
                    Swal.fire({
                        title: `Bạn có chắc muốn xóa người dùng !`,
                        text: NguoiDung.hoTen,
                        icon: 'question',
                        showCancelButton: true,
                        confirmButtonColor: '#fb4226',
                        cancelButtonColor: 'rgb(167 167 167)',
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            dispatch(xoaNguoiDungAction(NguoiDung.taiKhoan))
                        }
                    })
                }}><Popover content="Xoá"><DeleteOutlined />  </Popover></NavLink>
                 <NavLink className="hover:text-green-400 text-xl text-black" to={`/admin/users/booked/${NguoiDung.taiKhoan}`}><Popover content="Danh sách phim đã đặt!"><CalendarOutlined /> </Popover></NavLink>
                {/* <NavLink key={3} className="hover:text-green-400 text-xl text-black" to={`/admin/films/showtime/${film.maPhim}/${film.tenPhim}`} onClick={()=>{
                    localStorage.setItem('filmParams', JSON.stringify(film))
                }}><CalendarOutlined /> </NavLink> */}


            </Fragment>)

            ,
            sortDirections: ['descend', 'ascend'],
        },
    ];

    const data = danhSachNguoiDung;


    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    const onSearch = (value) => {
        console.log(value)
        if(value != '') {
            dispatch(layDanhSachNguoiDungAction(value, true))
        }else {
            dispatch(layDanhSachNguoiDungAction(value))
        }
       
    }


    return (
        <>
        <Row >
           <Col span={24}>
               <Divider orientation="left">Quản lý tài khoản</Divider>
            </Col>
            <Col span={24}>
                <Button className="mt-5 mb-5" onClick={()=>{
                    history.push('/admin/users/addnew')
                }}>Thêm Tài khoản</Button>
                    
            </Col>
            <Col span={6}>
                <Search placeholder="Nhập để tìm tài khoản" onSearch={onSearch}  enterButton className="mb-5" />
            </Col>
           <Col span={24} style={{marginRight:10}}>
                <Table columns={columns} dataSource={data} onChange={onChange}  rowKey={"taiKhoan"} scroll={{ x: 400 }}/>
           </Col>
       </Row>
       </>
    )
}
