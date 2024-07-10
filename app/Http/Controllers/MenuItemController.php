<?php

namespace App\Http\Controllers;

use App\Http\Controllers\EventController;
use App\Models\Event;
use App\Models\MenuItem;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;

class MenuItemController extends Controller
{

    public function index() {
        return MenuItem::orderBy('name')->get();
    }

    public function events($id) {
        return Event::orderBy('name')->get()->where("menu_item_id", $id);
    }

    public function show($id) {
        return MenuItem::findOrFail($id);
    }

    function store(Request $request) {

        $menuItem = MenuItem::orderBy('name')->get()->where("route_name", $request['route_name']);

        if ($menuItem) {
            $request["menu_item_id"] = $menuItem[0]->id;

            try {
                (new EventController)->store($request);
    
                return response(status: 200);
            } catch (\Throwable $th) {
                return response(content: 'Error During Appending Event', status: 500);
            }

            return response(content: 'Error During Event Creation', status: 500);
        } else {
            
            try {
                $validated = $request->validate([
                    'name' => ['required', 'max:255'],
                    'route_name' => ['required', 'max:255', 'regex:/^[a-zA-Z0-9-]*$/'],
                    'category_id' => ['required', 'exists:App\Models\Category,id']
                ]);
            } catch (\Throwable $th) {
                return response(content: 'Validation Failed ', status: 422);
            }


            $menuItem = MenuItem::create($validated);

            $request["menu_item_id"] = $menuItem->id;
            
            try {
                (new EventController)->store($request);

                return response(status: 200);
            } catch (\Throwable $th) {
                MenuItem::destroy($menuItem->id);

                return response(content: 'Error During Event Creation', status: 500);
            }
        }
    }


    public function update(Request $request, $id) {
        $validated = $request->validate([
            'name' => ['required', 'max:255'],
            'route_name' => ['required', 'max:255', 'regex:/^[a-zA-Z0-9-]*$/'],
            'category_id' => ['required', 'exists:App\Models\Category,id']
        ]);

        MenuItem::findOrFail($id)->update($validated);
    }

    public function destroy($id) {
        return MenuItem::destroy($id);
    }

}