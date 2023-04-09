import { Destino } from "./destino";


export interface Itinerario {
    id: Number,
    motoristaId: Number,
    veiculoId: Number,
    destinos: Destino[],
    datetimeSaida: String,
    datetimeVolta: String,
    encerrado:String,
    status:{
        confirmacao:string
    },
    motorista:string,
    veiculo:string
}
