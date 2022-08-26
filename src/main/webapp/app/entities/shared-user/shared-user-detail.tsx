import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './shared-user.reducer';

export const SharedUserDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const sharedUserEntity = useAppSelector(state => state.sharedUser.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="sharedUserDetailsHeading">Shared User</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{sharedUserEntity.id}</dd>
          <dt>
            <span id="userName">User Name</span>
          </dt>
          <dd>{sharedUserEntity.userName}</dd>
          <dt>Title</dt>
          <dd>{sharedUserEntity.title ? sharedUserEntity.title.documentTitle : ''}</dd>
        </dl>
        <Button tag={Link} to="/shared-user" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/shared-user/${sharedUserEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default SharedUserDetail;
