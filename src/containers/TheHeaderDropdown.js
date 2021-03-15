import React from 'react'
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import { useSelector, useDispatch } from 'react-redux'
import {Logout} from '../store/actions/appactions';
import Cookies from 'js-cookie';

const TheHeaderDropdown = () => {
  const dispatch = useDispatch()

  const onLogout = () => {
    Cookies.remove('token');
    dispatch(Logout())
    window.location.reload();
  }
  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Account</strong>
        </CDropdownItem>
        <CDropdownItem onClick={onLogout}>
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
