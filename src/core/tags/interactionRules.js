// src/core/tags/interactionRules.js
// Defines how tags interact with each other for card behavior and layout

export const INTERACTION_EFFECTS = {
  MERGE: 'merge',           // Cards group together
  GLOW: 'glow',            // Cards highlight when near
  PULSE: 'pulse',          // Cards pulse when related
  ATTRACT: 'attract',      // Cards move toward each other
  REPEL: 'repel',         // Cards move away from each other
  CHAIN: 'chain',         // Cards form a chain/connection
  SCALE: 'scale',         // Cards change size when related
  COLOR_SHIFT: 'colorShift' // Cards shift color when interacting
};

// Define tag relationships and their effects
export const TAG_INTERACTIONS = [
  // Technology synergies
  {
    tags: ['javascript', 'react'],
    effect: INTERACTION_EFFECTS.MERGE,
    strength: 0.8,
    description: 'JavaScript and React projects naturally group together'
  },
  {
    tags: ['unity', '3d', 'physics'],
    effect: INTERACTION_EFFECTS.CHAIN,
    strength: 0.9,
    description: 'Unity, 3D, and physics form a strong development chain'
  },
  {
    tags: ['hardware', 'embedded', 'esp32'],
    effect: INTERACTION_EFFECTS.ATTRACT,
    strength: 0.7,
    description: 'Hardware projects attract each other'
  },
  
  // Domain relationships
  {
    tags: ['audio', 'javascript'],
    effect: INTERACTION_EFFECTS.GLOW,
    strength: 0.6,
    description: 'Web audio projects glow when both tags present'
  },
  {
    tags: ['ai', 'research'],
    effect: INTERACTION_EFFECTS.PULSE,
    strength: 0.8,
    description: 'AI research projects pulse with academic energy'
  },
  {
    tags: ['3d', 'physics'],
    effect: INTERACTION_EFFECTS.COLOR_SHIFT,
    strength: 0.7,
    description: '3D physics projects shift to more dynamic colors'
  },
  
  // Complexity-based interactions
  {
    tags: ['hardware', 'audio'],
    effect: INTERACTION_EFFECTS.SCALE,
    strength: 0.6,
    description: 'Hardware audio projects scale up due to complexity'
  },
  
  // Research vs Development
  {
    tags: ['research', 'unity'],
    effect: INTERACTION_EFFECTS.REPEL,
    strength: 0.3,
    description: 'Research and game dev represent different approaches'
  }
];

// Layout influence based on private tags
export const LAYOUT_MODIFIERS = {
  featured: {
    effect: 'centerStage',
    multiplier: 2.0,
    description: 'Featured projects move toward center and scale up'
  },
  collaborators: {
    // More collaborators = larger card
    effect: 'scaleByValue',
    baseScale: 1.0,
    scalePerUnit: 0.1,
    maxScale: 1.5,
    description: 'Cards scale with number of collaborators'
  },
  difficulty: {
    // Higher difficulty = more dramatic effects
    effect: 'intensifyEffects',
    multiplier: 0.2, // 20% more intensity per difficulty point
    description: 'Higher difficulty projects have more intense visual effects'
  },
  status: {
    'completed': { 
      effect: 'stabilize',
      description: 'Completed projects have steady, confident positioning'
    },
    'in-progress': { 
      effect: 'pulse',
      description: 'In-progress projects pulse to show active development'
    },
    'prototype': { 
      effect: 'flicker',
      description: 'Prototypes flicker to show experimental nature'
    },
    'archived': { 
      effect: 'fade',
      description: 'Archived projects are slightly faded but still visible'
    }
  }
};

// Utility functions for calculating interactions
export function calculateInteractionStrength(tags1, tags2) {
  let totalStrength = 0;
  let interactionCount = 0;

  TAG_INTERACTIONS.forEach(interaction => {
    const matchCount1 = interaction.tags.filter(tag => tags1.includes(tag)).length;
    const matchCount2 = interaction.tags.filter(tag => tags2.includes(tag)).length;
    
    // Both cards must have tags that match this interaction
    if (matchCount1 > 0 && matchCount2 > 0) {
      const matchRatio = (matchCount1 + matchCount2) / (interaction.tags.length * 2);
      totalStrength += interaction.strength * matchRatio;
      interactionCount++;
    }
  });

  return interactionCount > 0 ? totalStrength / interactionCount : 0;
}

export function getApplicableInteractions(tags) {
  return TAG_INTERACTIONS.filter(interaction => 
    interaction.tags.some(tag => tags.includes(tag))
  );
}

export function calculateLayoutModifiers(privateTags) {
  const modifiers = [];

  Object.entries(privateTags).forEach(([tag, value]) => {
    const modifier = LAYOUT_MODIFIERS[tag];
    if (!modifier) return;

    if (typeof modifier === 'object' && !modifier.effect) {
      // Handle status-like objects with multiple values
      const specificModifier = modifier[value];
      if (specificModifier) {
        modifiers.push({
          ...specificModifier,
          tag,
          value
        });
      }
    } else {
      // Handle direct modifiers
      modifiers.push({
        ...modifier,
        tag,
        value
      });
    }
  });

  return modifiers;
}

// Future: Advanced interaction patterns
export const ADVANCED_PATTERNS = {
  // When 3+ cards share tags, create constellation patterns
  CONSTELLATION: {
    minCards: 3,
    sharedTagsRequired: 2,
    effect: 'constellation',
    description: 'Multiple related cards form constellation patterns'
  },
  
  // Timeline: cards with year tags form temporal relationships
  TIMELINE: {
    tagRequired: 'year',
    effect: 'timeline',
    description: 'Projects arrange chronologically when year tags present'
  },
  
  // Skill trees: technology progressions
  SKILL_TREE: {
    progressions: [
      ['javascript', 'react', 'unity'],
      ['hardware', 'embedded', 'esp32'],
      ['research', 'ai', 'physics']
    ],
    effect: 'skillTree',
    description: 'Related technologies form skill tree visualizations'
  }
};

// Export main calculation function
export function calculateCardInteractions(cards) {
  const interactions = [];
  
  for (let i = 0; i < cards.length; i++) {
    for (let j = i + 1; j < cards.length; j++) {
      const card1 = cards[i];
      const card2 = cards[j];
      
      const strength = calculateInteractionStrength(
        card1.publicTags, 
        card2.publicTags
      );
      
      if (strength > 0.1) { // Only include meaningful interactions
        const applicableEffects = TAG_INTERACTIONS.filter(interaction => {
          const hasTag1 = interaction.tags.some(tag => card1.publicTags.includes(tag));
          const hasTag2 = interaction.tags.some(tag => card2.publicTags.includes(tag));
          return hasTag1 && hasTag2;
        });
        
        interactions.push({
          card1: i,
          card2: j,
          strength,
          effects: applicableEffects.map(e => e.effect)
        });
      }
    }
  }
  
  return interactions;
}