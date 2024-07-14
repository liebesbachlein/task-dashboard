<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Event;
use App\Models\MenuItem;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    function store(Request $request) {
        $validated = $request->validate([ 
            'name' => ['required', 'max:255', 'unique:App\Models\Category']
        ]);

        Category::create($validated);
    }

    public function menuItems($id) {
        return MenuItem::orderBy('name')->get()->where("category_id", $id);
    }

    public function index() {
        return Category::orderBy('name')->get();
    }

    public function show($id) {
        return Category::findOrFail($id);
    }

    public function all() {
        $all = [];
        $categories = Category::orderBy('name')->get();

        foreach($categories as $category) {
            $cat_arr = [];
            $cat_arr['category_data'] = $category;
            $menuItems = MenuItem::orderBy('name')->where("category_id", $category->id)->get();
            $menu_arr = [];
            foreach($menuItems as $menuItem) {
                $event_arr = [];
                $event_arr['menu_item_data'] = $menuItem;
                $event_arr['events'] = Event::orderBy('name')->where('menu_item_id', $menuItem->id)->get();
                $menu_arr[] = $event_arr;
            }
            $cat_arr['menu_items'] = $menu_arr;
            $all[] = $cat_arr;
        }

        return $all;
    }

    public function update(Request $request, $id) {
        $validated = $request->validate([ 
            'name' => ['required', 'max:255']
        ]);

        Category::findOrFail($id)->update($validated);
    }

    public function destroy($id) {
        return Category::destroy($id);
    }
}
