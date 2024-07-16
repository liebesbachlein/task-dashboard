<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserAccountController extends Controller
{
    public function index() {
        return view('app');
    }

    public function login(Request $request) {
        
        $validated = $request->validate([ 
            'email' => ['required', 'max: 255'],
            'password' => ['required', 'min:5', 'max: 40']
        ]);

        if (auth()->guard('web')->attempt(['email'=>$validated['email'], 'password'=>$validated['password']])) {
            //$request->session()->regenerate();
            return response(status: 200);
        } 

        return response(status: 501);
    }

    public function logout(Request $request) {
        auth()->guard('web')->logout();
    }
}
