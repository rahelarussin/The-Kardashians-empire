import React, { useState, useMemo } from 'react';
import { DATA, Node, NodeType, RelationType, Link } from './data';
import NetworkGraph from './components/NetworkGraph';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Info, 
  ChevronRight, 
  ExternalLink,
  Instagram,
  Briefcase,
  Users,
  Box,
  TrendingUp,
  X
} from 'lucide-react';

export default function App() {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | NodeType>('all');

  const selectedNode = useMemo(() => {
    return DATA.nodes.find(n => n.id === selectedNodeId) || null;
  }, [selectedNodeId]);

  const filteredNodes = useMemo(() => {
    return DATA.nodes.filter(node => {
      const matchesSearch = node.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab = activeTab === 'all' || node.type === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [searchQuery, activeTab]);

  const nodeRelations = useMemo(() => {
    if (!selectedNodeId) return { incoming: [], outgoing: [] };
    return {
      incoming: DATA.links.filter(l => l.target === selectedNodeId),
      outgoing: DATA.links.filter(l => l.source === selectedNodeId)
    };
  }, [selectedNodeId]);

  return (
    <div className="flex h-screen w-full bg-[#FAF9F6] text-brand-stone selection:bg-brand-clay selection:text-white">
      {/* Sidebar for Navigation & List */}
      <aside className="w-80 border-r border-brand-clay/20 flex flex-col bg-white/50 backdrop-blur-xl z-20">
        <div className="p-8 border-b border-brand-clay/10">
          <h1 className="font-serif text-3xl tracking-tight leading-tight italic font-bold">
            The Empire<br />
            <span className="text-sm font-sans uppercase tracking-[0.2em] font-normal not-italic opacity-60">Network</span>
          </h1>
        </div>

        <div className="p-4 space-y-4 flex-1 overflow-hidden flex flex-col">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40 group-focus-within:opacity-80 transition-opacity" />
            <input 
              type="text" 
              placeholder="Search people, brands..."
              className="w-full bg-brand-clay/10 border-none rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-brand-clay/30 transition-all outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2 p-1 bg-brand-clay/10 rounded-full overflow-x-auto no-scrollbar">
            {(['all', NodeType.PERSON, NodeType.COMPANY, NodeType.INDUSTRY, NodeType.CAUSE] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap px-4 py-1.5 text-[10px] uppercase tracking-widest font-bold rounded-full transition-all ${
                  activeTab === tab 
                    ? 'bg-white text-brand-stone shadow-sm' 
                    : 'text-brand-stone/40 hover:text-brand-stone/60'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="overflow-y-auto flex-1 space-y-1 pr-2">
            {filteredNodes.map(node => (
              <button
                key={node.id}
                onClick={() => setSelectedNodeId(node.id)}
                className={`w-full text-left p-3 rounded-xl flex items-center justify-between group transition-all ${
                  selectedNodeId === node.id 
                    ? 'bg-brand-nude shadow-md shadow-brand-clay/10' 
                    : 'hover:bg-brand-clay/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className={`w-2 h-2 ${node.type === NodeType.CAUSE ? 'rounded-xs' : 'rounded-full'} ${
                      node.isKimKylieImpact ? 'bg-[#FF91A4] border border-[#FF69B4]' :
                    node.isKendallKylie ? 'bg-[#FF8C69] border border-[#FF1493]' :
                      node.isKimLightRed ? 'bg-[#FFCDCD] border border-[#FF7F7F]' :
                      node.isKylieHumanitarian ? 'bg-[#FF10F0] border border-[#00FFFF]' :
                      node.isKendallHumanitarian ? 'bg-[#FF5F1F] border border-[#39FF14]' :
                      node.isKhloeYellow ? 'bg-[#FEF9C3] border border-[#FACC15]' :
                      node.isKhloeHumanitarian ? 'bg-[#FAFF00] border border-black' :
                      node.isKourtneyHumanitarian ? 'bg-[#FF00FF] border border-[#00FFFF]' :
                      node.isKimHumanitarian ? 'bg-[#FF3131] border border-[#39FF14]' :
                      node.isRobert ? 'bg-gray-500' :
                      node.isCaitlyn ? 'bg-[#FF2D55]' :
                      node.isKris ? 'bg-black' :
                      node.isRobProduct ? 'bg-blue-100 border border-blue-300' :
                      node.isRobFamily ? 'bg-blue-600' :
                      node.isKhloeProduct ? 'bg-yellow-100 border border-yellow-300' :
                      node.isKhloeFamily ? 'bg-yellow-500' :
                      node.isKendallProduct ? 'bg-orange-100 border border-orange-300' :
                      node.isKendallFamily ? 'bg-orange-500' :
                      node.isKimProduct ? 'bg-red-100 border border-red-300' :
                      node.isKimFamily ? 'bg-red-600' :
                      node.isKylieProduct ? 'bg-pink-100 border border-pink-300' :
                      node.isKylieFamily ? 'bg-pink-600' :
                      node.isKourtneyProduct ? 'bg-purple-100 border border-purple-300' :
                      node.isKourtneyFamily ? 'bg-purple-800' :
                      node.type === NodeType.PERSON ? 'bg-brand-clay' :
                      node.type === NodeType.COMPANY ? 'bg-brand-nude border border-brand-clay/20' : 'bg-slate-200'
                    }`} 
                    style={node.isDashGradient ? { background: 'linear-gradient(135deg, #FAFF00 0%, #FF3131 50%, #FF00FF 100%)', border: '1px solid black' } : {}}
                  />
                  <span className="text-sm font-medium">{node.id}</span>
                </div>
                <ChevronRight className={`w-4 h-4 opacity-0 group-hover:opacity-40 -translate-x-2 group-hover:translate-x-0 transition-all ${
                  selectedNodeId === node.id ? 'opacity-100 translate-x-0' : ''
                }`} />
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-brand-clay/10 text-[10px] uppercase tracking-widest text-center opacity-40">
          Interactive Map v1.0
        </div>
      </aside>

      {/* Main Graph Area */}
      <main className="flex-1 relative bg-white">
        <NetworkGraph 
          data={DATA} 
          onNodeClick={(node) => setSelectedNodeId(node ? node.id : null)}
          selectedNode={selectedNode}
        />

        {/* Selected Node Overlay/Sidebar */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-96 bg-white shadow-2xl border-l border-brand-clay/20 z-30 flex flex-col"
            >
              <div className="p-8 pb-4 relative">
                <button 
                  onClick={() => setSelectedNodeId(null)}
                  className="absolute top-6 right-6 p-2 hover:bg-brand-clay/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 opacity-40" />
                </button>
                
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] px-2 py-1 bg-brand-clay/10 rounded-full font-bold">
                    {selectedNode.type}
                  </span>
                </div>
                <h2 className="font-serif text-4xl font-bold leading-tight italic">{selectedNode.id}</h2>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-10">
                {/* Outgoing Relations (e.g. founded, parent of) */}
                {nodeRelations.outgoing.length > 0 && (
                  <section>
                    <h3 className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold opacity-40 mb-4">
                      <TrendingUp className="w-3 h-3" /> Influence & Ventures
                    </h3>
                    <div className="space-y-3">
                      {nodeRelations.outgoing.map((link, idx) => (
                        <div key={idx} className="flex items-center justify-between group">
                          <div className="flex flex-col">
                            <span className="text-[10px] opacity-40 capitalize italic font-serif">
                              {link.relation.replace('_', ' ')}
                            </span>
                            <button 
                              onClick={() => setSelectedNodeId(link.target)}
                              className="text-sm font-medium hover:text-brand-clay transition-colors"
                            >
                              {link.target}
                            </button>
                          </div>
                          <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-40 transition-opacity" />
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Incoming Relations (e.g. child of, in industry) */}
                {nodeRelations.incoming.length > 0 && (
                  <section>
                    <h3 className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold opacity-40 mb-4">
                      {selectedNode.type === NodeType.INDUSTRY ? <Briefcase className="w-3 h-3" /> : <Users className="w-3 h-3" />} 
                      {selectedNode.type === NodeType.INDUSTRY ? 'Key Players' : 'Background'}
                    </h3>
                    <div className="space-y-3">
                      {nodeRelations.incoming.map((link, idx) => (
                        <div key={idx} className="flex items-center justify-between group">
                          <div className="flex flex-col">
                            <span className="text-[10px] opacity-40 capitalize italic font-serif">
                              {link.relation.replace('_', ' ')}
                            </span>
                            <button 
                              onClick={() => setSelectedNodeId(link.source)}
                              className="text-sm font-medium hover:text-brand-clay transition-colors"
                            >
                              {link.source}
                            </button>
                          </div>
                          <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-40 transition-opacity" />
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Bio & Achievements Section */}
                <section className="space-y-6">
                  {selectedNode.achievements ? (
                    <div className="space-y-6">
                      {selectedNode.achievements.general && (
                        <div>
                          <h3 className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold opacity-40 mb-2">
                            <Info className="w-3 h-3" /> Općenito
                          </h3>
                          <p className="text-sm leading-relaxed opacity-85 italic font-serif">
                            "{selectedNode.achievements.general}"
                          </p>
                        </div>
                      )}

                      {selectedNode.achievements.industry && (
                        <div className="p-4 bg-brand-clay/5 rounded-2xl border border-brand-clay/15">
                          <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-semibold text-brand-stone/70 mb-2">
                            <Briefcase className="w-3.5 h-3.5 text-brand-clay" /> Utjecaj na Industriju
                          </h4>
                          <p className="text-xs leading-relaxed opacity-80">
                            {selectedNode.achievements.industry}
                          </p>
                        </div>
                      )}

                      {selectedNode.achievements.humanitarian && (
                        <div className="p-4 bg-brand-clay/5 rounded-2xl border border-brand-clay/15">
                          <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-semibold text-brand-stone/70 mb-2">
                            <Users className="w-3.5 h-3.5 text-brand-clay" /> Humanitarnost & Aktivizam
                          </h4>
                          <p className="text-xs leading-relaxed opacity-80">
                            {selectedNode.achievements.humanitarian}
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <h3 className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold opacity-40 mb-3">
                        <Info className="w-3 h-3" /> Detalji
                      </h3>
                      <p className="text-sm leading-relaxed opacity-70">
                        {selectedNode.type === NodeType.PERSON 
                          ? `Član šireg obiteljskog ili poslovnog kruga obitelji Kardashian-Jenner.`
                          : selectedNode.type === NodeType.COMPANY 
                          ? `Istaknuta tvrtka u vlasništvu, partnerstvu ili suosnivačkom odnosu s članovima obitelji Kardashian-Jenner.`
                          : selectedNode.type === NodeType.CAUSE 
                          ? `Dobrotvorna akcija, društveni pokret ili kulturni fenomen potaknut ili podržan djelovanjem ove dinastije.`
                          : `Sektor i tržišna niša u kojoj se prožimaju mediji, moda, ljepota i globalni utjecaj obitelji.`
                        }
                      </p>
                    </div>
                  )}
                </section>
              </div>

              <div className="p-8 border-t border-brand-clay/10 bg-brand-clay/5 space-y-4">
                  <button className="w-full bg-brand-stone text-white py-3 rounded-xl text-sm font-medium hover:bg-brand-stone/90 transition-colors flex items-center justify-center gap-2">
                    <ExternalLink className="w-4 h-4" /> View Brand Portfolio
                  </button>
                  <p className="text-[10px] text-center opacity-30 italic">Data synchronized from archive records.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
