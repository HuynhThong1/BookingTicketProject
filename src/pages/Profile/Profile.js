import _ from 'lodash';
import moment from 'moment';
import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { capNhatNguoiDungAction, layDanhSachNguoiDungAction, layThongTinTaiKhoanAction } from '../../redux/actions/QuanLyNguoiDungAction';

import { Button, Modal } from 'antd';
import './Profile.scss';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { GROUPID } from '../../Util/setting';

export default function Profile() {


    const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);
    const { danhSachNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);

    const dispatch = useDispatch();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLichSuDatVeModal, setIsLichSuDatVeModal] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    useEffect(() => {
        dispatch(layThongTinTaiKhoanAction())
        dispatch(layDanhSachNguoiDungAction());
    }, [dispatch])

    console.log('danhSachNguoiDung', danhSachNguoiDung)


    const locNguoiDung = danhSachNguoiDung.filter(user => user.taiKhoan === thongTinNguoiDung.taiKhoan);
    console.log('locNguoiDung.maLoaiNguoiDung', locNguoiDung[0])
    const loaiNguoiDung = locNguoiDung[0];
    console.log('Loại Người Dùng', loaiNguoiDung?.maLoaiNguoiDung)


    console.log('thongTinNguoiDung', thongTinNguoiDung);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: thongTinNguoiDung.taiKhoan,
            hoTen: thongTinNguoiDung.hoTen,
            email: thongTinNguoiDung.email,
            soDt: thongTinNguoiDung.soDT,
            matKhau: thongTinNguoiDung.matKhau,
            maLoaiNguoiDung: loaiNguoiDung?.maLoaiNguoiDung,
        },
        validationSchema: Yup.object().shape({
            hoTen: Yup.string().required('Không được bỏ trống!!!').matches('^[A-Z a-z]+$', 'Vui lòng nhập họ tên phù hợp!!!'),
            taiKhoan: Yup.string().required('không được bỏ trống!!!'),
            email: Yup.string().required('không được bỏ trống!!!').email('không hợp lệ!!!'),
            matKhau: Yup.string().required('không được bỏ trống!!!').min(6, 'phải từ 6-32 ký tự!!!').max(32, 'phải từ 6 - 32 ký tự!!!'),
            soDt: Yup.string().required('không được bỏ trống!!!').min(10, 'Vui lòng nhập số điện thoại hợp lệ!!!').max(11, 'Vui lòng nhập số điện thoại hợp lệ!!!').matches('^[0-9]+$', 'Vui lòng nhập số điện thoại!!!'),
        }),

        onSubmit: async (values) => {

            values.maNhom = GROUPID;
            await dispatch(capNhatNguoiDungAction(values));
            await setIsModalVisible(false);
            await dispatch(layThongTinTaiKhoanAction())
        }
    })

    const renderTicketItem = () => {
        return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {

            const danhSachGhe = _.first(ticket.danhSachGhe);
            return <div className="w-full mt-2" key={index}>
                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                    <div className="flex-grow">
                        <h2 className="text-gray-900 title-font font-medium">{ticket.tenPhim}</h2>
                        <p className="text-gray-500">Địa điểm: {danhSachGhe.tenHeThongRap}</p>
                        <p className="text-gray-500">Tên Rạp: {danhSachGhe.tenCumRap} - Ghế {ticket.danhSachGhe.map((ghe, index) => {
                            return <span key={index}> {ghe.tenGhe} </span>
                        })}</p>
                        <p className="text-gray-500">Giờ Chiếu: {moment(ticket.ngayDat).format('hh:mm A')} - Ngày Chiếu {moment(ticket.ngayDat).format('DD-MM-YYYY')} </p>
                    </div>
                </div>
            </div>
        })
    }





    return (
        <div>
            <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
                {/*Main Col*/}
                <div id="profile" className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0">
                    <div className="p-4 md:p-12 text-center lg:text-left">
                        {/* Image for mobile view*/}
                        <div className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center" style={{ backgroundImage: 'url("images/user.png")' }} />
                        <h1 className="text-3xl font-bold pt-8 lg:pt-0">{thongTinNguoiDung.hoTen}</h1>
                        <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25" />
                        <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">Email: {thongTinNguoiDung.email}</p>
                        <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">Số Điện Thoại: {thongTinNguoiDung.soDT}</p>
                        <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">Tài Khoản: {thongTinNguoiDung.taiKhoan}</p>
                        <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">Nhóm: {thongTinNguoiDung.maNhom}</p>
                        <div className="pt-12 flex items-center justify-between">
                            <button className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-full" onClick={showModal}>
                                Cập Nhật Thông Tin
                            </button>
                            <button className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-full" onClick={() => {
                                setIsLichSuDatVeModal(true)
                            }}>
                                Xem lịch sử đặt vé
                            </button>
                        </div>

                        <Modal title="Cập Nhật Thông Tin" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} className="capNhatProfile" footer={null}>
                            <form onSubmit={formik.handleSubmit}>
                                <div >
                                    <label className="block text-gray-700 text-sm font-bold mb-2" for="username">Tài Khoản {formik.errors.taiKhoan && formik.touched.taiKhoan ? (<span style={{ color: 'red' }}><span className="text-black">:</span> {formik.errors.taiKhoan} </span>) : null}</label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="taiKhoan" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.taiKhoan}></input>
                                </div>
                                <div className="mt-2">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" for="username">Họ Tên {formik.errors.hoTen && formik.touched.hoTen ? (<span style={{ color: 'red' }}><span className="text-black">:</span> {formik.errors.hoTen} </span>) : null}</label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="hoTen" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.hoTen}></input>
                                </div>
                                <div className="mt-2">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" for="username">Email {formik.errors.email && formik.touched.email ? (<span style={{ color: 'red' }}><span className="text-black">:</span> {formik.errors.email} </span>) : null}</label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="email" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}></input>
                                </div>
                                <div className="mt-2">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" for="username">Số ĐT {formik.errors.soDt && formik.touched.soDt ? (<span style={{ color: 'red' }}><span className="text-black">:</span> {formik.errors.soDt} </span>) : null}</label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="soDt" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.soDt}></input>
                                </div>
                                <div className="mt-2">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" for="username">Mật Khẩu {formik.errors.matKhau && formik.touched.matKhau ? (<span style={{ color: 'red' }}><span className="text-black">:</span> {formik.errors.matKhau} </span>) : null}</label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="matKhau" type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.matKhau}></input>
                                </div>

                                <div className="text-right mt-5">
                                    <Button type="primary" htmlType="submit" className="bg-blue-700 hover:bg-blue-900">Cập Nhật</Button>
                                </div>
                            </form>
                        </Modal>

                        <Modal title="Lịch sử Đặt vé" visible={isLichSuDatVeModal} onOk={() => { setIsLichSuDatVeModal(false) }} onCancel={() => { setIsLichSuDatVeModal(false) }} footer={null}>
                            <div className="scroll__bar__custom w-full" style={{ height: '400px', overflow: 'auto' }}>
                                {renderTicketItem()}
                            </div>
                        </Modal>
                        {/* Use https://simpleicons.org/ to find the svg for your preferred product */}
                    </div>
                </div>
                {/*Img Col*/}
                <div className="w-full lg:w-2/5">
                    {/* Big profile image for side bar (desktop) */}
                    <img src="https://images.unsplash.com/photo-1560109947-543149eceb16?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=375&q=80" className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block" alt="..." />
                    {/* Image from: http://unsplash.com/photos/MP0IUfwrn0A */}
                </div>
            </div>

        </div>
    )
}

