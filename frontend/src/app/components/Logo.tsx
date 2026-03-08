import { SVGProps } from "react"

interface LogoProps extends SVGProps<SVGSVGElement> {
  className?: string;
  compact?: boolean;
}

export function Logo({ className = "", compact = false, ...props }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 group ${className}`}>
      <svg 
        width="32" 
        height="32" 
        viewBox="0 0 32 32" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform group-hover:scale-105"
        {...props}
      >
        {/* AI Network Nodes & Connections */}
        <path d="M9 9 L16 6 L23 9" stroke="#93C5FD" strokeWidth="1" strokeDasharray="1 2" />
        <path d="M16 6 L16 12" stroke="#93C5FD" strokeWidth="1" strokeDasharray="1 2" />
        <circle cx="9" cy="9" r="2" fill="#4F46E5" />
        <circle cx="16" cy="6" r="2" fill="#2563EB" />
        <circle cx="23" cy="9" r="2" fill="#4F46E5" />
        
        {/* Bridge */}
        <path d="M4 14 C12 12, 20 12, 28 14" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M4 17 C12 15, 20 15, 28 17" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
        
        {/* Government Pillars */}
        <rect x="8" y="17" width="3" height="9" rx="0.5" fill="#4F46E5" />
        <rect x="14.5" y="16" width="3" height="10" rx="0.5" fill="#4F46E5" />
        <rect x="21" y="17" width="3" height="9" rx="0.5" fill="#4F46E5" />
        
        {/* Solid Base */}
        <path d="M6 26 H26" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round" />
      </svg>
      {!compact && (
        <span className="text-xl font-bold tracking-tight text-gray-900 hidden sm:inline-block">
          Yojna<span className="text-blue-600">Setu</span>
        </span>
      )}
    </div>
  )
}
