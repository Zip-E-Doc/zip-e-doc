import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import SharedUser from './shared-user';
import SharedUserDetail from './shared-user-detail';
import SharedUserUpdate from './shared-user-update';
import SharedUserDeleteDialog from './shared-user-delete-dialog';

const SharedUserRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<SharedUser />} />
    <Route path="new" element={<SharedUserUpdate />} />
    <Route path=":id">
      <Route index element={<SharedUserDetail />} />
      <Route path="edit" element={<SharedUserUpdate />} />
      <Route path="delete" element={<SharedUserDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default SharedUserRoutes;
