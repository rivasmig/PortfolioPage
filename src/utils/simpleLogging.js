// src/utils/simpleLogging.js
import React, { useEffect, useRef, useState } from 'react';
/**
 * Simple Logging Utilities for Debugging Physics and 3D Components
 * 
 * Features:
 * - Categorized logging (Physics, Render, Interaction, Error, etc.)
 * - Easy enable/disable by category
 * - Stack trace capture for errors
 * - Performance timing
 * - Object inspection
 * - Component lifecycle tracking
 */

// Logging configuration
const LOG_CONFIG = {
  enabled: true, // Master switch
  categories: {
    physics: true,
    render: true,
    interaction: true,
    performance: true,
    lifecycle: true,
    error: true,
    debug: true,
    canvas: true,
    rapier: true
  },
  showTimestamp: true,
  showStackTrace: false, // Only for errors by default
  maxObjectDepth: 3,
  colors: {
    physics: '#4CAF50',      // Green
    render: '#2196F3',       // Blue
    interaction: '#FF9800',  // Orange
    performance: '#9C27B0',  // Purple
    lifecycle: '#607D8B',    // Blue Grey
    error: '#F44336',        // Red
    debug: '#795548',        // Brown
    canvas: '#00BCD4',       // Cyan
    rapier: '#FFC107'        // Amber
  }
};

/**
 * Internal logging function
 */
function _log(category, level, message, data = null, options = {}) {
  if (!LOG_CONFIG.enabled || !LOG_CONFIG.categories[category]) {
    return;
  }

  const timestamp = LOG_CONFIG.showTimestamp ? new Date().toLocaleTimeString() : '';
  const color = LOG_CONFIG.colors[category] || '#000';
  const prefix = `[${category.toUpperCase()}]`;
  
  // Prepare the log arguments
  const logArgs = [
    `%c${prefix} ${timestamp} ${message}`,
    `color: ${color}; font-weight: bold;`
  ];

  // Add data if provided
  if (data !== null && data !== undefined) {
    if (typeof data === 'object') {
      logArgs.push('\nData:', JSON.parse(JSON.stringify(data, null, 2)));
    } else {
      logArgs.push('\nData:', data);
    }
  }

  // Add stack trace if requested or if it's an error
  if (options.includeStack || (level === 'error' && LOG_CONFIG.showStackTrace)) {
    const stack = new Error().stack;
    logArgs.push('\nStack:', stack);
  }

  // Use appropriate console method
  const consoleMethod = level === 'error' ? 'error' : 
                       level === 'warn' ? 'warn' : 
                       level === 'info' ? 'info' : 'log';
  
  console[consoleMethod](...logArgs);
}

/**
 * Performance timing utility
 */
class PerformanceTimer {
  constructor(name) {
    this.name = name;
    this.startTime = performance.now();
    this.marks = [];
  }

  mark(label) {
    const time = performance.now();
    const elapsed = time - this.startTime;
    this.marks.push({ label, time, elapsed });
    log.performance(`Timer "${this.name}" - ${label}: ${elapsed.toFixed(2)}ms`);
    return this;
  }

  end() {
    const totalTime = performance.now() - this.startTime;
    log.performance(`Timer "${this.name}" completed in ${totalTime.toFixed(2)}ms`, this.marks);
    return totalTime;
  }
}

/**
 * Component lifecycle tracker
 */
class ComponentTracker {
  constructor(componentName) {
    this.componentName = componentName;
    this.mountTime = Date.now();
    this.renders = 0;
    this.updates = [];
  }

  mount(props = {}) {
    log.lifecycle(`${this.componentName} mounted`, { props, mountTime: this.mountTime });
  }

  render(props = {}) {
    this.renders++;
    log.lifecycle(`${this.componentName} rendered (${this.renders})`, { props });
  }

