# Kardashian-Jenner Dynasty Mapping

![Kardashian-Jenner Network Ecosystem Banner](./src/assets/images/network_banner_1779712781136.png)

An interactive digital network analysis of the Kardashian-Jenner ecosystem, exploring the intersections of reality television, global commerce, and humanitarian advocacy.

## Project Overview

This application utilizes a force-directed graph (D3.js) within a React framework to visualize the complex relationships between the Kardashian-Jenner family members, their businesses, and their social impact.

### Key Visual & Functional Pillars
- **Dynamic Physics Simulation**: Real-time graph simulation managing repulsion and attraction between nodes.
- **Categorized Hubs**:
  - **Adult Person Nodes (Parents)**: Key family figures represented by larger human glyphs (Kris, Kim, Khloé, Kourtney, Kendall, Kylie, etc.).
  - **Children (Grandchildren)**: Represented by smaller human glyphs to visually depict generational hierarchies dynamically.
  - **Company Nodes**: Multi-billion dollar ventures (SKIMS, Kylie Cosmetics, Good American, etc.).
  - **Industry Nodes**: Segmentation into Beauty, Fashion, Beverages, and Media.
  - **Cause Nodes**: Visualization of philanthropic and cultural impact, modeled as rounded squares for clear visual division.
- **Real-Time Financial Valuation (Net Worth)**: Major family leaders have their estimated net worth (e.g., $1.7B, $710M) displayed in clean, high-contrast dark badgesOffset adjacent to their node icons on the graph canvas.

## Visual Identity & Redesigned Legend

The interface is built on a "Nude & Clay" aesthetic, reflecting the family's signature branding, punctuated by high-contrast neon accents. The sidebar legend has been fully group-categorized for enhanced clarity:
1. **✦ Odrasli Članovi**: Parents/founders with distinct house colors and Net Worth labels.
2. **✦ Djeca (Mlađi Naraštaj)**: Generational descendants represented by smaller scale glyphs (e.g., North, Stormi, Penelope).
3. **✦ Brendovi & Industrija (Krug)**: Categorized business ventures showing market innovation in fashion, beauty, cosmetics, and beverages.
4. **✦ Humanitarnost & Utjecaj (Kocka)**: Philanthropic work across legal reform, environmental advocacy, and clean-living advocacy.

## Technical Architecture

- **Frontend**: React 18+ powered by Vite.
- **Visualization**: D3.js for the core relationship engine and SVG rendering.
- **Styling**: Tailwind CSS for a modern, responsive layout with glassmorphism effects.
- **Data Model**: A relational TypeScript structure defined in `src/data.ts`.

## Scientific Context

This project serves as a digital humanities study into "Network Centrality" within celebrity culture. It maps how reality TV prominence translates into structural influence across global industries and social reforms.

Detailed analysis can be found in the `/report/report_1.md` file.

---
*Created as a digital representation of media, commerce, and philanthropy.*
