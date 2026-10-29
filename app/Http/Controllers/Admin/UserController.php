<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(Request $request): Response
    {
        $users = User::query()
            ->withCount([
                'investments',
                'transactions',
            ])
            ->when(
                $request->string('search')->toString(),
                function ($query, $search) {
                    $query->where(function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%");
                    });
                }
            )
            ->when(
                $request->has('admin'),
                function ($query) use ($request) {
                    $query->where(
                        'is_admin',
                        $request->boolean('admin')
                    );
                }
            )
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'filters' => [
                'search' => $request->string('search')->toString(),
                'admin' => $request->has('admin')
                    ? $request->boolean('admin')
                    : null,
            ],
        ]);
    }

    public function show(User $user): Response
    {
        $user->load([
            'wallet',
            'investments.plan',
            'transactions',
        ]);

        return Inertia::render('Admin/Users/Show', [
            'user' => $user,
        ]);
    }

    public function toggleAdmin(
        Request $request,
        User $user
    ): RedirectResponse {
        if ($request->user()->is($user)) {
            return back()->with(
                'error',
                'You cannot remove your own administrator access.'
            );
        }

        $user->update([
            'is_admin' => ! $user->is_admin,
        ]);

        return back()->with(
            'success',
            $user->is_admin
                ? "{$user->name} is now an administrator."
                : "{$user->name} is no longer an administrator."
        );
    }

    public function destroy(
        Request $request,
        User $user
    ): RedirectResponse {
        if ($request->user()->is($user)) {
            return back()->with(
                'error',
                'You cannot delete your own administrator account.'
            );
        }

        $userName = $user->name;

        $user->delete();

        return redirect()
            ->route('admin.users.index')
            ->with(
                'success',
                "{$userName} has been deleted successfully."
            );
    }
}