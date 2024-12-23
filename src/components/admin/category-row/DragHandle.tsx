import { GripVertical } from "lucide-react";

interface DragHandleProps {
  attributes: any;
  listeners: any;
}

export const DragHandle = ({ attributes, listeners }: DragHandleProps) => {
  return (
    <button
      {...attributes}
      {...listeners}
      className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded"
    >
      <GripVertical className="h-4 w-4 text-gray-400" />
    </button>
  );
};