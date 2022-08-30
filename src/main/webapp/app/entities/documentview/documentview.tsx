import React, { useState } from 'react';
import EditorApp from './EditorApp';
import DocumentList from './DocumentList';

function documentview() {
  const [selectedDocument, setSelectedDocument] = useState('');
  const handleDocumentSelection = data => {
    setSelectedDocument(data);
    console.log(selectedDocument);
  };
  return (
    <div>
      <DocumentList selectionHandler={handleDocumentSelection} />
      <EditorApp documentData={selectedDocument} />
    </div>
  );
}

export default documentview;
