// Centralized glossary data - single source of truth
// This replaces the markdown approach with a more maintainable structure
// Enhanced for Wikipedia-style content and optimal SEO

export const glossaryTerms = {
  spolia: {
    slug: "spolia",
    term: "Spolia",
    shortDefinition:
      "Spolia is the strategic repurposing of architectural elements from historical structures into new constructions.",
    fullDefinition: `Spolia (singular: spolium) refers to the practice of repurposing architectural fragments and decorative elements from earlier buildings into new constructions. Originally describing Roman and Medieval architectural reuse, it has evolved to represent methodologies of meaningful reappropriation in design.`,
    etymology: 'From Latin spolium ("spoil"), originally meaning the armor stripped from a defeated enemy',
    examples: [
      "Roman columns incorporated into medieval churches",
      "Digital design patterns reused across different interfaces",
      "Sustainable architecture using reclaimed materials",
    ],
    relatedTerms: ["circular-economy", "regenerative-futures", "pattern-language"],
    tags: ["architecture", "sustainability", "design-methodology"],
    seo: {
      title: "Spolia: Architectural Reuse in Historical and Contemporary Design",
      description:
        "Explore spolia: from Roman architectural reuse to contemporary design methodology. Understanding material and conceptual reappropriation across time.",
      keywords: [
        "spolia",
        "architectural reuse",
        "sustainability",
        "design methodology",
        "Roman architecture",
        "medieval architecture",
      ],
    },
    dateModified: "2024-03-19",
    content: {
      tableOfContents: [
        { id: "historical-context", title: "Historical Context", level: 2 },
        { id: "roman-origins", title: "Roman Origins", level: 3 },
        { id: "medieval-adaptation", title: "Medieval Adaptation", level: 3 },
        { id: "contemporary-applications", title: "Contemporary Applications", level: 2 },
        { id: "digital-spolia", title: "Digital Spolia", level: 3 },
        { id: "sustainable-practices", title: "Sustainable Practices", level: 3 },
        { id: "design-implications", title: "Design Implications", level: 2 },
      ],
      sections: [
        {
          id: "historical-context",
          heading: "Historical Context",
          level: 2,
          content: `In Roman and Medieval architecture, spolia represented both practical resource management and symbolic appropriation of power. The practice emerged from economic necessity but evolved into a deliberate design strategy that conveyed cultural and political messages.

The term itself derives from the Latin "spolium," originally referring to armor stripped from defeated enemies. This martial etymology reflects the conquistatorial nature of architectural spolia—the literal appropriation of defeated civilizations' material culture.`,
          subsections: [
            {
              id: "roman-origins",
              heading: "Roman Origins",
              level: 3,
              content: `Roman architects first systematized the reuse of architectural elements during the late imperial period. As the empire expanded, incorporating local building traditions became both practical and symbolic. Notable examples include the Arch of Constantine (315 CE), which incorporates sculptural elements from earlier monuments dedicated to Trajan, Hadrian, and Marcus Aurelius.

This practice served multiple functions:
- **Economic efficiency**: Reducing construction costs and time
- **Cultural integration**: Acknowledging local architectural traditions
- **Political messaging**: Demonstrating dominance over conquered territories
- **Material quality**: Utilizing superior craftsmanship from earlier periods`,
            },
            {
              id: "medieval-adaptation",
              heading: "Medieval Adaptation",
              level: 3,
              content: `Medieval builders transformed Roman spolia practices, often driven by different motivations. Christian churches frequently incorporated pagan architectural elements, creating new symbolic meanings. The Basilica of San Lorenzo in Rome exemplifies this transformation, where Roman columns support Christian liturgical spaces.

Medieval spolia differed from Roman practices in several ways:
- **Religious recontextualization**: Pagan elements gained Christian meanings
- **Technical necessity**: Lost construction techniques made reuse essential
- **Symbolic continuity**: Connecting new Christian authority to Roman imperial power`,
            },
          ],
        },
        {
          id: "contemporary-applications",
          heading: "Contemporary Applications",
          level: 2,
          content: `Modern interpretations of spolia extend beyond physical materials to include digital assets, design patterns, and conceptual frameworks. Contemporary designers apply spolia principles to create sustainable, meaningful, and culturally resonant work.`,
          subsections: [
            {
              id: "digital-spolia",
              heading: "Digital Spolia",
              level: 3,
              content: `In digital design, spolia manifests as the strategic reuse of interface patterns, code libraries, and design systems. This practice enables rapid development while maintaining user familiarity and accessibility standards.

Examples of digital spolia include:
- **Design system components** reused across different applications
- **Open-source libraries** incorporated into proprietary software
- **Interface patterns** adapted from successful applications
- **Typography systems** borrowed from print design traditions

The concept of [pattern-language](#pattern-language) directly relates to digital spolia, providing systematic approaches to design reuse.`,
            },
            {
              id: "sustainable-practices",
              heading: "Sustainable Practices",
              level: 3,
              content: `Contemporary architecture embraces spolia as a sustainability strategy, reducing waste and embodied energy. This approach aligns with [regenerative-futures](#regenerative-futures) thinking, moving beyond mere conservation to active environmental benefit.

Modern sustainable spolia includes:
- **Adaptive reuse** of existing structures
- **Material recovery** from demolition sites
- **Component harvesting** for new construction
- **Cultural preservation** through architectural continuity`,
            },
          ],
        },
        {
          id: "design-implications",
          heading: "Design Implications",
          level: 2,
          content: `Understanding spolia provides designers with powerful tools for creating meaningful, sustainable, and culturally resonant work. The practice challenges assumptions about originality and authenticity while promoting resourcefulness and historical consciousness.

Key design principles derived from spolia include:
- **Contextual sensitivity**: Understanding the original meaning and adapting appropriately
- **Material respect**: Honoring the craftsmanship and history of reused elements
- **Narrative layering**: Creating new meanings while preserving historical significance
- **Sustainable thinking**: Prioritizing reuse over new production when possible`,
        },
      ],
      furtherReading: [
        {
          title: "The Afterlife of the Roman City",
          url: "https://academic-source/spolia-studies",
          description: "Architecture and ceremony in late antiquity and the early middle ages",
          type: "academic",
        },
        {
          title: "Sustainable Spolia: Contemporary Architectural Reuse",
          url: "https://architectural-review/sustainable-spolia",
          description: "Modern applications of historical reuse principles in contemporary architecture",
          type: "journal",
        },
      ],
      images: [
        {
          src: "/glossary_images/spolia",
          alt: "Historical example of spolia in architectural reuse",
          caption:
            "Example of spolia: architectural elements repurposed from earlier structures into new constructions",
        },
      ],
    },
  },

  "pattern-language": {
    slug: "pattern-language",
    term: "Pattern Language",
    shortDefinition:
      "A systematic methodology for documenting and applying successful design solutions across different contexts.",
    fullDefinition: `A pattern language is a systematic methodology for documenting and applying successful design solutions across different contexts and scales of the built environment. Created by Christopher Alexander, it provides a shared vocabulary for design solutions.`,
    etymology: 'Coined by Christopher Alexander in "A Pattern Language" (1977)',
    examples: [
      'Alexander\'s architectural patterns like "Light on Two Sides"',
      "Software design patterns (MVC, Observer, Factory)",
      "Urban planning patterns for walkable neighborhoods",
    ],
    relatedTerms: ["ecological-intelligence", "computational-thinking", "cybernetics"],
    tags: ["design-methodology", "architecture", "systems-thinking"],
    seo: {
      title: "Pattern Language: Systematic Design Solutions",
      description:
        "Understanding pattern languages: Christopher Alexander's methodology for documenting and applying successful design solutions across contexts.",
    },
    dateModified: "2024-03-19",
    content: {
      sections: [
        {
          heading: "Core Principles",
          content:
            "Pattern languages operate on the principle that successful design solutions can be abstracted, documented, and reapplied...",
        },
        {
          heading: "Modern Applications",
          content:
            "From software architecture to urban planning, pattern languages provide frameworks for solving recurring problems...",
        },
      ],
      furtherReading: [
        {
          title: "A Pattern Language",
          url: "https://pattern-language.com/original",
          description: "Christopher Alexander's seminal work on pattern languages",
        },
      ],
    },
  },

  "creative-computation": {
    slug: "creative-computation",
    term: "Creative Computation",
    shortDefinition:
      "The intersection of algorithmic processes and creative expression, where computation becomes a medium for artistic exploration.",
    fullDefinition: `Creative computation represents the intersection of algorithmic processes and creative expression, where computation becomes a medium for artistic exploration rather than purely functional tool.`,
    etymology: "Emerging from the convergence of computer science and creative arts in the late 20th century",
    examples: [
      "Processing and p5.js for visual art generation",
      "Algorithmic music composition and live coding",
      "Generative design in architecture and product development",
    ],
    relatedTerms: ["computational-thinking", "pattern-language"],
    tags: ["computation", "creativity", "digital-art"],
    seo: {
      title: "Creative Computation: Art Meets Algorithm",
      description:
        "Explore creative computation: where algorithmic processes become tools for artistic expression and experimental design.",
    },
    dateModified: "2024-03-19",
    content: {
      sections: [
        {
          heading: "Origins and Philosophy",
          content:
            "Creative computation emerged from the recognition that computational processes could serve as creative mediums...",
        },
      ],
    },
  },

  "regenerative-futures": {
    slug: "regenerative-futures",
    term: "Regenerative Futures",
    shortDefinition:
      "Design approaches that move beyond sustainability to actively enhance ecological and social systems.",
    fullDefinition: `Regenerative futures represent design approaches that move beyond sustainability to actively enhance ecological and social systems, creating positive environmental and social impact.`,
    etymology: "From regenerative agriculture and permaculture principles applied to broader design contexts",
    examples: [
      "Carbon-negative building materials",
      "Ecosystems that improve through human intervention",
      "Social systems that strengthen communities",
    ],
    relatedTerms: ["ecological-intelligence", "spolia"],
    tags: ["sustainability", "ecology", "future-design"],
    seo: {
      title: "Regenerative Futures: Beyond Sustainability",
      description:
        "Understanding regenerative futures: design approaches that actively enhance ecological and social systems.",
    },
    dateModified: "2024-03-19",
    content: {
      sections: [
        {
          heading: "Beyond Sustainability",
          content: 'While sustainability aims to "do no harm," regenerative approaches actively improve systems...',
        },
      ],
    },
  },

  "ecological-intelligence": {
    slug: "ecological-intelligence",
    term: "Ecological Intelligence",
    shortDefinition: "A framework for understanding and applying nature's systemic wisdom to human design challenges.",
    fullDefinition: `Ecological intelligence represents a framework for understanding and applying nature's systemic wisdom to human design challenges and decision-making processes.`,
    etymology: "Popularized by Daniel Goleman, building on biomimicry and systems thinking",
    examples: [
      "Biomimetic design inspired by natural forms",
      "Circular systems modeled on natural cycles",
      "Adaptive management based on ecosystem principles",
    ],
    relatedTerms: ["regenerative-futures", "pattern-language"],
    tags: ["ecology", "biomimicry", "systems-thinking"],
    seo: {
      title: "Ecological Intelligence: Nature's Design Wisdom",
      description:
        "Explore ecological intelligence: applying nature's systemic wisdom to human design challenges and sustainability.",
      keywords: [
        "ecological intelligence",
        "biomimicry",
        "systems thinking",
        "sustainability",
        "nature-inspired design",
      ],
    },
    dateModified: "2024-03-19",
    content: {
      tableOfContents: [
        { id: "natural-systems", title: "Natural Systems as Teachers", level: 2 },
        { id: "biomimetic-principles", title: "Biomimetic Principles", level: 3 },
        { id: "systems-approach", title: "Systems Approach", level: 3 },
        { id: "design-applications", title: "Design Applications", level: 2 },
        { id: "sustainability-integration", title: "Sustainability Integration", level: 2 },
      ],
      sections: [
        {
          id: "natural-systems",
          heading: "Natural Systems as Teachers",
          level: 2,
          content:
            "Nature has evolved sophisticated solutions over billions of years, creating systems that are inherently sustainable, efficient, and resilient. Ecological intelligence recognizes these natural patterns as valuable templates for human design and decision-making.",
          subsections: [
            {
              id: "biomimetic-principles",
              heading: "Biomimetic Principles",
              level: 3,
              content:
                "Biomimicry draws directly from natural forms and processes, translating biological mechanisms into human applications. Examples include velcro inspired by burdock burrs, architectural ventilation systems modeled on termite mounds, and computational algorithms based on ant colony behavior.",
            },
            {
              id: "systems-approach",
              heading: "Systems Approach",
              level: 3,
              content:
                "Beyond individual organisms, ecological intelligence examines ecosystem-level patterns: nutrient cycles, energy flows, symbiotic relationships, and adaptive responses to change. These systemic insights inform approaches to organizational design, urban planning, and economic models.",
            },
          ],
        },
        {
          id: "design-applications",
          heading: "Design Applications",
          level: 2,
          content:
            "Ecological intelligence manifests in various design disciplines, from architecture and product design to software systems and organizational structures. The common thread is the application of natural principles to create more sustainable, efficient, and adaptive human systems.",
        },
        {
          id: "sustainability-integration",
          heading: "Sustainability Integration",
          level: 2,
          content:
            "This approach naturally aligns with [regenerative-futures](#regenerative-futures) thinking, moving beyond mere sustainability to create systems that actively benefit their environments. Ecological intelligence provides the conceptual framework for understanding how human systems can integrate beneficially with natural systems.",
        },
      ],
      furtherReading: [
        {
          title: "Ecological Intelligence",
          url: "https://www.danielgoleman.info/topics/ecological-intelligence/",
          description: "Daniel Goleman's foundational work on ecological intelligence",
          type: "book",
        },
        {
          title: "Biomimicry: Innovation Inspired by Nature",
          url: "https://biomimicry.org/",
          description: "The Biomimicry Institute's resources on nature-inspired innovation",
          type: "organization",
        },
      ],
    },
  },

  cybernetics: {
    slug: "cybernetics",
    term: "Cybernetics",
    shortDefinition:
      "The study of regulatory systems in both mechanical and living systems, focusing on feedback loops and self-governing mechanisms.",
    fullDefinition: `Cybernetics is the study of regulatory systems in both mechanical and living systems, focusing on feedback loops and self-governing mechanisms. It provides fundamental frameworks for understanding complex system behaviors and designing more responsive technological solutions.`,
    etymology: "From Greek κυβερνήτης (kybernētēs), meaning 'steersman' or 'governor'",
    examples: [
      "Thermostat systems that maintain temperature through feedback",
      "Ecosystem regulation through predator-prey relationships",
      "Organizational management systems with feedback loops",
    ],
    relatedTerms: ["machine-intelligence", "cyberphysical-systems", "technological-ecology"],
    tags: ["systems-thinking", "computation", "feedback-systems"],
    seo: {
      title: "Cybernetics: Feedback Systems and Control Theory",
      description:
        "Explore cybernetics: the study of regulatory systems, feedback loops, and self-governing mechanisms in technology and nature.",
      keywords: ["cybernetics", "feedback systems", "control theory", "systems thinking", "automation"],
    },
    dateModified: "2024-03-19",
    content: {
      tableOfContents: [
        { id: "what-is-cybernetics", title: "What is Cybernetics?", level: 2 },
        { id: "why-cybernetics-matters", title: "Why Cybernetics Matters", level: 2 },
        { id: "how-cybernetics-works", title: "How Cybernetics Works", level: 2 },
        { id: "modern-applications", title: "Modern Applications", level: 2 },
      ],
      sections: [
        {
          id: "what-is-cybernetics",
          heading: "What is Cybernetics?",
          level: 2,
          content:
            "The study of regulatory systems in both mechanical and living systems, focusing on feedback loops and self-governing mechanisms. Cybernetics examines how systems maintain stability and adapt to changes through information processing and control mechanisms.",
        },
        {
          id: "why-cybernetics-matters",
          heading: "Why Cybernetics Matters",
          level: 2,
          content:
            "Provides fundamental frameworks for understanding complex system behaviors and designing more responsive technological solutions. Cybernetics enables us to create systems that can self-regulate, adapt to changing conditions, and maintain optimal performance without constant human intervention.",
        },
        {
          id: "how-cybernetics-works",
          heading: "How Cybernetics Works",
          level: 2,
          content:
            "Through analysis of information flow, feedback mechanisms, and system dynamics across natural and artificial systems. Cybernetic systems use sensors to gather information about their environment, processors to analyze this data, and actuators to respond appropriately, creating continuous feedback loops.",
        },
        {
          id: "modern-applications",
          heading: "Modern Applications",
          level: 2,
          content:
            "Contemporary cybernetics influences fields from robotics and AI to organizational management and urban planning. The principles inform the design of [cyberphysical-systems](#cyberphysical-systems) and contribute to [machine-intelligence](#machine-intelligence) development.",
        },
      ],
      furtherReading: [
        {
          title: "The Human Use of Human Beings",
          url: "https://cybernetics-foundation.org/wiener",
          description: "Norbert Wiener's foundational text on cybernetics and society",
          type: "book",
        },
        {
          title: "New Cybernetics for the Modern Age",
          url: "https://contemporary-cybernetics.edu",
          description: "Applications in contemporary system design",
          type: "academic",
        },
      ],
    },
  },

  "human-scale-craft": {
    slug: "human-scale-craft",
    term: "Human-Scale Craft",
    shortDefinition:
      "The integration of traditional craftsmanship with contemporary tools and techniques at a human-centric scale.",
    fullDefinition: `Human-scale craft represents the integration of traditional craftsmanship with contemporary tools and techniques at a human-centric scale, preserving essential tactile knowledge while adapting to modern production capabilities.`,
    etymology: "Emerging from the maker movement and digital fabrication communities",
    examples: [
      "3D printing combined with hand-finishing techniques",
      "Digital design tools used to create traditional woodworking plans",
      "Hybrid jewelry making using laser cutting and hand assembly",
    ],
    relatedTerms: ["artisanal-technology", "peripheral-technology", "creative-computation"],
    tags: ["craft", "making", "technology", "human-centered"],
    seo: {
      title: "Human-Scale Craft: Traditional Skills Meet Modern Tools",
      description:
        "Discover human-scale craft: integrating traditional craftsmanship with contemporary tools while maintaining human agency in making.",
      keywords: [
        "human scale craft",
        "digital fabrication",
        "maker movement",
        "traditional crafts",
        "artisanal technology",
      ],
    },
    dateModified: "2024-03-19",
    content: {
      sections: [
        {
          id: "what-is-human-scale-craft",
          heading: "What is Human-Scale Craft?",
          level: 2,
          content:
            "The integration of traditional craftsmanship with contemporary tools and techniques at a human-centric scale. This approach maintains the essential connection between maker and object while leveraging modern capabilities.",
        },
        {
          id: "why-human-scale-matters",
          heading: "Why Human-Scale Matters",
          level: 2,
          content:
            "Preserves essential tactile knowledge while adapting to modern production capabilities. Human-scale craft maintains human agency in the making process, ensuring that technology serves human creativity rather than replacing it.",
        },
        {
          id: "how-to-practice",
          heading: "How to Practice Human-Scale Craft",
          level: 2,
          content:
            "Through careful balance of hand skills and digital tools, maintaining human agency in the making process. This involves selecting appropriate technologies that enhance rather than replace human capabilities.",
        },
      ],
      furtherReading: [
        {
          title: "The Nature and Art of Workmanship",
          url: "https://craft-studies.org/workmanship",
          description: "Understanding craft in the digital age",
          type: "book",
        },
        {
          title: "Digital Craft: The Future of Making",
          url: "https://digital-craft.org",
          description: "Merging traditional and digital techniques",
          type: "website",
        },
      ],
    },
  },

  "hippie-modernism": {
    slug: "hippie-modernism",
    term: "Hippie Modernism",
    shortDefinition:
      "A design movement merging counterculture ideals with technological innovation and experimental approaches.",
    fullDefinition: `Hippie modernism represents a design movement that merged counterculture ideals with technological innovation and experimental approaches, offering alternative perspectives on progress and development outside mainstream modernist narratives.`,
    etymology: "Coined to describe the intersection of 1960s counterculture with modernist design principles",
    examples: [
      "Buckminster Fuller's geodesic domes and experimental architecture",
      "Stewart Brand's Whole Earth Catalog as design methodology",
      "Drop City and other experimental communities",
    ],
    relatedTerms: ["speculative-futures", "peripheral-technology", "regenerative-futures"],
    tags: ["design-history", "counterculture", "experimental-design"],
    seo: {
      title: "Hippie Modernism: Counterculture Meets Design Innovation",
      description:
        "Explore hippie modernism: the 1960s design movement that merged counterculture ideals with technological innovation and experimental approaches.",
      keywords: [
        "hippie modernism",
        "counterculture design",
        "experimental architecture",
        "1960s design",
        "alternative modernism",
      ],
    },
    dateModified: "2024-03-19",
    content: {
      sections: [
        {
          id: "what-is-hippie-modernism",
          heading: "What is Hippie Modernism?",
          level: 2,
          content:
            "A design movement merging counterculture ideals with technological innovation and experimental approaches. It challenged conventional modernist principles while embracing technology as a tool for social transformation.",
        },
        {
          id: "why-it-emerged",
          heading: "Why It Emerged",
          level: 2,
          content:
            "Offers alternative perspectives on progress and development outside mainstream modernist narratives. The movement arose as a response to perceived limitations of traditional modernism and corporate-driven technological development.",
        },
        {
          id: "how-it-manifested",
          heading: "How It Manifested",
          level: 2,
          content:
            "Through experimental communities and radical design approaches that challenge conventional modernist principles. This included everything from geodesic architecture to alternative technology development and communal living experiments.",
        },
      ],
      furtherReading: [
        {
          title: "Hippie Modernism: The Struggle for Utopia",
          url: "https://walker-art.org/hippie-modernism",
          description: "Radical architecture and design of the 1960s and 70s",
          type: "exhibition",
        },
        {
          title: "Alternative Modernisms",
          url: "https://design-history.org/alternative",
          description: "Countercultural design movements",
          type: "academic",
        },
      ],
    },
  },

  "speculative-futures": {
    slug: "speculative-futures",
    term: "Speculative Futures",
    shortDefinition:
      "The use of design methodologies to explore and critique possible future scenarios and their implications.",
    fullDefinition: `Speculative futures involves the use of design methodologies to explore and critique possible future scenarios and their implications, enabling more nuanced understanding of potential futures and their current implications.`,
    etymology: "Developed from science fiction and critical design practices",
    examples: [
      "Design fiction prototypes exploring future technologies",
      "Scenario planning for climate change adaptation",
      "Critical design objects questioning technological assumptions",
    ],
    relatedTerms: ["regenerative-futures", "speculative-computing", "planetary-computation"],
    tags: ["future-design", "critical-design", "scenario-planning"],
    seo: {
      title: "Speculative Futures: Design for Tomorrow's Possibilities",
      description:
        "Understand speculative futures: using design methodologies to explore and critique possible future scenarios and their implications.",
      keywords: ["speculative futures", "design fiction", "future scenarios", "critical design", "speculative design"],
    },
    dateModified: "2024-03-19",
    content: {
      sections: [
        {
          id: "what-are-speculative-futures",
          heading: "What are Speculative Futures?",
          level: 2,
          content:
            "The use of design methodologies to explore and critique possible future scenarios and their implications. This practice uses design as a tool for thinking about and materializing potential futures.",
        },
        {
          id: "why-speculate",
          heading: "Why Speculate About Futures?",
          level: 2,
          content:
            "Enables more nuanced understanding of potential futures and their current implications. By materializing possible futures through design, we can better understand the consequences of current decisions and alternative pathways.",
        },
        {
          id: "how-to-practice",
          heading: "How to Practice Speculative Design",
          level: 2,
          content:
            "Through creation of artifacts, scenarios, and experiences that materialize possible future conditions. This involves developing prototypes, narratives, and experiences that make abstract futures tangible and discussable.",
        },
      ],
      furtherReading: [
        {
          title: "Speculative Everything",
          url: "https://speculative-design.org",
          description: "Design, fiction, and social dreaming",
          type: "book",
        },
        {
          title: "Future Scenarios",
          url: "https://futures-lab.com",
          description: "Methods for exploring possible futures",
          type: "website",
        },
      ],
    },
  },

  "living-lab": {
    slug: "living-lab",
    term: "Living Lab",
    shortDefinition:
      "Real-world research environments that enable continuous experimentation and data collection in everyday settings.",
    fullDefinition: `Living labs are real-world research environments that enable continuous experimentation and data collection in everyday settings, providing more accurate insights into how solutions function in actual use conditions.`,
    etymology: "Developed from participatory design and user-centered research methodologies",
    examples: [
      "Smart city testbeds in urban neighborhoods",
      "University campuses as sustainability research environments",
      "Community gardens as social innovation laboratories",
    ],
    relatedTerms: ["cyberphysical-systems", "technological-ecology", "peripheral-technology"],
    tags: ["research-methodology", "experimentation", "real-world-testing"],
    seo: {
      title: "Living Lab: Real-World Research Environments",
      description:
        "Learn about living labs: real-world research environments enabling continuous experimentation and data collection in everyday settings.",
      keywords: ["living lab", "real world research", "experimentation", "user testing", "research methodology"],
    },
    dateModified: "2024-03-19",
    content: {
      sections: [
        {
          id: "what-is-living-lab",
          heading: "What is a Living Lab?",
          level: 2,
          content:
            "Real-world research environments that enable continuous experimentation and data collection in everyday settings. Living labs blur the boundary between laboratory and real-world application.",
        },
        {
          id: "why-living-labs",
          heading: "Why Living Labs?",
          level: 2,
          content:
            "Provides more accurate insights into how solutions function in actual use conditions. Traditional laboratory research often fails to capture the complexity of real-world usage patterns and contextual factors.",
        },
        {
          id: "how-to-implement",
          heading: "How to Implement Living Labs",
          level: 2,
          content:
            "Through creation of instrumented environments that enable natural interaction while gathering research data. This requires careful balance between research objectives and participant privacy and comfort.",
        },
      ],
      furtherReading: [
        {
          title: "Living Labs: Design and Assessment of Sustainable Living",
          url: "https://living-labs.org/methodology",
          description: "Principles of living lab research",
          type: "organization",
        },
        {
          title: "Real-World Innovation Environments",
          url: "https://innovation-labs.edu",
          description: "Creating effective living laboratories",
          type: "academic",
        },
      ],
    },
  },

  "cyberphysical-systems": {
    slug: "cyberphysical-systems",
    term: "Cyberphysical Systems",
    shortDefinition:
      "Integrated computational and physical processes that enable real-time interaction between digital and physical realms.",
    fullDefinition: `Cyberphysical systems are integrated computational and physical processes that enable real-time interaction between digital and physical realms, creating more responsive and adaptive environments through seamless digital-physical integration.`,
    etymology: "Coined in the early 2000s to describe the convergence of computational and physical systems",
    examples: [
      "Smart building systems that adjust lighting and temperature automatically",
      "Industrial IoT networks monitoring manufacturing processes",
      "Autonomous vehicle systems integrating sensors and navigation",
    ],
    relatedTerms: ["planetary-computation", "machine-intelligence", "technological-ecology"],
    tags: ["systems-integration", "iot", "automation", "smart-systems"],
    seo: {
      title: "Cyberphysical Systems: Digital-Physical Integration",
      description:
        "Understand cyberphysical systems: integrated computational and physical processes enabling real-time digital-physical interaction.",
      keywords: ["cyberphysical systems", "digital physical integration", "IoT", "smart systems", "automation"],
    },
    dateModified: "2024-03-19",
    content: {
      sections: [
        {
          id: "what-are-cps",
          heading: "What are Cyberphysical Systems?",
          level: 2,
          content:
            "Integrated computational and physical processes that enable real-time interaction between digital and physical realms. These systems combine embedded computing with physical processes to create responsive, adaptive environments.",
        },
        {
          id: "why-cps-matter",
          heading: "Why Cyberphysical Systems Matter",
          level: 2,
          content:
            "Creates more responsive and adaptive environments through seamless digital-physical integration. CPS enable unprecedented levels of automation, optimization, and real-time response to changing conditions.",
        },
        {
          id: "how-cps-work",
          heading: "How Cyberphysical Systems Work",
          level: 2,
          content:
            "Through networks of sensors, processors, and actuators that enable continuous monitoring and response. The integration of [cybernetics](#cybernetics) principles with modern computing creates systems that can self-regulate and adapt.",
        },
      ],
      furtherReading: [
        {
          title: "Principles of Cyber-Physical Systems",
          url: "https://cps-design.org",
          description: "Fundamentals of integrated systems",
          type: "academic",
        },
        {
          title: "The Connected Environment",
          url: "https://connected-systems.edu",
          description: "Applications of cyberphysical integration",
          type: "journal",
        },
      ],
    },
  },

  "technological-ecology": {
    slug: "technological-ecology",
    term: "Technological Ecology",
    shortDefinition:
      "The study and design of technological systems as integrated components of larger ecological systems.",
    fullDefinition: `Technological ecology involves the study and design of technological systems as integrated components of larger ecological systems, enabling more harmonious integration of technological and natural systems.`,
    etymology: "Developed from ecological design and systems thinking approaches",
    examples: [
      "Renewable energy systems designed to work with natural cycles",
      "Biomimetic computing systems inspired by natural processes",
      "Urban infrastructure that enhances rather than disrupts ecosystems",
    ],
    relatedTerms: ["ecological-intelligence", "cyberphysical-systems", "biophilic-design"],
    tags: ["ecology", "technology-integration", "systems-design"],
    seo: {
      title: "Technological Ecology: Technology in Harmony with Nature",
      description:
        "Explore technological ecology: designing technological systems as integrated components of larger ecological systems.",
      keywords: [
        "technological ecology",
        "ecological technology",
        "green technology",
        "sustainable systems",
        "eco-tech",
      ],
    },
    dateModified: "2024-03-19",
    content: {
      sections: [
        {
          id: "what-is-tech-ecology",
          heading: "What is Technological Ecology?",
          level: 2,
          content:
            "The study and design of technological systems as integrated components of larger ecological systems. This approach treats technology not as separate from nature, but as part of extended ecological networks.",
        },
        {
          id: "why-integrate-tech-ecology",
          heading: "Why Integrate Technology and Ecology?",
          level: 2,
          content:
            "Enables more harmonious integration of technological and natural systems. By understanding technology as part of ecological systems, we can design solutions that enhance rather than disrupt natural processes.",
        },
        {
          id: "how-to-design-ecologically",
          heading: "How to Design Technological Ecology",
          level: 2,
          content:
            "Through development of technologies that enhance rather than disrupt natural processes. This requires deep understanding of both technological capabilities and ecological principles, often drawing from [ecological-intelligence](#ecological-intelligence).",
        },
      ],
      furtherReading: [
        {
          title: "Technology in Nature",
          url: "https://tech-ecology.org",
          description: "Ecological approaches to technological design",
          type: "organization",
        },
        {
          title: "Natural Computing",
          url: "https://natural-computing.edu",
          description: "Bio-inspired technological systems",
          type: "academic",
        },
      ],
    },
  },

  "planetary-computation": {
    slug: "planetary-computation",
    term: "Planetary Computation",
    shortDefinition:
      "Computational systems operating at global scale, creating distributed networks of sensing and processing.",
    fullDefinition: `Planetary computation involves computational systems operating at global scale, creating distributed networks of sensing and processing that enable coordination and response to challenges at planetary scale.`,
    etymology: "Emerging from distributed computing and global sensing network development",
    examples: [
      "Global climate monitoring networks",
      "Internet infrastructure as planetary nervous system",
      "Satellite-based earth observation systems",
    ],
    relatedTerms: ["cyberphysical-systems", "technological-ecology", "machine-intelligence"],
    tags: ["global-systems", "distributed-computing", "earth-systems"],
    seo: {
      title: "Planetary Computation: Global-Scale Computing Networks",
      description:
        "Discover planetary computation: computational systems operating at global scale for earth-wide sensing and processing.",
      keywords: [
        "planetary computation",
        "global computing",
        "distributed systems",
        "earth monitoring",
        "planetary networks",
      ],
    },
    dateModified: "2024-03-19",
    content: {
      sections: [
        {
          id: "what-is-planetary-computation",
          heading: "What is Planetary Computation?",
          level: 2,
          content:
            "Computational systems operating at global scale, creating distributed networks of sensing and processing. These systems treat the entire planet as a computational environment.",
        },
        {
          id: "why-planetary-scale",
          heading: "Why Planetary Scale?",
          level: 2,
          content:
            "Enables coordination and response to challenges at planetary scale. Many contemporary challenges—climate change, resource management, global communication—require computational responses at commensurate scales.",
        },
        {
          id: "how-to-implement",
          heading: "How to Implement Planetary Computation",
          level: 2,
          content:
            "Through implementation of distributed systems that connect local and global computational processes. This involves creating networks that can operate across different scales while maintaining coherence and responsiveness.",
        },
      ],
      furtherReading: [
        {
          title: "Computing Earth",
          url: "https://planetary-systems.org",
          description: "Global-scale computational networks",
          type: "organization",
        },
        {
          title: "Planetary-Scale Systems",
          url: "https://global-computation.edu",
          description: "Architectures for earth-scale computing",
          type: "academic",
        },
      ],
    },
  },

  "biophilic-design": {
    slug: "biophilic-design",
    term: "Biophilic Design",
    shortDefinition: "Design approaches that integrate natural patterns and processes into built environments.",
    fullDefinition: `Biophilic design encompasses design approaches that integrate natural patterns and processes into built environments, enhancing human wellbeing through stronger connections to natural systems.`,
    etymology: "From 'biophilia' (love of life), coined by biologist E.O. Wilson",
    examples: [
      "Living walls and integrated vegetation in buildings",
      "Natural lighting and ventilation systems",
      "Material palettes inspired by natural textures and colors",
    ],
    relatedTerms: ["ecological-intelligence", "regenerative-futures", "technological-ecology"],
    tags: ["architecture", "nature-integration", "wellbeing", "sustainability"],
    seo: {
      title: "Biophilic Design: Nature-Integrated Architecture",
      description:
        "Explore biophilic design: integrating natural patterns and processes into built environments for enhanced human wellbeing.",
      keywords: [
        "biophilic design",
        "nature architecture",
        "green building",
        "natural design",
        "biomimetic architecture",
      ],
    },
    dateModified: "2024-03-19",
    content: {
      sections: [
        {
          id: "what-is-biophilic-design",
          heading: "What is Biophilic Design?",
          level: 2,
          content:
            "Design approaches that integrate natural patterns and processes into built environments. Biophilic design recognizes the human need for connection with nature and designs spaces that fulfill this need.",
        },
        {
          id: "why-biophilic-matters",
          heading: "Why Biophilic Design Matters",
          level: 2,
          content:
            "Enhances human wellbeing through stronger connections to natural systems. Research shows that exposure to natural elements in built environments reduces stress, improves cognitive function, and enhances overall health.",
        },
        {
          id: "how-to-implement",
          heading: "How to Implement Biophilic Design",
          level: 2,
          content:
            "Through incorporation of natural materials, forms, and processes in architectural design. This can range from direct integration of plants and water to more abstract applications of natural patterns and geometries.",
        },
      ],
      furtherReading: [
        {
          title: "Biophilic Design: Theory and Practice",
          url: "https://biophilic.org/principles",
          description: "Fundamentals of nature-integrated design",
          type: "organization",
        },
        {
          title: "Living Architecture",
          url: "https://living-buildings.com",
          description: "Building with natural systems",
          type: "website",
        },
      ],
    },
  },

  "peripheral-technology": {
    slug: "peripheral-technology",
    term: "Peripheral Technology",
    shortDefinition:
      "Technological development occurring outside mainstream innovation centers, focused on local needs and contexts.",
    fullDefinition: `Peripheral technology refers to technological development occurring outside mainstream innovation centers, focused on local needs and contexts, enabling more diverse and contextually appropriate technological solutions.`,
    etymology: "Developed from studies of innovation in non-metropolitan areas",
    examples: [
      "Community-developed water purification systems",
      "Local mesh networking solutions",
      "Appropriate technology for rural communities",
    ],
    relatedTerms: ["artisanal-technology", "human-scale-craft", "living-lab"],
    tags: ["community-technology", "local-innovation", "appropriate-technology"],
    seo: {
      title: "Peripheral Technology: Innovation from the Margins",
      description:
        "Understand peripheral technology: technological development outside mainstream centers, focused on local needs and contexts.",
      keywords: [
        "peripheral technology",
        "appropriate technology",
        "community innovation",
        "local technology",
        "grassroots tech",
      ],
    },
    dateModified: "2024-03-19",
    content: {
      sections: [
        {
          id: "what-is-peripheral-tech",
          heading: "What is Peripheral Technology?",
          level: 2,
          content:
            "Technological development occurring outside mainstream innovation centers, focused on local needs and contexts. This approach prioritizes community needs over market demands.",
        },
        {
          id: "why-peripheral-matters",
          heading: "Why Peripheral Technology Matters",
          level: 2,
          content:
            "Enables more diverse and contextually appropriate technological solutions. Peripheral technology often addresses needs that mainstream technology overlooks or cannot serve effectively.",
        },
        {
          id: "how-to-develop",
          heading: "How to Develop Peripheral Technology",
          level: 2,
          content:
            "Through community-driven innovation and adaptation of existing technologies. This involves working directly with communities to understand their specific needs and constraints.",
        },
      ],
      furtherReading: [
        {
          title: "Innovation from the Margins",
          url: "https://peripheral-tech.org",
          description: "Alternative technology development",
          type: "organization",
        },
        {
          title: "Local Technology Networks",
          url: "https://local-tech.edu",
          description: "Community-based innovation systems",
          type: "academic",
        },
      ],
    },
  },

  "speculative-computing": {
    slug: "speculative-computing",
    term: "Speculative Computing",
    shortDefinition:
      "Experimental approaches to computation that prioritize cultural exploration over traditional efficiency metrics.",
    fullDefinition: `Speculative computing involves experimental approaches to computation that prioritize cultural exploration over traditional efficiency metrics, expanding our understanding of computational possibilities beyond utilitarian applications.`,
    etymology: "Emerging from critical design and experimental computing practices",
    examples: [
      "Artistic programming languages designed for expression",
      "Alternative interfaces that challenge conventional interaction",
      "Computational systems designed for ritual or ceremony",
    ],
    relatedTerms: ["creative-computation", "machine-intelligence", "computational-thinking"],
    tags: ["experimental-computing", "critical-design", "alternative-interfaces"],
    seo: {
      title: "Speculative Computing: Experimental Computational Approaches",
      description:
        "Explore speculative computing: experimental approaches prioritizing cultural exploration over traditional computing efficiency.",
      keywords: [
        "speculative computing",
        "experimental computing",
        "alternative interfaces",
        "critical computing",
        "creative coding",
      ],
    },
    dateModified: "2024-03-19",
    content: {
      sections: [
        {
          id: "what-is-speculative-computing",
          heading: "What is Speculative Computing?",
          level: 2,
          content:
            "Experimental approaches to computation that prioritize cultural exploration over traditional efficiency metrics. This field questions fundamental assumptions about what computation should be and do.",
        },
        {
          id: "why-speculate-with-computing",
          heading: "Why Speculate with Computing?",
          level: 2,
          content:
            "Expands our understanding of computational possibilities beyond utilitarian applications. Speculative computing opens space for alternative relationships between humans and computational systems.",
        },
        {
          id: "how-to-practice",
          heading: "How to Practice Speculative Computing",
          level: 2,
          content:
            "Through development of unconventional software systems and computational approaches. This often involves creating systems that prioritize experience, meaning, or cultural value over performance optimization.",
        },
      ],
      furtherReading: [
        {
          title: "Critical Code Studies",
          url: "https://critical-computing.org",
          description: "Alternative approaches to computation",
          type: "academic",
        },
        {
          title: "Experimental Digital Systems",
          url: "https://speculative-systems.edu",
          description: "Non-traditional computing paradigms",
          type: "journal",
        },
      ],
    },
  },

  "computational-thinking": {
    slug: "computational-thinking",
    term: "Computational Thinking",
    shortDefinition: "Application of computer science principles to general problem-solving approaches.",
    fullDefinition: `Computational thinking involves the application of computer science principles to general problem-solving approaches, enabling more structured approaches to complex problem-solving across disciplines.`,
    etymology: "Popularized by Jeannette Wing in 2006, building on earlier computer science education concepts",
    examples: [
      "Breaking complex problems into smaller, manageable parts",
      "Pattern recognition in data analysis and design",
      "Algorithm development for process optimization",
    ],
    relatedTerms: ["creative-computation", "machine-intelligence", "pattern-language"],
    tags: ["problem-solving", "computation", "methodology"],
    seo: {
      title: "Computational Thinking: Problem-Solving with Computer Science Principles",
      description:
        "Learn computational thinking: applying computer science principles to structured problem-solving across disciplines.",
      keywords: [
        "computational thinking",
        "problem solving",
        "computer science",
        "algorithmic thinking",
        "systematic analysis",
      ],
    },
    dateModified: "2024-03-19",
    content: {
      sections: [
        {
          id: "what-is-computational-thinking",
          heading: "What is Computational Thinking?",
          level: 2,
          content:
            "Application of computer science principles to general problem-solving approaches. Computational thinking provides systematic methods for approaching complex challenges across any domain.",
        },
        {
          id: "why-think-computationally",
          heading: "Why Think Computationally?",
          level: 2,
          content:
            "Enables more structured approaches to complex problem-solving across disciplines. Computational thinking provides tools for managing complexity and finding systematic solutions.",
        },
        {
          id: "how-to-think-computationally",
          heading: "How to Think Computationally",
          level: 2,
          content:
            "Through systematic decomposition of problems and recognition of computational patterns. This involves breaking problems into smaller parts, identifying patterns, and developing step-by-step solutions.",
        },
      ],
      furtherReading: [
        {
          title: "Computational Thinking Principles",
          url: "https://comp-thinking.org",
          description: "Foundations of computational problem solving",
          type: "organization",
        },
        {
          title: "Thinking Like a Computer Scientist",
          url: "https://computational-methods.edu",
          description: "Structured problem-solving approaches",
          type: "academic",
        },
      ],
    },
  },

  "machine-intelligence": {
    slug: "machine-intelligence",
    term: "Machine Intelligence",
    shortDefinition:
      "Systems capable of learning and adapting through exposure to data rather than explicit programming.",
    fullDefinition: `Machine intelligence encompasses systems capable of learning and adapting through exposure to data rather than explicit programming, enabling more flexible and nuanced approaches to complex computational challenges.`,
    etymology: "Preferred term among some researchers to distinguish from 'artificial intelligence'",
    examples: [
      "Neural networks learning from large datasets",
      "Adaptive algorithms that improve through use",
      "Pattern recognition systems that evolve over time",
    ],
    relatedTerms: ["computational-thinking", "cyberphysical-systems", "planetary-computation"],
    tags: ["artificial-intelligence", "machine-learning", "adaptive-systems"],
    seo: {
      title: "Machine Intelligence: Adaptive Learning Systems",
      description:
        "Understand machine intelligence: systems capable of learning and adapting through data exposure rather than explicit programming.",
      keywords: [
        "machine intelligence",
        "machine learning",
        "artificial intelligence",
        "adaptive systems",
        "neural networks",
      ],
    },
    dateModified: "2024-03-19",
    content: {
      sections: [
        {
          id: "what-is-machine-intelligence",
          heading: "What is Machine Intelligence?",
          level: 2,
          content:
            "Systems capable of learning and adapting through exposure to data rather than explicit programming. Machine intelligence represents a shift from rule-based to learning-based computational approaches.",
        },
        {
          id: "why-machine-intelligence",
          heading: "Why Machine Intelligence?",
          level: 2,
          content:
            "Enables more flexible and nuanced approaches to complex computational challenges. Machine intelligence can handle ambiguous, incomplete, or changing data in ways that traditional programming cannot.",
        },
        {
          id: "how-machine-intelligence-works",
          heading: "How Machine Intelligence Works",
          level: 2,
          content:
            "Through implementation of learning algorithms and neural network architectures. These systems use statistical methods to identify patterns in data and make predictions or decisions based on learned patterns.",
        },
      ],
      furtherReading: [
        {
          title: "Machine Learning Foundations",
          url: "https://ml-principles.org",
          description: "Core concepts in machine intelligence",
          type: "academic",
        },
        {
          title: "Artificial Intelligence and Society",
          url: "https://ai-impact.edu",
          description: "Social implications of machine intelligence",
          type: "journal",
        },
      ],
    },
  },

  "circular-economy": {
    slug: "circular-economy",
    term: "Circular Economy",
    shortDefinition: "Economic systems designed to eliminate waste through continuous resource cycling.",
    fullDefinition: `Circular economy represents economic systems designed to eliminate waste through continuous resource cycling, enabling more sustainable economic activity through elimination of waste and continuous resource reuse.`,
    etymology: "Developed from industrial ecology and cradle-to-cradle design principles",
    examples: [
      "Product design for disassembly and material recovery",
      "Industrial symbiosis where waste from one process feeds another",
      "Service-based business models that retain product ownership",
    ],
    relatedTerms: ["regenerative-futures", "ecological-intelligence", "spolia"],
    tags: ["sustainability", "economics", "resource-management"],
    seo: {
      title: "Circular Economy: Eliminating Waste Through Resource Cycling",
      description:
        "Learn about circular economy: economic systems designed to eliminate waste through continuous resource cycling and reuse.",
      keywords: [
        "circular economy",
        "sustainable economics",
        "waste elimination",
        "resource cycling",
        "cradle to cradle",
      ],
    },
    dateModified: "2024-03-19",
    content: {
      sections: [
        {
          id: "what-is-circular-economy",
          heading: "What is a Circular Economy?",
          level: 2,
          content:
            "Economic systems designed to eliminate waste through continuous resource cycling. Unlike linear 'take-make-dispose' models, circular economies keep resources in use for as long as possible.",
        },
        {
          id: "why-circular-economics",
          heading: "Why Circular Economics?",
          level: 2,
          content:
            "Enables more sustainable economic activity through elimination of waste and continuous resource reuse. Circular models reduce environmental impact while often creating new economic opportunities.",
        },
        {
          id: "how-to-implement",
          heading: "How to Implement Circular Economy Principles",
          level: 2,
          content:
            "Through design of products and systems that enable multiple use cycles and resource recovery. This requires rethinking product design, business models, and infrastructure systems. The practice of [spolia](#spolia) represents an early form of circular economy thinking.",
        },
      ],
      furtherReading: [
        {
          title: "Circular Economy Principles",
          url: "https://circular-economy.org",
          description: "Fundamentals of circular system design",
          type: "organization",
        },
        {
          title: "Waste to Resource",
          url: "https://circular-systems.edu",
          description: "Implementing circular economic principles",
          type: "academic",
        },
      ],
    },
  },

  "design-research": {
    slug: "design-research",
    term: "Design Research",
    shortDefinition:
      "Systematic investigation methods used to understand user needs, contexts, and behaviors to inform design decisions.",
    fullDefinition: `Design research encompasses systematic investigation methods used to understand user needs, contexts, and behaviors to inform design decisions, bridging the gap between academic research methodologies and practical design applications.`,
    etymology: "Emerged from the convergence of social science research methods with design practice in the 1960s",
    examples: [
      "Ethnographic studies of user behavior in natural settings",
      "Participatory design workshops with community stakeholders",
      "Usability testing to evaluate interface effectiveness",
      "Cultural probes to understand user experiences and values",
    ],
    relatedTerms: ["living-lab", "human-scale-craft", "pattern-language"],
    tags: ["research-methodology", "user-experience", "design-process"],
    seo: {
      title: "Design Research: Understanding Users Through Systematic Investigation",
      description:
        "Explore design research: systematic investigation methods for understanding user needs, contexts, and behaviors to inform design decisions.",
      keywords: [
        "design research",
        "user research",
        "ethnographic research",
        "participatory design",
        "design methodology",
      ],
    },
    dateModified: "2024-03-19",
    content: {
      tableOfContents: [
        { id: "foundations", title: "Foundations of Design Research", level: 2 },
        { id: "ethnographic-methods", title: "Ethnographic Methods", level: 3 },
        { id: "participatory-approaches", title: "Participatory Approaches", level: 3 },
        { id: "research-applications", title: "Research Applications", level: 2 },
        { id: "digital-contexts", title: "Digital Contexts", level: 3 },
        { id: "social-innovation", title: "Social Innovation", level: 3 },
        { id: "ethical-considerations", title: "Ethical Considerations", level: 2 },
      ],
      sections: [
        {
          id: "foundations",
          heading: "Foundations of Design Research",
          level: 2,
          content: `Design research emerged from the recognition that effective design requires deep understanding of user contexts, needs, and behaviors. Unlike traditional market research, design research focuses on understanding the qualitative aspects of human experience that inform design decisions.

The field draws from multiple disciplines including anthropology, sociology, psychology, and human-computer interaction, creating hybrid methodologies specifically suited to design challenges.`,
          subsections: [
            {
              id: "ethnographic-methods",
              heading: "Ethnographic Methods",
              level: 3,
              content: `Ethnographic approaches involve immersive observation and participation in user environments. These methods reveal insights that surveys or interviews might miss, uncovering tacit knowledge and unconscious behaviors that significantly impact design requirements.

Key ethnographic techniques include:
- **Participant observation**: Researchers engage directly in user activities
- **Contextual interviews**: Conversations conducted in natural use environments  
- **Cultural mapping**: Documentation of social and cultural factors affecting design
- **Artifact analysis**: Study of objects and tools users currently employ`,
            },
            {
              id: "participatory-approaches",
              heading: "Participatory Approaches",
              level: 3,
              content: `Participatory design methods involve users as active collaborators rather than passive subjects. These approaches recognize users as experts in their own experiences and leverage their knowledge to co-create solutions.

This methodology aligns with [living-lab](#living-lab) principles, creating ongoing partnerships between researchers, designers, and communities.`,
            },
          ],
        },
        {
          id: "research-applications",
          heading: "Research Applications",
          level: 2,
          content: `Design research applications span from product development to service design, urban planning, and policy development. The methods adapt to different scales and contexts while maintaining focus on human-centered insights.`,
          subsections: [
            {
              id: "digital-contexts",
              heading: "Digital Contexts",
              level: 3,
              content: `In digital design, research methods evolve to address virtual interactions, distributed communities, and technology-mediated experiences. This includes studying how people interact with [cyberphysical-systems](#cyberphysical-systems) and developing methods for researching emerging technologies.`,
            },
            {
              id: "social-innovation",
              heading: "Social Innovation",
              level: 3,
              content: `Design research increasingly addresses complex social challenges, working with communities to understand systemic issues and co-develop solutions. This application connects to [regenerative-futures](#regenerative-futures) thinking by focusing on positive social and environmental impact.`,
            },
          ],
        },
        {
          id: "ethical-considerations",
          heading: "Ethical Considerations",
          level: 2,
          content: `Design research involves significant ethical responsibilities, particularly when working with vulnerable populations or addressing sensitive topics. Researchers must balance the need for insights with respect for participant privacy, agency, and wellbeing.

Key ethical principles include informed consent, data protection, reciprocal benefit, and ongoing participant involvement in how research findings are used.`,
        },
      ],
      furtherReading: [
        {
          title: "Design Research Methods and Perspectives",
          url: "https://design-research.org/methods",
          description: "Comprehensive guide to design research methodologies",
          type: "book",
        },
        {
          title: "Participatory Design: Principles and Practices",
          url: "https://participatory-design.org",
          description: "Community-centered design research approaches",
          type: "academic",
        },
      ],
    },
  },

  "spatial-interfaces": {
    slug: "spatial-interfaces",
    term: "Spatial Interfaces",
    shortDefinition:
      "Interactive systems that utilize three-dimensional space and natural human movement for digital interaction.",
    fullDefinition: `Spatial interfaces are interactive systems that utilize three-dimensional space and natural human movement for digital interaction, moving beyond traditional screen-based computing to create more intuitive and embodied user experiences.`,
    etymology: "Emerging from virtual reality, augmented reality, and tangible interaction research",
    examples: [
      "Gesture-based controls for virtual and augmented reality",
      "Tangible user interfaces using physical objects",
      "Environmental computing integrated into architectural spaces",
      "Mixed reality systems blending digital and physical interaction",
    ],
    relatedTerms: ["cyberphysical-systems", "biophilic-design", "human-scale-craft"],
    tags: ["interaction-design", "spatial-computing", "user-experience", "embodied-interaction"],
    seo: {
      title: "Spatial Interfaces: Beyond Screen-Based Computing",
      description:
        "Discover spatial interfaces: interactive systems using three-dimensional space and natural movement for intuitive digital interaction.",
      keywords: [
        "spatial interfaces",
        "spatial computing",
        "gesture interfaces",
        "tangible interaction",
        "embodied computing",
      ],
    },
    dateModified: "2024-03-19",
    content: {
      tableOfContents: [
        { id: "beyond-screens", title: "Beyond Screen-Based Computing", level: 2 },
        { id: "embodied-interaction", title: "Embodied Interaction", level: 3 },
        { id: "spatial-computing", title: "Spatial Computing", level: 3 },
        { id: "design-principles", title: "Design Principles", level: 2 },
        { id: "current-applications", title: "Current Applications", level: 2 },
        { id: "future-directions", title: "Future Directions", level: 2 },
      ],
      sections: [
        {
          id: "beyond-screens",
          heading: "Beyond Screen-Based Computing",
          level: 2,
          content: `Spatial interfaces represent a fundamental shift from traditional screen-based computing toward more natural, embodied forms of digital interaction. These systems recognize that human spatial intelligence and movement patterns offer rich opportunities for intuitive interface design.

Rather than forcing users to adapt to computational constraints, spatial interfaces adapt computational capabilities to human spatial and kinesthetic abilities.`,
          subsections: [
            {
              id: "embodied-interaction",
              heading: "Embodied Interaction",
              level: 3,
              content: `Embodied interaction design recognizes that cognition and interaction are fundamentally physical processes. Users understand and navigate digital systems through bodily experience, spatial memory, and kinesthetic learning.

This approach draws from phenomenology and cognitive science, understanding that effective interfaces should align with human embodied cognition rather than abstract computational models.`,
            },
            {
              id: "spatial-computing",
              heading: "Spatial Computing",
              level: 3,
              content: `Spatial computing infrastructure enables the technical implementation of spatial interfaces through real-time environmental sensing, 3D tracking, and responsive digital overlays. This technology foundation supports [cyberphysical-systems](#cyberphysical-systems) that can understand and respond to human movement and intention.`,
            },
          ],
        },
        {
          id: "design-principles",
          heading: "Design Principles",
          level: 2,
          content: `Effective spatial interface design requires understanding both human spatial cognition and technical capabilities. Key principles include leveraging natural gestures, providing clear spatial feedback, maintaining consistency between physical and digital interactions, and respecting human scale and movement patterns.

These principles often align with [biophilic-design](#biophilic-design) thinking, creating interfaces that feel natural and intuitive rather than artificial or imposed.`,
        },
        {
          id: "current-applications",
          heading: "Current Applications",
          level: 2,
          content: `Contemporary spatial interfaces appear in virtual and augmented reality systems, interactive installations, smart environments, and tangible computing applications. These implementations demonstrate the potential for more natural human-computer interaction across various contexts and scales.`,
        },
        {
          id: "future-directions",
          heading: "Future Directions",
          level: 2,
          content: `Future spatial interfaces may integrate more seamlessly with built environments, creating ambient computing experiences that respond to human presence and activity without explicit interaction. This vision connects to concepts of [technological-ecology](#technological-ecology) where technology becomes an integrated part of environmental systems.`,
        },
      ],
      furtherReading: [
        {
          title: "Where the Action Is: The Foundations of Embodied Interaction",
          url: "https://embodied-interaction.org/foundations",
          description: "Paul Dourish's seminal work on embodied interaction design",
          type: "book",
        },
        {
          title: "Spatial Computing: The Next Platform",
          url: "https://spatial-computing.org",
          description: "Technical and design principles for spatial computing systems",
          type: "organization",
        },
      ],
    },
  },

  "more-than-human": {
    slug: "more-than-human",
    term: "More-than-Human",
    shortDefinition:
      "Design and research approaches that consider non-human actors as active participants in technological and social systems.",
    fullDefinition: `More-than-human approaches encompass design and research methodologies that consider non-human actors—including animals, plants, ecosystems, and technological systems—as active participants in technological and social systems rather than passive resources or environments.`,
    etymology: "Developed from posthumanist theory and multispecies studies in the 2000s",
    examples: [
      "Design projects that account for animal navigation patterns",
      "Urban planning that integrates plant and ecosystem needs",
      "Technology systems that respond to environmental conditions",
      "Collaborative projects between humans and AI systems",
    ],
    relatedTerms: ["ecological-intelligence", "biophilic-design", "technological-ecology"],
    tags: ["posthumanism", "multispecies-design", "environmental-design", "systems-thinking"],
    seo: {
      title: "More-than-Human Design: Beyond Anthropocentric Approaches",
      description:
        "Explore more-than-human design: considering non-human actors as active participants in technological and social systems.",
      keywords: [
        "more than human",
        "posthuman design",
        "multispecies design",
        "environmental design",
        "non-anthropocentric",
      ],
    },
    dateModified: "2024-03-19",
    content: {
      tableOfContents: [
        { id: "beyond-anthropocentrism", title: "Beyond Anthropocentrism", level: 2 },
        { id: "multispecies-thinking", title: "Multispecies Thinking", level: 3 },
        { id: "technological-agency", title: "Technological Agency", level: 3 },
        { id: "design-implications", title: "Design Implications", level: 2 },
        { id: "environmental-collaboration", title: "Environmental Collaboration", level: 3 },
        { id: "interspecies-interfaces", title: "Interspecies Interfaces", level: 3 },
        { id: "ethical-frameworks", title: "Ethical Frameworks", level: 2 },
      ],
      sections: [
        {
          id: "beyond-anthropocentrism",
          heading: "Beyond Anthropocentrism",
          level: 2,
          content: `More-than-human approaches challenge traditional human-centered design by recognizing the agency and needs of non-human actors. This perspective acknowledges that effective design must consider the complex networks of relationships between humans, other species, and technological systems.

This shift requires fundamental changes in how we conceptualize users, stakeholders, and design outcomes.`,
          subsections: [
            {
              id: "multispecies-thinking",
              heading: "Multispecies Thinking",
              level: 3,
              content: `Multispecies design considers the needs and behaviors of multiple species simultaneously. Urban design projects might account for bird migration patterns, pollinator pathways, and human pedestrian flows as equally important design constraints.

This approach often reveals unexpected design opportunities and solutions that benefit multiple species while creating more resilient and sustainable systems.`,
            },
            {
              id: "technological-agency",
              heading: "Technological Agency",
              level: 3,
              content: `More-than-human thinking also recognizes that technological systems can exhibit forms of agency, particularly in [machine-intelligence](#machine-intelligence) and [cyberphysical-systems](#cyberphysical-systems). This perspective influences how we design human-technology relationships and system governance.`,
            },
          ],
        },
        {
          id: "design-implications",
          heading: "Design Implications",
          level: 2,
          content: `More-than-human design requires new methodologies, evaluation criteria, and success metrics that account for non-human needs and agency. This often involves interdisciplinary collaboration with ecologists, animal behaviorists, and environmental scientists.`,
          subsections: [
            {
              id: "environmental-collaboration",
              heading: "Environmental Collaboration",
              level: 3,
              content: `Environmental collaboration involves designing systems that work with rather than against natural processes. This might include architecture that provides habitat for wildlife, infrastructure that supports ecosystem services, or technology that enhances rather than disrupts natural cycles.

Such approaches align closely with [ecological-intelligence](#ecological-intelligence) and [regenerative-futures](#regenerative-futures) thinking.`,
            },
            {
              id: "interspecies-interfaces",
              heading: "Interspecies Interfaces",
              level: 3,
              content: `Some more-than-human design projects explicitly create interfaces between species, such as systems that allow humans to understand animal communication patterns or technology that enables interspecies collaboration in environmental monitoring.`,
            },
          ],
        },
        {
          id: "ethical-frameworks",
          heading: "Ethical Frameworks",
          level: 2,
          content: `More-than-human design raises complex ethical questions about representation, consent, and benefit distribution across species. How do we design for beings who cannot directly participate in the design process? How do we balance competing needs and interests?

These considerations require developing new ethical frameworks that extend beyond traditional human-centered approaches to include broader ecological and technological considerations.`,
        },
      ],
      furtherReading: [
        {
          title: "Staying with the Trouble: Making Kin in the Chthulucene",
          url: "https://multispecies-studies.org/haraway",
          description: "Donna Haraway's work on multispecies relationships and design",
          type: "book",
        },
        {
          title: "More-than-Human Design",
          url: "https://posthuman-design.org",
          description: "Practical approaches to non-anthropocentric design",
          type: "journal",
        },
      ],
    },
  },

  "ubiquitous-computing": {
    slug: "ubiquitous-computing",
    term: "Ubiquitous Computing",
    shortDefinition:
      "Computing paradigm where computational capabilities are embedded invisibly throughout everyday environments and objects.",
    fullDefinition: `Ubiquitous computing represents a computing paradigm where computational capabilities are embedded invisibly throughout everyday environments and objects, creating seamless integration between digital and physical worlds without requiring explicit user attention to the technology itself.`,
    etymology: "Coined by Mark Weiser at Xerox PARC in 1988, also known as 'pervasive computing'",
    examples: [
      "Smart home systems that adjust automatically to occupant preferences",
      "Wearable devices that monitor health without conscious interaction",
      "Environmental sensors embedded in urban infrastructure",
      "Interactive textiles that respond to touch and movement",
    ],
    relatedTerms: ["cyberphysical-systems", "spatial-interfaces", "technological-ecology"],
    tags: ["pervasive-computing", "ambient-technology", "invisible-interfaces"],
    seo: {
      title: "Ubiquitous Computing: Invisible Technology Integration",
      description:
        "Learn about ubiquitous computing: embedding computational capabilities invisibly throughout everyday environments and objects.",
      keywords: [
        "ubiquitous computing",
        "pervasive computing",
        "ambient computing",
        "invisible interfaces",
        "embedded systems",
      ],
    },
    dateModified: "2024-03-19",
    content: {
      tableOfContents: [
        { id: "invisible-computing", title: "Invisible Computing", level: 2 },
        { id: "ambient-intelligence", title: "Ambient Intelligence", level: 3 },
        { id: "seamless-integration", title: "Seamless Integration", level: 3 },
        { id: "design-challenges", title: "Design Challenges", level: 2 },
        { id: "privacy-concerns", title: "Privacy and Agency", level: 3 },
        { id: "technical-complexity", title: "Technical Complexity", level: 3 },
        { id: "contemporary-reality", title: "Contemporary Reality", level: 2 },
      ],
      sections: [
        {
          id: "invisible-computing",
          heading: "Invisible Computing",
          level: 2,
          content: `Mark Weiser's vision of ubiquitous computing imagined technology that would disappear into the background of everyday life, providing computational capabilities without demanding conscious attention. This represents a fundamental shift from desktop computing toward ambient, environmental computing.

The goal is technology that enhances human capabilities and environments without creating additional cognitive load or interface complexity.`,
          subsections: [
            {
              id: "ambient-intelligence",
              heading: "Ambient Intelligence",
              level: 3,
              content: `Ambient intelligence involves computational systems that can sense, understand, and respond to human activities and environmental conditions without explicit commands. These systems learn user patterns and preferences, adapting automatically to provide appropriate responses.

This capability requires sophisticated [machine-intelligence](#machine-intelligence) combined with extensive sensor networks and contextual understanding.`,
            },
            {
              id: "seamless-integration",
              heading: "Seamless Integration",
              level: 3,
              content: `True ubiquitous computing integration means technology becomes part of the environment rather than an addition to it. This vision aligns with [technological-ecology](#technological-ecology) principles, where technology and environment form integrated systems.`,
            },
          ],
        },
        {
          id: "design-challenges",
          heading: "Design Challenges",
          level: 2,
          content: `Implementing ubiquitous computing presents significant design challenges around privacy, agency, reliability, and user understanding. How do users maintain control over systems they cannot directly see or manipulate?`,
          subsections: [
            {
              id: "privacy-concerns",
              heading: "Privacy and Agency",
              level: 3,
              content: `Ubiquitous computing systems often involve continuous data collection and environmental monitoring, raising significant privacy concerns. Users must maintain agency and understanding over systems that operate largely outside conscious awareness.

Design approaches must balance convenience with transparency, providing appropriate user control and understanding without undermining the seamless experience that defines ubiquitous computing.`,
            },
            {
              id: "technical-complexity",
              heading: "Technical Complexity",
              level: 3,
              content: `Creating truly seamless ubiquitous computing requires sophisticated integration of sensors, networking, processing, and actuation capabilities. The technical infrastructure must be robust enough to operate continuously while remaining invisible to users.`,
            },
          ],
        },
        {
          id: "contemporary-reality",
          heading: "Contemporary Reality",
          level: 2,
          content: `Today's smart homes, wearable devices, and IoT systems represent early implementations of ubiquitous computing vision. While not yet achieving Weiser's full vision of invisible integration, these systems demonstrate both the potential and challenges of pervasive computing.

Contemporary implementations often struggle with interoperability, user control, and the balance between automation and agency that Weiser's original vision anticipated.`,
        },
      ],
      furtherReading: [
        {
          title: "The Computer for the 21st Century",
          url: "https://ubiquitous-computing.org/weiser-original",
          description: "Mark Weiser's foundational paper on ubiquitous computing",
          type: "academic",
        },
        {
          title: "Ambient Intelligence: The Evolution of Technology",
          url: "https://ambient-intelligence.org",
          description: "Contemporary developments in pervasive computing",
          type: "journal",
        },
      ],
    },
  },

  "artisanal-technology": {
    slug: "artisanal-technology",
    term: "Artisanal Technology",
    shortDefinition:
      "Small-scale, craft-based approaches to technology development that prioritize quality, customization, and human agency.",
    fullDefinition: `Artisanal technology encompasses small-scale, craft-based approaches to technology development that prioritize quality, customization, and human agency over mass production and standardization, creating technology that reflects human values and local contexts.`,
    etymology: "Emerging from the intersection of traditional craft practices with contemporary technology development",
    examples: [
      "Hand-built electronics and custom circuit design",
      "Locally-manufactured tools designed for specific communities",
      "Open-source hardware projects emphasizing repairability",
      "Custom software solutions crafted for individual users or small groups",
    ],
    relatedTerms: ["human-scale-craft", "peripheral-technology", "design-research"],
    tags: ["craft-technology", "small-scale-manufacturing", "custom-solutions", "human-centered"],
    seo: {
      title: "Artisanal Technology: Craft-Based Tech Development",
      description:
        "Discover artisanal technology: small-scale, craft-based approaches prioritizing quality, customization, and human agency in tech development.",
      keywords: [
        "artisanal technology",
        "craft technology",
        "small scale manufacturing",
        "custom electronics",
        "handmade technology",
      ],
    },
    dateModified: "2024-03-19",
    content: {
      tableOfContents: [
        { id: "craft-meets-technology", title: "Craft Meets Technology", level: 2 },
        { id: "quality-over-quantity", title: "Quality Over Quantity", level: 3 },
        { id: "local-production", title: "Local Production", level: 3 },
        { id: "design-philosophy", title: "Design Philosophy", level: 2 },
        { id: "practical-applications", title: "Practical Applications", level: 2 },
        { id: "economic-implications", title: "Economic Implications", level: 2 },
      ],
      sections: [
        {
          id: "craft-meets-technology",
          heading: "Craft Meets Technology",
          level: 2,
          content: `Artisanal technology applies traditional craft values—quality, customization, human skill, and local knowledge—to contemporary technology development. This approach challenges mass production models by emphasizing individual attention, custom solutions, and deep understanding of user needs.

The movement draws inspiration from traditional craft guilds while leveraging contemporary tools like 3D printing, open-source hardware, and digital fabrication.`,
          subsections: [
            {
              id: "quality-over-quantity",
              heading: "Quality Over Quantity",
              level: 3,
              content: `Artisanal technology prioritizes creating fewer, better things rather than optimizing for volume or cost efficiency. This approach often results in more durable, repairable, and personally meaningful technology objects.

The focus on quality extends beyond physical construction to include user experience, aesthetic consideration, and long-term value rather than planned obsolescence.`,
            },
            {
              id: "local-production",
              heading: "Local Production",
              level: 3,
              content: `Local production enables customization for specific contexts, needs, and preferences while reducing transportation impacts and supporting local economies. This approach aligns with [peripheral-technology](#peripheral-technology) principles of community-centered innovation.`,
            },
          ],
        },
        {
          id: "design-philosophy",
          heading: "Design Philosophy",
          level: 2,
          content: `Artisanal technology embodies values of transparency, repairability, and user agency. Unlike black-box consumer technology, artisanal approaches often make their construction and operation visible and understandable to users.

This philosophy connects to [human-scale-craft](#human-scale-craft) principles, maintaining human understanding and control over technological systems.`,
        },
        {
          id: "practical-applications",
          heading: "Practical Applications",
          level: 2,
          content: `Contemporary artisanal technology appears in maker spaces, fab labs, and small-scale manufacturing operations. These applications demonstrate alternative models for technology development that prioritize human values over purely economic optimization.`,
        },
        {
          id: "economic-implications",
          heading: "Economic Implications",
          level: 2,
          content: `Artisanal technology suggests alternative economic models that value craftsmanship, customization, and local production over mass efficiency. These approaches often support [circular-economy](#circular-economy) principles through emphasis on durability, repairability, and local resource utilization.`,
        },
      ],
      furtherReading: [
        {
          title: "The Craftsman",
          url: "https://craft-studies.org/sennett",
          description: "Richard Sennett's exploration of craftsmanship in contemporary society",
          type: "book",
        },
        {
          title: "Artisanal Electronics: DIY Culture and Technology",
          url: "https://artisanal-tech.org",
          description: "Contemporary craft approaches to technology development",
          type: "website",
        },
      ],
    },
  },

  "design-intelligence": {
    slug: "design-intelligence",
    term: "Design Intelligence",
    shortDefinition:
      "The application of systematic thinking and research methods to understand and solve complex design challenges.",
    fullDefinition: `Design intelligence represents the application of systematic thinking and research methods to understand and solve complex design challenges, combining analytical rigor with creative problem-solving to address multifaceted design problems.`,
    etymology: "Developed from design thinking methodologies and intelligence studies",
    examples: [
      "Systems thinking applied to service design challenges",
      "Data-driven approaches to understanding user behavior patterns",
      "Strategic design research for organizational transformation",
      "Evidence-based design decisions in urban planning",
    ],
    relatedTerms: ["design-research", "computational-thinking", "pattern-language"],
    tags: ["design-methodology", "strategic-design", "systems-thinking", "research-driven"],
    seo: {
      title: "Design Intelligence: Systematic Approaches to Complex Design",
      description:
        "Understand design intelligence: applying systematic thinking and research methods to solve complex design challenges effectively.",
      keywords: [
        "design intelligence",
        "design thinking",
        "systematic design",
        "strategic design",
        "design methodology",
      ],
    },
    dateModified: "2024-03-19",
    content: {
      tableOfContents: [
        { id: "systematic-design", title: "Systematic Design Approaches", level: 2 },
        { id: "research-integration", title: "Research Integration", level: 3 },
        { id: "analytical-creativity", title: "Analytical Creativity", level: 3 },
        { id: "application-domains", title: "Application Domains", level: 2 },
        { id: "service-design", title: "Service Design", level: 3 },
        { id: "organizational-design", title: "Organizational Design", level: 3 },
        { id: "measurement-evaluation", title: "Measurement and Evaluation", level: 2 },
      ],
      sections: [
        {
          id: "systematic-design",
          heading: "Systematic Design Approaches",
          level: 2,
          content: `Design intelligence involves applying systematic, research-based approaches to design challenges rather than relying solely on intuition or aesthetic judgment. This approach combines creative problem-solving with analytical rigor to address complex, multifaceted design problems.

The methodology draws from various fields including systems thinking, behavioral science, and strategic planning to create more effective and evidence-based design solutions.`,
          subsections: [
            {
              id: "research-integration",
              heading: "Research Integration",
              level: 3,
              content: `Design intelligence integrates [design-research](#design-research) methods throughout the design process, using data and insights to inform decisions at every stage. This includes user research, market analysis, technical feasibility studies, and impact assessment.

The approach ensures that design decisions are grounded in evidence rather than assumption, leading to more effective and appropriate solutions.`,
            },
            {
              id: "analytical-creativity",
              heading: "Analytical Creativity",
              level: 3,
              content: `Design intelligence balances analytical thinking with creative exploration, using systematic methods to generate and evaluate creative solutions. This involves [computational-thinking](#computational-thinking) approaches applied to design challenges, breaking complex problems into manageable components.`,
            },
          ],
        },
        {
          id: "application-domains",
          heading: "Application Domains",
          level: 2,
          content: `Design intelligence applies across various design domains, from product and service design to organizational and policy design. Each application requires adapting the methodology to specific contexts and constraints.`,
          subsections: [
            {
              id: "service-design",
              heading: "Service Design",
              level: 3,
              content: `In service design, design intelligence involves mapping complex stakeholder relationships, understanding user journeys across multiple touchpoints, and designing interventions that improve overall system performance rather than optimizing individual components.`,
            },
            {
              id: "organizational-design",
              heading: "Organizational Design",
              level: 3,
              content: `Organizational applications of design intelligence involve understanding institutional cultures, workflow patterns, and communication structures to design more effective organizational systems and processes.`,
            },
          ],
        },
        {
          id: "measurement-evaluation",
          heading: "Measurement and Evaluation",
          level: 2,
          content: `Design intelligence emphasizes measuring and evaluating design outcomes against stated objectives and user needs. This involves developing appropriate metrics, conducting post-implementation research, and iterating based on evidence of actual performance rather than assumed success.`,
        },
      ],
      furtherReading: [
        {
          title: "Design Intelligence: Advanced Design Research Methods",
          url: "https://design-intelligence.org/methods",
          description: "Comprehensive approaches to research-driven design",
          type: "academic",
        },
        {
          title: "Strategic Design: Research and Practice",
          url: "https://strategic-design.org",
          description: "Applying design intelligence to organizational challenges",
          type: "journal",
        },
      ],
    },
  },

  "material-intelligence": {
    slug: "material-intelligence",
    term: "Material Intelligence",
    shortDefinition:
      "Understanding materials as active agents in design processes, with inherent properties that inform and constrain design possibilities.",
    fullDefinition: `Material intelligence involves understanding materials as active agents in design processes, with inherent properties that inform and constrain design possibilities, moving beyond treating materials as passive substrates to recognizing their agency in shaping design outcomes.`,
    etymology: "Emerging from materials science, critical design theory, and new materialism philosophy",
    examples: [
      "Bio-responsive materials that change properties based on environmental conditions",
      "Smart materials with embedded sensing and actuation capabilities",
      "Traditional materials used in innovative ways based on deep material knowledge",
      "Computational materials that can process information",
    ],
    relatedTerms: ["ecological-intelligence", "artisanal-technology", "biophilic-design"],
    tags: ["materials-science", "smart-materials", "material-agency", "responsive-materials"],
    seo: {
      title: "Material Intelligence: Materials as Active Design Agents",
      description:
        "Explore material intelligence: understanding materials as active agents with inherent properties that shape design possibilities.",
      keywords: [
        "material intelligence",
        "smart materials",
        "responsive materials",
        "material agency",
        "bio-materials",
      ],
    },
    dateModified: "2024-03-19",
    content: {
      tableOfContents: [
        { id: "material-agency", title: "Material Agency", level: 2 },
        { id: "responsive-properties", title: "Responsive Properties", level: 3 },
        { id: "computational-materials", title: "Computational Materials", level: 3 },
        { id: "design-collaboration", title: "Design Collaboration", level: 2 },
        { id: "sustainable-materials", title: "Sustainable Material Intelligence", level: 2 },
        { id: "future-materials", title: "Future Material Systems", level: 2 },
      ],
      sections: [
        {
          id: "material-agency",
          heading: "Material Agency",
          level: 2,
          content: `Material intelligence recognizes that materials are not passive substrates waiting to be shaped by human intention, but active agents with inherent properties, behaviors, and constraints that fundamentally influence design outcomes.

This perspective requires designers to work with material properties rather than imposing arbitrary forms, leading to designs that emerge from material-designer collaboration.`,
          subsections: [
            {
              id: "responsive-properties",
              heading: "Responsive Properties",
              level: 3,
              content: `Many contemporary materials exhibit responsive properties, changing their characteristics based on environmental conditions, user interaction, or temporal factors. These materials can sense temperature, humidity, stress, or other conditions and respond appropriately.

Examples include shape-memory alloys that return to predetermined forms when heated, photochromic materials that change color based on light exposure, and hygroscopic materials that respond to humidity changes.`,
            },
            {
              id: "computational-materials",
              heading: "Computational Materials",
              level: 3,
              content: `Emerging computational materials can process information and make decisions at the material level, blending physical and computational properties. These materials represent a convergence of [machine-intelligence](#machine-intelligence) with material science.`,
            },
          ],
        },
        {
          id: "design-collaboration",
          heading: "Design Collaboration with Materials",
          level: 2,
          content: `Material intelligence requires collaborative design approaches where designers work with material properties and behaviors rather than against them. This often involves experimental processes, material testing, and iterative development that allows material properties to inform design direction.

This approach aligns with [artisanal-technology](#artisanal-technology) values of deep material understanding and craftsmanship.`,
        },
        {
          id: "sustainable-materials",
          heading: "Sustainable Material Intelligence",
          level: 2,
          content: `Sustainable applications of material intelligence focus on materials that can contribute to [regenerative-futures](#regenerative-futures), including bio-based materials, self-healing systems, and materials designed for [circular-economy](#circular-economy) applications.

This includes understanding how materials can actively contribute to environmental health rather than merely reducing environmental impact.`,
        },
        {
          id: "future-materials",
          heading: "Future Material Systems",
          level: 2,
          content: `Future material intelligence may involve materials that can communicate, collaborate, and evolve. These systems could integrate with [technological-ecology](#technological-ecology) approaches to create materials that actively participate in environmental and social systems.`,
        },
      ],
      furtherReading: [
        {
          title: "Materials and Design: The Art and Science of Material Selection",
          url: "https://material-intelligence.org/selection",
          description: "Understanding material properties in design contexts",
          type: "book",
        },
        {
          title: "Smart Materials and Responsive Architecture",
          url: "https://responsive-materials.org",
          description: "Contemporary applications of intelligent materials",
          type: "journal",
        },
      ],
    },
  },

  "network-society": {
    slug: "network-society",
    term: "Network Society",
    shortDefinition:
      "Social organization characterized by networked forms of communication, production, and governance enabled by digital technologies.",
    fullDefinition: `Network society describes social organization characterized by networked forms of communication, production, and governance enabled by digital technologies, fundamentally altering how information flows, power operates, and social relationships form in contemporary society.`,
    etymology: "Popularized by sociologist Manuel Castells in the 1990s",
    examples: [
      "Social media platforms reshaping political discourse and organization",
      "Distributed work networks enabling remote collaboration",
      "Peer-to-peer economic systems like sharing economies",
      "Decentralized governance models using blockchain technologies",
    ],
    relatedTerms: ["planetary-computation", "cyberphysical-systems", "machine-intelligence"],
    tags: ["social-organization", "digital-society", "network-effects", "information-society"],
    seo: {
      title: "Network Society: Digital Networks Reshaping Social Organization",
      description:
        "Understand network society: how digital technologies enable networked forms of communication, production, and governance.",
      keywords: [
        "network society",
        "digital society",
        "information society",
        "social networks",
        "networked governance",
      ],
    },
    dateModified: "2024-03-19",
    content: {
      tableOfContents: [
        { id: "networked-organization", title: "Networked Social Organization", level: 2 },
        { id: "information-flows", title: "Information Flows", level: 3 },
        { id: "power-structures", title: "Network Power Structures", level: 3 },
        { id: "economic-transformation", title: "Economic Transformation", level: 2 },
        { id: "governance-models", title: "New Governance Models", level: 2 },
        { id: "challenges-opportunities", title: "Challenges and Opportunities", level: 2 },
      ],
      sections: [
        {
          id: "networked-organization",
          heading: "Networked Social Organization",
          level: 2,
          content: `Network society represents a fundamental shift from hierarchical, industrial-era social organization toward networked, information-based structures. This transformation affects everything from how businesses operate to how political movements organize and how individuals form relationships.

The shift involves new forms of social coordination that leverage digital communication technologies to create more flexible, responsive, and distributed forms of organization.`,
          subsections: [
            {
              id: "information-flows",
              heading: "Information Flows",
              level: 3,
              content: `In network society, information flows become the primary organizing principle, replacing traditional geographic or institutional boundaries. Information can move instantly across global networks, creating new forms of coordination and collaboration that transcend physical limitations.

This transformation connects to [planetary-computation](#planetary-computation) concepts, where global information networks enable coordination at unprecedented scales.`,
            },
            {
              id: "power-structures",
              heading: "Network Power Structures",
              level: 3,
              content: `Network society creates new forms of power based on control of information flows, network positions, and technological infrastructure rather than traditional forms of authority. Understanding these power dynamics is crucial for designing equitable technological systems.`,
            },
          ],
        },
        {
          id: "economic-transformation",
          heading: "Economic Transformation",
          level: 2,
          content: `Network society enables new economic models based on information, attention, and network effects rather than traditional industrial production. These models include platform economies, sharing systems, and attention-based business models that fundamentally alter economic relationships.`,
        },
        {
          id: "governance-models",
          heading: "New Governance Models",
          level: 2,
          content: `Networked governance models experiment with distributed decision-making, transparent processes, and participatory democracy enabled by digital technologies. These approaches challenge traditional representative democracy with more direct and continuous forms of civic participation.`,
        },
        {
          id: "challenges-opportunities",
          heading: "Challenges and Opportunities",
          level: 2,
          content: `Network society creates both opportunities for more democratic, efficient, and responsive social organization and challenges including digital divides, information overload, privacy erosion, and new forms of inequality based on network access and digital literacy.

Addressing these challenges requires thoughtful design that considers [more-than-human](#more-than-human) perspectives and prioritizes equitable access to network participation.`,
        },
      ],
      furtherReading: [
        {
          title: "The Rise of the Network Society",
          url: "https://network-society.org/castells",
          description: "Manuel Castells' foundational analysis of network society",
          type: "book",
        },
        {
          title: "Digital Networks and Social Change",
          url: "https://digital-society.org",
          description: "Contemporary research on networked social organization",
          type: "academic",
        },
      ],
    },
  },

  "responsive-environments": {
    slug: "responsive-environments",
    term: "Responsive Environments",
    shortDefinition:
      "Built environments that can sense, process, and respond to human activity and environmental conditions in real-time.",
    fullDefinition: `Responsive environments are built environments that can sense, process, and respond to human activity and environmental conditions in real-time, creating adaptive spaces that enhance human experience while optimizing resource usage and environmental performance.`,
    etymology: "Developed from architecture, environmental design, and interactive technology research",
    examples: [
      "Buildings that adjust lighting and ventilation based on occupancy and weather",
      "Public spaces that respond to crowd density and movement patterns",
      "Interactive facades that display information or artistic content",
      "Adaptive furniture systems that reconfigure based on use patterns",
    ],
    relatedTerms: ["spatial-interfaces", "ubiquitous-computing", "biophilic-design"],
    tags: ["adaptive-architecture", "smart-environments", "interactive-spaces", "environmental-design"],
    seo: {
      title: "Responsive Environments: Adaptive Architecture and Smart Spaces",
      description:
        "Discover responsive environments: built spaces that sense and respond to human activity and environmental conditions in real-time.",
      keywords: [
        "responsive environments",
        "adaptive architecture",
        "smart buildings",
        "interactive spaces",
        "environmental sensing",
      ],
    },
    dateModified: "2024-03-19",
    content: {
      tableOfContents: [
        { id: "adaptive-architecture", title: "Adaptive Architecture", level: 2 },
        { id: "sensing-systems", title: "Environmental Sensing", level: 3 },
        { id: "response-mechanisms", title: "Response Mechanisms", level: 3 },
        { id: "human-environment-interaction", title: "Human-Environment Interaction", level: 2 },
        { id: "sustainability-integration", title: "Sustainability Integration", level: 2 },
        { id: "design-considerations", title: "Design Considerations", level: 2 },
      ],
      sections: [
        {
          id: "adaptive-architecture",
          heading: "Adaptive Architecture",
          level: 2,
          content: `Responsive environments represent the convergence of architecture with computational capabilities, creating buildings and spaces that can adapt to changing conditions and user needs. This approach treats architecture not as static construction but as dynamic, interactive systems.

The integration of sensing, processing, and actuation capabilities transforms built environments into active participants in human activity rather than passive containers.`,
          subsections: [
            {
              id: "sensing-systems",
              heading: "Environmental Sensing",
              level: 3,
              content: `Environmental sensing systems gather data about occupancy, activity patterns, environmental conditions, and resource usage. These systems must balance comprehensive data collection with user privacy and system reliability.

Sensor networks often integrate with [ubiquitous-computing](#ubiquitous-computing) infrastructure to create seamless, invisible monitoring capabilities that inform environmental responses.`,
            },
            {
              id: "response-mechanisms",
              heading: "Response Mechanisms",
              level: 3,
              content: `Response mechanisms translate sensor data into environmental changes through automated systems controlling lighting, ventilation, acoustics, spatial configuration, and other environmental parameters. The challenge lies in creating responses that feel natural and appropriate rather than mechanical or intrusive.`,
            },
          ],
        },
        {
          id: "human-environment-interaction",
          heading: "Human-Environment Interaction",
          level: 2,
          content: `Responsive environments fundamentally alter the relationship between humans and built space, creating opportunities for more intuitive and supportive environmental interactions. This involves understanding how people naturally interact with space and designing technological responses that enhance rather than complicate these interactions.

The approach often draws from [spatial-interfaces](#spatial-interfaces) principles, using natural human movement and behavior as input for environmental systems.`,
        },
        {
          id: "sustainability-integration",
          heading: "Sustainability Integration",
          level: 2,
          content: `Responsive environments can significantly enhance environmental performance by optimizing resource usage based on actual occupancy and activity patterns rather than static design assumptions. This optimization supports [regenerative-futures](#regenerative-futures) by reducing waste and enhancing efficiency.

Advanced responsive environments might also integrate with broader [technological-ecology](#technological-ecology) systems, contributing to urban-scale environmental management and ecosystem support.`,
        },
        {
          id: "design-considerations",
          heading: "Design Considerations",
          level: 2,
          content: `Designing responsive environments requires careful consideration of user agency, privacy, system reliability, and long-term maintenance. Users must understand and control how their environment responds to their presence and activity.

The design process often involves [design-research](#design-research) methods to understand how people naturally use and inhabit spaces, ensuring that technological responses enhance rather than interfere with natural human behavior patterns.`,
        },
      ],
      furtherReading: [
        {
          title: "Responsive Architecture: Performing the City",
          url: "https://responsive-architecture.org",
          description: "Theoretical and practical approaches to adaptive built environments",
          type: "book",
        },
        {
          title: "Smart Buildings and Environmental Intelligence",
          url: "https://smart-environments.org",
          description: "Technical approaches to responsive environmental systems",
          type: "journal",
        },
      ],
    },
  },

  "commons-based-design": {
    slug: "commons-based-design",
    term: "Commons-Based Design",
    shortDefinition:
      "Design approaches that prioritize shared resources, collaborative governance, and collective benefit over individual ownership.",
    fullDefinition: `Commons-based design encompasses approaches that prioritize shared resources, collaborative governance, and collective benefit over individual ownership, creating systems that support community stewardship and equitable access to resources and knowledge.`,
    etymology: "Drawing from commons theory, open-source development, and collaborative economics",
    examples: [
      "Open-source hardware and software development projects",
      "Community-owned renewable energy systems",
      "Shared tool libraries and maker spaces",
      "Collaborative urban planning and participatory budgeting",
    ],
    relatedTerms: ["circular-economy", "peripheral-technology", "design-research"],
    tags: ["commons", "collaborative-design", "shared-resources", "community-governance"],
    seo: {
      title: "Commons-Based Design: Collaborative Approaches to Shared Resources",
      description:
        "Learn about commons-based design: prioritizing shared resources, collaborative governance, and collective benefit in design.",
      keywords: [
        "commons based design",
        "collaborative design",
        "shared resources",
        "community governance",
        "open source design",
      ],
    },
    dateModified: "2024-03-19",
    content: {
      tableOfContents: [
        { id: "commons-principles", title: "Commons Principles", level: 2 },
        { id: "shared-ownership", title: "Shared Ownership Models", level: 3 },
        { id: "collaborative-governance", title: "Collaborative Governance", level: 3 },
        { id: "design-applications", title: "Design Applications", level: 2 },
        { id: "digital-commons", title: "Digital Commons", level: 3 },
        { id: "physical-commons", title: "Physical Commons", level: 3 },
        { id: "sustainability-connections", title: "Sustainability Connections", level: 2 },
      ],
      sections: [
        {
          id: "commons-principles",
          heading: "Commons Principles",
          level: 2,
          content: `Commons-based design operates on principles of shared stewardship, collaborative governance, and collective benefit. These approaches challenge traditional private property models by demonstrating how shared resources can be effectively managed and maintained through community coordination.

The approach recognizes that many resources—from knowledge to natural systems—are inherently collective and benefit from collaborative rather than individual management.`,
          subsections: [
            {
              id: "shared-ownership",
              heading: "Shared Ownership Models",
              level: 3,
              content: `Shared ownership models distribute control and benefit across communities rather than concentrating them in individual ownership. These models can apply to physical resources like tools and facilities, intellectual resources like designs and knowledge, and hybrid systems that combine both.

Examples include community land trusts, cooperative businesses, and open-source development projects that maintain shared ownership of code and designs.`,
            },
            {
              id: "collaborative-governance",
              heading: "Collaborative Governance",
              level: 3,
              content: `Collaborative governance involves developing decision-making processes that enable effective collective management of shared resources. This requires careful attention to participation, representation, conflict resolution, and long-term stewardship.

These governance approaches often integrate [design-research](#design-research) methods to understand community needs and develop appropriate governance structures.`,
            },
          ],
        },
        {
          id: "design-applications",
          heading: "Design Applications",
          level: 2,
          content: `Commons-based design applications span from digital platforms to physical infrastructure, always emphasizing shared benefit and collaborative governance over individual ownership or corporate control.`,
          subsections: [
            {
              id: "digital-commons",
              heading: "Digital Commons",
              level: 3,
              content: `Digital commons include open-source software, Creative Commons content, and collaborative platforms that enable shared creation and maintenance of digital resources. These systems demonstrate how commons principles can operate in digital contexts.

The success of projects like Wikipedia, Linux, and various open-source design tools shows the potential for commons-based approaches to create high-quality, widely beneficial resources.`,
            },
            {
              id: "physical-commons",
              heading: "Physical Commons",
              level: 3,
              content: `Physical commons applications include shared workshops, tool libraries, community gardens, and cooperative housing projects. These initiatives often combine [artisanal-technology](#artisanal-technology) approaches with commons governance to create locally-controlled production capabilities.`,
            },
          ],
        },
        {
          id: "sustainability-connections",
          heading: "Sustainability Connections",
          level: 2,
          content: `Commons-based design naturally aligns with sustainability goals by emphasizing resource sharing, collective stewardship, and long-term thinking over short-term individual benefit. These approaches support [circular-economy](#circular-economy) principles by maximizing resource utilization and minimizing waste.

Commons approaches also connect to [regenerative-futures](#regenerative-futures) thinking by focusing on systems that benefit communities and environments rather than extracting value from them.`,
        },
      ],
      furtherReading: [
        {
          title: "Governing the Commons",
          url: "https://commons-governance.org/ostrom",
          description: "Elinor Ostrom's foundational work on commons governance",
          type: "book",
        },
        {
          title: "Design for the Common Good",
          url: "https://commons-design.org",
          description: "Contemporary applications of commons principles in design",
          type: "organization",
        },
      ],
    },
  },

  "biomimetic-systems": {
    slug: "biomimetic-systems",
    term: "Biomimetic Systems",
    shortDefinition:
      "Technological systems designed by emulating biological processes, structures, and behaviors found in nature.",
    fullDefinition: `Biomimetic systems are technological systems designed by emulating biological processes, structures, and behaviors found in nature, leveraging millions of years of evolutionary optimization to create more efficient, sustainable, and adaptive technological solutions.`,
    etymology: "From Greek 'bios' (life) and 'mimesis' (imitate), formalized as 'biomimetics' by Otto Schmitt in 1957",
    examples: [
      "Velcro inspired by burdock burr attachment mechanisms",
      "Building ventilation systems modeled on termite mound airflow",
      "Solar panels designed to mimic photosynthetic processes",
      "Robotics systems based on animal locomotion patterns",
    ],
    relatedTerms: ["ecological-intelligence", "biophilic-design", "material-intelligence"],
    tags: ["biomimicry", "nature-inspired", "sustainable-technology", "evolutionary-design"],
    seo: {
      title: "Biomimetic Systems: Nature-Inspired Technological Solutions",
      description:
        "Explore biomimetic systems: technological solutions designed by emulating biological processes, structures, and behaviors.",
      keywords: [
        "biomimetic systems",
        "biomimicry",
        "nature inspired technology",
        "bio-inspired design",
        "evolutionary optimization",
      ],
    },
    dateModified: "2024-03-19",
    content: {
      tableOfContents: [
        { id: "evolutionary-optimization", title: "Evolutionary Optimization", level: 2 },
        { id: "structural-mimicry", title: "Structural Mimicry", level: 3 },
        { id: "process-emulation", title: "Process Emulation", level: 3 },
        { id: "design-methodology", title: "Biomimetic Design Methodology", level: 2 },
        { id: "contemporary-applications", title: "Contemporary Applications", level: 2 },
        { id: "sustainability-benefits", title: "Sustainability Benefits", level: 2 },
      ],
      sections: [
        {
          id: "evolutionary-optimization",
          heading: "Evolutionary Optimization",
          level: 2,
          content: `Biomimetic systems leverage the fact that biological systems have undergone millions of years of evolutionary optimization, resulting in highly efficient, adaptive, and sustainable solutions to complex challenges. Nature provides a vast library of tested solutions that can inspire technological innovation.

This approach recognizes that nature has already solved many of the problems that human technology attempts to address, often with greater efficiency and sustainability than current technological solutions.`,
          subsections: [
            {
              id: "structural-mimicry",
              heading: "Structural Mimicry",
              level: 3,
              content: `Structural biomimicry focuses on emulating biological forms and structures, such as the hexagonal efficiency of honeycomb patterns, the strength-to-weight ratio of bird bones, or the adhesive properties of gecko feet.

These structural inspirations often lead to materials and construction techniques that outperform traditional engineering approaches while using fewer resources.`,
            },
            {
              id: "process-emulation",
              heading: "Process Emulation",
              level: 3,
              content: `Process emulation involves copying biological mechanisms and behaviors, such as photosynthesis for energy conversion, neural networks for information processing, or swarm behaviors for distributed coordination.

This approach often connects to [machine-intelligence](#machine-intelligence) development, where biological information processing serves as inspiration for computational systems.`,
            },
          ],
        },
        {
          id: "design-methodology",
          heading: "Biomimetic Design Methodology",
          level: 2,
          content: `Biomimetic design methodology involves systematic study of biological systems, abstraction of key principles, and translation into technological applications. This process requires interdisciplinary collaboration between biologists, engineers, and designers.

The methodology often employs [design-research](#design-research) approaches to understand both biological systems and human needs, ensuring that biomimetic solutions address real problems effectively.`,
        },
        {
          id: "contemporary-applications",
          heading: "Contemporary Applications",
          level: 2,
          content: `Contemporary biomimetic systems appear across multiple domains including materials science, robotics, architecture, and information systems. These applications demonstrate the broad applicability of nature-inspired design principles across different technological challenges.`,
        },
        {
          id: "sustainability-benefits",
          heading: "Sustainability Benefits",
          level: 2,
          content: `Biomimetic systems often exhibit superior sustainability characteristics because biological systems have evolved under resource constraints and environmental pressures. These solutions typically use less energy, generate less waste, and integrate more harmoniously with natural systems.

This alignment with natural principles supports [regenerative-futures](#regenerative-futures) goals and contributes to [technological-ecology](#technological-ecology) approaches that integrate technology with natural systems.`,
        },
      ],
      furtherReading: [
        {
          title: "Biomimicry: Innovation Inspired by Nature",
          url: "https://biomimicry.org/what-is-biomimicry",
          description: "Comprehensive introduction to biomimetic design principles",
          type: "organization",
        },
        {
          title: "Nature's Strategies for Sustainable Technology",
          url: "https://bio-inspired.org",
          description: "Research on biological systems for technological innovation",
          type: "academic",
        },
      ],
    },
  },

  "distributed-manufacturing": {
    slug: "distributed-manufacturing",
    term: "Distributed Manufacturing",
    shortDefinition:
      "Production systems that distribute manufacturing capabilities across multiple small-scale facilities rather than centralized factories.",
    fullDefinition: `Distributed manufacturing involves production systems that distribute manufacturing capabilities across multiple small-scale facilities rather than centralized factories, enabling more responsive, sustainable, and locally-appropriate production while reducing transportation and inventory costs.`,
    etymology: "Emerging from digital fabrication, lean manufacturing, and supply chain optimization research",
    examples: [
      "3D printing networks for on-demand local production",
      "Fab labs and maker spaces providing community manufacturing access",
      "Modular production systems that can be deployed in multiple locations",
      "Local food processing and distribution networks",
    ],
    relatedTerms: ["artisanal-technology", "peripheral-technology", "circular-economy"],
    tags: ["manufacturing", "local-production", "digital-fabrication", "supply-chain"],
    seo: {
      title: "Distributed Manufacturing: Decentralized Production Systems",
      description:
        "Understand distributed manufacturing: production systems using multiple small-scale facilities for responsive, sustainable local production.",
      keywords: [
        "distributed manufacturing",
        "local production",
        "digital fabrication",
        "decentralized manufacturing",
        "fab labs",
      ],
    },
    dateModified: "2024-03-19",
    content: {
      tableOfContents: [
        { id: "decentralized-production", title: "Decentralized Production", level: 2 },
        { id: "local-manufacturing", title: "Local Manufacturing Benefits", level: 3 },
        { id: "digital-fabrication", title: "Digital Fabrication Technologies", level: 3 },
        { id: "economic-models", title: "Economic Models", level: 2 },
        { id: "sustainability-advantages", title: "Sustainability Advantages", level: 2 },
        { id: "implementation-challenges", title: "Implementation Challenges", level: 2 },
      ],
      sections: [
        {
          id: "decentralized-production",
          heading: "Decentralized Production",
          level: 2,
          content: `Distributed manufacturing represents a shift from centralized, mass-production models toward networks of smaller, more flexible production facilities. This approach enables greater responsiveness to local needs, reduced transportation requirements, and more resilient supply chains.

The model leverages digital fabrication technologies to enable small-scale production that can achieve quality and cost-effectiveness previously only available through large-scale manufacturing.`,
          subsections: [
            {
              id: "local-manufacturing",
              heading: "Local Manufacturing Benefits",
              level: 3,
              content: `Local manufacturing reduces transportation costs and environmental impacts while enabling customization for local needs and preferences. This approach supports [peripheral-technology](#peripheral-technology) development by enabling communities to produce solutions tailored to their specific contexts.

Local production also creates opportunities for [human-scale-craft](#human-scale-craft) approaches that combine digital fabrication with traditional making skills.`,
            },
            {
              id: "digital-fabrication",
              heading: "Digital Fabrication Technologies",
              level: 3,
              content: `Digital fabrication technologies including 3D printing, CNC machining, laser cutting, and automated assembly enable small-scale production with quality and precision previously requiring large industrial facilities.

These technologies democratize manufacturing capabilities, allowing smaller organizations and communities to produce complex products without massive capital investment.`,
            },
          ],
        },
        {
          id: "economic-models",
          heading: "Economic Models",
          level: 2,
          content: `Distributed manufacturing enables new economic models including on-demand production, mass customization, and collaborative manufacturing networks. These models can reduce inventory costs, enable rapid prototyping, and support more responsive product development.

The approach often integrates with [commons-based-design](#commons-based-design) principles, creating shared manufacturing resources that benefit entire communities rather than individual organizations.`,
        },
        {
          id: "sustainability-advantages",
          heading: "Sustainability Advantages",
          level: 2,
          content: `Distributed manufacturing can significantly reduce environmental impact through reduced transportation, more efficient resource utilization, and production systems designed for [circular-economy](#circular-economy) principles including repair, reuse, and material recovery.

Local production also enables better integration with local material streams and waste management systems, supporting [regenerative-futures](#regenerative-futures) approaches to economic activity.`,
        },
        {
          id: "implementation-challenges",
          heading: "Implementation Challenges",
          level: 2,
          content: `Implementing distributed manufacturing requires addressing challenges including quality control across distributed facilities, coordination of complex supply networks, skills development for local manufacturing capabilities, and economic models that can compete with centralized production.

Success often requires combining technological capabilities with [design-research](#design-research) approaches to understand local needs and develop appropriate implementation strategies.`,
        },
      ],
      furtherReading: [
        {
          title: "The Third Industrial Revolution",
          url: "https://distributed-manufacturing.org/rifkin",
          description: "Jeremy Rifkin's vision of distributed economic systems",
          type: "book",
        },
        {
          title: "Fab Labs and Digital Fabrication",
          url: "https://fab-foundation.org",
          description: "Global network of digital fabrication facilities",
          type: "organization",
        },
      ],
    },
  },

  "regenerative-systems": {
    slug: "regenerative-systems",
    term: "Regenerative Systems",
    shortDefinition:
      "Design frameworks that create positive feedback loops, enhancing the health and capacity of the systems they operate within.",
    fullDefinition: `Regenerative systems are design frameworks that create positive feedback loops, enhancing the health and capacity of the systems they operate within, moving beyond sustainability to actively improve ecological, social, and economic conditions over time.`,
    etymology: "Developed from regenerative agriculture, permaculture, and systems theory applications",
    examples: [
      "Permaculture food systems that improve soil health over time",
      "Social enterprises that strengthen community capacity while achieving business goals",
      "Building systems that generate more energy than they consume",
      "Economic models that increase rather than deplete natural and social capital",
    ],
    relatedTerms: ["regenerative-futures", "ecological-intelligence", "circular-economy"],
    tags: ["regenerative-design", "systems-health", "positive-impact", "sustainability"],
    seo: {
      title: "Regenerative Systems: Beyond Sustainability to System Enhancement",
      description:
        "Discover regenerative systems: design frameworks creating positive feedback loops that enhance system health and capacity.",
      keywords: [
        "regenerative systems",
        "regenerative design",
        "positive impact",
        "system enhancement",
        "sustainable systems",
      ],
    },
    dateModified: "2024-03-19",
    content: {
      tableOfContents: [
        { id: "beyond-sustainability", title: "Beyond Sustainability", level: 2 },
        { id: "positive-feedback", title: "Positive Feedback Loops", level: 3 },
        { id: "system-health", title: "System Health Indicators", level: 3 },
        { id: "design-principles", title: "Regenerative Design Principles", level: 2 },
        { id: "application-domains", title: "Application Domains", level: 2 },
        { id: "ecological-systems", title: "Ecological Systems", level: 3 },
        { id: "social-systems", title: "Social Systems", level: 3 },
        { id: "measurement-evaluation", title: "Measurement and Evaluation", level: 2 },
      ],
      sections: [
        {
          id: "beyond-sustainability",
          heading: "Beyond Sustainability",
          level: 2,
          content: `Regenerative systems move beyond the sustainability goal of 'doing no harm' to actively improving the health and capacity of the systems they operate within. While sustainability focuses on maintaining current conditions, regenerative approaches seek to enhance system vitality and resilience over time.

This represents a fundamental shift from minimizing negative impact to maximizing positive contribution to system health.`,
          subsections: [
            {
              id: "positive-feedback",
              heading: "Positive Feedback Loops",
              level: 3,
              content: `Regenerative systems create positive feedback loops where system operation enhances rather than degrades system capacity. These loops enable continuous improvement and adaptation, making systems more resilient and effective over time.

Examples include soil improvement through regenerative agriculture practices, community strengthening through cooperative businesses, and ecosystem enhancement through thoughtful human intervention.`,
            },
            {
              id: "system-health",
              heading: "System Health Indicators",
              level: 3,
              content: `Measuring system health requires indicators that capture vitality, resilience, adaptability, and capacity for growth rather than just efficiency or output metrics. These indicators often integrate multiple dimensions including ecological, social, and economic health.`,
            },
          ],
        },
        {
          id: "design-principles",
          heading: "Regenerative Design Principles",
          level: 2,
          content: `Regenerative design principles include working with natural patterns, creating beneficial relationships between system components, designing for adaptation and evolution, and prioritizing long-term system health over short-term optimization.

These principles often draw from [ecological-intelligence](#ecological-intelligence) understanding of how natural systems maintain and enhance their own health and capacity.`,
        },
        {
          id: "application-domains",
          heading: "Application Domains",
          level: 2,
          content: `Regenerative systems apply across ecological, social, and technological domains, always focusing on creating conditions that enhance system health and capacity rather than merely extracting value.`,
          subsections: [
            {
              id: "ecological-systems",
              heading: "Ecological Systems",
              level: 3,
              content: `Ecological applications include regenerative agriculture, ecosystem restoration, and [biophilic-design](#biophilic-design) approaches that enhance rather than degrade natural systems. These applications demonstrate how human activity can contribute positively to ecological health.`,
            },
            {
              id: "social-systems",
              heading: "Social Systems",
              level: 3,
              content: `Social applications focus on creating institutions, organizations, and communities that strengthen social capital, enhance collective capacity, and improve community resilience. This often involves [commons-based-design](#commons-based-design) approaches that build shared resources and governance capabilities.`,
            },
          ],
        },
        {
          id: "measurement-evaluation",
          heading: "Measurement and Evaluation",
          level: 2,
          content: `Evaluating regenerative systems requires new metrics that capture system health improvement over time rather than just efficiency or output measures. This involves developing indicators for ecological health, social capital, adaptive capacity, and long-term resilience.

Measurement approaches often integrate multiple stakeholder perspectives and consider impacts across different timescales and system levels.`,
        },
      ],
      furtherReading: [
        {
          title: "Regenerative Development and Design",
          url: "https://regenerative-design.org/principles",
          description: "Comprehensive framework for regenerative approaches",
          type: "organization",
        },
        {
          title: "Living Systems: Principles for Regenerative Design",
          url: "https://living-systems.org",
          description: "Biological principles applied to human systems design",
          type: "book",
        },
      ],
    },
  },
};

