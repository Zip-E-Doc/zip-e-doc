import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import axios from './axios.js';

function SharedDocument({ config, selectedDocument }) {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  //Used to keep track of all users other than logged in user
  const [otherUsers, setOtherUsers] = useState([]);
  //Selection from the dropdown menu
  const [selectedUser, setSelectedUser] = useState('');

  //Creates the relationship for shared access on our back end
  //Toggles dropdown visability for sharing
  const handleShare = () => {
    if (showUserDropdown && selectedUser !== '' && selectedUser !== '-- Share With --') {
      async function shareDocument() {
        axios.post('/shared-users', { userName: selectedUser, title: selectedDocument }, config);
      }
      shareDocument();
    }
    setShowUserDropdown(!showUserDropdown);
  };

  //setOtherUsers with the result of get request
  useEffect(() => {
    async function fetchUsers() {
      const userList = await axios.get('/users', config);
      return userList.data;
    }
    fetchUsers().then(response => {
      setOtherUsers(response);
    });
  }, []);

  //setSelectedUser with choice from drop down
  const handleSharedUserChange = e => {
    setSelectedUser(e.target.value);
  };

  return (
    <div className="flex">
      {showUserDropdown && (
        <div className="custom-select">
          <select onChange={handleSharedUserChange} className="btn btn-secondary">
            <option key="0">-- Share With --</option>
            {otherUsers
              .filter(user => user.login !== selectedDocument.userName.login)
              .map(user => (
                <option key={user.id} value={user.login}>
                  {user.login}
                </option>
              ))}
          </select>
        </div>
      )}
      <button className="btn btn-outline-info btn-share" onClick={handleShare}>
        <FontAwesomeIcon icon={faArrowUpRightFromSquare as IconProp} />
      </button>
    </div>
  );
}

export default SharedDocument;
