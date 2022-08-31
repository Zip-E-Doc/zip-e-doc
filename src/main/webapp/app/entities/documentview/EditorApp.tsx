import React, { useRef, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from './axios.js';

function EditorApp({ selectedDocument, config, auth }) {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  useEffect(() => {
    if (selectedDocument !== '') {
      fetchDataFromBucket()
        .then(response => {
          editorRef.current.setContent(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [selectedDocument]);

  async function fetchDataFromBucket() {
    let appConfig = {
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${auth}`,
        'Content-Type': 'text/plain',
      },
    };
    const fileContent = await axios.post('/documents/data/s3', selectedDocument.s3key, appConfig);
    return fileContent;
  }

  return (
    <div>
      <h2>{selectedDocument.documentTitle}</h2>
      <Editor
        apiKey="liy4lig7ryv9z846a2okl5qh5c1dsf5ir7s9ye8xzg3dpqwu"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={selectedDocument.documentTitle}
        init={{
          height: 500,
          menubar: false,
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
          toolbar:
            'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
      />
      <button onClick={log}>Log editor content</button>
    </div>
  );
}

export default EditorApp;
