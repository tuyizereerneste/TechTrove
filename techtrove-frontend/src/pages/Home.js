import React from 'react';
import { Link } from 'react-router-dom';
import JobList from '../components/jobs/JobList';

function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to TechTrove</h1>
      <p style={styles.description}>
        TechTrove is your go-to platform for finding and applying to tech jobs.
        Whether you're a company looking to post job listings or an applicant
        seeking new opportunities, we've got you covered.
      </p>
      <div style={styles.buttonContainer}>
        <Link to="/login" style={styles.link}>
          <button style={styles.button}>Login</button>
        </Link>
        <Link to="/register" style={styles.link}>
          <button style={styles.button}>Register</button>
        </Link>
      </div>
      <JobList />  { JobList }
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '20px',
  },
  description: {
    fontSize: '1.2rem',
    marginBottom: '30px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
  link: {
    textDecoration: 'none',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    cursor: 'pointer',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
};

export default Home;