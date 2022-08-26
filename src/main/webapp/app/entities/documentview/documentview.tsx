import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { IDocument } from 'app/shared/model/document.model';
import EditorApp from './EditorApp';

export const DocumentView = () => {
  return (
    <div>
      <EditorApp />
    </div>
  );
};

export default DocumentView;
