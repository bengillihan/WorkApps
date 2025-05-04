import React from 'react';
import { TimeBlock as TimeBlockType } from '../types';
import { formatTime, getTimeDifference } from '../utils/date';
import { Edit, Trash2 } from 'lucide-react';

interface TimeBlockProps {
  timeBlock: TimeBlockType;
  onDelete: (id: string) => void;
  onEdit: (timeBlock: TimeBlockType) => void;
}

const TimeBlock: React.FC<TimeBlockProps> = ({ timeBlock, onDelete, onEdit }) => {
  return (
    <div className="p-4 rounded-lg border border-border bg-card">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className="flex flex-col items-center">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <div className="w-px h-full bg-border" />
            <div className="w-2 h-2 rounded-full bg-primary" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-foreground">
              {timeBlock.title}
            </h3>
            {timeBlock.description && (
              <p className="text-sm text-muted-foreground mt-1">
                {timeBlock.description}
              </p>
            )}
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-sm text-muted-foreground">
                {formatTime(timeBlock.startTime)} - {formatTime(timeBlock.endTime)}
              </span>
              <span className="text-sm text-muted-foreground">
                ({getTimeDifference(timeBlock.startTime, timeBlock.endTime)})
              </span>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(timeBlock)}
            className="p-1 text-muted-foreground hover:text-foreground"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(timeBlock.id)}
            className="p-1 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeBlock; 