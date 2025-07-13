import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import { toast } from 'react-hot-toast';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { FormField } from '../../components/ui/FormField';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Define form schema and types
interface LoginFormInputs {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  })
  .required();

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      await login(data);
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link
              to="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              create a new account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="space-y-4">
            <FormField label="Email address" htmlFor="email" error={errors.email?.message as string}>
              <input
                id="email"
                type="email"
                autoComplete="email"
                {...register('email')}
                className={`input-text ${errors.email ? 'input-error' : ''}`}
                placeholder="Email address"
              />
            </FormField>
            <FormField label="Password" htmlFor="password" error={errors.password?.message as string}>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  {...register('password')}
                  className={`input-text pr-10 ${errors.password ? 'input-error' : ''}`}
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </FormField>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                to="/forgot-password"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}