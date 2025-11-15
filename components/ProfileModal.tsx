import React, { useState } from 'react';
import { User } from '../types';
import { Theme } from '../App';
import { noteApi } from '../services/noteService';

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentUser: User;
    onUserUpdate: (user: User) => void;
    theme: Theme;
    onToggleTheme: () => void;
}

type ActiveTab = 'account' | 'appearance' | 'support';

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, currentUser, onUserUpdate, theme, onToggleTheme }) => {
    const [activeTab, setActiveTab] = useState<ActiveTab>('account');
    
    // Account state
    const [username, setUsername] = useState(currentUser.username);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [accountMessage, setAccountMessage] = useState({ type: '', text: '' });
    const [isUpdating, setIsUpdating] = useState(false);

    if (!isOpen) return null;

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUpdating(true);
        setAccountMessage({ type: '', text: '' });
        try {
            const updatedUser = await noteApi.updateProfile(currentUser._id, { username });
            onUserUpdate(updatedUser);
            setAccountMessage({ type: 'success', text: 'Username updated successfully!' });
        } catch (error: any) {
            setAccountMessage({ type: 'error', text: error.message || 'Failed to update username.' });
        } finally {
            setIsUpdating(false);
        }
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setAccountMessage({ type: 'error', text: 'Passwords do not match.' });
            return;
        }
        if (newPassword.length < 6) {
            setAccountMessage({ type: 'error', text: 'Password must be at least 6 characters long.' });
            return;
        }
        setIsUpdating(true);
        setAccountMessage({ type: '', text: '' });
        try {
            await noteApi.changePassword(currentUser._id, newPassword);
            setAccountMessage({ type: 'success', text: 'Password changed successfully!' });
            setNewPassword('');
            setConfirmPassword('');
        } catch (error: any) {
             setAccountMessage({ type: 'error', text: error.message || 'Failed to change password.' });
        } finally {
            setIsUpdating(false);
        }
    };

    const TabButton: React.FC<{ tab: ActiveTab, children: React.ReactNode }> = ({ tab, children }) => (
         <button
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab 
                ? 'bg-teal-500 text-white' 
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
        >
            {children}
        </button>
    );

    const inputClasses = "mt-1 w-full bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white p-2 rounded-md border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none";
    const labelClasses = "block text-sm font-medium text-slate-600 dark:text-slate-400";
    const buttonClasses = "w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50";


    return (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-lg border border-slate-300 dark:border-slate-700" onClick={(e) => e.stopPropagation()}>
                <header className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white">Settings</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </header>
                <div className="p-4 flex gap-4 border-b border-slate-200 dark:border-slate-700">
                    <TabButton tab="account">Account</TabButton>
                    <TabButton tab="appearance">Appearance</TabButton>
                    <TabButton tab="support">Support</TabButton>
                </div>
                <div className="p-6 min-h-[300px]">
                    {activeTab === 'account' && (
                        <div className="space-y-6">
                            <form onSubmit={handleProfileUpdate}>
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">Profile</h3>
                                <label htmlFor="username" className={labelClasses}>Username</label>
                                <div className="flex flex-col sm:flex-row gap-2 items-center">
                                    <input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} className={inputClasses}/>
                                    <button type="submit" className={buttonClasses} disabled={isUpdating || username === currentUser.username}>
                                        {isUpdating ? 'Saving...' : 'Save'}
                                    </button>
                                </div>
                            </form>
                            <form onSubmit={handlePasswordChange} className="border-t border-slate-200 dark:border-slate-700 pt-6">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">Change Password</h3>
                                <div className="space-y-4">
                                     <div>
                                        <label htmlFor="newPassword" className={labelClasses}>New Password</label>
                                        <input id="newPassword" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className={inputClasses}/>
                                    </div>
                                    <div>
                                        <label htmlFor="confirmPassword" className={labelClasses}>Confirm New Password</label>
                                        <input id="confirmPassword" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className={inputClasses}/>
                                    </div>
                                    <div className="text-right">
                                        <button type="submit" className={buttonClasses} disabled={isUpdating || !newPassword}>
                                            {isUpdating ? 'Saving...' : 'Change Password'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                             {accountMessage.text && (
                                <p className={`text-sm ${accountMessage.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                                    {accountMessage.text}
                                </p>
                            )}
                        </div>
                    )}
                    {activeTab === 'appearance' && (
                        <div>
                             <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">Theme</h3>
                             <div className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                                 <p className="text-slate-700 dark:text-slate-300">Switch between light and dark mode.</p>
                                 <button onClick={onToggleTheme} className="relative inline-flex items-center h-6 rounded-full w-11 transition-colors bg-slate-300 dark:bg-slate-600">
                                    <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`}/>
                                </button>
                             </div>
                        </div>
                    )}
                    {activeTab === 'support' && (
                        <div>
                             <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">Contact & Support</h3>
                             <div className="text-slate-600 dark:text-slate-400 space-y-2">
                                <p>If you need help or have any feedback, please feel free to reach out to our support team.</p>
                                <p>Email us at: <a href="mailto:support@devnotes.app" className="text-teal-500 hover:underline">support@devnotes.app</a></p>
                             </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;
