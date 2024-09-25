import { Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Roles } from "../roles/roles";
import { Access } from "../access/access";
import { Places } from "../places/places";

@Entity("users", { schema: "public" })
export class User {
    @PrimaryGeneratedColumn({ type: "integer", name: "cod_user" })
    public codUser: number;
    @Column ({type : "integer", name: "cod_role", nullable: false})
    public codRole: number;
    @Column ({type : "varchar", name: "name_user", nullable: false})
    public nameUser: string;
    @Column ({type : "date", name: "user_date_of_birth", default : new Date(Date.now())})
    public userDateOfBirth: Date;
    @Column ({type : "varchar", name: "phone_user", nullable: false})
    public phoneUser: string;
    @Column ({type : "integer", name: "gender_user", nullable: false})
    public genderUser : number

    /* Muchos a uno */

    @OneToMany (()=> Roles, (objRole:Roles) => objRole.users,{
        onDelete : "RESTRICT",
        onUpdate : "CASCADE"
    })
    @JoinColumn({ name: "cod_role", referencedColumnName : "codRole"})
    public codRoleU? : Roles;

    @OneToOne(() =>Access, (objAccess: Access) => objAccess.codUserU)
    public access? : Access; 

    @OneToMany(()=>Places,(place)=>place.users)
    public place ? : Places[];
    

    constructor(cod : number, nameUs : string ,  userDate: Date, phone : string, gender: number  ){
        this.codRole = cod;
        this.nameUser =  nameUs;
        this.userDateOfBirth = userDate;
        this.phoneUser = phone;
        this.genderUser = gender; 
    }


}
