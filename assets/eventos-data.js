window.CaminhoEvents = (() => {
  const events = [
    {
      id: 'festival-sabores-roca',
      title: 'Festival Sabores da Roça',
      shortDescription: 'Degustações, música ao vivo e encontros com produtores locais em um fim de semana de experiências rurais.',
      subtitle: 'Um encontro com gastronomia, música e experiências do turismo rural na região.',
      description: 'O Festival Sabores da Roça reúne produtores locais, expositores, vivências gastronômicas e programação cultural para quem quer conhecer melhor a produção rural da região. A proposta é aproximar o público dos sabores, histórias e experiências do campo em uma programação aberta para toda a família.',
      dateLabel: '18 a 20 Jul',
      whenLabel: '18 a 20 de julho, das 10h às 18h',
      startDate: '2026-07-18',
      endDate: '2026-07-20',
      location: 'Vargem Grande',
      city: 'Rio de Janeiro',
      organizer: 'Programa Caminho da Roça',
      image: 'assets/tela2.jpg',
      externalUrl: 'https://caminhodaroca.senar-rio.com.br/',
      status: 'upcoming',
      featured: true,
      properties: [
        { id: 'fazenda-boa-vista', name: 'Fazenda Boa Vista' },
        { id: 'sitio-vale-verde', name: 'Sítio Vale Verde' }
      ]
    },
    {
      id: 'encontro-rotas-circuitos',
      title: 'Encontro de Rotas e Circuitos',
      shortDescription: 'Roteiros comentados, apresentações e troca de experiências sobre circuitos e atrativos da região.',
      subtitle: 'Uma programação voltada para quem quer conhecer rotas, circuitos e atrativos integrados ao turismo rural.',
      description: 'O Encontro de Rotas e Circuitos reúne apresentações, conversas e troca de experiências sobre roteiros, circuitos e atrativos do território. A proposta é valorizar iniciativas da região e aproximar o público das possibilidades de visitação e vivências rurais.',
      dateLabel: '18 Jul',
      whenLabel: '18 de julho, das 9h às 14h',
      startDate: '2026-07-18',
      endDate: '2026-07-18',
      location: 'Barra de Guaratiba',
      city: 'Rio de Janeiro',
      organizer: 'Caminho da Roça',
      image: 'assets/capa.jpg',
      externalUrl: 'https://caminhodaroca.senar-rio.com.br/',
      status: 'upcoming',
      featured: false,
      properties: [
        { id: 'sitio-vale-verde', name: 'Sítio Vale Verde' },
        { id: 'chacara-do-sol', name: 'Chácara do Sol' }
      ]
    },
    {
      id: 'feira-colheita-artesanato',
      title: 'Feira da Colheita e Artesanato',
      shortDescription: 'Produtos artesanais, alimentos frescos e oficinas abertas ao público em um encontro com sabores do campo.',
      subtitle: 'Uma feira aberta ao público com sabores, artesanato e experiências da região.',
      description: 'A Feira da Colheita e Artesanato reúne alimentos frescos, produtos artesanais e oficinas abertas ao público em um dia de convivência com o turismo rural. O evento valoriza os saberes locais e cria um espaço de encontro entre visitantes e iniciativas da região.',
      dateLabel: '27 Jul',
      whenLabel: '27 de julho, das 10h às 17h',
      startDate: '2026-07-27',
      endDate: '2026-07-27',
      location: 'Campo Grande',
      city: 'Rio de Janeiro',
      organizer: 'Programa Caminho da Roça',
      image: 'assets/tela1.jpg',
      externalUrl: 'https://caminhodaroca.senar-rio.com.br/',
      status: 'upcoming',
      featured: true,
      properties: [
        { id: 'chacara-do-sol', name: 'Chácara do Sol' },
        { id: 'fazenda-boa-vista', name: 'Fazenda Boa Vista' }
      ]
    },
    {
      id: 'circuito-colheita',
      title: 'Circuito da Colheita',
      shortDescription: 'Vivência de colheita, visita guiada à produção e experiência gastronômica com ingredientes da estação.',
      subtitle: 'Um roteiro guiado com visita, colheita e almoço rural.',
      description: 'O Circuito da Colheita convida o visitante para uma programação com recepção na propriedade, vivência de colheita, visita guiada e experiência gastronômica com ingredientes da estação. A atividade valoriza o contato direto com a produção e o cotidiano rural.',
      dateLabel: '03 Ago',
      whenLabel: '03 de agosto, das 9h às 16h',
      startDate: '2026-08-03',
      endDate: '2026-08-03',
      location: 'Pedra de Guaratiba',
      city: 'Rio de Janeiro',
      organizer: 'Programa Caminho da Roça',
      image: 'assets/tela3.jpg',
      externalUrl: 'https://caminhodaroca.senar-rio.com.br/',
      status: 'upcoming',
      featured: true,
      properties: [
        { id: 'fazenda-boa-vista', name: 'Fazenda Boa Vista' }
      ]
    },
    {
      id: 'feira-produtores-locais',
      title: 'Feira de Produtores Locais',
      shortDescription: 'Produtos artesanais, alimentos frescos e oficinas abertas ao público em um encontro com pequenos produtores.',
      subtitle: 'Um encontro com produtores locais, oficinas e sabores da região.',
      description: 'A Feira de Produtores Locais reuniu alimentos frescos, produtos artesanais e oficinas abertas ao público em uma programação voltada para valorizar pequenos produtores da região. A edição foi realizada em Campo Grande e integrou visitantes, famílias e iniciativas locais.',
      dateLabel: '12 Jun',
      whenLabel: '12 de junho, das 10h às 16h',
      startDate: '2026-06-12',
      endDate: '2026-06-12',
      location: 'Campo Grande',
      city: 'Rio de Janeiro',
      organizer: 'Programa Caminho da Roça',
      image: 'assets/tela1.jpg',
      externalUrl: 'https://caminhodaroca.senar-rio.com.br/',
      status: 'expired',
      featured: false,
      properties: [
        { id: 'chacara-do-sol', name: 'Chácara do Sol' }
      ]
    }
  ];

  const monthFormatter = new Intl.DateTimeFormat('pt-BR', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  });

  const dayFormatter = new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC'
  });

  function parseDate(dateString) {
    return new Date(`${dateString}T00:00:00Z`);
  }

  function formatMonthLabel(monthKey) {
    return monthFormatter.format(parseDate(`${monthKey}-01`));
  }

  function formatFullDay(dateString) {
    return dayFormatter.format(parseDate(dateString));
  }

  function getEventById(id) {
    return events.find(event => event.id === id) || events[0];
  }

  function getEventsByStatus(status) {
    if (status === 'all') {
      return [...events];
    }

    return events.filter(event => event.status === status);
  }

  function getEventDates(event) {
    const dates = [];
    const current = parseDate(event.startDate);
    const end = parseDate(event.endDate);

    while (current <= end) {
      dates.push(current.toISOString().slice(0, 10));
      current.setUTCDate(current.getUTCDate() + 1);
    }

    return dates;
  }

  function getEventsOnDate(dateString, options = {}) {
    const includeExpired = options.includeExpired || false;

    return events.filter(event => {
      if (!includeExpired && event.status === 'expired') {
        return false;
      }

      return getEventDates(event).includes(dateString);
    });
  }

  function getUpcomingMonths() {
    const months = new Set();

    events
      .filter(event => event.status !== 'expired')
      .forEach(event => {
        getEventDates(event).forEach(dateString => {
          months.add(dateString.slice(0, 7));
        });
      });

    return [...months].sort();
  }

  return {
    events,
    getEventById,
    getEventsByStatus,
    getEventsOnDate,
    getEventDates,
    getUpcomingMonths,
    formatMonthLabel,
    formatFullDay
  };
})();
