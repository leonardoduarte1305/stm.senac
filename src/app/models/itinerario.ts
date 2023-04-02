import { Destino } from "./destino";


export interface Itinerario {
    id: Number,
    motoristaId: Number,
    veiculoId: Number,
    destinos: Destino[],
    dataTimeSaida: String,
    dateTimeVolta: String,
    encerrado:String,
    status:String
}