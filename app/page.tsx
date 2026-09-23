'use client';

import { useCallback, useMemo, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  type Edge,
  type Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { CloudNode } from '@/components/canvas/CloudNode';
import { ServiceCatalog } from '@/components/sidebar/ServiceCatalog';
import { CostAnalyticsModal } from '@/components/analytics/CostAnalyticsModal';
import { CostHeader } from '@/components/analytics/CostHeader';
import { CloudService, ArchitectureNodeData, CloudRegion, REGION_MULTIPLIERS } from '@/types';
import { CLOUD_SERVICES } from '@/data/cloudCatalog';

const nodeTypes = {
  cloudNode: CloudNode,
};

const defaultEdgeOptions = {
  animated: true,
  style: { stroke: '#22d3ee', strokeWidth: 2 },
};

export default function Workspace() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [monthlyBudget, setMonthlyBudget] = useState<number>(200);
  const [selectedRegion, setSelectedRegion] = useState<CloudRegion>('us-east');
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState<boolean>(false);

  const handleUnitsChange = useCallback(
    (nodeId: string, newUnits: number) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            const nodeData = node.data as ArchitectureNodeData;
            const cost = (nodeData?.service?.costPerUnit || 0) * newUnits;
            return {
              ...node,
              data: {
                ...node.data,
                units: newUnits,
                monthlyCost: cost,
              },
            };
          }
          return node;
        })
      );
    },
    [setNodes]
  );

  const handleAddNode = useCallback(
    (service: CloudService) => {
      const newNodeId = `node-${Date.now()}`;
      const initialUnits = service.defaultUnits || 1;
      const initialCost = service.costPerUnit * initialUnits;

      const newNode: Node = {
        id: newNodeId,
        type: 'cloudNode',
        position: {
          x: 200 + Math.random() * 120,
          y: 150 + Math.random() * 120,
        },
        data: {
          label: service.name,
          service,
          units: initialUnits,
          monthlyCost: initialCost,
          onUnitsChange: handleUnitsChange,
        },
      };
      setNodes((nds) => [...nds, newNode]);
    },
    [setNodes, handleUnitsChange]
  );

  const handleLoadPreset = useCallback(() => {
    if (!CLOUD_SERVICES || CLOUD_SERVICES.length === 0) return;

    const ec2Service = CLOUD_SERVICES.find((s) => s.id === 'aws-ec2') || CLOUD_SERVICES[0];
    const rdsService = CLOUD_SERVICES.find((s) => s.id === 'aws-rds') || CLOUD_SERVICES[1] || CLOUD_SERVICES[0];
    const s3Service = CLOUD_SERVICES.find((s) => s.id === 'aws-s3') || CLOUD_SERVICES[2] || CLOUD_SERVICES[0];

    const presetNodes: Node[] = [
      {
        id: 'node-ec2',
        type: 'cloudNode',
        position: { x: 300, y: 80 },
        data: {
          label: ec2Service.name,
          service: ec2Service,
          units: 2,
          monthlyCost: ec2Service.costPerUnit * 2,
          onUnitsChange: handleUnitsChange,
        },
      },
      {
        id: 'node-rds',
        type: 'cloudNode',
        position: { x: 150, y: 320 },
        data: {
          label: rdsService.name,
          service: rdsService,
          units: 1,
          monthlyCost: rdsService.costPerUnit * 1,
          onUnitsChange: handleUnitsChange,
        },
      },
      {
        id: 'node-s3',
        type: 'cloudNode',
        position: { x: 450, y: 320 },
        data: {
          label: s3Service.name,
          service: s3Service,
          units: 250,
          monthlyCost: s3Service.costPerUnit * 250,
          onUnitsChange: handleUnitsChange,
        },
      },
    ];

    const presetEdges: Edge[] = [
      { id: 'e-ec2-rds', source: 'node-ec2', target: 'node-rds', animated: true, style: { stroke: '#22d3ee', strokeWidth: 2 } },
      { id: 'e-ec2-s3', source: 'node-ec2', target: 'node-s3', animated: true, style: { stroke: '#22d3ee', strokeWidth: 2 } },
    ];

    setNodes(presetNodes);
    setEdges(presetEdges);
  }, [setNodes, setEdges, handleUnitsChange]);

  const handleClearCanvas = useCallback(() => {
    setNodes([]);
    setEdges([]);
  }, [setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            animated: true,
            style: { stroke: '#22d3ee', strokeWidth: 2 },
          },
          eds
        )
      ),
    [setEdges]
  );

  const regionMultiplier = REGION_MULTIPLIERS[selectedRegion]?.multiplier || 1.0;

  const totalCost = useMemo(() => {
    const rawCost = nodes.reduce((sum, node) => {
      const data = node.data as ArchitectureNodeData;
      return sum + (data?.monthlyCost || 0);
    }, 0);
    return rawCost * regionMultiplier;
  }, [nodes, regionMultiplier]);

  return (
    <div className="flex flex-col h-screen w-screen bg-[#070b19] overflow-hidden font-sans">
      <CostHeader
        totalCost={totalCost}
        nodeCount={nodes.length}
        monthlyBudget={monthlyBudget}
        onBudgetChange={setMonthlyBudget}
        selectedRegion={selectedRegion}
        onRegionChange={setSelectedRegion}
        onOpenAnalytics={() => setIsAnalyticsOpen(true)}
      />

      <div className="flex flex-1 overflow-hidden">
        <ServiceCatalog
          onAddNode={handleAddNode}
          onLoadPreset={handleLoadPreset}
          onClearCanvas={handleClearCanvas}
        />

        <main className="flex-1 h-full relative bg-[#070b19]">
          <ReactFlow
             nodes={nodes}
             edges={edges}
             onNodesChange={onNodesChange}
             onEdgesChange={onEdgesChange}
             onConnect={onConnect}
             nodeTypes={nodeTypes as any}
             defaultEdgeOptions={defaultEdgeOptions}
             fitView
>
            <Background color="#1e293b" gap={24} size={1.5} />
            <Controls className="!bg-slate-900/80 !border-slate-800 !text-slate-100 fill-slate-100" />
          </ReactFlow>
        </main>
      </div>

      <CostAnalyticsModal
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
        nodes={nodes}
        totalCost={totalCost}
        regionName={REGION_MULTIPLIERS[selectedRegion]?.name || selectedRegion}
      />
    </div>
  );
}