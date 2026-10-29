import { formatMoney } from '@/types/investment';

interface MaturityRingProps {
  startsOn: string;
  endsOn: string;
  principalAmount: number;
  monthlyRoiPercentage: string;
  size?: number;
}

/**
 * Visually encodes the one thing that actually matters about a locked
 * investment: how much of its term has elapsed and when principal
 * unlocks. Not decorative -- this ring's fill percentage IS the data.
 */
export default function MaturityRing({
  startsOn,
  endsOn,
  principalAmount,
  monthlyRoiPercentage,
  size = 96,
}: MaturityRingProps) {
  const start = new Date(startsOn).getTime();
  const end = new Date(endsOn).getTime();
  const now = Date.now();
  const progress = Math.min(1, Math.max(0, (now - start) / (end - start)));

  const daysRemaining = Math.max(0, Math.ceil((end - now) / (1000 * 60 * 60 * 24)));

  const radius = (size - 10) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  return (
    <div className="relative inline-flex flex-col items-center" style={{ width: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#E4DFD1" strokeWidth={6} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#C89B3C"
          strokeWidth={6}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 600ms ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-serif text-[15px] leading-none text-[#173024]">{monthlyRoiPercentage}%</span>
        <span className="text-[9px] uppercase tracking-wide text-[#6B7268]">/ mo</span>
      </div>
      <p className="mt-2 text-center text-xs text-[#6B7268]">
        {daysRemaining > 0 ? `${daysRemaining}d to maturity` : 'Matured'}
      </p>
      <p className="text-center text-[13px] font-medium text-[#173024]">{formatMoney(principalAmount)}</p>
    </div>
  );
}
