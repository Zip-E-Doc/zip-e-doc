import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

function SharedDocument() {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const handleShare = () => {
    setShowUserDropdown(!showUserDropdown);
  };
  return (
    <div className="flex">
      {showUserDropdown && (
        <div className="custom-select">
          <select>
            <option key="0">-- Share With --</option>
            <option>A Choice</option>
            <option>Another Choice</option>
          </select>
        </div>
      )}
      <button className="btn btn-outline-info" onClick={handleShare}>
        <FontAwesomeIcon icon={faArrowUpRightFromSquare as IconProp} />
      </button>
    </div>
  );
}

export default SharedDocument;
