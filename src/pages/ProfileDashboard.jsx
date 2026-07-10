import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, User, BookOpen, Calendar, MapPin, Award, Settings, Bell, ChevronRight, Camera } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const ProfileDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Redirect to home if not logged in
    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    if (!user) return null; // Avoid rendering until redirect

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-[#f3f3f3] text-slate-900 pt-32 pb-20 selection:bg-primary selection:text-white">
            <SEO 
                title={`${user.firstName || 'Student'} Profile | Student Portal | ICCVS`}
                description="Access your academic records, course schedule, and study materials via the ICCVS Student Portal."
                robots="noindex, nofollow"
            />
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Dashboard Header */}
                <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-slate-900">
                            Student <span className="text-primary italic">Portal</span>
                        </h1>
                        <p className="text-slate-500 font-medium uppercase tracking-widest text-xs mt-2">
                            Welcome Back, {user.firstName || user.username}
                        </p>
                    </div>
                    
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-6 py-3 bg-white text-slate-900 border border-slate-200 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all shadow-sm group"
                    >
                        <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Log Out Session
                    </button>
                </div>

                {/* Dashboard Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Left Column: Avatar & Quick Info */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Profile Identity Card */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center relative overflow-hidden"
                        >
                            <div className="absolute top-0 w-full h-32 bg-linear-to-b from-slate-100 to-white" />
                            
                            <div className="relative z-10 w-32 h-32 rounded-full border-4 border-white bg-slate-900 flex items-center justify-center shadow-lg mb-6 group cursor-pointer overflow-hidden">
                                {user.avatarUrl ? (
                                    <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover transition-all duration-500" />
                                ) : (
                                    <span className="text-5xl font-black text-white group-hover:scale-110 transition-transform duration-300">
                                        {user.username.charAt(0).toUpperCase()}
                                    </span>
                                )}
                                {/* Edit Overlay */}
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <Camera size={24} className="text-white" />
                                </div>
                            </div>
                            
                            <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-900 mb-1">
                                {user.firstName} {user.lastName}
                            </h2>
                            <p className="text-slate-500 text-sm font-medium mb-4">@{user.username}</p>
                            
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 text-green-600 rounded-full border border-green-200 text-xs font-bold uppercase tracking-widest w-fit mb-6 shadow-sm">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                Active Student
                            </div>

                            <div className="w-full border-t border-slate-100 pt-6 mt-2 grid grid-cols-2 gap-4">
                                <div className="text-left">
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Joined</p>
                                    <p className="text-sm font-black text-slate-800">{user.admissionYear}</p>
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Campus</p>
                                    <p className="text-sm font-black text-slate-800">Global</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Quick Actions */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-[2rem] p-6 shadow-md shadow-slate-200/50 border border-slate-100 flex flex-col gap-2"
                        >
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 pl-2">Settings</h3>
                            <button className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors group">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                                        <User size={18} />
                                    </div>
                                    <span className="font-bold text-sm text-slate-700">Account Details</span>
                                </div>
                                <ChevronRight size={16} className="text-slate-400" />
                            </button>
                            <button className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors group">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                                        <Bell size={18} />
                                    </div>
                                    <span className="font-bold text-sm text-slate-700">Notifications</span>
                                </div>
                                <ChevronRight size={16} className="text-slate-400" />
                            </button>
                            <button className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors group">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                                        <Settings size={18} />
                                    </div>
                                    <span className="font-bold text-sm text-slate-700">Preferences</span>
                                </div>
                                <ChevronRight size={16} className="text-slate-400" />
                            </button>
                        </motion.div>
                    </div>

                    {/* Right Column: Academic Data & Courses */}
                    <div className="lg:col-span-8 flex flex-col gap-8">
                        
                        {/* Current Course Banner */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden flex flex-col justify-end min-h-[300px] shadow-2xl"
                        >
                            <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-1000 mix-blend-overlay pointer-events-none">
                                <img src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg" className="w-full h-full object-cover" alt="Course Texture" />
                            </div>
                            <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/40 to-transparent pointer-events-none" />
                            
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-6 text-primary">
                                    <Award size={20} />
                                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-primary">Enrolled Degree</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-4">
                                    {user.courseName}
                                </h2>
                                <p className="text-slate-400 max-w-xl text-sm md:text-base font-light">
                                    Your academic journey at ICCVS began in the {user.admissionYear} session. You are currently active and cleared for all campus facilities.
                                </p>
                            </div>
                        </motion.div>

                        {/* Study Tools / Overview Grid */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                            {/* Schedule Card */}
                            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-md hover:shadow-xl transition-shadow group cursor-pointer">
                                <div className="w-14 h-14 rounded-full bg-slate-50 text-slate-900 flex items-center justify-center mb-6 border border-slate-100 group-hover:bg-primary group-hover:text-white transition-all group-hover:scale-110">
                                    <Calendar size={24} />
                                </div>
                                <h3 className="text-xl font-black uppercase tracking-tighter mb-2 text-slate-900 border-b border-slate-100 pb-2">Academic Schedule</h3>
                                <p className="text-slate-400 text-sm font-medium h-12">View your upcoming lectures, workshops, and critiques.</p>
                                <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest font-black text-primary mt-4">
                                    View Timetable <ChevronRight size={14} />
                                </span>
                            </div>

                            {/* Resources Card */}
                            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-md hover:shadow-xl transition-shadow group cursor-pointer">
                                <div className="w-14 h-14 rounded-full bg-slate-50 text-slate-900 flex items-center justify-center mb-6 border border-slate-100 group-hover:bg-secondary group-hover:text-white transition-all group-hover:scale-110">
                                    <BookOpen size={24} />
                                </div>
                                <h3 className="text-xl font-black uppercase tracking-tighter mb-2 text-slate-900 border-b border-slate-100 pb-2">Study Materials</h3>
                                <p className="text-slate-400 text-sm font-medium h-12">Access digital libraries, references, and project briefs.</p>
                                <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest font-black text-secondary mt-4">
                                    Open Library <ChevronRight size={14} />
                                </span>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
            {/* <Footer /> */}
        </div>
    );
};

export default ProfileDashboard;
