import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { logout, profile } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center font-sans px-4">

      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md text-center border border-gray-100">

        {/* Header */}
        <div className="text-2xl font-black tracking-widest text-purple-900 mb-2">
          LEARNESTA
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-1">
          Your Free Trial Has Expired
        </h2>
        <p className="text-gray-500 text-sm mb-8">
          Pay once and get lifetime access to all courses on Learnesta.
        </p>

        {/* Price */}
        <div className="bg-purple-50 border border-purple-200 rounded-2xl px-6 py-5 mb-8">
          <p className="text-sm text-purple-600 mb-1">One-time payment</p>
          <p className="text-5xl font-black text-purple-800">₹999</p>
          <p className="text-sm text-purple-500 mt-1">Lifetime access to all courses</p>
        </div>

        {/* UPI QR Code */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-600 mb-3">
            Scan QR code to pay via any UPI app
          </p>

          <div className="w-48 h-48 bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl mx-auto flex items-center justify-center">
            <div className="text-center">
              <p className="text-4xl mb-2">📱</p>
              <p className="text-xs text-gray-400">Your UPI QR</p>
              <p className="text-xs text-gray-400">Code here</p>
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-3">
            UPI ID: <span className="font-semibold text-gray-700">learnesta@upi</span>
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-gray-50 rounded-2xl px-5 py-4 mb-8 text-left space-y-2">
          <p className="text-sm font-semibold text-gray-700 mb-2">How to pay:</p>
          <p className="text-sm text-gray-500">1. Open any UPI app (GPay, PhonePe, Paytm)</p>
          <p className="text-sm text-gray-500">2. Scan the QR code above</p>
          <p className="text-sm text-gray-500">3. Pay ₹999</p>
          <p className="text-sm text-gray-500">4. Send screenshot to <span className="text-purple-700 font-medium">support@learnesta.com</span></p>
          <p className="text-sm text-gray-500">5. Admin will activate your account within 24 hours</p>
        </div>

        {/* Waiting Message */}
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-2xl px-6 py-4 mb-6">
          <p className="font-semibold">Thank you, {profile?.firstName || profile?.username}!</p>
          <p className="text-sm mt-1">
            Your payment is under review. Once approved by the admin, you’ll get full access to your dashboard.
          </p>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="text-sm text-gray-400 hover:text-gray-600 transition"
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default PaymentPage;