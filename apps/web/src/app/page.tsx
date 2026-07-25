"use client";

import { useCallback } from "react";

import {
  addEdge,
  useEdgesState,
  useNodesState,
  type Connection,
  type Edge,
  type Node,
} from "@xyflow/react";

import DiagramCanvas from "@/features/diagram/components/DiagramCanvas";
import NodePalette from "@/features/diagram/components/NodePalette";

export default function Home() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge(connection, eds));
    },
    [setEdges]
  );

  const addNode = (label: string) => {
    const newNode: Node = {
      id: crypto.randomUUID(),
      type: "default",
      position: {
        x: 100 + Math.random() * 250,
        y: 100 + Math.random() * 250,
      },
      data: {
        label,
      },
    };

    setNodes((nds) => [...nds, newNode]);
  };

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl p-8">
        <h1 className="text-4xl font-bold">
          SysArchitect.ai
        </h1>

        <p className="mt-2 text-gray-600">
          AI-Powered System Design Interview Evaluator
        </p>

        <div className="mt-8 rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">
            Interview Question
          </h2>

          <p className="mt-2 text-lg">
            Design a URL Shortener
          </p>
        </div>

        <div className="mt-8 flex gap-6">
          <NodePalette onAddNode={addNode} />

          <DiagramCanvas
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
          />
        </div>
      </div>
    </main>
  );
}