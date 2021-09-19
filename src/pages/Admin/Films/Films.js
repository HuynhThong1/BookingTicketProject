import React, { Fragment, useEffect } from 'react'

import { Button, Table, Input, Image } from 'antd';

import { AudioOutlined, EditOutlined, DeleteOutlined, CalendarOutlined  } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachPhimAction, xoaPhimAction } from '../../../redux/actions/QuanLyPhimAction';
import { NavLink } from 'react-router-dom';
import { history } from '../../../App';
import Swal from 'sweetalert2';
import moment from 'moment';
import { Row, Col, Divider  } from 'antd';


const { Search } = Input;

const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1890ff',
        }}
    />
);

export default function Films() {


    const { arrFilmDefault } = useSelector(state => state.QuanLyPhimReducer);

    const dispatch = useDispatch()

    useEffect(() => {


        dispatch(layDanhSachPhimAction());
    }, [])
    
    const columns = [
        {
            title: 'Mã Phim',
            dataIndex: 'maPhim',

            width: '10%',
            sorter: (a, b) => a.maPhim - b.maPhim,
            sortDirections: ['descend', 'ascend'],
            // sortOrder: ['descend']
        },
        {
            title: 'Hình Ảnh',
            dataIndex: 'hinhAnh',
            render: (text, film) => {
                return <Fragment><Image src={film.hinhAnh} alt={film.tenPhim} style={{ minHeight: 70, maxHeight: 70 }} width={50} onError={(e) => { e.target.onerror = null; e.target.src = "https://developers.google.com/maps/documentation/streetview/images/error-image-generic.png" }} /></Fragment>
            },
            sorter: (a, b) => a.age - b.age,
            width: '10%',
        },
        {
            title: 'Tên Phim',
            dataIndex: 'tenPhim',
            width: '20%',

            sorter: (a, b) => {
                let tenPhimA = a.tenPhim.toLowerCase().trim();
                let tenPhimB = b.tenPhim.toLowerCase().trim();

                if (tenPhimA > tenPhimB) {
                    return 1;
                }
                return -1;
            },
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Mô Tả',
            dataIndex: 'moTa',

            sorter: (a, b) => {
                let moTaA = a.moTa.toLowerCase().trim();
                let moTaB = b.moTa.toLowerCase().trim();

                if (moTaA > moTaB) {
                    return 1;
                }
                return -1;
            },

            render: (text, film) => (<Fragment>
                {film.moTa.length > 100 ? film.moTa.slice(0, 100) + '...' : film.moTa}
            </Fragment>)

            ,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'NGÀY KHỞI CHIẾU',
            dataIndex: 'ngayKhoiChieu',
            render: (text, film) => (<Fragment>
                {moment(film.ngayKhoiChieu).format("DD/MM/YYYY")}
            </Fragment>)
        },
        {
            title: 'ĐÁNH GIÁ',
            dataIndex: 'danhGia',
            sorter: (a, b) => a.danhGia - b.danhGia,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Hành Động',
            dataIndex: 'hanhDong',

            render: (text, film) => (<Fragment>
                
                <NavLink key={1} className="hover:text-blue-400 text-xl text-black" to={`/admin/films/edit/${film.maPhim}`}><EditOutlined /> </NavLink>
                <NavLink key={2} className="hover:text-red-800 text-xl text-black"to={`/admin/films`} onClick={()=>{
                    // if(window.confirm('Ban co chac muon xoa phim'+ film.tenPhim)){
                    //     dispatch(xoaPhimAction(film.maPhim))
                    // }
                    Swal.fire({
                        title: `Bạn có chắc muốn xóa phim !`,
                        text: film.tenPhim,
                        icon: 'question',
                        showCancelButton: true,
                        confirmButtonColor: '#fb4226',
                        cancelButtonColor: 'rgb(167 167 167)',
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            dispatch(xoaPhimAction(film.maPhim))
                        }
                    })
                }}><DeleteOutlined /> </NavLink>
                <NavLink key={3} className="hover:text-green-400 text-xl text-black" to={`/admin/films/showtime/${film.maPhim}/${film.tenPhim}`} onClick={()=>{
                    localStorage.setItem('filmParams', JSON.stringify(film))
                }}><CalendarOutlined /> </NavLink>


            </Fragment>)

            ,
            sortDirections: ['descend', 'ascend'],
        },
    ];

    const data = arrFilmDefault;


    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }
    const onSearch = (value) => {
        console.log(value)
        dispatch(layDanhSachPhimAction(value))
    }


    return (
        <>
         <Row >
            <Col span={24}>
                <Divider orientation="left">Quản Lý Phim</Divider>
             </Col>
             <Col span={24}>
                    <Button className="mt-5 mb-5" onClick={()=>{
                        history.push('/admin/films/addnew')
                    }}>Thêm Phim</Button>
                  
             </Col>
             <Col span={6}>
                <Search placeholder="Nhập để tìm phim" onSearch={onSearch} enterButton className="mb-5" />
             </Col>
            <Col span={24} style={{marginRight:10}}>
                <Table columns={columns} dataSource={data} onChange={onChange} rowKey={"maPhim"} scroll={{ x: 400 }}/>
            </Col>
        </Row>
        </>
       
    )
}
