
import { ThongTinDatVe } from "../_core/models/ThongTinDatVe";
import { baseService } from "./baseService";

export class QuanLyDatVeService extends baseService {


    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }

    layChiTietPhongVe = (malichChieu) => { //maLichChieu lay tu URL
        return this.get(`api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${malichChieu}`);
    }

    datVe = (thongTinDatVe = new ThongTinDatVe()) => { 
        return this.post(`api/QuanLyDatVe/DatVe`, thongTinDatVe);
    }

}

export  const quanLyDatVeService = new QuanLyDatVeService(); 