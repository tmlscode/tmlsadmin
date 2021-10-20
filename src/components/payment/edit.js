import React  from 'react'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CCol,
  CSpinner,
  CAlert
} from '@coreui/react'
import { changeStatus } from '../../store/actions/appactions';
import { useDispatch, useSelector } from 'react-redux';

const Modals = ({show, close, brand}) => {
  const app = useSelector(state => state.app)
  const dispatch = useDispatch();


  const onSubmit = () => {
  dispatch(changeStatus(app.user.token, brand._id))
  }

  return (
    <CModal 
    show={show} 
    onClose={close}
  >
    <CModalHeader closeButton>
      <CModalTitle>change order status</CModalTitle>
    </CModalHeader>
    <CModalBody>
    <CRow>
         {app.error && app.error.type === 'changestatuserror' ?  <CCol xs='12'>
                <CAlert color="danger" closeButton>
                An error occured, please try again
              </CAlert>
                </CCol> : null}
                {app.successedit ?  <CCol xs='12'>
                <CAlert color="success" closeButton>
                Order status changed successfully
              </CAlert>
                </CCol> : null}
    </CRow>
      Are you sure you want to change {brand ? `${brand.fullname}'s` : null} order status to {brand.status === 'pending' ? "cancelled" : "Complete"}?
    </CModalBody>
    <CModalFooter>
      <CButton color="success" onClick={onSubmit}>{app.loading ? <CSpinner color="white" size="sm" /> : 'Submit'}</CButton>{' '}
      <CButton 
        color="secondary" 
        onClick={close}
      >Cancel</CButton>
    </CModalFooter>
  </CModal>    
  )
}

export default Modals
