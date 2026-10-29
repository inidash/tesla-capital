
import {
    AlertTriangle,
    CheckCircle2,
    Loader2,
    X,
} from 'lucide-react';
import { ReactNode } from 'react';

type ConfirmationDialogProps = {
    open: boolean;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning' | 'success' | 'primary';
    loading?: boolean;
    children?: ReactNode;
    onConfirm: () => void;
    onCancel: () => void;
};

export default function ConfirmationDialog({
    open,
    title,
    description,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'primary',
    loading = false,
    children,
    onConfirm,
    onCancel,
}: ConfirmationDialogProps) {
    if (!open) {
        return null;
    }

    const variantClasses = {
        danger: 'bg-red-600 hover:bg-red-700',
        warning: 'bg-amber-600 hover:bg-amber-700',
        success: 'bg-emerald-600 hover:bg-emerald-700',
        primary: 'bg-slate-900 hover:bg-slate-800',
    };

    const iconClasses = {
        danger: 'bg-red-100 text-red-600',
        warning: 'bg-amber-100 text-amber-600',
        success: 'bg-emerald-100 text-emerald-600',
        primary: 'bg-slate-100 text-slate-700',
    };

    const Icon =
        variant === 'success'
            ? CheckCircle2
            : variant === 'danger' || variant === 'warning'
              ? AlertTriangle
              : CheckCircle2;

    return (
        <div
            className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget && !loading) {
                    onCancel();
                }
            }}
        >
            <div
                className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
                role="dialog"
                aria-modal="true"
                aria-labelledby="confirmation-dialog-title"
            >
                <div className="p-6">
                    <div className="flex items-start gap-4">
                        <div
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${iconClasses[variant]}`}
                        >
                            <Icon className="h-5 w-5" />
                        </div>

                        <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-4">
                                <h2
                                    id="confirmation-dialog-title"
                                    className="text-lg font-bold text-slate-900"
                                >
                                    {title}
                                </h2>

                                <button
                                    type="button"
                                    onClick={onCancel}
                                    disabled={loading}
                                    className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
                                    aria-label="Close"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                {description}
                            </p>

                            {children && (
                                <div className="mt-4">
                                    {children}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50 p-5 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {cancelText}
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={loading}
                        className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60 ${variantClasses[variant]}`}
                    >
                        {loading && (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        )}

                        {loading ? 'Processing...' : confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}