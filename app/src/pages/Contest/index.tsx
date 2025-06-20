import ContestMap from '../../components/Map/ContestMap'
import {Typography, Grid, Container, Paper, List, ListItem, ListItemText, ListItemIcon} from '@mui/material'
import Item from '@mui/material/Grid'
import ContestLeaderBoard from '../../components/Leaderboard/contest'
import Navbar from '../../components/Navbar'
import CircleIcon from '@mui/icons-material/Circle';
import Footer from "../../components/Footer";
// import Button from '@mui/material/Button/Button'

export default function Contest() {

  const helperText = [
    "Create and validate labels within an area to earn points!",
    "User that has the most points in an area earns ownership of that area!",
    "Attaining ownership of an area grants a point bonus while you maintain it!",
    "Take ownership from other users by marking more doors than them in an area!",
    "Hover over a neighborhood to view it's contest information!",
    "Click within a contest area to navigate there on the Explore page!",
  ]

  return (
    <div>

      <Navbar/>
      <Paper
        id="ExplorationContainer"
        sx={{
          minHeight: "calc(100vh - 74px)",
          backgroundColor: "rgba(225, 207, 185, 0.15)",
        }}
      >
        <Container maxWidth='xl'>
          <Typography variant="h2" align="center" paddingBottom={6} pt={6}> Welcome to the Mapathon Beta!</Typography>
          <Grid container maxWidth="xl" sx={{alignItems: 'center'}} spacing={0}>
            <Grid item xs={12} md={7}>
              <Item>
                <List>

                  {helperText.map((text) => (
                    <ListItem key={text}>
                      <ListItemIcon><CircleIcon/></ListItemIcon>
                      <ListItemText primary={text} primaryTypographyProps={{variant: "h6"}}/>
                    </ListItem>


                  ))}


                </List>
              </Item>
            </Grid>
            <Grid item xs={12} md={5}>
              <Item>
                <Typography variant="subtitle1" color="text.primary" align='center'>Current Contest Leaders</Typography>
                <ContestLeaderBoard/>
              </Item>
            </Grid>
          </Grid>
        </Container>
        <ContestMap/>

      </Paper>
      <Footer/>

    </div>
  )
}