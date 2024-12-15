import { Button } from '@mui/material';
import {
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarProps,
} from '@mui/x-data-grid';
import Link from 'next/link';

interface TableToolbarProps extends GridToolbarProps {
  href?: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  buttons: string[];
  getLabel: (button: string) => string;
  buttonActions: { [key: string]: () => void }; // Ações para cada botão
}

const TableToolbar = (props: TableToolbarProps) => {
  return (
    <GridToolbarContainer
      className="flex lg:flex-row md:flex-col m-2 items-center"
      {...props}
    >
      {/* Condicional para renderizar o botão de "Adicionar" */}
      {props.buttons.includes('add') && props.href && props.label && (
        <Link href={props.href} key={props.href}>
          <Button
            startIcon={props.icon}
            variant="text"
            color="primary"
            size="large"
            onClick={props.buttonActions['add']} // Ação do botão "Adicionar"
          >
            {props.getLabel('add')} {/* Usando a função getLabel */}
          </Button>
        </Link>
      )}

      {/* Condicional para renderizar o botão de "Adicionar" (sem link) */}
      {props.buttons.includes('add') && !props.href && (
        <Button
          startIcon={props.icon}
          variant="contained"
          color="primary"
          size="medium"
          onClick={props.buttonActions['add']} // Ação do botão "Adicionar"
        >
          {props.getLabel('add')} {/* Usando a função getLabel */}
        </Button>
      )}

      {/* Condicional para renderizar o botão de "Ajustar Colunas" */}
      {props.buttons.includes('columns') && (
        <Button
          variant="outlined"
          color="primary"
          size="medium"
          onClick={props.buttonActions['columns']} // Ação do botão "Ajustar Colunas"
        >
          {props.getLabel('columns')} {/* Usando a função getLabel */}
        </Button>
      )}

      {/* Condicional para renderizar o botão de "Exportar" */}
      {props.buttons.includes('export') && (
        <GridToolbarExport
          printOptions={{
            disableToolbarButton: true,
          }}
          slotProps={{
            button: {
              color: 'primary',
              size: 'medium',
              variant: 'outlined',
              label: props.getLabel('export'), // Usando a função getLabel
            },
            tooltip: {
              title: 'Exportar',
            },
          }}
          onClick={props.buttonActions['export']} // Ação do botão "Exportar"
        />
      )}
    </GridToolbarContainer>
  );
};

export default TableToolbar;
