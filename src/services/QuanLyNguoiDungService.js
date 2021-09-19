
import { baseService } from "./baseService";
import { GROUPID } from "../Util/setting";
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

    

    layThongTinTaiKhoan = () => {
        return this.post(`api/QuanLyNguoiDung/ThongTinTaiKhoan`);
    }

    layDanhSachNguoiDung = () => {
        return this.get(`api/QuanLyNguoiDung/LayDanhSachNguoiDung`);
    }
    layDanhSachNguoiDungSearch = (tuKhoa='') => {
        return this.get(`api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}&tuKhoa=${tuKhoa}`);
    }
    themNguoiDung = (thongTinNguoiDung) => {
        return this.post(`api/QuanLyNguoiDung/ThemNguoiDung`, thongTinNguoiDung);
    }
    capNhatNguoiDung = (thongTinNguoiDung) => {
        return this.put(`api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, thongTinNguoiDung);
    }
    xoaNguoiDung = (taiKhoan) => {
        return this.delete(`api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`)
    }

    layThongNguoiDungTheoTaiKhoan = (taikhoan) => {
        return this.post(`api/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taikhoan}`);
    }

}

export  const quanLyNguoiDungService = new QuanLyNguoiDungService(); 