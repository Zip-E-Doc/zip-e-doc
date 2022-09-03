import React, { useState, useEffect } from 'react';
import EditorApp from './EditorApp';
import DocumentList from './DocumentList';
import templates from './templates';

function documentview() {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [config, setConfig] = useState(null);
  const [auth, setAuth] = useState(null);
  const [templateValue, setTemplateValue] = useState('');

  const handleDocumentSelection = data => {
    setSelectedDocument(data);
  };

  const handleTemplateValue = data => {
    if (data === 'Letter') {
      setTemplateValue(templates.letter);
    } else if (data === 'Resume') {
      setTemplateValue(templates.resume);
    } else if (data === 'Meeting') {
      setTemplateValue(templates.meeting);
    } else {
      setTemplateValue('');
    }
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
      {!selectedDocument && (
        <DocumentList selectionHandler={handleDocumentSelection} handleTemplateValue={handleTemplateValue} config={config} />
      )}
      {selectedDocument && <EditorApp selectedDocument={selectedDocument} templateValue={templateValue} config={config} auth={auth} />}
    </div>
  );
}

export default documentview;
