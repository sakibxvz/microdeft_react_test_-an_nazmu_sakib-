'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from '@/schema';
import styles from './Login.module.css';
import Input from '@/components/ui/input/Input';
import Button from '@/components/ui/button/Button';
import { useRouter } from 'next/navigation';


type LoginFormInputs = {
    email: string;
    password: string;
};

const LoginPage: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(LoginSchema),
    });


    const router = useRouter();

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');

        if (authToken) {
            router.push('/dashboard');
        }
    }, [router]);

    const onSubmit = async (data: LoginFormInputs) => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.status === true) {

                localStorage.removeItem('authToken');
                localStorage.setItem('authToken', result.data.token);

                router.push('/dashboard');
            } else {
                alert(result.status_message || 'Login failed!');
            }

        } catch (error) {
            console.error('Error during login:', error);
            alert('An unexpected error occurred. Please try again later.');
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <h1 className={`${styles.title} pt-5`}>Login</h1>
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
                        placeholder="Enter your password"
                        {...register('password')}
                        required
                    />
                    {errors.password && (
                        <p className={styles.errorText}>{errors.password.message}</p>
                    )}
                </div>
                <Button type="submit" className={styles.submitButton}>
                    Log in
                </Button>
                <p className={styles.registerLink}>
                    Don&apos;t have an account? <a href="/register">Register here</a>
                </p>
            </form>
        </div>
    );
};

export default LoginPage;
