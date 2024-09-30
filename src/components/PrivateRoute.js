import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = ({ element: Component, ...rest }) => {
  let token = Cookies.get('authToken');

  return token && Object.keys(token).length > 0 ? Component : <Navigate to="/login" />;
};

export default PrivateRoute;
