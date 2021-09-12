import React, { Fragment, useEffect } from 'react'

import { Button, Table } from 'antd';

import { Input, Space } from 'antd';
import { AudioOutlined, EditOutlined, DeleteOutlined  } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachPhimAction } from '../../../redux/actions/QuanLyPhimAction';
import { NavLink } from 'react-router-dom';

const { Search } = Input;

const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1890ff',
        }}
    />
);

const onSearch = value => console.log(value);

export default function Films() {


    const { arrFilmDefault } = useSelector(state => state.QuanLyPhimReducer);

    const dispatch = useDispatch()

    useEffect(() => {


        dispatch(layDanhSachPhimAction());
    }, [])

    console.log('arrFilmDefault', arrFilmDefault)

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
                return <Fragment><img src={film.hinhAnh} alt={film.tenPhim} style={{ minHeight: 70, maxHeight: 70 }} width={50} onError={(e) => { e.target.onerror = null; e.target.src = "https://developers.google.com/maps/documentation/streetview/images/error-image-generic.png" }} /></Fragment>
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
            title: 'Hành Động',
            dataIndex: 'hanhDong',

            render: (text, film) => (<Fragment>
                
                <NavLink className="hover:text-blue-400 text-xl text-black" to="/"><EditOutlined /> </NavLink>
                <NavLink className="hover:text-red-800 text-xl text-black" to="/"><DeleteOutlined /> </NavLink>

            </Fragment>)

            ,
            sortDirections: ['descend', 'ascend'],
        },
    ];

    const data = arrFilmDefault;


    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }


    return (
        <div className="">
            <h3 className="text-4xl">Quản Lý Phim</h3>
            <Button className="mt-5 mb-5">Thêm Phim</Button>
            <Search placeholder="Nhập để tìm phim" onSearch={onSearch} enterButton className="mb-5" />
            <Table columns={columns} dataSource={data} onChange={onChange} />
        </div>
    )
}
