import React, { useState } from 'react';
import { Zap, MessageSquare, Clock, Plus, GitBranch, MousePointer, Trash2, X, Tag, Save, MoreHorizontal, CheckCircle, AlertCircle } from 'lucide-react';

// --- Types ---
type NodeType = 'trigger' | 'message' | 'delay' | 'condition' | 'tag';

interface AutomationNodeData {
  id: string;
  type: NodeType;
  title: string;
  subtitle: string;
  color: string;
  icon: React.ElementType;
  // For branch nodes
  yesLabel?: string;
  noLabel?: string;
}

// --- Initial Mock Data ---
const INITIAL_NODES: AutomationNodeData[] = [
  {
    id: 'node-1',
    type: 'trigger',
    title: 'Trigger: Added Friend',
    subtitle: 'Source: Any',
    color: 'oak-orange-400',
    icon: Zap,
  },
  {
    id: 'node-2',
    type: 'message',
    title: 'Send: Welcome Message',
    subtitle: 'Template: Greeting_V2',
    color: 'oak-purple-700',
    icon: MessageSquare,
  },
  {
    id: 'node-3',
    type: 'delay',
    title: 'Delay',
    subtitle: 'Wait for 2 hours',
    color: 'blue-500',
    icon: Clock,
  },
];

// --- Sub-Components ---

const NodeIcon: React.FC<{ icon: React.ElementType, color: string }> = ({ icon: Icon, color }) => {
  // Map tailwind classes dynamically or use inline styles for safer dynamic colors if needed
  // For this strict design system, we handle specific known colors
  let bgClass = 'bg-gray-100 text-gray-600';
  if (color.includes('orange')) bgClass = 'bg-oak-orange-400/10 text-oak-orange-400';
  if (color.includes('purple')) bgClass = 'bg-oak-purple-700/10 text-oak-purple-700';
  if (color.includes('blue')) bgClass = 'bg-blue-100 text-blue-600';
  if (color.includes('green')) bgClass = 'bg-green-100 text-green-600';

  return (
    <div className={`p-2 rounded-lg ${bgClass}`}>
      <Icon className="w-5 h-5" />
    </div>
  );
};

const StandardNode: React.FC<{ 
  data: AutomationNodeData; 
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}> = ({ data, onDelete, onEdit }) => (
  <div className="relative group z-10">
    <div 
      onClick={() => onEdit(data.id)}
      className={`w-72 p-4 bg-white rounded-xl shadow-sm border border-gray-200 relative transition-all cursor-pointer
        hover:shadow-md hover:border-oak-purple-700/30 group-hover:scale-[1.02] active:scale-[0.98]
      `}
    >
      <div className="flex items-start space-x-3">
        <NodeIcon icon={data.icon} color={data.color} />
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-gray-800 text-sm truncate">{data.title}</h4>
          <p className="text-xs text-gray-500 mt-1 truncate">{data.subtitle}</p>
        </div>
        {/* Trigger cannot be deleted */}
        {data.type !== 'trigger' && (
             <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                 <button 
                    onClick={(e) => { e.stopPropagation(); onDelete(data.id); }}
                    className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                 >
                     <Trash2 className="w-4 h-4" />
                 </button>
             </div>
        )}
      </div>
    </div>
  </div>
);

