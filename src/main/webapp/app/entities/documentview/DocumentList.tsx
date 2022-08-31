import React, { useState, useEffect } from 'react';
import axios from './axios.js';

function DocumentList({ selectionHandler, config }) {
  const [documents, setDocuments] = useState([]);

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
          data: "<p>You can't see this</p>",
        },
        config
      )
      .then(response => {
        console.log(response.data);
      });
    return newDocument;
  }

  useEffect(() => {
    if (config) {
      fetchDocuments();
    }
  }, [config]);

  async function handleCreateDocument(e) {
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
        config
      )
      .then(response => {
        selectionHandler(response.data);
        fetchDocuments();
        addFileToBucket(response.data);
      });
  }

  return (
    <div>
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
              <tr key={documentRow.id} onClick={() => selectionHandler(documentRow)}>
                <td>{documentRow.documentTitle}</td>
                <td>{documentRow.modifiedDate}</td>
                <td>{documentRow.userName.login}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <button className="btn btn-outline-info">New Document</button>
      <form onSubmit={handleCreateDocument}>
        <input className="form-control me-2" name="newDocumentName" placeholder="document name" />
        <button type="submit" className="btn btn-outline-info">
          Create Document
        </button>
      </form>
    </div>
  );
}

export default DocumentList;
