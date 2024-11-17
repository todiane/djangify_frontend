// components/sections/common/CTASection.tsx
import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  title: string;
  description?: string;
  buttonText: string;
  buttonLink: string;
  backgroundColor?: string;
  textColor?: string;
  buttonColor?: string;
}

const CTASection = ({
  title,
  description,
  buttonText,
  buttonLink,
  backgroundColor = "bg-[#f8fafc]",
  textColor = "text-[#0C8C9D]",
  buttonColor = "bg-white text-[#0C8C9D]"
}: CTASectionProps) => {
  return (
    <section className={`w-full ${backgroundColor} ${textColor}`}>
      <div className="min-h-[30vh] flex flex-col justify-center items-center text-center px-4 py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 opacity-90">
              {description}
            </p>
          )}

          <a
            href={buttonLink}
            className={`inline-flex items-center px-8 py-4 ${buttonColor} rounded-md hover:opacity-90 transition-opacity`}
          >
            {buttonText}
            <ArrowRight className="ml-2 h-4 w-4 font-bold text-xl" />
          </a>
        </div>
      </div>
    </section >
  );
};

export default CTASection;