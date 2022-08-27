import React, { useState, useEffect } from 'react';
import axios from './axios.js';

function DocumentList({ selectionHandler }) {
  const [documents, setDocuments] = React.useState([]);

  let config = {
    headers: { accept: '*/*', Authorization: `Bearer token` },
  };

  useEffect(() => {
    async function fetchData() {
      const auth = await axios({
        method: 'post',
        url: `http://localhost:9000/api/authenticate`,
        data: {
          password: 'admin',
          username: 'admin',
        },
      })
        .then(response => {
          config = { headers: { accept: '*/*', Authorization: `Bearer ${response.data.id_token}` } };
        })
        .then(withAuth => {
          axios.get('/documents/user', config).then(response => {
            console.log(response.data);
            setDocuments(response.data);
          });
        });
      return config;
    }
    fetchData();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>Document Title</td>

            <td>Last Modified</td>
            <td>Owner</td>
          </tr>
        </thead>
        <tbody>
          {documents.map(documentRow => (
            <tr key={documentRow.id} onClick={() => selectionHandler(documentRow)}>
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
