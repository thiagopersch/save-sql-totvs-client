"use client";

import readRecord from "@/hooks/readRecord";
import Editor from "@monaco-editor/react";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type SentencaProps = {
  codColigada: string;
  codSentenca: string;
  codSistema: string;
  sentenca: string;
  dataServerName: string;
  contexto: string;
  username: string;
  password: string;
  tbc: string;
};

export default function Home() {
  const [data, setData] = useState<SentencaProps>();
  const { register, handleSubmit } = useForm<SentencaProps>({
    defaultValues: {
      codColigada: "0",
      codSistema: "S",
      codSentenca: "RB.PS.IM.005",
      contexto: "CODCOLIGADA=1;CODFILIAL=1;CODSISTEMA=S;CODTIPOCURSO=1",
      dataServerName: "GlbConsSqlData",
      username: "inscricaomatricula",
      password: "inscricaomatricula",
    },
  });

  const handleReadRecord: SubmitHandler<SentencaProps> = async (
    formData: SentencaProps
  ) => {
    const {
      codColigada,
      codSentenca,
      codSistema,
      contexto,
      dataServerName,
      password,
      sentenca,
      username,
      tbc,
    } = formData;
    const primaryKey = `${codColigada};${codSistema};${codSentenca}`;

    try {
      const result = await readRecord(
        dataServerName,
        primaryKey,
        contexto,
        username,
        password,
        tbc
      );
      const gConsSql = result.GlbConsSql.GConsSql[0];
      const codColigada = gConsSql.CODCOLIGADA[0];
      const codSentenca = gConsSql.CODSENTENCA[0];
      const sentenca = gConsSql.SENTENCA[0];

      setData({
        codColigada,
        codSistema,
        codSentenca,
        contexto,
        sentenca,
        dataServerName,
        password,
        username,
        tbc,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <main className="flex w-screen flex-col flex-wrap items-center justify-between p-16">
      <form
        onSubmit={handleSubmit(handleReadRecord)}
        className="w-full flex flex-col gap-3"
      >
        <Box className="flex gap-3">
          <TextField
            type="text"
            id="codColigada"
            label="Código da Coligada"
            variant="filled"
            {...register("codColigada")}
            fullWidth
            required
          />
          <TextField
            type="text"
            id="codSistema"
            label="Código do Sistema"
            variant="filled"
            {...register("codSistema")}
            required
            fullWidth
          />
          <TextField
            type="text"
            id="codSentenca"
            label="Código da Sentença"
            variant="filled"
            {...register("codSentenca")}
            required
            fullWidth
          />
        </Box>
        <Box className="flex gap-3">
          <TextField
            type="text"
            id="contexto"
            label="Contexto"
            variant="filled"
            {...register("contexto")}
            required
            fullWidth
          />
          <TextField
            type="text"
            id="dataServerName"
            label="DataServer"
            variant="filled"
            {...register("dataServerName")}
            required
            fullWidth
          />
        </Box>
        <Box className="w-full flex gap-3">
          <TextField
            type="text"
            id="tbc"
            label="TBC"
            variant="filled"
            {...register("tbc")}
            placeholder="Ex: http://localhost:8051/"
            helperText="É importante a barra no final da url para o endpoint der sucesso!"
            required
            fullWidth
          />
          <TextField
            type="text"
            id="username"
            label="Usuário"
            variant="filled"
            {...register("username")}
            required
            fullWidth
          />
          <TextField
            type="text"
            id="password"
            label="Senha"
            variant="filled"
            {...register("password")}
            required
            fullWidth
          />
        </Box>
        <Button color="primary" variant="contained" size="large" type="submit">
          Buscar
        </Button>
      </form>
      {data && (
        <Editor
          height="75vh"
          language="sql"
          defaultLanguage="sql"
          theme="vs-dark"
          value={data.sentenca}
          options={{ readOnly: true }}
          className="w-full mb-2 p-2 rounded"
        />
      )}
    </main>
  );
}
