<?php

namespace App\Console\Commands;
use App\Http\Controllers\MailController;
use Illuminate\Console\Command;

class SendEmails extends Command
{
  /**
   * The name and signature of the console command.
   *
   * @var string
   */
  protected $signature = 'app:send-emails';

  /**
   * The console command description.
   *
   * @var string
   */
  protected $description = 'Send mails';

  /**
   * Execute the console command.
   */
  public function handle()
  {
    (new MailController())->sendMail();
  }
}
