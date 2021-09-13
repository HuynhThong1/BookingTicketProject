import { ACCESS_TOKEN, USER_LOGIN } from "../../Util/setting";
import { DANG_KY_ACTION, DANG_NHAP_ACTION, DANG_NHAP_THAT_BAI_ACTION, SET_THONG_TIN_NGUOI_DUNG } from "../actions/types/QuanLyNguoiDungType"

let user = {};

if(localStorage.getItem(USER_LOGIN)){
    user = JSON.parse(localStorage.getItem(USER_LOGIN));
}


const stateDefault = {
    userLogin: user,

    thongTinNguoiDung: {},


    errors: '',

    
}


export const QuanLyNguoiDungReducer = (state = stateDefault, action ) => {

    switch (action.type) {

        case DANG_NHAP_ACTION : {
            const {thongTinDangNhap} = action;
            localStorage.setItem(USER_LOGIN, JSON.stringify(thongTinDangNhap));
            localStorage.setItem(ACCESS_TOKEN, thongTinDangNhap.accessToken);
            return {...state, userLogin: thongTinDangNhap};
        }

        case DANG_KY_ACTION : {
            const {thongTinDangKy} = action;
            localStorage.setItem(USER_LOGIN, JSON.stringify(thongTinDangKy));
            localStorage.setItem(ACCESS_TOKEN, thongTinDangKy.accessToken);
            return {...state, userLogin: thongTinDangKy};
        }

        case DANG_NHAP_THAT_BAI_ACTION: {


            return {...state, errors: action.payload};
        }

        case SET_THONG_TIN_NGUOI_DUNG: {
            state.thongTinNguoiDung = action.thongTinNguoiDung;
            return {...state}
        }
    
        default: return {...state}
    }
}