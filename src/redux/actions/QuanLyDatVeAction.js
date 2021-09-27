import { connection } from "../..";
import { quanLyDatVeService } from "../../services/QuanLyDatVeService";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";
import { CHUYEN_TAB, DAT_VE, DAT_VE_HOAN_TAT, SET_CHI_TIET_PHONG_VE } from "./types/QuanLyDatVeType";


export const layChiTietPhongVeAction = (maLichChieu) => {
    return async (dispatch) => {

        try {

            const result = await quanLyDatVeService.layChiTietPhongVe(maLichChieu);

            if (result.status === 200) {
                dispatch({
                    type: SET_CHI_TIET_PHONG_VE,
                    chiTietPhongVe: result.data.content
                })
            }

            console.log('result', result);


        } catch (errors) {
            console.log('errors', errors.response?.data);
        }
    }
}


export const datVeAction = (thongtinDatVe = new ThongTinDatVe()) => {
    return async (dispatch, getState) => {

        try {

            dispatch(displayLoadingAction);


            const result = await quanLyDatVeService.datVe(thongtinDatVe);

            console.log(result.data.content);

            //Đặt vé thành công gọi api load lại phòng vé
            await dispatch(layChiTietPhongVeAction(thongtinDatVe.maLichChieu));

            await dispatch({ type: DAT_VE_HOAN_TAT });
            await dispatch(hideLoadingAction);

            let userLogin = getState().QuanLyNguoiDungReducer.userLogin

            await connection.invoke('datGheThanhCong', userLogin.taiKhoan, thongtinDatVe.maLichChieu);
            dispatch({ type: CHUYEN_TAB });

        } catch (error) {
            dispatch(hideLoadingAction);
            console.log('errors', error.response.data);

        }
    }
}


export const datGheAction = (ghe, maLichChieu) => {
    return async (dispatch, getState) => {

        //đưa thông tin ghế lên reducer
        await dispatch({
            type: DAT_VE,
            gheDuocChon: ghe
        })

        //call api về backend
        let danhSachGheDangDat = getState().QuanLyDatVeReducer.danhSachGheDangDat;


        let taiKhoan = getState().QuanLyNguoiDungReducer.userLogin.taiKhoan;

        console.log('danhSachGheDangDat', danhSachGheDangDat)
        console.log('taiKhoan', taiKhoan)
        console.log('maLichChieu', maLichChieu)


        //convert array to string
        danhSachGheDangDat = JSON.stringify(danhSachGheDangDat);

        connection.invoke('datGhe', taiKhoan, danhSachGheDangDat, maLichChieu);
    }
}