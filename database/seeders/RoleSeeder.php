<?php

namespace Database\Seeders;

use Domain\Roles\Models\Role;  // Asegúrate de que esta ruta sea correcta
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // $User = Role::create([
        //     'name' => 'admin',
        //     'display_name' => 'Administrador',
        //     'description' => 'Administrador de la aplicación',
        //     'guard_name' => 'web',
        //     'system' => true,
        // ]);
      
        
        $Adminrole = Role::create([
            'name' => 'administrador',
            'display_name' => 'Administrador',
            'description' => 'Administrador de la aplicación',
            'guard_name' => 'web',
            'system' => true,
        ]);
        $Adminrole -> syncPermissions([
            'users.create',
            'users.edit',
            'users.delete',
            'reports.view',
            'reports.export',
            'reports.print',
            'products.view',
            'products.create',
            'products.edit',
            'products.delete',
            'settings.access',
            'settings.modify',
            'users.view',
        ]);

        $Viewerrole = Role::create([
            'name' => 'visualizer',
            'display_name' => 'Visualizador',
            'description' => 'Visualizador de la aplicacion',
            'guard_name' => 'web',
            'system' => true,
        ]);

        $Viewerrole -> syncPermissions([
            'reports.view', 'products.view',
        ]);

        $Editorrole = Role::create([
            'name' => 'Editor',
            'display_name' => 'Usuario',
            'description' => 'Usuario de la aplicacion',
            'guard_name' => 'web',
            'system' => true,
        ]);

        $Editorrole -> syncPermissions([
            'users.view',
            'users.edit',
            'reports.view',
            'products.view',
            'products.create',
            'settings.modify',
        ]);
    }
}
