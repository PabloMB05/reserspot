import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { PropsWithChildren, useEffect } from "react";
import { toast } from "sonner";
import { useTranslations } from '@/hooks/use-translations';
interface FlashMessages {
  success?: string;
  error?: string;
}

interface PageProps {
  flash: FlashMessages;
  [key: string]: unknown;
}

interface StoreLayoutProps extends PropsWithChildren {
  title: string;
  centerName?: string; // Si se quiere mostrar el nombre del centro como breadcrumb
}

export function StoreLayout({ title, centerName, children }: StoreLayoutProps) {
  const { flash } = usePage<PageProps>().props;
    const { t } = useTranslations();
  useEffect(() => {
    if (flash.success) toast.success(flash.success);
    if (flash.error) toast.error(flash.error);
  }, [flash]);

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      title: t('ui.navigation.items.store'),
      href: "/stores",
    },
  ];

  if (centerName) {
    breadcrumbs.push({
      title: centerName,
      href: "#", // Puedes ajustar esto si existe una ruta a un centro individual
    });
  }

  if (title !== "Tiendas") {
    breadcrumbs.push({
      title,
      href: "#",
    });
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={title} />
      {children}
    </AppLayout>
  );
}
