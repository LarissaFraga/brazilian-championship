import axiosModule from 'axios';

const axios = axiosModule.create({ baseURL: 'http://localhost:3001/' });

async function apiGetChampionshipData(year) {
  const { data: rawData } = await axios.get(`${year}`);

  const lastRound = rawData.length - 1;
  const sanitazedData = rawData[lastRound].partidas
    .flatMap(match => {
      const {
        mandante: host,
        visitante: visitor,
        pontuacao_geral_mandante: hostData,
        pontuacao_geral_visitante: visitorData,
      } = match;
      return [
        { ...hostData, team: host },
        { ...visitorData, team: visitor },
      ];
    })
    .map(teamData => {
      const {
        team,
        total_derrotas,
        total_vitorias,
        total_empates,
        total_gols_marcados,
        total_gols_sofridos,
        total_pontos,
      } = teamData;

      const balance = total_gols_marcados - total_gols_sofridos;

      return {
        team,
        defeats: total_derrotas,
        wins: total_vitorias,
        draws: total_empates,
        scoredGoals: total_gols_marcados,
        takenGoals: total_gols_sofridos,
        points: total_pontos,
        balance,
      };
    })
    .sort((a, b) => b.points - a.points);

  return sanitazedData;
}

export { apiGetChampionshipData };
