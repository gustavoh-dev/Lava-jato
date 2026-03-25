const dashboardMetrics = [
  {
    label: 'Lavagens hoje',
    value: '18',
    helper: '4 servicos em execucao neste momento.',
  },
  {
    label: 'Clientes ativos',
    value: '246',
    helper: 'Base recorrente com crescimento no ultimo mes.',
  },
  {
    label: 'Ticket medio',
    value: 'R$ 82',
    helper: 'Inclui adicionais como higienizacao e enceramento.',
  },
];

const todaySchedule = [
  { time: '08:00', customer: 'Mariana Costa', vehicle: 'Onix LT', service: 'Lavagem completa' },
  { time: '09:30', customer: 'Carlos Lima', vehicle: 'HB20', service: 'Polimento tecnico' },
  { time: '11:00', customer: 'Fernanda Alves', vehicle: 'Toro', service: 'Higienizacao interna' },
];

export function getDashboardMetrics() {
  return dashboardMetrics;
}

export function getTodaySchedule() {
  return todaySchedule;
}
