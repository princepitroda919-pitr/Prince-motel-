import React, { useState, useEffect } from 'react';
import IntroGate from './components/IntroGate';
import Hero from './components/Hero';
import BookingSystem from './components/BookingSystem';
import FoodMenu from './components/FoodMenu';
import BookingList from './components/BookingList';
import GoogleSEOPanel from './components/GoogleSEOPanel';
import { INITIAL_ROOMS } from './data';
import { Room, Booking, FoodItem } from './types';
import { Bed, Utensils, Award, Shield, KeyRound, Menu, X, Phone, Mail, MapPin, Globe, Sparkles, BookOpen } from 'lucide-react';
import { PrinceCrestLogo } from './components/Hero';
import { VEG_FOOD_ITEMS, NON_VEG_FOOD_ITEMS } from './data';

export default function App() {
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [rooms, setRooms] = useState<Room[]>(INITIAL_ROOMS);
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'rooms' | 'dining' | 'booking-manager' | 'seo'>('rooms');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Load bookings from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('prince_motel_bookings_v2');
      if (stored) {
        setBookings(JSON.parse(stored));
      }
    } catch (e) {
      console.warn("Could not parse offline bookings", e);
    }
  }, []);

  // Save bookings to localStorage whenever they change
  const saveBookings = (updated: Booking[]) => {
    setBookings(updated);
    try {
      localStorage.setItem('prince_motel_bookings_v2', JSON.stringify(updated));
    } catch (err) {
      console.error("Failed to persist bookings state", err);
    }
  };

  // Submit dynamic room booking
  const handleAddBooking = (bookingData: Omit<Booking, 'id' | 'createdAt' | 'grandTotal' | 'roomTotal' | 'foodTotal' | 'totalDays'>) => {
    const checkIn = new Date(bookingData.checkInDate);
    const checkOut = new Date(bookingData.checkOutDate);
    const diffTime = checkOut.getTime() - checkIn.getTime();
    const totalDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    
    const roomTotal = bookingData.rentPerDay * totalDays;
    const foodTotal = 0;
    const grandTotal = roomTotal + foodTotal;

    const uniqueId = `PRNC-${bookingData.roomId}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const newBooking: Booking = {
      ...bookingData,
      id: uniqueId,
      totalDays,
      roomTotal,
      foodTotal,
      grandTotal,
      createdAt: new Date().toISOString(),
    };

    const updated = [...bookings, newBooking];
    saveBookings(updated);

    // Switch tab to let guests see print voucher card
    setActiveTab('booking-manager');
    // Scroll smoothly to reservation display
    setTimeout(() => {
      document.getElementById('billing-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  // Deliver Cuisine to the guest's booked room
  const handleAddFoodToBooking = (bookingId: string, foodPayload: { foodId: string; quantity: number }[]) => {
    const allItems = [...VEG_FOOD_ITEMS, ...NON_VEG_FOOD_ITEMS];

    const updated = bookings.map((b) => {
      if (b.id !== bookingId) return b;

      // Deep copy existing food array or create a clean one
      const existingOrders = [...b.foodOrders];

      foodPayload.forEach(({ foodId, quantity }) => {
        const itemInfo = allItems.find((itm) => itm.id === foodId);
        if (!itemInfo) return;

        const matchIdx = existingOrders.findIndex((ord) => ord.foodId === foodId);
        if (matchIdx !== -1) {
          existingOrders[matchIdx].quantity += quantity;
        } else {
          existingOrders.push({
            foodId,
            foodName: itemInfo.name,
            quantity,
            price: itemInfo.price, // standard veg 500, nonveg 600
          });
        }
      });

      // Recalculate totals
      const foodTotal = existingOrders.reduce((sum, ord) => sum + ord.price * ord.quantity, 0);
      const grandTotal = b.roomTotal + foodTotal;

      return {
        ...b,
        foodOrders: existingOrders,
        foodTotal,
        grandTotal,
      };
    });

    saveBookings(updated);

    // Prompt user to view receipt with real-time updates
    setActiveTab('booking-manager');
    setTimeout(() => {
      document.getElementById('billing-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  // Vacate room & free the master key back to inventory pool
  const handleCancelBooking = (bookingId: string) => {
    const updated = bookings.filter((b) => b.id !== bookingId);
    saveBookings(updated);
  };

  // Calculate live rooms available
  const reservedRoomIds = bookings.map((b) => b.roomId);
  const totalRoomsAvailable = INITIAL_ROOMS.filter((r) => !reservedRoomIds.includes(r.id)).length;

  // Let intro screen load first if not entered yet
  if (!hasEntered) {
    return <IntroGate onEnter={() => setHasEntered(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 flex flex-col justify-between font-sans relative antialiased leading-relaxed border-8 border-[#22c55e]">
      
      {/* GLORIOUS GREEN GLOW ATMOSPHERE */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#22c55e]/[0.03] blur-[150px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full bg-green-500/[0.02] blur-[150px] pointer-events-none"></div>

      {/* HEADER SECTION WITH DESIGN ARCHITECTURE */}
      <header className="sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b border-[#22c55e]/30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Main Logo Anchor brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-none bg-[#22c55e]/10 border border-[#22c55e]/40 flex items-center justify-center font-bold font-mono text-[#22c55e]">
              P
            </div>
            <div>
              <span className="font-black text-white text-base tracking-wider uppercase flex items-center gap-1.5">
                Prince <span className="text-[#22c55e]">Motel</span>
                <span className="text-[9px] bg-[#22c55e]/10 text-[#22c55e] font-mono px-1.5 py-0.5 border border-[#22c55e]/30 rounded-none font-normal uppercase">gateway</span>
              </span>
              <span className="text-[10px] text-gray-500 block font-mono uppercase tracking-wider">05 Suite Sovereign Isolation</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center bg-zinc-950 border border-zinc-900 rounded-none px-1 py-1 gap-1">
            <button
              onClick={() => { setActiveTab('rooms'); document.getElementById('rooms-section')?.scrollIntoView({ behavior: 'smooth' }); }}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-none transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'rooms' ? 'bg-[#22c55e] text-black shadow-sm' : 'text-gray-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <Bed className="w-3.5 h-3.5" /> Suites Booking
            </button>
            <button
              onClick={() => { setActiveTab('dining'); document.getElementById('dining-section')?.scrollIntoView({ behavior: 'smooth' }); }}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-none transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'dining' ? 'bg-[#22c55e] text-black shadow-sm' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Utensils className="w-3.5 h-3.5" /> Cuisine Lounge
            </button>
            <button
              onClick={() => { setActiveTab('booking-manager'); document.getElementById('billing-section')?.scrollIntoView({ behavior: 'smooth' }); }}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-none transition-all flex items-center gap-1.5 cursor-pointer relative ${
                activeTab === 'booking-manager' ? 'bg-[#22c55e] text-black shadow-sm' : 'text-gray-400 hover:text-white'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" /> Boarding Passkeys
              {bookings.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#22c55e] border border-black text-black text-[9px] font-bold rounded-full flex items-center justify-center font-mono">
                  {bookings.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('seo')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-none transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'seo' ? 'bg-[#22c55e] text-black shadow-sm' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" /> Google SEO Index
            </button>
          </nav>

          {/* Key status metrics */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="text-right font-mono">
              <span className="text-[9px] text-gray-500 uppercase block tracking-widest">Keys Available</span>
              <span className="text-xs font-bold text-[#22c55e]">0{totalRoomsAvailable} of 05 Left</span>
            </div>
            <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse"></div>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-400 hover:text-white p-1"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>

        {/* Mobile slide drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 bg-zinc-950 border border-zinc-900 rounded-2xl p-4 space-y-2 absolute left-6 right-6 top-16 shadow-2xl z-50">
            <button
              onClick={() => { setActiveTab('rooms'); setMobileMenuOpen(false); document.getElementById('rooms-section')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="w-full text-left font-bold text-xs p-3 hover:bg-zinc-900 rounded-xl flex items-center gap-2"
            >
              <Bed className="w-4 h-4 text-emerald-500" /> Suites Booking Desk
            </button>
            <button
              onClick={() => { setActiveTab('dining'); setMobileMenuOpen(false); document.getElementById('dining-section')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="w-full text-left font-bold text-xs p-3 hover:bg-zinc-900 rounded-xl flex items-center gap-2"
            >
              <Utensils className="w-4 h-4 text-emerald-500" /> Dining Tray Catalog
            </button>
            <button
              onClick={() => { setActiveTab('booking-manager'); setMobileMenuOpen(false); document.getElementById('billing-section')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="w-full text-left font-bold text-xs p-3 hover:bg-zinc-900 rounded-xl flex items-center gap-2 justify-between"
            >
              <span className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-emerald-500" /> Boarding Passkeys
              </span>
              {bookings.length > 0 && (
                <span className="bg-emerald-500 text-black text-[10px] font-mono px-2 py-0.5 rounded-full font-bold">
                  {bookings.length} active
                </span>
              )}
            </button>
            <button
              onClick={() => { setActiveTab('seo'); setMobileMenuOpen(false); }}
              className="w-full text-left font-bold text-xs p-3 hover:bg-zinc-900 rounded-xl flex items-center gap-2"
            >
              <Globe className="w-4 h-4 text-emerald-500" /> Google Search SEO Setup
            </button>
          </div>
        )}
      </header>

      {/* CORE ADVENTUROUS CONTENT */}
      <main className="flex-1">
        {/* Immersive Welcome Area */}
        <Hero
          availableCount={totalRoomsAvailable}
          onScrollToBooking={() => { setActiveTab('rooms'); setTimeout(() => document.getElementById('rooms-section')?.scrollIntoView({ behavior: 'smooth' }), 50); }}
          onScrollToFood={() => { setActiveTab('dining'); setTimeout(() => document.getElementById('dining-section')?.scrollIntoView({ behavior: 'smooth' }), 50); }}
        />

        {/* Tab Components layout */}
        <div className="bg-[#050505]">
          {activeTab === 'rooms' && (
            <BookingSystem
              rooms={rooms}
              bookings={bookings}
              onSubmitBooking={handleAddBooking}
              selectedRoomId={selectedRoomId}
              setSelectedRoomId={setSelectedRoomId}
            />
          )}

          {activeTab === 'dining' && (
            <FoodMenu
              bookings={bookings}
              onAddFoodToBooking={handleAddFoodToBooking}
            />
          )}

          {activeTab === 'booking-manager' && (
            <BookingList
              bookings={bookings}
              onCancelBooking={handleCancelBooking}
            />
          )}

          {activeTab === 'seo' && (
            <GoogleSEOPanel />
          )}
        </div>
      </main>

      {/* HIGHLY DETAILED GUEST SECTOR FOOTER */}
      <footer className="bg-black border-t border-zinc-900 py-16 px-6 mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Logo brand & Crest illustration */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-bold text-emerald-400 text-lg font-serif">
                P
              </div>
              <div>
                <h4 className="text-lg font-bold text-white tracking-widest uppercase">PRINCE MOTEL</h4>
                <p className="text-xs text-gray-500 font-mono">ESTD. 2026 — CROSS BORDER SANCTUARY</p>
              </div>
            </div>
            
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Sovereign boutique chambers built for luxurious travelers looking for absolute calmness, custom automated checkout, and authentic traditional cuisine.
            </p>

            <div className="flex text-emerald-400">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-lg">★</span>
              ))}
              <span className="text-xs text-gray-500 ml-1.5 self-center font-mono">(5.0/5 Star rating)</span>
            </div>
          </div>

          {/* Quick Specifications */}
          <div className="md:col-span-4 text-xs font-mono text-zinc-400 space-y-3 border-t md:border-t-0 border-zinc-900 pt-6 md:pt-0">
            <span className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest block">Resort specifications</span>
            
            <div className="flex justify-between pb-1.5 border-b border-zinc-900/60">
              <span className="text-zinc-500">Inventory Cap:</span>
              <span className="font-bold text-emerald-400">Exactly 5 Rooms</span>
            </div>
            <div className="flex justify-between pb-1.5 border-b border-zinc-900/60">
              <span className="text-zinc-500">Premium AC:</span>
              <span className="font-bold text-white">₹3000 / day</span>
            </div>
            <div className="flex justify-between pb-1.5 border-b border-zinc-900/60">
              <span className="text-zinc-500">Normal Room:</span>
              <span className="font-bold text-white">₹1500 / day</span>
            </div>
            <div className="flex justify-between pb-1.5 border-b border-zinc-900/60">
              <span className="text-zinc-500">Veg Dish Tariff:</span>
              <span className="font-bold text-white">₹500 / per dish</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Non-Veg Dish Tariff:</span>
              <span className="font-bold text-white">₹600 / per dish</span>
            </div>
          </div>

          {/* Locations and contacts */}
          <div className="md:col-span-4 text-xs font-mono text-zinc-400 space-y-3 border-t md:border-t-0 border-zinc-900 pt-6 md:pt-0">
            <span className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest block">Contact & Location</span>
            
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <p className="text-zinc-300">
                Out-Of-Country Sector 12,<br />
                Prince Retreat Road near Cross-Border Haven.<br />
                <span className="text-[10px] text-zinc-600">Simulated International Lands</span>
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-emerald-500" />
              <span>+91 919-PRINCE-MOTEL</span>
            </div>

            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-emerald-500" />
              <span>prince@resortmail.luxury</span>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-zinc-900 text-center text-[10px] text-zinc-600 font-mono tracking-wider">
          © 2026 Prince Motel Global Resort. Handcrafted in Midnight-Black & Emerald-Green. Tested for Instant Google Search Snippet indexing.
        </div>
      </footer>

    </div>
  );
}
