// src/components/auth/LoginForm.tsx
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

export function LoginForm() {
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      const result = await signIn('credentials', {
        username: data.username,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid username or password');
      }
      // Handle successful login
    } catch (error) {
      setError('An error occurred during login');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <div className="text-red-500">{error}</div>}
      <div className="space-y-4">
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            {...register('username')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.username && (
            <span className="text-red-500">{errors.username.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register('password')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Log in
        </button>
      </div>
    </form>
  );
}
