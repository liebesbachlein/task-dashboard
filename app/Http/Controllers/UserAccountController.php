<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserAccountController extends Controller
{
    public function index() {
        return view('app');
    }

    public function check(Request $request) {
        if(!($request->user())) {
            return view('app');
        }
    }

    public function login(Request $request) {
        
        $validated = $request->validate([ 
            'email' => ['required', 'max: 255'],
            'password' => ['required', 'min:5', 'max: 40']
        ]);


        if (Auth::guard('web')->attempt(['email'=>$validated['email'], 'password'=>$validated['password']])) {
            
            Auth::guard('web')->login(auth()->guard('web')->user());
            $request->session()->regenerate();
            return response(status: 200);
        } 

        return response(status: 501);
    }

    public function logout(Request $request) {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
    }

    public function me(Request $request) {
     
        $id = auth()->guard('web')->user()->id;
        
        return response(content: $id);
    }
}
