<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index() {
        return Event::orderBy('name')->get();
    }

    public function show($id) {
        return Event::findOrFail($id);
    }

    public function update(Request $request, $id) {
        $validated = $request->validate([ 
            'name' => ['required', 'max:255'],
            'since' => ['required', 'date'],
            'until' => ['required', 'date', 'after:since'],
            'additional_info' => 'nullable',
            'menu_item_id' => ['required', 'exists:App\Models\MenuItem,id']
            ]
        );

        Event::findOrFail($id)->update($validated);
    }

    public function store(Request $request) {

        $validated = $request->validate([ 
            'name' => ['required', 'max:255'],
            'since' => ['required', 'date'],
            'until' => ['required', 'date', 'after:since'],
            'additional_info' => 'nullable',
            'menu_item_id' => ['required', 'exists:App\Models\MenuItem,id']
            ]
        );

        Event::create($validated);   
    } 

    public function destroy($id) {
        Event::destroy($id);
    }
}
