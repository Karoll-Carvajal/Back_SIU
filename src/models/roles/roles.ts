import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user";

@Entity ("roles", {schema:"public"})
export class Roles {
    @PrimaryGeneratedColumn ({type: "integer", name: "cod_role"} )
    public codRole: number;
    @Column ({type : "varchar", name: "name_role", nullable: false})
    public nameRole : string;
    @Column ({type : "integer", name: "status_role",default:1, nullable: false})
    public statusRole : number;

    @ManyToOne (()=> User, (objUser : User ) => objUser.codRoleU)
    public users? : User[]; 

    constructor(codR:number, nameR :string, statusR : number){
        this.codRole = codR;
        this.nameRole = nameR;
        this.statusRole = statusR;
    }

}
