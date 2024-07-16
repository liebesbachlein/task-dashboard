<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Notification extends Model
{
    //use HasFactory;

    protected $table = 'notification_table';
    protected $fillable = ['email', 
    'user_id',
    'event_id', 
    'isOneMonthChecked', 
    'isOneWeekChecked', 
    'isThreeDaysChecked', 
    'isOneDayChecked'];
}
