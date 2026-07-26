"use client";


import { useCallback, useState } from "react";
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
import { evaluateDiagram } from "@/lib/api";

export default function Home() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [evaluation, setEvaluation] = useState<any>(null);

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

  const handleEvaluate = async () => {
    try {
      const diagram = {
        nodes: nodes.map((node) => ({
          id: node.id,
          data: {
            label: String(node.data.label),
          },
        })),
        edges: edges.map((edge) => ({
          id: edge.id,
          source: edge.source,
          target: edge.target,
        })),
      };

      console.log("Sending Diagram:", diagram);

      const result = await evaluateDiagram(diagram);

      setEvaluation(result);
    } catch (error) {
      console.error("Evaluation failed:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="mx-auto max-w-7xl px-8 py-10">
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-900">
          SysArchitect.ai
        </h1>

        <p className="mt-3 text-lg text-slate-500">
          AI-Powered System Design Interview Evaluator
        </p>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-800">
            Interview Question
          </h2>

          <p className="mt-3 text-xl font-medium text-slate-700">
            Design a URL Shortener
          </p>

          <button
            onClick={handleEvaluate}
            className="mt-8 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:scale-105"
          >
            Evaluate Architecture
          </button>
        </div>

        <div className="mt-10 flex items-start gap-8">
          <NodePalette onAddNode={addNode} />

          <DiagramCanvas
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
          />
        </div>
        {evaluation && (
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

            <div className="flex items-center justify-between">

              <h2 className="text-3xl font-bold text-slate-900">
                Evaluation Results
              </h2>

              <div className="rounded-xl bg-blue-600 px-6 py-3 text-white shadow">
                <p className="text-xs uppercase tracking-wide">
                  Overall Score
                </p>

                <p className="text-3xl font-bold">
                  {evaluation.overall_score}
                </p>
              </div>

            </div>

            <div className="mt-8">

              <div className="h-3 overflow-hidden rounded-full bg-slate-200">

                <div
                  className="h-full rounded-full bg-blue-600"
                  style={{
                    width: `${evaluation.coverage.coverage_score}%`,
                  }}
                />

              </div>

              <p className="mt-2 text-sm text-slate-500">
                Coverage Score: {evaluation.coverage.coverage_score}%
              </p>

            </div>

            <div className="mt-10 grid grid-cols-3 gap-8">

              <div>

                <h3 className="mb-3 text-lg font-bold text-green-700">
                  Strengths
                </h3>

                <ul className="space-y-2">

                  {evaluation.strengths.map((item: string) => (
                    <li key={item}>
                      ✅ {item}
                    </li>
                  ))}

                </ul>

              </div>

              <div>

                <h3 className="mb-3 text-lg font-bold text-red-700">
                  Weaknesses
                </h3>

                <ul className="space-y-2">

                  {evaluation.weaknesses.map((item: string) => (
                    <li key={item}>
                      ❌ {item}
                    </li>
                  ))}

                </ul>

              </div>

              <div>

                <h3 className="mb-3 text-lg font-bold text-orange-700">
                  Missing Concepts
                </h3>

                <ul className="space-y-2">

                  {evaluation.missing_concepts.map((item: string) => (
                    <li key={item}>
                      ⚠️ {item}
                    </li>
                  ))}

                </ul>

              </div>

            </div>

          </div>
        )}
      </div>
    </main>
  );
}