// TEMPLATE FOR NEW TERMS - Use this structure when adding new entries
/*
export const TERM_TEMPLATE = {
  slug: "term-slug", // lowercase, hyphenated
  term: "Term Name", // Proper capitalization
  shortDefinition: "Brief one-sentence definition for previews and cards.",
  fullDefinition: `Longer paragraph definition that provides comprehensive context and meaning. Should be 2-3 sentences that fully explain the concept.`,
  etymology: "Origin and history of the term (optional but recommended)",
  examples: [
    "Concrete example 1 that illustrates the concept",
    "Concrete example 2 showing different application", 
    "Concrete example 3 demonstrating range of usage",
  ],
  relatedTerms: ["related-term-1", "related-term-2"], // slugs of related terms
  tags: ["primary-category", "secondary-category", "tertiary-category"], // for organization
  seo: {
    title: "Term Name: SEO-Optimized Title (50-60 characters)",
    description: "SEO meta description that includes key terms and value proposition (150-160 characters).",
    keywords: ["primary-keyword", "secondary-keyword", "related-term", "synonym", "category-keyword"],
  },
  dateModified: "YYYY-MM-DD", // ISO date format
  content: {
    tableOfContents: [
      { id: "section-1-id", title: "Section 1 Title", level: 2 },
      { id: "subsection-1-id", title: "Subsection Title", level: 3 },
      { id: "section-2-id", title: "Section 2 Title", level: 2 },
    ],
    sections: [
      {
        id: "section-1-id",
        heading: "Section 1 Title",
        level: 2,
        content: `Comprehensive content for this section. Should be multiple paragraphs providing depth and context. Can reference other terms using [term-name](#term-slug) syntax for auto-linking.

Use proper paragraphs and formatting. Include specific examples and applications.`,
        subsections: [
          {
            id: "subsection-1-id",
            heading: "Subsection Title",
            level: 3,
            content: "More detailed content for subsection. Break complex topics into digestible parts."
          }
        ]
      },
      {
        id: "section-2-id", 
        heading: "Section 2 Title",
        level: 2,
        content: "Additional section content. Each term should have 2-4 main sections for comprehensive coverage."
      }
    ],
    furtherReading: [
      {
        title: "Resource Title",
        url: "https://example.com/resource",
        description: "Brief description of what this resource provides",
        type: "academic" | "journal" | "book" | "website" | "organization"
      }
    ],
    images: [ // Optional but recommended for key terms
      {
        src: "/images/glossary/term-image.jpg",
        alt: "Descriptive alt text for accessibility",
        caption: "Caption explaining the image's relevance to the term"
      }
    ]
  },
};
*/

