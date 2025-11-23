import React from 'react';
import { Zap, Shield, PieChart } from 'lucide-react';

const features = [
  {
    icon: <Zap className="text-green-500" size={32} />,
    title: "0ms Latency Feed",
    desc: "Our direct-to-bookie infrastructure ensures you see odds before they change. Beat the market movement every single time."
  },
  {
    icon: <Shield className="text-orange-500" size={32} />,
    title: "Stealth Mode",
    desc: "Proprietary algorithms mimic recreational betting patterns. Keep your accounts healthy and avoid limits while scaling up."
  },
  {
    icon: <PieChart className="text-blue-500" size={32} />,
    title: "Bankroll Manager",
    desc: "Integrated Kelly Criterion calculator automatically suggests the optimal stake for every bet based on your specific risk profile."
  }
];

export default function Features() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
           <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Unfair Advantages.</h1>
           <p className="text-xl text-gray-400 max-w-2xl mx-auto">Technology built for strategic sports investors.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {features.map((f, i) => (
            <div
              key={i}
              className="flex flex-col h-full bg-[#171717] border border-white/5 p-8 rounded-3xl hover:border-orange-500/30 transition-all group"
            >
              <div className="mb-6 bg-black/50 w-16 h-16 rounded-2xl flex items-center justify-center border border-white/5 group-hover:scale-110 transition">
                {f.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{f.title}</h3>
              <p className="text-gray-400 leading-relaxed flex-1">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
