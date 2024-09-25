import { Type } from '@nestjs/common';
import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import { User } from '../user/user';

@Entity("access", {schema : "public"})
export class Access {
    @PrimaryColumn({name: "cod_user", type: "integer", nullable: false})
    public codUser :number;
    @Column ({type : "varchar" , length: 250,name: "name_access", nullable : false})
    public nameAccess : string ;
    @Column ({type : "varchar" , length: 250,name: "password_Access", nullable : false})
    public passwordAccess : string;

    /* One a one */
    @OneToMany (()=> User, (objUser:User) => objUser.access,{
        onDelete : "RESTRICT",
        onUpdate : "CASCADE"
    })
    @JoinColumn({ name: "cod_user", referencedColumnName : "codUser"})
    public codUserU? : User

    constructor(cod: number ,name : string , password : string ){
        this.codUser = cod;
        this.nameAccess = name;
        this.passwordAccess = password;
    }
}
