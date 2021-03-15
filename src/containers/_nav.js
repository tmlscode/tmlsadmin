import React from 'react'
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Users',
    to: '/users',
    icon: <CIcon name="cil-user" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Brands',
    to: '/brands',
    icon:  <CIcon content={freeSet.cilTag} customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Categories',
    to: '/category',
    icon: <CIcon content={freeSet.cilApps} customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Subcategories',
    to: '/subcategory',
    icon: <CIcon content={freeSet.cilApps} customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Products',
    to: '/products',
    icon: <CIcon content={freeSet.cilCart} customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Events',
    to: '/events',
    icon: <CIcon name="cil-calendar" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Photos',
    to: '/photos',
    icon: <CIcon content={freeSet.cilImage} customClasses="c-sidebar-nav-icon"/>,
  },
  
]

export default _nav
