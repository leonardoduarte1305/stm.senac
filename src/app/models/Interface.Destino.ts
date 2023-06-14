export interface RespostaHttp {
    sedeId: number;
    materiaisQntdSetor: {
        materialId: number;
        quantidade: number;
        setorDestino: number;
        nomeMaterial: String;
        nomeSetor: String;
    }[];
    id: number;
    status: {
        confirmacao: string;
    };

    sedeDestino: String;
    exibir: boolean

}