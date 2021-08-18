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
    name: 'Product Brand Setup',
    to: '/productsetup',
    icon:  <CIcon content={freeSet.cilTag} customClasses="c-sidebar-nav-icon"/>,
  }, 
  {
    _tag: 'CSidebarNavItem',
    name: 'Product Name Setup',
    to: '/productnamesetup',
    icon: <CIcon content={freeSet.cilApps} customClasses="c-sidebar-nav-icon"/>,
  }, 
  {
    _tag: 'CSidebarNavItem',
    name: 'Catalog Number Setup',
    to: '/catalognumbersetup',
    icon: <CIcon content={freeSet.cilApps} customClasses="c-sidebar-nav-icon"/>,
  },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Trendingbrands',
  //   to: '/trendingbrands',
  //   icon: <CIcon content={freeSet.cilTag} customClasses="c-sidebar-nav-icon"/>,
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Products Registration Form',
  //   to: '/products',
  //   icon: <CIcon content={freeSet.cilCart} customClasses="c-sidebar-nav-icon"/>,
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Location Registration Form',
  //   to: '/locations',
  //   icon: <CIcon content={freeSet.cilLocationPin} customClasses="c-sidebar-nav-icon"/>,
  // },
  {
    _tag: 'CSidebarNavItem',
    name: 'Received Orders',
    to: '/payment',
    icon: <CIcon content={freeSet.cilCash} customClasses="c-sidebar-nav-icon"/>,
  },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Special Orders',
  //   to: '/specialorders',
  //   icon: <CIcon content={freeSet.cilCash} customClasses="c-sidebar-nav-icon"/>,
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Events Rating',
  //   to: '/events',
  //   icon: <CIcon name="cil-calendar" customClasses="c-sidebar-nav-icon"/>,
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Photos Rating',
  //   to: '/photos',
  //   icon: <CIcon content={freeSet.cilImage} customClasses="c-sidebar-nav-icon"/>,
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Site Customers',
  //   to: '/sitecustomers',
  //   icon: <CIcon name="cil-user" customClasses="c-sidebar-nav-icon"/>,
  // },  
  {
    _tag: 'CSidebarNavItem',
    name: 'Admin Users',
    to: '/users',
    icon: <CIcon name="cil-user" customClasses="c-sidebar-nav-icon"/>,
  },
  
  
  
  
  
]

export default _nav
