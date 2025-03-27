import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/jobs')
      .then(response => setJobs(response.data))
      .catch(error => console.error('Error fetching jobs:', error));
  }, []);

  return (
    <div className="job-list-container">
      <h2>Job Openings</h2>
      <div className="job-grid">
        {jobs.map(job => (
          <div className="job-card" key={job.id}>
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <Link to={`/apply/${job.id}`}>Apply Now</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
