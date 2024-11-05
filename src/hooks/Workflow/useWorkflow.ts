import readView from '@/services/totvs/readView';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGridApiRef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { schema } from './schema';

type Schema = z.infer<typeof schema> & {
  rows: any[];
};

export default function useWorkflow() {
  const apiRef = useGridApiRef();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isSubmitted, isLoading },
  } = useForm<Schema>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {
      filtro: `CODCOLIGADA = 0`,
      contexto:
        'CODCOLIGADA=1;CODFILIAL=1;CODSISTEMA=S;CODTIPOCURSO=1;CODUSUARIO=rubeus',
      dataServerName: 'GlbWorkflowData',
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

  const handleReadView: SubmitHandler<Schema> = async (formData: Schema) => {
    const { filtro, contexto, dataServerName, username, password, tbc } =
      formData;

    try {
      const result = await readView(
        dataServerName,
        filtro,
        contexto,
        username,
        password,
        tbc,
      );

      const formattedData = result?.NewDataSet?.GWORKFLOW?.map(
        (item: any, index: any) => ({
          id: index,
          CODCOLIGADA: item.CODCOLIGADA[0],
          ID: item.ID[0],
          NOME: item.NOME[0],
          ATIVO: item.ATIVO[0],
          XOMLDATA: item.XOMLDATA[0],
        }),
      );

      setValue('rows', formattedData);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    handleClickShowPassword,
    handleMouseDownPassword,
    handleReadView,
    handleSubmit,
    register,
    setValue,
    handleExpandedTable,
    apiRef,
    rows,
    showPassword,
    errors,
    isSubmitting,
    isSubmitted,
    isLoading,
  };
}
