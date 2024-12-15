import { FormattedUsers } from '@/model/user';
import { useAddUserMutation } from '@/requests/mutations/registers/users';
import { listUsers } from '@/requests/queries/registers/users';
import { zodResolver } from '@hookform/resolvers/zod';
import { GridRowModesModel, useGridApiRef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { schema } from './schema';

type Schema = z.infer<typeof schema>;

export default function useUsers() {
  const [rows, setRows] = useState<FormattedUsers[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const apiRef = useGridApiRef();
  const {
    data: users,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['get-users'],
    queryFn: () => listUsers(),
  });
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<Schema>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      change_password: true,
      status: true,
    },
  });

  useEffect(() => {
    if (users) {
      setRows(users);
    }
  }, [users]);

  const { data: session } = useSession();
  const mutation = useAddUserMutation();

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

  const onSubmit: SubmitHandler<Schema> = useCallback(
    async (data: Schema) => {
      try {
        const response = await mutation.mutateAsync(data);
        if (response) {
          refetch();
        }
      } catch (err: string | any) {
        setErrorMessage(err.response.data.message);
      }
    },
    [mutation, refetch],
  );

  return {
    rows,
    showPassword,
    errors,
    isSubmitting,
    isSubmitted,
    isLoading,
    errorMessage,
    isModalOpen,
    control,
    apiRef,
    setIsModalOpen,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleSubmit,
    register,
    setValue,
    onSubmit,
    Controller,
    handleExpandedTable,
  };
}
