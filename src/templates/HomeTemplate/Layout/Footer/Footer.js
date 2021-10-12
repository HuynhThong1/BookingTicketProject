import React from "react";
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { Link } from "react-router-dom";
import bg from '../../../../assets/footer-bg.jpg';
import './Footer.scss'


export default function Footer(props) {

  const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducer);

  const arrHeThongRap = _.map(heThongRapChieu, (heThongRap) => {
    return _.pick(heThongRap, ['maHeThongRap', 'tenHeThongRap', 'logo']);
  })

  return (

    <div className="footer" style={{ backgroundImage: `url(${bg})` }}>
      <div className="footer__content " style={{ margin: 'auto' }}>
        <div className="footer__content__logo">
          <div className="logo">
            <img src="https://i.imgur.com/lC22izJ.png" alt="" />
            <Link to="/">Cybersoft</Link>
          </div>
        </div>
        <div className="footer__content__menus">
          <div className="footer__content__menu">
            <Link to="/">Trang Chủ</Link>
            <Link to="/">Liên Hệ</Link>
            <Link to="/">Dịch Vụ</Link>
            <Link to="/">Thông Tin</Link>
          </div>
          <div className="footer__content__menu">
            <Link to="/">Thỏa Thuận Sử Dụng</Link>
            <Link to="/">Quy Chế Hoạt Động</Link>
            <Link to="/">Quyền Lợi Thành Viên</Link>
            <Link to="/">Chính Sách Bảo Mật</Link>
          </div>
          <div className="footer__content__menu">
            <Link to="/">FAQ</Link>
            <Link to="/">Brand Guidelines</Link>
            <Link to="/">Top IMDB</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
