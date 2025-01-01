'use client';
import React from 'react';
import styles from './Sidebar.module.css';
import Button from './ui/button/Button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


const Sidebar: React.FC = () => {
    const router = useRouter();
    const logoutHandler = () => {
        localStorage.removeItem('authToken');
        router.push('/login');
    }
    return (
        <div className={styles.sidebar}>
            <h2 className={styles.logo}>Dashboard</h2>
            <nav className={styles.nav}>
                <Link href="/" className={styles.navItem}>Home</Link>
                <Link href="/dashboard" className={styles.navItem}>All Courses</Link>
                <Link href="/dashboard/add-course" className={styles.navItem}>Add Course</Link>
            </nav>
            <Button onClick={logoutHandler} variant="secondary" className={styles.logoutButton}>Logout</Button>
        </div>
    );
};

export default Sidebar;

