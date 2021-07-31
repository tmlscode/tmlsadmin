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
import { createTrending, clearsuccessdata} from '../../store/actions/appactions';
import CIcon from '@coreui/icons-react'

const Modals = ({show, close}) => {
  const dispatch = useDispatch();
  const app = useSelector(state => state.app)
  const [brand, setBrand] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('');
  const [gender, setGender] = useState('');

  const onSubmit = () => {
    console.log(app.user.token, url, brand, category, gender);
    dispatch(createTrending(app.user.token, url, brand, category, gender ));
  }

  useEffect(() => {
    if(app.successtrending){
      setBrand('')
      setCategory('')
      setGender('');
      setUrl('');
      dispatch(clearsuccessdata());
    }else{
      return null
    }
  })

  const uploadimagefile = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'photopost');

    const res = await fetch('https://api.cloudinary.com/v1_1/dedfrilse/image/upload', {
      method: 'POST',
      body: data
    });
    const file = await res.json();
    setUrl(file.secure_url)
  }

  return (
            <CModal 
              show={show} 
              onClose={close}
            >
              <CModalHeader closeButton>
                <CModalTitle>Create Trending brands</CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CCol xs="12">
              <CRow>
              {app.error && app.error.type === 'trendingerror' ?  <CCol xs='12'>
                <CAlert color="danger" closeButton>
                An error occured, please try again
              </CAlert>
                </CCol> : null}
                {app.successtrending ? <CCol xs='12'>
                <CAlert color="success">
                Trendingbrand Created successfully
              </CAlert>
                </CCol> : null}
                <CCol xs="12">
                <CFormGroup>
                    <CLabel htmlFor="brand">Brand</CLabel>
                    <CSelect custom name="brand" id="brand" value={brand} onChange={(e) => setBrand(e.target.value)}>
                    <option disabled value=''>Enter Brand</option>
                     {app.brands ? app.brands.map(category => {
                       return (
                        <option value={category._id}>{category.title}</option>
                       )
                     }) : null}
                    </CSelect>
                  </CFormGroup>
                </CCol>
                <CCol xs="12">
                <CFormGroup>
                    <CLabel htmlFor="category">Category</CLabel>
                    <CSelect custom name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option disabled value=''>Enter Catgory</option>
                        <option value='clothes'>Clothing</option>
                        <option value='shoes'>Shoes</option>
                    </CSelect>
                  </CFormGroup>
                </CCol>
                <CCol xs="12">
                <CFormGroup>
                    <CLabel htmlFor="gender">Gender</CLabel>
                    <CSelect custom name="gender" id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option disabled value=''>Enter Gender</option>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                    </CSelect>
                  </CFormGroup>
                </CCol>
                <CCol xs={12} style={{marginBottom: 20}}>
                <CLabel htmlFor="imageupload">Image upload</CLabel>
                <CInputFile id="imageupload" name="imageupload" onChange={uploadimagefile} disabled={url}/>
                </CCol>
                {url ?
                   <CCol xs='3' style={{height: 150, marginBottom: 20}}>
                        <CButton variant="ghost" onClick={() => {setUrl('')}} color="transparent" style={{backgroundImage: `url(${url})`, height: 150, width: '100%', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-end'}}>
                        <CIcon name="cil-x-circle" style={{color: 'red'}} size='lg' />
                        </CButton>
                  
                   </CCol>
                 : null}
                <CCol xs='12'>
                <CButton  color="primary" block onClick={() => onSubmit()}>{app.loading ?  <CSpinner color="white" size="sm" /> : 'create'}</CButton>
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
