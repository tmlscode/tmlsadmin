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

const Modals = ({show, close, special}) => {
  const dispatch = useDispatch();
  const app = useSelector(state => state.app)
  const [brand, setBrand] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('');
  const [gender, setGender] = useState('');

  const onSubmit = () => {
    console.log(brand)
    dispatch(changeSpecial(app.user.token, special._id, brand));
  }

  useEffect(() => {
    if(app.successedit){
      setBrand('')
      dispatch(clearsuccessdata());
    }else{
      return null
    }
  })


  return (
            <CModal 
              show={show} 
              onClose={close}
            >
              <CModalHeader closeButton>
                <CModalTitle>Change specialorder status</CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CCol xs="12">
              <CRow>
              {app.error && app.error.type === 'changepecialerror' ?  <CCol xs='12'>
                <CAlert color="danger" closeButton>
                An error occured, please try again
              </CAlert>
                </CCol> : null}
                {app.successedit ? <CCol xs='12'>
                <CAlert color="success">
                Status edited successfully
              </CAlert>
                </CCol> : null}
                <CCol xs="12">
                <CFormGroup>
                    <CLabel htmlFor="brand">Status</CLabel>
                    <CSelect custom name="brand" id="brand" value={brand} onChange={(e) => setBrand(e.target.value)}>
                    <option disabled value=''>Enter status</option>
                    <option value='complete'>Completed</option>
                    <option value='cancel'>Cancelled</option>
                    </CSelect>
                  </CFormGroup>
                </CCol>
                <CCol xs='12'>
                <CButton  color="primary" block onClick={() => onSubmit()}>{app.loading ?  <CSpinner color="white" size="sm" /> : 'Submit'}</CButton>
                </CCol>
              </CRow>
              </CCol>
              </CModalBody>
              <CModalFooter>
              </CModalFooter>
            </CModal>
  )
}

export default Modals
