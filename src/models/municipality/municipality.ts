import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Departament } from "../departament/departament";
import { join } from "path";

@Entity("municipalities", { schema: "public" })
export class Municipality {
  @PrimaryGeneratedColumn({ type: "integer", name: "cod_municipality" })
  public codMunicipality: number;

  @Column({ type: "varchar", length: 250, name: "name_municipality" })
  public nameMunicipality: string;

  @Column({ type: "integer", name: "capital_municipality" })
  public capital_municipality: number;

  @Column({ type: "integer", name: "cod_departament" })
  public codDepartament: number;

  @ManyToOne(()=> Departament, (departament) => departament.municipalitys,{
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",

  })
  @JoinColumn([{name:"cod_departament", referencedColumnName: "codDepartament"}])
  public codDepartamentM ?: Departament;


  constructor(codMu: number, nom: string, cap: number, cod: number) {
    this.codMunicipality = codMu;
    this.nameMunicipality = nom;
    this.capital_municipality = cap;
    this.codDepartament = cod;
  }
}
