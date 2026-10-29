<?php

// namespace App\Http\Requests;

// use Illuminate\Foundation\Http\FormRequest;

// class StoreDepositRequest extends FormRequest
// {
//     public function authorize(): bool
//     {
//         return $this->user() !== null;
//     }

//     public function rules(): array
//     {
//         return [
//             // Amount is stored in kobo.
//             // $1,000 = 100,000 kobo.
//             'amount' => [
//                 'required',
//                 'integer',
//                 'min:50000',
//                 'max:5000000000',
//             ],
//         ];
//     }

//     public function messages(): array
//     {
//         return [
//             'amount.required' => 'Please enter a deposit amount.',
//             'amount.integer' => 'Deposit amount must be valid.',
//             'amount.min' => 'Minimum deposit is $500.',
//             'amount.max' => 'Maximum deposit is $50,000,000.',
//         ];
//     }
// }

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDepositRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'amount' => [
                'required',
                'numeric',
                'min:500',
                'max:50000000',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'amount.required' =>
                'Please enter a deposit amount.',

            'amount.numeric' =>
                'Deposit amount must be a valid number.',

            'amount.min' =>
                'Minimum deposit is $500.',

            'amount.max' =>
                'Maximum deposit is $50,000,000.',
        ];
    }
}