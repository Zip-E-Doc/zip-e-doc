import './footer.scss';

import React from 'react';

import { Col, Row } from 'reactstrap';

const Footer = () => (
  <div className="footer page-content">
    <Row>
      <Col md="12">
        <p className="custom-footer">Brought to you by Zip Code Java 8.1</p>
        <ul className="list-unstyled">
          <li>Eric</li>
          <li>Mike</li>
          <li>Ryan</li>
          <li>Tristan</li>
        </ul>
      </Col>
    </Row>
  </div>
);

export default Footer;
