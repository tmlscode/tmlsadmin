import React from 'react';

// const Toaster = React.lazy(() => import('./views/notifications/toaster/Toaster'));
// const Tables = React.lazy(() => import('./views/base/tables/Tables'));

// const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'));
// const Cards = React.lazy(() => import('./views/base/cards/Cards'));
// const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'));
// const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'));
// const BasicForms = React.lazy(() => import('./views/base/forms/BasicForms'));

// const Jumbotrons = React.lazy(() => import('./views/base/jumbotrons/Jumbotrons'));
// const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'));
// const Navbars = React.lazy(() => import('./views/base/navbars/Navbars'));
// const Navs = React.lazy(() => import('./views/base/navs/Navs'));
// const Paginations = React.lazy(() => import('./views/base/paginations/Pagnations'));
// const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'));
// const ProgressBar = React.lazy(() => import('./views/base/progress-bar/ProgressBar'));
// const Switches = React.lazy(() => import('./views/base/switches/Switches'));

// const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'));
// const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'));
// const BrandButtons = React.lazy(() => import('./views/buttons/brand-buttons/BrandButtons'));
// const ButtonDropdowns = React.lazy(() => import('./views/buttons/button-dropdowns/ButtonDropdowns'));
// const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'));
// const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'));
// const Charts = React.lazy(() => import('./views/charts/Charts'));
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
// const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'));
// const Flags = React.lazy(() => import('./views/icons/flags/Flags'));
// const Brands = React.lazy(() => import('./views/icons/brands/Brands'));
// const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'));
// const Badges = React.lazy(() => import('./views/notifications/badges/Badges'));
// const Modals = React.lazy(() => import('./views/notifications/modals/Modals'));
// const Colors = React.lazy(() => import('./views/theme/colors/Colors'));
// const Typography = React.lazy(() => import('./views/theme/typography/Typography'));
// const Widgets = React.lazy(() => import('./views/widgets/Widgets'));
const Users = React.lazy(() => import('./components/users'));
// const User = React.lazy(() => import('./views/users/User'));
// const Ken = React.lazy(() => import('./views/ken/ken'));
const Brand = React.lazy(() => import('./components/brands'));
const Category = React.lazy(() => import('./components/categories'));
const Subcategory = React.lazy(() => import('./components/subcategories'));
const Events = React.lazy(() => import('./components/Events'));
const Photo = React.lazy(() => import('./components/photo'));
const Product = React.lazy(() => import('./components/products/index'));
const Location = React.lazy(() => import('./components/locations'));


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/locations', exact: true, name: 'location', component: Location },
  { path: '/productsetup', exact: true, name: 'product setup', component: Brand },
  { path: '/products', exact: true, name: ' Products', component: Product },
  { path: '/productclients', exact: true, name: 'product clients', component: Category },
  { path: '/productscategories', exact: true, name: 'products categories', component: Subcategory },
  { path: '/events', exact: true, name: 'Events', component: Events },
  { path: '/photos', exact: true, name: 'Photo', component: Photo },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/users', exact: true,  name: 'Users', component: Users },
];

export default routes;
