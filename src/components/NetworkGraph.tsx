import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Node, Link, NodeType, RelationType } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Info, X, Maximize2, Minimize2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GraphProps {
  data: { nodes: Node[]; links: Link[] };
  onNodeClick: (node: Node | null) => void;
  selectedNode: Node | null;
}

interface D3Node extends d3.SimulationNodeDatum, Node {}
interface D3Link extends d3.SimulationLinkDatum<D3Node> {
  source: string | D3Node;
  target: string | D3Node;
  relation: RelationType;
}

export const NetworkGraph: React.FC<GraphProps> = ({ data, onNodeClick, selectedNode }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!svgRef.current || dimensions.width === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = dimensions.width;
    const height = dimensions.height;

    const g = svg.append('g');

    // Add gradients
    const defs = svg.append('defs');
    const dashGradient = defs.append('linearGradient')
      .attr('id', 'dashGradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '100%');

    dashGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#FAFF00'); // Khloé Yellow

    dashGradient.append('stop')
      .attr('offset', '50%')
      .attr('stop-color', '#FF3131'); // Kim Red

    dashGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#FF00FF'); // Kourtney Purple

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 8])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    // Deep copy data for simulation to avoid modifying source
    const nodes: D3Node[] = data.nodes.map(d => ({ ...d }));
    const links: D3Link[] = data.links.map(d => ({ ...d }));

    const simulation = d3.forceSimulation<D3Node>(nodes)
      .force('link', d3.forceLink<any, any>(links).id((d) => d.id).distance(120))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(60));

    const link = g.append('g')
      .attr('stroke', '#D5BDAF')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke-width', (d) => (d.relation === RelationType.PARENT_OF ? 2 : 1))
      .attr('stroke-dasharray', (d) => (d.relation === RelationType.IN_INDUSTRY ? '4,4' : 'none'));

    const getNodeEmoji = (d: Node) => {
      // Parents & Principal family members
      if (d.isKris) return "👑"; // The Momager
      if (d.id === "Kim Kardashian") return "💎"; // SKIMS, Diamonds
      if (d.id === "Kylie Jenner") return "💄"; // Kylie Cosmetics
      if (d.id === "Kendall Jenner") return "👠"; // Supermodel
      if (d.id === "Khloe Kardashian") return "🌟"; // Good American, Star
      if (d.id === "Kourtney Kardashian") return "🧘"; // Poosh, Wellness
      if (d.id === "Rob Kardashian") return "🧦"; // Arthur George
      if (d.isRobert) return "💼"; // Attorney Robert G. Kardashian
      if (d.isCaitlyn) return "🏅"; // Olympic decathlete
      
      // Other well-known people
      if (d.id === "Kanye West") return "🎤";
      if (d.id === "Scott Disick") return "🥂";
      if (d.id === "Travis Barker") return "🥁";
      if (d.id === "Tristan Thompson" || d.id === "Lamar Odom" || d.id === "Devin Booker") return "🏀";
      if (d.id === "Tyga" || d.id === "Travis Scott") return "🎶";
      
      // Children (grandchildren)
      if (d.isChild) return "👶";

      // Companies / Brands
      if (d.type === NodeType.COMPANY) {
        if (d.id.includes("SKIMS") || d.id.includes("Good American") || d.id.includes("DASH")) return "👗";
        if (d.id.includes("Kylie Cosmetics") || d.id.includes("Kylie Skin") || d.id.includes("KKW Beauty") || d.id.includes("SKKN") || d.id.includes("Fragrance")) return "💄";
        if (d.id.includes("818 Tequila")) return "🍹";
        if (d.id.includes("Lemme") || d.id.includes("Poosh")) return "🌿";
        if (d.id.includes("Arthur George")) return "🧦";
        if (d.id.includes("The Kardashians") || d.id.includes("Podcast") || d.id.includes("Khloud")) return "🎬";
        return "🏢";
      }

      // Causes / Humanitarian Advocacy
      if (d.type === NodeType.CAUSE) {
        if (d.id.includes("Reforma") || d.id.includes("Pravosuđa") || d.id.includes("Justice") || d.id.includes("Innocence")) return "⚖️";
        if (d.id.includes("Aktivizam u medicini") || d.id.includes("Onkološka") || d.id.includes("Cancer")) return "🏥";
        if (d.id.includes("Smile Train") || d.id.includes("Dječj") || d.id.includes("Kids")) return "❤️";
        if (d.id.includes("Voda") || d.id.includes("water")) return "💧";
        if (d.id.includes("Kulturološki") || d.id.includes("Cultural") || d.id.includes("Kimoji")) return "✨";
        if (d.id.includes("Kozmet") || d.id.includes("Wellness")) return "🌿";
        return "💝";
      }

      // Industries
      if (d.type === NodeType.INDUSTRY) {
        if (d.id.includes("Kozmetika") || d.id.includes("Moda") || d.id.includes("Beauty") || d.id.includes("Fashion")) return "💅";
        if (d.id.includes("Medij") || d.id.includes("Kultura") || d.id.includes("Media")) return "📢";
        if (d.id.includes("Pića") || d.id.includes("Beverages")) return "🥂";
        return "🏷️";
      }

      return "";
    };

    const handleMouseOver = (event: any, d: D3Node) => {
      // Find connected nodes
      const connectedNodeIds = new Set<string>();
      connectedNodeIds.add(d.id);
      
      links.forEach((l: any) => {
        const sourceId = typeof l.source === 'object' ? l.source.id : l.source;
        const targetId = typeof l.target === 'object' ? l.target.id : l.target;
        if (sourceId === d.id) {
          connectedNodeIds.add(targetId);
        } else if (targetId === d.id) {
          connectedNodeIds.add(sourceId);
        }
      });

      // Highlight connections beautifully via transitions
      link.transition()
        .duration(200)
        .attr('stroke-opacity', (l: any) => {
          const sourceId = typeof l.source === 'object' ? l.source.id : l.source;
          const targetId = typeof l.target === 'object' ? l.target.id : l.target;
          return (sourceId === d.id || targetId === d.id) ? 1.0 : 0.15;
        })
        .attr('stroke-width', (l: any) => {
          const sourceId = typeof l.source === 'object' ? l.source.id : l.source;
          const targetId = typeof l.target === 'object' ? l.target.id : l.target;
          return (sourceId === d.id || targetId === d.id) ? 3 : (l.relation === RelationType.PARENT_OF ? 2 : 1);
        });

      // Softly dim out unconnected nodes, fully opaque connected nodes
      node.transition()
        .duration(200)
        .style('opacity', (n: any) => connectedNodeIds.has(n.id) ? 1.0 : 0.2);

      // Enlarge the hovered node's shapes slightly
      const selection = d3.select(event.currentTarget);
      
      selection.select('path')
        .transition()
        .duration(200)
        .attr('transform', (n: any) => n.isChild ? 'scale(0.85)' : 'scale(1.2)');

      selection.select('circle')
        .transition()
        .duration(200)
        .attr('r', (n: any) => n.type === NodeType.COMPANY ? 19 : 15);

      selection.select('rect')
        .transition()
        .duration(200)
        .attr('width', 26)
        .attr('height', 26)
        .attr('x', -13)
        .attr('y', -13);

      selection.selectAll('text')
        .transition()
        .duration(200)
        .attr('font-size', '12px')
        .attr('font-weight', '700');
    };

    const handleMouseOut = (event: any, d: D3Node) => {
      // Revert link transitions
      link.transition()
        .duration(200)
        .attr('stroke-opacity', 0.6)
        .attr('stroke-width', (l: any) => (l.relation === RelationType.PARENT_OF ? 2 : 1));

      // Revert nodes transitions
      node.transition()
        .duration(200)
        .style('opacity', 1.0);

      // Revert hovered node scale/styling
      const selection = d3.select(event.currentTarget);

      selection.select('path')
        .transition()
        .duration(200)
        .attr('transform', (n: any) => n.isChild ? 'scale(0.7)' : 'scale(1)');

      selection.select('circle')
        .transition()
        .duration(200)
        .attr('r', (n: any) => n.type === NodeType.COMPANY ? 15 : 12);

      selection.select('rect')
        .transition()
        .duration(200)
        .attr('width', 22)
        .attr('height', 22)
        .attr('x', -11)
        .attr('y', -11);

      selection.selectAll('text')
        .transition()
        .duration(200)
        .attr('font-size', '10px')
        .attr('font-weight', (n: any) => (n.type === NodeType.PERSON ? '600' : '400'));
    };

    const node = g.append('g')
      .selectAll('.node')
      .data(nodes)
      .join('g')
      .attr('class', 'node')
      .call(d3.drag<any, any>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended))
      .on('click', (event, d) => {
        event.stopPropagation();
        onNodeClick(d);
      })
      .on('mouseenter', handleMouseOver)
      .on('mouseleave', handleMouseOut)
      .style('cursor', 'pointer');

    const getNodeFill = (d: Node) => {
      if (d.isKimKylieImpact) return '#FF91A4'; // Light red-pink for cultural impact
      if (d.isDashGradient) return 'url(#dashGradient)';
      if (d.isKendallKylie) return '#FF8C69'; // Coral / Pink-Orange
      if (d.isKimLightRed) return '#FFCDCD'; // More pale light red
      if (d.isKylieHumanitarian) return '#FF10F0'; // Neon Pink for Kylie's advocacy
      if (d.isKendallHumanitarian) return '#FF5F1F'; // Neon Orange for Kendall's advocacy
      if (d.isKhloeYellow) return '#FEF9C3'; // Light yellow (Tailwind yellow-100)
      if (d.isKhloeHumanitarian) return '#FAFF00'; // Neon Yellow for Khloe's work
      if (d.isKourtneyHumanitarian) return '#FF00FF'; // Neon Magenta for wellness work
      if (d.isKimHumanitarian) return '#FF3131'; // Neon Red for humanitarian work
      if (d.isRobert) return '#6B7280'; // Grey for Robert
      if (d.isCaitlyn) return '#FF2D55'; // Neon Coral for Caitlyn
      if (d.isKris) return '#000000'; // Black for Kris
      if (d.isRobProduct) return '#DBEAFE'; // Light blue for brands
      if (d.isRobFamily) return '#2563EB'; // Dark blue for names
      if (d.isKhloeProduct) return '#FEF9C3'; // Light yellow for Khloe's brands
      if (d.isKhloeFamily) return '#EAB308'; // Dark yellow for Khloe's family
      if (d.isKendallProduct) return '#FFEDD5'; // Light orange for Kendall's brands
      if (d.isKendallFamily) return '#F97316'; // Dark orange for Kendall
      if (d.isKimProduct) return '#FEE2E2'; // Light red for Kim's brands
      if (d.isKimFamily) return '#B91C1C'; // Dark red for Kim's family
      if (d.isKylieProduct) return '#FCE7F3'; // Light pink for brands
      if (d.isKylieFamily) return '#DB2777'; // Dark pink for names
      if (d.isKourtneyProduct) return '#EBE4F5'; // Soft purple for brands
      if (d.isKourtneyFamily) return '#7C5295'; // Dark purple for names
      if (d.type === NodeType.PERSON) return '#D5BDAF'; // Darker nude for names
      if (d.type === NodeType.COMPANY) return '#F5EBE0'; // Lighter nude for companies
      return '#EDEDED';
    };

    const getNodeStroke = (d: Node) => {
      if (selectedNode?.id === d.id) return '#4A4A4A';
      if (d.isKimKylieImpact) return '#FF69B4'; // Hot pink stroke
      if (d.isDashGradient) return '#000000'; // Black stroke for gradient
      if (d.isKendallKylie) return '#FF1493'; // Deep Pink stroke for contrast
      if (d.isKimLightRed) return '#FF7F7F'; // Stroke matches old fill for better visibility
      if (d.isKylieHumanitarian) return '#00FFFF'; // Contrast cyan stroke
      if (d.isKendallHumanitarian) return '#39FF14'; // Neon Lime stroke for Kendall's orange
      if (d.isKhloeYellow) return '#FACC15'; // Darker yellow stroke
      if (d.isKhloeHumanitarian) return '#000000'; // Black stroke for yellow contrast
      if (d.isKourtneyHumanitarian) return '#00FFFF'; // Neon Cyan stroke for "glitter"
      if (d.isKimHumanitarian) return '#39FF14'; // Neon Lime stroke for "glitter" effect
      if (d.isRobert) return '#374151';
      if (d.isCaitlyn) return '#E01E44';
      if (d.isKris) return '#000000';
      if (d.isRobProduct) return '#BFDBFE'; // Light blue stroke
      if (d.isRobFamily) return '#1E3A8A'; // Dark blue stroke
      if (d.isKhloeProduct) return '#FEF08A'; // Light yellow stroke
      if (d.isKhloeFamily) return '#854D0E'; // Dark yellow stroke
      if (d.isKendallProduct) return '#FED7AA'; // Light orange stroke
      if (d.isKendallFamily) return '#9A3412'; // Dark orange stroke
      if (d.isKimProduct) return '#FCA5A5'; // Light red stroke
      if (d.isKimFamily) return '#7F1D1D'; // Dark red stroke
      if (d.isKylieProduct) return '#F9A8D4'; // Light pink stroke
      if (d.isKylieFamily) return '#9D174D'; // Dark pink stroke
      if (d.isKourtneyProduct) return '#C8B6E2'; // Soft purple stroke
      if (d.isKourtneyFamily) return '#4B2C5E'; // Dark purple stroke
      if (d.type === NodeType.PERSON) return '#A68A7B'; // Darker stroke for names
      return '#CCC';
    };

    // Render person nodes as human silhouette path
    node.filter((d) => d.type === NodeType.PERSON)
      .append('path')
      .attr('d', "M -12,11 C -12,4.5 -6.5,1.5 0,1.5 C 6.5,1.5 12,4.5 12,11 L 12,14 L -12,14 Z M 0,-4.5 A 5.5,5.5 0 1,0 0,-15.5 A 5.5,5.5 0 1,0 0,-4.5")
      .attr('transform', (d) => d.isChild ? 'scale(0.7)' : 'scale(1)')
      .attr('fill', (d) => getNodeFill(d))
      .attr('stroke', (d) => getNodeStroke(d))
      .attr('stroke-width', (d) => (selectedNode?.id === d.id ? (d.isChild ? 3 / 0.7 : 3) : (d.isChild ? 1.5 / 0.7 : 1.5)));

    // Render humanitarian / cause nodes as squares (kocka)
    node.filter((d) => d.type === NodeType.CAUSE)
      .append('rect')
      .attr('x', -11)
      .attr('y', -11)
      .attr('width', 22)
      .attr('height', 22)
      .attr('rx', 3) // rounded corners for polished aesthetic
      .attr('fill', (d) => getNodeFill(d))
      .attr('stroke', (d) => getNodeStroke(d))
      .attr('stroke-width', (d) => (selectedNode?.id === d.id ? 3 : 1.5));

    // Render other non-person, non-cause nodes as circles
    node.filter((d) => d.type !== NodeType.PERSON && d.type !== NodeType.CAUSE)
      .append('circle')
      .attr('r', (d) => {
        if (d.type === NodeType.COMPANY) return 15;
        return 12;
      })
      .attr('fill', (d) => getNodeFill(d))
      .attr('stroke', (d) => getNodeStroke(d))
      .attr('stroke-width', (d) => (selectedNode?.id === d.id ? 3 : 1.5));

    // Outline text layer for perfect text legibility on pink/white backgrounds
    node.append('text')
      .text((d) => {
        const emoji = getNodeEmoji(d);
        return emoji ? `${emoji} ${d.id}` : d.id;
      })
      .attr('dy', (d) => (d.type === NodeType.PERSON && d.isChild) ? 25 : 35)
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      .attr('font-family', 'Inter, sans-serif')
      .attr('font-weight', (d) => (d.type === NodeType.PERSON ? '600' : '400'))
      .attr('fill', 'none')
      .attr('stroke', '#FFF0F3') // Matches the background color beautifully
      .attr('stroke-width', 3)
      .attr('stroke-linejoin', 'round')
      .attr('pointer-events', 'none');

    // True text layer
    node.append('text')
      .text((d) => {
        const emoji = getNodeEmoji(d);
        return emoji ? `${emoji} ${d.id}` : d.id;
      })
      .attr('dy', (d) => (d.type === NodeType.PERSON && d.isChild) ? 25 : 35)
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      .attr('font-family', 'Inter, sans-serif')
      .attr('font-weight', (d) => (d.type === NodeType.PERSON ? '600' : '400'))
      .attr('fill', '#000000')
      .attr('pointer-events', 'none');

    // Render net worth badges for family members who have a defined net worth next to their icon
    const netWorthNodes = node.filter((d) => d.type === NodeType.PERSON && !!d.netWorth);

    const netWorthBadge = netWorthNodes.append('g')
      .attr('class', 'net-worth-badge')
      .attr('transform', 'translate(22, -20)');

    netWorthBadge.append('rect')
      .attr('x', -19)
      .attr('y', -8)
      .attr('width', 38)
      .attr('height', 16)
      .attr('rx', 4)
      .attr('fill', '#0F172A')
      .attr('stroke', '#FFFFFF')
      .attr('stroke-width', 1.5);

    netWorthBadge.append('text')
      .text((d) => d.netWorth || '')
      .attr('x', 0)
      .attr('y', 3.5)
      .attr('text-anchor', 'middle')
      .attr('font-size', '8px')
      .attr('font-family', 'JetBrains Mono, monospace')
      .attr('font-weight', '700')
      .attr('fill', '#FFFFFF')
      .attr('pointer-events', 'none');

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    svg.on('click', () => onNodeClick(null));

    return () => simulation.stop();
  }, [dimensions, data, selectedNode, onNodeClick]);

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden bg-[#FFF0F3] cursor-grab active:cursor-grabbing">
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 p-4">
        <h1 className="text-white font-serif italic text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight text-center leading-none max-w-2xl select-none">
          The Kardashians family
        </h1>
      </div>
      
      <svg ref={svgRef} className="w-full h-full relative z-1" />
      
      {/* Legend */}
      <div className="absolute top-4 left-4 flex flex-col gap-3.5 pointer-events-auto p-3.5 bg-white/75 backdrop-blur-md rounded-2xl border border-white/50 shadow-md overflow-y-auto max-h-[calc(100%-2rem)] w-[240px] sm:w-[260px] cursor-default select-none z-10 transition-all">
        {/* Section 1: Adult Family Members */}
        <div className="flex flex-col gap-1.5">
          <div className="text-[9px] font-black uppercase tracking-widest text-brand-stone border-b border-black/5 pb-1 mb-1 flex items-center justify-between">
            <span>✦ ODRASLI ČLANOVI</span>
            <span className="opacity-40 text-[7px]">IKONA & NW</span>
          </div>
          
          <div className="flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-brand-stone shrink-0" viewBox="-12 -16 24 30" fill="currentColor">
              <path d="M -12,11 C -12,4.5 -6.5,1.5 0,1.5 C 6.5,1.5 12,4.5 12,11 L 12,14 L -12,14 Z M 0,-4.5 A 5.5,5.5 0 1,0 0,-15.5 A 5.5,5.5 0 1,0 0,-4.5" />
            </svg>
            <span className="text-[10px] font-medium text-brand-stone/80">Roditelji / Odrasli</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-6 h-4 bg-[#0F172A] border border-white rounded-md flex items-center justify-center shrink-0 shadow-sm">
              <span className="text-[7px] text-white font-mono font-black leading-none">$M</span>
            </div>
            <span className="text-[10px] font-medium text-brand-stone/80">Neto vrijednost (NW)</span>
          </div>

          <div className="grid grid-cols-1 gap-1.5 mt-1 border-t border-black/5 pt-1.5">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#000000] border border-[#000000] shrink-0" />
              <span className="text-[9px] font-medium text-black">The Momager (Kris)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#B91C1C] border border-[#7F1D1D] shrink-0" />
              <span className="text-[9px] font-medium text-[#7F1D1D]">Kim & Obitelj</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#DB2777] border border-[#9D174D] shrink-0" />
              <span className="text-[9px] font-medium text-[#9D174D]">Kylie & Obitelj</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#F97316] border border-[#9A3412] shrink-0" />
              <span className="text-[9px] font-medium text-[#9A3412]">Kendall</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#EAB308] border border-[#854D0E] shrink-0" />
              <span className="text-[9px] font-medium text-[#854D0E]">Khloé & Obitelj</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#7C5295] border border-[#4B2C5E] shrink-0" />
              <span className="text-[9px] font-medium text-[#4B2C5E]">Kourtney & Obitelj</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#2563EB] border border-[#1E3A8A] shrink-0" />
              <span className="text-[9px] font-medium text-[#1E3A8A]">Rob & Obitelj</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#6B7280] border border-[#374151] shrink-0" />
              <span className="text-[9px] font-medium opacity-70">Robert Sr. (Otac)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF2D55] border border-[#E01E44] shrink-0" />
              <span className="text-[9px] font-medium opacity-70">Caitlyn Jenner</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#D5BDAF] border border-[#A68A7B] shrink-0" />
              <span className="text-[9px] font-medium opacity-60">Ostali članovi</span>
            </div>
          </div>
        </div>

        {/* Section 2: Children */}
        <div className="flex flex-col gap-1.5">
          <div className="text-[9px] font-black uppercase tracking-widest text-brand-stone border-b border-black/5 pb-1 mb-1">
            <span>✦ DJECA (MLAĐI NARAŠTAJ)</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-2.5 h-2.5 text-brand-stone shrink-0" viewBox="-12 -16 24 30" fill="currentColor">
              <path d="M -12,11 C -12,4.5 -6.5,1.5 0,1.5 C 6.5,1.5 12,4.5 12,11 L 12,14 L -12,14 Z M 0,-4.5 A 5.5,5.5 0 1,0 0,-15.5 A 5.5,5.5 0 1,0 0,-4.5" />
            </svg>
            <span className="text-[10px] font-semibold text-brand-stone/80">Svi unuci obitelji (Manji)</span>
          </div>
        </div>

        {/* Section 3: Brands and Industries */}
        <div className="flex flex-col gap-1.5">
          <div className="text-[9px] font-black uppercase tracking-widest text-brand-stone border-b border-black/5 pb-1 mb-1 flex items-center justify-between">
            <span>✦ UTJECAJ NA INDUSTRIJU / BRENDOVI</span>
            <span className="opacity-45 text-[7px]">KRUG</span>
          </div>
          <p className="text-[8.5px] text-brand-stone/70 leading-normal italic mb-1">
            Milijunski brendovi i inovacije u modi, kozmetici i marketingu. Kliknite pojedinu osobu za detaljan prikaz njihovog utjecaja!
          </p>
          <div className="grid grid-cols-1 gap-1.5">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FEE2E2] border border-[#FCA5A5] shrink-0" />
              <span className="text-[9px] font-medium text-brand-stone/85">SKIMS / SKKN (Kim)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FCE7F3] border border-[#F9A8D4] shrink-0" />
              <span className="text-[9px] font-medium text-brand-stone/85">Kylie Brands (Kozmetika)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFEDD5] border border-[#FED7AA] shrink-0" />
              <span className="text-[9px] font-medium text-brand-stone/85">818 Tequila (Kendall)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FEF9C3] border border-[#FEF08A] shrink-0" />
              <span className="text-[9px] font-medium text-brand-stone/85">Good American (Khloé)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#EBE4F5] border border-[#C8B6E2] shrink-0" />
              <span className="text-[9px] font-medium text-brand-stone/85">Poosh / Lemme (Kourt)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#DBEAFE] border border-[#BFDBFE] shrink-0" />
              <span className="text-[9px] font-medium text-brand-stone/85">Arthur George (Rob)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#F5EBE0] border border-[#CCC] shrink-0" />
              <span className="text-[9px] font-medium text-brand-stone/70">Ostali brendovi</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#EDEDED] border border-[#DDD] shrink-0 ml-0.5" />
              <span className="text-[9px] font-medium text-brand-stone/60">Tržišne industrijske grane</span>
            </div>
          </div>
        </div>

        {/* Section 4: Humanitarian and Activism */}
        <div className="flex flex-col gap-1.5">
          <div className="text-[9px] font-black uppercase tracking-widest text-brand-stone border-b border-black/5 pb-1 mb-1 flex items-center justify-between">
            <span>✦ HUMANITARNOST & UTJECAJ</span>
            <span className="px-1 py-0.5 bg-brand-stone/10 text-[7px] font-bold text-brand-stone rounded">KOCKA</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-brand-stone rounded-xs shrink-0" />
            <span className="text-[10px] font-semibold text-brand-stone/90">Aktivistički rad (Kocka)</span>
          </div>

          <div className="grid grid-cols-1 gap-1.5 mt-1 border-t border-black/5 pt-1.5">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-xs bg-[#FF10F0] border border-[#00FFFF] shrink-0" />
              <span className="text-[9px] font-medium text-brand-stone/85">Kylie Advocacy / Smile Train</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-xs bg-[#FF5F1F] border border-[#39FF14] shrink-0" />
              <span className="text-[9px] font-medium text-brand-stone/85">Kendall Charity / Water</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-xs bg-[#FAFF00] border border-[#000000] shrink-0" />
              <span className="text-[9px] font-medium text-brand-stone/85">Khloé Cyberbullying & dječji domovi</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-xs bg-[#FF00FF] border border-[#00FFFF] shrink-0" />
              <span className="text-[9px] font-medium text-brand-stone/85">Wellness regulativa (Kourtney)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-xs bg-[#FF3131] border border-[#39FF14] shrink-0" />
              <span className="text-[9px] font-medium text-brand-stone/85">Reforma Pravosuđa (Kim)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF91A4] border border-[#FF69B4] shrink-0" />
              <span className="text-[9px] font-medium text-brand-stone/85">Kulturološki Utjecaj (Krug)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFCDCD] border border-[#FF7F7F] shrink-0" />
              <span className="text-[9px] font-medium text-brand-stone/85">Kimoji & Mirisi (Krug)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FEF9C3] border border-[#FACC15] shrink-0" />
              <span className="text-[9px] font-medium text-brand-stone/85">Khloud & Podcast (Krug)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full border border-black shrink-0" style={{ background: 'linear-gradient(135deg, #FAFF00 0%, #FF3131 50%, #FF00FF 100%)' }} />
              <span className="text-[9px] font-medium text-brand-stone/85">Zajednički brend DASH (Krug)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkGraph;
