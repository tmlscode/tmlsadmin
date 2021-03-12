import * as types from '../types';
import Swahili from '../../api/Swahili';


export const sideBar = (sidebarShow) => async dispatch => { 
    dispatch({
        type: types.SET,
        payload: sidebarShow
    })
  }

  export const getBrands = () => async dispatch => { 
    dispatch({
        type: types.LOADING,
    })
        await Swahili.get('/brand').then(res => {

            dispatch({
                        type: types.GET_BRANDS,
                        payload: res.data
                    })
        }).catch(err => {
            console.log(err.response.data);
            dispatch({
                type: types.ERROR,
                payload: {
                    type: 'branderror',
                    error: err
                }
            })
        })
    
    }

    export const getCategories = () => async dispatch => { 
        dispatch({
            type: types.LOADING,
        })
            await Swahili.get('/category').then(res => {
    
                dispatch({
                            type: types.GET_CATEGORY,
                            payload: res.data
                        })
            }).catch(err => {
                console.log(err.response.data);
                dispatch({
                    type: types.ERROR,
                    payload: {
                        type: 'categoryerror',
                        error: err
                    }
                })
            })
        }

        export const getSubcategories = () => async dispatch => { 
            dispatch({
                type: types.LOADING,
            })
                await Swahili.get('/subcategory').then(res => {
        
                    dispatch({
                                type: types.GET_SUBCATEGORY,
                                payload: res.data
                            })
                }).catch(err => {
                    console.log(err.response.data);
                    dispatch({
                        type: types.ERROR,
                        payload: {
                            type: 'subcategoryerror',
                            error: err
                        }
                    })
                })
            }
    

    export const createBrand = (title, token) => async dispatch => { 
        dispatch({
            type: types.LOADING,
        })
            await Swahili.post('/brand/create', {title, token}).then(res => {
                dispatch({
                            type: types.SUCCESS_BRAND,
                            payload: res.data
                        })
            }).catch(err => {
                dispatch({
                    type: types.ERROR,
                    payload: {
                        type: 'branderror',
                        error: err
                    }
                })
            })
        
        }

        export const createCategory = (title, token) => async dispatch => { 
            dispatch({
                type: types.LOADING,
            })
                await Swahili.post('/category/create', {title, token}).then(res => {
                    dispatch({
                                type: types.SUCCESS_CATEGORY,
                                payload: res.data
                            })
                }).catch(err => {
                    dispatch({
                        type: types.ERROR,
                        payload: {
                            type: 'categoryerror',
                            error: err
                        }
                    })
                })
            
            }

            export const createSubcategory = (title, category, token) => async dispatch => { 
                dispatch({
                    type: types.LOADING,
                })
                    await Swahili.post('/subcategory/create', {title, category, token}).then(res => {
                        dispatch({
                                    type: types.SUCCESS_SUBCATEGORY,
                                    payload: res.data
                                })
                    }).catch(err => {
                        dispatch({
                            type: types.ERROR,
                            payload: {
                                type: 'subcategoryerror',
                                error: err
                            }
                        })
                    })
                
                }