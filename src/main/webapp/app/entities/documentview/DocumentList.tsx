import React, { useState, useEffect } from 'react';
import axios from './axios.js';

function DocumentList({ selectionHandler, config }) {
  const [documents, setDocuments] = useState([]);
  const [newFileData, setNewFileData] = useState(null);
  const [showCreateDocumentInput, setShowCreateDocumentInput] = useState(false);

  const handleCreateDocumentInput = () => {
    setShowCreateDocumentInput(!showCreateDocumentInput);
  };

  //Retrieving documentList from database and sorting by modifiedDate descending
  //then by Id descending
  async function fetchDocuments() {
    const documentList = await axios.get('/documents/user', config).then(response => {
      setDocuments(response.data);
    });
    return documentList;
  }

  async function addFileToBucket(data) {
    let newDocument = await axios
      .post(
        '/documents/data',
        {
          key: data.s3key,
          data: '',
        },
        config
      )
      .then(response => {
        console.log(response.data);
      });
    return newDocument;
  }

  //Called when DocumentList loads and when config is updated
  useEffect(() => {
    if (config) {
      fetchDocuments();
    }
  }, [config]);

  //Called when DocumentList loads and when newFileData is updated
  useEffect(() => {
    if (newFileData) {
      addFileToBucket(newFileData);
    }
  }, [newFileData]);

  const getBearerToken = () => {
    var authToken = localStorage.getItem('jhi-authenticationToken') || sessionStorage.getItem('jhi-authenticationToken');
    if (authToken) {
      authToken = JSON.parse(authToken);
      return { headers: { accept: '*/*', Authorization: `Bearer ${authToken}` } };
    }
    return null;
  };

  async function handleCreateDocument(e) {
    const newConfig = getBearerToken();
    e.preventDefault();
    console.log(e.target[0].value);
    let newDocument = await axios
      .post(
        '/documents',
        {
          documentTitle: e.target[0].value,
          createdDate: new Date().toISOString().substring(0, 10),
          modifiedDate: new Date().toISOString().substring(0, 10),
          s3key: e.target[0].value,
          userName: null,
        },
        newConfig
      )
      .then(response => {
        selectionHandler(response.data);
        setNewFileData(response.data);
        fetchDocuments();
      });
  }

  return (
    <div className="document-list gutters">
      {!showCreateDocumentInput && (
        <div className="flex flex-end">
          <button className="btn btn-outline-info" onClick={handleCreateDocumentInput}>
            New Document
          </button>
        </div>
      )}
      {showCreateDocumentInput && (
        <form onSubmit={handleCreateDocument}>
          <input className="form-control me-2" name="newDocumentName" placeholder="document name" />
          <button type="submit" className="btn btn-outline-info">
            Create Document
          </button>
        </form>
      )}

      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Document Title</th>
            <th>Last Modified</th>
            <th>Owner</th>
          </tr>
        </thead>
        <tbody>
          {documents &&
            documents.map(documentRow => (
              <tr key={documentRow.id} onClick={() => selectionHandler(documentRow)} className="row-clickable">
                <td>{documentRow.documentTitle}</td>
                <td>{documentRow.modifiedDate}</td>
                <td>{documentRow.userName.login}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default DocumentList;