// Enhanced utility functions for Wikipedia-style glossary
export function getGlossaryTerm(slug) {
  return glossaryTerms[slug] || null;
}

export function getAllGlossaryTerms() {
  return Object.values(glossaryTerms).sort((a, b) => a.term.localeCompare(b.term));
}

export function searchGlossaryTerms(query) {
  const lowercaseQuery = query.toLowerCase();
  return Object.values(glossaryTerms).filter(
    (term) =>
      term.term.toLowerCase().includes(lowercaseQuery) ||
      term.shortDefinition.toLowerCase().includes(lowercaseQuery) ||
      term.tags.some((tag) => tag.includes(lowercaseQuery)) ||
      term.content?.sections?.some((section) => section.content?.toLowerCase().includes(lowercaseQuery))
  );
}

export function getRelatedTerms(slug) {
  const term = getGlossaryTerm(slug);
  if (!term) return [];

  return term.relatedTerms.map((relatedSlug) => getGlossaryTerm(relatedSlug)).filter(Boolean);
}

// Process content to automatically link to other glossary terms
export function processContentWithLinks(content, currentSlug = null) {
  if (!content || typeof content !== "string") return content;

  let processedContent = content;

  // Find all glossary terms and create links (excluding current term)
  Object.values(glossaryTerms).forEach((term) => {
    if (term.slug === currentSlug) return;

    // Create regex for term matching (case insensitive, word boundaries)
    const regex = new RegExp(`\\b${term.term}\\b`, "gi");

    // Replace with markdown-style links that can be converted to HTML
    processedContent = processedContent.replace(regex, `[${term.term}](/glossary/${term.slug})`);
  });

  return processedContent;
}

