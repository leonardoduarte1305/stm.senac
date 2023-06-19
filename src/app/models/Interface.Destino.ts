export interface RespostaHttp {
    sedeId: number;
    materiaisQntdSetor: {
        materialId: number;
        quantidade: number;
        setorDestino: number;
        nomeMaterial: string;
        nomeSetor: string;
    }[];
    id: number;
    status: {
        confirmacao: string;
    };
    sedeDestino: String;

}