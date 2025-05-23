import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { useTranslations } from '@/hooks/use-translations';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Book, BookOpen, Building2, Folder, Layers, LayoutGrid, Library, Users, HandHelping, Import, TrendingUp } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems = (t: (key: string) => string): NavItem[] => [
    {
        title: t('ui.navigation.items.dashboard'),
        url: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: t('ui.navigation.items.users'),
        url: '/users',
        icon: Users,
    },
    {
        title: t('ui.navigation.items.floor'),
        url: '/floors',
        icon: Building2,
    },
    {
        title: t('ui.navigation.items.zones'),
        url: '/zones',
        icon: Layers,
    },
    {
        title: t('ui.navigation.items.bookcases'),
        url: '/bookcases',
        icon: Library,
    },
    {
        title: t('ui.navigation.items.books'),
        url: '/books',
        icon: Book,
    },
    {
        title: t('ui.navigation.items.loans'),
        url: '/loans',
        icon: HandHelping,
    },
    {
        title: t('ui.navigation.items.reservations'),
        url: '/reservations',
        icon: Import,
    },
    {
        title: t('ui.navigation.items.ranking'),
        url: '/ranking',
        icon: TrendingUp,
    },
];

const footerNavItems = (t: (key: string) => string): NavItem[] => [
    {
        title: t('ui.navigation.items.repository'),
        url: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: t('ui.navigation.items.documentation'),
        url: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { t } = useTranslations();
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems(t)} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems(t)} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
