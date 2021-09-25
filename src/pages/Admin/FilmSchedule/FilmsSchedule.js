import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import { Table, Button, Row, Col, Divider } from 'antd';
import { getInfoFilmSheduleAdmin } from '../../../redux/actions/QuanLyLichChieuPhimAction';
import { layDanhSachPhimAction } from '../../../redux/actions/QuanLyPhimAction';

import {
    InteractionOutlined,
  } from '@ant-design/icons';

export default function FilmsSchedule() {
    const { arrFilmDefault } = useSelector(state => state.QuanLyPhimReducer);
    const { listFilmShedule } = useSelector(state => state.QuanLyLichChieuPhimReducer);
    let data = [];
    if (listFilmShedule != '') {
        for (let i = 0; i < listFilmShedule.length; i++) {
            let listFilm = listFilmShedule[i];
            for (let j = 0; j < listFilm.heThongRapChieu.length; j++) {
                let heThongRapChieu = listFilm.heThongRapChieu[j];
                for (let h = 0; h < heThongRapChieu.cumRapChieu.length; h++) {
                    let cumRapChieu = heThongRapChieu.cumRapChieu[h];
                    for (let g = 0; g < cumRapChieu.lichChieuPhim.length; g++) {
                        data.push({
                            maLichChieu: cumRapChieu.lichChieuPhim[g].maLichChieu,
                            tenHeThongRap: heThongRapChieu.tenHeThongRap,
                            logo: heThongRapChieu.logo,
                            tenRap: cumRapChieu.lichChieuPhim[g].tenRap,
                            tenPhim: listFilm.tenPhim,
                            hinhAnh: listFilm.hinhAnh,
                            ngayChieuGioChieu: cumRapChieu.lichChieuPhim[g].ngayChieuGioChieu,
                            giaVe: cumRapChieu.lichChieuPhim[g].giaVe,

                        })
                    }
                }
            }
        }
    }
    const dispatch = useDispatch();
    const fetchData = () => {
        if (listFilmShedule == '' && arrFilmDefault != '') {
            for (let i = 0; i < arrFilmDefault.length; i++) {
                dispatch(getInfoFilmSheduleAdmin(arrFilmDefault[i].maPhim));
            }
        }
    }
    useEffect(() => {
        fetchData();
        dispatch(layDanhSachPhimAction());
    }, []);
    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const columns = [
        {
            title: 'MÃ LỊCH CHIẾU',
            dataIndex: 'maLichChieu',
            key: 'maLichChieu',
            width: 60,
            sorter: (a, b) => a.maLichChieu - b.maLichChieu,
        },
        {
            title: 'NGÀY CHIẾU GIỜ CHIẾU',
            dataIndex: 'ngayChieuGioChieu',
            key: 'ngayChieuGioChieu',
            width: 80,
            render: (text) => (<span>{moment(text).format('DD/MM/YYYY hh:mm:ss')}</span>)
        },
        {
            title: 'GIÁ VÉ',
            dataIndex: 'giaVe',
            key: 'giaVe',
            width: 80,
            render: (text) => (<span>{numberWithCommas(text)} VNĐ</span>)
        },
        {
            title: 'TÊN PHIM',
            key: 'tenPhim',
            dataIndex: 'tenPhim',
            width: 150,
        },
        {
            title: 'HÌNH ẢNH',
            key: 'hinhAnh',
            dataIndex: 'hinhAnh',
            width: 80,
            render: (text, render) => (
                <img src={text} style={{ width: '50px', height: '50px', borderRadius: '10px' }} />
            )
        },
        {
            title: 'LOGO',
            dataIndex: 'logo',
            key: 'logo',
            width: 50,
            render: (text, render) => (
                <img src={text} style={{ width: '40px', height: '40px', borderRadius: '10px' }} />
            )
        },
        {
            title: 'TÊN HỆ THỐNG RẠP',
            dataIndex: 'tenHeThongRap',
            key: 'tenHeThongRap',
            width: 100,
        },
        {
            title: 'TÊN RẠP',
            dataIndex: 'tenRap',
            key: 'tenRap',
            width: 50,
        },
        
        {
            title: 'ACTION',
            key: 'operation',
            fixed: 'right',
            width: 100,
          },
    ];



    return (
        <Row >
            <Col span={24}>
                <Divider orientation="left">Quản Lý Phim</Divider>
                </Col>
            <Col span={24} style={{marginRight:10}}>
                    <Table  scroll={{ x: 400 }} columns={columns} dataSource={data} sticky  />
            </Col>
        </Row>
    )
}
