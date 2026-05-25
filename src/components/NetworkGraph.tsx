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
      .attr('fill', (d) => getNodeFill(d))
      .attr('stroke', (d) => getNodeStroke(d))
      .attr('stroke-width', (d) => (selectedNode?.id === d.id ? 3 : 1.5));

    // Render non-person nodes as circles
    node.filter((d) => d.type !== NodeType.PERSON)
      .append('circle')
      .attr('r', (d) => {
        if (d.type === NodeType.COMPANY) return 15;
        return 12;
      })
      .attr('fill', (d) => getNodeFill(d))
      .attr('stroke', (d) => getNodeStroke(d))
      .attr('stroke-width', (d) => (selectedNode?.id === d.id ? 3 : 1.5));

    node.append('text')
      .text((d) => d.id)
      .attr('dy', 35)
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      .attr('font-family', 'Inter, sans-serif')
      .attr('font-weight', (d) => (d.type === NodeType.PERSON ? '600' : '400'))
      .attr('fill', '#000000')
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
    <div ref={containerRef} className="w-full h-full relative overflow-hidden bg-[#FAF9F6] cursor-grab active:cursor-grabbing">
      <svg ref={svgRef} className="w-full h-full" />
      
      {/* Legend */}
      <div className="absolute top-4 left-4 flex flex-col gap-1.5 pointer-events-none p-2.5 bg-white/50 backdrop-blur-md rounded-xl border border-white/50 shadow-sm overflow-y-auto max-h-[calc(100%-2rem)] max-w-[200px] sm:max-w-[240px]">
        <div className="flex items-center gap-2 border-b border-black/5 pb-1 mb-1">
          <svg className="w-3 h-3 text-brand-stone" viewBox="-12 -16 24 30" fill="currentColor">
            <path d="M -12,11 C -12,4.5 -6.5,1.5 0,1.5 C 6.5,1.5 12,4.5 12,11 L 12,14 L -12,14 Z M 0,-4.5 A 5.5,5.5 0 1,0 0,-15.5 A 5.5,5.5 0 1,0 0,-4.5" />
          </svg>
          <span className="text-[9px] font-extrabold uppercase tracking-wider text-brand-stone">OSOBE (ČOVJEČULJAK)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF91A4] border border-[#FF69B4]" />
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#FF69B4]">Cultural Impact</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full border border-black" style={{ background: 'linear-gradient(135deg, #FAFF00 0%, #FF3131 50%, #FF00FF 100%)' }} />
          <span className="text-[9px] font-bold uppercase tracking-wider text-black">DASH</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF8C69] border border-[#FF1493]" />
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#FF8C69]">Kendall + Kylie</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFCDCD] border border-[#FF7F7F]" />
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#B91C1C]">Kimoji & Fragrance</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF10F0] border border-[#00FFFF]" />
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#FF10F0]">Kylie Advocacy</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F1F] border border-[#39FF14]" />
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#FF5F1F]">Kendall Advocacy</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FEF9C3] border border-[#FACC15]" />
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#A16207]">Khloud & Podcast</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FAFF00] border border-[#000000]" />
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#EAB308]">Khloé Advocacy</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF00FF] border border-[#00FFFF]" />
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#FF00FF]">Wellness Advocacy</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF3131] border border-[#39FF14]" />
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#FF3131]">Humanitarian Advocacy</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#000000] border border-[#000000]" />
          <span className="text-[9px] font-medium uppercase tracking-wider opacity-90 text-[black]">The Momager (Kris)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#6B7280] border border-[#374151]" />
          <span className="text-[9px] font-medium uppercase tracking-wider opacity-70">Robert Sr.</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF2D55] border border-[#E01E44]" />
          <span className="text-[9px] font-medium uppercase tracking-wider opacity-70">Caitlyn</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#2563EB] border border-[#1E3A8A]" />
          <span className="text-[9px] font-medium uppercase tracking-wider opacity-70">Rob & Family</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#DBEAFE] border border-[#BFDBFE]" />
          <span className="text-[9px] font-medium uppercase tracking-wider opacity-70">Arthur George</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#EAB308] border border-[#854D0E]" />
          <span className="text-[9px] font-medium uppercase tracking-wider opacity-70">Khloe & Family</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FEF9C3] border border-[#FEF08A]" />
          <span className="text-[9px] font-medium uppercase tracking-wider opacity-70">Good American</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#F97316] border border-[#9A3412]" />
          <span className="text-[9px] font-medium uppercase tracking-wider opacity-70">Kendall</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFEDD5] border border-[#FED7AA]" />
          <span className="text-[9px] font-medium uppercase tracking-wider opacity-70">818 Tequila</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#B91C1C] border border-[#7F1D1D]" />
          <span className="text-[9px] font-medium uppercase tracking-wider opacity-70">Kim & Family</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FEE2E2] border border-[#FCA5A5]" />
          <span className="text-[9px] font-medium uppercase tracking-wider opacity-70">SKIMS / SKKN</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#7C5295] border border-[#4B2C5E]" />
          <span className="text-[9px] font-medium uppercase tracking-wider opacity-70">Kourtney & Family</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#EBE4F5] border border-[#C8B6E2]" />
          <span className="text-[9px] font-medium uppercase tracking-wider opacity-70">Poosh / Lemme</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#DB2777] border border-[#9D174D]" />
          <span className="text-[9px] font-medium uppercase tracking-wider opacity-70">Kylie Family</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FCE7F3] border border-[#F9A8D4]" />
          <span className="text-[9px] font-medium uppercase tracking-wider opacity-70">Kylie Brands</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#D5BDAF] border border-[#A68A7B]" />
          <span className="text-[9px] font-medium uppercase tracking-wider opacity-70">Other Names</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#F5EBE0] border border-[#CCC]" />
          <span className="text-[9px] font-medium uppercase tracking-wider opacity-70">Other Brands</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#EDEDED] border border-[#DDD]" />
          <span className="text-[9px] font-medium uppercase tracking-wider opacity-70">Industries</span>
        </div>
      </div>
    </div>
  );
};

export default NetworkGraph;
