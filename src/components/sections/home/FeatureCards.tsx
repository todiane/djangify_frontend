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
      title: "Shared ownership.",
      description: "Whether I work independently or integrate with your team, everyone comes along the process.",
      size: "large"
    },
    {
      icon: <Rocket className="w-8 h-8 mb-2 text-[#0C8C9D]" />,
      title: "I work fast, like really fast.",
      description: "Stand out from competitors with a top-notch frontend and an exceptional user experience.",
      size: "small"
    },
    {
      icon: <Layers className="w-8 h-8 mb-2 text-[#0C8C9D]" />,
      title: "I work in systems.",
      description: "Whether it's a small feature or an entire design system, I create reusable components for the team.",
      size: "small"
    },
    {
      icon: <Eye className="w-8 h-8 mb-2 text-[#0C8C9D]" />,
      title: "Show and tell.",
      description: "I frequently share work in progress, usually in the form of screen recordings with a voice over.",
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
