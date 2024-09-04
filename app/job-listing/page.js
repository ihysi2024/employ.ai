"use client";
import Head from 'next/head';
import styles from './Home.module.css';
import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar.js';
import '@fontsource/poppins'; // Import the Poppins font
import PersonIcon from '@mui/icons-material/People';
/**
 * IDEAS:
 * 1. one of the bubbles just says # of years of work experience required
 * 2. when a user hovers over the job, it's covered by an overlay, where the left side shows the 
 * qualifications required by the job that they HAVE, and the right side shows the qualifications required by the job that they DON'T HAVE
 */
export default function Home() {
  const [responseJson, setResponseJson] = useState(null);
  const apiUrl = 'https://api.adzuna.com/v1/api/jobs/us/search/1';
  const params = {
    app_id: appId,
    app_key: apiKey,
    results_per_page: 10,
    what: 'software engineer',
    where: 'San Francisco',
    sort_by: 'date',
  };
  const characterLimit = 40;

  const [results, setResults] = useState([]);

  const handleSearch = (query) => {
    const results = responseJson.results.filter(job =>
      job.title.toLowerCase().includes(query.toLowerCase())
    );
    setResponseJson({
      ...responseJson,
      results: results // Update only the results
    });
  };

  const truncateTitle = (title, limit) => {
    return title.length > limit ? title.slice(0, limit) + '...' : title;
  };
  

  useEffect(() => {
    fetch(`${apiUrl}?${new URLSearchParams(params)}`)
      .then(response => response.json())
      .then(data => setResponseJson(data))
      .catch(error => console.error('Error:', error));
  }, []); 

  return (
    <div style={{backgroundColor: 'white'}}>
    <div className={styles.container} style={{ fontFamily: 'Poppins, sans-serif'}}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <h1 style={{ marginRight: '20px', fontWeight: 'bold', fontSize: '20px' }}>Job Listings</h1>
      <SearchBar onSearch={handleSearch} />
      <button variant="contained" style={{ backgroundColor: '#b1cccc', border: '1px solid #b1cccc' , borderRadius: '50%', width: '40px', height: '40px', marginLeft: '10px', cursor: 'pointer' }}>
        <PersonIcon style={{ fontSize: '24px' }}>add</PersonIcon>
      </button>
    </div>


    <main className={styles.main}>

      <div className={styles.grid} style={{justifyContent: 'center', alignItems: 'center', width: '100%'}}>
        {responseJson ? (
          responseJson.results.map((job, index) => (
            <div className={styles.jobBox} key={index} style={{alignItems: 'center', padding: '20px'}}>
              <h2 style={{fontWeight:'bold', fontSize: '20px', padding: '10px'}}>{truncateTitle(job.title, characterLimit)}</h2>
              <p style={{padding:'10px'}}>{job.location.display_name}</p>
              <div className={styles.innerGrid}>
                <div className={styles.innerBox}>Detail 1</div>
                <div className={styles.innerBox}>Detail 2</div>
                <div className={styles.innerBox}>Detail 3</div>
                <div className={styles.innerBox}>Detail 4</div>
                <div className={styles.innerBox}>Detail 5</div>
                <div className={styles.innerBox}>Detail 6</div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </main>
  </div>
  </div>
);
  
}
