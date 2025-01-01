'use client'
import React, { useEffect, useState } from 'react';
import styles from './Dashboard.module.css';
import Sidebar from '@/components/Sidebar';
import CourseCard from '../../components/CourseCard';
import Button from '@/components/ui/button/Button';
import Spinner from '@/components/ui/spinner/Spinner';
import { useRouter } from 'next/navigation';

interface Course {
    id: number;
    title: string;
    description: string;
    instructor_name: string;
    badge_text: string;
    badge_color: string;
    image: string;
    author: {
        name: string;
        email: string;
    }

}

const Dashboard: React.FC = () => {
    const [coursesData, setCoursesData] = useState<Course[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const router = useRouter();


    const fetchCourses = async (page: number) => {
        setLoading(true);

        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            setError('No authentication token found.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`https://react-interview.crd4lc.easypanel.host/api/course?page=${page}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch courses');
            }

            const result = await response.json();

            setCoursesData(result.data.data);
            setTotalPages(result.data.meta.last_page);
            setLoading(false);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Unknown error');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses(currentPage);
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };



    if (error) {
        router.push('/login');
    }

    return (
        <div className={styles.dashboard}>
            <Sidebar />
            {loading && <Spinner />}
            {!loading && (<main className={styles.content}>
                <h1 className={styles.title}>Your Courses</h1>
                <div className={styles.courseGrid}>
                    {coursesData.length > 0 ? (
                        coursesData.map((course) => (
                            <CourseCard
                                key={course.id}
                                id={course.id}
                                title={course.title}
                                description={course.description}
                                badge_text={course.badge_text}
                                badge_color={course.badge_color}
                                instructor_name={course.instructor_name}
                                image={course.image}
                                author={course.author}
                            />
                        ))
                    ) : (
                        <div style={{ color: '#000' }}>No courses found.</div>
                    )}
                </div>

                {/* Pagination buttons */}
                {coursesData.length > 0 && <div className={styles.pagination}>
                    <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                        Previous
                    </Button>
                    <span>
                        Page {currentPage} of {totalPages}
                    </span>
                    <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                        Next
                    </Button>
                </div>}

            </main>)}
        </div>
    );
};

export default Dashboard;
