import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";  // Import Login component

const Navbar = () => {
  const [isLoginVisible, setIsLoginVisible] = useState(false);

  const showLogin = () => setIsLoginVisible(true);
  const hideLogin = () => setIsLoginVisible(false);

  return (
    <>
      <div className={`min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-gray-900 ${isLoginVisible ? 'overflow-hidden' : ''}`}>
        {/* Navigation */}
        <nav className="w-full  flex items-center justify-between">
          <header className="shadow-md w-full">
            <div className="flex items-center justify-between px-4 py-2">
              {/* Logo */}
              <h1 className="text-2xl font-bold text-white">FinWise</h1>

              {/* Navigation Menu */}
              <nav className="flex items-center space-x-6">
                <button className="text-white font-medium hover:underline">Home</button>
                <button className="text-white font-medium hover:underline">About</button>
                <button className="text-white font-medium hover:underline">Services</button>
              </nav>

              {/* Auth Buttons */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={showLogin}
                  className="px-4 py-2 bg-lime-400 text-black font-medium rounded-lg shadow hover:bg-lime-600"
                >
                  Login
                </button>
                <Link
                  onClick={showLogin}
                  state={{ isSignup: true }}
                  className="px-4 py-2 bg-gray-700 text-white font-medium rounded-lg shadow hover:bg-gray-600"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </header>
        </nav>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-10 md:py-0">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                Smart Investments, Smarter Future
              </h1>

              <p className="text-gray-300 text-lg">
                FinWise is your AI-powered personal financial advisor, helping you
                make informed investment decisions tailored to your unique financial
                goals.
              </p>

              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <button id="green1" className="bg-lime-400 hover:bg-lime-500  text-gray-900 px-8 py-2 rounded-lg text-2xl">
                    
                    <Link onClick={showLogin} className="font-weight-extrabold">Get Started</Link>
                  </button>
                  <div className="flex -space-x-4">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full border-2 border-white bg-gray-800"
                      />
                    ))}
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-800 flex items-center justify-center text-white text-sm">
                      100+
                    </div>
                  </div>
                </div>

                <div className="flex gap-12">
                  <div className="flex items-center gap-2">
                    <div>
                      <div className="text-2xl font-bold text-white">$12M+</div>
                      <div className="text-gray-400 text-sm">Transactions</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">1200+</div>
                    <div className="text-gray-400 text-sm">Active Users</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[480px] bg-lime-400 rounded-full blur-3xl opacity-20" />
              <img src="./fin.png" alt="FinWise" />
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-10">
          <div className="text-center mb-16">
            <div className="text-gray-400 mb-4">— PROCESS</div>
            <h2 className="text-4xl font-bold text-white">How it works</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: "1",
                title: "Real-Time Analysis",
                description: "Get real-time insights into your financial data for better decision making.",
              },
              {
                number: "2",
                title: "Personalized Recommendations",
                description: "AI-driven insights tailored to your financial profile.",
              },
              {
                number: "3",
                title: "Financial Education",
                description: "Learn and grow with personalized investment resources",
              },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-xl font-bold mx-auto mb-6">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <h4 className="text-xl font-semibold text-white mb-4">Contact Us</h4>
            <p className="text-gray-400">
              Have questions? Reach out to our support team at support@payfast.com or call us at (123) 456-7890.
            </p>
          </div>
        </section>

        {/* Login Modal Overlay */}
        {isLoginVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="flex items-center justify-center fixed inset-0">
              <Login hideLogin={hideLogin} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
