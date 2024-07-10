<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Event extends Model
{
    //use HasFactory;
    protected $table = 'event_table';
    protected $fillable = ['name', 'since', 'until', 'additional_info', 'menu_item_id'];
    
}
