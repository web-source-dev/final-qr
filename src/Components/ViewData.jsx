import React, { useEffect, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewData = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Toggle Dark Mode


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://final-qr-b.vercel.app/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleCheckboxChange = async (userId, isChecked) => {
    try {
      await axios.put(`https://final-qr-b.vercel.app/api/users/${userId}`, { isAllowed: isChecked });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isAllowed: isChecked } : user
        )
      );
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="view-data-container">
      <button style={{position:"relative",top:"40px" ,left:"90%"}} onClick={() => navigate('/')}>Add User</button>
      <h1>All Users</h1>
      <div className="user-list">
        {Array.isArray(users) && users.length > 0 ? (
          users.map((user) => (
            <div key={user._id} className="user-card">
              <div className={`status-text ${user.isAllowed ? 'active' : 'inactive'}`}>
                {user.isAllowed ? 'Active' : 'Inactive'}
              </div>

              <div className="flex-jfha">
                {user.name && <h3>{user.name}</h3>}
                {user.email && <p>Email: {user.email}</p>}
                {user.phone && <p>Phone: {user.phone}</p>}
                {user.address && <p>Address: {user.address}</p>}

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={user.isAllowed}
                    onChange={(e) => handleCheckboxChange(user._id, e.target.checked)}
                  />
                  <span>Show QR Code</span>
                </label>

                <div className="flex-name-links">
                  <p>Social Links</p>
                  <div className="links-of-each-user">
                    <div className="map-flex">
                      {user.address && (
                        <a target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${user.address}`}>
                          <i className="ri-map-pin-fill"></i>
                        </a>
                      )}
                    </div>
                    <div className="links-flex">
                      {user.youtube_url && (
                        <a target="_blank" href={user.youtube_url}><i className="ri-youtube-fill"></i></a>
                      )}
                      {user.facebook_url && (
                        <a target="_blank" href={user.facebook_url}><i className="ri-facebook-fill"></i></a>
                      )}
                      {user.linkden_url && (
                        <a target="_blank" href={user.linkden_url}><i className="ri-linkedin-fill"></i></a>
                      )}
                      {user.twitter_url && (
                        <a target="_blank" href={user.twitter_url}><i className="ri-twitter-fill"></i></a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {user.isAllowed && (
                <div className="qr-code-all">
                  <QRCodeCanvas
                    value={`https://final-qr-psi.vercel.app/user/${user._id}`}
                    size={70}
                  />
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No users available.</p>
        )}
      </div>
    </div>
  );
};

export default ViewData;
