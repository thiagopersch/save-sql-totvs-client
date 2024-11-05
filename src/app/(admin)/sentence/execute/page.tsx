'use client';

import performSentence from '@/services/sentence/executeSentence';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  useGridApiRef,
} from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { schema } from './schema';
import * as S from './styles';

import ContainerTable from '@/components/ContainerTable';
import NoRow from '@/components/Table/NoRow';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';

type Schema = z.infer<typeof schema> & {
  rows: any[];
};

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport
        printOptions={{
          disableToolbarButton: true,
        }}
        slotProps={{
          button: {
            color: 'primary',
          },
          tooltip: {
            title: 'Exportar',
          },
        }}
      />
    </GridToolbarContainer>
  );
}

const ExecuteSentece = () => {
  const apiRef = useGridApiRef();
  const [showPassword, setShowPassword] = useState(false);
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted, isSubmitSuccessful },
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
      rows: [],
    },
  });

  const rows = watch('rows');

  const handleExpandedTable = () => {
    apiRef.current.autosizeColumns({
      includeHeaders: true,
      includeOutliers: true,
      expand: true,
    });
  };

  useEffect(() => {
    handleExpandedTable;
  }, [handleExpandedTable]);

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

      let resultTable;
      if (Array.isArray(result)) {
        if (Array.isArray(result[0])) {
          resultTable = result.flat().map((item: any, index: number) => ({
            id: index,
            ...item,
          }));
        } else {
          resultTable = result.map((item: any, index: number) => ({
            id: index,
            ...item,
          }));
        }
      } else {
        resultTable = [result].map((item: any, index: number) => ({
          id: index,
          ...item,
        }));
      }

      if (resultTable.length > 0) {
        const cols = Object.keys(resultTable[0]).map((key) => ({
          field: key !== '' ? key : 'NULL',
          renderHeader: () => (
            <Tooltip title={key} arrow>
              <Typography
                color="primary"
                variant="caption"
                sx={{ fontWeight: 'bold' }}
              >
                {key}
              </Typography>
            </Tooltip>
          ),
          //headerName: key,
          renderCell(params: any) {
            return (
              <Tooltip title={params.value} arrow>
                <Typography variant="caption" noWrap>
                  {params.value}
                </Typography>
              </Tooltip>
            );
          },
        }));
        setColumns(cols);
      }

      setValue('rows', resultTable);
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
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
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
      {rows && isSubmitted && (
        <ContainerTable>
          <S.CTA>
            <Button
              color="primary"
              size="small"
              variant="text"
              onClick={handleExpandedTable}
            >
              Ajustar colunas
            </Button>
          </S.CTA>
          <DataGrid
            rows={rows}
            columns={columns}
            loading={!isSubmitSuccessful}
            apiRef={apiRef}
            density="compact"
            autoHeight
            slotProps={{
              loadingOverlay: {
                variant: 'linear-progress',
                noRowsVariant: 'linear-progress',
              },
            }}
            pageSizeOptions={[25, 50, 100]}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 25 },
              },
            }}
            slots={{
              noRowsOverlay: NoRow,
              toolbar: CustomToolbar,
            }}
            sx={{ '--DataGrid-overlayHeight': '18.75rem' }}
          />
        </ContainerTable>
      )}
    </S.Wrapper>
  );
};

export default ExecuteSentece;
