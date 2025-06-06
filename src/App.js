import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
        );
        if (!res.ok) throw new Error('API error');
        const json = await res.json();
        setData(json);
      } catch (error) {
        alert('Failed to fetch data');
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (page - 1) * pageSize;
  const paginatedData = data.slice(startIndex, startIndex + pageSize);

  const handlePrevious = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handleNext = () => {
    setPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Employee Data</h2>
      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Role</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.role}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Loading...</td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
        <button onClick={handlePrevious} disabled={page <= 1}>
          Previous
        </button>
        <span style={{ margin: '0 10px' }}>Page {page} of {totalPages}</span>
        <button onClick={handleNext} disabled={page >= totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
