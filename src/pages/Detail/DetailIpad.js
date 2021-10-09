import { CustomCard } from '@tsamantanis/react-glassmorphism';
import { Rate } from 'antd';
import moment from 'moment';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { history } from '../../App';
import { layThongTinChiTietPhim } from '../../redux/actions/QuanLyRapAction';
import './DetailIpad.scss'

export default function DetailIpad(props) {

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
        <div style={{ backgroundImage: `url(${filmDetail.hinhAnh})`, backgroundRepeat: 'no-repeat', backgroundSize: '100%', backgroundPosition: 'center', minHeight: '100vh' }}>
            <CustomCard
                style={{ paddingTop: '150px', minHeight: '100vh', borderRadius: '0' }}
                effectColor="#0a2029" // required
                color="#14AEFF" // default color is white
                blur={15} // default blur value is 10px
                borderRadius={0} // default border radius value is 10px
            >
                <div className="grid grid-cols-12">
                    <div className="col-span-8 col-start-1">
                        <div className="grid grid-cols-3">
                            <a href={filmDetail.trailer} target="_blank" className="col-span-1 h-60" rel="noreferrer">
                                <img src={filmDetail.hinhAnh} alt={filmDetail.tenPhim} />
                            </a>


                            <div className="col-span-2 flex flex-col justify-center ml-10">
                                <p className="text-white">{moment(filmDetail.ngayKhoiChieu).format('dd-mm-yyyy')}</p>
                                <p className="text-xl text-white">{filmDetail.tenPhim}</p>
                                <p className="text-white text-xs">{filmDetail.moTa.length > 200 ? filmDetail.moTa.slice(0, 200) + '...' : filmDetail.moTa}</p>

                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 col-start-10 flex flex-col justify-center items-center">
                        <div className={`c100 p${filmDetail.danhGia * 10} big`}>
                            <span classNam="text-white">{filmDetail.danhGia * 10}%</span>
                            <div className="slice">
                                <div className="bar " />
                                <div className="fill " />
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="star-icon">
                                {/* <Rate style={{ color: '#ffe066 !important' }} allowHalf defaultValue={filmDetail.danhGia / 2} /> */}

                                <Rate disabled allowHalf defaultValue={filmDetail.danhGia / 2} />
                            </div>
                            <h3 className="text-sm text-red-500">{filmDetail.danhGia}/10 Đánh giá</h3>
                        </div>

                    </div>
                </div>

                {/* put film schedule code below this line */}


            </CustomCard>




        </div>
    )
}
