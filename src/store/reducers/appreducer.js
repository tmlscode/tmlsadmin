import * as types from '../types';

const initialState = {
  sidebarShow: 'responsive',
  brand: [],
  loading: false,
  error: null,
  categories: [],
  subcategories: [],
}

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
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
        error: null
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
              loading: false
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



