'use client'
import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import Button from '@/components/ui/button/Button';

const HomePage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    setIsAuthenticated(!!authToken);
  }, []);

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <div className={styles.logo}>Microdeft</div>
        <div className={styles.navButtons}>
          {isAuthenticated ? (
            <Button variant="primary" className={styles.loginButton}>
              <a href="/dashboard">Go to Dashboard</a>
            </Button>
          ) : (
            <>
              <Button variant="secondary" className={styles.loginButton}>
                <a href="/login">Login</a>
              </Button>
              <Button variant="primary">
                <a href="/register">Get Started</a>
              </Button>
            </>
          )}
        </div>
      </nav>

      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.title}>
            Master New Skills with
            <span className={styles.highlight}> Professional Courses</span>
          </h1>
          <p className={styles.subtitle}>
            Join thousands of learners who are advancing their careers with expert-led courses
          </p>
          <Button variant="primary" className={styles.cta}>
            <a href="/register">Start Learning Today</a>
          </Button>
        </div>

        <div className={styles.features}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>🎓</div>
            <h3 className={styles.featureTitle}>Expert Instructors</h3>
            <p className={styles.featureText}>Learn from industry professionals</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>💻</div>
            <h3 className={styles.featureTitle}>Hands-on Projects</h3>
            <p className={styles.featureText}>Build real-world applications</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>🏆</div>
            <h3 className={styles.featureTitle}>Certificates</h3>
            <p className={styles.featureText}>Earn recognized certificates</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
