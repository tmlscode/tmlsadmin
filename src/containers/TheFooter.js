import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        {/* <a href="https://tujengetech.co.tz" target="_blank" rel="noopener noreferrer"></a> */}
        {/* <span className="ml-1">&copy;</span> */}
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a href="https://tujengetech.co.tz" target="_blank" rel="noopener noreferrer">Tujengetechnologies</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
