<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function store(Request $request) {

        $validated = $request->validate([ 
            'email' => ['required', 'unique:App\Models\Admin,email', 'max: 255'],
            'password' => ['required', 'min:5', 'max: 40']
        ]);

        $validated['password'] = bcrypt($validated['password']);
        Admin::create($validated);
    }
}
