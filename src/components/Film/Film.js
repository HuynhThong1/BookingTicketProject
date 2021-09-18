import React from "react";
import { NavLink } from "react-router-dom";

export default function Film(props) {
  const { film } = props;

  return (
    <div className="movie-card">
      <div className="movie-header film-image" style={{background: `url(${film.hinhAnh}), url('https://ss-images.saostar.vn/wp700/2019/09/09/6006388/ednccmou8aeqxdk.jpg')`}}>
        <div className="header-icon-container">
          <a href="#test">
            <i className="fas fa-play header-icon"></i>
          </a>
        </div>
      </div>
      {/*movie-header*/}
      <div className="movie-content">
        <div className="movie-content-header">
          <NavLink to={`/detail/${film.maPhim}`}>
            <h3 className="movie-title h-20">{film.tenPhim.length > 15 ? film.tenPhim.slice(0, 15) + '...' : film.tenPhim}</h3>
          </NavLink>
          {/* <div className="imax-logo" /> */}
        </div>
        <div className="movie-info">
          <div className="info-section">
            <label>Date &amp; Time</label>
            <span>Tue 4 July - 05:00PM</span>
          </div>
          {/*date,time*/}
          <div className="info-section">
            <label>Screen</label>
            <span>01</span>
          </div>
          {/*screen*/}
          <div className="info-section">
            <label>Row</label>
            <span>H</span>
          </div>
          {/*row*/}
          <div className="info-section">
            <label>Seat</label>
            <span>15</span>
          </div>
          {/*seat*/}
        </div>
      </div>
    </div>
  );
}
