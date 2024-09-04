import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity ("roles", {schema:"public"})
export class Roles {
    @PrimaryGeneratedColumn ({type: "integer", name: "cod_role"} )
    private codRole: number;
    @Column ({type : "varchar", name: "name_role", nullable: false})
    private nameRole : string;
    @Column ({type : "integer", name: "status_role", nullable: false})
    private statusRole : number

    constructor(codR:number, nameR :string, statusR : number){
        this.codRole = codR;
        this.nameRole = nameR;
        this.statusRole = statusR;
    }
}
