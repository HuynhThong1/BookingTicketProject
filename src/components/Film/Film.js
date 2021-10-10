import moment from "moment";
import React,  { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Modal, Button } from 'antd';
export default function Film(props) {
  const { film } = props;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal= () => {
    setIsModalVisible(true)
  }
  const handleOk = () => {
    setIsModalVisible(false);
};

const handleCancel = () => {
    setIsModalVisible(false);
};
const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window
  return { width, height }
}

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

  useEffect(() => {
     const handleResize = () => setWindowDimensions(getWindowDimensions())

     window.addEventListener('resize', handleResize)

     return () => window.removeEventListener('resize', handleResize)

   }, [])

   return windowDimensions
}
const { width } = useWindowDimensions();

  return (
    <div className="movie-card">
      <div className="movie-header film-image" style={{ background: `url(${film.hinhAnh}), url('https://ss-images.saostar.vn/wp700/2019/09/09/6006388/ednccmou8aeqxdk.jpg')` }}>
        <div className="header-icon-container">
          <div onClick={()=>showModal()}>
            <i className="fas fa-play header-icon"></i>
          </div>
        </div>
      </div>
      {/*movie-header*/}
      <div className="movie-content">
        <div className="movie-content-header">
          <NavLink to={`/detail/${film.maPhim}`}>
            <h3 className="movie-title h-10">{film.tenPhim.length > 30 ? film.tenPhim.slice(0, 30) + '...' : film.tenPhim}</h3>
          </NavLink>
          {/* <div className="imax-logo" /> */}
        </div>
        <div className="movie-info">
          <div className="info-section">
            <label>Ngày &amp; Giờ</label>
            <span>{moment(film.ngayKhoiChieu).format('MMM Do, h:mm a')}</span>
          </div>
          {/*row*/}
          <div className="info-section">
            <label>Đánh giá</label>
            <span>{film.danhGia}/10</span>
          </div>
          {/*seat*/}
        </div>
      </div>
      <Modal visible={isModalVisible}    centered
          style={{ width: (width / 100) }} footer onOk={handleOk} onCancel={handleCancel}>
                <iframe style={{ width: '100%'}} height="400px" src={film.trailer}></iframe>
      </Modal>

    </div>
  );
}
