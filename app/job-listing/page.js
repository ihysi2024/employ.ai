"use client";
import Head from 'next/head';
import styles from './Home.module.css';
import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import '@fontsource/poppins'; // Import the Poppins font
import PersonIcon from '@mui/icons-material/People';
import * as dotenv from 'dotenv';
import { OpenAI } from 'openai';

/**
 * IDEAS:
 * 1. one of the bubbles just says # of years of work experience required
 * 2. when a user hovers over the job, it's covered by an overlay, where the left side shows the 
 * qualifications required by the job that they HAVE, and the right side shows the qualifications required by the job that they DON'T HAVE
 */

dotenv.config();


export default function Home() {  
  const [jobDetails, setJobDetails] = useState('');
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
  const truncateTitle = (title, limit) => {
    return title.length > limit ? title.slice(0, limit) + '...' : title;
  };
  

  useEffect(() => {
    fetch(`${apiUrl}?${new URLSearchParams(params)}`)
      .then(response => response.json())
      .then(data => setResponseJson(data))
      .catch(error => console.error('Error:', error));
  }, []); 

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await fetch(`${apiUrl}?${new URLSearchParams(params)}`);
        const data = await response.json();
        const jobsWithExperience = await Promise.all(data.results.map(async (job) => {
          const experience = await fetchJobDescription(job.redirect_url);
          return { ...job, experience }; // Add the experience to each job
        }));
        setResponseJson({ ...data, results: jobsWithExperience }); // Update state with jobs
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchJobData();
  }, []);
  

  return (
    <div style={{ backgroundColor: 'white' }}>
  <div className={styles.container} style={{ fontFamily: 'Poppins, sans-serif' }}>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <h1 style={{ marginRight: '20px', fontWeight: 'bold', fontSize: '20px' }}>Job Listings</h1>
    </div>

    <main className={styles.main}>
      <div className={styles.grid} style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        {responseJson ? (
          responseJson.results.map((job, index) => (
            <div
              className={styles.jobBox}
              key={index}
              style={{ alignItems: 'center', padding: '20px', cursor: 'pointer' }} // Add cursor pointer
              onClick={() => window.open(job.redirect_url, '_blank')} // Open URL in new tab
            >
              <h2 style={{ fontWeight: 'bold', fontSize: '20px', padding: '10px' }}>
                {truncateTitle(job.title, characterLimit)}
              </h2>
              <p style={{ padding: '5px', fontStyle: 'oblique' }}>{job.location.display_name}</p>
              <p style={{ padding: '5px', paddingBottom: '20px' }}>{job.company.display_name}</p>
              <p style={{ fontSize: '12px', color: 'gray' }}>
                {truncateTitle(job.description, 200)}
              </p>
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