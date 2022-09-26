import React, { useState, useEffect } from 'react';
import axios from './axios.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'reactstrap';
import DeleteModal from './DeleteModal';
import { useAppSelector } from 'app/config/store';

function DocumentList({ selectionHandler, handleTemplateValue, config }) {
  const [documents, setDocuments] = useState([]);
  const [newFileData, setNewFileData] = useState(null);
  const [showCreateDocumentInput, setShowCreateDocumentInput] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [templateSelected, setTemplateSelected] = useState('');
  const [searchText, setSearchText] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [documentForDeletion, setDocumentForDeletion] = useState(null);
  const today = new Date().toISOString().substring(0, 10);
  //assigned logged in account information to account
  const account = useAppSelector(state => state.authentication.account);

  const handleCreateDocumentInput = () => {
    setShowCreateDocumentInput(!showCreateDocumentInput);
  };

  const handleShowTemplates = () => {
    setShowTemplates(!showTemplates);
  };

  //when text field changes, setSearchText with updated value
  const handleSearchText = event => {
    setSearchText(event.target.value);
  };

  //Retrieving documentList from database and sorting by modifiedDate descending
  //then by Id descending
  async function fetchDocuments() {
    const documentList = await axios.get('/documents/user', config).then(response => {
      setDocuments(response.data);
    });
    return documentList;
  }

  //Posts document to S3 bucket with unique key and blank data
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

  //Sets initial values for document then passes new document data to editor
  async function handleCreateDocument(e) {
    const newConfig = getBearerToken();
    e.preventDefault();
    let newDocument = await axios
      .post(
        '/documents',
        {
          documentTitle: e.target[0].value,
          createdDate: new Date(),
          modifiedDate: new Date(),
          s3key: e.target[0].value,
          userName: null,
        },
        newConfig
      )
      .then(response => {
        selectionHandler(response.data);
        if (templateSelected !== '') {
          handleTemplateValue(templateSelected);
        }
        setNewFileData(response.data);
      });
  }

  const handleDeleteDocument = document => {
    setShowDeleteModal(true);
    setDocumentForDeletion(document);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const deletionConfirmation = () => {
    axios.delete(`/documents/${documentForDeletion.id}`, config);
    handleCloseDeleteModal();
    setTimeout(() => {
      fetchDocuments();
    }, 1200);
  };

  function getDifferenceInDays(date1, date2) {
    let newDate1 = new Date(date1);
    let newDate2 = new Date(date2);
    let difference = newDate1.getTime() - newDate2.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return TotalDays;
  }

  return (
    <div className="document-list gutters">
      <div className="flex flex-space-between">
        <input
          type="text"
          className="form-control input-form"
          onChange={handleSearchText}
          placeholder="Search"
          aria-label="Search"
          aria-describedby="basic-addon1"
        />
        {!showCreateDocumentInput && (
          <div className="flex flex-end">
            <button
              className="btn btn-outline-info btn-template document-list-button"
              onClick={() => {
                handleCreateDocumentInput();
                handleShowTemplates();
              }}
            >
              New From Template
            </button>
            <button className="btn btn-outline-info document-list-button" onClick={handleCreateDocumentInput}>
              New Blank Document
            </button>
          </div>
        )}
        {showCreateDocumentInput && (
          <form onSubmit={handleCreateDocument}>
            <input className="form-control input-form me-2" name="newDocumentName" placeholder="document name" />
            <button type="submit" className="btn btn-outline-info document-list-button">
              Create Document
            </button>
          </form>
        )}
      </div>

      {showTemplates && (
        <div className="flex">
          <div
            className={`card pointer p-2 ${templateSelected === 'Letter' ? 'selected' : ''}`}
            onClick={() => (templateSelected === 'Letter' ? setTemplateSelected('') : setTemplateSelected('Letter'))}
          >
            <img src="../../content/images/letter.png" className="card-img-top" alt="..." />
            <div className="card-body-custom">
              <h5 className="card-title">Letter</h5>
            </div>
          </div>
          <div
            className={`card pointer p-2 ${templateSelected === 'Resume' ? 'selected' : ''}`}
            onClick={() => (templateSelected === 'Resume' ? setTemplateSelected('') : setTemplateSelected('Resume'))}
          >
            <img src="../../content/images/resume.png" className="card-img-top" alt="..." />
            <div className="card-body-custom">
              <h5 className="card-title">Resume</h5>
            </div>
          </div>
          <div
            className={`card pointer p-2 ${templateSelected === 'Meeting' ? 'selected' : ''}`}
            onClick={() => (templateSelected === 'Meeting' ? setTemplateSelected('') : setTemplateSelected('Meeting'))}
          >
            <img src="../../content/images/meeting.png" className="card-img-top" alt="..." />
            <div className="card-body-custom">
              <h5 className="card-title">Meeting Notes</h5>
            </div>
          </div>
        </div>
      )}

      <h5 className="modified-header">Today</h5>
      <table className="table table-striped table-hover table-document">
        <colgroup>
          <col style={{ width: '50%' }} />
          <col style={{ width: '23%' }} />
          <col style={{ width: '23%' }} />
          <col style={{ width: '4%' }} />
        </colgroup>
        <thead>
          <tr>
            <th>Document Title</th>
            <th>Last Modified</th>
            <th>Owner</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {documents &&
            documents
              .filter(documentRow => documentRow.modifiedDate === today)
              .filter(documentRow => documentRow.documentTitle.toLowerCase().includes(searchText.toLowerCase()))
              .map(documentRow => (
                <tr key={documentRow.id} className="document-row">
                  <td onClick={() => selectionHandler(documentRow)} className="row-clickable">
                    {documentRow.documentTitle}
                  </td>
                  <td onClick={() => selectionHandler(documentRow)} className="row-clickable">
                    {documentRow.modifiedDate}
                  </td>
                  <td onClick={() => selectionHandler(documentRow)} className="row-clickable">
                    {documentRow.userName.login}
                  </td>
                  <td>
                    {documentRow.userName.login === account.login && (
                      <Button variant="outline-info" className="reactstrap-button">
                        <FontAwesomeIcon icon={faTrashCan} onClick={() => handleDeleteDocument(documentRow)} size="sm" />
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
        </tbody>
      </table>

      <h5 className="modified-header">Last 7 Days</h5>
      <table className="table table-striped table-hover table-document">
        <colgroup>
          <col style={{ width: '50%' }} />
          <col style={{ width: '23%' }} />
          <col style={{ width: '23%' }} />
          <col style={{ width: '4%' }} />
        </colgroup>
        <thead>
          <tr>
            <th>Document Title</th>
            <th>Last Modified</th>
            <th>Owner</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {documents &&
            documents
              .filter(
                documentRow =>
                  getDifferenceInDays(today, documentRow.modifiedDate) > 0 && getDifferenceInDays(today, documentRow.modifiedDate) <= 7
              )
              .filter(documentRow => documentRow.documentTitle.toLowerCase().includes(searchText.toLowerCase()))
              .map(documentRow => (
                <tr key={documentRow.id} className="document-row">
                  <td onClick={() => selectionHandler(documentRow)} className="row-clickable">
                    {documentRow.documentTitle}
                  </td>
                  <td onClick={() => selectionHandler(documentRow)} className="row-clickable">
                    {documentRow.modifiedDate}
                  </td>
                  <td onClick={() => selectionHandler(documentRow)} className="row-clickable">
                    {documentRow.userName.login}
                  </td>
                  <td>
                    {documentRow.userName.login === account.login && (
                      <Button variant="outline-info" className="reactstrap-button">
                        <FontAwesomeIcon icon={faTrashCan} onClick={() => handleDeleteDocument(documentRow)} size="sm" />
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
        </tbody>
      </table>

      <h5 className="modified-header">Earlier</h5>
      <table className="table table-striped table-hover table-document">
        <colgroup>
          <col style={{ width: '50%' }} />
          <col style={{ width: '23%' }} />
          <col style={{ width: '23%' }} />
          <col style={{ width: '4%' }} />
        </colgroup>
        <thead>
          <tr>
            <th>Document Title</th>
            <th>Last Modified</th>
            <th>Owner</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {documents &&
            documents
              .filter(documentRow => getDifferenceInDays(today, documentRow.modifiedDate) > 7)
              .filter(documentRow => documentRow.documentTitle.toLowerCase().includes(searchText.toLowerCase()))
              .map(documentRow => (
                <tr key={documentRow.id} className="document-row">
                  <td onClick={() => selectionHandler(documentRow)} className="row-clickable">
                    {documentRow.documentTitle}
                  </td>
                  <td onClick={() => selectionHandler(documentRow)} className="row-clickable">
                    {documentRow.modifiedDate}
                  </td>
                  <td onClick={() => selectionHandler(documentRow)} className="row-clickable">
                    {documentRow.userName.login}
                  </td>
                  <td>
                    {documentRow.userName.login === account.login && (
                      <Button variant="outline-info" className="reactstrap-button">
                        <FontAwesomeIcon icon={faTrashCan} onClick={() => handleDeleteDocument(documentRow)} size="sm" />
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
      <DeleteModal show={showDeleteModal} handleClose={handleCloseDeleteModal} deletionConfirmation={deletionConfirmation} />
    </div>
  );
}

export default DocumentList;
