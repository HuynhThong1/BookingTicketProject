import { ACCESS_TOKEN, USER_LOGIN } from "../../Util/setting";
import { DANG_KY_ACTION, DANG_NHAP_ACTION, DANG_NHAP_THAT_BAI_ACTION, SET_DANH_SACH_NGUOI_DUNG, SET_THONG_TIN_NGUOI_DUNG, SET_THONG_TIN_NGUOI_DUNG_THEO_TAI_KHOAN } from "../actions/types/QuanLyNguoiDungType"

let user = {};

if (localStorage.getItem(USER_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN));
}


const stateDefault = {
    userLogin: user,

    thongTinNguoiDung: {},
    danhSachNguoiDung: [],
    thongTinNguoiDungTheoTaiKhoan: {},
    errors: '',

}


export const QuanLyNguoiDungReducer = (state = stateDefault, action) => {

    switch (action.type) {

        case DANG_NHAP_ACTION: {
            const { thongTinDangNhap } = action;
            localStorage.setItem(USER_LOGIN, JSON.stringify(thongTinDangNhap));
            if( thongTinDangNhap.accessToken  ) {
                localStorage.setItem(ACCESS_TOKEN, thongTinDangNhap.accessToken);
            }
            return { ...state, userLogin: thongTinDangNhap };
        }

        case 'GET_TOKEN_ACTION': {
            const { token } = action;
            localStorage.setItem(ACCESS_TOKEN, token.accessToken);
            return { ...state};
        }

        // case DANG_KY_ACTION: {
        //     const { thongTinDangKy } = action;
        //     return { ...state, userLogin: thongTinDangKy };
        // }

        case DANG_NHAP_THAT_BAI_ACTION: {
            return { ...state, errors: action.payload };
        }

        case SET_THONG_TIN_NGUOI_DUNG: {
            state.thongTinNguoiDung = action.thongTinNguoiDung;
            return { ...state }
        }
        case SET_THONG_TIN_NGUOI_DUNG_THEO_TAI_KHOAN: {
            state.thongTinNguoiDungTheoTaiKhoan = action.thongTinNguoiDungTheoTaiKhoan;
            return { ...state }
        }
        case SET_DANH_SACH_NGUOI_DUNG: {
            state.danhSachNguoiDung = action.danhSachNguoiDung;
            console.log('DanhSachNguoiDung', state.danhSachNguoiDung)
            return { ...state }
        }


        default: return { ...state }
    }
}