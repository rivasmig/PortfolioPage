// src/components/desktop/DesktopLayer.jsx
import React from 'react';
import useWindowManager from './useWindowManager';
import Window from './Window';
import Taskbar from './Taskbar';

const DesktopLayer = () => {
  const { selectors } = useWindowManager();
  const visibleWindows = selectors.visibleWindows();

  const handleDesktopClick = (e) => {
    // In the future: Could unfocus windows if clicking desktop
    // e.g., windowManager.focus(null)
    // For now, just prevent accidental propagation
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900"
      onClick={handleDesktopClick}
    >
      {/* Wallpaper or desktop background layer */}
      <div className="absolute inset-0 select-none pointer-events-none">
        {/* Could set a background image or pattern here */}
      </div>

      {/* All open windows */}
      {visibleWindows.map((win) => (
        <Window key={win.id} {...win} />
      ))}

      {/* Taskbar always at the bottom */}
      <Taskbar />
    </div>
  );
};

export default DesktopLayer;
