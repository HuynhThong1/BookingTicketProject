import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { SET_DANH_SACH_PHIM, SET_THONG_TIN_PHIM } from "./types/QuanLyPhimType";
import { history } from '../../App';
import Swal from 'sweetalert2';

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
            if (result.status === 200) {
                Swal.fire({
                    title: 'Thêm thành công!',
                    icon: 'success',
                    confirmButtonColor: '#44c020'
                }).then((result)=>{
                    if(result.isConfirmed){
                        dispatch(layDanhSachPhimAction())
                        history.push('/admin/films')
                    }
                })
            }
        } catch (errors){
            console.log('errors', errors.response?.data);
            Swal.fire({
                icon: 'Thêm thất bại!',
                title: errors.response?.data.message,
                text: `${errors.response?.data.content}`,
            })
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
            if (result.status === 200) {
                Swal.fire({
                    title: 'Cập nhật thành công!',
                    icon: 'success',
                    confirmButtonColor: '#44c020'
                }).then((result) => {
                    if(result.isConfirmed){
                        dispatch(layDanhSachPhimAction())
                        history.push('/admin/films')
                    }
                })
            }
        }
        catch(errors){
            console.log(errors);
            Swal.fire({
                icon: 'Cập nhật thất bại!',
                title: errors.response?.data.message,
                text: `${errors.response?.data.content}`,
            })
        }
    }
}

export const xoaPhimAction = ( maPhim) => {
    return async (dispatch) => {
        try {
            const  result = await quanLyPhimService.xoaPhim(maPhim);
            console.log('result', result.data.content)
            //After get data from api => redux(reducer)
            if (result.status === 200) {
                Swal.fire({
                    title: 'Xóa thành công!',
                    icon: 'success',
                    confirmButtonColor: '#44c020'
                }).then((result)=>{
                    if(result.isConfirmed){
                        dispatch(layDanhSachPhimAction())
                    }
                })
            }
        }
        catch(errors){
            console.log(errors);
            Swal.fire({
                icon: 'Xoá thất bại!',
                title: errors.response?.data.message,
                text: `${errors.response?.data.content}`,
            })
        }
        
    }
}