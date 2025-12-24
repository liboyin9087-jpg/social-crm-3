import React, { useState, useEffect } from 'react';
import { QrCode, ArrowLeft, CheckCircle, UserPlus, Gift, RotateCcw } from 'lucide-react';

const KioskMode: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const [step, setStep] = useState<'idle' | 'scanning' | 'success'>('idle');

  // Idle timeout simulator
  useEffect(() => {
    if (step === 'success') {
      const timer = setTimeout(() => setStep('idle'), 5000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="fixed inset-0 bg-oak-bg z-[100] flex flex-col font-sans">
      {/* Kiosk Header */}
      <div className="h-20 bg-oak-purple-700 flex items-center justify-between px-8 shadow-lg">
        <div className="flex items-center space-x-4">
           <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-oak-purple-700 font-bold text-xl">O</div>
           <h1 className="text-white font-display font-bold text-2xl tracking-wide">OakMega Member Station</h1>
        </div>
        <button 
          onClick={onExit}
          className="text-white/50 hover:text-white text-sm border border-white/20 px-4 py-2 rounded-full"
        >
          Exit Kiosk
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center p-8 relative overflow-hidden">
        
        {/* Decorative Circles */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-oak-purple-700/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-oak-orange-400/10 rounded-full blur-3xl"></div>

        {step === 'idle' && (
          <div className="text-center max-w-2xl animate-fade-in">
             <h2 className="text-5xl font-display font-bold text-oak-text-primary mb-8 leading-tight">
               Welcome to the <span className="text-oak-purple-700">OakMega</span> Experience
             </h2>
             <p className="text-xl text-gray-500 mb-12">Scan your member code to check-in and receive exclusive rewards.</p>
             
             <div className="grid grid-cols-2 gap-6">
                <button 
                  onClick={() => setStep('scanning')}
                  className="bg-oak-orange-400 hover:bg-yellow-400 text-oak-purple-900 h-48 rounded-3xl flex flex-col items-center justify-center shadow-xl transform transition-all active:scale-95 group"
                >
                    <QrCode className="w-16 h-16 mb-4 group-hover:scale-110 transition-transform" />
                    <span className="text-2xl font-bold">Scan Member Code</span>
                </button>
                <button 
                  className="bg-white hover:bg-gray-50 border-2 border-oak-purple-700/10 text-oak-purple-700 h-48 rounded-3xl flex flex-col items-center justify-center shadow-sm transform transition-all active:scale-95 group"
                >
                    <UserPlus className="w-16 h-16 mb-4 group-hover:scale-110 transition-transform" />
                    <span className="text-2xl font-bold">New Member</span>
                </button>
             </div>
          </div>
        )}

        {step === 'scanning' && (
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden p-8 text-center relative">
             <button 
               onClick={() => setStep('idle')} 
               className="absolute top-6 left-6 p-2 rounded-full hover:bg-gray-100"
             >
               <ArrowLeft className="w-6 h-6 text-gray-500" />
             </button>
             
             <h3 className="text-2xl font-bold text-gray-800 mb-8">Align QR Code</h3>
             <div className="w-64 h-64 bg-gray-900 mx-auto rounded-3xl mb-8 relative overflow-hidden flex items-center justify-center">
                {/* Mock Camera View */}
                <div className="absolute inset-0 opacity-50 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=800')] bg-cover"></div>
                <div className="w-48 h-48 border-4 border-oak-orange-400 rounded-xl relative z-10 animate-pulse"></div>
                <div className="absolute bottom-4 text-white text-sm bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">Front Camera Active</div>
             </div>

             {/* Simulate Scan Success */}
             <button 
                onClick={() => setStep('success')}
                className="w-full py-4 bg-oak-purple-700 text-white rounded-xl text-lg font-bold shadow-lg hover:bg-oak-purple-900 transition-colors"
             >
               Simulate Scan
             </button>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center animate-bounce-in">
             <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
               <CheckCircle className="w-16 h-16 text-green-500" />
             </div>
             <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome back, Kenji!</h2>
             <p className="text-xl text-gray-500 mb-8">You have checked in successfully.</p>
             
             <div className="bg-white p-6 rounded-2xl shadow-lg border border-oak-orange-400/20 max-w-md mx-auto flex items-center space-x-4">
                <div className="p-4 bg-oak-orange-400/20 rounded-xl">
                  <Gift className="w-8 h-8 text-oak-orange-400" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-lg text-oak-purple-700">Coupon Sent!</h4>
                  <p className="text-sm text-gray-500">A 10% off voucher has been sent to your LINE.</p>
                </div>
             </div>

             <div className="mt-12 flex justify-center text-gray-400 text-sm items-center">
                <RotateCcw className="w-4 h-4 mr-2 animate-spin-slow" />
                Resetting in 5s...
             </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default KioskMode;