import { DataGrid, DataGridProps } from '@mui/x-data-grid';
import ContainerTable from './ContainerTable';
import TableToolbar from './CustomToolbar';
import NoRow from './NoRow';

type TableProps = {
  columns: any[];
  rows: any[];
  sortingField: string;
  href?: string;
  label: string;
  isLoading: boolean;
  rowModesModel?: any;
  setRowModesModel?: any;
  setRows?: any;
  icon?: React.ReactNode;
  onClick?: () => void;
  buttons?: string[]; // Nova prop para os botões
  buttonActions?: { [key: string]: () => void }; // Funções específicas para os botões
} & DataGridProps;

const Table = ({
  columns,
  isLoading,
  rowModesModel,
  rows,
  setRowModesModel,
  sortingField,
  setRows,
  onClick,
  icon,
  buttons = ['add', 'columns', 'export'], // Botões padrão
  label,
  buttonActions = {}, // Funções para os botões
  ...rest
}: TableProps) => {
  // Ajustar o label com base nos botões selecionados
  const getLabel = (button: string) => {
    if (button === 'add') return label || 'Adicionar';
    if (button === 'columns') return 'Ajustar Colunas';
    if (button === 'export') return 'Exportar';
    return label; // Retorna o label original, caso não tenha ajustes
  };

  return (
    <ContainerTable>
      <DataGrid
        {...rest}
        rows={rows}
        columns={columns}
        rowModesModel={rowModesModel}
        editMode="row"
        autoHeight
        loading={isLoading}
        filterMode="server"
        pageSizeOptions={[10, 25, 50, 100]}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
          sorting: {
            sortModel: [{ field: sortingField, sort: 'asc' }],
          },
        }}
        slots={{
          noRowsOverlay: NoRow,
          toolbar: () => (
            <TableToolbar
              href={rest.href}
              onClick={onClick}
              label={label}
              icon={icon}
              buttons={buttons}
              getLabel={getLabel} // Passando a função getLabel
              buttonActions={buttonActions} // Passando as funções para os botões
            />
          ),
        }}
        slotProps={{
          toolbar: {
            setRows,
            setRowModesModel,
            loadingOverlay: {
              variant: 'linear-progress',
              noRowsVariant: 'linear-progress',
            },
          },
        }}
        sx={{ '--DataGrid-overlayHeight': '18.75rem' }}
      />
    </ContainerTable>
  );
};

export default Table;
