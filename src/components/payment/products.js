import React, { useState, useEffect } from 'react'
import {
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CCol,
  CDataTable,
} from '@coreui/react'
import {useSelector} from 'react-redux';


const Modals = ({purchases, show, close}) => {
  const app = useSelector(state => state.app)
  const [products, setProducts] = useState([]);
  
const setting = () => {
    setProducts(purchases);
}

const fields = [{key: 'title'},{key: 'colors'}, {key: 'sizes'}, {key: 'price'}, {key: 'quantity'}]

  return (
            <CModal 
              show={show} 
              onOpened={setting}
              onClose={close}
              size='lg'
            >
              <CModalHeader closeButton>
                <CModalTitle>Products</CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CCol xs="12">
              <CDataTable
            items={products}
            fields={fields}
            hover
            striped
            loading={app.loading}
            alignItems='space-between'
            clickableRows
            />
              </CCol>
              </CModalBody>
              <CModalFooter>
              </CModalFooter>
            </CModal>
  )
}

export default Modals
