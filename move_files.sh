#!/bin/bash

# Public
mv downloads/erdh-land.mp4 public/videos/ 2>/dev/null
mv downloads/favicon.ico public/ 2>/dev/null
mv downloads/placeholder.svg public/ 2>/dev/null
mv downloads/robots.txt public/ 2>/dev/null

# Components - eoi
mv downloads/EOIHeader.tsx src/components/eoi/ 2>/dev/null
mv downloads/LocationField.tsx src/components/eoi/ 2>/dev/null

# Components - infographic
mv downloads/MasterplanDiagram.tsx src/components/infographic/ 2>/dev/null

# Components - life
mv downloads/Architecture*.tsx src/components/life/ 2>/dev/null
mv downloads/BulletList.tsx src/components/life/ 2>/dev/null
mv downloads/DailyRhythm*.tsx src/components/life/ 2>/dev/null
mv downloads/EnvironmentSection.tsx src/components/life/ 2>/dev/null
mv downloads/FoodForestSection.tsx src/components/life/ 2>/dev/null
mv downloads/LearningSection.tsx src/components/life/ 2>/dev/null
mv downloads/LifeCtaSection.tsx src/components/life/ 2>/dev/null
mv downloads/Parallax*.tsx src/components/life/ 2>/dev/null
mv downloads/PrincipleCard.tsx src/components/life/ 2>/dev/null
mv downloads/WaterEnergySection.tsx src/components/life/ 2>/dev/null

# Components - stewards
mv downloads/InviteCard.tsx src/components/stewards/ 2>/dev/null
mv downloads/Steward*.tsx src/components/stewards/ 2>/dev/null
mv downloads/stewardsData.ts src/components/stewards/ 2>/dev/null

# Components - ui
mv downloads/*.tsx src/components/ui/ 2>/dev/null

# Components - root
mv downloads/Breadcrumbs.tsx src/components/ 2>/dev/null
mv downloads/CommunitySpaces.tsx src/components/ 2>/dev/null
mv downloads/ExploreLifeSection.tsx src/components/ 2>/dev/null
mv downloads/ExpressInterestCTA.tsx src/components/ 2>/dev/null
mv downloads/FAQSection.tsx src/components/ 2>/dev/null
mv downloads/FloatingWhatsApp.tsx src/components/ 2>/dev/null
mv downloads/Footer.tsx src/components/ 2>/dev/null
mv downloads/HeroSection.tsx src/components/ 2>/dev/null
mv downloads/JoinSection.tsx src/components/ 2>/dev/null
mv downloads/Navbar.tsx src/components/ 2>/dev/null
mv downloads/PhilosophySection.tsx src/components/ 2>/dev/null
mv downloads/Pillars*.tsx src/components/ 2>/dev/null
mv downloads/SpaceDetailModal.tsx src/components/ 2>/dev/null
mv downloads/StatusModal.tsx src/components/ 2>/dev/null
mv downloads/WayanadSection.tsx src/components/ 2>/dev/null
mv downloads/WhatIsErdh.tsx src/components/ 2>/dev/null
mv downloads/YouTubeFacade.tsx src/components/ 2>/dev/null

# Hooks
mv downloads/use-mobile.tsx src/hooks/ 2>/dev/null
mv downloads/use-toast.ts src/hooks/ 2>/dev/null

# Supabase
mv downloads/client.ts src/integrations/supabase/ 2>/dev/null
mv downloads/types.ts src/integrations/supabase/ 2>/dev/null

# Lib
mv downloads/eoi-components.tsx src/lib/ 2>/dev/null
mv downloads/eoi-form.ts src/lib/ 2>/dev/null
mv downloads/timeline-data.ts src/lib/ 2>/dev/null
mv downloads/utils.ts src/lib/ 2>/dev/null

# Pages
mv downloads/ExpressionOfInterest.tsx src/pages/ 2>/dev/null
mv downloads/Index.tsx src/pages/ 2>/dev/null
mv downloads/Infographic.tsx src/pages/ 2>/dev/null
mv downloads/Land.tsx src/pages/ 2>/dev/null
mv downloads/LifeAtErdh.tsx src/pages/ 2>/dev/null
mv downloads/NotFound.tsx src/pages/ 2>/dev/null
mv downloads/Philosophy.tsx src/pages/ 2>/dev/null
mv downloads/Stewards.tsx src/pages/ 2>/dev/null

# Core src
mv downloads/App.tsx src/ 2>/dev/null
mv downloads/index.css src/ 2>/dev/null
mv downloads/main.tsx src/ 2>/dev/null
mv downloads/vite-env.d.ts src/ 2>/dev/null

# Test
mv downloads/*.test.ts src/test/ 2>/dev/null
mv downloads/setup.ts src/test/ 2>/dev/null

# Root files
mv downloads/package.json . 2>/dev/null
mv downloads/index.html . 2>/dev/null
mv downloads/tailwind.config.ts . 2>/dev/null
mv downloads/vite.config.ts . 2>/dev/null
mv downloads/tsconfig*.json . 2>/dev/null
mv downloads/postcss.config.js . 2>/dev/null
mv downloads/README.md . 2>/dev/null
mv downloads/eslint.config.js . 2>/dev/null
mv downloads/components.json . 2>/dev/null
mv downloads/.env . 2>/dev/null
mv downloads/.gitignore . 2>/dev/null

echo "✅ Files moved!"