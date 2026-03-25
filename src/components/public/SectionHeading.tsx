import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  center = true,
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn(
        'mb-12 md:mb-16',
        center ? 'text-center' : 'text-left',
        className
      )}
    >
      <h2
        className={cn(
          'text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-4',
          light ? 'text-white' : 'text-foreground'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'text-lg md:text-xl max-w-2xl',
            center && 'mx-auto',
            light ? 'text-white/70' : 'text-muted-foreground'
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
