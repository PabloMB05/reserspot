import { Link } from "@inertiajs/react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";


interface DashboardCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  className?: string; // ✅ añadimos esto
}

export function DashboardCard({
  title,
  description,
  href,
  icon: Icon,
  className,
}: DashboardCardProps) {
  return (
    <Link
      href={href}
      className={cn(
  "border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border p-6 transition-colors hover:bg-muted/50",
  className
)}
    >
      <div className="flex items-center gap-4">
        <div className="rounded-lg bg-primary/10 p-2">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </Link>
  );
}
