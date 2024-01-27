'use client';

import axios, { AxiosError } from 'axios';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as yup from 'yup';
import YupPassword from 'yup-password';
import EventShowcase from '../../../components/EventShowcase';
import { ToastContainer, toast } from 'react-toastify';
import { Alert } from 'flowbite-react';
import 'react-toastify/dist/ReactToastify.css';
import { AuthGuard } from '@/lib/HOC/AuthGuard';
import { baseUrl } from '@/lib/baseUrl';

YupPassword(yup);

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email cannot be empty'),
  confirmEmail: yup
    .string()
    .oneOf(
      [yup.ref('email') ?? ''],
      'Email addresses do not match. Please try again',
    )
    .required('Email cannot be empty'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Your password must be at least 8 characters')
    .minLowercase(1)
    .minUppercase(1),
  role: yup.string().required('Role is required'),
  referralCode: yup.string().notRequired(),
});

const CardRegister = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showFullForm, setShowFullForm] = useState(false);
  const [inputReferral, setInputReferral] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      confirmEmail: '',
      firstName: '',
      lastName: '',
      password: '',
      role: '',
      referralCode: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const data = await axios.post(baseUrl + '/users/register', {
          email: values.email,
          confirmEmail: values.confirmEmail,
          firstName: values.firstName,
          lastName: values.lastName,
          password: values.password,
          role: {
            name: values.role,
          },
          referralCode: inputReferral,
        });
        toast.success('Register Success', {
          position: 'top-center',
          autoClose: 2000,
          theme: 'light',
        });
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } catch (error) {
        console.log(error);

        if (error instanceof AxiosError) {
          const errorMsg = error.response?.data.message || error.message;
          alert(errorMsg);
        }
      }
    },
  });

  const handleContinue = async () => {
    try {
      if (formik.values.email.includes('@')) {
        const { data } = await axios.get(
          baseUrl + `/users/${formik.values.email}`,
        );
        setShowAlert(true);
      }
    } catch (error) {
      console.log(error);

      setShowFullForm(true);
      setShowAlert(false);
    }
  };

  return (
    <div className="md:flex md:h-screen  w-full">
      <ToastContainer />
      <div
        className="md:w-1/2 md:p-56 p-4  md:pt-40"
        style={{ background: '#F7F7F7' }}
      >
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-10 leading-tight">
          Create an <br />
          account
        </h1>

        <form onSubmit={formik.handleSubmit} style={{ color: '#333' }}>
          <div className="relative mb-4">
            <input
              id="email"
              name="email"
              type="email"
              aria-describedby="emailHelp"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-600 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
              placeholder=" "
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              required
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-gray-700 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#f7f7f7] dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Email Address
            </label>
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs italic">
                {formik.errors.email}
              </p>
            )}
          </div>

          {showAlert && (
            <Alert color="warning" className="mb-4 border-l-4 ">
              <span>
                There is an account associated with the email.{' '}
                <Link href="/login" className="font-bold hover:underline">
                  Log in
                </Link>
              </span>
            </Alert>
          )}

          {showFullForm && (
            <>
              <div className="relative mb-4">
                <input
                  id="confirmEmail"
                  type="email"
                  aria-describedby="confirmEmailHelp"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-600 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                  placeholder=" "
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmEmail}
                  required
                />
                <label
                  htmlFor="confirmEmail"
                  className="absolute text-sm text-gray-700 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#f7f7f7] dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Confirm Email
                </label>
                {formik.touched.confirmEmail && formik.errors.confirmEmail && (
                  <p className="text-red-500 text-xs italic">
                    {formik.errors.confirmEmail}
                  </p>
                )}
              </div>
              <div className="relative mb-4">
                <select
                  id="role"
                  name="role"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-600 focus:outline-none focus:ring-0 focus:border-gray-600"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.role}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="customer">Customer</option>
                  <option value="promoter">Promoter</option>
                </select>
                {formik.touched.role && formik.errors.role && (
                  <p className="text-red-500 text-xs italic">
                    {formik.errors.role}
                  </p>
                )}
              </div>

              <div className="flex mb-4">
                <div className="relative flex-1 mr-2">
                  <input
                    id="firstName"
                    type="text"
                    aria-describedby="firstNameHelp"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-600 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                    placeholder=" "
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                    required
                  />
                  <label
                    htmlFor="firstName"
                    className="absolute text-sm text-gray-700 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#f7f7f7] dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    First Name
                  </label>
                  {formik.touched.firstName && formik.errors.firstName && (
                    <p id="firstNameHelp" className="mt-2 text-xs text-red-500">
                      {formik.errors.firstName}
                    </p>
                  )}
                </div>

                <div className="relative flex-1 ml-2">
                  <input
                    id="lastName"
                    type="text"
                    aria-describedby="lastNameHelp"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-600 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                    placeholder=" "
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                    required
                  />
                  <label
                    htmlFor="lastName"
                    className="absolute text-sm text-gray-700 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#f7f7f7] dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Last Name
                  </label>
                  {formik.touched.lastName && formik.errors.lastName && (
                    <p className="text-red-500 text-xs italic">
                      {formik.errors.lastName}
                    </p>
                  )}
                </div>
              </div>
              <div className=" mb-4">
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    aria-describedby="passwordHelp"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-600 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                    placeholder=" "
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '4px',
                    }}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                    }}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </span>
                  <label
                    htmlFor="password"
                    className="absolute text-sm text-gray-700 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#f7f7f7] dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Password
                  </label>
                  {formik.touched.password && formik.errors.password && (
                    <p className="text-red-500 text-xs italic">
                      {formik.errors.password}
                    </p>
                  )}
                </div>
              </div>
              <div className="relative flex flex-1 ">
                <input
                  id="referralCode"
                  type="text"
                  aria-describedby="referralCodeHelp"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-600 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                  placeholder=" "
                  onChange={(e) => setInputReferral(e.target.value)}
                  value={inputReferral}
                />
                <label
                  htmlFor="referralCode"
                  className="absolute text-sm text-gray-700 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#f7f7f7] dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Referral Code (optional)
                </label>
              </div>
            </>
          )}

          {!showFullForm && (
            <button
              type="button"
              onClick={handleContinue}
              className="bg-[#ff4b00] hover:bg-[#e64200] text-white font-bold py-2 px-4 rounded"
            >
              Continue
            </button>
          )}

          {showFullForm && (
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#ff4b00',
                color: 'white',
                borderRadius: '4px',
                border: 'none',
                marginTop: '20px',
              }}
            >
              Create account
            </button>
          )}
        </form>
      </div>
      <div />

      <EventShowcase />
    </div>
  );
};

export default AuthGuard(CardRegister);
