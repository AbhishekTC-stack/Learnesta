function ContactPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-10 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d')",
      }}
    >

      {/* Content Card (NORMAL - no glass, no blur) */}
      <div className="bg-white shadow-2xl rounded-2xl p-12 max-w-lg w-full text-center">

        <h1 className="text-3xl font-bold text-purple-700 mb-4">
          Contact Us
        </h1>

        <p className="text-gray-600 mb-10">
          Have questions about Learnesta? We're here to help. Reach out anytime.
        </p>

        <div className="space-y-6 text-left">

          {/* Phone */}
          <div className="flex items-center gap-4">
            <span className="text-2xl">📞</span>
            <div>
              <p className="text-sm text-gray-500 font-medium">Phone</p>
              <p className="text-gray-800 font-semibold">+91 98765 43210</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-4">
            <span className="text-2xl">📧</span>
            <div>
              <p className="text-sm text-gray-500 font-medium">Email</p>
              <p className="text-gray-800 font-semibold">support@learnesta.com</p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-4">
            <span className="text-2xl">📍</span>
            <div>
              <p className="text-sm text-gray-500 font-medium">Location</p>
              <p className="text-gray-800 font-semibold">
                Technopark Phase 1, Trivandrum, Kerala, India
              </p>
            </div>
          </div>

          {/* Time */}
          <div className="flex items-center gap-4">
            <span className="text-2xl">🕐</span>
            <div>
              <p className="text-sm text-gray-500 font-medium">Working Hours</p>
              <p className="text-gray-800 font-semibold">
                Monday – Friday, 9:00 AM – 6:00 PM
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default ContactPage;