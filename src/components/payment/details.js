import React, { useState, useEffect } from 'react'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CCol,
  CFormGroup,
  CInput,
  CAlert,
  CLabel,
  CInputFile,
  CSpinner,
  CSelect
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux';
import { changeSpecial, clearsuccessdata} from '../../store/actions/appactions';
import CIcon from '@coreui/icons-react'

const Modals = ({show, close, brand}) => {
  const app = useSelector(state => state.app)
  const [brands, setBrands] = useState('');


  const setting = () => {
    setBrands(brand)
  }

  return (
            <CModal 
              show={show} 
              onClose={close}
              onOpened={setting}
            >
              <CModalHeader closeButton>
                <CModalTitle>Details</CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CCol xs="12">
              <CRow>
                <CCol xs="12">
               <span>{brands}</span>
                </CCol>
              </CRow>
              </CCol>
              </CModalBody>
              <CModalFooter>
              <CButton  color="primary" block onClick={close}>Close</CButton>
              </CModalFooter>
            </CModal>
  )
}

export default Modals
