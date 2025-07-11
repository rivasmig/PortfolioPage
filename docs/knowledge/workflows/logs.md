# Simple Logging System - Usage Guide

## 🎯 **Quick Start**

The logging system is now active! Open your browser console and you'll see categorized, color-coded logs for everything happening in your physics system.

### **Console Shortcuts (Development Only)**

These are automatically available in your browser console:

```javascript
// Basic logging
log.physics('My physics message', { data: 'here' })
log.interaction('User clicked something')
log.debug('Debug info', { important: 'data' })

// Control logging
logging.disable('performance')  // Stop performance logs
logging.enable('physics')       // Enable physics logs
logging.status()               // Show current status

// Physics-specific shortcuts
physicsLog.forceApplied('Ball_1', [0, 10, 0], [1, 2, 3])
physicsLog.collision('Ball_1', 'Wall', [5, 0, 5])

// Interaction shortcuts
interactionLog.mouseEnter('Ball_2', [100, 200])
interactionLog.scroll(50, ['Ball_1', 'Ball_2'])
```

## 📊 **Log Categories**

### **🟢 Physics (Green)**
- Rigid body creation/destruction
- Force and impulse applications
- Physics world events
- Collision detection

### **🔵 Render (Blue)**  
- Component mounting/unmounting
- Rendering cycles
- Scene updates

### **🟠 Interaction (Orange)**
- Mouse events (hover, click, move)
- Scroll events  
- Keyboard input
- Touch interactions

### **🟣 Performance (Purple)**
- Frame time monitoring
- FPS tracking
- Memory usage
- Performance milestones

### **🔵 Canvas (Cyan)**
- WebGL context events
- Scene loading
- Context lost/restored
- Canvas errors

### **🟡 Rapier (Amber)**
- Physics engine specific events
- Rapier initialization
- Physics world management

## 🔧 **Configuration**

### **Disable Noisy Categories**
```javascript
logging.disable('performance')  // Stop performance spam
logging.disable('debug')        // Hide debug messages
```

### **Enable Only What You Need**
```javascript
logging.disable('all')          // Turn off everything
logging.enable('physics')       // Only physics logs
logging.enable('interaction')   // Only interaction logs
```

### **Custom Configuration**
```javascript
logging.setConfig({
  showTimestamp: false,        // Hide timestamps
  showStackTrace: true,        // Show stack traces on errors
  maxObjectDepth: 2           // Limit object inspection depth
})
```

## 🐛 **Debugging Common Issues**

### **Physics Objects Not Working**
Look for these logs:
- `[PHYSICS] RigidBody created: ObjectName` - Should appear for each physics object
- `[PHYSICS] Physics world created` - Should appear when Physics component mounts
- `[CANVAS] Enhanced GLTF Canvas` - Should show canvas setup

### **No User Interactions**
Look for these logs:
- `[INTERACTION] Mouse enter: ObjectName` - Should appear on hover
- `[INTERACTION] Click start: ObjectName` - Should appear on click
- `[PHYSICS] Force applied to ObjectName` - Should appear during mouse attraction

### **Performance Issues**
Monitor these logs:
- `[PERFORMANCE] Frame time: XXms` - Should be under 16ms for 60fps
- `[PERFORMANCE] SimplePhysicsBalls performance check` - Shows memory usage
- `[PHYSICS] Physics step` - Shows physics simulation timing

## 📈 **Performance Monitoring**

### **Automatic Performance Tracking**
The system automatically logs:
- **Every 10 seconds**: Memory usage and ball statistics
- **Every 5 hits**: Interaction milestones  
- **Frame timing**: When performance degrades

### **Manual Performance Testing**
```javascript
// Create a timer
const timer = timer('My Operation')
// ... do something
timer.mark('Step 1 complete')
// ... do more
timer.mark('Step 2 complete')
timer.end() // Shows total time and all marks
```

## 🎮 **Real-time Debugging**

### **Watch Physics in Real-time**
```javascript
// Enable physics logging
logging.enable('physics')
logging.enable('interaction')

// Disable noisy categories
logging.disable('performance')
logging.disable('debug')
```

### **Track Specific Ball**
```javascript
// The logs will show Ball_0, Ball_1, etc.
// Look for patterns like:
// [INTERACTION] Mouse enter: Ball_2
// [PHYSICS] Force applied to Ball_2
// [PHYSICS] Impulse applied to Ball_2
```

## 🔍 **Component Lifecycle Tracking**

The system automatically tracks:
- **Component mounting/unmounting**
- **Render cycles**
- **Props changes**
- **Component lifetime statistics**

Look for `[LIFECYCLE]` logs to understand component behavior.

## 🚨 **Error Tracking**

All errors are automatically logged with:
- **Stack traces** (when enabled)
- **Component context**
- **Current state information**
- **Categorized error types**

## 💡 **Pro Tips**

1. **Start with minimal logging**: Enable only `physics` and `interaction` first
2. **Use the browser console**: All shortcuts are available as global variables
3. **Watch for patterns**: Physics objects should show creation → interaction → force/impulse logs
4. **Performance check**: If logs stop appearing, check for JavaScript errors
5. **Mobile testing**: Performance logs are especially useful on mobile devices

## 📱 **Mobile Debugging**

On mobile devices, you can:
1. Use remote debugging (Chrome DevTools for Android, Safari Web Inspector for iOS)
2. Look for performance warnings in the logs
3. Watch for touch interaction logs instead of mouse logs

## 🎯 **Expected Log Flow for Working Physics**

When everything works correctly, you should see this sequence:

1. `[CANVAS] Enhanced GLTF Canvas` - Canvas setup
2. `[PHYSICS] Physics world created` - Physics initialization  
3. `[PHYSICS] RigidBody created: Ball_X` (for each ball) - Ball creation
4. `[INTERACTION] Mouse enter: Ball_X` - When hovering balls
5. `[PHYSICS] Force applied to Ball_X` - During mouse attraction
6. `[INTERACTION] Click start: Ball_X` - When clicking balls
7. `[PHYSICS] Impulse applied to Ball_X` - Click force application

If any of these are missing, that's where the issue is!