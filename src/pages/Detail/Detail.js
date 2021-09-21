import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { CustomCard } from '@tsamantanis/react-glassmorphism'
import '@tsamantanis/react-glassmorphism/dist/index.css'
import moment from 'moment';
import { Rate } from 'antd';

import { Tabs, } from 'antd';
import { layThongTinChiTietPhim } from '../../redux/actions/QuanLyRapAction';
import { NavLink } from 'react-router-dom';
import './Detail.scss';

const { TabPane } = Tabs;

export default function Detail(props) {


    const filmDetail = useSelector(state => state.QuanLyRapReducer.filmDetail);

    console.log({ filmDetail })

    const dispatch = useDispatch();

    let { id } = props.match.params;

    useEffect(() => {

        //Lấy Thông tin từ đường dẫn


        dispatch(layThongTinChiTietPhim(id));


    }, [filmDetail, dispatch, id])


    return (
        <div style={{ backgroundImage: `url(${filmDetail.hinhAnh})`, backgroundRepeat: 'no-repeat', backgroundSize: '100%', backgroundPosition: 'center', minHeight: '100vh' }}>
            <CustomCard
                style={{ paddingTop: '150px', minHeight: '100vh', borderRadius: '0' }}
                effectColor="#0a2029" // required
                color="#14AEFF" // default color is white
                blur={15} // default blur value is 10px
                borderRadius={0} // default border radius value is 10px
            >
                <div className="grid grid-cols-12">
                    <div className="col-span-5 col-start-3">
                        <div className="grid grid-cols-3">
                            <img src={filmDetail.hinhAnh} alt={filmDetail.tenPhim} className="col-span-1" />

                            <div className="col-span-2 flex flex-col justify-center ml-10">
                                <p className="text-white">Ngày Chiếu: {moment(filmDetail.ngayKhoiChieu).format('dd-mm-yyyy')}</p>
                                <p className="text-4xl text-white">{filmDetail.tenPhim}</p>
                                <p className="text-white">{filmDetail.moTa}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 col-end-12 flex flex-col justify-center items-center">
                        <div className={`c100 p${filmDetail.danhGia * 10} big`}>
                            <span classNam="text-white">{filmDetail.danhGia * 10}%</span>
                            <div className="slice">
                                <div className="bar " />
                                <div className="fill " />
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="star-icon">
                                {/* <Rate style={{ color: '#ffe066 !important' }} allowHalf defaultValue={filmDetail.danhGia / 2} /> */}
                            
                                <Rate disabled allowHalf defaultValue={filmDetail.danhGia/2} />
                            </div>
                            <h3 className="text-xl text-red-500">{filmDetail.danhGia}/10 Đánh giá</h3>
                        </div>

                    </div>
                </div>

                <div className="mt-10 w-2/3 bg-white p-5 container" style={{ marginLeft: 245 }}>
                    <Tabs defaultActiveKey="1" centered>
                        <TabPane tab="Lịch Chiếu" key="1" style={{ minHeight: 500 }}>
                            <div>
                                <Tabs tabPosition={'left'}>

                                    {filmDetail.heThongRapChieu?.map((heThongRap, index) => {
                                        return <TabPane tab={<div className="flex items-center">
                                            <img src={heThongRap.logo} width={50} className="rounded-full" alt={heThongRap.tenHeThongRap} />
                                            <h3 className="ml-5">{heThongRap.tenHeThongRap}</h3>
                                        </div>}
                                            key={index}>
                                            <div className="tab-scroll-bar">
                                                {heThongRap.cumRapChieu?.map((cumRap, index) => {
                                                    return <div className="mt-10" key={index}>
                                                        <div className="flex">
                                                            <img className="rounded-md" src={cumRap.hinhAnh} alt={cumRap.tenCumRap} style={{ width: 50, height: 50 }} />

                                                            <div className="ml-2">
                                                                <p className="text-xl mb-2">{cumRap.tenCumRap}</p>
                                                                <p className="text-xs opacity-80">{cumRap.diaChi}</p>
                                                            </div>
                                                        </div>
                                                        <div className="thong-tin-lich-chieu grid grid-cols-6">
                                                            {cumRap.lichChieuPhim?.map((lichChieu, index) => {
                                                                return <NavLink className="col-span-1 mt-5 w-20 px-2 py-3 bg-white text-center hover:bg-gray-100 text-gray-800 font-semibold border border-gray-400 rounded shadow hover:text-black" to={`/checkout/${lichChieu.maLichChieu}`} key={index}>
                                                                    {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                                                </NavLink>
                                                            })}
                                                        </div>
                                                    </div>
                                                })}
                                            </div>
                                        </TabPane>
                                    })}
                                </Tabs>
                            </div>
                        </TabPane>
                        <TabPane tab="Thông tin" key="2" style={{ minHeight: 500 }}>
                            Thong Tin
                        </TabPane>
                        <TabPane tab="Đánh giá" key="3" style={{ minHeight: 500 }}>
                            Đánh giá
                        </TabPane>
                    </Tabs>
                </div>
            </CustomCard>




        </div>
    )
}
