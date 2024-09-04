import { DepartamentModule } from './departament/departament.module';
import { Module } from '@nestjs/common';
import { MunicipalityModule } from './municipality/municipality.module';
import { RoleModule } from './role/role.module';
import { RouterModule, Routes } from '@nestjs/core';

const routes: Routes = [
    {
        path: "private",
        children: [
            DepartamentModule,
            MunicipalityModule,
            RoleModule
        ]
    }
]
@Module({
    imports: [DepartamentModule,
        MunicipalityModule,
        RoleModule,
        RouterModule.register(routes)
    ],
    exports:[RouterModule]
})
export class PrivateModule { }
