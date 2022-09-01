import React, { useState, useEffect } from 'react';
import EditorApp from './EditorApp';
import DocumentList from './DocumentList';

function documentview() {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [config, setConfig] = useState(null);
  const [auth, setAuth] = useState(null);

  const handleDocumentSelection = data => {
    setSelectedDocument(data);
  };

  //useEffect gets authToken and sets state for config and auth
  useEffect(() => {
    const getBearerToken = () => {
      var authToken = localStorage.getItem('jhi-authenticationToken') || sessionStorage.getItem('jhi-authenticationToken');
      if (authToken) {
        authToken = JSON.parse(authToken);
        setConfig({ headers: { accept: '*/*', Authorization: `Bearer ${authToken}` } });
        setAuth(authToken);
        return `Bearer ${authToken}`;
      }
      return null;
    };
    getBearerToken();
  }, []);

  return (
    <div>
      {!selectedDocument && <DocumentList selectionHandler={handleDocumentSelection} config={config} />}
      <EditorApp selectedDocument={selectedDocument} config={config} auth={auth} />
    </div>
  );
}

export default documentview;
