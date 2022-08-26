import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';
import DocumentView from './documentview';

const DocumentViewRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<DocumentView />} />
  </ErrorBoundaryRoutes>
);

export default DocumentViewRoutes;
