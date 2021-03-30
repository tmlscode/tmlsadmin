import * as types from '../types';

const initialState = {
  sidebarShow: 'responsive',
  brand: [],
  loading: false,
  error: null,
  categories: [],
  subcategories: [],
  parameters: {},
  editmodal: false
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
        editmodal: true,              
      }
    case types.CLEAR_SUCCESS:
      return {
        ...state,
        successedit: false,
        successadmin: false,
        successcategory: false,
        successclient: false,
        successclients: false,
        successcolor: false,
        successcolors: false,
        successevent: false,
        successphoto: false,
        successproduct: false,
        successsize: false,
        successsizes: false,
        successsubcategory: false,
        successlocation: false,
      }
    case types.CLOSE_MODAL:
      return {
        ...state,
        editmodal: false,
        parameters: {}
      }
    case types.SUCCESS_LOCATION:
      return {
        ...state,
        successlocation: true,
        loading: false,
        error: null
      }
    case types.GET_LOCATIONS:
      return {
        ...state,
        locations: action.payload,
        loading: false,
        error: null
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
    case types.GET_CLIENTS:
          return{
                ...state,
                clients: action.payload,
                loading: false,
                successclients: false
          }
    case types.GET_COLORS:
          return{
                  ...state,
                  colors: action.payload,
                  loading: false,
                  successcolors: false
          }
          case types.GET_SIZES:
            return{
                  ...state,
                  sizes: action.payload,
                  loading: false,
                  successsizes: true
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
        loading: false,
        successcategory: true,
        error: null
      }
      case types.SUCCESS_COLOR:
        return {
          ...state,
          loading: false,
          successcolor: true,
          error: null
        }
        case types.SUCCESS_SIZE:
          return {
            ...state,
            loading: false,
            successsize: true,
            error: null
          }
      case types.SUCCESS_CLIENT:
        return {
          ...state,
          loading: false,
          successclient: true,
          error: null,
        }
      case types.SUCCESS_SUBCATEGORY:
        return {
          ...state,
          loading: false,
          successsubcategory: true,
          error: null
        }
      case types.SUCCESS_CREATE_PRODUCT:
        return {
          ...state,
          successproduct: true,
          loading: false,
          error: false
        }
    default:
      return state
  }
}



