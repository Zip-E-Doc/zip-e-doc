import React, { useRef, useEffect, useMemo, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from './axios.js';
import { debounce } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faCloudArrowDown } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useAppSelector } from 'app/config/store';
import SharedDocument from './SharedDocument';

function EditorApp({ selectedDocument, templateValue, config, auth }) {
  const [editorContent, setEditorContent] = useState('');
  //content that the TinyMCE editor initializes to
  const [initialContent, setInitialContent] = useState('');
  const [saveStatus, setSaveStatus] = useState('');
  //toggles TinyMCE editability
  const [readOnly, setReadOnly] = useState(false);
  const editorRef = useRef(null);
  //assigned logged in account information to account
  const account = useAppSelector(state => state.authentication.account);
  const today = new Date().toISOString().substring(0, 10);

  useEffect(() => {
    if (selectedDocument) {
      // check if logged in user is the owner of the document
      selectedDocument.userName.login !== account.login ? setReadOnly(true) : setReadOnly(false);
    }
    if (selectedDocument && templateValue === '') {
      async function fetchDataFromBucket() {
        let appConfig = {
          headers: {
            accept: '*/*',
            Authorization: `Bearer ${auth}`,
            'Content-Type': 'text/plain',
          },
        };
        const fileContent = await axios.post('/documents/data/s3', selectedDocument.s3key, appConfig);

        return fileContent.data;
      }
      fetchDataFromBucket().then(response => {
        setInitialContent(response);
      });
    } else if (templateValue !== '') {
      setInitialContent(templateValue);
    }
  }, [selectedDocument, templateValue]);

  //Rewrites bucket with updated editor content
  async function updateData(content) {
    let updatedDocument = await axios
      .post(
        '/documents/data',
        {
          key: selectedDocument.s3key,
          data: content,
        },
        config
      )
      .then(response => {
        console.log(response.data);
      });
    return updatedDocument;
  }

  //Called when editorContent is changed and when
  //Component is initilaized
  useEffect(() => {
    if (editorContent !== '') {
      updateData(editorContent);
      if (today !== selectedDocument.modifiedDate) {
        console.log('modifiedDate updated');
        updateModifiedDate();
      }
      handleSaveStatus();
    }
  }, [editorContent]);

  const updateModifiedDate = async () => {
    selectedDocument.modifiedDate = today;
    const response = await axios.put(`/documents/${selectedDocument.id}`, selectedDocument, config);
  };

  const handleSaveStatus = () => {
    setSaveStatus('Saving.');
    setTimeout(() => {
      setSaveStatus('Saving..');
      setTimeout(() => {
        setSaveStatus('Saving...');
        setTimeout(() => {
          setSaveStatus('Saved.');
          setTimeout(() => {
            setSaveStatus('');
          }, 3000);
        }, 450);
      }, 450);
    }, 450);
  };

  const updateDataInBucket = content => {
    setEditorContent(content);
  };

  //Debouncing limits the number of calls to the RestEndpoint
  const debouncedHandleTextEditorChange = useMemo(() => debounce(updateDataInBucket, 500), []);

  // initial key liy4lig7ryv9z846a2okl5qh5c1dsf5ir7s9ye8xzg3dpqwu
  // backup key 6kjmu0il8i8i3w2t4c64pnpqvp7r4hk5l8pg1maezk35gw0x
  return (
    <div className="gutters">
      <nav className="flex flex-space-between">
        <h2>{selectedDocument.documentTitle}</h2>
        <div className="flex save-status">
          {saveStatus !== 'Saved.' && saveStatus && <FontAwesomeIcon icon={faArrowsRotate as IconProp} className="flex-icon" />}
          {saveStatus === 'Saved.' && <FontAwesomeIcon icon={faCloudArrowDown as IconProp} className="flex-icon" />}
          <p>{saveStatus}</p>
        </div>
        <div className="flex">
          {!readOnly && <SharedDocument config={config} selectedDocument={selectedDocument} />}
          <a href="./document/view">
            <button className="btn btn-outline-info">Back to Document List</button>
          </a>
        </div>
      </nav>
      <Editor
        disabled={readOnly}
        apiKey="6kjmu0il8i8i3w2t4c64pnpqvp7r4hk5l8pg1maezk35gw0x"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={initialContent}
        init={{
          height: 500,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'code',
            'help',
            'wordcount',
          ],
          menubar: 'file edit insert view format table tools',
          removed_menuitems: 'newdocument',
          toolbar:
            'undo redo | blocks fontsize fontfamily | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          font_family_formats:
            'Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Calibri=calibri; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Roboto=roboto,sans-serif; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Tangerine=tangerine,helvetica; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats',
          font_size_formats: '8pt 10pt 11pt 12pt 14pt 18pt 24pt 30pt 36pt 64pt 96pt',
          content_style:
            "body { font-family: Helvetica,Arial,sans-serif; font-size:14px } @import url('https://fonts.googleapis.com/css2?family=Tangerine&display=swap'); @import url('https://fonts.googleapis.com/css?family=Roboto');",
          setup: function (ed) {
            ed.on('keyup change paste undo redo', function (e) {
              debouncedHandleTextEditorChange(ed.getContent());
            });
          },
        }}
      />
    </div>
  );
}

export default EditorApp;
