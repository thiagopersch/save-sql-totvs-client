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
  ...rest
}: TableProps) => {
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
              label={rest.label}
              icon={icon}
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
