import React, { Fragment, useState } from "react";
import { NavLink } from 'react-router-dom';
import { Tabs } from "antd";
import moment from "moment";

const { TabPane } = Tabs;

export default function HomeMenu(props) {
  const { heThongRapChieu } = props;

  const [state] = useState({
    tabPosition: "left",
  });
  

  const { tabPosition } = state;

  const renderHeThongRap = () => {
    return heThongRapChieu?.map((heThongRap, index) => {
      return (
        <TabPane tab={<img src={heThongRap.logo} className="rounded-full h-10" alt="logo" onError={(e)=>{e.target.onerror = null; e.target.src="https://s3img.vcdn.vn/123phim/2018/09/f32670fd0eb083c9c4c804f0f3a252ed.png"}}/>}  key={index}>
          <Tabs tabPosition={tabPosition} className="tab-scroll-bar">
            {heThongRap.lstCumRap?.map((cumRap, index) => {
              return <TabPane tab={
                <div style={{width: '320px', display: 'flex' }}>
                  <img className="w-14 h-16 rounded-md" src={cumRap.hinhAnh} alt="..." onError={(e)=>{e.target.onerror = null; e.target.src="https://s3img.vcdn.vn/123phim/2021/01/bhd-star-bitexco-16105952137769.png"}} />
                  <div className="text-left ml-2">
                    <h1>{cumRap.tenCumRap}</h1>
                    <p className="text-black opacity-70 text-xs mb-0">{cumRap.diaChi.length > 20 ? cumRap.diaChi.slice(0,40) + '...' : cumRap.diaChi}</p>
                    <p className="text-red-400">[detail]</p>
                  </div>
                </div>


              } className="tab-scroll-bar pr-5" key={index}>
                {/* Load film */}

                {cumRap.danhSachPhim.map((phim, index) => {
                  return <Fragment key={index}>
                    <div className="my-2">
                      <div className="flex">
                        <img className="w-16 h-16 rounded-md" src={phim.hinhAnh} alt={phim.tenPhim} onError={(e)=>{e.target.onerror = null; e.target.src="https://ss-images.saostar.vn/w800/2019/09/23/6102433/untitled-1.jpg"}}/>
                        <div className="ml-5 pl-5">
                          <h1 className="text-xl mb-2">{phim.tenPhim}</h1>
                          <p className="text-xs">120 phút - 8.0 IMDb - 2D/Digital</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-6 gap-4 mt-5">
                            {phim.lstLichChieuTheoPhim?.slice(0, 10).map((lichChieu, index) => {
                              return <NavLink className="w-20 px-2 py-3 bg-white text-center hover:bg-gray-100 text-gray-800 font-semibold border border-gray-400 rounded shadow hover:text-black" to={`/checkout/${lichChieu.maLichChieu}`} key={index}>
                                {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                              </NavLink>
                            })}
                      </div>

                    </div>
                    <hr />
                  </Fragment>
                })}
              </TabPane>
            })}
          </Tabs>

        </TabPane>
      );
    });
  };

  return (
    <>
      <Tabs tabPosition={tabPosition}>{renderHeThongRap()};</Tabs>
    </>
  );
}
