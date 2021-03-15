import React, { useState } from 'react'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CSpinner,
  CCol,
  CFormGroup,
  CAlert,
  CInput,
  CLabel
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux';
import { editCategory } from 'src/store/actions/appactions';

const Modals = ({show, close, brand}) => {
  const [title, setTitle] = useState(brand.title);
  const dispatch = useDispatch();
  const app = useSelector(state => state.app)

  const onSubmit = () => {
    dispatch(editCategory(app.user.token, brand._id, title));
  }
  return (
            <CModal 
              show={show} 
              onClose={close}
            >
              <CModalHeader closeButton>
                <CModalTitle>Edit {brand.title} Category</CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CCol xs="12">
              <CRow>
              {app.error && app.error.type === 'categoryediterror' ?  <CCol xs='12'>
                <CAlert color="danger" closeButton>
                An error occured, please try again
              </CAlert>
                </CCol> : null}
                {app.successedit ? <CCol xs='12'>
                <CAlert color="success">
                Category Edited successfully
              </CAlert>
                </CCol> : null}
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="name">Title</CLabel>
                    <CInput id="name" placeholder="Enter Category Title" required value={title} onChange={(e) => setTitle(e.target.value)} />
                  </CFormGroup>
                </CCol>
                <CCol xs='12'>
                <CButton color="primary" block onClick={onSubmit}>{app.loading ?  <CSpinner color="success" size="sm" /> : 'Edit'}</CButton>
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
