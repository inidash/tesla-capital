<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreWithdrawalRequest extends FormRequest
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
                'min:1',
            ],

            'method' => [
                'required',
                'string',
                'in:bank_transfer',
            ],

            'account_name' => [
                'required',
                'string',
                'max:255',
            ],

            'account_number' => [
                'required',
                'string',
                'max:50',
            ],

            'bank_name' => [
                'required',
                'string',
                'max:255',
            ],
        ];
    }

    public function attributes(): array
    {
        return [
            'account_name' => 'account name',
            'account_number' => 'account number',
            'bank_name' => 'bank name',
        ];
    }
}