const BranchNode: React.FC<{ 
  data: AutomationNodeData;
  onDelete: (id: string) => void; 
}> = ({ data, onDelete }) => (
  <div className="flex flex-col items-center w-full relative z-10 group">
     {/* Main Condition Box */}
     <div className="w-72 p-3 bg-white rounded-xl border border-gray-200 flex items-center justify-between shadow-sm relative z-10">
         <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                <GitBranch className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold text-gray-700">{data.title}</span>
         </div>
         <button 
            onClick={() => onDelete(data.id)}
            className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-opacity opacity-0 group-hover:opacity-100"
         >
             <Trash2 className="w-4 h-4" />
         </button>
     </div>
     
     {/* Connecting Lines for Branch */}
     <div className="relative w-full h-12">
         <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 -translate-x-1/2"></div>
         {/* Horizontal line */}
         <div className="absolute top-6 left-[20%] right-[20%] h-0.5 bg-gray-300"></div>
         {/* Vertical drops */}
         <div className="absolute top-6 left-[20%] h-6 w-0.5 bg-gray-300"></div>
         <div className="absolute top-6 right-[20%] h-6 w-0.5 bg-gray-300"></div>
     </div>

     <div className="flex justify-center w-full space-x-12 px-8">
         {/* YES Path Visual (Static for demo complexity reasons, but implies logic) */}
         <div className="flex flex-col items-center">
             <div className="mb-2"><span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded">YES</span></div>
             <div className="w-48 p-3 bg-white border border-dashed border-gray-300 rounded-lg text-center opacity-70">
                 <p className="text-xs text-gray-400 font-medium">{data.yesLabel || 'Continue Flow'}</p>
             </div>
         </div>

         {/* NO Path Visual */}
         <div className="flex flex-col items-center">
             <div className="mb-2"><span className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-bold rounded">NO</span></div>
             <div className="w-48 p-3 bg-white border border-dashed border-gray-300 rounded-lg text-center opacity-70">
                 <p className="text-xs text-gray-400 font-medium">{data.noLabel || 'End Journey'}</p>
             </div>
         </div>
     </div>
 </div>
);

