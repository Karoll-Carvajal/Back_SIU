import { DepartamentModule } from './departament/departament.module';
import { Module } from '@nestjs/common';
import { MunicipalityModule } from './municipality/municipality.module';
import { RoleModule } from './role/role.module';
import { RouterModule, Routes } from '@nestjs/core';
import { PlacesModule } from './places/places.module';
import { DetailModule } from './detail/detail.module';
import { DetailPlaceModule } from './detail_place/detail_place.module';

const routes: Routes = [
    {
        path: "private",
        children: [
            DepartamentModule,
            MunicipalityModule,
            RoleModule,
            PlacesModule,
            DetailModule,
            DetailPlaceModule
        ]
    }
]
@Module({
    imports: [DepartamentModule,
        MunicipalityModule,
        RoleModule,
        RouterModule.register(routes),
        PlacesModule,
        DetailModule,
        DetailPlaceModule
    ],
    exports:[RouterModule]
})
export class PrivateModule { }
