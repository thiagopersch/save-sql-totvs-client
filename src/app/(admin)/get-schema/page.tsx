'use client';

import * as S from '@/app/(admin)/styles';
import ContainerTable from '@/components/ContainerTable';
import NoRow from '@/components/NoRow';
import getSchema from '@/hooks/totvs/getSchema';
import { dataservers } from '@/utils/dataservers';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  useGridApiRef,
} from '@mui/x-data-grid';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { schema } from './schema';

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

export default function GetSchemaPage() {
  const apiRef = useGridApiRef();
  const [columns, setColumns] = useState<GridColDef[]>([
    { field: 'name', headerName: 'Nome do campo no DB', width: 150 },
    { field: 'caption', headerName: 'Nome do campo no TOTVS', width: 150 },
    { field: 'type', headerName: 'Tipo do campo', width: 150 },
    { field: 'default', headerName: 'Valor default', width: 150 },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [primaryKeys, setPrimaryKeys] = useState<string>('');
  const [tables, setTables] = useState<any[]>([]);
  const [selectedTable, setSelectedTable] = useState<string>('');
  const useQuery = useMediaQuery('(max-width:768px)');

  const {
    formState: { errors, isSubmitting, isSubmitted, isSubmitSuccessful },
    control,
    register,
    watch,
    setValue,
    handleSubmit,
  } = useForm<Schema>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {
      dataServerName: '',
      username: '',
      password: '',
      tbc: '',
      contexto:
        'CODCOLIGADA=1;CODFILIAL=1;CODSISTEMA=S;CODTIPOCURSO=1;CODUSUARIO=rubeus',
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

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const onSubmit = async (data: Schema) => {
    const { dataServerName, username, password, tbc, contexto } = data;
    try {
      const result = await getSchema(
        dataServerName,
        username,
        password,
        tbc,
        contexto,
      );

      const { extractedData, primaryKeys } = result;

      setTables(extractedData);
      setPrimaryKeys(primaryKeys);

      if (extractedData.length > 0) {
        const firstTable = extractedData[0];
        const newRows = firstTable.fields.map((field: any, index: number) => ({
          id: index,
          name: field.name,
          caption: field.caption,
          type: field.type,
          default: field.default,
        }));

        setValue('rows', newRows);
        setSelectedTable(firstTable.tableName);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTableChange = (event: SelectChangeEvent<string>) => {
    const tableName = event.target.value as string;
    const selectedTable = tables.find((table) => table.tableName === tableName);

    if (selectedTable) {
      const newRows = selectedTable.fields.map((field: any, index: number) => ({
        id: index,
        name: field.name,
        caption: field.caption,
        type: field.type,
        default: field.default,
      }));

      setValue('rows', newRows);
      setSelectedTable(tableName);
    }
  };

  const handleDataserverChange = (event: SelectChangeEvent<string>) => {
    const dataServerName = event.target.value as string;
    setValue('dataServerName', dataServerName);
  };

  const filteredOptions = dataservers.filter((dataserver: any) =>
    dataserver.dataServer.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <S.Wrapper>
      <S.Title variant="h4" color="primary">
        Campos do Dataserver
      </S.Title>

      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.InputSentences>
          <Controller
            name="dataServerName"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth required variant="filled">
                <InputLabel id="dataServerName">DataServer</InputLabel>
                <Select
                  labelId="dataServerName"
                  id="dataServerName"
                  value={field.value}
                  label="DataServer"
                  onChange={handleDataserverChange}
                  disabled={isSubmitting}
                  error={errors.dataServerName !== undefined}
                  variant="filled"
                  autoComplete="on"
                  required
                  MenuProps={{
                    MenuListProps: {
                      onMouseDown: (event: any) => {
                        event.stopPropagation();
                      },
                    },
                  }}
                >
                  <Box px={2} py={1}>
                    <TextField
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      label="Search"
                      variant="filled"
                      fullWidth
                    />
                  </Box>
                  {filteredOptions.map((dataserver: any) => (
                    <MenuItem
                      key={dataserver.dataServer}
                      value={
                        dataserver.customDataServer || dataserver.dataServer
                      }
                    >
                      {useQuery && (
                        <Box>
                          <Typography
                            color="inherit"
                            sx={{ textAlign: 'left', fontWeight: 'bold' }}
                          >
                            {dataserver.dataServer} -&nbsp;
                          </Typography>
                          <Typography>({dataserver.name})</Typography>
                        </Box>
                      )}
                      {!useQuery && (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography
                            color="inherit"
                            sx={{ textAlign: 'left', fontWeight: 'bold' }}
                          >
                            {dataserver.dataServer} -&nbsp;
                          </Typography>
                          <Typography>({dataserver.name})</Typography>
                        </Box>
                      )}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {errors.dataServerName?.message}
                </FormHelperText>
              </FormControl>
            )}
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
        </S.InputSentences>
        <S.InputSentences>
          <TextField
            type="text"
            id="username"
            label="Username"
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
            label="Password"
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
        <S.CTA
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={isSubmitting}
        >
          Buscar
        </S.CTA>
      </S.Form>
      {tables.length > 0 && isSubmitted && (
        <ContainerTable>
          <Button
            color="primary"
            size="small"
            variant="text"
            onClick={handleExpandedTable}
          >
            Ajustar colunas
          </Button>
          <Box
            sx={{
              my: '2rem',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              gap: '1rem',
            }}
          >
            <FormControl variant="filled" sx={{ width: '30rem' }}>
              <InputLabel id="table-select-label">Tabela</InputLabel>
              <Select
                labelId="table-select-label"
                value={selectedTable}
                onChange={handleTableChange}
                label="Tabela"
              >
                {tables.map((table) => (
                  <MenuItem key={table.tableName} value={table.tableName}>
                    {table.tableName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography
              variant="button"
              color="primary"
              sx={{ fontWeight: 'bold' }}
            >
              Chaves primárias do dataserver:{' '}
              <Typography
                variant="caption"
                color="primary.dark"
                sx={{ fontWeight: 'bold' }}
              >
                {primaryKeys}
              </Typography>
            </Typography>
          </Box>
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
}
