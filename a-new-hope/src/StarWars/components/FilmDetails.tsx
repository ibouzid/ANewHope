import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import PsychologyIcon from '@mui/icons-material/Psychology';
import { FilmHeadline, FilmSuggestion, FlexColumn } from '../StarWars.style';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

interface FilmDetailsProps{
    filmData: any
}

const FilmDetails: React.FC<FilmDetailsProps> = ({filmData})=> {
    if(!filmData){
        return(
            <FlexColumn>
              <FilmHeadline> Film Details</FilmHeadline>
              <FilmSuggestion> Click on a Film Title for details</FilmSuggestion>
            </FlexColumn>
        )
        }
    return (
        <FlexColumn>
            <FilmHeadline> Film Details</FilmHeadline>
            <List sx={{ height: '100%', minWidth: 400, bgcolor: 'whitesmoke' }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <DriveFileRenameOutlineIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Title" secondary={filmData?.title} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <DesignServicesIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Producer" secondary={filmData?.producer} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <PsychologyIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Director" secondary={filmData?.director} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <CalendarMonthIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Release Date" secondary={filmData?.release_date} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <LibraryBooksIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText sx={{ maxWidth: 400}} primary="Opening Crawl" secondary={filmData?.opening_crawl} />
          </ListItem>
        </List>
        </FlexColumn>
        
      );
}

export default FilmDetails;