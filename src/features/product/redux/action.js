
import axios from "axios";
import { COMMON_URL } from "src/common/api";
import { PRODUCTACTIONTYPES } from "./types";

/**
 * PRODUCT FETCH ACTION
 * @returns ACTION
 */


export const fetchProductListStart = () => ({
    type: PRODUCTACTIONTYPES.PRODUCT_LIST_FETCH_START
});

export const fetchProductListSuccess = (product) => ({
    type: PRODUCTACTIONTYPES.PRODUCT_LIST_FETCH_SUCCESS,
    payload: {
        product,
    }
});
export const fetchProductListFailure = (error)({
    type: PRODUCTACTIONTYPES.PRODUCT_LIST_FETCH_FAILURE,
    payload: {
        error
    }
})



export const fetchProductDetailsStart = () => ({
    type: PRODUCTACTIONTYPES.fetchProductDetailsStart
});

export const fetchProductDetailsSuccess = (product) => ({
    type: PRODUCTACTIONTYPES.PRODUCT_DETAILS_FETCH_SUCCESS,
    payload: {
        product,
    }
});
export const fetchProductDetailsFailure = (error)({
    type: PRODUCTACTIONTYPES.PRODUCT_DETAILS_FETCH_FAILURE,
    payload: {
        error
    }
})


export const createProductStart = () => ({
    type: PRODUCTACTIONTYPES.PRODUCT_CREATE_START,

})
export const createProductSuccess = (quantity, pricePerPiece, purchasedOn) => ({
    type: PRODUCTACTIONTYPES.PRODUCT_CREATE_SUCCESS,
    payload: {
        quantity,
        pricePerPiece,
        purchasedOn
    }

})

export const createProductFailure = (error) => ({
    type: PRODUCTACTIONTYPES.PRODUCT_CREATE_FAILURE,
    payload: {
        error
    }
})



/**
 * 
 * @returns  PRODUCT ASYNC ACTION TYPES
 */

export const fetchProductListAsync = (data) => {
    console.log(data);
    return async (dispatch) => {
        dispatch(fetchProductListStart());
        await axios.get(`${COMMON_URL}/products`, data, {

        }).then((res) => {
            dispatch(fetchProductListSuccess(res.data));
        })
            .catch(function (error) {
                dispatch(fetchProductListFailure(error));
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
    };
};


export const fetchProductDetailsAsync = (data) => {
    console.log(data);
    return async (dispatch) => {
        dispatch(fetchProductDetailsStart());
        await axios.get(`${COMMON_URL}/products`, data, {

        }).then((res) => {
            dispatch(fetchProductDetailsSuccess(res.data));
        })
            .catch(function (error) {
                dispatch(fetchProductDetailsFailure(error));
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
    };
};

export const createProductAsync = (data) => {
    console.log(data);
    return async (dispatch) => {
        dispatch(createProductStart());
        await axios.post(`${COMMON_URL}/products`, data, {

        }).then((res) => {
            dispatch(createProductSuccess(res.data));
        })
            .catch(function (error) {
                dispatch(createProductFailure(error));
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
    };
};

