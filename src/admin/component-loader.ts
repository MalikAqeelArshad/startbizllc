import { ComponentLoader } from 'adminjs';

const componentLoader = new ComponentLoader();

export const Components = {
   Dashboard: componentLoader.add('Dashboard', '../components/dashboard'),
   // other custom components
 }

export default componentLoader;
