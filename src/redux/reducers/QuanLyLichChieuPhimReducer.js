const stateDefault = {
    listFilmShedule: [],
    listFilmSheduleCinema:{}
}

export const QuanLyLichChieuPhimReducer = (state=stateDefault, action) => {
    switch(action.type){
        
        case 'GET_FILM_SHEDULE':{
            let arrayListFilmShedule = [...state.listFilmShedule, action.listFilmShedule];
            // arrayListCinema = [...action.listCinemas];
            state.listFilmShedule = arrayListFilmShedule;
            return{...state};
        }
        case 'RESET_LIST_FILM_SHEDULE':{
            state.listFilmShedule = []
            return{...state};
        }
        case 'GET_FILM_SHEDULE_BY_CINEMA':{
            state.listFilmSheduleCinema = action.listFilmSheduleCinema;
            return {...state};
        }
        default:return {...state}
    }
}