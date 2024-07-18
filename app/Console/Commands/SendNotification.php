<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use Carbon\Carbon;
use App\Models\Event;
use App\Models\MenuItem;
use App\Models\Notification;
use App\Http\Controllers\MailController;
use App\Http\Controllers\NotificationMailController;

class SendNotification extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:send-notification';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send test notification mails';

    /**
     * Execute the console command.
     */
    public function handle() {
    $notifications = Notification::all();

    foreach ($notifications as $notification) {
      $event = Event::find($notification->event_id);
      $dateUntil = Carbon::parse($event->until);
      if (Carbon::now()->addDays(1) >= $dateUntil && !$notification->isOneDayChecked) {
          $emailData = [];
          $emailData['email'] = $notification->email;
          $emailData['text'] = ''; 
          $menuItem = MenuItem::find($event->menu_item_id);
          $introText = "Через 1 день истечет срок события:";
          if ($menuItem->name == $event->name) {
            $emailData['text'] = "$introText $event->name (в {$dateUntil->format('Y-m-d H:i:s')})";
          } else {
            $emailData['text'] = "$introText $menuItem->name $event->name (в {$dateUntil->format('Y-m-d H:i:s')})";
          }

          try {
            //(new NotificationMailController())->sendMail($emailData);
            
          } catch (\Throwable $th) {
            throw $th;
            return;
          } 

          /*$newNotification = $notification->toArray();
          $newNotification['isOneDayChecked'] = true;
          $newNotification['isThreeDaysChecked'] = true;
          $newNotification['isOneWeekChecked'] = true;
          $newNotification['isOneMonthChecked'] = true;*/
          Notification::destroy($notification->id);
          
      } else if (Carbon::now()->addDays(3) >= $dateUntil && !$notification->isThreeDayChecked) {
        $emailData = [];
        $emailData['email'] = $notification->email;
        $emailData['text'] = ''; 
        $menuItem = MenuItem::find($event->menu_item_id);
        $introText = "Через 3 дня истечет срок события:";
        if ($menuItem->name == $event->name) {
          $emailData['text'] = "$introText $event->name (в $event->until)";
        } else {
          $emailData['text'] = "$introText $menuItem->name $event->name (в $event->until)";
        }
        try {
          (new NotificationMailController())->sendMail($emailData);
          
        } catch (\Throwable $th) {
          throw $th;
          return;
        }  
        $newNotification = $notification->toArray();
        $newNotification['isThreeDaysChecked'] = true;
        $newNotification['isOneWeekChecked'] = true;
        $newNotification['isOneMonthChecked'] = true;

        Notification::find($notification->id)->update($newNotification);
        
    } else if (Carbon::now()->addWeek() >= $dateUntil && !$notification->isOneWeekChecked) {
      $emailData = [];
        $emailData['email'] = $notification->email;
        $emailData['text'] = ''; 
        $menuItem = MenuItem::find($event->menu_item_id);
        $introText = "Через 1 неделю истечет срок события:";
        if ($menuItem->name == $event->name) {
          $emailData['text'] = "$introText $event->name (в $event->until)";
        } else {
          $emailData['text'] = "$introText $menuItem->name $event->name (в $event->until)";
        }
        try {
          (new NotificationMailController())->sendMail($emailData);
          
        } catch (\Throwable $th) {
          throw $th;
          return;
        } 

        $newNotification = $notification->toArray();
        $newNotification['isOneWeekChecked'] = true;
        $newNotification['isOneMonthChecked'] = true;

        Notification::find($notification->id)->update($newNotification);

      } else if (Carbon::now()->addMonths(1) >= $dateUntil && !$notification->isOneMonthChecked) {
        $emailData = [];
        $emailData['email'] = $notification->email;
        $emailData['text'] = ''; 
        $menuItem = MenuItem::find($event->menu_item_id);
        $introText = "Через 1 месяц истечет срок события:";
        if ($menuItem->name == $event->name) {
          $emailData['text'] = "$introText $event->name (в $event->until)";
        } else {
          $emailData['text'] = "$introText $menuItem->name $event->name (в $event->until)";
        }

        try {
          (new NotificationMailController())->sendMail($emailData);
          
        } catch (\Throwable $th) {
          throw $th;
          return;
        } 
        
        $newNotification = $notification->toArray();
        $newNotification['isOneMonthChecked'] = true;

        Notification::find($notification->id)->update($newNotification);
      } 
    }
}
}
