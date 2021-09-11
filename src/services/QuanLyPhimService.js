import { GROUPID } from "../Util/setting";
import { baseService } from "./baseService";

export class QuanLyPhimService extends baseService {


    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }

    layDanhSachBanner = () => {
        return this.get(`api/QuanLyPhim/LayDanhSachBanner`);
    }


    layDanhSachPhim = () => {
        return  this.get(`api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`);
    }

}

export  const quanLyPhimService = new QuanLyPhimService(); 