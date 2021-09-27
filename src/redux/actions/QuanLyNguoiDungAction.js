import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService";
import { DANG_KY_ACTION, DANG_NHAP_ACTION, DANG_NHAP_THAT_BAI_ACTION, SET_DANH_SACH_NGUOI_DUNG, SET_THONG_TIN_NGUOI_DUNG, SET_THONG_TIN_NGUOI_DUNG_THEO_TAI_KHOAN } from "./types/QuanLyNguoiDungType";
import { history } from '../../App';
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";
import Swal from 'sweetalert2'


export const dangNhapAction = (thongTinDangNhap) => {
    return async (dispatch) => {

        try {


            const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);

            if (result.status === 200) {
                dispatch({
                    type: DANG_NHAP_ACTION,
                    thongTinDangNhap: result.data.content
                })
                if (result.data.content.maLoaiNguoiDung === 'QuanTri') {
                    history.push('/admin');
                } else {
                    history.goBack();
                }
            }

            console.log('result dang nhap', result.data.content)

        } catch (errors) {
            Swal.fire({
                title: 'Đăng nhập thất bại!',
                text: `${errors.response?.data.content}`,
                icon: 'error',
            })
            // dispatch({
            //     type: DANG_NHAP_THAT_BAI_ACTION, 
            //     payload: errors.response?.data.content
            // });
            console.log('errors', errors.response?.data);
        }
    }
}

export const dangKyAction = (thongTinDangKy) => {
    return async (dispatch) => {
        try {
            const results = await quanLyNguoiDungService.dangKy(thongTinDangKy);

            if (results.status === 200) {
                Swal.fire({
                    title: 'Đăng ký thành công!',
                    text: 'Vui Lòng Đăng Nhập Để Vào Hệ Thống.',
                    icon: 'success',
                    confirmButtonColor: '#44c020'
                }).then((result) => {
                    if (result.isConfirmed) {
                        //  dispatch({
                        //     type: DANG_KY_ACTION,
                        //     thongTinDangKy: results.data.content
                        // })
                        // dispatch(layDanhSachNguoiDungAction())
                        window.location.reload();
                    }
                })
            }

            console.log('result', results);

        } catch (errors) {
            console.log('errors', errors.response?.data);
            Swal.fire({
                title: 'Đăng ký thất bại!',
                text: `${errors.response?.data.content}`,
                icon: 'error',
            })
        }
    }
}

export const layThongTinTaiKhoanAction = () => {
    return async (dispatch) => {

        try {

            dispatch(displayLoadingAction);

            const result = await quanLyNguoiDungService.layThongTinTaiKhoan();


            if (result.status === 200) {
                await dispatch({
                    type: SET_THONG_TIN_NGUOI_DUNG,
                    thongTinNguoiDung: result.data.content
                })

                await dispatch(hideLoadingAction);

            }

            console.log('result', result);


        } catch (errors) {
            dispatch(hideLoadingAction);
            console.log('errors', errors.response?.data);
        }
    }
}

export const layThongTinNguoiDungTheoTaiKhoanAction = (taiKhoan) => {
    return async (dispatch) => {

        try {
            const result = await quanLyNguoiDungService.layThongNguoiDungTheoTaiKhoan(taiKhoan);
            if (result.status === 200) {
                dispatch({
                    type: SET_THONG_TIN_NGUOI_DUNG_THEO_TAI_KHOAN,
                    thongTinNguoiDungTheoTaiKhoan: result.data.content
                })

            }




        } catch (errors) {
            // dispatch(hideLoadingAction);
            console.log('errors', errors.response?.data);
        }
    }
}

export const layDanhSachNguoiDungAction = (tuKhoa, isSearch = false) => {
    return async (dispatch) => {

        try {
            if (!isSearch) {
                const result = await quanLyNguoiDungService.layDanhSachNguoiDung();

                if (result.status === 200) {
                    dispatch({
                        type: SET_DANH_SACH_NGUOI_DUNG,
                        danhSachNguoiDung: result.data.content
                    })

                }
            } else {
                const result = await quanLyNguoiDungService.layDanhSachNguoiDungSearch(tuKhoa);

                if (result.status === 200) {
                    dispatch({
                        type: SET_DANH_SACH_NGUOI_DUNG,
                        danhSachNguoiDung: result.data.content
                    })

                }
            }

        } catch (errors) {
            console.log('result', errors.response?.data);
            Swal.fire({
                icon: 'error',
                title: errors.response?.data.message,
                text: `${errors.response?.data.content}`,
            })
        }
    }
}

export const themNguoiDungAction = (thongTinUser) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.themNguoiDung(thongTinUser);
            if (result.status === 200) {
                Swal.fire({
                    title: 'Thêm thành công!',
                    icon: 'success',
                    confirmButtonColor: '#44c020'
                }).then((result) => {
                    if (result.isConfirmed) {
                        dispatch(layDanhSachNguoiDungAction())
                    }
                })

            }

            console.log('result', result);


        } catch (errors) {
            console.log('result', errors.response?.data);
            console.log('result', errors.response);
            Swal.fire({
                icon: 'Thêm thất bại!',
                title: errors.response?.data.message,
                text: `${errors.response?.data.content}`,
            })
        }
    }
}

export const capNhatNguoiDungAction = (thongTinNguoiDung) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.capNhatNguoiDung(thongTinNguoiDung);
            if (result.status === 200) {
                Swal.fire({
                    title: 'Cập nhật thành công!',
                    icon: 'success',
                    confirmButtonColor: '#44c020'
                }).then((result) => {
                    if (result.isConfirmed) {
                        dispatch(layDanhSachNguoiDungAction())
                    }
                })
            }
            console.log('result', result);
        } catch (errors) {
            Swal.fire({
                icon: 'Cập nhật thất bại!',
                title: errors.response?.data.message,
                text: `${errors.response?.data.content}`,
            })
        }
    }
}

export const xoaNguoiDungAction = (taiKhoan) => {
    return async (dispatch) => {

        try {


            const result = await quanLyNguoiDungService.xoaNguoiDung(taiKhoan);


            if (result.status === 200) {
                Swal.fire({
                    title: 'Xóa thành công!',
                    icon: 'success',
                    confirmButtonColor: '#44c020'
                }).then((result) => {
                    if (result.isConfirmed) {
                        dispatch(layDanhSachNguoiDungAction())
                    }
                })
            }

            console.log('result', result);


        } catch (errors) {
            Swal.fire({
                icon: 'Xoá thất bại!',
                title: errors.response?.data.message,
                text: `${errors.response?.data.content}`,
            })
        }
    }
}
