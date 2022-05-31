import { useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { apiGetChampionshipData } from '../api/api';
import { ClipLoader } from 'react-spinners';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function ResultsChampionship() {
  const { pathname } = useLocation();
  const year = pathname.substring(1);

  const [championshipData, setChampionshipData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const backendData = await apiGetChampionshipData(year);
      setChampionshipData(backendData);
      setLoading(false);
    }
    fetchData();
  }, [year]);

  if (loading) {
    return (
      <div className="mt-4 text-center">
        <ClipLoader />;
      </div>
    );
  }

  console.log(championshipData);

  return (
    <>
      <div className="mt-4">
        <h2 className="text-center font-semibold text-lg">Results of {year}</h2>
      </div>

      <div className="m-4">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left"></StyledTableCell>
                <StyledTableCell>Team</StyledTableCell>
                <StyledTableCell align="right">P</StyledTableCell>
                <StyledTableCell align="right">V</StyledTableCell>
                <StyledTableCell align="right">E</StyledTableCell>
                <StyledTableCell align="right">D</StyledTableCell>
                <StyledTableCell align="right">GP</StyledTableCell>
                <StyledTableCell align="right">GC</StyledTableCell>
                <StyledTableCell align="right">SG</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {championshipData.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="left">{index + 1}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row.team}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.points}</StyledTableCell>
                  <StyledTableCell align="right">{row.wins}</StyledTableCell>
                  <StyledTableCell align="right">{row.draws}</StyledTableCell>
                  <StyledTableCell align="right">{row.defeats}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.scoredGoals}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.takenGoals}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.balance}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
