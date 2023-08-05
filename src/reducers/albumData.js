export const initialItuneData  = {
    albumMainData : {},
    filteredData: {},
    selectedAlbum: {}
    }
    
    export function albumReducer(state = initialItuneData, action ) {
        switch (action.type) {
            case 'SET_ALBUM_MAIN_DATA':
                return {
                    ...state,
                    albumMainData: action.albumMainData
                }
            case 'SET_SELECTED_ALBUM':
                return {
                    ...state,
                    selectedAlbum: action.selectedAlbum
                }
            case 'SET_FILTERED_DATA':
                return {
                    ...state,
                    filteredData: action.filteredData
                }
            default:
                return state;
        }
    }