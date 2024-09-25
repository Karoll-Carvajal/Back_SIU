import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Places } from "../places/places";
import { Detail } from "../detail/detail";

@Entity("detail_place", {schema : 'public'})
export class DetailPlace {
    @PrimaryGeneratedColumn({ type: "integer", name: "cod_detail_place" })
    public codDetailPlace : number;
    @Column ({type : "integer", name: "cod_detail", nullable: false})
    public codDetail : number;
    @Column ({type : "integer", name: "cod_place", nullable: false})
    public codPlace : number;
    @Column ({type : "text", name: "value_detail_place",nullable: false})
    public valueDetailPlace : string;

    @ManyToOne (() => Places, (places) => places.detailPlaceM,{
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
    
      })
      @JoinColumn([{name:"cod_place", referencedColumnName: "codPlace"}])
      public place ?: Places;
    

    @ManyToOne (() => Detail, (detail) => detail.detailPlaceM,{
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
    
      })
      @JoinColumn([{name:"cod_detail", referencedColumnName: "codDetail"}])
      public detail ?: Detail;


    constructor(cod : number, code : number , codP : number , value : string){
        this.codDetailPlace = cod; 
        this.codDetail = code;
        this.codPlace = codP; 
        this.valueDetailPlace = value; 

    }

}
