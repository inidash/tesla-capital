<?php
namespace App\Actions\Fortify;

// use App\Concerns\PasswordValidationRules;
// use App\Concerns\ProfileValidationRules;
// use App\Models\User;
// use Illuminate\Support\Facades\DB;
// use Illuminate\Support\Facades\Validator;
// use Laravel\Fortify\Contracts\CreatesNewUsers;

// use App\Mail\WelcomeMail;
// use Illuminate\Support\Facades\Mail;


// class CreateNewUser implements CreatesNewUsers
// {
//     use PasswordValidationRules, ProfileValidationRules; 
 
//       /**
//      * Validate and create a newly registered user.
//      *
//      * @param  array<string, string>  $input
//      */
//     public function create(array $input): User
//     {
//         Validator::make($input, [
//             ...$this->profileRules(),
//             'password' => $this->passwordRules(),
//         ])->validate();

//         return DB::transaction(function () use ($input) {
//             $user = User::create([
//                 'name' => $input['name'],
//                 'email' => $input['email'],
//                 'password' => $input['password'],
//             ]);

//             $user->is_admin = false;

//             $user->wallet()->create([
//                 'available_balance' => 0,
//                 'locked_balance' => 0,
//                 'currency' => 'USD',
//             ]);

//             return $user;
//         });
//          /*
//          * Send the welcome email only after the account and wallet
//          * have been successfully created.
//          *
//          * The mail is queued because WelcomeMail implements ShouldQueue.
//          */
//         Mail::to($user->email)
//             ->queue(new WelcomeMail($user));

//         return $user;
//     }
// }



use App\Concerns\PasswordValidationRules;
use App\Concerns\ProfileValidationRules;
use App\Mail\WelcomeMail;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules, ProfileValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            ...$this->profileRules(),
            'password' => $this->passwordRules(),
        ])->validate();

        $user = DB::transaction(function () use ($input) {
            $user = User::create([
                'name' => $input['name'],
                'email' => $input['email'],
                'password' => $input['password'],
                'is_admin' => false,
            ]);

            $user->wallet()->create([
                'available_balance' => 0,
                'locked_balance' => 0,
                'currency' => 'USD',
            ]);

            return $user;
        });

        // Send welcome email after successful account creation.
        Mail::to($user->email)->send(
            new WelcomeMail($user)
        );

        return $user;
    }
}
