<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Category extends Model
{
    //use HasFactory;

    protected $table = 'category_table';
    protected $fillable = ['name'];

    public function menuItems(): HasMany
    {
        return $this->hasMany(MenuItem::class);
    }    
}
