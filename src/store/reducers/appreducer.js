import * as types from '../types';

const initialState = {
  sidebarShow: 'responsive',
  brand: [],
  loading: false,
  error: null,
  categories: [],
  subcategories: [],
  parameters: {}
}

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_PHOTO:
      return{
        ...state,
        photo: action.payload
      }
    case types.LOGOUT:
      return {
        state: {}
      }
    case types.SUCCESS_EVENTS:
      return{
          ...state,
          events: action.payload,
          loading: false,
          error: null,
      }
    case types.SUCCESS_USER:
        return {
            ...state,
             user: action.payload,
      }
    case types.SUCCESS_USERS:
        return {
            ...state,
             users: action.payload,
             loading: false,
             error: null
    }
    case types.SUCCESS_PHOTOS:
      return{
              ...state,
              photos: action.payload,
              loading: false,
              error: null,
      }
    case types.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        successadmin: false,
        successedit: false
      }
    case types.SETMODAL:
      return {
        ...state, 
        parameters: action.payload,
        modal: true,
       
      }
    case types.CLEAR_SUCCESS:
      return {
        ...state,
        successedit: false
      }
    case types.CLOSE_MODAL:
      return {
        ...state,
        modal: false,
        parameters: {}
      }
    case types.SUCCESS_REGISTER:
        return {
            ...state,
            loading: false,
            user: action.payload,
            successadmin: false,
        }
    case types.SUCCESS_EDIT:
      return {
        ...state,
        loading: false,
        successedit: true,
      }
    case types.SUCCESS_CREATE_ADMIN:
        return {
              ...state,
              loading: false,
              successadmin: true,
        }
    case types.SUCCESS_CREATE_EVENT:
        return {
              ...state,
              loading: false,
              successevent: true,
          }
     case types.SUCCESS_CREATE_PHOTO:
            return {
                  ...state,
                  loading: false,
                  successphoto: true,
              }
    case types.SET:
      return {
          ...state,
          sidebarShow: action.payload
        }
    case types.LOADING:
      return {
        ...state,
        loading: true,
        error: null,
        successadmin: false,
        successedit: false
      }
    case types.GET_BRANDS:
        return{
            ...state,
            brands: action.payload,
            loading: false
        }
    case types.GET_CATEGORY:
          return{
              ...state,
              categories: action.payload,
              loading: false,
              successedit: false
          }
    case types.GET_PRODUCTS:
          return{
             ...state,
              products: action.payload,
              loading: false,
              error: null
            }
    case types.GET_SUBCATEGORY:
            return{
                ...state,
                subcategories: action.payload,
                loading: false
            }
    case types.SUCCESS_BRAND:
      return {
        ...state,
        brands: [action.payload, ...state.brands],
        loading: false
      }
    case types.SUCCESS_CATEGORY:
      return {
        ...state,
        categories: [action.payload, ...state.categories],
        loading: false
      }
      case types.SUCCESS_SUBCATEGORY:
        return {
          ...state,
          subcategories: [action.payload, ...state.subcategories],
          loading: false
        }
    default:
      return state
  }
}



