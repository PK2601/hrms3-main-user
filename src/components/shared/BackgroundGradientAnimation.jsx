import React from "react";
import { BackgroundGradientAnimation } from "../ui/background-gradient-animation.tsx";

export function BackgroundGradientAnimationDemo({title,number}) {

    const titleStyle = {
    fontSize: '44px',
    marginBottom: '35px',
    };

    const numberStyle = {
    fontSize: '42px',
    };
    return (
        <BackgroundGradientAnimation size="10%">
          <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-center">
            <div style={{ textAlign: 'center' }}>
              <p style={titleStyle} className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
                {title}
              </p>
              <p style={numberStyle} className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
                {number}
              </p>
            </div>
          </div>
        </BackgroundGradientAnimation>
      );
}
