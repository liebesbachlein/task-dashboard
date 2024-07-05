<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    public function index() {
        return Item::latest()->get();
    }

    public function store(Request $request) {
        $formFields = $request->validate([ 
            'id' => ['required', 'max:255'],
            'name' => ['required', 'max:255'],
            'birth_date' => 'required'
            ]
        );

        Item::create($formFields);
    }    
}
