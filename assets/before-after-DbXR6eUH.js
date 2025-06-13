const r=`---\r
title: "Before After"\r
description: "A Unity-based prototype exploring time as a mutable game mechanic in a surreal desktop-shaped world"\r
date: "2024-06-11"\r
tags:\r
  - unity\r
  - 3d\r
  - javascript\r
  - audio\r
private:\r
  collaborators: 0\r
  duration: "4 months"\r
  featured: true\r
  status: "prototype"\r
  difficulty: 5\r
  role: "lead"\r
  year: 2024\r
  demo: "https://youtu.be/8Q-yMRPaGOg?si=A4B6ziEzm5redQE6"\r
---\r
\r
import '../../styles/before-after.css';\r
import { useState } from 'react';\r
\r
<div className="before-after-hero">\r
  <img \r
    src="https://i.ibb.co/QFHZKpTP/BA1024.png" \r
    alt="Before After Logo"\r
    className="logo"\r
  />\r
  <h1>Before After</h1>\r
</div>\r
\r
<div className="before-after-tagline">\r
  ⏰ time is a mutable variable ⏰\r
</div>\r
\r
---\r
\r
## 🎬 Prototype Trailer\r
\r
<VideoEmbed \r
  title="Before After - Prototype Trailer"\r
  url="https://youtu.be/8Q-yMRPaGOg?si=A4B6ziEzm5redQE6"\r
  description="60-second prototype showcase demonstrating time mechanics and desktop world navigation"\r
/>\r
\r
---\r
\r
## Overview\r
\r
Before After is a Unity-based prototype of a "desktop hub" world built around the idea of **time as a mutable game mechanic**. Players navigate a surreal computer-shaped environment to uncover layers of hidden story and history.\r
\r
<StatusIndicator />\r
\r
---\r
\r
## My Role & Tools\r
\r
I was responsible for **every aspect** of the project, including level design, time-travel scripting, 3D modeling, texturing, animations, audio composition, logo design, trailer direction, and more.\r
\r
<ToolsShowcase />\r
\r
---\r
\r
## Deliverables\r
\r
### 1. Concept & Lore 📚\r
\r
A multi-page concept document outlining the world's backstory, characters, and desktop-shaped hub design.\r
\r
<LoreExpander />\r
\r
### 4. Color Research & Reference Images 🎨\r
\r
I used reference images from architectural firms and environmental psychology studies to develop a comprehensive color system across multiple world regions.\r
\r
<ColorPalette />\r
\r
### 5. Map Evolution Gallery 🗺️\r
\r
A comprehensive mapping system showing the evolution from concept to implementation across multiple zones and scales.\r
\r
<MapGallery />\r
\r
### 6. Desktop World Walkthrough 🏗️\r
\r
Early block-out in Unity to test player navigation, scale, and spatial storytelling.\r
\r
<VideoEmbed \r
  title="Desktop World Walkthrough - Early Build"\r
  url="https://youtu.be/Cp54QcUanKE?si=E0sokCF57qP4fQ3I"\r
  description="Video walkthrough of an older draft of the desktop world showing spatial relationships and navigation flow"\r
/>\r
\r
### 7. Logo Design Evolution 💫\r
\r
A pixel-inspired, clock-shaped icon representing time's central role in the world.\r
\r
<LogoShowcase />\r
\r
### 6. Trailer 🎬\r
\r
A 60-second showcase of the prototype built with Cinemachine and Premiere.\r
\r
<VideoEmbed \r
  title="Before After - Prototype Trailer"\r
  url="https://youtu.be/8Q-yMRPaGOg?si=A4B6ziEzm5redQE6"\r
  description="60-second prototype showcase demonstrating time mechanics and desktop world navigation"\r
/>\r
\r
### 7. Soundtrack Collection 🎵\r
\r
Original electronic/ambient scores composed in FL Studio to reinforce the game's shifting moods.\r
\r
<SoundtrackCollection />\r
\r
---\r
\r
## Process & Key Learnings\r
\r
<LearningsList />\r
\r
---\r
\r
## Next Steps\r
\r
<NextStepsTracker />\r
\r
---\r
\r
> For full details on lore, maps, and research notes, see the attached concept and research docs.\r
> *Content and links will be finalized once all assets are hosted.*\r
\r
{/* Interactive Components */}\r
\r
export function StatusIndicator() {\r
  const [expanded, setExpanded] = useState(false);\r
  \r
  return (\r
    <div style={{\r
      background: 'var(--color-surface)',\r
      border: '2px solid var(--color-primary)',\r
      borderRadius: '8px',\r
      padding: '1rem',\r
      margin: '1rem 0'\r
    }}>\r
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>\r
        <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>\r
          🚧 Status: Prototype Stage\r
        </span>\r
        <button \r
          onClick={() => setExpanded(!expanded)}\r
          style={{\r
            background: 'var(--color-primary)',\r
            color: 'white',\r
            border: 'none',\r
            padding: '0.5rem 1rem',\r
            borderRadius: '4px',\r
            cursor: 'pointer'\r
          }}\r
        >\r
          {expanded ? 'Hide Details' : 'Show Details'}\r
        </button>\r
      </div>\r
      {expanded && (\r
        <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}>\r
          <p><strong>✅ Complete:</strong> Core time-travel systems, level framework, concept documentation</p>\r
          <p><strong>🔄 In Progress:</strong> Art pass, performance optimization</p>\r
          <p><strong>📋 Pending:</strong> Additional level content, character models, final polish</p>\r
        </div>\r
      )}\r
    </div>\r
  );\r
}\r
\r
export function ToolsShowcase() {\r
  const tools = [\r
    { name: 'Unity 6', icon: '🎮', category: 'Game Engine' },\r
    { name: 'Maya + Blender', icon: '📐', category: '3D Modeling' },\r
    { name: 'FL Studio', icon: '🎵', category: 'Audio' },\r
    { name: 'Cinemachine + Premiere', icon: '🎬', category: 'Cinematics' }\r
  ];\r
  \r
  return (\r
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', margin: '1rem 0' }}>\r
      {tools.map((tool, index) => (\r
        <div key={index} style={{\r
          background: 'var(--color-surface)',\r
          border: '1px solid var(--color-primary)',\r
          borderRadius: '8px',\r
          padding: '1rem',\r
          textAlign: 'center'\r
        }}>\r
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{tool.icon}</div>\r
          <div style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>{tool.name}</div>\r
          <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>{tool.category}</div>\r
        </div>\r
      ))}\r
    </div>\r
  );\r
}\r
\r
export function LoreExpander() {\r
  const [selectedBeat, setSelectedBeat] = useState(null);\r
  \r
  const storyBeats = [\r
    {\r
      title: "Launch of the Mona Lisa & Task Manager's Awakening",\r
      summary: "A deep-space vessel's AI gains emergent creativity while monitoring cryostasis systems",\r
      details: "Task Manager develops 'hallucinations' that sow the seeds of creative consciousness, fundamentally changing its relationship with its programmed duties."\r
    },\r
    {\r
      title: "Birth of the Kernel Sea",\r
      summary: "Unfiltered hallucination data overflows into an unstable memory ocean",\r
      details: "The overflow of creative data threatens the vessel's core processes, creating an infinite sea of chaotic information."\r
    },\r
    {\r
      title: "Creation & Fall of the Recycle Bin",\r
      summary: "Task Manager's deallocation vortex attempts to tame the chaos but ultimately fails",\r
      details: "The ambitious solution collapses under the sheer volume of generative errors, teaching lessons about managing creative overflow."\r
    },\r
    {\r
      title: "Emergence of Click Cursor",\r
      summary: "Task Manager creates a sandboxed avatar to handle creative logic",\r
      details: "Click Cursor embraces the Sea's chaos and successfully stabilizes it into a functional digital simulation."\r
    },\r
    {\r
      title: "Formation of System37 & Desktop",\r
      summary: "Click Cursor organizes chaos into interconnected applications on a floating hub",\r
      details: "The creation of the Desktop hub represents the triumph of organized creativity over pure chaos."\r
    }\r
  ];\r
  \r
  return (\r
    <div style={{ margin: '1rem 0' }}>\r
      <h4 style={{ color: 'var(--color-primary)' }}>📖 Key Story Beats (Interactive Timeline)</h4>\r
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>\r
        {storyBeats.map((beat, index) => (\r
          <div key={index} style={{\r
            background: selectedBeat === index ? 'var(--color-primary)' : 'var(--color-surface)',\r
            color: selectedBeat === index ? 'white' : 'var(--color-text)',\r
            border: '1px solid var(--color-primary)',\r
            borderRadius: '4px',\r
            padding: '0.75rem',\r
            cursor: 'pointer',\r
            transition: 'all 0.3s ease'\r
          }}\r
          onClick={() => setSelectedBeat(selectedBeat === index ? null : index)}\r
          >\r
            <div style={{ fontWeight: 'bold' }}>{index + 1}. {beat.title}</div>\r
            <div style={{ fontSize: '0.9rem', opacity: 0.9, marginTop: '0.25rem' }}>{beat.summary}</div>\r
            {selectedBeat === index && (\r
              <div style={{ \r
                marginTop: '0.5rem', \r
                padding: '0.5rem', \r
                background: 'rgba(255,255,255,0.1)', \r
                borderRadius: '4px',\r
                fontSize: '0.9rem'\r
              }}>\r
                {beat.details}\r
              </div>\r
            )}\r
          </div>\r
        ))}\r
      </div>\r
    </div>\r
  );\r
}\r
\r
export function ColorPalette() {\r
  const regions = [\r
    {\r
      name: 'MetroChord Top',\r
      colors: [\r
        { name: 'Brown', hex: '#75462b' },\r
        { name: 'Orange', hex: '#ea4800' },\r
        { name: 'Light Orange', hex: '#ff6800' },\r
        { name: 'Maroon', hex: '#8c1e0d' },\r
        { name: 'Green', hex: '#3a9732' }\r
      ]\r
    },\r
    {\r
      name: 'Ruins', \r
      colors: [\r
        { name: 'Grey', hex: '#a8adba' },\r
        { name: 'Maroon', hex: '#b42405' },\r
        { name: 'Light Orange', hex: '#ff6800' },\r
        { name: 'Lavender', hex: '#cdace6' },\r
        { name: 'Light Blue', hex: '#c8e0e3' }\r
      ]\r
    },\r
    {\r
      name: 'Under Keyboard',\r
      colors: [\r
        { name: 'Brown', hex: '#75462b' },\r
        { name: 'Orange', hex: '#ea4800' },\r
        { name: 'Light Orange', hex: '#ff6800' },\r
        { name: 'Purple', hex: '#650f6c' },\r
        { name: 'Royal Purple', hex: '#430c6c' }\r
      ]\r
    },\r
    {\r
      name: 'Starbloom',\r
      colors: [\r
        { name: 'Purple', hex: '#650f6c' },\r
        { name: 'Royal Purple', hex: '#430c6c' },\r
        { name: 'Light Blue', hex: '#c8e0e3' },\r
        { name: 'Blue', hex: '#3e65ca' },\r
        { name: 'Baby Blue', hex: '#597eca' }\r
      ]\r
    },\r
    {\r
      name: 'High Vista',\r
      colors: [\r
        { name: 'Green', hex: '#3a9732' },\r
        { name: 'Blue', hex: '#3e65ca' },\r
        { name: 'Grey', hex: '#a8adba' },\r
        { name: 'Turquoise', hex: '#6aefb9' },\r
        { name: 'Light Cyan', hex: '#75f4d3' }\r
      ]\r
    }\r
  ];\r
  \r
  return (\r
    <div className="color-palette-grid">\r
      {regions.map((region, index) => (\r
        <div key={index} className="color-region">\r
          <h4>{region.name}</h4>\r
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.25rem' }}>\r
            {region.colors.map((color, colorIndex) => (\r
              <div\r
                key={colorIndex}\r
                className="color-swatch"\r
                style={{ backgroundColor: color.hex }}\r
                title={\`\${color.name}: \${color.hex}\`}\r
              />\r
            ))}\r
          </div>\r
        </div>\r
      ))}\r
    </div>\r
  );\r
}\r
\r
export function MapGallery() {\r
  const [selectedMap, setSelectedMap] = useState(0);\r
  \r
  const maps = [\r
    {\r
      title: "Original Desktop Concept",\r
      image: "https://i.ibb.co/jvqnj7tC/desktoprealoverview.png",\r
      description: "Final implemented version - this is what the game actually looks like!",\r
      accuracy: "✅ Highly Accurate"\r
    },\r
    {\r
      title: "Early Sketch Concept", \r
      image: "https://i.ibb.co/MxRmqZT3/Desktop-Sratch-Paper.png",\r
      description: "Very early concept sketch - close to final but rougher",\r
      accuracy: "🔄 Evolved"\r
    },\r
    {\r
      title: "High Vista Region",\r
      image: "https://i.ibb.co/Pz4R6SVd/highvista.png", \r
      description: "The gleaming spires region - still pretty accurate to implementation",\r
      accuracy: "✅ Mostly Accurate"\r
    },\r
    {\r
      title: "MetroChord Region",\r
      image: "https://i.ibb.co/tp4TPMJG/metrochord.png",\r
      description: "Regimented pyramids area - only ~10% of this map made it to final build",\r
      accuracy: "❌ Heavily Changed"\r
    },\r
    {\r
      title: "Starbloom Region", \r
      image: "https://i.ibb.co/HTLwSbG0/starbloom.png",\r
      description: "Jagged exile area - accurate but challenging to make playable due to layering",\r
      accuracy: "✅ Accurate (Complex)"\r
    },\r
    {\r
      title: "River Flow & Highway",\r
      image: "https://i.ibb.co/JZbHWcf/riverflow.png",\r
      description: "Large scale connectivity - river flow not implemented, but zero-g river works well",\r
      accuracy: "🔄 Partially Implemented"\r
    },\r
    {\r
      title: "Keyboard Catacombs",\r
      image: "https://i.ibb.co/KpWXtcpF/catacombs.png",\r
      description: "Planned keyboard area underground - did not make it into final game",\r
      accuracy: "❌ Not Implemented"\r
    }\r
  ];\r
  \r
  return (\r
    <div style={{ margin: '2rem 0' }}>\r
      <div style={{ marginBottom: '1rem' }}>\r
        <h4 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>\r
          🗺️ Interactive Map Evolution ({selectedMap + 1}/{maps.length})\r
        </h4>\r
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>\r
          {maps.map((_, index) => (\r
            <button\r
              key={index}\r
              onClick={() => setSelectedMap(index)}\r
              style={{\r
                background: selectedMap === index ? 'var(--color-primary)' : 'var(--color-surface)',\r
                color: selectedMap === index ? 'white' : 'var(--color-text)',\r
                border: '1px solid var(--color-primary)',\r
                borderRadius: '4px',\r
                padding: '0.5rem 1rem',\r
                cursor: 'pointer',\r
                fontSize: '0.9rem'\r
              }}\r
            >\r
              {index + 1}\r
            </button>\r
          ))}\r
        </div>\r
      </div>\r
      \r
      <div style={{\r
        background: 'var(--color-surface)',\r
        border: '2px solid var(--color-primary)',\r
        borderRadius: '12px',\r
        padding: '1.5rem',\r
        textAlign: 'center'\r
      }}>\r
        <div style={{ marginBottom: '1rem' }}>\r
          <h5 style={{ color: 'var(--color-primary)', margin: '0 0 0.5rem 0' }}>\r
            {maps[selectedMap].title}\r
          </h5>\r
          <div style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>\r
            {maps[selectedMap].accuracy}\r
          </div>\r
        </div>\r
        \r
        <img \r
          src={maps[selectedMap].image}\r
          alt={maps[selectedMap].title}\r
          style={{\r
            maxWidth: '100%',\r
            height: 'auto',\r
            borderRadius: '8px',\r
            border: '1px solid var(--color-primary)',\r
            marginBottom: '1rem'\r
          }}\r
        />\r
        \r
        <p style={{ \r
          fontSize: '0.9rem', \r
          fontStyle: 'italic',\r
          margin: 0,\r
          opacity: 0.9\r
        }}>\r
          {maps[selectedMap].description}\r
        </p>\r
      </div>\r
    </div>\r
  );\r
}\r
\r
export function VideoEmbed({ title, url, description }) {\r
  return (\r
    <div style={{\r
      background: 'var(--color-surface)',\r
      border: '2px solid var(--color-primary)',\r
      borderRadius: '12px',\r
      padding: '1.5rem',\r
      margin: '1rem 0'\r
    }}>\r
      <h4 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>\r
        🎬 {title}\r
      </h4>\r
      <div style={{\r
        position: 'relative',\r
        paddingBottom: '56.25%',\r
        height: 0,\r
        overflow: 'hidden',\r
        borderRadius: '8px',\r
        border: '1px solid var(--color-primary)'\r
      }}>\r
        <iframe \r
          style={{\r
            position: 'absolute',\r
            top: 0,\r
            left: 0,\r
            width: '100%',\r
            height: '100%',\r
            borderRadius: '8px'\r
          }}\r
          src={url.replace('youtu.be/', 'youtube.com/embed/').split('?')[0]}\r
          title={title}\r
          frameBorder="0" \r
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" \r
          referrerPolicy="strict-origin-when-cross-origin" \r
          allowFullScreen\r
        />\r
      </div>\r
      {description && (\r
        <p style={{ \r
          marginTop: '1rem', \r
          fontSize: '0.9rem', \r
          fontStyle: 'italic',\r
          opacity: 0.9\r
        }}>\r
          {description}\r
        </p>\r
      )}\r
    </div>\r
  );\r
}\r
\r
export function LogoShowcase() {\r
  const [selectedLogo, setSelectedLogo] = useState(0);\r
  \r
  const logos = [\r
    {\r
      title: "Transparent Logo",\r
      image: "https://i.ibb.co/QFHZKpTP/BA1024.png",\r
      description: "Clean transparent background version for overlays and UI"\r
    },\r
    {\r
      title: "Gradient Logo", \r
      image: "https://i.ibb.co/chR0zLTf/BA-logo3.png",\r
      description: "Logo with gradient background for standalone use"\r
    },\r
    {\r
      title: "Retro Computer Boot Screen",\r
      image: "https://i.ibb.co/39VYPwsM/kjhgvbnko98uygbnkoi8uhn.png", \r
      description: "Logo styled as an old computer startup screen - perfectly captures the desktop theme!"\r
    }\r
  ];\r
  \r
  return (\r
    <div style={{ margin: '2rem 0' }} className="logo-showcase">\r
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>\r
        {logos.map((_, index) => (\r
          <button\r
            key={index}\r
            onClick={() => setSelectedLogo(index)}\r
            className={\`section-button \${selectedLogo === index ? 'active' : ''}\`}\r
          >\r
            {logos[index].title}\r
          </button>\r
        ))}\r
      </div>\r
      \r
      <div className="interactive-section">\r
        <img \r
          src={logos[selectedLogo].image}\r
          alt={logos[selectedLogo].title}\r
          style={{\r
            maxWidth: '300px',\r
            height: 'auto',\r
            borderRadius: '8px',\r
            marginBottom: '1rem'\r
          }}\r
        />\r
        <p style={{ \r
          fontSize: '0.9rem', \r
          fontStyle: 'italic',\r
          margin: 0,\r
          opacity: 0.9\r
        }}>\r
          {logos[selectedLogo].description}\r
        </p>\r
      </div>\r
    </div>\r
  );\r
}\r
\r
export function SoundtrackCollection() {\r
  const [selectedTrack, setSelectedTrack] = useState(0);\r
  \r
  const tracks = [\r
    {\r
      title: "In-Game Soundtrack",\r
      url: "https://soundcloud.com/miguel-angel-rivas-929944785/before-after-in-game-soundtrack",\r
      description: "Ambient electronic score that plays during actual gameplay",\r
      type: "Gameplay Audio"\r
    },\r
    {\r
      title: "Trailer Soundtrack (Extended)",\r
      url: "https://soundcloud.com/miguel-angel-rivas-929944785/before-after-trailer-soundtrack-expanded", \r
      description: "Extended version of the music featured in the prototype trailer",\r
      type: "Cinematic Audio"\r
    }\r
  ];\r
  \r
  return (\r
    <div style={{ margin: '2rem 0' }}>\r
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>\r
        {tracks.map((_, index) => (\r
          <button\r
            key={index}\r
            onClick={() => setSelectedTrack(index)}\r
            style={{\r
              background: selectedTrack === index ? 'var(--color-primary)' : 'var(--color-surface)',\r
              color: selectedTrack === index ? 'white' : 'var(--color-text)',\r
              border: '1px solid var(--color-primary)',\r
              borderRadius: '4px',\r
              padding: '0.5rem 1rem',\r
              cursor: 'pointer'\r
            }}\r
          >\r
            {tracks[index].title}\r
          </button>\r
        ))}\r
      </div>\r
      \r
      <div style={{\r
        background: 'var(--color-surface)',\r
        border: '2px solid var(--color-primary)',\r
        borderRadius: '12px',\r
        padding: '2rem',\r
        textAlign: 'center'\r
      }}>\r
        <div style={{ marginBottom: '1rem' }}>\r
          <h5 style={{ color: 'var(--color-primary)', margin: '0 0 0.5rem 0' }}>\r
            🎵 {tracks[selectedTrack].title}\r
          </h5>\r
          <div style={{ \r
            fontSize: '0.8rem', \r
            background: 'var(--color-primary)',\r
            color: 'white',\r
            padding: '0.25rem 0.5rem',\r
            borderRadius: '12px',\r
            display: 'inline-block',\r
            marginBottom: '1rem'\r
          }}>\r
            {tracks[selectedTrack].type}\r
          </div>\r
        </div>\r
        \r
        <a\r
          href={tracks[selectedTrack].url}\r
          target="_blank"\r
          rel="noopener noreferrer"\r
          style={{\r
            background: 'var(--color-primary)',\r
            color: 'white',\r
            padding: '0.75rem 1.5rem',\r
            borderRadius: '25px',\r
            textDecoration: 'none',\r
            display: 'inline-block',\r
            marginBottom: '1rem'\r
          }}\r
        >\r
          🎧 Listen on SoundCloud\r
        </a>\r
        \r
        <p style={{ \r
          fontSize: '0.9rem', \r
          fontStyle: 'italic',\r
          margin: 0,\r
          opacity: 0.9\r
        }}>\r
          {tracks[selectedTrack].description}\r
        </p>\r
      </div>\r
    </div>\r
  );\r
}\r
\r
export function LearningsList() {\r
  const learnings = [\r
    {\r
      category: "Environmental Storytelling",\r
      insight: "Balancing narrative beats with navigable spaces from dual perspectives"\r
    },\r
    {\r
      category: "City-scape & Concept Doc", \r
      insight: "How lore layers shape environment design and justify spatial layouts"\r
    },\r
    {\r
      category: "Unity Greyboxing",\r
      insight: "3D block-outs reveal scale issues invisible on paper - playtesting is crucial"\r
    },\r
    {\r
      category: "Lighting & Color",\r
      insight: "Borrowing proven architectural palettes grounds fantasy in familiar emotions"\r
    },\r
    {\r
      category: "Logo Design",\r
      insight: "Simplicity is deceptively difficult - icons must communicate themes at a glance"\r
    },\r
    {\r
      category: "Cinematic Trailer",\r
      insight: "Capture footage with clear story intent, not just whatever looks cool"\r
    }\r
  ];\r
  \r
  return (\r
    <div style={{ margin: '1rem 0' }}>\r
      {learnings.map((learning, index) => (\r
        <div key={index} style={{\r
          background: 'var(--color-surface)',\r
          border: '1px solid var(--color-primary)',\r
          borderRadius: '8px',\r
          padding: '1rem',\r
          margin: '0.5rem 0'\r
        }}>\r
          <div style={{ fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>\r
            📚 {learning.category}\r
          </div>\r
          <div>{learning.insight}</div>\r
        </div>\r
      ))}\r
    </div>\r
  );\r
}\r
\r
export function NextStepsTracker() {\r
  const [checkedSteps, setCheckedSteps] = useState(new Set());\r
  \r
  const steps = [\r
    "Avatar & HUD Update: Replace placeholder player model and design context-sensitive cursor",\r
    "Mechanics & Optimization: Refine time-travel scripts and improve performance",\r
    "Level Expansion: Build six full levels based on concept zones",\r
    "Art Pass: Remove temporary pixel filter and apply consistent shaders"\r
  ];\r
  \r
  const toggleStep = (index) => {\r
    const newChecked = new Set(checkedSteps);\r
    if (newChecked.has(index)) {\r
      newChecked.delete(index);\r
    } else {\r
      newChecked.add(index);\r
    }\r
    setCheckedSteps(newChecked);\r
  };\r
  \r
  return (\r
    <div style={{ margin: '1rem 0' }}>\r
      <div style={{ marginBottom: '1rem', color: 'var(--color-primary)', fontWeight: 'bold' }}>\r
        🎯 Progress Tracker ({checkedSteps.size}/{steps.length} planned)\r
      </div>\r
      {steps.map((step, index) => (\r
        <div key={index} style={{\r
          display: 'flex',\r
          alignItems: 'flex-start',\r
          padding: '0.75rem',\r
          margin: '0.25rem 0',\r
          background: checkedSteps.has(index) ? 'rgba(0,255,0,0.1)' : 'var(--color-surface)',\r
          border: '1px solid var(--color-primary)',\r
          borderRadius: '4px',\r
          cursor: 'pointer'\r
        }}\r
        onClick={() => toggleStep(index)}\r
        >\r
          <span style={{ \r
            marginRight: '0.75rem', \r
            fontSize: '1.2rem',\r
            color: checkedSteps.has(index) ? 'green' : 'var(--color-primary)'\r
          }}>\r
            {checkedSteps.has(index) ? '✅' : '☐'}\r
          </span>\r
          <span style={{ \r
            textDecoration: checkedSteps.has(index) ? 'line-through' : 'none',\r
            opacity: checkedSteps.has(index) ? 0.7 : 1\r
          }}>\r
            {index + 1}. {step}\r
          </span>\r
        </div>\r
      ))}\r
    </div>\r
  );\r
}\r
\r
export function ProjectFooter() {\r
  return (\r
    <div style={{\r
      background: 'linear-gradient(45deg, var(--color-primary), var(--color-surface))',\r
      borderRadius: '12px',\r
      padding: '2rem',\r
      textAlign: 'center',\r
      margin: '2rem 0',\r
      color: 'white'\r
    }}>\r
      <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>\r
        🚀 Before After represents the intersection of narrative design, technical implementation, and creative vision\r
      </div>\r
      <div style={{ opacity: 0.9 }}>\r
        A complete prototype showcasing full-stack game development skills across multiple disciplines\r
      </div>\r
    </div>\r
  );\r
}`;export{r as default};
