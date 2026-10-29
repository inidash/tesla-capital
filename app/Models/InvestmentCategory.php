<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class InvestmentCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function investmentPlans(): HasMany
    {
        return $this->hasMany(InvestmentPlan::class, 'category_id');
    }
    public function plans(): HasMany
    {
        return $this->hasMany(InvestmentPlan::class, 'category_id');
    }

    protected static function booted(): void
    {
        static::creating(function (InvestmentCategory $category) {
            if (empty($category->slug)) {
                $category->slug = Str::slug($category->name);
            }
        });

        static::updating(function (InvestmentCategory $category) {
            if ($category->isDirty('name')) {
                $category->slug = Str::slug($category->name);
            }
        });
    }
}