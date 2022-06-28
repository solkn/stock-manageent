import { PRODUCTACTIONTYPES } from "./types";


const INITIAL_STATE = {
  fetchProductListLoading:false,
  fetchProductListSuccess:false,
  fetchProductDetailsLoading:false,
  fetchProductDetailsSuccess:false,
  createProductLoading:false,
  createProductSuccess:false,
  fetchProductListFailure:'',
  fetchProductDetailsFailure:'',
  createProductFailure:'',

  products:[],
  product:{},


};


export const ProductReducer = (state = INITIAL_STATE, action) =>{

  switch(action.type){
    case PRODUCTACTIONTYPES.PRODUCT_LIST_FETCH_START:
      return {
        ...state,
        fetchProductListLoading:true,
        fetchProductListFailure:'',

      };
    case PRODUCTACTIONTYPES.PRODUCT_LIST_FETCH_SUCCESS:
      return {
        ...state,
        fetchProductListLoading:false,
        fetchProductListSuccess:true,
        products:action.payload,
      };
    case PRODUCTACTIONTYPES.PRODUCT_LIST_FETCH_FAILURE:
      return {
        ...state,
        fetchProductListLoading:false,
        fetchProductListFailure:action.payload.error,
      };


      case PRODUCTACTIONTYPES.PRODUCT_DETAILS_FETCH_START:
      return {
        ...state,
        fetchProductDetailsLoading:true,
        fetchProductDetailsFailure:'',

      };
    case PRODUCTACTIONTYPES.PRODUCT_DETAILS_FETCH_SUCCESS:
      return {
        ...state,
        fetchProductDetailsLoading:false,
        fetchProductDetailsSuccess:true,
        product:action.payload,
      };
    case PRODUCTACTIONTYPES.PRODUCT_DETAILS_FETCH_FAILURE:
      return {
        ...state,
        fetchProductDetailsLoading:false,
        fetchProductDetailsFailure:action.payload.error,
      };

    case PRODUCTACTIONTYPES.PRODUCT_CREATE_START:
        return {
            ...state,
            createProductLoading:true,
            createProductFailure:''
        }
        case PRODUCTACTIONTYPES.PRODUCT_CREATE_SUCCESS:
            return {
                ...state,
                createProductLoading:true,
                createProductSuccess:true,
                products:[action.payload,...state.products],
            }    


            case PRODUCTACTIONTYPES.PRODUCT_CREATE_FAILURE:
                return {
                    ...state,
                    createProductLoading:false,
                    createProductFailure:action.payload.error,
                }    
       

    default:
      return state;  
  }
}

