'use client';

import * as S from '@/app/(admin)/styles';
import Table from '@/components/Table';
import useWorkflow from '@/hooks/Workflow/useWorkflow';
import {
  CheckCircle,
  Close,
  Search as SearchIcon,
  Storage as StorageIcon,
  Tune as TuneIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { z } from 'zod';
import { schema } from '../../../../hooks/Workflow/schema';

type Schema = z.infer<typeof schema> & {
  rows: any[];
};

const ReadViewPage = () => {
  const {
    rows,
    apiRef,
    errors,
    isSubmitted,
    isSubmitting,
    showPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleReadView,
    handleSubmit,
    register,
    setValue,
    handleExpandedTable,
  } = useWorkflow();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'CODCOLIGADA', headerName: 'Coligada', width: 100 },
    { field: 'ID', headerName: 'ID da fórmula visual', width: 150 },
    { field: 'NOME', headerName: 'Nome', width: 600 },
    {
      field: 'ATIVO',
      headerName: 'Situação',
      width: 150,
      renderCell: (params) =>
        params.value === '1' ? (
          <Tooltip title="Ativo" arrow followCursor>
            <CheckCircle color="success" />
          </Tooltip>
        ) : (
          <Tooltip title="Inativo" arrow followCursor>
            <Close color="error" />
          </Tooltip>
        ),
    },
    {
      field: 'XOMLDATA',
      headerName: 'XML',
      width: 100,
      renderCell(params) {
        return (
          <Tooltip
            title={params.value || 'Clique aqui para copiar o conteúdo'}
            arrow
            placement="right-start"
          >
            <IconButton
              onClick={() => navigator.clipboard.writeText(params.value)}
              size="small"
              aria-label="copy"
              color="primary"
            >
              <StorageIcon />
            </IconButton>
          </Tooltip>
        );
      },
    },
  ];

  return (
    <S.Wrapper>
      <S.Title variant="h4" color="primary">
        Fórmulas visuais
      </S.Title>
      <S.Form onSubmit={handleSubmit(handleReadView)}>
        <S.InputSentences>
          <TextField
            type="text"
            id="username"
            label="Usuário"
            variant="filled"
            {...register('username')}
            disabled={isSubmitting}
            helperText={errors.username?.message}
            error={errors.username !== undefined}
            required
            fullWidth
          />
          <TextField
            type={showPassword ? 'text' : 'password'}
            id="password"
            label="Senha"
            variant="filled"
            {...register('password')}
            disabled={isSubmitting}
            helperText={errors.password?.message}
            error={errors.password !== undefined}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            required
            fullWidth
          />
          <TextField
            type="text"
            id="tbc"
            label="TBC"
            variant="filled"
            disabled={isSubmitting}
            helperText={errors.tbc?.message}
            error={errors.tbc !== undefined}
            {...register('tbc')}
            required
            fullWidth
          />
        </S.InputSentences>
        <S.InputSentences>
          <TextField
            type="text"
            id="filtro"
            label="Filtro"
            variant="filled"
            {...register('filtro')}
            disabled={isSubmitting}
            helperText={errors.filtro?.message}
            error={errors.filtro !== undefined}
            placeholder="Filtro"
            required
            fullWidth
          />
          <TextField
            type="text"
            id="contexto"
            label="Contexto"
            variant="filled"
            {...register('contexto')}
            disabled={isSubmitting}
            helperText={errors.contexto?.message}
            error={errors.contexto !== undefined}
            required
            fullWidth
          />
          <TextField
            type="text"
            id="dataServerName"
            label="Dataserver"
            variant="filled"
            {...register('dataServerName')}
            helperText={errors.dataServerName?.message}
            error={errors.dataServerName !== undefined}
            aria-readonly={true}
            hidden
            disabled
            required
            fullWidth
          />
        </S.InputSentences>
        <S.CTA>
          <Button
            color="primary"
            variant="contained"
            size="large"
            type="submit"
            disabled={isSubmitting}
            startIcon={<SearchIcon />}
          >
            Executar
          </Button>
        </S.CTA>
      </S.Form>
      {rows && (
        <Table
          rows={rows}
          columns={columns}
          isLoading={isSubmitting}
          apiRef={apiRef}
          onClick={handleExpandedTable}
          density="compact"
          autoHeight
          sortingField="name"
          label="Ajustar colunas"
          icon={<TuneIcon />}
        />
      )}
      {!rows && (
        <Typography
          sx={{
            color: 'red',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            fontWeight: 'bold',
          }}
        >
          Algo deu errado
        </Typography>
      )}
    </S.Wrapper>
  );
};

export default ReadViewPage;
