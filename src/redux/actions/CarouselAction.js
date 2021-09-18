
import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { SET_CAROUSEL } from "./types/CarouselType";


export const layCarouselAction = () => {
    return async(dispatch) => {
        try {
            const  result = await quanLyPhimService.layDanhSachBanner();

            dispatch({
                type: SET_CAROUSEL,
                arrImg: result.data.content,
              });

        }
        catch(errors){
            console.log(errors);
        }
    }
}
