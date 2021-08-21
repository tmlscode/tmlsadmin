import React from 'react'
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import ChartLineSimple from '../charts/ChartLineSimple'
import ChartBarSimple from '../charts/ChartBarSimple'
import {useSelector} from 'react-redux';

const WidgetsDropdown = () => {
  // render
  const app = useSelector(state => state.app)
  const paycustomers = app.payments;

  const totalspecialorders = app.specialorders && app.specialorders.length ? app.specialorders.length : '0';

  const totalevents = app.events && app.events.length ? app.events.length : '0';
  return (
    <CRow>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-primary"
          header={app.allusers ? app.allusers.length : null}
          text="Total Users"
          footerSlot={
            <ChartLineSimple
              pointed
              className="c-chart-wrapper mt-3 mx-3"
              style={{height: '70px'}}
              dataPoints={[]}
              pointHoverBackgroundColor="primary"
            />
          }
        >
          {/* <CDropdown>
            <CDropdownToggle color="transparent">
              <CIcon name="cil-settings"/>
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem>Action</CDropdownItem>
              <CDropdownItem>Another action</CDropdownItem>
              <CDropdownItem>Something else here...</CDropdownItem>
              <CDropdownItem disabled>Disabled action</CDropdownItem>
            </CDropdownMenu>
          </CDropdown> */}
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-info"
          header={paycustomers?.length || '---'}
          text="Orders"
          footerSlot={
            <ChartLineSimple
              pointed
              className="mt-3 mx-3"
              style={{height: '70px'}}
              dataPoints={[]}
              pointHoverBackgroundColor="info"
              options={{ elements: { line: { tension: 0.00001 }}}}
            />
          }
        >
          {/* <CDropdown>
            <CDropdownToggle caret={false} color="transparent">
              <CIcon name="cil-location-pin"/>
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem>Action</CDropdownItem>
              <CDropdownItem>Another action</CDropdownItem>
              <CDropdownItem>Something else here...</CDropdownItem>
              <CDropdownItem disabled>Disabled action</CDropdownItem>
            </CDropdownMenu>
          </CDropdown> */}
        </CWidgetDropdown>
      </CCol>

          {/* <CDropdown>
            <CDropdownToggle color="transparent">
              <CIcon name="cil-settings"/>
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem>Action</CDropdownItem>
              <CDropdownItem>Another action</CDropdownItem>
              <CDropdownItem>Something else here...</CDropdownItem>
              <CDropdownItem disabled>Disabled action</CDropdownItem>
            </CDropdownMenu>
          </CDropdown> */}

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-danger"
          header={totalspecialorders}
          text="Total Messages"
          footerSlot={
            <ChartLineSimple
              className="mt-3"
              style={{height: '70px'}}
              backgroundColor="rgba(255,255,255,.2)"
              dataPoints={[]}
              options={{ elements: { line: { borderWidth: 2.5 }}}}
              pointHoverBackgroundColor="warning"
            />
          }
        >
        </CWidgetDropdown>
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
