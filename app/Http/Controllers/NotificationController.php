<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Carbon\Carbon;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;

class NotificationController extends Controller
{
    public function show($id) {
        return Notification::findOrFail($id);
    }

    public function events($email) {
        return Notification::where("email", '=', $email)->get();
    }

    public function index() {
        return Notification::all();
    }

    public function emails() {
        $all = Notification::all()->groupBy('email');
        return $all;
    }

    public function store(Request $request) {
        $validated = $request->validate([ 
            'email' => ['required', 'max:255', 'email'],
            'event_id' => ['required', 'exists:App\Models\Event,id']
            ]
        );

        $validated['isOneMonthChecked'] = false;
        $validated['isOneWeekChecked'] = false;
        $validated['isThreeDaysChecked'] = false;
        $validated['isOneDayChecked'] = false;

        $user = User::where("email", '=', $validated['email'])->get();

        if ($user->isNotEmpty()) {
            $validated['user_id'] = $user[0]->id;

            $notifications = Notification::where("email", '=', $validated['email'])->get()->where("event_id", '=', $validated['event_id']);

            if($notifications->isNotEmpty()) {
                return response(status: 422);
            } else {
                Notification::create($validated);  
            } 
        } else {
            
            $userData['email'] = $validated['email'];
            $userData['password'] = bcrypt('12345');
            $newUser = User::create($userData);

            $validated['user_id'] = $newUser->id;

            $notifications = Notification::where("email", '=', $validated['email'])->get()->where("event_id", '=', $validated['event_id']);

            if($notifications->isNotEmpty()) {
                return response(status: 422);
            } else {
                Notification::create($validated);  
            } 
        }
    } 

    public function storeBatch($request) {
        $timestamp = Carbon::now();

        foreach ($request as $record) {

            $validated = $record->validate([ 
                'email' => ['required', 'max:255', 'email'],
                'menu_item_id' => ['required', 'exists:App\Models\MenuItem,id']
                ]
            );
            $validated['created_at'] = $timestamp;
            $validated['updated_at'] = $timestamp;

            Notification::create($validated);   
        }
    }

    public function destroy($id) {
        Notification::destroy($id);
    }

    public function destroyByEmail($email) {
        try {
            $notifications = Notification::where("email", '=', $email)->get();

            foreach ($notifications as $notification) {
                Notification::destroy($notification->id);  
            }

            return response(status: 200);
        } catch (\Throwable $th) {
            return response(status: 500);
        }
    }

}
