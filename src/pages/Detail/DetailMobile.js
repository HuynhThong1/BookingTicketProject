import { CustomCard } from '@tsamantanis/react-glassmorphism';
import { Rate } from 'antd';
import moment from 'moment';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { history } from '../../App';
import { layThongTinChiTietPhim } from '../../redux/actions/QuanLyRapAction';
import './DetailMobile.scss'

export default function DetailMobile(props) {

    const filmDetail = useSelector(state => state.QuanLyRapReducer.filmDetail);

    console.log({ filmDetail })

    const dispatch = useDispatch();

    let { id } = props.match.params;
    const clickMovie = () => {
        Swal.fire({
            icon: 'warning',
            text: 'Bạn chưa đăng nhập! Hãy đăng nhập để tiếp tục',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đồng Ý!'
        }).then((result) => {
            if (result.isConfirmed) {
                history.push('/login');
            }
        })
    }
    useEffect(() => {

        //Lấy Thông tin từ đường dẫn


        dispatch(layThongTinChiTietPhim(id));


    }, [])


    return (
        <div style={{ backgroundColor: "rgb(10, 32, 41)" }} className="h-screen">
            <div className="relative" style={{ backgroundImage: `url(${filmDetail.hinhAnh})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'top', minHeight: '270px' }}>
                <a href={filmDetail.trailer} target="_blank" rel="noreferrer" className="absolute btnPlayTrailer">
                    <img src="https://tix.vn/app/assets/img/icons/play-video.png" alt="play-trailer-button" />
                </a>
            </div>

            <div className="movie-info text-white pl-5 pr-5">
                <p className="opacity-60">{moment(filmDetail.ngayKhoiChieu).format('dd-mm-yyyy')}</p>
                <p className="text-xl text-white">{filmDetail.tenPhim}</p>
                <p className="text-white text-xs opacity-80">{filmDetail.moTa.length > 200 ? filmDetail.moTa.slice(0, 200) + '...' : filmDetail.moTa}</p>

                <div className="star-icon flex justify-between">

                    <Rate disabled allowHalf defaultValue={filmDetail.danhGia / 2} />
                    <h3 className="text-sm text-red-500 mt-2 inline-block">{filmDetail.danhGia}/10 Đánh giá</h3>
                </div>
            </div>

            {/* put film schedule code below this line */}

        </div>
    )
}
