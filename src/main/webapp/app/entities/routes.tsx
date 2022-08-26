import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Document from './document';
import SharedUser from './shared-user';
import DocumentView from './documentview/documentview';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="document/*" element={<Document />} />
        <Route path="shared-user/*" element={<SharedUser />} />
        <Route path="document/view" element={<DocumentView />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
