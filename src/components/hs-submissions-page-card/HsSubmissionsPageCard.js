import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from '@mui/material/Link';

function HsSubmissionsPageCard({name, playerId, wbLink, threeLink, fortyLink, broadLink, verticalLink, agilityLink, handleDelete}) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 18 }} gutterBottom>
          {name}
        </Typography>
        <List dense>
          {wbLink
            ? <ListItem
                id={playerId}
                secondaryAction={
                  <IconButton id={'wbLink'} edge="end" aria-label="delete" onClick={handleDelete}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <Link href={wbLink} target="_blank"><ListItemText primary="Wall Ball Test" /></Link>
              </ListItem>
            : undefined
          }
          {threeLink
            ? <ListItem
                id={playerId}
                secondaryAction={
                  <IconButton id={'threeLink'} edge="end" aria-label="delete" onClick={handleDelete}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <Link href={threeLink} target="_blank"><ListItemText primary="300's Test" /></Link>
              </ListItem>
            : undefined
          }
          {fortyLink
            ? <ListItem
                id={playerId}
                secondaryAction={
                  <IconButton id={'fortyLink'} edge="end" aria-label="delete" onClick={handleDelete}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <Link href={fortyLink} target="_blank"><ListItemText primary="40yd Dash Test" /></Link>
              </ListItem>
            : undefined
          }
          {broadLink
            ? <ListItem
                id={playerId}
                secondaryAction={
                  <IconButton id={'broadLink'} edge="end" aria-label="delete" onClick={handleDelete}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <Link href={broadLink} target="_blank"><ListItemText primary="Broad Jump Test" /></Link>
              </ListItem>
            : undefined
          }
          {verticalLink
            ? <ListItem
                id={playerId}
                secondaryAction={
                  <IconButton id={'verticalLink'} edge="end" aria-label="delete" onClick={handleDelete}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <Link href={verticalLink} target="_blank"><ListItemText primary="Vertical Jump Test" /></Link>
              </ListItem>
            : undefined
          }
          {agilityLink
            ? <ListItem
                id={playerId}
                secondaryAction={
                  <IconButton id={'agilityLink'} edge="end" aria-label="delete" onClick={handleDelete}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <Link href={agilityLink} target="_blank"><ListItemText primary="5-10-5 Test" /></Link>
              </ListItem>
            : undefined
          }
        </List>
      </CardContent>
    </Card>
  );
}

export default HsSubmissionsPageCard;