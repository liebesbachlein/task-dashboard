<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NotificationController extends Controller
{
    public function show($id) {
        return Notification::findOrFail($id);
    }

    public function events($email) {
        return Notification::where("email", '=', $email)->get();
    }

    public function store(Request $request) {

        $validated = $request->validate([ 
            'email' => ['required', 'max:255', 'email'],
            'menu_item_id' => ['required', 'exists:App\Models\MenuItem,id']
            ]
        );

        Notification::create($validated);   
    } 

    public function storeCategory(Request $request) {
        $timestamp = Carbon::now();

        foreach ($request as $record) {

            $validated = $record->validate([ 
                'email' => ['required', 'max:255', 'email'],
                'menu_item_id' => ['required', 'exists:App\Models\MenuItem,id']
                ]
            );
            $validated['created_at'] = $timestamp;
            $validated['updated_at'] = $timestamp;
        }
    }

    public function destroy($id) {
        Notification::destroy($id);
    }
}
