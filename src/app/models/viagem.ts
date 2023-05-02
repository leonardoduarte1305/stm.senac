export interface Viagem {
    id: Number,
    motoristaId: Number,
    veiculoId: Number,
    destinos: Number[],
    datetimeSaida: string,
    datetimeVolta: string,
    sede: Number
}