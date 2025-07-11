# Physics Material System - Complete Workflow Guide

## 🎯 Your Workflow Overview

This system allows you to create interactive 3D scenes where you define physics behavior directly in Blender through object naming, then the website automatically applies the correct physics properties.

### The Complete Process:

1. **Design in Blender** → 2. **Name Objects** → 3. **Export GLTF** → 4. **Load in Website** → 5. **Physics Work Automatically**

---

## 🎨 Step 1: Blender Setup & Naming Convention

### Method 1: Physics Prefix Naming *(Recommended)*
Name your objects using this pattern: `physics_[material]_[objectname]`

```
physics_floaty_cloud
physics_bouncy_ball  
physics_heavy_rock
physics_magnetic_orb
physics_static_wall
physics_orbital_particle
```

### Method 2: Direct Material Naming *(Shorter)*
Name objects starting with the material name: `[material]_[objectname]`

```
floaty_cloud
bouncy_ball
heavy_rock
magnetic_orb
static_wall
```

### Method 3: Custom Properties *(Advanced)*
In Blender's Properties Panel:
1. Select your object
2. Go to Object Properties (orange square icon)
3. Scroll down to "Custom Properties"
4. Click "+" to add new property
5. Set **Name**: `physicsMaterial`
6. Set **Value**: `floaty` (or any material name)

### Available Physics Materials:

| Material | Behavior | Best For |
|----------|----------|----------|
| `static` | No physics, collisions only | Walls, floors, static decorations |
| `floaty` | Light, responds to mouse/scroll | Clouds, cards, UI elements |
| `bouncy` | High restitution, playful | Balls, interactive elements |
| `heavy` | Realistic physics, less responsive | Rocks, furniture, weighty objects |
| `magnetic` | Strongly attracted to mouse | Special interactive elements |
| `orbital` | Orbits around mouse cursor | Particles, special effects |

---

## 🔧 Step 2: Blender Scene Preparation

### Environment Objects (Non-Physics)
- Name normally: `Environment_Wall`, `Background_Sky`, `Lighting_Setup`
- These won't get physics automatically

### Physics Objects
- Follow naming convention above
- **Position**: Place where you want them to start
- **Scale**: Final scale (physics will use this)
- **Materials**: Visual materials work normally

### Export Settings
1. **File → Export → glTF 2.0**
2. **Format**: `.gltf` or `.glb` (both work)
3. **Include**: Selected Objects or Visible Objects
4. **Geometry**: Apply Modifiers ✓
5. **Animation**: Include if you want animations ✓
6. **Custom Properties**: ✓ (if using Method 3)

---

## 💻 Step 3: Website Integration

### Basic Usage
```jsx
import EnhancedGLTFCanvas from './components/layout/EnhancedGLTFCanvas';

function MyScene() {
  return (
    <EnhancedGLTFCanvas
      url="/models/my-scene.gltf"
      animated={true}
      enablePhysics={true}
      environment="sunset"
    />
  );
}
```

### Advanced Usage with Callbacks
```jsx
function MyInteractiveScene() {
  const handlePhysicsObjectsParsed = (objects, controller) => {
    console.log(`Found ${objects.length} physics objects:`, objects);
    
    // Access specific objects
    const bouncyBalls = objects.filter(obj => 
      obj.name.includes('bouncy')
    );
    
    // Custom interactions
    bouncyBalls.forEach(ball => {
      // Add custom behavior
    });
  };

  return (
    <EnhancedGLTFCanvas
      url="/models/interactive-portfolio.gltf"
      enablePhysics={true}
      onPhysicsObjectsParsed={handlePhysicsObjectsParsed}
      physicsGround={true}
      camera={{ position: [0, 5, 10], fov: 50 }}
    />
  );
}
```

---

## 🎮 Step 4: User Interactions

### What Users Can Do:

1. **Mouse Hover** - Objects react based on their material type:
   - `magnetic`: Strongly attracted
   - `floaty`: Gently attracted  
   - `bouncy`: Repelled
   - `orbital`: Orbit around cursor

2. **Clicking** - Applies impulse forces:
   - Different materials have different impulse strengths
   - Randomness adds natural variation

3. **Scrolling** - Creates wind effects:
   - Scroll up/down applies forces to physics objects
   - Some materials respond more than others

---

## 🛠️ Step 5: Customization & Fine-tuning

