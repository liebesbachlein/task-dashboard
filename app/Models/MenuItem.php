<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class MenuItem extends Model
{
    //use HasFactory;

    protected $table = 'menu_item_table';
    protected $fillable = ['route_name', 'name', 'category_id'];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
