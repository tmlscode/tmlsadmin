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
import { deleteUser } from '../../store/actions/appactions';
import { useDispatch, useSelector } from 'react-redux';

const Modals = ({show, close, brand}) => {
  const app = useSelector(state => state.app)
  const dispatch = useDispatch();


  const onSubmit = () => {
    dispatch(deleteUser(app.user.token, app.user._id));
  }
  return (
    <CModal 
    show={show} 
    onClose={close}
  >
    <CModalHeader closeButton>
      <CModalTitle>Delete user</CModalTitle>
    </CModalHeader>
    <CModalBody>
    <CRow>
         {app.error && app.error.type === 'deleteadminerror' ?  <CCol xs='12'>
                <CAlert color="danger" closeButton>
                An error occured, please try again
              </CAlert>
                </CCol> : null}
                {app.successedit ?  <CCol xs='12'>
                <CAlert color="success" closeButton>
                Admin Deleted successfully
              </CAlert>
                </CCol> : null}
    </CRow>
      Are you sure you want to delete {brand ? brand.name : null}?
    </CModalBody>
    <CModalFooter>
      <CButton color="danger" onClick={onSubmit}>{app.loading ? <CSpinner color="success" size="sm" /> : 'delete'}</CButton>{' '}
      <CButton 
        color="secondary" 
        onClick={close}
      >Cancel</CButton>
    </CModalFooter>
  </CModal>    
  )
}

export default Modals
