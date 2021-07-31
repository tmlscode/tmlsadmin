import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {sideBar} from '../store/actions/appactions';
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

// sidebar nav config
import navigation from './_nav'

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.app)

  return (
    <CSidebar
      show={show.sidebarShow}
      onShowChange={(val) => dispatch(sideBar(val))}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <img src='https://res.cloudinary.com/dqf4lqxyi/image/upload/v1619334684/Logo_iuko45.png' style={{width: 200, objectFit: 'contain'}}/>
      </CSidebarBrand>
      <CSidebarNav>

        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"/>
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
