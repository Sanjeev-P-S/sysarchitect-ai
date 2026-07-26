"use client";

import { ARCHITECTURE_NODES } from "@/constants/nodeTypes";

type Props = {
  onAddNode: (label: string) => void;
};

export default function NodePalette({ onAddNode }: Props) {
  return (
    <div className="w-72 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-5 text-xl font-bold text-slate-800">
          Architecture Nodes
      </h2>

      <div className="space-y-2">
        {ARCHITECTURE_NODES.map((node) => (
          <button
            key={node}
            onClick={() => onAddNode(node)}
            className="
              w-full
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-3
              text-left
              font-medium
              text-slate-700
              transition-all
              duration-200
              hover:border-blue-500
              hover:bg-blue-50
              hover:text-blue-700
              hover:shadow-sm
            "
          >
            {node}
          </button>
        ))}
      </div>
    </div>
  );
}