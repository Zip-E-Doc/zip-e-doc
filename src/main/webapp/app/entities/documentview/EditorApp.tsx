import React, { useRef, useEffect, useMemo, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from './axios.js';
import { debounce } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faCloudArrowDown } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

function EditorApp({ selectedDocument, config, auth }) {
  const [editorContent, setEditorContent] = useState('');
  const [initialContent, setInitialContent] = useState('');
  const [saveStatus, setSaveStatus] = useState('');
  const editorRef = useRef(null);

  useEffect(() => {
    if (selectedDocument) {
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
    }
  }, [selectedDocument]);

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

  useEffect(() => {
    if (editorContent !== '') {
      updateData(editorContent);
      handleSaveStatus();
    }
  }, [editorContent]);

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

  const debouncedHandleTextEditorChange = useMemo(() => debounce(updateDataInBucket, 500), []);

  return (
    <div className="gutters">
      <nav className="flex flex-space-between">
        {selectedDocument && <h2>{selectedDocument.documentTitle}</h2>}
        <div className="flex save-status">
          {saveStatus !== 'Saved.' && saveStatus && <FontAwesomeIcon icon={faArrowsRotate as IconProp} className="flex-icon" />}
          {saveStatus === 'Saved.' && <FontAwesomeIcon icon={faCloudArrowDown as IconProp} className="flex-icon" />}
          <p>{saveStatus}</p>
        </div>
        <a href="./document/view">
          <button className="btn btn-outline-info">Back to Document List</button>
        </a>
      </nav>
      <Editor
        apiKey="liy4lig7ryv9z846a2okl5qh5c1dsf5ir7s9ye8xzg3dpqwu"
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
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px } @import url('https://fonts.googleapis.com/css?family=Tangerine'); @import url('https://fonts.googleapis.com/css?family=Roboto');",
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