const AddNodeModal: React.FC<{ 
    isOpen: boolean; 
    onClose: () => void; 
    onSelect: (type: NodeType) => void 
}> = ({ isOpen, onClose, onSelect }) => {
    if (!isOpen) return null;

    const options = [
        { type: 'message', label: 'Send Message', icon: MessageSquare, color: 'text-oak-purple-700', desc: 'Send text, image, or flex message' },
        { type: 'delay', label: 'Time Delay', icon: Clock, color: 'text-blue-600', desc: 'Wait for a set amount of time' },
        { type: 'tag', label: 'Add Tag', icon: Tag, color: 'text-green-600', desc: 'Apply a tag to the user' },
        { type: 'condition', label: 'Condition', icon: GitBranch, color: 'text-gray-600', desc: 'Split flow based on behavior' },
    ];

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-fade-in-down" onClick={onClose}>
            <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-800">Add Step</h3>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full text-gray-500"><X className="w-5 h-5"/></button>
                </div>
                <div className="grid grid-cols-1 gap-3">
                    {options.map((opt) => (
                        <button 
                            key={opt.label}
                            onClick={() => onSelect(opt.type as NodeType)}
                            className="flex items-center p-4 border border-gray-200 rounded-xl hover:border-oak-purple-700 hover:bg-oak-bg transition-all group text-left"
                        >
                            <div className={`p-3 rounded-lg bg-gray-50 group-hover:bg-white ${opt.color}`}>
                                <opt.icon className="w-6 h-6" />
                            </div>
                            <div className="ml-4">
                                <h4 className="font-bold text-gray-800 text-sm group-hover:text-oak-purple-700">{opt.label}</h4>
                                <p className="text-xs text-gray-500 mt-0.5">{opt.desc}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- Main Component ---

const Automation: React.FC = () => {
  const [nodes, setNodes] = useState<AutomationNodeData[]>(INITIAL_NODES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActive, setIsActive] = useState(true);

  const handleDelete = (id: string) => {
      setNodes(prev => prev.filter(n => n.id !== id));
  };

  const handleEdit = (id: string) => {
      // Simulation of editing
      const title = prompt("Edit Step Title:");
      if (title) {
          setNodes(prev => prev.map(n => n.id === id ? { ...n, title } : n));
      }
  };

  const handleAddNode = (type: NodeType) => {
      let newNode: AutomationNodeData = {
          id: `node-${Date.now()}`,
          type,
          title: 'New Step',
          subtitle: 'Click to configure',
          color: 'gray-500',
          icon: MoreHorizontal
      };

      switch(type) {
          case 'message':
              newNode = { ...newNode, title: 'Send: Text Message', subtitle: 'Content not set', color: 'oak-purple-700', icon: MessageSquare };
              break;
          case 'delay':
              newNode = { ...newNode, title: 'Delay', subtitle: 'Wait for 1 hour', color: 'blue-500', icon: Clock };
              break;
          case 'tag':
              newNode = { ...newNode, title: 'Action: Add Tag', subtitle: 'Tag: "Interacted"', color: 'green-600', icon: Tag };
              break;
          case 'condition':
              newNode = { ...newNode, title: 'Check: Clicked Link?', subtitle: 'Yes/No Branch', color: 'gray-600', icon: GitBranch, yesLabel: 'Send Promo', noLabel: 'Exit' };
              break;
      }

      setNodes(prev => [...prev, newNode]);
      setIsModalOpen(false);
  };

  return (
    <div className="h-full flex flex-col bg-oak-bg relative">
      {/* Top Bar */}
      <div className="p-6 px-8 border-b border-gray-200 bg-white flex justify-between items-center shadow-sm z-30 sticky top-0">
         <div>
            <div className="flex items-center space-x-2 mb-1">
                <h1 className="text-2xl font-display font-bold text-oak-purple-700">Welcome Journey</h1>
                <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded border border-gray-200">v1.2</span>
            </div>
            <p className="text-sm text-gray-500">Triggered when a new user adds the Official Account.</p>
         </div>
         <div className="flex space-x-4 items-center">
             <button 
                onClick={() => setIsActive(!isActive)}
                className={`px-4 py-1.5 text-xs font-bold rounded-full flex items-center transition-all border ${isActive ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-500 border-gray-200'}`}
             >
                 <div className={`w-2 h-2 rounded-full mr-2 ${isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                 {isActive ? 'Active' : 'Inactive'}
             </button>
             <button className="flex items-center space-x-2 px-5 py-2.5 bg-oak-purple-700 text-white text-sm font-bold rounded-xl hover:bg-oak-purple-900 transition-all active:scale-95 shadow-lg shadow-oak-purple-700/20">
                 <Save className="w-4 h-4" />
                 <span>Save Changes</span>
             </button>
         </div>
      </div>

      {/* Flow Canvas */}
      <div className="flex-1 overflow-auto p-12 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]">
         <div className="max-w-2xl mx-auto flex flex-col items-center pb-32">
             
             {/* Start Badge */}
             <div className="mb-4 flex flex-col items-center">
                 <div className="px-4 py-1.5 bg-gray-800 text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-md mb-2">Start Journey</div>
                 <div className="h-4 w-0.5 bg-gray-300"></div>
             </div>

             {/* Dynamic Nodes */}
             {nodes.map((node, index) => (
                 <React.Fragment key={node.id}>
                     
                     {/* Node Render */}
                     {node.type === 'condition' ? (
                         <BranchNode data={node} onDelete={handleDelete} />
                     ) : (
                         <StandardNode data={node} onDelete={handleDelete} onEdit={handleEdit} />
                     )}

                     {/* Connector Line (if not last) */}
                     {index < nodes.length && (
                         <div className="h-8 w-0.5 bg-gray-300 my-1 relative">
                             {/* Small Insert Button Idea (Future Enhancement) */}
                         </div>
                     )}
                 </React.Fragment>
             ))}

             {/* Add Node Button (Bottom) */}
             <button 
                onClick={() => setIsModalOpen(true)}
                className="group relative mt-2"
             >
                 <div className="w-12 h-12 bg-white border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center text-gray-400 group-hover:text-oak-purple-700 group-hover:border-oak-purple-700 transition-all shadow-sm group-hover:shadow-md group-hover:scale-110 group-active:scale-95 z-20 relative">
                     <Plus className="w-6 h-6" />
                 </div>
                 <div className="absolute top-14 left-1/2 -translate-x-1/2 text-xs font-bold text-oak-purple-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                     Add Step
                 </div>
             </button>

         </div>
      </div>

      <AddNodeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSelect={handleAddNode} 
      />
    </div>
  );
};

export default Automation;