import { RegisterModule } from './register/register.module';
import { Module } from '@nestjs/common';
import { AccessModule } from './access/access.module';
import path from 'path';
import { RouterModule, Routes } from '@nestjs/core';

const routes: Routes = [
    {
        path: "public",
        children: [
            AccessModule,
            RegisterModule
        ]
    }
]
@Module({
    imports: [AccessModule,
        RegisterModule,
        RouterModule.register(routes)
    ],
    exports:[RouterModule]/* Exporta las rutas que mapeamos */
})
export class PublicModule {

}
