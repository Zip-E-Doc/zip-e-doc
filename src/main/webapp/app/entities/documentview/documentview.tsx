import React, { useState, useEffect } from 'react';
import EditorApp from './EditorApp';
import DocumentList from './DocumentList';
import axios from './axios.js';
import { useAppSelector } from 'app/config/store';

function documentview() {
  const [selectedDocument, setSelectedDocument] = useState('');
  const [config, setConfig] = useState(null);
  const [auth, setAuth] = useState(null);
  const account = useAppSelector(state => state.authentication.account);

  const handleDocumentSelection = data => {
    setSelectedDocument(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const auth = await axios({
      method: 'post',
      url: `http://localhost:9000/api/authenticate`,
      data: {
        password: account.login,
        username: account.login,
      },
    }).then(response => {
      setConfig({ headers: { accept: '*/*', Authorization: `Bearer ${response.data.id_token}` } });
      setAuth(response.data.id_token);
      console.log(account);
    });
    return auth;
  }

  return (
    <div>
      <DocumentList selectionHandler={handleDocumentSelection} config={config} />
      <EditorApp selectedDocument={selectedDocument} config={config} auth={auth} />
    </div>
  );
}

export default documentview;
