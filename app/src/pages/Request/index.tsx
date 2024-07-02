import Navbar from "../../components/Navbar";
import {Container, Typography, Grid, Box, Paper} from "@mui/material";
import {getOpenRequests, RequestData} from "../../apis/request";
import {useEffect, useState, Fragment} from "react";
import {getAllUsersFromDB} from "../../apis/user";
import {getNickname} from "../../apis/user";
import {
  setKey,
  setDefaults,
  fromAddress,
  fromLatLng,
  fromPlaceId,
  setLocationType,
  geocode,
  RequestType,
} from "react-geocode";



export default function Request() {
  interface userIdMap {
    id: string,
    username:string
  }
  const [requests, setRequests] = useState<RequestData[]>([]);
  const [userNames,setUserNames] = useState<userIdMap[]>([])

  useEffect(() => {
    async function fetchRequests() {
      const result = await getOpenRequests()
     // console.log(result)
      setRequests(result.data)
    }

    fetchRequests();
  }, [])

  useEffect(()=>{
    async function fetchUserNames(){
      for(const request of requests){
        const userId = request.requestedBy
        let found = false
        for(const user of userNames){
          if(user.id === request.requestedBy){
            found = true
            //console.log(`found ${user.username}`)
          }
        }
        if(!found){
          const result = await getNickname({id:userId})
          if(result.data){
            console.log(result)
            setUserNames((userNames)=> [...userNames, {id: userId, username: result.data}])
          }
        }
      }
    }
    fetchUserNames()
  },[requests])

  function getUserName(userId:string){
    for(const user of userNames){
      if(user.id === userId) return user.username
    }
  }

  function deadlineString(request: RequestData){
    const string = request.deadline.toString()
    return `${string.substring(5, 7)}/${string.substring(8, 10)}/${string.substring(0, 4)}`
  }

  return (
    <div>
      <Navbar/>
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh" >
          <Paper elevation={3} sx={{p: 4, backgroundColor: "white", minWidth: "80%"}}>
            <Grid container rowSpacing={2} >
              <Grid item xs={3}><Typography sx={{fontWeight: "bold"}}>Requester</Typography></Grid>
              <Grid item xs={3}><Typography sx={{fontWeight: "bold"}}>Type</Typography></Grid>
              <Grid item xs={3}><Typography sx={{fontWeight: "bold"}}>Location</Typography></Grid>
              <Grid item xs={3}><Typography sx={{fontWeight: "bold"}}>Deadline</Typography></Grid>
              <Grid item xs={12}> <br/></Grid>
              {requests.map((request) => (
                <Fragment key={request.requestedBy + request.address}>
                  <Grid item xs={3} >
                    <Typography>{getUserName(request.requestedBy)}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>{request.type}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>{request.address}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>{deadlineString(request)}</Typography>
                  </Grid>
                </Fragment>
              ))}
            </Grid>
          </Paper>
        </Box>
      </ Container>
    </div>
  )
}