import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useVehicles } from './hooks';
import moment from 'moment';
import { motion } from 'framer-motion';
import { FlexColumn, VehicleHeadline } from '../StarWars.style';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

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

interface VehicleTableProps{
  setFilmData: (filmData: any) => void;
}

const VehicleTable: React.FC< VehicleTableProps> = ({setFilmData})=> {
    const {data: vehicles, isLoading} = useVehicles()
    const storeFilmData = (film: any) =>{
      localStorage.setItem("film", JSON.stringify(film));
      setFilmData(film)
    }
    const createFilmRow = (films: any) => {
      return films?.map((film: any) => {
          return <><motion.div key={film?.title} whileHover={{
            scale: 1.2,
          }} onClick={()=> storeFilmData(film)}>{film?.title}</motion.div></>
      })
  }
  if(isLoading){
    return(
      <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
    )
  }
  return (
    <FlexColumn>
        <VehicleHeadline> Star Wars Vehicles</VehicleHeadline>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead >
          <TableRow >
            <StyledTableCell  >Name</StyledTableCell>
            <StyledTableCell align="right">Model</StyledTableCell>
            <StyledTableCell align="right">Manufacturer</StyledTableCell>
            <StyledTableCell align="right">Created</StyledTableCell>
            <StyledTableCell align="right">Passengers</StyledTableCell>
            <StyledTableCell align="right">Films Appeared</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vehicles?.results?.map((row: any) => (
            <StyledTableRow key={row?.name}>
              <StyledTableCell  component="th" scope="row">
                {row?.name}
              </StyledTableCell>
              <StyledTableCell  align="right">{row?.model}</StyledTableCell>
              <StyledTableCell align="right">{row?.manufacturer}</StyledTableCell>
              <StyledTableCell align="right">{moment(row?.created).format('MM/DD/YYYY')}</StyledTableCell>
              <StyledTableCell align="right">{row?.passengers}</StyledTableCell>
              <StyledTableCell sx={{ '&:hover': { cursor: 'pointer' }}} align="right">{createFilmRow(row?.films)}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </FlexColumn>
    
  );
}
export default VehicleTable;