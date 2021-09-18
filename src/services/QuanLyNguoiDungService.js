
import { baseService } from "./baseService";

export class QuanLyNguoiDungService extends baseService {


    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }

    dangNhap = (thongTinDangNhap) => {
        return this.post(`api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap);
    }

    dangKy = (thongTinDangKy) => {
        return this.post(`api/QuanLyNguoiDung/DangKy`, thongTinDangKy);
    }

    

    layThongTinNguoiDung = () => {
        return this.post(`api/QuanLyNguoiDung/ThongTinTaiKhoan`);
    }

}

export  const quanLyNguoiDungService = new QuanLyNguoiDungService(); 