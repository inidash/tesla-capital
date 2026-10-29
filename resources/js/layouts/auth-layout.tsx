import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';
// import AuthSplitLayout from './auth/auth-split-layout';
import SplitScreenLayout from '@/layouts/split-screen-layout';

export default function AuthLayout({
    title = '',
    description = '',
    children,
}: {
    title?: string;
    description?: string;
    children: React.ReactNode;
}) {
    return (
        <SplitScreenLayout title={title} description={description}>
            {children}
        </SplitScreenLayout>
    );
}
