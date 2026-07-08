import React from 'react';
import { useLocation } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// 1. Home Page Skeleton Loader
const HomeSkeleton = () => {
    return (
        <div className="w-full bg-white select-none pointer-events-none">
            {/* Hero Slider Skeleton Area */}
            <div className="relative h-[70vh] md:h-[85vh] bg-slate-950 flex items-center justify-center overflow-hidden">
                <SkeletonTheme baseColor="#0f172a" highlightColor="#1e293b">
                    <div className="max-w-7xl w-full mx-auto px-6 text-center space-y-8 z-10">
                        <div className="flex justify-center">
                            <Skeleton width={220} height={36} borderRadius={9999} />
                        </div>
                        <div className="flex justify-center">
                            <Skeleton width="75%" height={56} className="md:h-24" />
                        </div>
                        <div className="flex justify-center">
                            <Skeleton width="45%" height={24} />
                        </div>
                        <div className="flex justify-center gap-4 pt-8">
                            <Skeleton width={160} height={52} borderRadius={9999} />
                            <Skeleton width={160} height={52} borderRadius={9999} />
                        </div>
                    </div>
                </SkeletonTheme>
                {/* Visual Accent */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80 pointer-events-none" />
            </div>
            
            {/* Magnet Search Section */}
            <div className="max-w-4xl mx-auto px-6 -mt-8 relative z-20">
                <SkeletonTheme baseColor="#f1f5f9" highlightColor="#cbd5e1">
                    <div className="h-20 w-full rounded-2xl bg-white border border-slate-100 shadow-xl flex items-center px-8 justify-between gap-4">
                        <div className="flex items-center gap-3 flex-1">
                            <Skeleton circle width={20} height={20} />
                            <div className="flex-1">
                                <Skeleton width="60%" height={16} />
                            </div>
                        </div>
                        <Skeleton width={120} height={40} borderRadius={12} />
                    </div>
                </SkeletonTheme>
            </div>

            {/* Program Grid Section */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <SkeletonTheme baseColor="#f1f5f9" highlightColor="#cbd5e1">
                        <div className="flex justify-center">
                            <Skeleton width={150} height={16} />
                        </div>
                        <div className="flex justify-center">
                            <Skeleton width="60%" height={36} />
                        </div>
                    </SkeletonTheme>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <SkeletonTheme key={i} baseColor="#f1f5f9" highlightColor="#cbd5e1">
                            <div className="p-8 border border-slate-100 rounded-[2.5rem] bg-slate-50/50 space-y-6">
                                <Skeleton height={180} borderRadius={24} />
                                <div className="space-y-4">
                                    <Skeleton width="40%" height={12} />
                                    <Skeleton width="85%" height={24} />
                                    <Skeleton count={2} height={16} />
                                </div>
                                <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                                    <Skeleton width={80} height={16} />
                                    <Skeleton circle width={36} height={36} />
                                </div>
                            </div>
                        </SkeletonTheme>
                    ))}
                </div>
            </div>
        </div>
    );
};

