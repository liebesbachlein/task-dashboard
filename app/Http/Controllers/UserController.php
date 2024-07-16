<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function store(Request $request) {

        $validated = $request->validate([ 
            'email' => ['required', 'unique:App\Models\User,email', 'max: 255'],
            'password' => ['required', 'min:5', 'max: 40']
        ]);

        $validated['password'] = bcrypt($validated['password']);
        User::create($validated);
    }
}
