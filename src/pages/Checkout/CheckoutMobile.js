import React, { Fragment, useEffect, useState } from 'react'
import styled from 'styled-components'
import style from './Checkout.module.scss';
import './Checkout.scss'
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { connection } from '../..';
import { datGheAction, datVeAction, layChiTietPhongVeAction } from '../../redux/actions/QuanLyDatVeAction';
import { DAT_GHE } from '../../redux/actions/types/QuanLyDatVeType';
import _ from 'lodash';
import { ThongTinDatVe } from '../../_core/models/ThongTinDatVe';
import { history } from '../../App';
import { Modal, Button } from 'antd';
import { layThongTinTaiKhoanAction } from '../../redux/actions/QuanLyNguoiDungAction';
import moment from 'moment';

export default function CheckoutMobile(props) {

    //modal antd
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    const { userLogin, thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);

    const { chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachDat } = useSelector(state => state.QuanLyDatVeReducer);


    const dispatch = useDispatch();

    useEffect(() => {



        //gọi hàm tạo ra 1 async function
        const action = layChiTietPhongVeAction(props.match.params.id)
        dispatch(action);

        //Có 1 client nào thực hiện việc đặt vé thành công mình sẽ load lại danh sách phòng vé của lịch chiếu đó
        connection.on('datVeThanhCong', () => {
            dispatch(action)
        });

        //vừa vào trang load tất cả ghế của các người khác đang đặt

        connection.invoke("loadDanhSachGhe", props.match.params.id);

        //Load danh sách ghế đang đặt từ server về
        connection.on("loadDanhSachGheDaDat", (dsGheKhachDat) => {
            console.log('danhSachGheKhachDat', dsGheKhachDat);

            //b1: loại mình ra khỏi danh sách

            dsGheKhachDat = dsGheKhachDat.filter(item => item.taiKhoan !== userLogin.taiKhoan);

            //b2: gộp danh sách ghế khách đặt ở tất cả user thành 1 mảng chung

            let arrGheKhachDat = dsGheKhachDat.reduce((result, item, index) => {
                let arrGhe = JSON.parse(item.danhSachGhe);

                return [...result, ...arrGhe];
            }, [])
            //Đưa dữ liệu ghế khách đặt cập nhật redux
            arrGheKhachDat = _.uniqBy(arrGheKhachDat, 'maGhe');

            //đưa dữ liệu về redux
            dispatch({
                type: DAT_GHE,
                payload: arrGheKhachDat
            })
        })

        //cài đặt sự kiện khi reload trang
        window.addEventListener("beforeunload", clearGhe);


        return () => {
            clearGhe();
            window.removeEventListener("beforeunload", clearGhe);
        }

    }, [])

    const clearGhe = (event) => {

        connection.invoke('huyDat', userLogin.taiKhoan, props.match.params.id)
    }

    console.log({ chiTietPhongVe });

    console.log('danhSachGheDangDat', danhSachGheDangDat)

    const { thongTinPhim, danhSachGhe } = chiTietPhongVe;

    const renderGhe = () => {
        return danhSachGhe.map((ghe, index) => {

            let classGheVip = ghe.loaiGhe === 'Vip' ? 'gheVip' : '';
            let classGheDaDat = ghe.daDat === true ? 'gheDaDat' : '';
            let classGheDangDat = '';

            let indexGheDangDat = danhSachGheDangDat.findIndex(gheDangDat => gheDangDat.maGhe === ghe.maGhe);

            if (indexGheDangDat !== -1) {
                classGheDangDat = 'gheDangDat';
            }

            let classGheDaDuocDat = '';
            if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
                classGheDaDuocDat = 'gheDaDuocDat';
            }

            let classGheKhachDat = '';
            let indexGheKD = danhSachGheKhachDat.findIndex(gheKD => gheKD.maGhe === ghe.maGhe)
            if (indexGheKD !== -1) {
                classGheKhachDat = 'gheKhachDat';
            }

            return <Fragment key={index}>
                <button type="button" className={`ghe ${classGheVip}  ${classGheDaDat} ${classGheDangDat} ${classGheDaDuocDat} ${classGheKhachDat} text-center`} disabled={ghe.daDat || classGheKhachDat !== ''} onClick={() => {
                    dispatch(datGheAction(ghe, props.match.params.id))
                }} key={index} style={{ fontSize: 6.5 }}>

                    {/* {ghe.daDat ? classGheDaDuocDat !== '' ? <CheckOutlined style={{ fontWeight: 'bold' }} /> : <CloseOutlined style={{ fontWeight: 'bold' }} /> : classGheKhachDat !== '' ? ghe.stt : ghe.stt} */}
                    {classGheDangDat !== '' ? ghe.stt : <Fragment><span className="opacity-0">ghe</span></Fragment>}

                </button>

                {(index + 1) % 16 === 0 ? <br /> : ''}
            </Fragment>
        })
    }

    let classBtnDatVe = '';

    if (danhSachGheDangDat.length === 0) {
        classBtnDatVe = 'disabled';
    }


    const renderTicketItem = () => {
        return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {

            const danhSachGhe = _.first(ticket.danhSachGhe);
            return <div className="p-2 w-full" key={index}>
                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                    {/* <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={ticket.hinhAnh} /> */}
                    <div className="flex-grow">
                        <h2 className="text-gray-900 title-font font-medium" style={{ fontSize: '14px' }}>{ticket.tenPhim}</h2>
                        <p className="text-gray-500" style={{ fontSize: '12px' }}>{moment(ticket.ngayDat).format('hh:mm A')} - Ngày Chiếu {moment(ticket.ngayDat).format('DD-MM-YYYY')} </p>
                        <p className="text-gray-500" style={{ fontSize: '12px' }}>Thời Lượng: {ticket.thoiLuongPhim} phút</p>
                        <p className="text-gray-500" style={{ fontSize: '12px' }}>Địa điểm: {danhSachGhe.tenHeThongRap}</p>
                        <p className="text-gray-500" style={{ fontSize: '12px' }}>Tên Rạp: {danhSachGhe.tenCumRap} - Ghế {ticket.danhSachGhe.map((ghe, index) => {
                            return <span key={index}> {ghe.tenGhe} </span>
                        })}</p>
                    </div>
                </div>
            </div>
        }).reverse();
    }


    return (
        <div className="">
            {/* Checkout header */}
            <div className="checkout-header">
                <div className="left">
                    <div className="backButton">
                        <CloseOutlined className="text-2xl" onClick={() => {
                            history.push(`/detail/${props.match.params.id}`)
                        }} />
                    </div>
                </div>
                <div className="center">
                    <span className="steptitle">Chọn Ghế</span>
                </div>
                <div className="right">
                    <div className="account">
                        <UserProfile className="ml-5 rounded-full bg-blue-100" onClick={() => {
                            history.push('/profile')
                        }}>{userLogin.taiKhoan.substr(0, 1)}</UserProfile>
                    </div>
                </div>
            </div>
            {/* Checkout body */}

            <div className="seatCheckout">
                <div className="">
                    <div className="top-content flex justify-between w-full">
                        <div className="left-title flex items-center">
                            {/* <div className="logo-cinema">
                                <img className="logo" src="https://s3img.vcdn.vn/123phim/2018/09/f32670fd0eb083c9c4c804f0f3a252ed.png" alt="logo-cinema" />
                            </div> */}
                            <div className="content-cinema">
                                <p className="address">
                                    <span className="p-cinema">{thongTinPhim.tenPhim}</span>
                                </p>
                                <p className="address">
                                    <span className="p-cinema">{thongTinPhim.tenCumRap}</span>
                                    <span className="cinema-name"></span>
                                </p>
                                <p className="hour">
                                    {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu} -
                                    {thongTinPhim.tenRap}
                                </p>
                            </div>
                        </div>
                        <div className="right-title">
                            <p>Tài Khoản: {userLogin.taiKhoan.length > 15 ? userLogin.taiKhoan.slice(0, 15) + '...' : userLogin.taiKhoan}</p>
                            <p>Số ĐT: {userLogin.soDT}</p>
                        </div>
                    </div>
                    <div className="seat-map">
                        <div className="panzoom">
                            <div className="screen flex flex-col items-center mb-3">
                                {/* <img src="../../assets/screen.png" alt="screen" style={{ width: '90%' }} />
                                 */}
                                <div className="bg-black" style={{ width: '80%', height: '7px' }}>

                                </div>
                                <div className={`${style['trapezoid-mobile']} text-center`}>
                                    <h3 className="text-xs">Màn Hình</h3>
                                </div>
                            </div>

                            <div className="list-seat">
                                {renderGhe()}
                            </div>

                            <div className="type-seats mt-10 flex flex-col justify-center px-10 text-center">

                                <div className="flex flex-row justify-center">
                                    <div>
                                        <p>Ghế Chưa Đặt</p>
                                        <span><button className="ghe text-center"></button></span>
                                    </div>
                                    <div>
                                        <p>Ghế đang đặt</p>
                                        <span><button className="ghe gheDangDat text-center"></button></span>
                                    </div>
                                    <div>
                                        <p>Ghế đã được đặt</p>
                                        <span><button className="ghe gheDaDat text-center"></button></span>
                                    </div>
                                    <div>
                                        <p>Ghế vip</p>
                                        <span><button className="ghe gheVip text-center"></button></span>
                                    </div>
                                </div>

                                <div className="mt-5 ml-7 flex flex-row justify-center">
                                    <div>
                                        <p>Ghế bạn đã đặt</p>
                                        <span><button className="ghe gheDaDuocDat text-center"></button></span>
                                    </div>
                                    <div>
                                        <p>Ghế người khác đang đặt</p>
                                        <span><button className="ghe gheKhachDat text-center"></button></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 checkout-footer">
                <div className="total">
                    <p className="seat-chosen">
                        {_.sortBy(danhSachGheDangDat, ['maGhe']).map((gheDangDat, index) => (
                            <span key={index}>{gheDangDat.tenGhe} - </span>
                        ))}
                        {
                            danhSachGheDangDat.reduce((tongTien, gheDangDat, index) => {
                                return tongTien += gheDangDat.giaVe
                            }, 0).toLocaleString()
                        }đ</p>
                </div>
                <div className={`${classBtnDatVe} continue-button flex items-center justify-center`} onClick={async () => {
                    const thongTinDatVe = new ThongTinDatVe();
                    thongTinDatVe.maLichChieu = props.match.params.id;
                    thongTinDatVe.danhSachVe = danhSachGheDangDat;

                    console.log(thongTinDatVe);
                    await dispatch(datVeAction(thongTinDatVe))
                    await dispatch(layThongTinTaiKhoanAction());

                    showModal();

                }}>
                    Đặt Vé
                </div>

                <Modal title="Lịch Sử Đặt Vé" visible={isModalVisible} footer={null} onOk={handleOk} onCancel={handleCancel}>
                    <div className="scroll__bar__custom w-full" style={{ height: '400px', overflow: 'auto' }}>
                        {renderTicketItem()}
                    </div>
                </Modal>
            </div>
        </div>
    )
}


const UserProfile = styled.div`
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
`