// 2. Course Page Skeleton Loader
const CourseSkeleton = () => {
    return (
        <div className="w-full bg-white select-none pointer-events-none">
            {/* Hero Banner (dark theme) */}
            <div className="relative h-[60vh] md:h-[75vh] bg-slate-950 flex items-center justify-center text-center px-6 overflow-hidden">
                <SkeletonTheme baseColor="#0f172a" highlightColor="#1e293b">
                    <div className="max-w-4xl w-full mx-auto space-y-8 pt-12">
                        <div className="flex justify-center">
                            <Skeleton width={240} height={32} borderRadius={9999} />
                        </div>
                        <div className="flex justify-center">
                            <Skeleton width="85%" height={56} className="md:h-20" />
                        </div>
                        <div className="flex justify-center">
                            <Skeleton width="60%" height={20} />
                        </div>
                        <div className="flex justify-center gap-2 pt-6">
                            <Skeleton width={160} height={12} />
                        </div>
                    </div>
                </SkeletonTheme>
            </div>

            {/* Quick Highlights */}
            <div className="py-10 bg-slate-950 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <SkeletonTheme key={i} baseColor="#0f172a" highlightColor="#1e293b">
                            <div className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10">
                                <Skeleton width={48} height={48} borderRadius={12} />
                                <div className="flex-1">
                                    <Skeleton width={80} height={10} className="mb-2" />
                                    <Skeleton width="60%" height={16} />
                                </div>
                            </div>
                        </SkeletonTheme>
                    ))}
                </div>
            </div>

            {/* Learning Outcomes */}
            <div className="py-24 px-6 md:px-12 bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                    <div className="lg:col-span-5 space-y-6">
                        <SkeletonTheme baseColor="#f1f5f9" highlightColor="#cbd5e1">
                            <Skeleton width={140} height={14} />
                            <Skeleton width="80%" height={40} className="md:h-12" />
                            <Skeleton count={3} height={16} />
                        </SkeletonTheme>
                    </div>
                    <div className="lg:col-span-7 space-y-6">
                        {[1, 2, 3].map((i) => (
                            <SkeletonTheme key={i} baseColor="#f1f5f9" highlightColor="#cbd5e1">
                                <div className="flex gap-6 border-b border-slate-100 pb-6 last:border-b-0 last:pb-0">
                                    <Skeleton circle width={8} height={8} className="mt-2" />
                                    <div className="flex-1">
                                        <Skeleton width="40%" height={16} className="mb-2" />
                                        <Skeleton width="90%" height={14} />
                                    </div>
                                </div>
                            </SkeletonTheme>
                        ))}
                    </div>
                </div>
            </div>

            {/* Curriculum overview */}
            <div className="py-24 px-6 md:px-12 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                        <SkeletonTheme baseColor="#f1f5f9" highlightColor="#cbd5e1">
                            <div className="flex justify-center">
                                <Skeleton width={150} height={16} />
                            </div>
                            <div className="flex justify-center">
                                <Skeleton width="60%" height={40} />
                            </div>
                        </SkeletonTheme>
                    </div>

                    <div className="max-w-4xl mx-auto bg-white rounded-[2rem] border border-slate-100 p-8 md:p-12 shadow-xl">
                        <SkeletonTheme baseColor="#f1f5f9" highlightColor="#cbd5e1">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-6">
                                    <Skeleton width="60%" height={20} className="border-b border-slate-100 pb-2" />
                                    <div className="space-y-4">
                                        {[1, 2, 3, 4].map((x) => (
                                            <div key={x} className="flex items-center gap-3">
                                                <Skeleton circle width={16} height={16} />
                                                <Skeleton width="80%" height={14} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <Skeleton width="60%" height={20} className="border-b border-slate-100 pb-2" />
                                    <div className="space-y-4">
                                        {[1, 2, 3, 4].map((x) => (
                                            <div key={x} className="flex items-center gap-3">
                                                <Skeleton circle width={16} height={16} />
                                                <Skeleton width="80%" height={14} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </SkeletonTheme>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 3. Blog Page Skeleton Loader
const BlogSkeleton = () => {
    return (
        <div className="w-full bg-white select-none pointer-events-none">
            {/* Blog Hero Banner */}
            <div className="relative pt-32 pb-20 px-6 text-center bg-slate-950">
                <SkeletonTheme baseColor="#0f172a" highlightColor="#1e293b">
                    <div className="max-w-4xl mx-auto space-y-6">
                        <div className="flex justify-center">
                            <Skeleton width={180} height={32} borderRadius={9999} />
                        </div>
                        <div className="flex justify-center">
                            <Skeleton width="75%" height={48} className="md:h-16" />
                        </div>
                        <div className="flex justify-center">
                            <Skeleton width="50%" height={20} />
                        </div>
                    </div>
                </SkeletonTheme>
            </div>

            {/* Categories list */}
            <div className="max-w-7xl mx-auto px-6 py-6 border-b border-slate-100 bg-white">
                <SkeletonTheme baseColor="#f1f5f9" highlightColor="#cbd5e1">
                    <div className="flex flex-wrap gap-3 justify-center">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Skeleton key={i} width={110} height={38} borderRadius={9999} />
                        ))}
                    </div>
                </SkeletonTheme>
            </div>

            {/* Grid of articles */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-20 bg-white">
                <SkeletonTheme baseColor="#f1f5f9" highlightColor="#cbd5e1">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="border border-slate-100 rounded-[2.5rem] overflow-hidden p-6 space-y-6 bg-slate-50/20">
                                <Skeleton height={200} borderRadius={24} />
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <Skeleton width={60} height={12} />
                                        <Skeleton width={80} height={12} />
                                    </div>
                                    <Skeleton height={28} width="95%" />
                                    <Skeleton count={2} height={16} />
                                </div>
                                <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Skeleton circle width={32} height={32} />
                                        <Skeleton width={80} height={14} />
                                    </div>
                                    <Skeleton width={70} height={14} />
                                </div>
                            </div>
                        ))}
                    </div>
                </SkeletonTheme>
            </div>
        </div>
    );
};

// 4. Default Skeleton for other pages (Contact, Gallery, Admission, terms, etc.)
const DefaultSkeleton = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 py-24 bg-white select-none pointer-events-none">
            <SkeletonTheme baseColor="#f1f5f9" highlightColor="#cbd5e1">
                <div className="space-y-8">
                    <Skeleton width="55%" height={48} className="md:h-16" />
                    <Skeleton width="40%" height={24} />
                    <div className="space-y-4 pt-12">
                        <Skeleton count={5} height={20} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12">
                        <Skeleton height={240} borderRadius={16} />
                        <Skeleton height={240} borderRadius={16} />
                    </div>
                </div>
            </SkeletonTheme>
        </div>
    );
};

export const PageSkeleton = () => {
    const location = useLocation();
    const path = location.pathname;

    if (path === '/' || path === '') {
        return <HomeSkeleton />;
    } else if (path.startsWith('/courses')) {
        return <CourseSkeleton />;
    } else if (path.startsWith('/insd-360/blog')) {
        return <BlogSkeleton />;
    } else {
        return <DefaultSkeleton />;
    }
};

export default PageSkeleton;
