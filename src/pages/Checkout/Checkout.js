import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { datGheAction, datVeAction, layChiTietPhongVeAction } from '../../redux/actions/QuanLyDatVeAction';
import style from './Checkout.module.scss';
import './Checkout.scss';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons'
import { CHANGE_TAB_ACTIVE, DAT_GHE } from '../../redux/actions/types/QuanLyDatVeType';
import _ from 'lodash';
import { ThongTinDatVe } from '../../_core/models/ThongTinDatVe';
import { Tabs } from 'antd';
import { layThongTinTaiKhoanAction } from '../../redux/actions/QuanLyNguoiDungAction';
import moment from 'moment';
import { connection } from '../..';
import { history } from '../../App';
import styled from 'styled-components'
import { ACCESS_TOKEN, USER_LOGIN } from '../../Util/setting';
import { NavLink } from 'react-router-dom';

const { TabPane } = Tabs;


function Checkout(props) {


    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

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
                }} key={index} style={{ fontSize: 11 }}>

                    {ghe.daDat ? classGheDaDuocDat !== '' ? <CheckOutlined style={{ fontWeight: 'bold' }} /> : <CloseOutlined style={{ fontWeight: 'bold' }} /> : classGheKhachDat !== '' ? ghe.stt : ghe.stt}
                    {/* {classGheDangDat !== '' ? ghe.stt : ''} */}

                </button>

                {(index + 1) % 16 === 0 ? <br /> : ''}
            </Fragment>
        })
    }

    return (
        <div className="min-h-screen">
            <div className="grid grid-cols-12">
                <div className="col-span-9">
                    <div className="flex flex-col items-center mt-5">
                        <div className="bg-black" style={{ width: '80%', height: '15px' }}>

                        </div>
                        <div className={`${style['trapezoid']} text-center`}>
                            <h3 className="mt-3">Màn Hình</h3>
                        </div>
                        <div className="mt-8">
                            {renderGhe()}
                        </div>
                    </div>

                    <div className="mt-5 flex justify-center">
                        <table className="divide-y divide-gray-200 w-2/3 text-center" >
                            <thead className="bg-gray-50 p-5">
                                <tr>
                                    <th>Ghế chưa đặt</th>
                                    <th>Ghế đang đặt</th>
                                    <th>Ghế đã được đặt</th>
                                    <th>Ghế vip</th>
                                    <th>Ghế bạn đã đặt</th>
                                    <th>Ghế người khác đang đặt</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td><button className="ghe text-center"></button></td>
                                    <td><button className="ghe gheDangDat text-center"></button></td>
                                    <td><button className="ghe gheDaDat text-center"><CloseOutlined style={{ paddingBottom: 7, fontWeight: 'bold' }} /></button></td>
                                    <td><button className="ghe gheVip text-center"></button></td>
                                    <td><button className="ghe gheDaDuocDat text-center"><CheckOutlined style={{ paddingBottom: 7, fontWeight: 'bold' }} /></button></td>
                                    <td><button className="ghe gheKhachDat text-center"></button></td>
                                </tr>
                            </tbody>
                        </table>

                    </div>

                </div>
                <div className="col-span-3 relative min-h-screen pt-5">
                    <h3 className="text-green-400 text-center text-4xl">{danhSachGheDangDat.reduce((tongTien, gheDangDat, index) => {
                        return tongTien += gheDangDat.giaVe;
                    }, 0).toLocaleString()}đ</h3>

                    <hr />

                    <h3 className="text-xl tenPhim">{thongTinPhim.tenPhim}</h3>
                    <p>Địa điểm: {thongTinPhim.tenCumRap} - {thongTinPhim.tenRap}</p>
                    <p>Ngày Chiếu: {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}</p>

                    <hr />
                    {/* <div className="flex justify-between my-5 px-1">
                        <div>
                            <span className="text-red-400 text-lg">Ghế</span>
                        </div>
                        <div>
                            <span className="text-green-400 text-lg">0 đ</span>
                        </div>
                    </div> */}

                    <div className="scroll__bar__custom" style={{ overflow: 'auto', height: 300, }}>
                        <table className="table-fixed w-full text-left">
                            <thead>
                                <tr className="" style={{ fontSize: 20 }}>
                                    <th className="w-1/3 text-red-400 text-lg">Số ghế</th>
                                    <th className="w-1/3 text-red-400 text-lg">Loại ghế</th>
                                    <th className="w-1/2 text-green-400 text-lg">{danhSachGheDangDat.reduce((tongTien, gheDangDat, index) => {
                                        return tongTien += gheDangDat.giaVe
                                    }, 0).toLocaleString()}đ</th>
                                </tr>
                            </thead>
                            <tbody className="">
                                {_.sortBy(danhSachGheDangDat, ['maGhe', 'loaiGhe']).map((gheDangDat, index) => {
                                    return <tr key={index}>
                                        <td className="text-md">{gheDangDat.tenGhe}</td>
                                        <td className="text-md">{gheDangDat.loaiGhe}</td>
                                        <td className="text-md">{gheDangDat.giaVe.toLocaleString()}đ</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>

                    <hr />

                    <div className="my-5">
                        <i>Email</i> <br />
                        {userLogin.email}
                    </div>
                    <div className="my-5">
                        <i>Số Điện Thoại</i> <br />
                        {userLogin.soDT}
                    </div>

                    <hr />

                    <div className="mb-0 absolute left-0 right-0 bottom-0">
                        <div className="py-4 bg-green-400 w-full text-center text-2xl text-white cursor-pointer rounded-sm" onClick={() => {
                            const thongTinDatVe = new ThongTinDatVe();
                            thongTinDatVe.maLichChieu = props.match.params.id;
                            thongTinDatVe.danhSachVe = danhSachGheDangDat;

                            console.log(thongTinDatVe);
                            dispatch(datVeAction(thongTinDatVe))
                        }}>Đặt Vé</div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default function CheckoutTab(props) {

    const dispatch = useDispatch();

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);


    useEffect(() => {
        return () => {
            dispatch({ type: CHANGE_TAB_ACTIVE, number: '1' })
        }
    }, [])

    const operations = <Fragment>
        {!_.isEmpty(userLogin) ? <Fragment>
            <button onClick={() => {
                history.push(`/profile`);
            }}><UserProfile className="ml-5 rounded-full bg-red-200">{userLogin.taiKhoan.substr(0, 1)}</UserProfile>  Hello {userLogin.taiKhoan}</button>
            <button onClick={() => {
                localStorage.removeItem(USER_LOGIN);
                localStorage.removeItem(ACCESS_TOKEN);
                history.push('/');
                window.location.reload();
            }} className="text-blue-800">Đăng xuất</button>
        </Fragment> : ''}
    </Fragment>;



    const { tabActive } = useSelector(state => state.QuanLyDatVeReducer);
    console.log('tabActive', tabActive)


    return <div className="p-5">
        <Tabs tabBarExtraContent={operations} defaultActiveKey="1" activeKey={tabActive} onChange={(key) => {
            dispatch({ type: CHANGE_TAB_ACTIVE, number: key })
        }}>
            <TabPane tab="01 CHỌN GHẾ & THANH TOÁN" key="1" >
                <Checkout {...props} />
            </TabPane>
            <TabPane tab="KẾT QUẢ ĐẶT VÉ" key="2">
                <KetQuaDatVe {...props} />
            </TabPane>
            <TabPane style={{}} tab={<NavLink to="/" className="text-black">TRANG CHỦ</NavLink>} key="3" >
                <KetQuaDatVe {...props} />
            </TabPane>
        </Tabs>
    </div>
};



function KetQuaDatVe(props) {


    const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);



    const dispatch = useDispatch();

    useEffect(() => {
        const action = layThongTinTaiKhoanAction();
        dispatch(action)
    }, [dispatch])

    console.log('thongTinNguoiDung', thongTinNguoiDung);


    const renderTicketItem = () => {
        return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {

            const danhSachGhe = _.first(ticket.danhSachGhe);
            return <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                    <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={ticket.hinhAnh} />
                    <div className="flex-grow">
                        <h2 className="text-gray-900 title-font font-medium">{ticket.tenPhim}</h2>
                        <p className="text-gray-500">{moment(ticket.ngayDat).format('hh:mm A')} - Ngày Chiếu {moment(ticket.ngayDat).format('DD-MM-YYYY')} </p>
                        <p className="text-gray-500">Thời Lượng: {ticket.thoiLuongPhim} phút</p>
                        <p className="text-gray-500">Địa điểm: {danhSachGhe.tenHeThongRap}</p>
                        <p className="text-gray-500">Tên Rạp: {danhSachGhe.tenCumRap} - Ghế {ticket.danhSachGhe.map((ghe, index) => {
                            return <span key={index}> {ghe.tenGhe} </span>
                        })}</p>
                    </div>
                </div>
            </div>
        }).reverse()
    }

    return <div className="p-5">
        <section className="text-gray-600 body-font">
            <div className="container px-5 mx-auto">
                <div className="flex flex-col text-center w-full mb-10">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-purple-600">Lịch Sử Đặt Vé </h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Hãy xem thông tin và thời gian để xem phim vui vẻ bạn nhé.</p>
                </div>
                <div className="flex flex-wrap m-2">
                    {renderTicketItem()}
                </div>
            </div>
        </section>

    </div>
}




const UserProfile = styled.div`
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
`
