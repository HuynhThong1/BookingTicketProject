import React, { useEffect } from "react";
import HomeMenu from "./HomeMenu/HomeMenu";

import { useSelector, useDispatch } from "react-redux";
import MultipleRowSlick from "../../components/ReactSlick/MultipleRowSlick";
import { layDanhSachPhimAction } from "../../redux/actions/QuanLyPhimAction";
import { layDanhSachRapAction } from "../../redux/actions/QuanLyRapAction";
import HomeCarousel from "../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel";

export default function Home(props) {

  const { arrFilm } = useSelector((state) => state.QuanLyPhimReducer);

  const { heThongRapChieu } = useSelector((state) => state.QuanLyRapReducer);

  // console.log('Home Props', arrFilm)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(layDanhSachPhimAction());
    dispatch(layDanhSachRapAction())

  }, [dispatch])

  return (

    <div>
      <HomeCarousel />

      <div className="container mx-auto">
        <section id="phim" className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <MultipleRowSlick arrFilm={arrFilm} />

          </div>
        </section>

        <div id="cumrap">
          <HomeMenu heThongRapChieu={heThongRapChieu} />
        </div>
      </div>
    </div>
  );
}
