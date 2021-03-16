import * as types from '../types';
import { setCookie } from '../../libs/cookie';
import Swahili from '../../api/Swahili';


export const sideBar = (sidebarShow) => async dispatch => { 
    dispatch({
        type: types.SET,
        payload: sidebarShow
    })
  }

  export const setPhoto = (photo) => async dispatch => { 
    dispatch({
        type: types.SET_PHOTO,
        payload: photo
    })
  }

  export const clearSuccess = () => async dispatch => { 
    dispatch({
        type: types.CLEAR_SUCCESS,
    })
  }

  export const setEditmodal = (editmodal) => async dispatch => { 
    dispatch({
        type: types.SETMODAL,
        payload: editmodal
    })
  }

  export const closeModal = (data) => async dispatch => { 
    dispatch({
        type: types.CLOSE_MODAL,
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

    export const getColors = () => async dispatch => { 
        dispatch({
            type: types.LOADING,
        })
            await Swahili.get('/color').then(res => {
    
                dispatch({
                            type: types.GET_COLORS,
                            payload: res.data
                        })
            }).catch(err => {
                console.log(err.response.data);
                dispatch({
                    type: types.ERROR,
                    payload: {
                        type: 'colorerror',
                        error: err
                    }
                })
            })
        
        }

        export const getSizes = () => async dispatch => { 
            dispatch({
                type: types.LOADING,
            })
                await Swahili.get('/size').then(res => {
        
                    dispatch({
                                type: types.GET_SIZES,
                                payload: res.data
                            })
                }).catch(err => {
                    console.log(err.response.data);
                    dispatch({
                        type: types.ERROR,
                        payload: {
                            type: 'sizeerror',
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

        export const getClients = () => async dispatch => { 
            dispatch({
                type: types.LOADING,
            })
                await Swahili.get('/client').then(res => {
        
                    dispatch({
                                type: types.GET_CLIENTS,
                                payload: res.data
                            })
                }).catch(err => {
                    console.log(err.response.data);
                    dispatch({
                        type: types.ERROR,
                        payload: {
                            type: 'clienterror',
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

        export const createColor = (title, token) => async dispatch => { 
            dispatch({
                type: types.LOADING,
            })
                await Swahili.post('/color/create', {title, token}).then(res => {
                    dispatch({
                                type: types.SUCCESS_COLOR,
                                payload: res.data
                            })
                }).catch(err => {
                    dispatch({
                        type: types.ERROR,
                        payload: {
                            type: 'colorerror',
                            error: err
                        }
                    })
                })
            
            }

            export const createSize = (title, token) => async dispatch => { 
                dispatch({
                    type: types.LOADING,
                })
                    await Swahili.post('/size/create', {title, token}).then(res => {
                        dispatch({
                                    type: types.SUCCESS_SIZE,
                                    payload: res.data
                                })
                    }).catch(err => {
                        dispatch({
                            type: types.ERROR,
                            payload: {
                                type: 'sizeerror',
                                error: err
                            }
                        })
                    })
                
                }

        export const editBrand = (token, brandid, title) => async dispatch => { 
            dispatch({
                type: types.LOADING,
            })
                await Swahili.post('/brand/edit', {token, brandid, title}).then(res => {
                    dispatch({
                                type: types.SUCCESS_EDIT,
                                payload: res.data
                            })
                }).catch(err => {
                    dispatch({
                        type: types.ERROR,
                        payload: {
                            type: 'brandediterror',
                            error: err
                        }
                    })
                })
        
            }

            export const editClient = (token, clientid, title) => async dispatch => { 
                dispatch({
                    type: types.LOADING,
                })
                    await Swahili.post('/client/edit', {token, clientid, title}).then(res => {
                        dispatch({
                                    type: types.SUCCESS_EDIT,
                                    payload: res.data
                                })
                    }).catch(err => {
                        dispatch({
                            type: types.ERROR,
                            payload: {
                                type: 'clientediterror',
                                error: err
                            }
                        })
                    })
            
                }

                export const editCategory = (token, categoryid, title) => async dispatch => { 
                    dispatch({
                        type: types.LOADING,
                    })
                        await Swahili.post('/category/edit', {token, categoryid, title}).then(res => {
                            dispatch({
                                        type: types.SUCCESS_EDIT,
                                        payload: res.data
                                    })
                        }).catch(err => {
                            dispatch({
                                type: types.ERROR,
                                payload: {
                                    type: 'categoryediterror',
                                    error: err
                                }
                            })
                        })
                
                    }

                export const editSubcategory = (token, subcategoryid, title) => async dispatch => { 
                    dispatch({
                        type: types.LOADING,
                    })
                        await Swahili.post('/subcategory/edit', {token, subcategoryid, title}).then(res => {
                            dispatch({
                                        type: types.SUCCESS_EDIT,
                                        payload: res.data
                                    })
                        }).catch(err => {
                            dispatch({
                                type: types.ERROR,
                                payload: {
                                    type: 'categoryediterror',
                                    error: err
                                }
                            })
                        })
                
                    }

                    export const editSize = (token, sizeid, title) => async dispatch => { 
                        dispatch({
                            type: types.LOADING,
                        })
                            await Swahili.post('/size/edit', {token, sizeid, title}).then(res => {
                                dispatch({
                                            type: types.SUCCESS_EDIT,
                                            payload: res.data
                                        })
                            }).catch(err => {
                                dispatch({
                                    type: types.ERROR,
                                    payload: {
                                        type: 'sizeediterror',
                                        error: err
                                    }
                                })
                            })
                    
                        }

                        
                    export const editColor = (token, colorid, title) => async dispatch => { 
                        dispatch({
                            type: types.LOADING,
                        })
                            await Swahili.post('/color/edit', {token, colorid, title}).then(res => {
                                dispatch({
                                            type: types.SUCCESS_EDIT,
                                            payload: res.data
                                        })
                            }).catch(err => {
                                dispatch({
                                    type: types.ERROR,
                                    payload: {
                                        type: 'colorediterror',
                                        error: err
                                    }
                                })
                            })
                    
                        }

        export const createClient = (title, token) => async dispatch => { 
            dispatch({
                type: types.LOADING,
            })
                await Swahili.post('/client/create', {title, token}).then(res => {
                    dispatch({
                                type: types.SUCCESS_CLIENT,
                                payload: res.data
                            })
                }).catch(err => {
                    dispatch({
                        type: types.ERROR,
                        payload: {
                            type: 'clienterror',
                            error: err
                        }
                    })
                })
            
            }

            export const createSubcategory = (title, token) => async dispatch => { 
                dispatch({
                    type: types.LOADING,
                })
                    await Swahili.post('/subcategory/create', {title, token}).then(res => {
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

                export const Loginuser = ({mobile, password}) => async dispatch => { 
                    dispatch({
                        type: types.CLEAR_ERROR,
                    })
                    dispatch({
                        type: types.LOADING,
                    })
                    await Swahili.post('/user/authenticate', { password, mobile}).then(res => {
                        var user = res.data;
                        setCookie('token', user.token);
                        dispatch({
                                    type: types.SUCCESS_REGISTER,
                                    payload: res.data
                                })
                        // window.location.replace('/dashboard');
                    }).catch(err => {
                        dispatch({
                            type: types.ERROR,
                            payload: {
                                type: 'loginerror',
                                error: err.response.data
                            }
                        })
                    })
                
                }

                export const createUser = (token, name, address, mobile, password) => async dispatch => { 
                    dispatch({
                        type: types.CLEAR_ERROR,
                    })
                    dispatch({
                        type: types.LOADING,
                    })
                    await Swahili.post('/user/createadmin', {token, name, address, mobile, password}).then(res => {
                        var user = res.data;
                        setCookie('token', user.token);
                        dispatch({
                                    type: types.SUCCESS_CREATE_ADMIN,
                                    payload: res.data
                                })
                        // window.location.replace('/dashboard');
                    }).catch(err => {
                        console.log(err.response.data);
                        dispatch({
                            type: types.ERROR,
                            payload: {
                                type: 'createadminerror',
                                error: err.response.data
                            }
                        })
                    })
                
                }

                export const editUser = (token, name, address, mobile, adminid) => async dispatch => { 
                    dispatch({
                        type: types.CLEAR_ERROR,
                    })
                    dispatch({
                        type: types.LOADING,
                    })
                    await Swahili.post('/user/updateadmin', {token, name, address, mobile, adminid}).then(res => {
                        var user = res.data;
                        setCookie('token', user.token);
                        dispatch({
                                    type: types.SUCCESS_EDIT,
                                    payload: res.data
                                })
                        // window.location.replace('/dashboard');
                    }).catch(err => {
                        console.log(err.response.data);
                        dispatch({
                            type: types.ERROR,
                            payload: {
                                type: 'editadminerror',
                                error: err.response.data
                            }
                        })
                    })
                
                }

                export const deleteUser = (token, adminid) => async dispatch => { 
                    dispatch({
                        type: types.CLEAR_ERROR,
                    })
                    dispatch({
                        type: types.LOADING,
                    })
                    await Swahili.post('/user/deleteadmin', {token, adminid}).then(res => {
                        dispatch({
                                    type: types.SUCCESS_EDIT,
                                    payload: res.data
                                })
                        // window.location.replace('/dashboard');
                    }).catch(err => {
                        console.log(err.response.data);
                        dispatch({
                            type: types.ERROR,
                            payload: {
                                type: 'editadminerror',
                                error: err.response.data
                            }
                        })
                    })
                
                }

                export const deleteEvent = (token, eventid, isactive) => async dispatch => { 
                    dispatch({
                        type: types.CLEAR_ERROR,
                    })
                    dispatch({
                        type: types.LOADING,
                    })
                    await Swahili.post('/event/toggle', {token, eventid, isactive}).then(res => {
                        console.log(res.data);
                        dispatch({
                                    type: types.SUCCESS_EDIT,
                                    payload: res.data
                                })
                        // window.location.replace('/dashboard');
                    }).catch(err => {
                        dispatch({
                            type: types.ERROR,
                            payload: {
                                type: 'toggleeventerror',
                                error: err.response.data
                            }
                        })
                    })
                
                }

                
                export const deletePhoto = (token, photoid, state) => async dispatch => { 
                    dispatch({
                        type: types.CLEAR_ERROR,
                    })
                    dispatch({
                        type: types.LOADING,
                    })
                    await Swahili.post('/photo/toggle', {token, photoid, state}).then(res => {
                        console.log(res.data);
                        dispatch({
                                    type: types.SUCCESS_EDIT,
                                    payload: res.data
                                })
                        // window.location.replace('/dashboard');
                    }).catch(err => {
                        dispatch({
                            type: types.ERROR,
                            payload: {
                                type: 'togglephotoerror',
                                error: err.response.data
                            }
                        })
                    })
                
                }

                export const deleteProduct = (token, productid) => async dispatch => { 
                    dispatch({
                        type: types.CLEAR_ERROR,
                    })
                    dispatch({
                        type: types.LOADING,
                    })
                    await Swahili.post('/product/delete', {token, productid}).then(res => {
                        console.log(res.data);
                        dispatch({
                                    type: types.SUCCESS_EDIT,
                                    payload: res.data
                                })
                        // window.location.replace('/dashboard');
                    }).catch(err => {
                        dispatch({
                            type: types.ERROR,
                            payload: {
                                type: 'productdeleteerror',
                                error: err.response.data
                            }
                        })
                    })
                
                }

                export const Logout = () => async dispatch => {

                    dispatch({
                        type: types.LOGOUT,
                    })
                
                }

                export const createEvent = (token, title, about, venue, gallery, date) => async dispatch => { 
                    dispatch({
                        type: types.CLEAR_ERROR,
                    })
                    dispatch({
                        type: types.LOADING,
                    })
                    await Swahili.post('/event/create', {token, title, about, venue, gallery, date}).then(res => {
                        dispatch({
                                    type: types.SUCCESS_CREATE_EVENT,
                                    payload: res.data
                                })
                    }).catch(err => {
                        console.log(err.response.data);
                        dispatch({
                            type: types.ERROR,
                            payload: {
                                type: 'createeventerror',
                                error: err.response.data
                            }
                        })
                    })
                
                }

                export const createProduct = (token, title, about, image, gallery, price, category, subcategory, brand, size, color, quantity, client) => async dispatch => { 
                    dispatch({
                        type: types.CLEAR_ERROR,
                    })
                    dispatch({
                        type: types.LOADING,
                    })
                    await Swahili.post('/product/create', {token, title, about, image, gallery, price, category, subcategory, brand, size, color, quantity, client}).then(res => {
                        dispatch({
                                    type: types.SUCCESS_CREATE_PRODUCT,
                                    payload: res.data
                                })
                    }).catch(err => {
                        console.log(err.response.data);
                        dispatch({
                            type: types.ERROR,
                            payload: {
                                type: 'createproducterror',
                                error: err.response.data
                            }
                        })
                    })
                
                }

                export const editProduct = (token, productid, title, about, image, gallery, price, category, subcategory, brand, size, color, quantity, client) => async dispatch => { 
                    dispatch({
                        type: types.CLEAR_ERROR,
                    })
                    dispatch({
                        type: types.LOADING,
                    })
                    await Swahili.post('/product/edit', {token, productid, title, about, image, gallery, price, category, subcategory, brand, size, color, quantity, client}).then(res => {
                        dispatch({
                                    type: types.SUCCESS_EDIT,
                                    payload: res.data
                                })
                    }).catch(err => {
                        console.log(err.response.data);
                        dispatch({
                            type: types.ERROR,
                            payload: {
                                type: 'createproducterror',
                                error: err.response.data
                            }
                        })
                    })
                
                }


                export const createPhoto = (token, title, about, venue, url, date) => async dispatch => { 
                    dispatch({
                        type: types.CLEAR_ERROR,
                    })
                    dispatch({
                        type: types.LOADING,
                    })
                    await Swahili.post('/photo/create', {token, title, about, venue, url, date}).then(res => {
                        dispatch({
                                    type: types.SUCCESS_CREATE_PHOTO,
                                    payload: res.data
                                })
                    }).catch(err => {
                        console.log(err.response.data);
                        dispatch({
                            type: types.ERROR,
                            payload: {
                                type: 'createphotoerror',
                                error: err.response.data
                            }
                        })
                    })
                
                }

                export const editPhoto = (token, photoid, title, about, url, venue, date) => async dispatch => { 
                    dispatch({
                        type: types.CLEAR_ERROR,
                    })
                    dispatch({
                        type: types.LOADING,
                    })
                    await Swahili.post('/photo/edit', {token, photoid, title, about, url, venue, date}).then(res => {
                        dispatch({
                                    type: types.SUCCESS_EDIT,
                                    payload: res.data
                                })
                    }).catch(err => {
                        console.log(err.response.data);
                        dispatch({
                            type: types.ERROR,
                            payload: {
                                type: 'editphotoerror',
                                error: err.response.data
                            }
                        })
                    })
                
                }



                export const getAdmins = () => async dispatch => { 
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

                    export const getEvents = () => async dispatch => { 
                        dispatch({
                            type: types.LOADING,
                        })
                            await Swahili.get('/event').then(res => {
                                dispatch({
                                            type: types.SUCCESS_EVENTS,
                                            payload: res.data
                                        })
                            }).catch(err => {
                                dispatch({
                                    type: types.ERROR,
                                    payload: {
                                        type: 'eventserror',
                                        error: err.response.data
                                    }
                                })
                            })
                        
                        }


                        export const getUser = (token) => async dispatch => { 
                            dispatch({
                                type: types.LOADING,
                            })
                                await Swahili.post('/user/token', {token}).then(res => {
                                    dispatch({
                                                type: types.SUCCESS_USER,
                                                payload: {
                                                    token,
                                                    name: res.data.name,
                                                    address: res.data.address,
                                                    
                                                }
                                            })
                                }).catch(err => {
                                    dispatch({
                                        type: types.ERROR,
                                        payload: {
                                            type: 'tokenerror',
                                            error: err.response.data
                                        }
                                    })
                                })
                            
                            }

                            export const getPhotos = () => async dispatch => { 
                                dispatch({
                                    type: types.LOADING,
                                })
                                    await Swahili.get('/photo').then(res => {
                                        dispatch({
                                                    type: types.SUCCESS_PHOTOS,
                                                    payload: res.data
                                                })
                                    }).catch(err => {
                                        dispatch({
                                            type: types.ERROR,
                                            payload: {
                                                type: 'photoserror',
                                                error: err
                                            }
                                        })
                                    })
                                
                                }

                                export const getUsers = (token) => async dispatch => { 
                                    dispatch({
                                        type: types.LOADING,
                                    })
                                        await Swahili.post('/user/getadmin', {token}).then(res => {
                                            var arr = res.data;
                                            if(Array.isArray(arr)){
                                                const results = res.data
                                                dispatch({
                                                    type: types.SUCCESS_USERS,
                                                    payload: results,
                                                })
                                            }else{
                                                const results = [res.data]
                                                dispatch({
                                                    type: types.SUCCESS_USERS,
                                                    payload: results,
                                                })
                                            }
                                        }).catch(err => {
                                            dispatch({
                                                type: types.ERROR,
                                                payload: {
                                                    type: 'getuserserror',
                                                    error: err
                                                }
                                            })
                                        })
                                    
                                    }

                                    export const getProducts = () => async dispatch => { 
                                        dispatch({
                                            type: types.LOADING,
                                        })
                                            await Swahili.get('/product').then(res => {
                                                dispatch({
                                                            type: types.GET_PRODUCTS,
                                                            payload: res.data
                                                        })
                                            }).catch(err => {
                                                console.log(err);
                                                dispatch({
                                                    type: types.ERROR,
                                                    payload: {
                                                        type: 'producterror',
                                                        error: err
                                                    }
                                                })
                                            })
                                        
                                        }