// Generate table of contents from sections
export function generateTableOfContents(sections, tableOfContents = null) {
  if (tableOfContents) return tableOfContents;

  // Auto-generate from sections if not provided
  const toc = [];

  sections.forEach((section) => {
    toc.push({
      id: section.id || section.heading.toLowerCase().replace(/\s+/g, "-"),
      title: section.heading,
      level: section.level || 2,
    });

    if (section.subsections) {
      section.subsections.forEach((subsection) => {
        toc.push({
          id: subsection.id || subsection.heading.toLowerCase().replace(/\s+/g, "-"),
          title: subsection.heading,
          level: subsection.level || 3,
        });
      });
    }
  });

  return toc;
}

// Enhanced breadcrumb generation
export function generateBreadcrumbs(slug) {
  const term = getGlossaryTerm(slug);
  if (!term) return [];

  return [
    { label: "Glossary", url: "/glossary" },
    { label: term.term, url: `/glossary/${slug}`, current: true },
  ];
}

// For SEO: generate rich content with proper structure
export function generateTermContent(slug) {
  const term = getGlossaryTerm(slug);
  if (!term) return null;

  // Process content for cross-linking
  const processedContent = {
    ...term.content,
    sections: term.content?.sections?.map((section) => ({
      ...section,
      content: processContentWithLinks(section.content, slug),
      subsections: section.subsections?.map((subsection) => ({
        ...subsection,
        content: processContentWithLinks(subsection.content, slug),
      })),
    })),
  };

  return {
    ...term,
    content: processedContent,
    breadcrumbs: generateBreadcrumbs(slug),
    tableOfContents: generateTableOfContents(term.content?.sections, term.content?.tableOfContents),
    structuredData: {
      "@context": "https://schema.org",
      "@type": "DefinedTerm",
      name: term.term,
      description: term.fullDefinition,
      inDefinedTermSet: {
        "@type": "DefinedTermSet",
        name: "Spolia Design Glossary",
        url: "/glossary",
      },
      url: `/glossary/${term.slug}`,
      dateModified: term.dateModified,
      // Enhanced structured data for better SEO
      keywords: term.seo?.keywords?.join(", "),
      image: term.content?.images?.[0]?.src,
      author: {
        "@type": "Organization",
        name: "Spolia",
      },
      publisher: {
        "@type": "Organization",
        name: "Spolia",
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `/glossary/${term.slug}`,
      },
    },
  };
}

// Get terms by category/tag for better organization
export function getTermsByTag(tag) {
  return Object.values(glossaryTerms)
    .filter((term) => term.tags.includes(tag))
    .sort((a, b) => a.term.localeCompare(b.term));
}

// Get word count for content (useful for SEO analysis)
export function getContentWordCount(slug) {
  const term = getGlossaryTerm(slug);
  if (!term) return 0;

  let wordCount = 0;
  wordCount += term.fullDefinition.split(/\s+/).length;

  if (term.content?.sections) {
    term.content.sections.forEach((section) => {
      wordCount += section.content.split(/\s+/).length;
      if (section.subsections) {
        section.subsections.forEach((subsection) => {
          wordCount += subsection.content.split(/\s+/).length;
        });
      }
    });
  }

  return wordCount;
}

// Generate reading time estimate
export function getReadingTime(slug) {
  const wordCount = getContentWordCount(slug);
  const wordsPerMinute = 200; // Average reading speed
  return Math.ceil(wordCount / wordsPerMinute);
}
