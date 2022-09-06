import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import { Row, Col, Alert } from 'reactstrap';

import { useAppSelector } from 'app/config/store';

export const Home = () => {
  const account = useAppSelector(state => state.authentication.account);

  return (
    <Row>
      <Col md="3" className="pad">
        <span className="hipster rounded" />
      </Col>
      <Col md="9">
        {account?.login ? (
          <div>
            <div>
              <h1>Welcome, {account.login}</h1>
            </div>
            <a href="./document/view">
              <h2>Your Documents</h2>
            </a>
          </div>
        ) : (
          <div>
            <div>
              <h1>Welcome to Zip-E-Doc</h1>
            </div>
            <Alert color="warning">
              <Link to="/login" className="alert-link">
                Sign-In here
              </Link>
              &nbsp;to view your documents.
            </Alert>
            {/* <Alert color="warning">
              You don&apos;t have an account yet?&nbsp;
              <Link to="/account/register" className="alert-link">
                Register a new account
              </Link>
            </Alert> */}
          </div>
        )}
        <div className="flex">
          <div className="card" style={{ width: '18rem' }}>
            <img src="../../content/images/letter.png" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Auto-Save</h5>
              <p className="card-text">Your documents are saved in less than a second and securely stored on AWS S3</p>
            </div>
          </div>
          <div className="card" style={{ width: '18rem' }}>
            <img src="../../content/images/letter.png" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Templating</h5>
              <p className="card-text">Choose from multiple template styles to increase your productivity</p>
            </div>
          </div>
          <div className="card" style={{ width: '18rem' }}>
            <img src="../../content/images/letter.png" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Sharing</h5>
              <p className="card-text">Give read-only access to your colleagues, peers, and family members</p>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Home;
