import React, { useState, useEffect} from 'react'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CSelect,
  CModalHeader,
  CModalTitle,
  CRow,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CSpinner,
  CAlert
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux';
import { createBrand, createSubcategory, createColor, createSize, clearsuccessdata } from '../../store/actions/appactions';

const Modals = ({show, close}) => {
  const [title, setTitle] = useState('');
  const [choice, setChoice] = useState('brand');
  const dispatch = useDispatch();
  const app = useSelector(state => state.app)

  const onSubmit = () => {
    if(choice === 'brand'){
      dispatch(createBrand(title, app.user.token));
    }else if(choice === 'producttype'){
      dispatch(createSubcategory(title, app.user.token));
    } else if(choice === 'color') {
      dispatch(createColor(title, app.user.token));
    } else if(choice === 'size'){
      dispatch(createSize(title, app.user.token));
    } else {
      return null;
    }
  }

  useEffect(() => {
    if(app.successentries){
      setTitle('')
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
                <CModalTitle>Create supplier / category</CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CCol xs="12">
              <CRow>
              {app.error && (app.error.type === 'colorerror' || app.error.type === 'branderror' || app.error.type === 'sizeerror' || app.error.type === 'subcategoryerror') ?  <CCol xs='12'>
                <CAlert color="danger" closeButton>
                An error occured, please try again
              </CAlert>
                </CCol> : null}
                {app.successentriesmsg ? <CCol xs='12'>
                <CAlert color="success">
                 {choice} Created successfully
              </CAlert>
                </CCol> : null}
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="name">Title</CLabel>
                    <CInput id="name" placeholder="Enter title" required value={title} onChange={(e) => setTitle(e.target.value)} />
                  </CFormGroup>
                </CCol>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="ccmonth">Choice</CLabel>
                    <CSelect custom name="ccmonth" id="ccmonth" value={choice} onChange={(e) => setChoice(e.target.value)}>
                        <option value="brand">Brand</option>
                        <option value="producttype">Product Category</option>
                    </CSelect>
                  </CFormGroup>
                </CCol>
                <CCol xs='12'>
                <CButton  color="primary" block onClick={() => onSubmit()}>{app.loading ?  <CSpinner color="success" size="sm" /> : 'create'}</CButton>
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
