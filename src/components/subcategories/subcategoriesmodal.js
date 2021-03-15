import React, { useState } from 'react'
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
  CLabel,
  CSpinner,
  CSelect
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux';
import { createSubcategory } from '../../store/actions/appactions';

const Modals = ({show, close}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();
  const app = useSelector(state => state.app)

  const onSubmit = () => {
    dispatch(createSubcategory(title, category, app.user.token));
  }
  return (
            <CModal 
              show={show} 
              onClose={close}
            >
              <CModalHeader closeButton>
                <CModalTitle>Create Brand</CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CCol xs="12">
              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="name">Title</CLabel>
                    <CInput id="name" placeholder="Enter your name" required value={title} onChange={(e) => setTitle(e.target.value)} />
                  </CFormGroup>
                </CCol>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="ccmonth">Category</CLabel>
                    <CSelect custom name="ccmonth" id="ccmonth" value={category} onChange={(e) => setCategory(e.target.value)}>
                     {app.categories ? app.categories.map(category => {
                       return (
                        <option value={category._id}>{category.title}</option>
                       )
                     }) : null}
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
