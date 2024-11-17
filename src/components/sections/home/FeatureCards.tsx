import { Rocket, MessageSquare, Layers, Eye } from "lucide-react";

interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
  size: 'small' | 'large';
}

const FeatureCard = ({
  feature,
  className = ""
}: {
  feature: Feature;
  className?: string;
}) => (
  <div className={`bg-white rounded-lg shadow-sm p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${className}`}>
    <div className="mb-4">
      <div className="flex items-center space-x-4">
        {feature.icon}
        <h3 className="text-xl font-semibold">{feature.title}</h3>
      </div>
    </div>
    <div>
      <p className="text-gray-600">{feature.description}</p>
    </div>
  </div>
);

const FeatureCards = () => {
  const features: Feature[] = [
    {
      icon: <MessageSquare className="w-8 h-8 mb-2 text-[#0C8C9D]" />,
      title: "Creating practical solutions.",
      description: "I focus on building products for growing businesses that are tailored to your business needs. This includes products like eCommerce, LMS (learning management sites), SaaS and AI Assistants. ",
      size: "large"
    },
    {
      icon: <Rocket className="w-8 h-8 mb-2 text-[#0C8C9D]" />,
      title: "AI Tools",
      description: "Creating AI assistants to streamline your daily tasks and AI tools that simplify complex processes.",
      size: "small"
    },
    {
      icon: <Layers className="w-8 h-8 mb-2 text-[#0C8C9D]" />,
      title: "Scalable Web Solutions.",
      description: "Proficient in Django-based backend systems for scalable applications and leveraging Next.js for dynamic and responsive frontend designs.",
      size: "small"
    },
    {
      icon: <Eye className="w-8 h-8 mb-2 text-[#0C8C9D]" />,
      title: "I build And I Sell.",
      description: "My focus is on creating ready-to-use digital solutions that cater to various business needs. From ecommerce platforms to AI-driven tools, each product is crafted with precision and is available for purchase. Explore my portfolio to find the right fit for your business, and acquire a solution that's ready to deploy.",
      size: "large"
    }
  ];

  return (
    <div className="space-y-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <FeatureCard
          feature={features[0]}
          className="lg:col-span-2"
        />
        <FeatureCard feature={features[1]} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <FeatureCard feature={features[2]} />
        <FeatureCard
          feature={features[3]}
          className="lg:col-span-2"
        />
      </div>
    </div>
  );
};

export default FeatureCards;
