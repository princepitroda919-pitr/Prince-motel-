import React, { useState } from 'react';
import { FoodItem, Booking } from '../types';
import { VEG_FOOD_ITEMS, NON_VEG_FOOD_ITEMS } from '../data';
import { Wine, Utensils, Sparkles, ShoppingBag, Plus, Minus, Check, ScrollText, AlertTriangle } from 'lucide-react';

interface FoodMenuProps {
  bookings: Booking[];
  onAddFoodToBooking: (bookingId: string, foodItems: { foodId: string; quantity: number }[]) => void;
}

export default function FoodMenu({ bookings, onAddFoodToBooking }: FoodMenuProps) {
  const [activeTab, setActiveTab] = useState<'veg' | 'non-veg'>('veg');
  const [cart, setCart] = useState<{ [id: string]: number }>({});
  const [selectedBookingId, setSelectedBookingId] = useState<string>("");
  const [orderIssued, setOrderIssued] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const allItems = [...VEG_FOOD_ITEMS, ...NON_VEG_FOOD_ITEMS];

  const updateCartQty = (id: string, delta: number) => {
    setCart((prev) => {
      const current = prev[id] || 0;
      const next = current + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
  };

  const getCartTotal = () => {
    return Object.entries(cart).reduce((sum, [id, qty]) => {
      const match = allItems.find((i) => i.id === id);
      const numericQty = qty as number;
      return sum + (match ? match.price * numericQty : 0);
    }, 0);
  };

  const handlePlaceFoodOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (Object.keys(cart).length === 0) {
      setErrorMessage("Please add at least one delicacy to your tray first.");
      return;
    }

    if (!selectedBookingId) {
      setErrorMessage("Please select your active room ticket to place this order.");
      return;
    }

    const payload = Object.entries(cart).map(([id, qty]) => ({
      foodId: id,
      quantity: qty as number,
    }));

    onAddFoodToBooking(selectedBookingId, payload);
    setCart({});
    setOrderIssued(true);
    setTimeout(() => {
      setOrderIssued(false);
    }, 4500);
  };

  return (
    <section id="dining-section" className="py-20 px-6 max-w-7xl mx-auto z-10 relative">
      <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-none bg-[#22c55e]/5 blur-[100px] pointer-events-none"></div>

      {/* Main Dining Header */}
      <div className="text-left mb-16 border-l-4 border-[#22c55e] pl-6 py-2">
        <span className="text-[#22c55e] font-mono tracking-widest text-xs uppercase block mb-2">dining experience</span>
        <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tighter leading-none">
          Prince <span className="text-[#22c55e]">Banquet</span>
        </h2>
        <p className="text-gray-400 max-w-xl mt-4 text-xs font-mono uppercase tracking-wider leading-relaxed">
          All meals are professionally prepared. Savor pure vegetarian delicacies and sizzling premium non-vegetarian selection included in your experience at specialized pricing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: FOOD ITEMS CATALOG - 7 COLUMNS */}
        <div className="lg:col-span-7">
          {/* Custom Tabs */}
          <div className="flex bg-[#111] border border-[#22c55e]/20 rounded-none p-1 mb-8">
            <button
              onClick={() => setActiveTab('veg')}
              className={`flex-1 py-3 px-4 rounded-none text-xs sm:text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 ${
                activeTab === 'veg'
                  ? 'bg-[#22c55e] text-black'
                  : 'text-gray-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <span className="w-2.5 h-2.5 bg-green-500 inline-block border border-black"></span>
              Veg Menu (₹500/-)
            </button>
            <button
              onClick={() => setActiveTab('non-veg')}
              className={`flex-1 py-3 px-4 rounded-none text-xs sm:text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 ${
                activeTab === 'non-veg'
                  ? 'bg-red-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <span className="w-2.5 h-2.5 bg-red-600 inline-block border border-black"></span>
              Non-veg Menu (₹600/-)
            </button>
          </div>

          {/* Cards List */}
          <div className="space-y-4">
            {(activeTab === 'veg' ? VEG_FOOD_ITEMS : NON_VEG_FOOD_ITEMS).map((item) => {
              const qtyInCart = cart[item.id] || 0;

              return (
                <div
                  key={item.id}
                  className="bg-[#111] border border-[#22c55e]/15 hover:border-[#22c55e]/40 rounded-none p-6 transition-all duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative overflow-hidden"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`w-3 h-3 rounded-none border ${item.category === 'veg' ? 'bg-[#22c55e] border-[#22c55e]' : 'bg-red-600 border-red-400'} flex items-center justify-center`}>
                        <span className="w-1.5 h-1.5 bg-black"></span>
                      </span>
                      <span className={`text-[10px] uppercase font-black font-mono tracking-widest ${item.category === 'veg' ? 'text-[#22c55e]' : 'text-red-500'}`}>
                        {item.category === 'veg' ? 'VEGETARIAN SELECTION' : 'NON-VEG PROTEIN ITEM'}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white uppercase tracking-tight">{item.name}</h3>
                    <p className="text-xs text-gray-400 mt-2 leading-relaxed max-w-md">
                      {item.description}
                    </p>
                    <span className="text-xs font-bold font-mono text-white inline-block mt-3 bg-black border border-white/10 px-3 py-0.5 rounded-none uppercase tracking-widest">
                      Tariff: ₹{item.price} per plate
                    </span>
                  </div>

                  {/* Quantity selector button */}
                  <div className="shrink-0 flex items-center h-10 w-full sm:w-auto mt-2 sm:mt-0 bg-black border border-[#22c55e]/20 rounded-none px-2">
                    {qtyInCart > 0 ? (
                      <div className="flex items-center justify-between w-full sm:w-28 font-mono">
                        <button
                          onClick={() => updateCartQty(item.id, -1)}
                          className="w-8 h-8 rounded-none bg-zinc-950 hover:bg-[#22c55e] hover:text-black flex items-center justify-center text-gray-400 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-sm font-black text-white">{qtyInCart}</span>
                        <button
                          onClick={() => updateCartQty(item.id, 1)}
                          className="w-8 h-8 rounded-none bg-zinc-950 hover:bg-[#22c55e] hover:text-black flex items-center justify-center text-gray-400 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => updateCartQty(item.id, 1)}
                        className={`w-full sm:w-28 py-1.5 text-xs font-black uppercase tracking-widest rounded-none transition-all duration-300 flex items-center justify-center gap-1 ${
                          activeTab === 'veg' ? 'text-[#22c55e] hover:bg-[#22c55e] hover:text-black' : 'text-red-500 hover:bg-red-500 hover:text-white'
                        }`}
                      >
                        <Plus className="w-3.5 h-3.5" /> Add to Tray
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Hygiene Protocol Box */}
          <div className="mt-8 p-4 border-2 border-dashed border-[#22c55e]/20 rounded-none flex items-center gap-4 bg-[#111111]/50">
            <div className="w-12 h-12 bg-[#22c55e] shrink-0 flex items-center justify-center font-bold text-black text-xl">!</div>
            <p className="text-[10px] text-gray-400 uppercase leading-relaxed font-mono">
              Our kitchens follow strict hygiene protocols to ensure quality and hygiene at international motel standards. veg & non-veg preparational partitions apply.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: ACTIVE ORDER DRAWER / CHECKOUT - 5 COLUMNS */}
        <div className="lg:col-span-5 bg-[#111] border-2 border-[#22c55e]/30 rounded-none p-6 lg:sticky lg:top-24 select-none">
          <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2 flex items-center gap-2 border-l-4 border-[#22c55e] pl-3">
            Dining Tray
          </h3>
          <p className="text-[10px] text-gray-500 mb-6 font-mono uppercase tracking-wider">
            Link and deliver gourmet plates to your booked room.
          </p>

          {/* Success Box */}
          {orderIssued && (
            <div className="mb-6 p-4 bg-zinc-900 border border-[#22c55e] rounded-none flex items-center gap-3 text-[#22c55e] text-xs font-mono uppercase tracking-wider">
              <Check className="w-5 h-5 shrink-0 text-[#22c55e]" />
              <span>Gourmet order fired to chefs! Billing is automatically charged to receipt.</span>
            </div>
          )}

          {/* Cart list items */}
          {Object.keys(cart).length > 0 ? (
            <div className="space-y-3 mb-6 max-h-56 overflow-y-auto pr-1">
              {Object.entries(cart).map(([id, qty]) => {
                const info = allItems.find((i) => i.id === id);
                if (!info) return null;

                return (
                  <div key={id} className="flex justify-between items-center text-xs text-gray-300 font-mono py-1.5 border-b border-[#22c55e]/10">
                    <div className="flex flex-col">
                      <span className="font-bold text-white uppercase tracking-wider">{info.name}</span>
                      <span className="text-gray-500 text-[10px]">₹{info.price} × {qty as number} PLATES</span>
                    </div>
                    <span className="font-bold text-[#22c55e] font-mono whitespace-nowrap">₹{info.price * (qty as number)}</span>
                  </div>
                );
              })}

              <div className="pt-3 flex justify-between items-center font-bold text-white text-sm font-mono border-t border-[#22c55e]/20 uppercase tracking-widest">
                <span>Tray Total:</span>
                <span className="text-[#22c55e] text-lg font-bold font-mono">₹{getCartTotal()}</span>
              </div>
            </div>
          ) : (
            <div className="p-8 border-2 border-dashed border-zinc-800 rounded-none text-center text-xs text-gray-500 mb-6 font-mono uppercase tracking-wide">
              Tray is empty. Tap "Add to Tray" to queue plates!
            </div>
          )}

          {/* Form to submit to booked rooms */}
          <form onSubmit={handlePlaceFoodOrder} className="space-y-4 pt-4 border-t border-[#22c55e]/15">
            <div>
              <label className="block text-xs uppercase text-gray-400 font-bold mb-2 font-mono tracking-widest">
                Chamber Reservation Link
              </label>

              {bookings.length > 0 ? (
                <select
                  value={selectedBookingId}
                  onChange={(e) => setSelectedBookingId(e.target.value)}
                  className="w-full bg-black border border-[#22c55e]/25 rounded-none py-2.5 px-3 text-xs text-gray-200 focus:outline-none focus:border-[#22c55e] font-mono tracking-wider uppercase"
                  required
                >
                  <option value="">— Choose your matching key —</option>
                  {bookings.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.customerName} : Suite {b.roomId} ({b.roomType === 'premium' ? "AC" : "Non-AC"})
                    </option>
                  ))}
                </select>
              ) : (
                <div className="p-3 bg-red-950/20 border border-red-950 rounded-none text-[10px] text-red-400 flex items-start gap-2 font-mono uppercase tracking-wide leading-relaxed">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>No active room key in this browser session. Please reserve a room first before ordering hot cuisine!</span>
                </div>
              )}
            </div>

            {errorMessage && (
              <p className="text-[11px] text-red-500 font-mono uppercase tracking-wide">{errorMessage}</p>
            )}

            {bookings.length > 0 && (
              <button
                type="submit"
                disabled={Object.keys(cart).length === 0}
                className={`w-full py-3.5 rounded-none font-bold font-sans transition-all duration-300 text-xs uppercase tracking-widest flex items-center justify-center gap-2 ${
                  Object.keys(cart).length > 0
                    ? 'bg-[#22c55e] text-black hover:bg-white cursor-pointer active:scale-[0.98]'
                    : 'bg-zinc-900 text-zinc-600 cursor-not-allowed'
                }`}
              >
                <Utensils className="w-4 h-4 text-black" /> Charge & Deliver Cuisine
              </button>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
