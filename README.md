# Workshop Tracker

Plataforma de gestao de treinamentos corporativos e controle de fluxo de presenca.

## Descricao do Projeto
O Workshop Tracker e uma aplicacao desenvolvida para centralizar a organizacao de workshops e eventos de capacitacao. O sistema permite o gerenciamento completo de cronogramas, base de colaboradores e a geracao automatica de atas de presenca, fornecendo indicadores precisos para a gestao de recursos humanos.

## Tecnologias Utilizadas
- Angular 17+ (Arquitetura Standalone)
- TypeScript
- RxJS (Gerenciamento de fluxos assincronos)
- Chart.js (Visualizacao de dados e graficos)
- CSS3 (Metodologia Flexbox e Grid)
- Google Fonts (Lexend para branding e Montserrat para interface)

## Funcionalidades Principais
- Dashboard Administrativo: Monitoramento de KPIs como taxa de adesao e total de atas geradas.
- Gestao de Workshops: CRUD completo para organizacao de temas, descricoes e datas.
- Controle de Colaboradores: Cadastro e listagem de funcionarios por departamento.
- Lancamento de Atas: Sistema de checagem de presenca com validacao de eventos realizados.
- Relatorios: Exportacao de dados operacionais em formato CSV para analise externa.

## Diferenciais Tecnicos
- Interface Responsiva: Layout adaptavel com foco em experiencia do usuario (UX).
- Logica de Negocio: Contagem de atas baseada estritamente em workshops com participacao confirmada, evitando inflacao de metricas.
- Performance: Uso de ChangeDetectorRef e NgZone para otimizacao de renderizacao em componentes complexos.
- Branding Exclusivo: Identidade visual moderna com tipografia escalonada e paleta de cores equilibrada.

## Como Executar o Projeto

1. Clonar o repositorio:
   git clone https://github.com/gabrielsaraiv4/workshop-tracker

2. Instalar as dependencias do Node.js:
   npm install

3. Iniciar o servidor de desenvolvimento:
   ng serve

4. Visualizar no navegador:
   Acesse http://localhost:4200

## Autor
Gabriel Saraiva