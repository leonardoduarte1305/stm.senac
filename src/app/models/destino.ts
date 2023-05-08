
export interface Destino {
    id:Number,
    sedeID: Number,
    materiais: {
        materialID: Number,
        quantidade: Number,
        setorDestino: Number
    }
}