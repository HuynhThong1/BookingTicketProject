import React, { useState } from "react";
import Slider from "react-slick";
import styleSlick from "./MultipleRowSlick.module.scss";
import Film from "../Film/Film";
import { SET_PHIM_DANG_CHIEU, SET_PHIM_SAP_CHIEU } from "../../redux/actions/types/QuanLyPhimType";
import { useDispatch } from "react-redux";
import {  LeftOutlined, RightOutlined  } from '@ant-design/icons';

import './MultipleRowSlick.scss';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
        className="slick-arrow ArrowCustom"
        style={{...style, right: -60}}
        onClick={onClick}
    >
        <RightOutlined className={'ArrowRight'} style={{fontSize:'4rem'}}/>
    </div>
);
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
        className="slick-arrow ArrowCustom"
        style={{...style,left: -65}}
        onClick={onClick}
    >
        <LeftOutlined  className={'ArrowLeft'} style={{fontSize:'4rem'}}/>
    </div>
);
}

const MultipleRowSlick = (props) => {

  const [phimDangChieu, setPhimDangChieu] = useState(true);
  const [phimSapChieu, setPhimSapChieu] = useState(false);


  const dispatch = useDispatch();

  const renderFilms = () => {
    return props.arrFilm.slice(0, 12).map((item, index) => {
      return (
        <div className={`${styleSlick["width-item"]}`} key={index}>
          <Film film={item} />
        </div>
      );
    });
  };

  var settings = {
    className: "center variable-width",
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    rows: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 2,
          centerPadding: "1px",
          slidesToScroll: 2,
          infinite: true,
          dots: true,
          rows: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          centerPadding: "20px",
          slidesToShow: 2,
          slidesToScroll: 2,
          nextArrow: false,
          prevArrow: false,
          rows: 2,
        }
      },
      {
        breakpoint: 450,
        settings: {
          centerPadding: "20px",
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
          nextArrow: false,
          prevArrow: false,
          rows: 1,
        }
      },
    ]
  };
  return (
    <div>
      <div className="flex justify-center mb-10">
        <button
          type="button"
          style={{ marginRight: 30 }}
          className={`tab_anim ${phimDangChieu ? `active_class` : `non_active_class`}`}
          onClick={() => {
            const action = { type: SET_PHIM_DANG_CHIEU }
            dispatch(action);
            setPhimDangChieu(true);
            setPhimSapChieu(false);
          }}>
          ĐANG CHIẾU
        </button>
        <button
          type="button"
          className={`tab_anim ${!phimSapChieu ? `non_active_class` : `active_class`}`}
          onClick={() => {
            const action = { type: SET_PHIM_SAP_CHIEU }
            dispatch(action);
            setPhimSapChieu(true);
            setPhimDangChieu(false);
          }}>
          SẮP CHIẾU
        </button>
      </div>
      <Slider {...settings} >{renderFilms()}</Slider>
    </div>
  );
};

export default MultipleRowSlick;
