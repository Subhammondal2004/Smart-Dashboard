import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  isLoading?: boolean;
}

const StatCard = ({
  icon: Icon,
  label,
  value,
  change,
  changeLabel,
  isLoading
}: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="stat-card"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-muted-foreground text-sm font-medium mb-2">
            {label}
          </p>

          {isLoading ? (
            <div className="h-8 w-24 bg-muted rounded animate-pulse-subtle" />
          ) : (
            <p className="text-3xl font-bold text-foreground">{value}</p>
          )}

          {change !== undefined && (
            <p
              className={`text-xs font-medium mt-2 ${
                change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% {changeLabel || 'vs last month'}
            </p>
          )}
        </div>

        <div className="p-3 bg-accent/10 rounded-lg">
          <Icon className="w-6 h-6 text-accent" />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
