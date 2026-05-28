import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    MapPin, 
    Globe, 
    ArrowUpRight, 
    Navigation, 
    Building2, 
    Phone, 
    Mail, 
    ChevronRight, 
    Sparkles, 
    GraduationCap, 
    Search,
    BookOpen,
    Layers,
    Award
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import Footer from '../components/Footer';

const zoneData = {
    "West Zone": [
        { city: "Mumbai (Andheri)", address: "101 Crystal Paradise Dattaji Salvi Marg, Off Veera Desai Rd, Above Pizza Express, Andheri West, Mumbai – 400053", state: "Maharashtra" },
        { city: "Mumbai (Sanpada)", address: "Ekram Palace, Plot No. 134, Sector-10, Sanpada, Navi Mumbai – 400705", state: "Maharashtra" },
        { city: "Deccan Pune", address: "INSD, 1278, Suyog Plaza, Jangali Maharaj Road, Above Shoe Paradise, Deccan Gymkhana, Pune – 411004", state: "Maharashtra" },
        { city: "Pune (Baner-Balewadi)", address: "1st floor, Unecha Estate, Baner – Balewadi Rd, above Bank Of Baroda, Opposite Atithi Veg, Near D Mart, Laxman Nagar, Baner, Pune – 411045", state: "Maharashtra" },
        { city: "Pune (Hadapsar)", address: "Second Floor, Prasad Building, Office No.1, DP Road, Malwadi, Vidya Vihar Colony S. No. 211/9, near Annapurna Hotel, Hadapsar – 411028", state: "Maharashtra" },
        { city: "Amravati", address: "1st floor, Agrawal building, opp. Rajesh Cinemas, next to Gulshan Towers, Jaisthambh Chowk, Amravati – 444601", state: "Maharashtra" },
        { city: "Ahmedabad (Ellisbridge)", address: "309-310, Turquoise Complex, Panchvati, Chimanlal Girdharlal Rd, Ellisbridge, Ahmedabad – 380006", state: "Gujarat" },
        { city: "Mumbai (Kandivali)", address: "1st floor, PARIND CHSL, Swami Vivekananda Rd, Beside Ladiwala Bldg, Best Nagar, Kandivali West, Mumbai – 400067", state: "Maharashtra" },
        { city: "Mumbai (Ghatkopar West)", address: "O&S Business Suites, B305, Hirachand Desai Rd, near Metro Station Ghatkopar, Bhatwadi, Kapol wadi, Ghatkopar West, Mumbai – 400086", state: "Maharashtra" },
        { city: "Thane", address: "4th Floor, Arambagh Estate, Veer Savarkar Marg, near Teen Petrol Pump, above Purepur Kolhapur Hotel, Next to Lokmanya CHS, Thane West – 400602", state: "Maharashtra" },
        { city: "Pune (PCMC)", address: "103, 1st Floor, Gheewala Complex, Opp. Ramkrishna More Sabhagruha, Above Axis Bank, Pimpri-Chinchwad, Pune – 411033", state: "Maharashtra" },
        { city: "Pune (Kothrud)", address: "Office No. 25, 4th Floor, Commerce Avenue, Paud Rd, Mahaganesh Colony, Kothrud, Pune – 411029", state: "Maharashtra" },
        { city: "Nanded", address: "Bhagwati Plaza, 1st Floor, Beside Union Bank, Ashok Nagar, Bhagya Nagar Road, Nanded – 431605", state: "Maharashtra" },
        { city: "Surat", address: "304, 3rd Floor, International Finance Center, Vip Road, Vesu, Surat – 395007", state: "Gujarat" },
        { city: "Bhopal", address: "1st Floor, Plot No.152, Near IDFC Bank, Zone-I, Maharana Pratap Nagar, Bhopal – 462011", state: "Madhya Pradesh" }
    ],
    "South Zone": [
        { city: "Whitefield", address: "2nd lift, 3rd Floor, Sai Sree Harsha tower, Whitefield Main Road, Opp. Nexus Whitefield Mall, Palm Meadows, Whitefield, Bengaluru – 560066", state: "Karnataka" },
        { city: "Kalaburagi", address: "Shiva Shree Complex, Khargee Pump, Sedam Road, Opp. Basaveshwara Hospital, Near Adarsh Nagar, Badepur Colony, Kalaburagi – 585105", state: "Karnataka" },
        { city: "Shivamogga", address: "Kalaburagi – 585105", state: "Karnataka" },
        { city: "Coimbatore", address: "320/4, 1st Floor, Selva Towers, Avinashi Road, Near Fun Mall, Peelamedu, Coimbatore – 641004", state: "Tamil Nadu" },
        { city: "Vizag", address: "3rd Floor, Potluri Castle, Dr.no.47, 14-9/9, Dwarakanagar Road, above HDFC Bank, Visakhapatnam – 530016", state: "Andhra Pradesh" },
        { city: "Trivandrum", address: "Santhram, Swathy Nagar Lane 6A, Pipinmoodu Jn, Sasthamangalam, Trivandrum – 695010", state: "Kerala" },
        { city: "JP Nagar BLR", address: "262/1, Doresani Palya, 8th Cross, Panduranga Nagar Layout, JP Nagar 7th phase, Bangalore – 560076", state: "Karnataka" },
        { city: "Mysore", address: "4647/1, Shivaji Road, Near Shivaji Park, N R Mohalla, Rajendra Nagar, Mysuru – 570007", state: "Karnataka" },
        { city: "Davangere", address: "VHV Heights, 492/3, Hadadi Road, Davangere – 577002", state: "Karnataka" }
    ],
    "North Zone": [
        { city: "Jammu", address: "H No. 13, Sector 5-A, main road, Trikuta Nagar, Jammu", state: "J&K" },
        { city: "Amritsar", address: "SCO-59, 1st & 2nd Floor, B-Block Market, New Amritsar – 143001", state: "Punjab" },
        { city: "Ludhiana", address: "1st Floor, SCO 85, near Bagga Nursing Home, Phase 1, Duggri, Urban Estate Dugri, Ludhiana – 141001", state: "Punjab" },
        { city: "Mohali", address: "SCO No. 16, Near Punjab Mandi Board, Bhawan, Sector 65-A, Sahibzada Ajit Singh Nagar, Mohali – 160062", state: "Punjab" },
        { city: "Hisar", address: "2nd Floor, Sketchers Showroom Building, Opposite Saini sweets, Model Town, Hisar", state: "Haryana" },
        { city: "Dwarka", address: "A-1/51, Sewak Park, Main Dwarka Road, Uttam Nagar, New Delhi – 110059", state: "Delhi" },
        { city: "Bareilly", address: "47, Civil Lines, Bareilly – 243001", state: "Uttar Pradesh" },
        { city: "Udaipur", address: "207-218 1st Floor, S. M. Lodha Complex, Court Circle, Udaipur – 313001", state: "Rajasthan" },
        { city: "Kota", address: "3rd Floor, Plot No.80, Shopping Centre, Opposite Chowpati Gumanpura, Kota – 324007", state: "Rajasthan" },
        { city: "Prayagraj", address: "126/22, 2nd floor, Mahatma Gandhi Marg Civil Lines, Prayagraj – 211001", state: "Uttar Pradesh" },
        { city: "Jaipur", address: "1st Floor, Amrapali Plaza, Amrapali Circle, Vaishali Nagar, Jaipur – 302021", state: "Rajasthan" }
    ],
    "East Zone": [
        { city: "Kolkata", address: "1st Floor, Plot No. J1-9, EP Block, Sector V, Salt Lake, Kolkata – 700091", state: "West Bengal" },
        { city: "Bhubaneshwar", address: "Plot no 357/3471, 3rd Floor, C/o-Hdfc bank, Biju Pattnaik College Rd, near JIO Office, Jayadev Vihar, Bhubaneswar – 751013", state: "Odisha" },
        { city: "Bhilai", address: "30/5, Street 8, near Agrasen Chowk, Nehru Nagar West, Bhilai – 490020", state: "Chhattisgarh" },
        { city: "Siliguri", address: "Shop no. 1, 2nd Floor, Times Square, Sevoke Road, Siliguri – 734001", state: "West Bengal" },
        { city: "Guwahati", address: "401, 4th Floor, Achyut Express Tower, Dr. B. Baruah Road, Ulubari, Guwahati – 781007", state: "Assam" },
        { city: "Imphal", address: "INSD Imphal, Meitram Makha, Imphal West – 795140", state: "Manipur" },
        { city: "Raipur", address: "3rd floor, Ashutosh Tower, Turning Point Square, Shankar Nagar, Raipur – 492001", state: "Chhattisgarh" },
        { city: "Itanagar", address: "2nd Floor, Near Bishop’s House, Opposite Good Shepherd School, Pappu Nallah, Naharlagun – 791110", state: "Arunachal Pradesh" }
    ]
};



