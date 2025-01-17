import React, { useEffect, useState } from 'react';

import axios from 'axios';

export default function Hello() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/data')
      .then((todo) => setData(todo.data));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data); 

    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };

  return (
    <div>
      <h1>Get API Call</h1>
      {data.map((property) => (
        <div key={property.id}>{property.title}</div>
      ))}
       <h1>Post API Call</h1>
       <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
    </div>
  );
}
