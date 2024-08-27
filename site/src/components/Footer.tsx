import ChangeCircle from '@mui/icons-material/ChangeCircle';
import GetAppIcon from '@mui/icons-material/GetApp'; // Import icon for download links
import GitHubIcon from '@mui/icons-material/GitHub'; // Import GitHub icon
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import Mail from '@mui/icons-material/Mail';
import PrivacyTip from '@mui/icons-material/PrivacyTip';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const Footer = () => {
  const theme = useTheme();


  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        borderTop: `1px solid ${theme.palette.divider}`,
        padding: '20px 0px',
        marginTop: '60px'
      }}
    >
      <Grid container justifyContent="center" spacing={4}>
        <Grid item>
          <Link href="https://apps.apple.com/us/app/ideas-down-quickly/id6529524065?platform=iphone" target="_blank" color="inherit" underline="hover">
            <GetAppIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
            <Typography variant="body1" component="span">
              App Store
            </Typography>
          </Link>
        </Grid>
        <Grid item>
          <Link href="https://docs.google.com/forms/d/e/1FAIpQLSftglI15-9coi2P1Tx_QaZitHYrSMvVilQKn6_BB1t_3V3nvg/viewform?usp=sf_link" target="_blank" color="inherit" underline="hover">
            <GetAppIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
            <Typography variant="body1" component="span">
              Play Store Internal Testing
            </Typography>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/changelog" color="inherit" underline="hover">
            <ChangeCircle sx={{ verticalAlign: 'middle', mr: 1 }} />
            <Typography variant="body1" component="span">
              Changelog
            </Typography>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/contact" color="inherit" underline="hover">
            <Mail sx={{ verticalAlign: 'middle', mr: 1 }} />
            <Typography variant="body1" component="span">
              Support
            </Typography>
          </Link>
        </Grid>
        <Grid item>
          <Link target='_blank' href="https://github.com/TravisBumgarner/ideas-down-quickly" color="inherit" underline="hover" sx={{ display: 'flex', alignItems: 'center', marginLeft: '16px' }}>
            <GitHubIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
            <Typography variant="body1" component="span">
              GitHub
            </Typography>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/privacypolicy" color="inherit" underline="hover">
            <LightbulbIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
            <Typography variant="body1" component="span">
              Privacy Policy
            </Typography>
          </Link>
        </Grid>
        <Grid item>
          <Link href="https://sillysideprojects.com" target="_blank" color="inherit" underline="hover">
            <PrivacyTip sx={{ verticalAlign: 'middle', mr: 1 }} />
            <Typography variant="body1" component="span">
              More from the Creator
            </Typography>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;