const Location = () => {
    const navigate = useNavigate();
    const [selectedZone, setSelectedZone] = useState("West Zone");
    const [searchQuery, setSearchQuery] = useState("");

    const allCenters = Object.entries(zoneData).flatMap(([zone, centers]) =>
        centers.map(center => ({ ...center, zone }))
    );

    const filteredCenters = allCenters.filter(center => {
        const matchesZone = selectedZone === "All" || center.zone === selectedZone;
        const matchesSearch = center.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
            center.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
            center.address.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesZone && matchesSearch;
    });

    return (
        <div className="bg-slate-50 min-h-screen font-sans selection:bg-[#c5a044] selection:text-white text-slate-800">
            <SEO 
                title="Our Campus Locations | 23+ Centers Across India - INSD"
                description="Find an International School of Design campus near you. With over 23+ centers across India providing fashion, interior, and graphic design training."
            />

            {/* --- HERO SECTION --- */}
            <section className="relative pt-36 pb-20 px-6 overflow-hidden bg-white border-b border-slate-100">
                <div className="absolute inset-0 pointer-events-none z-0">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-[#134a84]/5 to-transparent blur-[120px] rounded-full" />
                    <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-gradient-to-b from-[#db3436]/3 to-transparent blur-[100px] rounded-full" />
                    <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
                    <div className="absolute inset-0 cyber-grid opacity-[0.02]" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto w-full text-center space-y-8">
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 bg-[#c5a044]/10 border border-[#c5a044]/30 text-[#c5a044] px-4 py-1.5 rounded-full font-bold uppercase tracking-widest text-[10px] mb-4"
                    >
                        <MapPin size={14} /> National Footprint
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-7xl lg:text-[6.5rem] font-black uppercase tracking-tighter leading-[0.85] text-slate-900"
                    >
                        Design Hubs. <br/>
                        <span className="bg-gradient-to-r from-[#db3436] to-[#134a84] text-transparent bg-clip-text">Nationwide.</span>
                    </motion.h1>
                    <p className="text-slate-500 max-w-xl mx-auto text-base md:text-lg font-semibold uppercase tracking-wide">
                        Explore our extensive network spanning across 23+ states of India
                    </p>
                </div>
            </section>

            {/* --- ALL CENTERS GRID --- */}
            <main className="max-w-7xl mx-auto px-6 py-16">
                
                {/* --- FILTERS --- */}
                <div className="flex justify-center mb-12">
                    <div className="flex flex-wrap items-center justify-center gap-2 p-2 bg-white rounded-full border border-slate-100 shadow-xl shadow-slate-200/20">
                        {["West Zone", "South Zone", "North Zone", "East Zone"].map((zone) => (
                            <button
                                key={zone}
                                onClick={() => setSelectedZone(zone)}
                                className={`px-5 md:px-8 py-3 rounded-full text-xs md:text-sm font-black uppercase tracking-widest transition-all ${
                                    selectedZone === zone 
                                        ? 'bg-[#c5a044] text-white shadow-md shadow-[#c5a044]/20' 
                                        : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
                                }`}
                            >
                                {zone.replace(" Zone", "")}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredCenters.map((center, idx) => (
                            <motion.div
                                layout
                                key={`${center.city}-${center.zone}`}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3, delay: idx * 0.02 }}
                                className="group bg-white border border-slate-100 rounded-[2rem] p-8 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 relative overflow-hidden flex flex-col justify-between h-[300px]"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity pointer-events-none">
                                    <MapPin size={140} />
                                </div>

                                <div className="relative z-10 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="px-3.5 py-1 bg-slate-50 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-[#c5a044] group-hover:bg-[#c5a044]/5 transition-all">
                                            {center.zone}
                                        </div>
                                        <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-350 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm">
                                            <Navigation size={14} />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter leading-none group-hover:text-[#c5a044] transition-colors">
                                            {center.city}
                                        </h3>
                                        <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest">{center.state}</p>
                                    </div>

                                    <p className="text-slate-500 text-xs font-semibold leading-relaxed uppercase tracking-wide flex items-start gap-2">
                                        <Building2 size={14} className="text-slate-300 mt-0.5 shrink-0" />
                                        {center.address}
                                    </p>
                                </div>

                                <div className="pt-6 mt-6 border-t border-slate-50 flex items-center justify-between relative z-10">
                                    <Link to="/contact-us" className="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2">
                                        Enquire Campus <ChevronRight size={12} />
                                    </Link>
                                    <Link to="/contact-us" className="text-[#c5a044] hover:scale-110 transition-transform">
                                        <ArrowUpRight size={18} />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </main>

            {/* --- COMING SOON CTA SECTION --- */}
            <section className="py-24 px-6 bg-white border-t border-slate-100">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-slate-900 leading-none">
                        More Locations On The Way
                    </h2>
                    <p className="text-slate-500 font-bold uppercase text-xs tracking-widest max-w-md mx-auto leading-relaxed">
                        We are actively expanding our creative ecosystem to new hubs across India. Stay tuned.
                    </p>
                    <div className="flex justify-center pt-4">
                        <button
                            onClick={() => navigate('/')}
                            className="px-10 py-5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-full font-black uppercase text-xs tracking-widest flex items-center gap-3 transition-all shadow-sm cursor-pointer"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c5a044] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c5a044]"></span>
                            </span>
                            Coming Soon
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Location;
