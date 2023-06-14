import {  Materiais } from "./materiais";

export interface Destino {
    id:Number,
    sedeId: Number,
    materiaisQntdSetor:Materiais []
    status:{
        confirmacao:string
    }
    nomeSede:String
}