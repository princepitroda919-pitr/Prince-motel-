import React, { useRef } from 'react';
import { Booking } from '../types';
import { Sparkles, Printer, User, Calendar, Coffee, CreditCard, XCircle, FileText } from 'lucide-react';
import { VEG_FOOD_ITEMS, NON_VEG_FOOD_ITEMS } from '../data';

interface BookingListProps {
  bookings: Booking[];
  onCancelBooking: (bookingId: string) => void;
}

export default function BookingList({ bookings, onCancelBooking }: BookingListProps) {
  const printableRef = useRef<HTMLDivElement>(null);

  const handlePrint = (bookingId: string) => {
    const printContent = document.getElementById(`ticket-${bookingId}`);
    if (!printContent) return;
    
    const originalContent = document.body.innerHTML;
    const printWindowContent = `
      <html>
        <head>
          <title>Receipt_Prince_Motel_${bookingId}</title>
          <style>
            body { background: white; color: black; font-family: 'Outfit', sans-serif; padding: 40px; }
            .ticket-border { border: 2px dashed #10b981; padding: 25px; border-radius: 12px; }
            .header-title { font-size: 28px; font-weight: bold; text-align: center; color: #042f1a; margin-bottom: 5px; }
            .header-subtitle { text-align: center; color: #666; font-size: 12px; margin-bottom: 25px; }
            .grid-data { display: grid; grid-template-cols: 1fr 1fr; gap: 15px; margin-bottom: 20px; }
            .data-box { border-bottom: 1px solid #eee; padding-bottom: 8px; }
            .data-label { font-size: 11px; text-transform: uppercase; color: #888; }
            .data-val { font-size: 14px; font-weight: bold; }
            .table-head { border-bottom: 2px solid #000; font-weight: bold; margin-top: 25px; padding-bottom: 5px; }
            .table-row { display: flex; justify-content: space-between; font-size: 13px; padding: 8px 0; border-bottom: 1px solid #eee; }
            .grand-total { font-size: 18px; font-weight: bold; text-align: right; margin-top: 20px; color: #10b981; }
            .barcode { text-align: center; letter-spacing: 6px; font-family: monospace; font-size: 18px; margin-top: 30px; opacity: 0.8; }
          </style>
        </head>
        <body>
          <div class="ticket-border">
            ${printContent.innerHTML}
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printWindowContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    }
  };

  return (
    <section id="billing-section" className="py-20 px-6 max-w-5xl mx-auto z-10 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-none bg-[#22c55e]/5 blur-[120px] pointer-events-none"></div>

      {/* Main Header */}
      <div className="text-left mb-16 border-l-4 border-[#22c55e] pl-6 py-2">
        <span className="text-[#22c55e] font-mono tracking-widest text-xs uppercase block mb-2">hotel administration</span>
        <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tighter leading-none">
          Control <span className="text-[#22c55e]">Desk</span>
        </h2>
        <p className="text-gray-400 max-w-xl mt-4 text-xs font-mono uppercase tracking-wider leading-relaxed">
          Manage your active suite pass keys, review added catering orders, generate PDF vouchers, or cancel stays to free keys back to the global room pool.
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-[#111] border-2 border-[#22c55e]/20 rounded-none p-12 text-center text-gray-500 max-w-2xl mx-auto neon-glow-green">
          <FileText className="w-12 h-12 text-[#22c55e]/40 mx-auto mb-4" />
          <h3 className="text-white font-black text-lg mb-2 uppercase tracking-wide">No Active Reservations</h3>
          <p className="text-xs max-w-sm mx-auto leading-relaxed text-gray-400 font-mono uppercase tracking-wider">
            There are currently no guest suites checked out. Pick any available room, lock in your stay dates, and your premium smart card keys will generate right here.
          </p>
        </div>
      ) : (
        <div className="space-y-12">
          {bookings.map((booking) => {
            return (
              <div
                key={booking.id}
                className="bg-[#111111] border-2 border-[#22c55e]/30 rounded-none overflow-hidden relative"
              >
                {/* Boarding Ticket Header */}
                <div className="bg-black px-6 py-4 border-b border-[#22c55e]/20 flex flex-wrap justify-between items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-none bg-[#22c55e]/10 border border-[#22c55e]/30 flex items-center justify-center">
                      <span className="text-[#22c55e] font-mono font-black">0{booking.roomId}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-[#22c55e] font-mono uppercase tracking-widest font-black block">PASSKEY ID</span>
                      <span className="text-xs font-mono text-zinc-300 font-bold uppercase">{booking.id}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {/* Print Recipe Button */}
                    <button
                      onClick={() => handlePrint(booking.id)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-none bg-[#22c55e]/10 border border-[#22c55e] text-[#22c55e] text-xs font-black uppercase tracking-widest hover:bg-[#22c55e] hover:text-black transition-all cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" /> Print Receipt
                    </button>

                    {/* Void Key Button */}
                    <button
                      onClick={() => onCancelBooking(booking.id)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-none bg-black hover:bg-red-950 hover:text-red-400 text-zinc-400 text-xs font-black uppercase tracking-widest transition-all cursor-pointer border border-[#22c55e]/20 hover:border-red-900"
                    >
                      <XCircle className="w-3.5 h-3.5" /> Vacate Suite
                    </button>
                  </div>
                </div>

                {/* Printable Ticket Area */}
                <div id={`ticket-${booking.id}`} className="p-6 md:p-8 bg-black/40">
                  <div className="flex flex-col md:flex-row justify-between gap-8">
                    
                    {/* GUEST PASS DETAILS */}
                    <div className="flex-1 space-y-6">
                      <div className="border-b border-[#22c55e]/10 pb-3">
                        <span className="text-xs text-[#22c55e] font-mono uppercase tracking-widest block mb-1">CROWN RESORT ENTRANCE RECONCILIATION</span>
                        <h4 className="text-xl font-black text-white uppercase tracking-tight">PRINCE MOTEL LUXURY HUB</h4>
                      </div>

                      <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-xs sm:text-sm font-mono text-zinc-400 uppercase tracking-wider">
                        <div>
                          <span className="text-[10px] uppercase text-zinc-600 block">Lead Guest</span>
                          <span className="font-bold text-white flex items-center gap-1.5 mt-1 font-sans"><User className="w-3.5 h-3.5 text-[#22c55e]" /> {booking.customerName}</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase text-zinc-600 block">Contact Email</span>
                          <span className="font-bold text-zinc-300 mt-1 block truncate lowercase font-sans">{booking.customerEmail}</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase text-zinc-600 block">Check In Date</span>
                          <span className="font-bold text-white flex items-center gap-1.5 mt-1"><Calendar className="w-3.5 h-3.5 text-[#22c55e]" /> {booking.checkInDate}</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase text-zinc-600 block">Check Out Date</span>
                          <span className="font-bold text-white flex items-center gap-1.5 mt-1"><Calendar className="w-3.5 h-3.5 text-[#22c55e]" /> {booking.checkOutDate}</span>
                        </div>
                      </div>
                    </div>

                    {/* DYNAMIC BILL SUMMARY */}
                    <div className="md:w-80 bg-black/60 border border-[#22c55e]/15 rounded-none p-6 flex flex-col justify-between font-mono text-xs uppercase tracking-wide">
                      <div>
                        <h5 className="text-white font-black mb-4 flex items-center gap-1.5"><CreditCard className="w-4 h-4 text-[#22c55e]" /> Tariff Reconciliation</h5>
                        
                        <div className="space-y-3 text-zinc-400">
                          <div className="flex justify-between items-start">
                            <span>Room 0{booking.roomId} Rent:<br />
                              <span className="text-[8px] text-[#22c55e]/70 font-mono">({booking.roomType === 'premium' ? "Premium AC Suite" : "Normal Non-AC"})</span>
                            </span>
                            <span className="text-white font-bold">₹{booking.rentPerDay} × {booking.totalDays} Days</span>
                          </div>
                          
                          <div className="flex justify-between font-black border-b border-[#22c55e]/10 pb-3">
                            <span>Room Subtotal:</span>
                            <span className="text-white">₹{booking.roomTotal}</span>
                          </div>

                          {/* Food Orders mapping */}
                          <div className="space-y-2 pt-2">
                            <span className="text-[9px] uppercase text-zinc-500 font-black flex items-center gap-1"><Coffee className="w-3.5 h-3.5 text-[#22c55e]" /> Kitchen Deliveries:</span>
                            {booking.foodOrders.length > 0 ? (
                              booking.foodOrders.map((ord, idx) => (
                                <div key={idx} className="flex justify-between text-[11px] text-zinc-300">
                                  <span className="truncate max-w-[150px]">{ord.foodName} (×{ord.quantity})</span>
                                  <span>₹{ord.price * ord.quantity}</span>
                                </div>
                              ))
                            ) : (
                              <p className="text-[9px] text-zinc-600 italic">No kitchen orders loaded on ticket yet. Order inside Cuisine lounge above.</p>
                            )}
                          </div>

                          <div className="flex justify-between font-black border-t border-[#22c55e]/10 pt-2 pb-2">
                            <span>Kitchen Subtotal:</span>
                            <span className="text-white">₹{booking.foodTotal}</span>
                          </div>
                        </div>
                      </div>

                      {/* grand unified total */}
                      <div className="border-t border-dashed border-[#22c55e]/20 pt-4 mt-4 flex justify-between items-center text-sm font-bold">
                        <span className="text-white uppercase text-[10px] tracking-widest font-black">Unified Due</span>
                        <span className="text-[#22c55e] text-lg font-black font-mono">₹{booking.grandTotal}</span>
                      </div>
                    </div>
                  </div>

                  {/* Aesthetic barcode */}
                  <div className="mt-8 pt-6 border-t border-[#22c55e]/10 flex flex-col items-center justify-center select-none text-center">
                    <span className="text-[9px] text-[#22c55e]/50 font-mono tracking-widest block mb-1 uppercase">AUTOMATED RESORT GATE KEYPASS</span>
                    <div className="text-[#22c55e]/35 text-xl font-mono tracking-[4px] leading-none mb-1">
                      ||| | |||| ||| |||| | ||| | |||| || |||| ||| ||
                    </div>
                    <span className="text-[10px] font-mono text-zinc-600 font-bold uppercase">PRNC-{booking.id.toUpperCase()}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
