
import { GET_FILM_SHEDULE, GET_FILM_SHEDULE_BY_CINEMA  } from "./types/QuanLyLichChieuPhim";
import { quanLyLichPhimService } from "../../services/QuanLyLichChieuPhimService";


export const getInfoFilmSheduleAdmin = (maPhim) =>{
    return async (dispatch) => {
        try {
            const result = await quanLyLichPhimService.getInfoFilmSheduleAdmin(maPhim);
            if (result.status === 200) {
                console.log('data get info ', result.data?.content)
                dispatch({ type: GET_FILM_SHEDULE, listFilmShedule: result.data?.content });
           }

        } catch (errors) {
            console.log(errors);
        }
    }
}

export const getInfoFilmSheduleByCinema = (maHeThongRap) =>{
    return async (dispatch) => {
        try {
            const result = await quanLyLichPhimService.getInfoFilmSheduleByCinema(maHeThongRap);
            if (result.status === 200) {
                dispatch({ type: GET_FILM_SHEDULE_BY_CINEMA, listFilmSheduleCinema: result.data?.content });
           }
        } catch (errors) {
            console.log(errors);
        }
    }
}