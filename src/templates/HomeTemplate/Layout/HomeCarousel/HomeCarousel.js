import React, { useEffect } from "react";
import { Carousel } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { layCarouselAction } from "../../../../redux/actions/CarouselAction";

import './HomeCarousel.scss';

const contentStyle = {
  height: "600px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

export default function HomeCarousel(props) {
  const { arrImg } = useSelector((state) => state.CarouselReducer);

  const dispatch = useDispatch();
  //Active when component loaded

  useEffect(() => {

    dispatch(layCarouselAction())

  }, [dispatch]);

  const renderImg = () => {
    return arrImg.map((item, index) => {
      return (
        <div key={index}>
          <div
            style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})` }}
          >
            <img className="opacity-0" src={item.hinhAnh} alt="1" />
          </div>
        </div>
      );
    });
  };


  return <Carousel style={{ width: '100%', padding: 0, margin: 0 }}>
    {renderImg()}
  </Carousel>;
}
