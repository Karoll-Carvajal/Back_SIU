import { Municipality } from 'src/models/municipality/municipality';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity("departaments", {schema:"public"})
export class Departament {
    @PrimaryGeneratedColumn({type:"integer", name:"cod_departamento"})
    public codDepartament: number;

    @Column({type:"varchar", name:"name_departament", length:250, nullable:false}) /* Va nombre de la estructura de bd */
    public nameDepartament: String;
    @OneToMany(()=>Municipality,(municipality)=>municipality.codDepartamentM)
    public municipalitys ? : Municipality[];

    constructor(codDepartament:number, nameDepartament: string, ){
        this.codDepartament = codDepartament;
        this.nameDepartament = nameDepartament;

    }
}

