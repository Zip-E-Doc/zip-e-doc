import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { IDocument } from 'app/shared/model/document.model';
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
