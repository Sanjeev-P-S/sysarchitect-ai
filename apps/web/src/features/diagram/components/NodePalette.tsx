"use client";

import { ARCHITECTURE_NODES } from "@/constants/nodeTypes";

type Props = {
  onAddNode: (label: string) => void;
};

export default function NodePalette({ onAddNode }: Props) {
  return (
    <div className="w-64 rounded-lg border bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">
        Architecture Nodes
      </h2>

      <div className="space-y-2">
        {ARCHITECTURE_NODES.map((node) => (
          <button
            key={node}
            onClick={() => onAddNode(node)}
            className="w-full rounded border p-2 text-left transition hover:bg-slate-100"
          >
            {node}
          </button>
        ))}
      </div>
    </div>
  );
}