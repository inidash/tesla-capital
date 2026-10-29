<?php
namespace App\Http\Requests;




// use App\Models\InvestmentPlan;
// use Illuminate\Foundation\Http\FormRequest;
// use Illuminate\Validation\Validator;

// class StoreInvestmentRequest extends FormRequest
// {
//     public function authorize(): bool
//     {
//         return $this->user() !== null;
//     }

//     public function rules(): array
//     {
//         return [
//             'investment_plan_id' => 'required|integer|exists:investment_plans,id',
//             'amount' => 'required|integer|min:1',
//         ];
//     }

//     public function withValidator(Validator $validator): void
//     {
//         $validator->after(function (Validator $validator) {
//             $planId = $this->input('investment_plan_id');

//             if (! $planId) {
//                 return;
//             }

//             $plan = InvestmentPlan::find($planId);

//             if (! $plan || ! $plan->is_active) {
//                 $validator->errors()->add(
//                     'investment_plan_id',
//                     'This plan is not currently accepting investments.'
//                 );

//                 return;
//             }

//             $amount = (int) $this->input('amount');

//             if (! $plan->isAmountAllowed($amount)) {
//                 $min = number_format($plan->min_amount);

//                 $max = $plan->max_amount !== null
//                     ? number_format($plan->max_amount)
//                     : null;

//                 $message = $max !== null
//                     ? "Amount must be between \${$min} and \${$max}."
//                     : "Amount must be at least \${$min}.";

//                 $validator->errors()->add(
//                     'amount',
//                     $message
//                 );
//             }
//         });
//     }
// }


use Illuminate\Foundation\Http\FormRequest;

class StoreInvestmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check();
    }

    public function rules(): array
    {
        return [
            'investment_plan_id' => [
                'required',
                'integer',
                'exists:investment_plans,id',
            ],

            'amount' => [
                'required',
                'numeric',
                'min:0.01',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'investment_plan_id.required' =>
                'Please select an investment plan.',

            'investment_plan_id.exists' =>
                'The selected investment plan does not exist.',

            'amount.required' =>
                'Please enter an investment amount.',

            'amount.numeric' =>
                'Investment amount must be a valid number.',

            'amount.min' =>
                'Investment amount must be greater than zero.',
        ];
    }
}