import React, { useState } from 'react';
import { noteApi } from '../services/noteService';

interface AuthPageProps {
    onLoginSuccess: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess }) => {
    const [isLoginView, setIsLoginView] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleAuthAction = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setIsLoading(true);

        try {
            if (isLoginView) {
                await noteApi.login(email, password);
                onLoginSuccess();
            } else {
                await noteApi.signup(username, email, password);
                setMessage('Signup successful! Please log in.');
                setIsLoginView(true);
                setUsername('');
                setEmail('');
                setPassword('');
            }
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const toggleView = () => {
        setIsLoginView(!isLoginView);
        setError('');
        setMessage('');
        setUsername('');
        setEmail('');
        setPassword('');
    };

    const inputClasses = "mt-1 w-full bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-white p-3 rounded-md border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition";
    const labelClasses = "block text-sm font-medium text-slate-600 dark:text-slate-400";


    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                 <div className="flex items-center justify-center mb-6">
                    <svg className="h-12 w-12 text-teal-500 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    <h1 className="text-4xl font-bold text-slate-800 dark:text-white">DevNotes</h1>
                </div>

                <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700">
                    <h2 className="text-2xl font-bold text-center text-slate-800 dark:text-slate-200 mb-6">{isLoginView ? 'Welcome Back' : 'Create an Account'}</h2>
                    <form onSubmit={handleAuthAction} className="space-y-6">
                        {!isLoginView && (
                             <div>
                                <label htmlFor="username" className={labelClasses}>Username</label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className={inputClasses}
                                    placeholder="your_username"
                                    disabled={isLoading}
                                />
                            </div>
                        )}
                        <div>
                            <label htmlFor="email" className={labelClasses}>Email Address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={inputClasses}
                                placeholder="you@example.com"
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <label htmlFor="password"className={labelClasses}>Password</label>
                             <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete={isLoginView ? "current-password" : "new-password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={inputClasses}
                                placeholder="••••••••"
                                disabled={isLoading}
                            />
                        </div>
                        
                        {error && <p className="text-red-500 dark:text-red-400 text-sm text-center">{error}</p>}
                        {message && <p className="text-green-600 dark:text-green-400 text-sm text-center">{message}</p>}

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-800 focus:ring-teal-500 transition-colors disabled:bg-teal-800 disabled:cursor-not-allowed"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                                ) : (isLoginView ? 'Sign In' : 'Sign Up')}
                            </button>
                        </div>
                    </form>
                    <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
                        {isLoginView ? "Don't have an account?" : "Already have an account?"}{' '}
                        <button onClick={toggleView} className="font-medium text-teal-600 dark:text-teal-400 hover:text-teal-500 dark:hover:text-teal-300">
                            {isLoginView ? 'Sign Up' : 'Sign In'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;