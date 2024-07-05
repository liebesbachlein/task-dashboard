<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $table = 'item_table';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';
    //use HasFactory;
    protected $fillable = ['id', 'name', 'birth_date'];
}
