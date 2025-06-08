import { Link } from "@inertiajs/react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";


interface DashboardCardProps {
  title: string;
  description: string;
  href?: string;
  icon: LucideIcon;
  className?: string;
  onClick?: () => void; // ✅ añadimos esto
}

export function DashboardCard({
  title,
  description,
  href,
  icon: Icon,
  className,
  onClick, // ✅ lo recibimos
}: DashboardCardProps) {
  const content = (
    <div
      onClick={onClick}
      className={cn(
        "cursor-pointer border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border p-6 transition-colors hover:bg-muted/50",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <div className="rounded-lg bg-primary/10 p-2">
          <Icon className="h-6 w-6 text-gray-900 dark:text-gray-900" />
        </div>
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );

  return href && !onClick ? <Link href={href}>{content}</Link> : content;
}


