"use client";
import Head from 'next/head';
import styles from './Home.module.css';
import React, { useState, useEffect } from 'react';
import '@fontsource/poppins'; // Import the Poppins font
import PersonIcon from '@mui/icons-material/People';
import * as dotenv from 'dotenv';
import { OpenAI } from 'openai';
import { useSearchParams } from 'next/navigation'


/**
 * IDEAS:
 * 1. one of the bubbles just says # of years of work experience required
 * 2. when a user hovers over the job, it's covered by an overlay, where the left side shows the 
 * qualifications required by the job that they HAVE, and the right side shows the qualifications required by the job that they DON'T HAVE
 */

dotenv.config();


export default function JobListing() {
  const [jobDetails, setJobDetails] = useState('');
  const [responseJson, setResponseJson] = useState(null);
  const searchParams = useSearchParams()
  const positions = searchParams.get('positions').split(",")
  const location = searchParams.get('loc') || 'New York'
  const salary = parseInt(searchParams.get('sal'))

  console.log(positions, location, salary);
  
  const apiUrl = 'https://api.adzuna.com/v1/api/jobs/us/search/1';

  console.log(positions[0])
  const paramsList = positions.map(position => ({
    app_id: appId,
    app_key: apiKey,
    results_per_page: 10,
    what: positions[0], // Use the current position from the map
    where: location,
    sort_by: 'date',
  }));

  const params = {
    app_id: appId,
    app_key: apiKey,
    results_per_page: 10,
    what: positions[0], // Use the current position from the map
    where: location,
    sort_by: 'date',
  }
  
  const urlsToFetch = paramsList.map(params => `${apiUrl}?${new URLSearchParams(params)}`)

  
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
  
  const handleSearch = (query) => {
    // Perform search logic here based on the query
    console.log('Search query:', query);
    // You may want to update the API call with the search term
  };


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