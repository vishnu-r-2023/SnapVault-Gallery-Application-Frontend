import React, { useState, useEffect } from "react";
import Toast from "./Toast";

function PaymentModal({ isOpen, onClose, onSuccess, minAmount = 10 }) {
  const [upiPin, setUpiPin] = useState("");
  const [amount, setAmount] = useState("");
  const [timer, setTimer] = useState(120); // 2 minutes
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setTimer(120);
    setUpiPin("");
    setAmount("");
    setError("");
    setProcessing(false);
    const interval = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(interval);
          onClose();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!upiPin || upiPin.length < 4) {
      setError("Enter a valid UPI PIN (at least 4 digits)");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) < minAmount) {
      setError(`Amount must be at least $${minAmount}`);
      return;
    }
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      onSuccess(Number(amount));
    }, 1800); // Simulate payment processing
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-slate-900 p-8 rounded-xl shadow-2xl w-full max-w-md relative">
        <button
          className="absolute top-3 right-3 text-slate-400 hover:text-red-400"
          onClick={onClose}
          disabled={processing}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold text-white mb-4">Pay & Download</h2>
        <div className="mb-4 text-slate-300 text-sm flex justify-between items-center">
          <span>Session expires in:</span>
          <span className="font-mono text-lg text-cyan-400">{Math.floor(timer/60).toString().padStart(2,'0')}:{(timer%60).toString().padStart(2,'0')}</span>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-slate-300 mb-1">UPI PIN</label>
            <input
              type="password"
              value={upiPin}
              onChange={e => setUpiPin(e.target.value.replace(/\D/g, ""))}
              maxLength={6}
              minLength={4}
              className="w-full px-3 py-2 rounded bg-slate-800 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="Enter your UPI PIN"
              disabled={processing}
              required
            />
          </div>
          <div>
            <label className="block text-slate-300 mb-1">Amount (USD)</label>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value.replace(/[^\d.]/g, ""))}
              min={minAmount}
              className="w-full px-3 py-2 rounded bg-slate-800 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder={`Enter amount (min $${minAmount})`}
              disabled={processing}
              required
            />
          </div>
          <Toast message={error} type="error" onClose={() => setError("")} />
          <button
            type="submit"
            className="w-full py-2 rounded bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-lg transition-all disabled:opacity-60"
            disabled={processing}
          >
            {processing ? "Processing..." : "Pay & Download"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PaymentModal;
