type Route = {
  id?: string;
  path: string;
  name: string;
  category?: string;
  children?: Route[];
};

const global = [
  {
    path: '/administrative/get-schema',
    name: 'Procurar',
    category: 'Dataserver',
  },
  {
    path: '/administrative/read-record',
    name: 'Buscar',
    category: 'SQL',
  },
  {
    path: '/administrative/save-record',
    name: 'Salvar registro',
    category: 'SQL',
  },
  {
    path: '/administrative/read-view',
    name: 'Ler visão',
    category: 'SQL',
  },
  {
    path: '/administrative/sentence/execute',
    name: 'Executar',
    category: 'SQL',
  },
  {
    path: '/administrative/workflow/findAll',
    name: 'Buscar',
    category: 'Workflow',
  },
];

const administration = [
  {
    path: '/login',
    name: 'Login',
    category: 'login',
  },
];

const routes: Route[] = [
  {
    id: 'automations',
    path: '/automations',
    name: 'Automações',
    children: [
      {
        id: 'dataservers',
        path: '/dataservers',
        name: 'DataServers',
        children: [
          {
            id: 'get-schema',
            path: '/get-schema',
            name: 'GetSchema',
          },
        ],
      },
      {
        id: 'sql',
        path: '/sql',
        name: 'Consultas SQL',
        children: [
          {
            id: 'read-record',
            path: '/read-record',
            name: 'ReadRecord',
          },
          {
            id: 'save-record',
            path: '/save-record',
            name: 'SaveRecord',
          },
          {
            id: 'read-view',
            path: '/read-view',
            name: 'ReadView',
          },
          {
            id: 'execute-sentence',
            path: '/sentence/execute',
            name: 'Execute',
          },
        ],
      },
      {
        id: 'workflow',
        path: '/workflow',
        name: 'Formulas Visuais',
        children: [
          {
            id: 'workflow-find-wall',
            path: '/findAll',
            name: 'FindAll',
          },
        ],
      },
    ],
  },
  {
    id: 'registers',
    name: 'Cadastros',
    path: '/registers',
    children: [
      {
        id: 'users',
        path: '/users',
        name: 'Usuários',
      },
    ],
  },
];

export { administration, global, routes };
