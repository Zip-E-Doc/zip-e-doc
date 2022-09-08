import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import { Row, Col, Alert } from 'reactstrap';
import { Button } from 'reactstrap';
import { useAppSelector } from 'app/config/store';

export const Home = () => {
  const account = useAppSelector(state => state.authentication.account);

  return (
    <Row>
      <Col md="3" className="pad">
        <span className="hipster rounded" />
      </Col>
      <Col md="9">
        <div className="gutters-small">
          {account?.login ? (
            <div className="flex flex-space-between nav-splash">
              <h1>Welcome, {account.login}</h1>
              <a href="./document/view">
                <button className="btn btn-outline-info btn-lg" type="button">
                  Your Documents
                </button>
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

          <div className="flex flex-space-around feature-cards">
            <div className="card" style={{ width: '31%' }}>
              <img src="../../content/images/autosave_gif_1.gif" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Auto-Save</h5>
                <p className="card-text">Your documents are saved in less than a second and securely stored on AWS S3</p>
              </div>
            </div>
            <div className="card" style={{ width: '31%' }}>
              <img src="../../content/images/template_gif_1.gif" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Templating</h5>
                <p className="card-text">Choose from multiple template styles to increase your productivity</p>
              </div>
            </div>
            <div className="card" style={{ width: '31%' }}>
              <img src="../../content/images/share_gif_1.gif" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Sharing</h5>
                <p className="card-text">Give read-only access to your colleagues, peers, and family members</p>
              </div>
            </div>
          </div>

          <hr />

          <div className="flex flex-space-around profile-cards">
            <div className="card" style={{ width: '23%' }}>
              <img src="../../content/images/ryan3.jpg" alt="" className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">Ryan Chudd</h5>
                <p className="card-text">Math nerd who loves building APIs.</p>
              </div>
            </div>
            <div className="card" style={{ width: '23%' }}>
              <img src="../../content/images/eric3.jpg" alt="" className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">Eric Arterbridge</h5>
                <p className="card-text">Loves integrating function and design.</p>
              </div>
            </div>
            <div className="card" style={{ width: '23%' }}>
              <img src="../../content/images/mike3.jpg" alt="" className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">Mike Martin</h5>
                <p className="card-text">Really into React. Ask me about debouncing.</p>
              </div>
            </div>
            <div className="card" style={{ width: '23%' }}>
              <img src="../../content/images/tristan3.jpg" alt="" className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">Tristan Thompson</h5>
                <p className="card-text">Loves building components in React.</p>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Home;
