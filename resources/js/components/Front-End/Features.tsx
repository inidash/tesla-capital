import React, { useState } from "react";
import { Activity, Clock, Cpu, Layers, BarChart3, Zap } from "lucide-react";

interface Feature {
  name: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  category: string;
}

const features: Feature[] = [
  {
    name: "Real-time Analytics",
    description:
      "Track user behavior and system performance with millisecond precision.",
    icon: Activity,
    gradient: "from-purple-500 to-indigo-600",
    category: "Insights",
  },
  {
    name: "Scheduled Tasks",
    description:
      "Automate workflows with precision timing and failure recovery.",
    icon: Clock,
    gradient: "from-blue-500 to-cyan-500",
    category: "Automation",
  },
  {
    name: "Edge Computing",
    description:
      "Process data closer to users for lightning-fast response times.",
    icon: Cpu,
    gradient: "from-emerald-500 to-green-500",
    category: "Performance",
  },
  {
    name: "Microservices",
    description:
      "Scale individual components independently for ultimate flexibility.",
    icon: Layers,
    gradient: "from-amber-500 to-orange-500",
    category: "Architecture",
  },
  {
    name: "Predictive Analytics",
    description: "Anticipate user needs and system demands before they happen.",
    icon: BarChart3,
    gradient: "from-rose-500 to-pink-600",
    category: "Intelligence",
  },
  {
    name: "Instant Scaling",
    description:
      "Automatically adjust resources to match current demand in seconds.",
    icon: Zap,
    gradient: "from-cyan-500 to-sky-600",
    category: "Infrastructure",
  },
];

export default function Features() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-indigo-500 to-transparent self-center"></div>
            <h2 className="mx-4 text-base font-semibold text-indigo-600 uppercase tracking-wide">
              Investment Features
            </h2>
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-indigo-500 to-transparent self-center"></div>
          </div>

          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900">
            <span className="relative">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Powerful capabilities
              </span>
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600/40 to-purple-600/40 blur-sm"></span>
            </span>{" "}
            for modern teams
          </p>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our platform combines cutting-edge technology with intuitive design
            to give your team the tools they need to succeed in today's
            fast-paced digital landscape.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
              onMouseEnter={() => setHoveredCard(feature.name)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="absolute top-0 right-0 w-24 h-24 -mr-10 -mt-10 rounded-full bg-gradient-to-br opacity-10 blur-xl from-indigo-600 to-purple-600"></div>

              <div className="p-6">
                <div className="absolute top-6 right-6">
                  <span className="inline-flex items-center rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700">
                    {feature.category}
                  </span>
                </div>

                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} shadow-md mb-5`}
                >
                  <feature.icon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                  {feature.name}
                </h3>

                <p className="mt-3 text-base text-gray-600">
                  {feature.description}
                </p>

                <div
                  className={`mt-5 inline-flex h-8 items-center text-sm font-medium text-indigo-600`}
                >
                  <span>Learn more</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                      hoveredCard === feature.name ? "translate-x-1" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>

              <div
                className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${
                  feature.gradient
                } transition-all duration-500 ease-out ${
                  hoveredCard === feature.name ? "w-full" : "w-0"
                }`}
              />
            </div>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <div className="inline-flex rounded-full bg-indigo-50 p-1">
            <button className="rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              View documentation
            </button>
            <button className="rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
              Get started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}