import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
} from 'lucide-react';

import { motion } from 'framer-motion';

import toast from 'react-hot-toast';

import api from '../api/axios';

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: '',
      password: '',
    });

  const [errors, setErrors] =
    useState<{
      email?: string;
      password?: string;
    }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const validateForm = () => {
    const newErrors: typeof errors =
      {};

    if (!formData.email) {
      newErrors.email =
        'Email is required';
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      newErrors.email =
        'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password =
        'Password is required';
    } else if (
      formData.password.length < 6
    ) {
      newErrors.password =
        'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const newErrors = validateForm();

    if (
      Object.keys(newErrors).length > 0
    ) {
      setErrors(newErrors);

      return;
    }

    setLoading(true);

    try {
      const res = await api.post(
        '/auth/login',
        {
          email: formData.email,
          password:
            formData.password,
        }
      );

      if (
        res.data &&
        res.data.success
      ) {
        localStorage.setItem(
          'user',
          JSON.stringify(
            res.data.data ||
              res.data.user
          )
        );

        toast.success(
          'Login successful!'
        );

        navigate('/');
      }
    } catch (error: any) {
      const message =
        error.response?.data
          ?.message ||
        'Login failed. Please try again.';

      toast.error(message);

      setErrors({
        password: message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-accent/10 px-4 py-10'>
      {/* Background Blur */}
      <div className='absolute -left-20 top-0 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl'></div>

      <div className='absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl'></div>

      <motion.div
        initial={{
          opacity: 0,
          y: 25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
        }}
        className='relative w-full max-w-md'
      >
        <div className='overflow-hidden rounded-3xl border border-white/40 bg-white/70 shadow-2xl backdrop-blur-xl dark:border-gray-700 dark:bg-gray-900/80'>
          {/* Header */}
          <div className='bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-8 text-white'>
            <h1 className='text-3xl font-bold tracking-tight'>
              Welcome Back
            </h1>

            <p className='mt-2 text-sm text-blue-100'>
              Sign in to your Smart
              Leads Dashboard
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className='space-y-6 p-8'
          >
            {/* Email */}
            <div>
              <label className='mb-2 block text-sm font-semibold text-foreground'>
                Email Address
              </label>

              <div className='relative'>
                <Mail className='absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400' />

                <input
                  type='email'
                  name='email'
                  placeholder='you@example.com'
                  value={
                    formData.email
                  }
                  onChange={
                    handleChange
                  }
                  disabled={loading}
                  className='w-full rounded-2xl border border-gray-200 bg-white/80 py-3 pl-12 pr-4 text-gray-800 shadow-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:ring-blue-900'
                />
              </div>

              {errors.email && (
                <p className='mt-2 text-sm text-red-500'>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className='mb-2 block text-sm font-semibold text-foreground'>
                Password
              </label>

              <div className='relative'>
                <Lock className='absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400' />

                <input
                  type={
                    showPassword
                      ? 'text'
                      : 'password'
                  }
                  name='password'
                  placeholder='Enter password'
                  value={
                    formData.password
                  }
                  onChange={
                    handleChange
                  }
                  disabled={loading}
                  className='w-full rounded-2xl border border-gray-200 bg-white/80 py-3 pl-12 pr-12 text-gray-800 shadow-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:ring-blue-900'
                />

                <button
                  type='button'
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700 dark:hover:text-white'
                >
                  {showPassword ? (
                    <EyeOff className='h-5 w-5' />
                  ) : (
                    <Eye className='h-5 w-5' />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className='mt-2 text-sm text-red-500'>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Button */}
            <button
              type='submit'
              disabled={loading}
              className='w-full rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3 font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70'
            >
              {loading
                ? 'Signing In...'
                : 'Sign In'}
            </button>

            {/* Register */}
            <div className='text-center text-sm text-muted-foreground'>
              Don&apos;t have an
              account?{' '}
              <Link
                to='/register'
                className='font-semibold text-blue-600 transition hover:text-cyan-500'
              >
                Create Account
              </Link>
            </div>
          </form>

          {/* Demo */}
          <div className='border-t border-border bg-muted/30 px-8 py-5'>
            <p className='mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
              Demo Credentials
            </p>

            <div className='rounded-2xl bg-white/70 p-4 shadow-sm dark:bg-gray-800'>
              <p className='text-sm text-foreground'>
                <span className='font-semibold'>
                  Email:
                </span>{' '}
                admin@example.com
              </p>

              <p className='mt-1 text-sm text-foreground'>
                <span className='font-semibold'>
                  Password:
                </span>{' '}
                password123
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;