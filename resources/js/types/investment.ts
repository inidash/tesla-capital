
export interface Wallet {
  available_balance: number; // minor units
  locked_balance: number; // minor units
  currency: string;
}

export interface InvestmentPlan {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  monthly_roi_percentage: string; // decimal string from Laravel
  min_amount: number; // minor units
  max_amount: number | null; // minor units
  duration_months: number;
  is_active: boolean;
}

export interface Investment {
  id: number;
  user_id?: number;
  investment_plan_id?: number;

  plan: InvestmentPlan;

  principal_amount: number; // minor units

  /**
   * ROI percentage locked when the investment was created.
   * Laravel returns decimal columns as strings.
   */
  locked_monthly_roi_percentage: string;

  /**
   * Appended by the Investment model.
   * Calculated from principal_amount and locked_monthly_roi_percentage.
   */
  monthly_roi_amount: number;

  status: 'active' | 'matured' | 'cancelled';

  starts_on: string;
  ends_on: string;
  next_payout_on: string;

  matured_at?: string | null;

  created_at?: string;
  updated_at?: string;

  payments?: Payment[];
  transactions?: Transaction[];

  total_payments?: number;
  paid_payments?: number;
}

export interface Payment {
  id: number;
  investment_id: number;
  transaction_id: number | null;

  amount: number; // minor units
  due_on: string;

  status: 'scheduled' | 'approved' | 'paid' | 'failed' | 'skipped';

  approved_by?: number | null;
  approved_at?: string | null;
  paid_at?: string | null;

  transaction?: Transaction | null;

  created_at?: string;
  updated_at?: string;
}

export interface Transaction {
  id: number;
  reference: string;

  user_id?: number;
  investment_id?: number | null;

  type:
    | 'deposit'
    | 'withdrawal'
    | 'investment_purchase'
    | 'roi_payout'
    | 'refund';

  status:
    | 'pending'
    | 'successful'
    | 'failed'
    | 'reversed';

  amount: number; // minor units

  currency?: string;

  payment_gateway?: string | null;
  gateway_reference?: string | null;

  description: string | null;

  processed_at?: string | null;

  created_at: string;
  updated_at?: string;
}

/**
 * Formats minor units into a display string.
 *
 * Example:
 * 1250000 -> "$12,500.00"
//  */
// export function formatMoney(
//   minorUnits: number,
//   currency = 'USD',
// ): string {
//   const major = minorUnits / 100 ;

//   if (currency === 'USD') {
//     return major.toLocaleString('en-US', {
//       style: 'currency',
//       currency: 'USD',
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     });
//   }

//   return `${currency} ${major.toLocaleString('en-US', {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   })}`;
// }


export function formatMoney(
    amount: number | string,
    currency = 'USD',
): string {
    const value = Number(amount);

    if (!Number.isFinite(value)) {
        return currency === 'USD'
            ? '$0.00'
            : `${currency} 0.00`;
    }

    if (currency === 'USD') {
        return value.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }

    return `${currency} ${value.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;
}