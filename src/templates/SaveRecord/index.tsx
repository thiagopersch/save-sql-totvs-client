'use client';

import { saveRecord } from '@/hooks/saveRecord';
import { Editor } from '@monaco-editor/react';
import { TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as S from './styles';

type SentencaProps = {
  codColigada: string;
  codSistema: string;
  codSentenca: string;
  nameSentenca: string;
  sentenca: string;
  dataServerName: string;
  contexto: string;
  username: string;
  password: string;
  tbc: string;
};

const SaveRecord = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const { register, handleSubmit, setValue, watch } = useForm<SentencaProps>({
    defaultValues: {
      codColigada: '',
      codSistema: '',
      codSentenca: '',
      nameSentenca: '',
      sentenca: '',
      contexto: `CODCOLIGADA=1;CODFILIAL=1;CODSISTEMA=S;CODTIPOCURSO=1;CODUSUARIO=inscricaomatricula`,
      dataServerName: 'GlbConsSqlData',
      username: '',
      password: '',
      tbc: '',
    },
  });

  const sentenca = watch('sentenca');
  const handleSaveRecord: SubmitHandler<SentencaProps> = async (
    formData: SentencaProps,
  ) => {
    try {
      setLoading(true);
      const {
        codColigada,
        codSistema,
        codSentenca,
        nameSentenca,
        sentenca,
        contexto,
        dataServerName,
        username,
        password,
        tbc,
      } = formData;

      const result = await saveRecord(
        codColigada,
        codSistema,
        codSentenca,
        nameSentenca,
        sentenca,
        dataServerName,
        contexto,
        username,
        password,
        tbc,
      );

      setLoading(false);
      if (result?.status === 201) {
        setMessage(result.data);
      }

      return result;
    } catch (error) {
      console.error('Erro ao salvar o registro:', error);
    }
  };

  return (
    <S.Wrapper>
      <S.Title variant="h4" color="primary">
        Enviar uma consulta para o TOTVS
      </S.Title>
      <S.Form onSubmit={handleSubmit(handleSaveRecord)}>
        <S.InputSentences>
          <TextField
            type="text"
            id="codColigada"
            label="Código da Coligada"
            variant="filled"
            {...register('codColigada')}
            disabled={loading}
            fullWidth
            required
          />
          <TextField
            type="text"
            id="codSistema"
            label="Código do Sistema"
            variant="filled"
            {...register('codSistema')}
            disabled={loading}
            required
            fullWidth
          />
          <TextField
            type="text"
            id="codSentenca"
            label="Código da Sentença"
            variant="filled"
            {...register('codSentenca')}
            disabled={loading}
            required
            fullWidth
          />
          <TextField
            type="text"
            id="nameSentenca"
            label="Nome da Sentença"
            variant="filled"
            {...register('nameSentenca')}
            disabled={loading}
            required
            fullWidth
          />
        </S.InputSentences>
        <S.InputSentences>
          <TextField
            type="text"
            id="contexto"
            label="Contexto"
            variant="filled"
            {...register('contexto')}
            disabled={loading}
            required
            fullWidth
          />
          <TextField
            type="text"
            id="dataServerName"
            label="DataServer"
            variant="filled"
            {...register('dataServerName')}
            disabled
            aria-readonly={true}
            required
            fullWidth
          />
        </S.InputSentences>
        <S.InputSentences>
          <TextField
            type="text"
            id="tbc"
            label="TBC"
            variant="filled"
            {...register('tbc')}
            placeholder="Ex: http://localhost:8051/"
            disabled={loading}
            required
            fullWidth
          />
          <TextField
            type="text"
            id="username"
            label="Usuário"
            variant="filled"
            {...register('username')}
            disabled={loading}
            required
            fullWidth
          />
          <TextField
            type="text"
            id="password"
            label="Senha"
            variant="filled"
            {...register('password')}
            disabled={loading}
            required
            fullWidth
          />
        </S.InputSentences>
        <Editor
          height="40vh"
          language="sql"
          defaultLanguage="sql"
          theme="vs-dark"
          value={sentenca}
          loading="Carregando..."
          defaultValue="/*Insira a sentença aqui...*/"
          onChange={(value) => setValue('sentenca', value || '')}
          options={{
            automaticLayout: true,
            autoIndent: true,
            formatOnType: true,
            formatOnPaste: true,
            wordWrap: 'on',
            wrappingIndent: 'indent',
          }}
        />
        <S.CTA
          color="primary"
          variant="contained"
          size="large"
          type="submit"
          disabled={loading}
        >
          {!loading ? 'Enviar' : 'Enviando...'}
        </S.CTA>
      </S.Form>
      {message && <Typography sx={{ color: 'red' }}>{message}</Typography>}
    </S.Wrapper>
  );
};

export default SaveRecord;
