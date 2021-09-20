import { GROUPID } from "../Util/setting";
import { baseService } from "./baseService";

export class QuanLyLichChieuPhimService extends baseService {


    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }


    getInfoFilmSheduleAdmin = (maPhim) => {
        return  this.get(`api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`);
    }

    getInfoFilmSheduleByCinema = (maHeThongRap) => {
        return this.get(`api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=${GROUPID}`)
    }


}

export  const quanLyLichPhimService = new QuanLyLichChieuPhimService(); 