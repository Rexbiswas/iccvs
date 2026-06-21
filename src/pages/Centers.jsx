import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MapPin, Globe, ArrowUpRight,
    Navigation, Building2, Phone, Mail,
    ChevronRight, Sparkles, Zap, GraduationCap,
    Search
} from 'lucide-react';
import { Link } from 'react-router-dom';
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
        { city: "Davangere", address: "VHV Heights, 492/3, Hadadi Road, Davangere – 577002", state: "Karnataka" },
        { city: "Vijayawada", address: "3rd floor, above Indian Bank, opposite Jade suites, Acharya Ranga Nagar, Benz Circle, Vijayawada, Andhra Pradesh 520010", state: "Andhra Pradesh" },
        { city: "Thrissur", address: "G65F+2HQ Fabis Arcade, High Rd, Kuriachira, Thrissur, Kerala 680006", state: "Kerala" }
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

const Centers = () => {
    const [selectedZone, setSelectedZone] = useState("All");
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
        <div className="bg-white min-h-screen font-sans">
            <SEO 
                title="Centers Across India | 23+ INSD Locations"
                description="Find an INSD center near you. With over 23+ campuses across India, categorized by West, South, North, and East zones."
            />

            {/* --- HERO SECTION --- */}
            <section className="pt-32 pb-16 px-6 md:px-12 lg:px-24 bg-slate-50 border-b border-slate-100">
                <div className="max-w-7xl mx-auto space-y-12 text-center">
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.4em] text-primary"
                        >
                            National Network
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-clamp-5xl font-black text-slate-900 tracking-tighter leading-[0.85] uppercase"
                        >
                            23+ <br /> <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-slate-500 to-secondary">CENTERS.</span>
                        </motion.h1>
                        <p className="text-slate-500 max-w-xl mx-auto text-lg font-medium tracking-tight">
                            One of India's largest design education network. Bridging regional creativity with global standards.
                        </p>
                    </div>
                </div>
            </section>

            {/* --- FILTER & SEARCH --- */}
            <section className="sticky top-20 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-100 py-4 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex flex-wrap justify-center gap-2">
                        {["All", "West Zone", "South Zone", "North Zone", "East Zone"].map((zone) => (
                            <button
                                key={zone}
                                onClick={() => setSelectedZone(zone)}
                                className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${selectedZone === zone
                                        ? "bg-slate-900 text-white shadow-xl shadow-slate-200"
                                        : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                                    }`}
                            >
                                {zone}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-80 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Search by city or state..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-6 py-3 bg-slate-50 border border-slate-100 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                        />
                    </div>
                </div>
            </section>

            {/* --- CENTERS GRID --- */}
            <main className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredCenters.map((center, idx) => (
                            <motion.div
                                layout
                                key={`${center.city}-${center.zone}`}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, delay: idx * 0.05 }}
                                className="group bg-white border border-slate-100 rounded-[2.5rem] p-8 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 relative overflow-hidden flex flex-col justify-between"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <MapPin size={120} />
                                </div>

                                <div className="relative z-10 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="px-4 py-1.5 bg-slate-50 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-primary transition-colors">
                                            {center.zone}
                                        </div>
                                        <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                                            <Navigation size={18} />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter leading-none group-hover:text-primary transition-colors">
                                            {center.city}
                                        </h3>
                                        <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">{center.state}</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3 text-slate-500 font-medium text-sm leading-relaxed">
                                            <Building2 size={16} className="text-slate-300 mt-1 shrink-0" />
                                            {center.address}
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-8 mt-auto border-t border-slate-50 flex items-center justify-between relative z-10">
                                    <Link to="/contact-us" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2">
                                        Enquire Now <ChevronRight size={14} />
                                    </Link>
                                    <Link to="/contact-us" className="text-primary hover:scale-110 transition-transform">
                                        <ArrowUpRight size={20} />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredCenters.length === 0 && (
                    <div className="py-24 text-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                            <Search size={32} />
                        </div>
                        <p className="text-slate-400 font-medium text-lg">No centers found matching "{searchQuery}"</p>
                        <button
                            onClick={() => { setSearchQuery(""); setSelectedZone("All") }}
                            className="text-primary font-black uppercase tracking-widest text-[10px] mt-4 hover:underline"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}
            </main>

            {/* --- CALL TO ACTION --- */}
            <section className="px-6 md:px-12 lg:px-24 pb-24">
                <div className="max-w-7xl mx-auto p-12 md:p-24 bg-slate-900 rounded-[3.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-linear-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                    <div className="relative z-10 space-y-6 text-center md:text-left">
                        <Sparkles className="text-primary mx-auto md:mx-0" size={32} />
                        <h2 className="text-clamp-4xl font-black uppercase tracking-tighter leading-none">
                            CENTERS IN <br /> <span className="text-slate-500 italic">EVERY HUB.</span>
                        </h2>
                        <p className="text-slate-400 max-w-sm font-medium text-lg leading-relaxed">
                            From the bustling streets of Mumbai to the artistic lanes of Kolkata, INSD is where you are.
                        </p>
                    </div>
                    <div className="relative z-10 flex flex-col gap-6 w-full md:w-auto">
                        <div className="flex items-center gap-6 p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white transition-all hover:text-slate-900">
                            <GraduationCap className="text-primary shrink-0" size={32} />
                            <div>
                                <div className="text-2xl font-black tracking-tighter leading-none">75+</div>
                                <div className="text-[10px] font-black uppercase tracking-widest opacity-50">National Locations</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white transition-all hover:text-slate-900 delay-75">
                            <Globe className="text-secondary shrink-0" size={32} />
                            <div>
                                <div className="text-2xl font-black tracking-tighter leading-none">23+</div>
                                <div className="text-[10px] font-black uppercase tracking-widest opacity-50">International Exposure</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Centers;

