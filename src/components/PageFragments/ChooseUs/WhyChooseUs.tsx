import { FiTruck, FiCreditCard, FiShield, FiAward } from "react-icons/fi";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FiTruck size={24} />,
      title: "Free Shipping",
      description: "All purchases over $199 are eligible for free shipping via USPS First Class Mail.",
    },
    {
      icon: <FiCreditCard size={24} />,
      title: "Easy Payments",
      description: "All payments are processed instantly over a secure payment protocol.",
    },
    {
      icon: <FiShield size={24} />,
      title: "Money-Back Guarantee",
      description: "If an item arrived damaged or you’ve changed your mind, you can send it back for a full refund.",
    },
    {
      icon: <FiAward size={24} />,
      title: "Finest Quality",
      description: "Designed to last, each of our products has been crafted with the finest materials.",
    },
  ];

  return (
    <section className="text-center py-16 px-6">
      <h2 className="text-2xl font-semibold mb-8">Why should you choose us?</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="text-3xl text-gray-800 bg-gray-100 p-4 rounded-full mb-4">
              {feature.icon}
            </div>
            <h3 className="font-bold">{feature.title}</h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
