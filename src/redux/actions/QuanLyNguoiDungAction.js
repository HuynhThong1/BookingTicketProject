import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService";
import { DANG_KY_ACTION, DANG_NHAP_ACTION, DANG_NHAP_THAT_BAI_ACTION, SET_THONG_TIN_NGUOI_DUNG } from "./types/QuanLyNguoiDungType";
import { history } from '../../App';
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";


export const dangNhapAction = (thongTinDangNhap) => {
    return async (dispatch) => {

        try {


            const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);
            if (result.status === 200) {
                dispatch({
                    type: DANG_NHAP_ACTION,
                    thongTinDangNhap: result.data.content
                })
                //back to prev page
                history.goBack();
            }

            console.log('result', result);


        } catch (errors) {
            dispatch({
                type: DANG_NHAP_THAT_BAI_ACTION, 
                payload: errors.response?.data.content
            });
            console.log('errors', errors.response?.data);
        }
    }
}

export const dangKyAction = (thongTinDangKy) => {
    //dang nhap thanh` cong nhung password chuyen thanh` rong~.
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.dangKy(thongTinDangKy);

            if (result.status === 200) {
                dispatch({
                    type: DANG_KY_ACTION,
                    thongTinDangKy: result.data.content
                })
                //back to prev page
                history.goBack();
            }

            console.log('result', result);

        } catch (errors) {
            console.log('errors', errors.response?.data);
        }
    }
}

export const layThongTinNguoiDungAction = () => {
    return async (dispatch) => {

        try {

            dispatch(displayLoadingAction);

            const result = await quanLyNguoiDungService.layThongTinNguoiDung();


            if (result.data.statusCode === 200) {
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