  update(prevProps, newProps, reason = 'props changed') {
    this.updates.push({ prevProps, newProps, reason, time: Date.now() });
    log.lifecycle(`${this.componentName} updated: ${reason}`, { prevProps, newProps });
  }

  unmount() {
    const lifetime = Date.now() - this.mountTime;
    log.lifecycle(`${this.componentName} unmounted`, { 
      lifetime: `${lifetime}ms`, 
      totalRenders: this.renders,
      totalUpdates: this.updates.length 
    });
  }
}

/**
 * Main logging interface
 */
export const log = {
  // Physics logging
  physics: (message, data) => _log('physics', 'log', message, data),
  physicsError: (message, error) => _log('physics', 'error', message, error, { includeStack: true }),
  physicsWarn: (message, data) => _log('physics', 'warn', message, data),

  // Render logging
  render: (message, data) => _log('render', 'log', message, data),
  renderError: (message, error) => _log('render', 'error', message, error, { includeStack: true }),

  // Interaction logging
  interaction: (message, data) => _log('interaction', 'log', message, data),
  click: (elementName, position, data) => _log('interaction', 'log', `Click on ${elementName}`, { position, ...data }),
  hover: (elementName, state, data) => _log('interaction', 'log', `Hover ${state} on ${elementName}`, data),
  scroll: (delta, data) => _log('interaction', 'log', `Scroll delta: ${delta}`, data),

  // Performance logging
  performance: (message, data) => _log('performance', 'log', message, data),
  fps: (fps) => _log('performance', 'log', `FPS: ${fps.toFixed(1)}`, null),
  frameTime: (ms) => _log('performance', 'log', `Frame time: ${ms.toFixed(2)}ms`, null),

  // Lifecycle logging
  lifecycle: (message, data) => _log('lifecycle', 'log', message, data),

  // Canvas logging
  canvas: (message, data) => _log('canvas', 'log', message, data),
  canvasError: (message, error) => _log('canvas', 'error', message, error, { includeStack: true }),

  // Rapier/Physics engine logging
  rapier: (message, data) => _log('rapier', 'log', message, data),
  rapierError: (message, error) => _log('rapier', 'error', message, error, { includeStack: true }),

  // Debug logging
  debug: (message, data) => _log('debug', 'log', message, data),

  // Error logging
  error: (message, error) => _log('error', 'error', message, error, { includeStack: true }),
  warn: (message, data) => _log('error', 'warn', message, data),

  // Utility methods
  group: (name, fn) => {
    console.group(`%c${name}`, 'font-weight: bold; color: #333;');
    try {
      fn();
    } finally {
      console.groupEnd();
    }
  },

  table: (data, columns) => {
    if (LOG_CONFIG.enabled) {
      console.table(data, columns);
    }
  },

  inspect: (obj, label = 'Object') => {
    if (LOG_CONFIG.enabled) {
      console.log(`%c[INSPECT] ${label}:`, 'color: #FF5722; font-weight: bold;', obj);
    }
  }
};

/**
 * Configuration utilities
 */
export const logging = {
  // Enable/disable categories
  enable: (category) => {
    if (category === 'all') {
      Object.keys(LOG_CONFIG.categories).forEach(cat => {
        LOG_CONFIG.categories[cat] = true;
      });
    } else {
      LOG_CONFIG.categories[category] = true;
    }
  },

  disable: (category) => {
    if (category === 'all') {
      Object.keys(LOG_CONFIG.categories).forEach(cat => {
        LOG_CONFIG.categories[cat] = false;
      });
    } else {
      LOG_CONFIG.categories[category] = false;
    }
  },

  // Toggle master switch
  enableAll: () => { LOG_CONFIG.enabled = true; },
  disableAll: () => { LOG_CONFIG.enabled = false; },

  // Configure options
  setConfig: (newConfig) => {
    Object.assign(LOG_CONFIG, newConfig);
  },

  getConfig: () => ({ ...LOG_CONFIG }),

  // Show current status
  status: () => {
    console.log('%c[LOGGING STATUS]', 'font-weight: bold; color: #333;');
    console.log('Enabled:', LOG_CONFIG.enabled);
    console.log('Categories:', LOG_CONFIG.categories);
  }
};

