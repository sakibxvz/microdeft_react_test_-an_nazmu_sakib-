import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	try {
		const data = await req.json();

		const response = await fetch(
			'https://react-interview.crd4lc.easypanel.host/api/register',
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			}
		);

		const result = await response.json();

		if (result.status === true) {
			return NextResponse.json(result);
		} else {
			return NextResponse.json(
				{
					status: false,
					message: result.status_message || 'Registration failed!',
				},
				{ status: 400 }
			);
		}
	} catch (error) {
		console.error('Error during registration:', error);
		return NextResponse.json(
			{ message: 'Internal Server Error' },
			{ status: 500 }
		);
	}
}
