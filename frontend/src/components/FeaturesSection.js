import React from "react";

const FeaturesSection = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto text-center">
        <h3 className="text-3xl font-bold mb-12">Why FinWise?</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xl font-semibold mb-4">Personalized Recommendations</h4>
            <p>AI-driven insights tailored to your financial profile</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Real-Time Analysis</h4>
            <p>Continuous market monitoring and portfolio optimization</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Financial Education</h4>
            <p>Learn and grow with personalized investment resources</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
