<?php

namespace App\Http\Controllers;

use App\Mail\NotificationMail;
use Illuminate\Support\Facades\Mail;

class NotificationMailController extends Controller
{
    public function sendMail($mailData) {
        Mail::to($mailData['email'])->send(new NotificationMail($mailData['text']));
    }
}
