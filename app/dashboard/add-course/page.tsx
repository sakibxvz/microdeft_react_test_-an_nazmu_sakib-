'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CourseSchema } from '@/schema';
import styles from './AddCourse.module.css';

import Sidebar from '@/components/Sidebar';
import Button from '@/components/ui/button/Button';

type CourseFormInputs = {
    title: string;
    description: string;
    instructor_name: string;
    badge_text: string;
    badge_color: string;
    image: string;
    author_name: string;
    author_email: string;
};

const AddCoursePage: React.FC = () => {
    const {
        register,
        reset,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<CourseFormInputs>({
        resolver: zodResolver(CourseSchema),
        defaultValues: {
            title: '',
            description: '',
            instructor_name: '',
            badge_text: '',
            badge_color: '#00ff00',
            image: '',
            author_name: '',
            author_email: '',
        },
    });
    const [status_message, setStatus_message] = useState<string>('');

    const onSubmit = async (data: CourseFormInputs) => {
        try {
            const authToken = localStorage.getItem('authToken');

            if (!authToken) {
                alert('You are not authorized to add a course.');
                return;
            }

            const response = await fetch(
                'https://react-interview.crd4lc.easypanel.host/api/course',
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }
            );

            const result = await response.json();


            if (result.status === true) {
                setStatus_message(result.status_message)
                reset();

            } else {
                alert(result.status_message || 'Failed to add course!');
            }
        } catch (error) {
            console.error('Error during course addition:', error);
            alert('An unexpected error occurred while adding the course. Please try again later.');
        }
    };


    return (
        <div className={styles.pageContainer}>
            <Sidebar />
            <div className={styles.container}>
                <div className={styles.formWrapper}>
                    <h1 className={styles.title}>Add New Course</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                        <div className={styles.formGroup}>
                            <label htmlFor="title">Course Title</label>
                            <input
                                type="text"
                                id="title"
                                {...register('title')}
                                placeholder="Enter course title"
                                required
                            />
                            {errors.title && (
                                <p className={styles.errorText}>{errors.title.message}</p>
                            )}
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                {...register('description')}
                                placeholder="Enter course description"
                                required
                                rows={4}
                            />
                            {errors.description && (
                                <p className={styles.errorText}>{errors.description.message}</p>
                            )}
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="instructor_name">Instructor Name</label>
                            <input
                                type="text"
                                id="instructor_name"
                                {...register('instructor_name')}
                                placeholder="Enter instructor name"
                                required
                            />
                            {errors.instructor_name && (
                                <p className={styles.errorText}>{errors.instructor_name.message}</p>
                            )}
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label htmlFor="badge_text">Badge Text</label>
                                <input
                                    type="text"
                                    id="badge_text"
                                    {...register('badge_text')}
                                    placeholder="Enter badge text"
                                />
                                {errors.badge_text && (
                                    <p className={styles.errorText}>{errors.badge_text.message}</p>
                                )}
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="badge_color">Badge Color</label>
                                <Controller
                                    control={control}
                                    name="badge_color"
                                    render={({ field }) => (
                                        <input
                                            type="color"
                                            id="badge_color"
                                            {...field}
                                        />
                                    )}
                                />
                                {errors.badge_color && (
                                    <p className={styles.errorText}>{errors.badge_color.message}</p>
                                )}
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="image">Course Image URL</label>
                            <input
                                type="url"
                                id="image"
                                {...register('image')}
                                placeholder="Enter course image URL"
                                required
                            />
                            {errors.image && (
                                <p className={styles.errorText}>{errors.image.message}</p>
                            )}
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label htmlFor="author_name">Author Name</label>
                                <input
                                    type="text"
                                    id="author_name"
                                    {...register('author_name')}
                                    placeholder="Enter author name"
                                    required
                                />
                                {errors.author_name && (
                                    <p className={styles.errorText}>{errors.author_name.message}</p>
                                )}
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="author_email">Author Email</label>
                                <input
                                    type="email"
                                    id="author_email"
                                    {...register('author_email')}
                                    placeholder="Enter author email"
                                    required
                                />
                                {errors.author_email && (
                                    <p className={styles.errorText}>{errors.author_email.message}</p>
                                )}
                            </div>
                        </div>

                        <div className={styles.formActions}>
                            <Button type="submit" variant="primary">
                                Add Course
                            </Button>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => window.history.back()}
                            >
                                Cancel
                            </Button>
                        </div>

                        <div>
                            <p style={{ color: '#000' }}>{status_message}</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddCoursePage;
