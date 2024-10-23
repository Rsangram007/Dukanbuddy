


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const { handleLogout, user } = useAuth(); // Assume 'user' holds the logged-in user's data
  console.log("from Dashboard", user)
  // State for storing users
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    age: '',
    hobby: '',
    sport: ''
  });
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({});

  // Fetch all users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5050/api/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Create a new user
  const createUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5050/api/users', newUser, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchUsers(); // Refresh the user list after creation
      setNewUser({ name: '', email: '', age: '', hobby: '', sport: '' });
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  // Handle Edit Click
  const handleEditClick = (user) => {
    setEditingUserId(user._id);
    setEditedUser(user);
  };

  // Handle Update
  const handleSaveClick = async (id) => {
    try {
      await axios.put(`http://localhost:5050/api/users/${id}`, editedUser, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setEditingUserId(null); // Exit edit mode
      fetchUsers(); // Refresh user data
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Handle Delete
  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:5050/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchUsers(); // Refresh user data
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleLogouts = () => {
    handleLogout();
    navigate('/');
  };

  // Print function
  const handlePrint = (size) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>User Print</title>
          <style>
            @media print {
              body {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
              }
              .user-list {
                width: ${size === '2-inch' ? '2in' : '3in'};
                margin: 0 auto;
                padding: 10px;
                border: 1px solid #000;
              }
            }
          </style>
        </head>
        <body>
          <div class="user-list">
            <h2>User List (${size === '2-inch' ? '2-Inch' : '3-Inch'})</h2>
            ${users
        .map(
          (user) => `
              <p>
                <strong>Name:</strong> ${user.name}<br>
                <strong>Email:</strong> ${user.email}<br>
                <strong>Age:</strong> ${user.age}<br>
                <strong>Hobby:</strong> ${user.hobby}<br>
                <strong>Sport:</strong> ${user.sport}
              </p>
              <hr>
            `
        )
        .join('')}
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="dashboard-container">
      <h1 className="text-center">HELLO {user}, WELCOME TO OUR PLATFORM!</h1>
      <p className="text-center">You are logged in as: {user}</p>
      <div className="button-container">
        <Link to="/product">
          <button className="product-button">Go to Product Page</button>
        </Link>
      </div>

      <div className="dashboard-content">
        <div className="form-container">
          <h2>Create New User</h2>
          <form onSubmit={createUser} className="create-user-form">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={newUser.age}
              onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
            />
            <input
              type="text"
              name="hobby"
              placeholder="Hobby"
              value={newUser.hobby}
              onChange={(e) => setNewUser({ ...newUser, hobby: e.target.value })}
            />
            <input
              type="text"
              name="sport"
              placeholder="Sport"
              value={newUser.sport}
              onChange={(e) => setNewUser({ ...newUser, sport: e.target.value })}
            />
            <button type="submit">Create</button>
          </form>

          {/* Logout button moved below the form */}
          <button className="logout-button" onClick={handleLogouts}>Logout</button>
        </div>

        <div className="table-container">
          <h2>User List</h2>
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Hobby</th>
                <th>Sport</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>
                    {editingUserId === user._id ? (
                      <input
                        type="text"
                        value={editedUser.name}
                        onChange={(e) =>
                          setEditedUser({ ...editedUser, name: e.target.value })
                        }
                      />
                    ) : (
                      user.name
                    )}
                  </td>
                  <td>
                    {editingUserId === user._id ? (
                      <input
                        type="email"
                        value={editedUser.email}
                        onChange={(e) =>
                          setEditedUser({ ...editedUser, email: e.target.value })
                        }
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td>
                    {editingUserId === user._id ? (
                      <input
                        type="number"
                        value={editedUser.age}
                        onChange={(e) =>
                          setEditedUser({ ...editedUser, age: e.target.value })
                        }
                      />
                    ) : (
                      user.age
                    )}
                  </td>
                  <td>
                    {editingUserId === user._id ? (
                      <input
                        type="text"
                        value={editedUser.hobby}
                        onChange={(e) =>
                          setEditedUser({ ...editedUser, hobby: e.target.value })
                        }
                      />
                    ) : (
                      user.hobby
                    )}
                  </td>
                  <td>
                    {editingUserId === user._id ? (
                      <input
                        type="text"
                        value={editedUser.sport}
                        onChange={(e) =>
                          setEditedUser({ ...editedUser, sport: e.target.value })
                        }
                      />
                    ) : (
                      user.sport
                    )}
                  </td>
                  <td>
                    {editingUserId === user._id ? (
                      <button onClick={() => handleSaveClick(user._id)}>
                        Save
                      </button>
                    ) : (
                      <button onClick={() => handleEditClick(user)}>Edit</button>
                    )}
                    <button onClick={() => handleDeleteClick(user._id)}>
                      Delete
                    </button>
                    <button onClick={() => handlePrint('2-inch')}>
                      Print 2-Inch
                    </button>
                    <button onClick={() => handlePrint('3-inch')}>
                      Print 3-Inch
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  );
}  
