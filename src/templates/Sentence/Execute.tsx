'use client';

import performSentence from '@/hooks/sentence/executeSentence';
import { zodResolver } from '@hookform/resolvers/zod';
import { Editor } from '@monaco-editor/react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { schema } from './schema';
import * as S from './styles';

type Schema = z.infer<typeof schema>;

const ExecuteSentece = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Schema>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {
      codColigada: '',
      codSistema: '',
      codSentenca: '',
      parameters: '',
      username: '',
      password: '',
      tbc: '',
    },
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleSubmitForm: SubmitHandler<Schema> = async (
    formData: PerformSentenceProps,
  ) => {
    try {
      const result = await performSentence(formData);
      setMessage(JSON.stringify(result, null, 2));
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <S.Wrapper>
      <S.Title variant="h4" color="primary" gutterBottom>
        Executar sentença
      </S.Title>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <S.SectionOne>
          <TextField
            type="text"
            label="Código da coligada"
            {...register('codColigada')}
            variant="filled"
            error={!!errors.codColigada}
            helperText={errors.codColigada?.message}
            disabled={isSubmitting}
            fullWidth
            required
          />
          <TextField
            type="text"
            label="Código do Sistema"
            {...register('codSistema')}
            error={!!errors.codSistema}
            helperText={errors.codSistema?.message}
            variant="filled"
            disabled={isSubmitting}
            fullWidth
            required
          />
          <TextField
            type="text"
            label="Código da sentença"
            {...register('codSentenca')}
            error={!!errors.codSentenca}
            helperText={errors.codSentenca?.message}
            variant="filled"
            disabled={isSubmitting}
            fullWidth
            required
          />

          <TextField
            type="text"
            label="Parâmetros"
            {...register('parameters')}
            error={!!errors.parameters}
            helperText="Ex: PARAM=VALUE"
            variant="filled"
            disabled={isSubmitting}
            fullWidth
          />
        </S.SectionOne>
        <S.SectionTwo>
          <TextField
            type="text"
            label="Usuário"
            {...register('username')}
            error={!!errors.username}
            helperText={errors.username?.message}
            variant="filled"
            disabled={isSubmitting}
            fullWidth
            required
          />
          <TextField
            type={showPassword ? 'text' : 'password'}
            label="Senha"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            variant="filled"
            disabled={isSubmitting}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Mostrar senha"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
            required
          />
          <TextField
            type="text"
            label="TBC"
            error={!!errors.tbc}
            helperText={errors.tbc?.message}
            {...register('tbc')}
            variant="filled"
            disabled={isSubmitting}
            fullWidth
            required
          />
        </S.SectionTwo>
        <S.CTA>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="large"
            fullWidth
            disabled={isSubmitting}
          >
            Executar
          </Button>
        </S.CTA>
      </form>
      {message && (
        <Editor
          theme="vs-dark"
          height="53vh"
          width="100%"
          language="json"
          loading="Carregando..."
          defaultLanguage="json"
          defaultValue={message}
          value={message}
          options={{
            automaticLayout: true,
            formatOnType: true,
            formatOnPaste: true,
            wordWrap: 'on',
            wrappingIndent: 'indent',
            readOnly: true,
          }}
        />
      )}
    </S.Wrapper>
  );
};

export default ExecuteSentece;
