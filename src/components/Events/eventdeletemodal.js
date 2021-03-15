import React from 'react'
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
import { deleteEvent } from '../../store/actions/appactions';
import { useDispatch, useSelector } from 'react-redux';

const Modals = ({show, close, brand}) => {
  const app = useSelector(state => state.app)
  const dispatch = useDispatch();


  const onSubmit = () => {
    dispatch(deleteEvent(app.user.token, brand._id, brand.isActive));
  }
  return (
    <CModal 
    show={show} 
    onClose={close}
  >
    <CModalHeader closeButton>
      <CModalTitle>ToggleEvent</CModalTitle>
    </CModalHeader>
    <CModalBody>
    <CRow>
         {app.error && app.error.type === 'toggleeventerror' ?  <CCol xs='12'>
                <CAlert color="danger" closeButton>
                An error occured, please try again
              </CAlert>
                </CCol> : null}
                {app.successedit ?  <CCol xs='12'>
                <CAlert color="success" closeButton>
                Event toggled successfully
              </CAlert>
                </CCol> : null}
    </CRow>
      Are you sure you want to delete {brand ? brand.title : null}?
    </CModalBody>
    <CModalFooter>
      <CButton color={brand.isActive ? 'danger' : 'success'} onClick={onSubmit}>{app.loading ? <CSpinner color="success" size="sm" /> : brand.isActive ? 'deactivate' : 'activate'}</CButton>{' '}
      <CButton 
        color="secondary" 
        onClick={close}
      >Cancel</CButton>
    </CModalFooter>
  </CModal>    
  )
}

export default Modals