/**
 * Performance timer utility
 */
export const timer = (name) => new PerformanceTimer(name);

/**
 * Component tracker utility
 */
export const tracker = (componentName) => new ComponentTracker(componentName);

/**
 * Physics-specific logging helpers
 */
export const physicsLog = {
  rigidBodyCreated: (name, props) => log.physics(`RigidBody created: ${name}`, props),
  rigidBodyDestroyed: (name) => log.physics(`RigidBody destroyed: ${name}`),
  forceApplied: (name, force, position) => log.physics(`Force applied to ${name}`, { force, position }),
  impulseApplied: (name, impulse, position) => log.physics(`Impulse applied to ${name}`, { impulse, position }),
  collision: (obj1, obj2, point) => log.physics(`Collision: ${obj1} <-> ${obj2}`, { point }),
  physicsStep: (deltaTime, activeObjects) => log.physics(`Physics step: ${deltaTime.toFixed(3)}s`, { activeObjects }),
  worldCreated: (gravity, props) => log.physics('Physics world created', { gravity, ...props }),
  worldDestroyed: () => log.physics('Physics world destroyed'),
};

/**
 * Interaction-specific logging helpers
 */
export const interactionLog = {
  mouseEnter: (objectName, position) => log.interaction(`Mouse enter: ${objectName}`, { position }),
  mouseLeave: (objectName) => log.interaction(`Mouse leave: ${objectName}`),
  mouseMove: (position, objects) => log.interaction('Mouse move', { position, objectsUnderMouse: objects }),
  clickStart: (objectName, button, position) => log.interaction(`Click start: ${objectName}`, { button, position }),
  clickEnd: (objectName, button) => log.interaction(`Click end: ${objectName}`, { button }),
  scroll: (delta, affectedObjects) => log.interaction('Scroll event', { delta, affectedObjects }),
  keyPress: (key, modifiers) => log.interaction(`Key press: ${key}`, { modifiers }),
};

/**
 * Canvas-specific logging helpers
 */
export const canvasLog = {
  created: (size, props) => log.canvas('Canvas created', { size, ...props }),
  resized: (oldSize, newSize) => log.canvas('Canvas resized', { oldSize, newSize }),
  contextLost: () => log.canvasError('WebGL context lost'),
  contextRestored: () => log.canvas('WebGL context restored'),
  sceneLoaded: (url, objects) => log.canvas(`Scene loaded: ${url}`, { objectCount: objects }),
  sceneError: (url, error) => log.canvasError(`Scene load failed: ${url}`, error),
};

/**
 * React hook for easy component logging
 */
export const useDebugLogging = (componentName) => {
  const trackerRef = React.useRef(null);

  React.useEffect(() => {
    trackerRef.current = new ComponentTracker(componentName);
    trackerRef.current.mount();

    return () => {
      trackerRef.current?.unmount();
    };
  }, [componentName]);

  return {
    logRender: (props) => trackerRef.current?.render(props),
    logUpdate: (prevProps, newProps, reason) => trackerRef.current?.update(prevProps, newProps, reason),
    log: (message, data) => log.debug(`[${componentName}] ${message}`, data),
    error: (message, error) => log.error(`[${componentName}] ${message}`, error),
  };
};

/**
 * Global error boundary logger
 */
export const errorBoundaryLogger = {
  componentDidCatch: (error, errorInfo) => {
    log.error('Error Boundary caught error', { error: error.message, stack: error.stack, errorInfo });
  }
};

// Development shortcuts (available in console)
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  window.log = log;
  window.logging = logging;
  window.physicsLog = physicsLog;
  window.interactionLog = interactionLog;
  window.canvasLog = canvasLog;
}

export default log;