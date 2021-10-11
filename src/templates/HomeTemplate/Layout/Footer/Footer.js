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
            <Link to="/">Home</Link>
            <Link to="/">Contact us</Link>
            <Link to="/">Term of services</Link>
            <Link to="/">About us</Link>
          </div>
          <div className="footer__content__menu">
            <Link to="/">Live</Link>
            <Link to="/">FAQ</Link>
            <Link to="/">Premium</Link>
            <Link to="/">Pravacy policy</Link>
          </div>
          <div className="footer__content__menu">
            <Link to="/">You must watch</Link>
            <Link to="/">Recent release</Link>
            <Link to="/">Top IMDB</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