### Custom Physics Materials
```javascript
// src/utils/myCustomPhysics.js
import { createCustomPhysicsMaterial } from '../core/physics/PhysicsMaterialSystem';

export const MY_CUSTOM_MATERIALS = {
  mySpecial: createCustomPhysicsMaterial({
    type: 'dynamic',
    restitution: 1.5,      // Super bouncy
    friction: 0.1,         // Low friction
    density: 0.2,          // Light weight
    gravityScale: 0.5,     // Half gravity
    mouse: {
      enabled: true,
      strength: 10.0,      // Strong mouse attraction
      radius: 15.0,        // Large interaction radius
      type: 'attract'
    },
    scroll: {
      enabled: true,
      strength: 5.0,
      windEffect: true
    },
    click: {
      enabled: true,
      impulse: [0, 20, 0], // Strong upward impulse
      randomness: 0.8
    }
  })
};
```

### Environment Presets
```jsx
// Different environments with different physics
<EnhancedGLTFCanvas
  url="/models/underwater-scene.gltf"
  enablePhysics={true}
  physicsEnvironment="underwater" // Slower, more resistance
/>

<EnhancedGLTFCanvas
  url="/models/space-scene.gltf" 
  enablePhysics={true}
  physicsEnvironment="space" // No gravity, floating
/>
```

---

## 📱 Step 6: Mobile Optimization

### Automatic Mobile Handling
The system automatically:
- Reduces physics complexity on mobile
- Disables expensive interactions
- Limits number of active physics objects

### Manual Mobile Optimization
```jsx
import { isMobile } from '../utils/deviceDetection';

function ResponsiveScene() {
  const physicsConfig = isMobile ? {
    enablePhysics: true,
    maxPhysicsObjects: 10,    // Limit objects on mobile
    simplifiedInteractions: true
  } : {
    enablePhysics: true,
    maxPhysicsObjects: 50,
    simplifiedInteractions: false
  };

  return (
    <EnhancedGLTFCanvas
      url="/models/scene.gltf"
      {...physicsConfig}
    />
  );
}
```

---

## 🔍 Step 7: Debugging & Testing

### Enable Debug Mode
```jsx
<EnhancedGLTFCanvas
  url="/models/test-scene.gltf"
  enablePhysics={true}
  debug={true} // Shows physics wireframes
  onPhysicsObjectsParsed={(objects) => {
    console.log('Physics objects detected:', objects);
  }}
/>
```

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Objects not getting physics | Check naming convention, ensure object is a mesh |
| Physics too slow/fast | Adjust material `density` and `gravityScale` |
| Mouse interaction not working | Check `interactions.mouse.radius` and `strength` |
| Objects falling through ground | Enable `physicsGround={true}` or add static floor |
| Performance issues | Reduce number of physics objects, use simpler materials |

---

## 🚀 Advanced Features

### Custom Physics Behaviors
```javascript
// Add to your scene
const customBehavior = {
  // Objects that float upward like bubbles
  bubble: {
    gravityScale: -0.2, // Negative = floats up
    interactions: {
      mouse: { type: 'repel' } // Mouse pushes them away
    }
  },
  
  // Objects that seek the mouse aggressively  
  seeker: {
    interactions: {
      mouse: { 
        strength: 20.0,
        type: 'attract',
        radius: 30.0
      }
    }
  }
};
```

### Physics Events
```jsx
function EventDrivenScene() {
  const handleCollision = (object1, object2) => {
    console.log('Collision between:', object1.name, object2.name);
  };

  return (
    <EnhancedGLTFCanvas
      url="/models/scene.gltf"
      onCollision={handleCollision}
      onObjectClicked={(objectName) => {
        console.log('Clicked:', objectName);
      }}
    />
  );
}
```

---

## 📊 Performance Guidelines

### Recommended Limits
- **Desktop**: 30-50 physics objects
- **Mobile**: 10-20 physics objects  
- **Tablets**: 20-30 physics objects

### Optimization Tips
1. Use `static` for non-moving decorative objects
2. Disable mouse interactions for background objects
3. Reduce interaction radius on complex scenes
4. Use simpler geometries for collision detection
5. Group small objects into single physics bodies when possible

---

## 🎯 Example Project Structure

```
my-portfolio/
├── public/
│   └── models/
│       ├── main-scene.gltf        # Environment
│       ├── interactive-objects.gltf # Physics objects
│       └── textures/
├── src/
│   ├── components/
│   │   └── layout/
│   │       └── EnhancedGLTFCanvas.jsx
│   ├── core/
│   │   └── physics/
│   │       └── PhysicsMaterialSystem.js
│   ├── utils/
│   │   └── physicsConfig.js
│   └── pages/
│       └── InteractivePortfolio.jsx
```

---

## 🎉 You're Ready!

This system gives you complete control over physics behavior while keeping the workflow simple:

1. **Design** your scene in Blender
2. **Name** objects with physics materials  
3. **Export** as GLTF
4. **Load** with `<EnhancedGLTFCanvas>`
5. **Enjoy** automatic interactive physics!

The physics will automatically work based on your naming convention, giving users an engaging, interactive experience with your 3D content.