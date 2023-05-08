
export interface Itinerario {
    id: Number,
    motoristaId: Number,
    veiculoId: Number,
    destinos: Number[],
    datetimeSaida: String,
    datetimeVolta: String,
    encerrado:String,
    status:{
        confirmacao:string
    },
    motorista:string,
    veiculo:String
    nomeSede:String
    sede:Number
}
