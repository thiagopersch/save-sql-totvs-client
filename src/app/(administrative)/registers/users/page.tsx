'use client';

import * as S from '@/app/(administrative)/styles';
import CustomModal from '@/components/CustomModal';
import Table from '@/components/Table';
import { GridColDef } from '@mui/x-data-grid';
import UserForm from './_userForm';
import useUsers from './hook/useUsers';

const Users = () => {
  const { rows, isModalOpen, apiRef, setIsModalOpen, handleExpandedTable } =
    useUsers();

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome', width: 250 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'status', headerName: 'Status', width: 250 },
    { field: 'createdAt', headerName: 'Criado em', width: 250 },
    { field: 'updatedAt', headerName: 'Atualizado em', width: 250 },
    { field: 'actions', headerName: 'Ações', width: 250 },
  ];

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  const handleColumns = () => {
    handleExpandedTable;
  };

  return (
    <S.Wrapper>
      <S.Title>Usuários</S.Title>
      <Table
        rows={rows}
        columns={columns}
        isLoading={false}
        onClick={handleExpandedTable}
        density="compact"
        apiRef={apiRef}
        autoHeight
        sortingField="name"
        label="Adicionar"
        buttons={['add', 'columns', 'export']}
        buttonActions={{
          add: handleAdd,
          columns: handleColumns,
        }}
      />
      <CustomModal
        title="Cadastrar usuário"
        disableBackdropClick
        showCloseButton
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <UserForm />
      </CustomModal>
    </S.Wrapper>
  );
};

export default Users;
