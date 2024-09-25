import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DetailPlace } from "../detail-place/detail-place";
import { User } from "../user/user";
import { Municipality } from "../municipality/municipality";


@Entity("places", {schema : 'public'})
export class Places {
    @PrimaryGeneratedColumn({ type: "integer", name: "cod_place" })
    public codPlace : number;
    @Column ({type : "integer", name: "cod_user", nullable: false})
    public codUser : number;
    @Column ({type : "integer", name: "cod_municipality", nullable: false})
    public codMunicipality : number;
    @Column ({type : "varchar", name: "name_place", length : 250,nullable: false})
    public namePlace : string;
    @Column ({type : "json", name: "location_place", nullable: false})
    public locationPlace : JSON;
    @Column ({type : "text", name: "area_place", nullable: null})
    public areaPlace : string;
  
    @ManyToOne(()=> User, (user) => user.place,{
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    })
    @JoinColumn([{name:"cod_user", referencedColumnName: "codUser"}])
    public users ?: User;
    
      @ManyToOne(()=> Municipality, (municipality) => municipality.place,{
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      })
      @JoinColumn([{name:"cod_municipality", referencedColumnName: "codMunicipality"}])
      public municipality ?: Municipality;

    @OneToMany(()=>DetailPlace,(detailPlace)=>detailPlace.place)
    public detailPlaceM ? : DetailPlace[];

    constructor (cod: number, codU : number, codM: number, name : string , location : JSON, area : string ){
        this.codPlace= cod;
        this.codUser = codU;
        this.codMunicipality = codM;
        this.namePlace = name;
        this.locationPlace = location;
        this.areaPlace = area;
    }
    
}
