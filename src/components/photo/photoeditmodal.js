import React, { useState } from 'react'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CTextarea,
  CCol,
  CFormGroup,
  CAlert,
  CInputFile,
  CInput,
  CLabel,
  CSpinner
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useDispatch, useSelector } from 'react-redux';
import { editPhoto } from '../../store/actions/appactions';
import moment from 'moment';


const Modals = ({show, close, brand}) => {
  const [title, setTitle] = useState(brand.title);
  const [photoUrl, setPhotourl] = useState(brand.url);
  const [description, setDescription] = useState(brand.about);
  const dispatch = useDispatch();
  const app = useSelector(state => state.app)
  const [date, setDate] = useState(brand.date);


  const onSubmit = () => {

    dispatch(editPhoto(app.user.token, brand._id, title, description, photoUrl));
  }

  console.log(photoUrl);


  const uploadfile = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'photopost');

    const res = await fetch('https://api.cloudinary.com/v1_1/dedfrilse/image/upload', {
      method: 'POST',
      body: data
    });
    const file = await res.json();
    setPhotourl(file.secure_url)
  }

  const removeImage = () => {
   setPhotourl('');
  }



  return (
            <CModal 
              show={show} 
              onClose={close}
              size='lg'
            >
              <CModalHeader closeButton>
                <CModalTitle>Edit {brand.title} Photo vote</CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CCol xs="12">
              <CRow>
              {app.error && app.error.type === 'createphotoerror' ?  <CCol xs='12'>
                <CAlert color="danger" closeButton>
                An error occured, please try again
              </CAlert>
                </CCol> : null}
                {app.successedit ? <CCol xs='12'>
                <CAlert color="success">
                Photo Edited successfully
              </CAlert>
                </CCol> : null}
                <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="name">Title</CLabel>
                    <CInput id="name" placeholder="Enter your name" required value={title} onChange={(e) => setTitle(e.target.value)} />
                  </CFormGroup>
                </CCol>
                {/* <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="name">Venue</CLabel>
                    <CInput id="name" placeholder="Enter your name" required value={venue} onChange={(e) => setVenue(e.target.value)} />
                  </CFormGroup>
                </CCol>
                <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="date-input">Date</CLabel>
                    <CInput type="date" id="date-input" name="date-input" value={date} onChange={(e) => setDate(e.target.value)} placeholder="date" />
                  </CFormGroup>
                </CCol> */}
                <CCol xs={6}>
                <CLabel htmlFor="file-input">Files upload</CLabel>
                <CInputFile disabled={photoUrl >= 1} id="file-input" name="file-input" onChange={uploadfile}/>
                </CCol>
               {photoUrl  ? 
                   <CCol xs='3' style={{height: 150, marginBottom: 20}}>
                        <CButton onClick={removeImage} variant="ghost" color="transparent" style={{backgroundImage: `url(${photoUrl})`, height: 150, width: '100%', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-end'}}>
                        <CIcon name="cil-x-circle" style={{color: 'red'}} size='lg' />
                        </CButton>      
                   </CCol>
                 : null}
                <CCol xs='12' style={{marginBottom: 30}}>
                    <CLabel htmlFor="textarea-input">Description</CLabel>
                    <CTextarea 
                      name="description" 
                      value={description} 
                      rows="9"
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Description..." 
                    />
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
