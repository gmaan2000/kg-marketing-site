import React, { useState } from 'react';
import { Phone, X, Bot, Zap, Loader2 } from 'lucide-react';

const KGCallWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
    const [errorMessage, setErrorMessage] = useState('');

    const formatPhoneNumber = (number) => {
        // Strip all non-digit characters
        let cleaned = number.replace(/\D/g, '');

        // Check if it starts with '0' and replace with '+61'
        if (cleaned.startsWith('0')) {
            return '+61' + cleaned.substring(1);
        }

        // If it already starts with 61, add +
        if (cleaned.startsWith('61')) {
            return '+' + cleaned;
        }

        // Default case (just add + if missing, or return as is if unsure, 
        // but requirement focuses on 0 -> +61 replacement)
        return cleaned;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        const formattedPhone = formatPhoneNumber(phoneNumber);

        try {
            const response = await fetch('https://primary-production-ed284.up.railway.app/webhook/call-me-final', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phone: formattedPhone }),
            });

            if (!response.ok) {
                let errorMsg = 'Network response was not ok';
                try {
                    const errorData = await response.json();
                    if (errorData && errorData.message) {
                        errorMsg = errorData.message;
                    }
                } catch (jsonError) {
                    console.error('Error parsing error response:', jsonError);
                }
                throw new Error(errorMsg);
            }

            setStatus('success');
            // Optional: Reset after a delay or keep success state
            setTimeout(() => {
                setIsOpen(false);
                setStatus('idle');
                setPhoneNumber('');
                setErrorMessage('');
            }, 5000);
        } catch (error) {
            console.error('Call request failed:', error);
            setStatus('error');
            setErrorMessage(error.message || 'Something went wrong');
            // Reset error state after animation plays, but keep the message visible
            setTimeout(() => setStatus('idle'), 2000);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 font-sans text-white">
            {/* Floating Trigger Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[#00cc66] to-[#00ff88] shadow-lg shadow-[#00ff88]/50 transition-all duration-300 hover:scale-110 focus:outline-none hover:shadow-[#00ff88]/80"
                >
                    {/* Pulse Effect */}
                    <span className="absolute -inset-1 animate-ping rounded-full bg-[#00ff88] opacity-30 duration-1000"></span>

                    <Phone className="h-6 w-6 text-white" />
                </button>
            )}

            {/* Expanded Card */}
            {isOpen && (
                <div className="w-80 overflow-hidden rounded-2xl border border-white/10 bg-black/80 p-6 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-10 duration-300">

                    {/* Success View */}
                    {status === 'success' ? (
                        <div className="flex flex-col items-center py-6 text-center animate-in zoom-in duration-300">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 text-green-400 ring-1 ring-green-500/50">
                                <Phone className="h-8 w-8 animate-pulse" />
                            </div>
                            <h3 className="mb-2 text-xl font-bold text-white">Calling...</h3>
                            <p className="text-sm text-gray-400">Watch your phone! 📱</p>
                        </div>
                    ) : (
                        /* Form View */
                        <div className="relative">
                            {/* Close Button */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute -right-2 -top-2 rounded-full p-2 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
                            >
                                <X className="h-4 w-4" />
                            </button>

                            {/* Header */}
                            <div className="mb-6 flex items-start space-x-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#00cc66] to-[#00ff88] ring-2 ring-white/10">
                                    <Bot className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="flex items-center text-base font-semibold text-white">
                                        Talk to Sarah
                                        <span className="ml-2 flex h-2 w-2 relative">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                        </span>
                                    </h3>
                                    <p className="text-xs text-green-400 font-medium tracking-wide">AI AGENT ACTIVE</p>
                                </div>
                            </div>

                            <p className="mb-6 text-sm leading-relaxed text-gray-400">
                                Experience K&G speed. Enter your number for an instant demo.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className={`relative transition-all duration-300 ${status === 'error' ? 'animate-shake' : ''}`}>
                                    <input
                                        type="tel"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        placeholder="0412 345 678"
                                        className={`w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-600 outline-none backdrop-blur-sm transition-all focus:border-[#00ff88] focus:bg-white/10 focus:ring-1 focus:ring-[#00ff88] ${status === 'error' ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                                        required
                                    />
                                    {errorMessage && (
                                        <div className="mt-2 text-xs text-red-400 bg-red-500/10 p-2 rounded-lg border border-red-500/20">
                                            Server Error: {errorMessage}
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="group relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-[#00cc66] to-[#00ff88] py-3 text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:brightness-110 disabled:opacity-70 disabled:hover:scale-100 shadow-lg shadow-[#00ff88]/20"
                                >
                                    {status === 'loading' ? (
                                        <Loader2 className="h-5 w-5 animate-spin text-white" />
                                    ) : (
                                        <>
                                            Call My Phone Now
                                            <Zap className="ml-2 h-4 w-4 fill-white text-white" />
                                        </>
                                    )}

                                    {/* Sheen Effect */}
                                    <div className="absolute -left-[100%] top-0 h-full w-full skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-1000 group-hover:left-[100%]"></div>
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            )}

            <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
        </div>
    );
};

export default KGCallWidget;
