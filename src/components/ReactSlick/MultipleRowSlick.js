import React, { useState } from "react";
import Slider from "react-slick";
import styleSlick from "./MultipleRowSlick.module.scss";
import Film from "../Film/Film";
import { SET_PHIM_DANG_CHIEU, SET_PHIM_SAP_CHIEU } from "../../redux/actions/types/QuanLyPhimType";
import { useDispatch } from "react-redux";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    ></div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block", left: "-50px" }}
      onClick={onClick}
    ></div>
  );
}

const MultipleRowSlick = (props) => {

  // const {dangChieu, sapChieu} = useSelector(state => state.QuanLyPhimReducer);

  // let activeClassDC = dangChieu === true ? 'active_Film' : 'none_active_Film';
  // let activeClassSC = sapChieu === true ? 'none_active_Film' : 'active_Film'; 


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

  // const settings = {
  //   className: "center variable-width",
  //   centerMode: true,
  //   infinite: true,
  //   centerPadding: "20px",
  //   slidesToShow: 4,
  //   speed: 500,
  //   rows: 1,
  //   slidesPerRow: 2,
  //   variableWidth: true,
  //   nextArrow: <SampleNextArrow />,
  //   prevArrow: <SamplePrevArrow />,
  // };

  var settings = {
    className: "center variable-width",
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 2,
          centerPadding: "20px",
          slidesToScroll: 2,
          infinite: true,
          dots: true
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
          className={phimDangChieu ? `bg-gray-800 text-white px-4 py-3 font-semibold border border-gray-800 rounded dark:border-coolGray-100 dark:text-coolGray-100 lg:px-8` : `bg-white text-gray-800 px-4 py-3 lg:px-8 font-semibold border border-gray-800 rounded dark:border-coolGray-100 dark:text-coolGray-100`}
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
          className={!phimSapChieu ? `bg-white text-gray-800 px-4 py-3 lg:px-8 font-semibold border border-gray-800 rounded dark:border-coolGray-100 dark:text-coolGray-100` : `bg-gray-800 text-white ml-10 px-4 py-3 lg:px-8 font-semibold border border-gray-800 rounded dark:border-coolGray-100 dark:text-coolGray-100`}
          onClick={() => {
            const action = { type: SET_PHIM_SAP_CHIEU }
            dispatch(action);
            setPhimSapChieu(true);
            setPhimDangChieu(false);
          }}>
          SẮP CHIẾU
        </button>
      </div>
      <Slider {...settings}>{renderFilms()}</Slider>
    </div>
  );
};

export default MultipleRowSlick;
