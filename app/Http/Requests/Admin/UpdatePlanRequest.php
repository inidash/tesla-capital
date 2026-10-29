<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePlanRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->isAdmin() ?? false;
    }

    public function rules(): array
    {
        // Same shape as creation. Kept as a separate class (rather than
        // reusing StorePlanRequest) because update rules diverge quickly
        // in real systems -- e.g. once a plan has active investments you'll
        // likely want to lock duration_months/monthly_roi_percentage from
        // editing here, which wouldn't make sense on create.
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:2000',
            'monthly_roi_percentage' => 'required|numeric|min:0.01|max:100',
            'min_amount' => 'required|integer|min:1',
            'max_amount' => 'nullable|integer|gte:min_amount',
            'duration_months' => 'required|integer|min:1|max:120',
            'is_active' => 'boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'max_amount.gte' => 'The maximum amount must be greater than or equal to the minimum amount.',
        ];
    }
}
