import z from 'zod';

export const LoginSchema = z.object({
	email: z.string().email({ message: 'Invalid email address' }),
	password: z
		.string()
		.min(3, { message: 'Password must be at least 3 characters long' }),
});

export const RegisterSchema = z
	.object({
		name: z
			.string()
			.min(2, { message: 'Name must be at least 2 characters long' }),
		email: z.string().email({ message: 'Invalid email address' }),
		password: z
			.string()
			.min(6, { message: 'Password must be at least 6 characters long' }),
		confirmPassword: z
			.string()
			.min(6, { message: 'Password must be at least 6 characters long' }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		message: 'Passwords must match',
	});

export const CourseSchema = z.object({
	title: z
		.string()
		.min(3, { message: 'Title must be at least 3 characters long' }),
	description: z
		.string()
		.min(10, { message: 'Description must be at least 10 characters long' }),
	instructor_name: z
		.string()
		.min(3, { message: 'Instructor name must be at least 3 characters long' }),
	badge_text: z
		.string()
		.min(3, { message: 'Badge text must be at least 3 characters long' }),
	badge_color: z.string().min(3, { message: 'Invalid color  format' }),
	image: z.string().url({ message: 'Invalid URL' }),
	author_name: z
		.string()
		.min(3, { message: 'Author name must be at least 3 characters long' }),
	author_email: z.string().email({ message: 'Invalid email address' }),
});
