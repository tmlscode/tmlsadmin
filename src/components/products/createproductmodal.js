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
  CSelect,
  CFormGroup,
  CAlert,
  CInputFile,
  CInput,
  CLabel,
  CSpinner,
  CTextarea
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../../store/actions/appactions';


const Modals = ({show, close}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photoUrl, setPhotourl] = useState([]);
  const dispatch = useDispatch();
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const app = useSelector(state => state.app)
  const [url, setUrl] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [client, setClient] = useState('');
  const [brand, setBrand] = useState('');
	

  const onSubmit = () => {
    const about = description;   

    dispatch(createProduct(app.user.token, title, about, url, photoUrl, price, category, subcategory, brand, sizes, colors, quantity, client));
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


  const handleColors = (newcolor) => {
      if(!colors.includes(newcolor)){
        setColors([...colors, newcolor])
      }
  }

  const handleSizes = (newsize) => {
    if(!sizes.includes(newsize)){
        setSizes([...sizes, newsize])
    }
  }


  return (
            <CModal 
              show={show} 
              onClose={close}
              size='lg'
            >
              <CModalHeader closeButton>
                <CModalTitle>Create Product</CModalTitle>
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
                    <CLabel htmlFor="name">Price</CLabel>
                    <CInput id="name" placeholder="Enter price" required value={price} onChange={(e) => setPrice(e.target.value)} />
                  </CFormGroup>
                </CCol>
                <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="name">Quantity</CLabel>
                    <CInput id="name" placeholder="Enter your name" required value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                  </CFormGroup>
                </CCol>
                <CCol xs="6">
                <CFormGroup>
                    <CLabel htmlFor="ccmonth">Brand</CLabel>
                    <CSelect custom name="ccmonth" id="ccmonth" value={brand} onChange={(e) => setBrand(e.target.value)}>
                    <option disabled value=''>Enter Brand</option>
                     {app.brands ? app.brands.map(category => {
                       return (
                        <option value={category._id}>{category.title}</option>
                       )
                     }) : null}
                    </CSelect>
                  </CFormGroup>
                </CCol>
                <CCol xs="6">
                <CFormGroup>
                    <CLabel htmlFor="ccmonth">Product Client</CLabel>
                    <CSelect custom name="ccmonth" id="ccmonth" value={client} onChange={(e) => setClient(e.target.value)}>
                    <option disabled value=''>Enter Product Client</option>
                     {app.clients ? app.clients.map(category => {
                       return (
                        <option value={category._id}>{category.title}</option>
                       )
                     }) : null}
                    </CSelect>
                  </CFormGroup>
                </CCol>
                <CCol xs="6">
                <CFormGroup>
                    <CLabel htmlFor="ccmonth">Product Category</CLabel>
                    <CSelect custom name="ccmonth" id="ccmonth" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option disabled value=''>Enter Product Category</option>
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
                    <CLabel htmlFor="ccmonth">Product Type</CLabel>
                    <CSelect custom name="ccmonth" id="ccmonth" value={subcategory} onChange={(e) => setSubcategory(e.target.value)}>
                    <option disabled value=''>Enter Product Type</option>
                     {app.subcategories ? app.subcategories.map(category => {
                       return (
                        <option value={category._id}>{category.title}</option>
                       )
                     }) : null}
                    </CSelect>
                  </CFormGroup>
                </CCol>
                <CCol xs="6">
                <CFormGroup>
                    <CLabel htmlFor="ccmonth">Colors</CLabel> <small>selected colors: {colors.toString()}</small>
                    <CSelect custom name="ccmonth" id="ccmonth" value={color} onChange={(e) => {setColor(e.target.value); handleColors(e.target.value)}}> 
                    <option disabled value=''>Enter Colors</option>
                    {app.colors ? app.colors.map(category => {
                       return (
                        <option value={category.title}>{category.title}</option>
                       )
                     }) : null}
                    </CSelect>
                  </CFormGroup>
                </CCol>
                <CCol xs="6">
                <CFormGroup>
                    <CLabel htmlFor="ccmonth">Sizes</CLabel> <small>selected sizes: {sizes.toString()}</small>
                    <CSelect custom name="ccmonth" id="ccmonth" value={size} onChange={(e) => {setSize(e.target.value); handleSizes(e.target.value)}}> 
                    <option disabled value=''>Enter Sizes</option>
                    {app.sizes ? app.sizes.map(category => {
                       return (
                        <option value={category.title}>{category.title}</option>
                       )
                     }) : null}
                    </CSelect>
                  </CFormGroup>
                </CCol>
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
                <CCol xs={6} style={{marginBottom: 30}}>
                <CLabel htmlFor="file-input">Image upload</CLabel>
                <CInputFile id="file-input" name="file-input" onChange={uploadimagefile} disabled={url}/>
                </CCol>
                <CCol xs={6} style={{marginBottom: 30}}>
                <CLabel htmlFor="file-input">Gallery upload</CLabel>
                <CInputFile id="file-input" name="file-input" onChange={uploadfile}/>
                </CCol>
                {url ?
                   <CCol xs='3' style={{height: 150, marginBottom: 20}}>
                        <CButton variant="ghost" onClick={() => {setUrl('')}} color="transparent" style={{backgroundImage: `url(${url})`, height: 150, width: '100%', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-end'}}>
                        <CIcon name="cil-x-circle" style={{color: 'red'}} size='lg' />
                        </CButton>
                  
                   </CCol>
                 : null}
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
