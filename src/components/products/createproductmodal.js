import React, { useState, useRef, useMemo } from 'react'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CCol,
  CSelect,
  CFormGroup,
  CAlert,
  CInputFile,
  CInput,
  CLabel,
  CSpinner
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useDispatch, useSelector } from 'react-redux';
import { createEvent } from '../../store/actions/appactions';
import JoditEditor from "jodit-react";
import he from 'he';
import moment from 'moment';


const Modals = ({show, close}) => {
  const [title, setTitle] = useState('');
  const [photoUrl, setPhotourl] = useState([]);
  const [venue, setVenue] = useState('');
  const dispatch = useDispatch();
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const app = useSelector(state => state.app)
  const editor = useRef(null)
	const [content, setContent] = useState('');
  const [date, setDate] = useState(new Date());
	
	const config = {
		buttons: [ "bold", "italic", "underline", "strikethrough", "|", "ul", "ol", "|", "center", "left", "right", "justify", "|", "link", "image"],
    uploader: { insertImageAsBase64URI: true },
    removeButtons: ["brush", "file"],
    showXPathInStatusbar: false,
    showCharsCounter: false,
    showWordsCounter: false,
    toolbarAdaptive: false
	}

  const onSubmit = () => {
    const about = he.encode(content, {
      'encodeEverything': true
    });

    const dbdate = moment(date).format();
    

    dispatch(createEvent(app.user.token, title, about, venue, photoUrl, dbdate));
  }

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
    setPhotourl([...photoUrl, file.secure_url])
  }

  const removeImage = (url) => {
    let array = [];
    array.push(photoUrl);
    var filtered = array.filter(function(value, index, arr){ 
      return value !== url;
  });
    setPhotourl(filtered);
  }



  return (
            <CModal 
              show={show} 
              onClose={close}
              size='lg'
            >
              <CModalHeader closeButton>
                <CModalTitle>Create Event</CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CCol xs="12">
              <CRow>
              {app.error && app.error.type === 'createproducterror' ?  <CCol xs='12'>
                <CAlert color="danger" closeButton>
                An error occured, please try again
              </CAlert>
                </CCol> : null}
                {app.successproduct ? <CCol xs='12'>
                <CAlert color="success">
                Product Created successfully
              </CAlert>
                </CCol> : null}
                <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="name">Title</CLabel>
                    <CInput id="name" placeholder="Enter your name" required value={title} onChange={(e) => setTitle(e.target.value)} />
                  </CFormGroup>
                </CCol>
                <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="name">Venue</CLabel>
                    <CInput id="name" placeholder="Enter your name" required value={venue} onChange={(e) => setVenue(e.target.value)} />
                  </CFormGroup>
                </CCol>
                <CCol xs="6">
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
                <CCol xs="6">
                <CFormGroup>
                    <CLabel htmlFor="ccmonth">Subcategory</CLabel>
                    <CSelect custom name="ccmonth" id="ccmonth" value={subcategory} onChange={(e) => setSubcategory(e.target.value)}>
                     {app.subcategories ? app.subcategories.map(category => {
                       return (
                        <option value={category._id}>{category.title}</option>
                       )
                     }) : null}
                    </CSelect>
                  </CFormGroup>
                </CCol>
                <CCol xs={6} style={{marginBottom: 30}}>
                <CLabel htmlFor="file-input">Files upload</CLabel>
                <CInputFile id="file-input" name="file-input" onChange={uploadfile}/>
                </CCol>
               {photoUrl && photoUrl.length > 0 ? 
                photoUrl.map((photo, index) => {
                 return (
                   <CCol xs='3' style={{height: 150, marginBottom: 20}}>
                        <CButton onClick={() => removeImage(index)} variant="ghost" color="transparent" style={{backgroundImage: `url(${photo})`, height: 150, width: '100%', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-end'}}>
                        <CIcon name="cil-x-circle" style={{color: 'red'}} size='lg' />
                        </CButton>
                  
                   </CCol>
                 )
               }) : null}
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
