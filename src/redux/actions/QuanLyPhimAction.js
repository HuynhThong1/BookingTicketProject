import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { SET_DANH_SACH_PHIM, SET_THONG_TIN_PHIM } from "./types/QuanLyPhimType";
import { history } from '../../App';


export const layDanhSachPhimAction = (tenPhim='') => {
    return async(dispatch) => {
        try {
            const  result = await quanLyPhimService.layDanhSachPhim(tenPhim);

            //After get data from api => redux(reducer)

            dispatch({
                type: SET_DANH_SACH_PHIM,
                arrFilm: result.data.content,
              });

        }
        catch(errors){
            console.log(errors);
        }
    }
}

export const themPhimUploadHinhAction = ( formData) => {
    return async (dispatch) => {
        try {
  
            // console.log(formData.get('tenPhim'))
            let result = await quanLyPhimService.themPhimUploadHinh(formData);
            alert('Them thanh cong!')
            console.log('result', result.data.content)
        } catch (errors){
            console.log('errors', errors.response?.data);
        }
    }
}

export const layThongTinPhimAction = ( maPhim) => {
    return async (dispatch) => {
        try {
            const  result = await quanLyPhimService.layThongTinPhim(maPhim);
            //After get data from api => redux(reducer)
            
            dispatch({
                type: SET_THONG_TIN_PHIM,
                thongTinPhim: result.data.content,
              });
        }
        catch(errors){
            console.log(errors);
        }
    }
}

export const capNhatPhimUploadAction = ( formData) => {
    return async (dispatch) => {
        try {
            const  result = await quanLyPhimService.capNhatPhimUpload(formData);
            //After get data from api => redux(reducer)
            alert('cap nhat thanh cong!')
            console.log('result', result.data.content)
            dispatch(layDanhSachPhimAction());
            history.push('/admin/films')
        }
        catch(errors){
            console.log(errors);
        }
    }
}

export const xoaPhimAction = ( maPhim) => {
    return async (dispatch) => {
        try {
            const  result = await quanLyPhimService.xoaPhim(maPhim);
            console.log('result', result.data.content)
            //After get data from api => redux(reducer)
            alert('Xoa phim thanh cong!')
            dispatch(layDanhSachPhimAction());
        }
        catch(errors){
            console.log(errors);
        }
    }
}