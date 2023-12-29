import React, { useState } from "react";
import InputMask from "react-input-mask";
import "./Consulta.css";
import beneficioService, { Beneficio } from "../../services/beneficioService";

const Consulta: React.FC = () => {
  const [cpf, setCPF] = useState<string>("");
  const [beneficios, setBeneficios] = useState<Beneficio[] | undefined>(
    undefined,
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const data = await beneficioService.getBeneficios(cpf);

    if (data) {
      setBeneficios(data);
    } else {
      console.log("Não foram encontrados benefícios para o CPF informado.");
      setBeneficios([]);
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Consulta de Benefícios</h2>
        <label>
          CPF:
          <InputMask
            mask="999.999.999-99"
            maskChar="_"
            type="text"
            value={cpf}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCPF(e.target.value)
            }
            className="input"
          />
        </label>
        <br />
        <button type="submit" className="button">
          Consultar
        </button>
      </form>

      {beneficios !== undefined && beneficios.length === 0 && (
        <div className="result-container">
          <p>Nenhum benefício encontrado para o CPF informado.</p>
        </div>
      )}

      {beneficios !== undefined && beneficios.length > 0 && (
        <div className="result-container">
          <h3>Benefícios encontrados:</h3>
          <ul>
            {beneficios.map((beneficio, index) => (
              <li key={index}>
                Número do Benefício: {beneficio.numero_beneficio}, Tipo do
                Benefício: {beneficio.codigo_tipo_beneficio}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Consulta;
