import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

function TeamPageCard({ name, position, grad, agility, broad, three, wb }) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 18 }} gutterBottom>
          {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {position ? position : 'POS'} &bull; {grad ? grad : 'GRAD'}
        </Typography>

        <Stack spacing={1} alignItems="center">
          {/* ROW 1 */}
          <Stack direction="row" spacing={1}>
            <Stack>
              <Chip label="50's Wall Ball" color="primary" />
              <Typography>{wb ? wb : 'N/A'}</Typography>
            </Stack>
            <Stack>
              <Chip label="Broad Jump" color="primary" />
              <Typography>{broad ? broad : 'N/A'}</Typography>
            </Stack>
          </Stack>
          {/* ROW 2 */}
          <Stack direction="row" spacing={1}>
            <Stack>
              <Chip label="300's" color="primary" />
              <Typography>{three ? three : 'N/A'}</Typography>
            </Stack>
            <Stack>
              <Chip label="5-10-5" color="primary" />
              <Typography>{agility ? agility : 'N/A'}</Typography>
            </Stack>
    
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default TeamPageCard;