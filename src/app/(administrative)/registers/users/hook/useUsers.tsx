'use client';

import { FormattedUsers } from '@/model/user';
import {
  useAddUserMutation,
  useDeleteUserMutation,
} from '@/requests/mutations/registers/users';
import { getUserById, listUsers } from '@/requests/queries/registers/users';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGridApiRef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { schema } from './schema';

type Schema = z.infer<typeof schema>;

type UseUsersReturn = {
  rows: FormattedUsers[];
  isModalOpen: boolean;
  apiRef: ReturnType<typeof useGridApiRef>;
  setIsModalOpen: (value: boolean) => void;
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
  handleExpandedTable: () => void;
  handleSubmit: (onSubmit: SubmitHandler<Schema>) => void;
  register: ReturnType<typeof useForm>['register'];
  control: ReturnType<typeof useForm>['control'];
  errors: ReturnType<typeof useForm>['formState']['errors'];
  isSubmitting: boolean;
  isSubmitted: boolean;
};

export default function useUsers(): UseUsersReturn {
  const [rows, setRows] = useState<FormattedUsers[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const apiRef = useGridApiRef();
  const { data: users, refetch } = useQuery({
    queryKey: ['get-users'],
    queryFn: () => listUsers,
  });

  const addUserMutation = useAddUserMutation();
  const deleteUserMutation = useDeleteUserMutation();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting, isSubmitted },
    reset,
  } = useForm<Schema>({
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

  const handleExpandedTable = useCallback(() => {
    apiRef.current?.autosizeColumns({
      includeHeaders: true,
      includeOutliers: true,
      expand: true,
    });
  }, [apiRef]);

  const handleEdit = useCallback(
    async (id: string) => {
      try {
        const user = await getUserById(id);
        if (user) {
          reset(user);
          setIsModalOpen(true);
        }
      } catch (error) {
        console.error('Failed to fetch user for editing:', error);
      }
    },
    [reset],
  );

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await deleteUserMutation.mutateAsync(id);
        refetch();
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    },
    [deleteUserMutation, refetch],
  );

  const onSubmit: SubmitHandler<Schema> = useCallback(
    async (data) => {
      try {
        await addUserMutation.mutateAsync(data);
        refetch();
        setIsModalOpen(false);
      } catch (error) {
        console.error('Failed to save user:', error);
      }
    },
    [addUserMutation, refetch],
  );

  return {
    rows,
    isModalOpen,
    apiRef,
    setIsModalOpen,
    handleEdit,
    handleDelete,
    handleExpandedTable,
    handleSubmit,
    register,
    control,
    errors,
    isSubmitting,
    isSubmitted,
  };
}

/* import { FormattedUsers } from '@/model/user';
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
  } = useQuery(
    {
      queryKey: ['get-users'],
      queryFn: () => listUsers(),
    },
  );
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
 */
