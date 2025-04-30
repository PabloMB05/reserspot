import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { cn } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

export default function SettingsLayout({ children }: PropsWithChildren) {
    const { t } = useTranslations();
    const currentPath = window.location.pathname;

    const sidebarNavItems: NavItem[] = [
        {
            title: t('ui.settings.navigation.profile'),
            url: '/settings/profile',
            icon: undefined,
        },
        {
            title: t('ui.settings.navigation.password'),
            url: '/settings/password',
            icon: undefined,
        },
        {
            title: t('ui.settings.navigation.appearance'),
            url: '/settings/appearance',
            icon: undefined,
        },
        {
            title: t('ui.settings.navigation.languages'),
            url: '/settings/languages',
            icon: undefined,
        },
    ];

    return (
        <div className="px-4 py-6 sm:px-6 lg:px-8">
            <Heading 
                title={t('ui.settings.title')} 
                description={t('ui.settings.description')} 
            />

            <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-8">
                <aside className="w-full lg:w-56">
                    <nav className="flex space-x-2 overflow-x-auto pb-2 lg:flex-col lg:space-x-0 lg:space-y-1 lg:pb-0">
                        {sidebarNavItems.map((item) => (
                            <Button
                                key={item.url}
                                size="sm"
                                variant="ghost"
                                asChild
                                className={cn(
                                    'w-full justify-start transition-colors hover:bg-muted/50',
                                    currentPath === item.url 
                                        ? 'bg-muted hover:bg-muted' 
                                        : 'hover:bg-transparent'
                                )}
                            >
                                <Link href={item.url} prefetch>
                                    {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                                    <span className="truncate">{item.title}</span>
                                </Link>
                            </Button>
                        ))}
                    </nav>
                </aside>

                <Separator className="my-6 lg:hidden" />

                <div className="flex-1 lg:max-w-3xl">
                    <section className="space-y-6">{children}</section>
                </div>
            </div>
        </div>
    );
}