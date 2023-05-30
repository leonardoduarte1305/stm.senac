export interface RespostaHttp {
    sedeId: number;
    materiaisQntdSetor: {
        materialId: number;
        quantidade: number;
        setorDestino: number;
    }[];
    id: number;
    status: {
        confirmacao: string;
    };
}