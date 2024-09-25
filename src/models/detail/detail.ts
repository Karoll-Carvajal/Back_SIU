import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DetailPlace } from "../detail-place/detail-place";

@Entity('details' , {schema : 'public'})
export class Detail {
    @PrimaryGeneratedColumn({ type: "integer", name: "cod_detail" })
    public codDetail : number;
    @Column ({type : "varchar", name: "name_detail", length : 250,nullable: false})
    public nameDetail : string;
    @Column ({type : "text", name: "description_detail", nullable: false})
    public descriptionDetail : string;

    @OneToMany(()=>DetailPlace,(detailPlace)=>detailPlace.detail)
    public detailPlaceM ? : DetailPlace[];

    constructor(cod: number, name : string, description : string  ){
        this.codDetail = cod; 
        this.nameDetail = name;
        this.descriptionDetail = description; 
        
    }
}
