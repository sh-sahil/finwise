import React from "react";
import { Button } from "./ui/Button";

const HeroSection = () => {
  return (
    <main className="flex-grow flex items-center justify-center p-6">
      <div className="text-center max-w-2xl">
        <h2 className="text-4xl font-bold text-blue-900 mb-4">
          Smart Investments, Smarter Future
        </h2>
        <p className="text-xl text-blue-700 mb-6">
          FinWise is your AI-powered personal financial advisor, helping you
          make informed investment decisions tailored to your unique financial
          goals.
        </p>
        <div className="space-x-4">
          <Button size="lg">Get Started</Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>
      </div>
    </main>
  );
};

export default HeroSection;
