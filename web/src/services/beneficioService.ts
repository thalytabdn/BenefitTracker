import authService from "./authService";

interface ApiResponse {
  success: boolean;
  data: {
    cpf: string;
    beneficios: Beneficio[];
  };
}

export interface Beneficio {
  numero_beneficio: string;
  codigo_tipo_beneficio: string;
}

class BeneficioService {
  getBeneficios = async (cpf: string): Promise<Beneficio[] | undefined> => {
    const numerosCpf = cpf.replace(/\D/g, '');
    try {
      const token = authService.getToken();
      const url = `http://localhost:3001/search?cpf=${numerosCpf}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (response.ok) {
        const data: ApiResponse = await response.json();
        return data.data.beneficios;
      } else {
        console.error("Erro na consulta de benefícios do cpf informado.");
        return undefined;
      }
    } catch (error) {
      console.error("Erro na consulta de benefícios do cpf informado.", error);
      return undefined;
    }
  };
}

export default new BeneficioService();
