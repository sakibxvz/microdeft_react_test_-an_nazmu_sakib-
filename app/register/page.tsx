'use client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema } from '@/schema';
import styles from './Register.module.css';
import Input from '@/components/ui/input/Input';
import Button from '@/components/ui/button/Button';
import { useRouter } from 'next/navigation';

type RegisterFormInputs = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const RegisterPage: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormInputs>({
        resolver: zodResolver(RegisterSchema),
    });

    const router = useRouter();

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');

        if (authToken) {
            router.push('/dashboard');
        }
    }, [router]);

    const onSubmit = async (data: RegisterFormInputs) => {

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.status === true) {

                localStorage.setItem('authToken', result.data.token);
            } else {
                alert(result.status_message || 'Registration failed!');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <h1 className={styles.title}>Register</h1>
                <div>
                    <Input
                        label="Name"
                        type="text"
                        id="name"
                        placeholder="Enter your name"
                        {...register('name')}
                        required
                    />
                    {errors.name && (
                        <p className={styles.errorText}>{errors.name.message}</p>
                    )}
                </div>
                <div>
                    <Input
                        label="Email"
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        {...register('email')}
                        required
                    />
                    {errors.email && (
                        <p className={styles.errorText}>{errors.email.message}</p>
                    )}
                </div>
                <div>
                    <Input
                        label="Password"
                        type="password"
                        id="password"
                        placeholder="Create a password"
                        {...register('password')}
                        required
                    />
                    {errors.password && (
                        <p className={styles.errorText}>{errors.password.message}</p>
                    )}
                </div>
                <div>
                    <Input
                        label="Confirm Password"
                        type="password"
                        id="confirm-password"
                        placeholder="Confirm your password"
                        {...register('confirmPassword')}
                        required
                    />
                    {errors.confirmPassword && (
                        <p className={styles.errorText}>{errors.confirmPassword.message}</p>
                    )}
                </div>
                <Button type="submit" className={styles.submitButton}>
                    Register
                </Button>
                <p className={styles.loginLink}>
                    Already have an account? <a href="/login">Login here</a>
                </p>
            </form>
        </div>
    );
};

export default RegisterPage;
