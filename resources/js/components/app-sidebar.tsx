import { Link, usePage } from '@inertiajs/react';
import { ArrowDownLeft, BadgeDollarSign, BookOpen, ChartNoAxesCombined, Dice1Icon, DollarSign, DownloadCloudIcon, DownloadIcon, FolderGit, FolderGit2, Landmark, LayoutGrid, LucideBadgeDollarSign, ReceiptIcon, Users, Wallet2 } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

const userNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    
    {
        title: 'Investments',
        href: '/investments',
        icon: Landmark
    },
    {
        title: 'Deposit',
        href: '/wallet/deposit',
        icon: DollarSign
    },
    {
        title: 'Transactions',
        href: '/transactions',
        icon: ChartNoAxesCombined
    },
    // {
    //     title: 'ROI Payout',
    //     href: '/payments',
    //     icon: BadgeDollarSign
    // },
    {
        title: 'Withdrawals',
        href: '/wallet/withdrawals',
        icon: DownloadCloudIcon
    },
    {
        title: 'Profits',
        href: '/profits',
        icon: LucideBadgeDollarSign
    }
];
const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/admin',
        icon: LayoutGrid,
    },
    {
        title: 'Manage Users',
        href: '/admin/users',
        icon: Users,

        
    },
    {
        title: 'Manage Deposits',
        href: '/admin/deposits',
        icon: ArrowDownLeft
    },
    {
    
       title: 'Manage Investment Categories',
       href: '/admin/investment-categories',
        icon: FolderGit2,
    },
    {
        title: 'Manage Investment Plans',
        href: '/admin/plans',
        icon: FolderGit,
    },
    {
        title: 'Manage Investments',
        href: '/admin/investments',
        icon: Landmark,
    },
    {
        title: 'Transactions',
        href: '/admin/transactions',
        icon: ChartNoAxesCombined,
    },
    // {
    //     title: 'ROI Payout',
    //     href: '/admin/payments' ,
    //     icon: LayoutGrid,
    // },
    {
        title: 'Manage Withdrawals',
        href: '/admin/withdrawals',
        icon: DownloadIcon,
    },
    {
        title: 'Manage Profits',
        href: '/admin/profits',
        icon: LucideBadgeDollarSign,
    }
];




export function AppSidebar() {
    const user = usePage().props.auth.user;

    const isAdmin = user.is_admin;

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link
                                href={
                                    isAdmin
                                        ? '/admin'
                                        : dashboard()
                                }
                                prefetch
                            >
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain
                    items={isAdmin ? mainNavItems : userNavItems}
                />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}