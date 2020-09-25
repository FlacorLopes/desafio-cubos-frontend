export const format = (value) => {
  if (isNaN(value) || value === 0 || !isFinite(value)) return 'Não disponível';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

export const timeFormat = (value) =>
  `${parseInt(value / 60)}h${parseInt(value % 60)}min`;

export const releaseStatus = (value) => {
  if (typeof value !== 'string') return;
  value = value.toLowerCase();

  if (value === 'released') return 'Lançado';
  if (value === 'in production') return 'Em produção';
  if (value === 'post production') return 'Pós produção';
  if (value === 'canceled') return 'Cancelado';
  if (value === 'rumored') return 'Previsto';
};

export const getLanguage = (detailedInfo) => {
  try {
    return detailedInfo.spoken_languages[0].name;
  } catch (err) {
    return 'Não disponível';
  }
};

export const getVideoKey = (detailedInfo) => {
  try {
    return detailedInfo.videos.results[0].key;
  } catch (err) {
    return null;
  }
};
