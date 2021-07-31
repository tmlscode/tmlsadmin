import React, { lazy, useEffect } from 'react'
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import MainChartExample from '../charts/MainChartExample.js'
import { clearSuccess, getPayments, getAdmins, getAllUsers, getEvents, getSpecialorders } from '../../store/actions/appactions';
import { useDispatch, useSelector } from 'react-redux';
const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))

const Dashboard = () => {
  const dispatch = useDispatch();
const app = useSelector(state => state.app);
  useEffect(() => {
     dispatch(getPayments());
     dispatch(getAllUsers());
     dispatch(getEvents());
     dispatch(getSpecialorders());
  }, [])
  return (
    <>
      <WidgetsDropdown />
    </>
  )
}

export default Dashboard
