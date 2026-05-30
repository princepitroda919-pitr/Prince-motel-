import React, { useState } from 'react';
import { Room, Booking, FoodItem } from '../types';
import { Sparkles, Calendar, User, Mail, DollarSign, ShieldAlert, BadgePercent, CheckCircle, Info } from 'lucide-react';

interface BookingSystemProps {
  rooms: Room[];
  bookings: Booking[];
  onSubmitBooking: (bookingData: Omit<Booking, 'id' | 'createdAt' | 'grandTotal' | 'roomTotal' | 'foodTotal' | 'totalDays'>) => void;
  selectedRoomId: number | null;
  setSelectedRoomId: (id: number | null) => void;
}

export default function BookingSystem({
  rooms,
  bookings,
  onSubmitBooking,
  selectedRoomId,
  setSelectedRoomId,
}: BookingSystemProps) {
  // Input fields state
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [errorText, setErrorText] = useState("");
  const [successMode, setSuccessMode] = useState(false);

  // Determine which rooms are currently active/reserved in localStorage
  const isRoomBooked = (roomId: number) => {
    return bookings.some((b) => b.roomId === roomId);
  };

  const getRoomAvailabilityLabel = (room: Room) => {
    if (isRoomBooked(room.id)) {
      return { status: "Booked", color: "text-red-500 border-red-950 bg-red-950/20", label: "Booked Out" };
    }
    return { status: "Available", color: "text-emerald-400 border-emerald-950 bg-emerald-950/20", label: "Available Now" };
  };

  // Safe rental math
  const calculateDays = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) return 0;
    const diffTime = checkOut.getTime() - checkIn.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const activeRoom = rooms.find((r) => r.id === selectedRoomId);
  const totalDaysComp = calculateDays();
  const roomCostComp = activeRoom ? activeRoom.rentPerDay * totalDaysComp : 0;

  // Handle Booking Submit
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText("");

    if (!selectedRoomId) {
      setErrorText("Please select one of the available rooms first.");
      return;
    }

    if (isRoomBooked(selectedRoomId)) {
      setErrorText("This room is already reserved. Please select another room.");
      return;
    }

    if (!customerName.trim() || !customerEmail.trim()) {
      setErrorText("Please complete the Guest Name and Email address.");
      return;
    }

    if (!checkInDate || !checkOutDate) {
      setErrorText("Please select valid check-in and check-out dates.");
      return;
    }

    if (totalDaysComp <= 0) {
      setErrorText("Check-out date must be at least 1 day after the check-in date.");
      return;
    }

    // Submit booking up
    onSubmitBooking({
      customerName,
      customerEmail,
      roomId: selectedRoomId,
      roomName: activeRoom!.name,
      roomType: activeRoom!.type,
      rentPerDay: activeRoom!.rentPerDay,
      checkInDate,
      checkOutDate,
      foodOrders: [], // Food can be added directly inside Restaurant tab or later inside receipt
    });

    // Reset Form
    setCustomerName("");
    setCustomerEmail("");
    setCheckInDate("");
    setCheckOutDate("");
    setSelectedRoomId(null);
    setSuccessMode(true);
    setTimeout(() => {
      setSuccessMode(false);
    }, 4000);
  };

  return (
    <section id="rooms-section" className="py-20 px-6 max-w-7xl mx-auto z-10 relative">
      <div className="absolute top-1/4 right-0 w-80 h-80 rounded-none bg-[#22c55e]/5 blur-[100px] pointer-events-none"></div>

      {/* Grid header */}
      <div className="text-left mb-16 border-l-4 border-[#22c55e] pl-6 py-2">
        <span className="text-[#22c55e] font-mono tracking-widest text-xs uppercase block mb-2">resort accommodation</span>
        <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tighter leading-none">
          Exclusive <span className="text-[#22c55e]">5 Bedchambers</span>
        </h2>
        <p className="text-gray-400 max-w-xl mt-4 text-xs font-mono uppercase tracking-wider leading-relaxed">
          Prince Motel limits room capacity strictly to 05 private suites to ensure supreme isolation, individual maintenance attention, and royal cross-border hospitality.
        </p>
      </div>

      {/* Success notification */}
      {successMode && (
        <div className="mb-8 max-w-2xl mx-auto p-4 bg-zinc-900 border-2 border-[#22c55e] rounded-none flex items-center gap-3 text-[#22c55e] neon-glow-green">
          <CheckCircle className="w-6 h-6 shrink-0 text-[#22c55e]" />
          <div>
            <p className="font-bold text-sm uppercase tracking-wider">Residency Confirmed Successfully!</p>
            <p className="text-xs text-white opacity-70 uppercase font-mono tracking-wide">Your ticket and keys are issued inside the Reservation Manager section.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ROOM CARDS LIST - 7 COLUMNS */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between border-b border-[#22c55e]/20 pb-3">
            <span className="text-xs text-[#22c55e] font-bold font-mono uppercase tracking-widest">Select a Suite below</span>
            <span className="text-xs text-gray-500 font-mono uppercase">Total capacity: 05 physical keys</span>
          </div>

          <div className="space-y-4">
            {rooms.map((room) => {
              const bookingData = getRoomAvailabilityLabel(room);
              const isSelected = selectedRoomId === room.id;
              const isBooked = isRoomBooked(room.id);

              return (
                <div
                  key={room.id}
                  onClick={() => !isBooked && setSelectedRoomId(room.id)}
                  className={`border transition-all duration-300 rounded-none overflow-hidden cursor-pointer flex flex-col md:flex-row relative ${
                    isBooked
                      ? 'opacity-55 border-zinc-900 bg-zinc-950/50 cursor-not-allowed'
                      : isSelected
                      ? 'border-2 border-[#22c55e] bg-[#22c55e]/5'
                      : 'border-[#22c55e]/20 bg-[#111] hover:border-[#22c55e]/50'
                  }`}
                >
                  {/* Photo area */}
                  <div className="md:w-1/3 h-48 md:h-auto relative min-h-[160px] overflow-hidden rounded-none">
                    <img
                      src={room.imageUrl}
                      alt={room.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-2 left-2 px-3 py-1 rounded-none bg-black border border-[#22c55e]/30 text-[10px] font-mono text-gray-300">
                      ID: 0{room.id}
                    </div>
                  </div>

                  {/* Content area */}
                  <div className="p-6 md:w-2/3 flex flex-col justify-between">
                    <div>
                      {/* Availability badge & Rate layout */}
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                        <span className={`px-2 py-0.5 rounded-none text-[9px] font-mono border font-bold uppercase tracking-widest ${
                          isBooked ? 'text-red-500 border-red-950 bg-red-950/20' : 'text-[#22c55e] border-[#22c55e]/20 bg-[#22c55e]/10'
                        }`}>
                          {room.rentPerDay === 3000 ? "AC Suite" : "Non-AC Standard"} • {bookingData.label}
                        </span>
                        
                        <div className="text-right">
                          <span className="text-2xl font-bold text-white font-mono">₹{room.rentPerDay}</span>
                          <span className="text-[10px] text-gray-500 block font-mono uppercase tracking-wider">per day</span>
                        </div>
                      </div>

                      {/* Name of room */}
                      <h3 className="text-xl font-bold text-white uppercase tracking-tight flex items-center gap-1.5 mt-2">
                        {room.name}
                        {room.hasAC && <span className="text-[9px] font-mono px-2 py-0.5 rounded-none bg-[#22c55e] text-black font-bold uppercase tracking-widest">AC EQUIPPED</span>}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                        {room.description}
                      </p>
                    </div>

                    {/* Amenities list */}
                    <div className="mt-4 pt-3 border-t border-[#22c55e]/10 flex flex-wrap gap-1.5">
                      {room.amenities.map((am, i) => (
                        <span key={i} className="text-[10px] bg-black border border-white/5 px-2 py-0.5 rounded-none text-gray-400 font-mono">
                          • {am}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* BOOKED FORM COMPONENT - 5 COLUMNS */}
        <div className="lg:col-span-5 bg-[#111111] border-2 border-[#22c55e]/30 rounded-none p-6 lg:sticky lg:top-24 select-none">
          <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2 flex items-center gap-2 border-l-4 border-[#22c55e] pl-3">
            Suite Booking Desk
          </h3>
          <p className="text-[10px] text-gray-500 mb-6 font-mono uppercase tracking-wider">
            Direct reservation terminal with auto-calculators.
          </p>

          <form onSubmit={handleBookingSubmit} className="space-y-4">
            {/* Display Selected Room Details */}
            {activeRoom ? (
              <div className="p-4 rounded-none bg-[#22c55e]/5 border border-[#22c55e]/30 flex flex-col">
                <span className="text-[10px] text-[#22c55e] uppercase font-mono tracking-widest font-bold">SELECTED CHAMBER</span>
                <span className="text-base font-bold text-white tracking-tight uppercase mt-1">{activeRoom.name}</span>
                <div className="flex justify-between items-center text-xs text-gray-400 mt-2 font-mono uppercase tracking-wider">
                  <span>Daily tariff:</span>
                  <span className="text-[#22c55e] font-black font-mono">₹{activeRoom.rentPerDay} / day</span>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-none bg-black border-2 border-dashed border-[#22c55e]/20 text-center text-xs text-gray-500 py-6 font-mono uppercase tracking-wider">
                No room selected yet. Click any available green-labeled room on the left to start!
              </div>
            )}

            {/* Guest Name */}
            <div>
              <label className="block text-xs uppercase text-gray-400 font-bold mb-2 font-mono tracking-widest">Guest Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Prince Pitroda"
                  className="w-full bg-black border border-[#22c55e]/25 text-white focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e]/30 rounded-none py-2.5 pl-10 pr-4 text-xs sm:text-sm font-sans"
                />
              </div>
            </div>

            {/* Guest Email */}
            <div>
              <label className="block text-xs uppercase text-gray-400 font-bold mb-2 font-mono tracking-widest">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="e.g. prince@resortmail.com"
                  className="w-full bg-black border border-[#22c55e]/25 text-white focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e]/30 rounded-none py-2.5 pl-10 pr-4 text-xs sm:text-sm font-mono"
                />
              </div>
            </div>

            {/* Date Range Inputs */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase text-gray-400 font-bold mb-2 font-mono tracking-widest">Check In</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-500 pointer-events-none" />
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full bg-black border border-[#22c55e]/25 text-white focus:border-[#22c55e] rounded-none py-2.5 pl-9 pr-2 text-xs font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase text-gray-400 font-bold mb-2 font-mono tracking-widest">Check Out</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-500 pointer-events-none" />
                  <input
                    type="date"
                    required
                    min={checkInDate || new Date().toISOString().split('T')[0]}
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full bg-black border border-[#22c55e]/25 text-white focus:border-[#22c55e] rounded-none py-2.5 pl-9 pr-2 text-xs font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Live Pricing Summary block */}
            {activeRoom && totalDaysComp > 0 && (
              <div className="bg-black border border-[#22c55e]/20 rounded-none p-4 mt-6 text-xs font-mono text-zinc-400 space-y-2 uppercase tracking-wide">
                <div className="flex justify-between">
                  <span>Room rent:</span>
                  <span className="text-white">₹{activeRoom.rentPerDay} × {totalDaysComp} days</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-white/5">
                  <span>Veg/Non-veg foods:</span>
                  <span className="text-[#22c55e]">Order at specialised pricing</span>
                </div>
                <div className="flex justify-between font-bold text-white pt-1 text-sm">
                  <span>Residency Total:</span>
                  <span className="text-[#22c55e] text-lg font-mono">₹{roomCostComp}</span>
                </div>
              </div>
            )}

            {/* Errors display */}
            {errorText && (
              <div className="p-3 bg-red-950/30 border border-red-900 text-red-400 rounded-none text-xs flex items-center gap-2 font-mono">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{errorText}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!activeRoom}
              className={`w-full py-3.5 rounded-none text-center font-black uppercase text-xs tracking-widest transition-all duration-300 ${
                activeRoom
                  ? 'bg-[#22c55e] text-black hover:bg-white active:scale-[0.99] cursor-pointer'
                  : 'bg-zinc-900 text-zinc-600 cursor-not-allowed'
              }`}
            >
              Lock In Reservation
            </button>

            <div className="flex items-center gap-1.5 justify-center mt-3 text-[10px] text-gray-500 font-mono text-center uppercase tracking-wide">
              <Info className="w-3.5 h-3.5 text-[#22c55e]" /> authorised capacity: 05 keys
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
