'use client';

import { useState } from 'react';
import { Logo } from '@/components/ui/Logo';

export function MembershipCardWidget() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-80 w-80 rounded-full bg-orange-500/20 blur-3xl lg:h-96 lg:w-96"></div>
      </div>

      <div className="relative z-10 w-full max-w-sm animate-fade-up">
        <div className="rounded-2xl border-2 border-orange-500 bg-white p-6 shadow-lg md:p-8">
          <div className="mb-4 flex justify-center" style={{ perspective: '1000px' }}>
            <div
              className="relative w-[280px] cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <div
                className="transition-transform duration-700"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                <div
                  className="rounded-2xl p-6 shadow-xl"
                  style={{
                    background: 'linear-gradient(180deg, #F28A2B 0%, #E97B22 55%, #D96A1E 100%)',
                    backfaceVisibility: 'hidden',
                    height: '176px',
                  }}
                >
                  <div className="flex h-full flex-col justify-between">
                    <div className="flex justify-between">
                      <Logo className="h-6 object-contain opacity-95" width={80} height={24} alt="KDS" />
                      <div className="text-xs font-semibold text-white/80">MEMBER</div>
                    </div>

                    <div className="text-center">
                      <div className="text-xs font-medium text-white/70 tracking-wide">KIND DINERS SOCIETY</div>
                    </div>

                    <div className="flex items-end justify-between">
                      <div>
                        <div className="text-xs font-medium text-white/70">Member Name</div>
                        <div className="text-sm font-semibold text-white">Guest Member</div>
                      </div>
                      <div className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">
                        ACTIVE
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute inset-0 rounded-2xl p-6 shadow-xl"
                  style={{
                    background: 'linear-gradient(180deg, #F28A2B 0%, #E97B22 55%, #D96A1E 100%)',
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    height: '176px',
                  }}
                >
                  <div className="flex h-full flex-col items-center justify-between">
                    <div className="flex w-full justify-between">
                      <Logo className="h-6 object-contain opacity-95" width={80} height={24} alt="KDS" />
                      <div className="text-xs font-semibold text-white/80">QR CODE</div>
                    </div>

                    <div className="flex items-center justify-center rounded-lg bg-white p-2">
                      <svg width="100" height="100" viewBox="0 0 100 100">
                        <rect width="100" height="100" fill="white" />
                        <g fill="#000000">
                          <rect x="0" y="0" width="10" height="10" />
                          <rect x="10" y="0" width="10" height="10" />
                          <rect x="20" y="0" width="10" height="10" />
                          <rect x="30" y="0" width="10" height="10" />
                          <rect x="40" y="0" width="10" height="10" />
                          <rect x="50" y="0" width="10" height="10" />
                          <rect x="60" y="0" width="10" height="10" />
                          <rect x="80" y="0" width="10" height="10" />
                          <rect x="0" y="10" width="10" height="10" />
                          <rect x="60" y="10" width="10" height="10" />
                          <rect x="80" y="10" width="10" height="10" />
                          <rect x="90" y="10" width="10" height="10" />
                          <rect x="0" y="20" width="10" height="10" />
                          <rect x="20" y="20" width="10" height="10" />
                          <rect x="30" y="20" width="10" height="10" />
                          <rect x="40" y="20" width="10" height="10" />
                          <rect x="60" y="20" width="10" height="10" />
                          <rect x="80" y="20" width="10" height="10" />
                          <rect x="0" y="30" width="10" height="10" />
                          <rect x="20" y="30" width="10" height="10" />
                          <rect x="30" y="30" width="10" height="10" />
                          <rect x="40" y="30" width="10" height="10" />
                          <rect x="60" y="30" width="10" height="10" />
                          <rect x="80" y="30" width="10" height="10" />
                          <rect x="0" y="40" width="10" height="10" />
                          <rect x="20" y="40" width="10" height="10" />
                          <rect x="30" y="40" width="10" height="10" />
                          <rect x="40" y="40" width="10" height="10" />
                          <rect x="60" y="40" width="10" height="10" />
                          <rect x="80" y="40" width="10" height="10" />
                          <rect x="90" y="40" width="10" height="10" />
                          <rect x="0" y="50" width="10" height="10" />
                          <rect x="60" y="50" width="10" height="10" />
                          <rect x="0" y="60" width="10" height="10" />
                          <rect x="10" y="60" width="10" height="10" />
                          <rect x="20" y="60" width="10" height="10" />
                          <rect x="30" y="60" width="10" height="10" />
                          <rect x="40" y="60" width="10" height="10" />
                          <rect x="50" y="60" width="10" height="10" />
                          <rect x="60" y="60" width="10" height="10" />
                          <rect x="80" y="60" width="10" height="10" />
                          <rect x="10" y="70" width="10" height="10" />
                          <rect x="20" y="70" width="10" height="10" />
                          <rect x="40" y="70" width="10" height="10" />
                          <rect x="50" y="70" width="10" height="10" />
                          <rect x="70" y="70" width="10" height="10" />
                          <rect x="80" y="70" width="10" height="10" />
                          <rect x="90" y="70" width="10" height="10" />
                          <rect x="0" y="80" width="10" height="10" />
                          <rect x="10" y="80" width="10" height="10" />
                          <rect x="30" y="80" width="10" height="10" />
                          <rect x="40" y="80" width="10" height="10" />
                          <rect x="60" y="80" width="10" height="10" />
                          <rect x="70" y="80" width="10" height="10" />
                          <rect x="90" y="80" width="10" height="10" />
                          <rect x="20" y="90" width="10" height="10" />
                          <rect x="30" y="90" width="10" height="10" />
                          <rect x="40" y="90" width="10" height="10" />
                          <rect x="50" y="90" width="10" height="10" />
                          <rect x="70" y="90" width="10" height="10" />
                          <rect x="80" y="90" width="10" height="10" />
                          <rect x="90" y="90" width="10" height="10" />
                        </g>
                      </svg>
                    </div>

                    <div className="text-center">
                      <div className="text-xs font-medium text-white/70">Scan to redeem</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 text-center">
            <p className="text-sm font-medium text-gray-600">
              Click card to flip and view QR code
            </p>

            <div className="space-y-3">
              <a
                href="/memberships"
                className="block rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/30 transition-all hover:shadow-xl hover:shadow-orange-500/40"
              >
                Join Now
              </a>
              <a
                href="/restaurants"
                className="block rounded-full border-2 border-orange-600 bg-white px-6 py-3 text-sm font-semibold text-orange-600 transition-all hover:bg-orange-50"
              >
                Browse Restaurants
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
