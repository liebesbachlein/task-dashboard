<?php

namespace App\Http\Controllers;


use App\Mail\TestMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Http\Controllers\Controller;



class MailController extends Controller
{
    public function index() {

    }
    
    public function sendMail() {
        
        Mail::to('gerardinearmstrong@gmail.com')->send(new TestMail());
    }
}
