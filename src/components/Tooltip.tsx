import { Info } from 'lucide-react';

interface TooltipProps {
  text: string;
}

export default function Tooltip({ text }: TooltipProps) {
  return (
    <div className="tooltip inline-block ml-1">
      <Info className="w-4 h-4 text-neutral-500 hover:text-orange-400 cursor-help transition-colors" />
      <span className="tooltip-text">{text}</span>
    </div>
  );
}
