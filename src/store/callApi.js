import {
    createAsyncThunk,
    createSlice
  } from '@reduxjs/toolkit';

  const accessToken = 'XhoV4aqr2B7Z9V2gJ6BZJHLakVR3ZoWH'; // Replace with your actual access token
  const authBody = {
	username: "KTIUMvAMbpviYB9FkRLCCJVqPxEcOQkO",
	password: "VOkFBXPdbUjEc8t2zzhDLVNz7SLWi2zm"
  };



  const base_url = 'nong20123.ras.yeastar.com';
  const api_url = 'openapi/v1.0';
  const url = `https://${base_url}/${api_url}`;


  const initialState = {
    handle:{
      accept_url:'',
      reject_url:''
    },
    caller:{
        name : "",
        ext : "",
        isWaiting: true,
        callId : null,
        error : null
    },
    incoming:{
        call_id:'',
        channel_id:""
    },
    token:{
      send_refresh_token: false,
      startTime: null,
    },
    auth : {
      errcode: 0,
      errmsg: "",
      access_token_expire_time: 0,
      access_token: accessToken,
      refresh_token_expire_time: 0,
      refresh_token: "",
    },
    error :{

    },
    websocket:{
      url:"",
      wss: null
    },
    events: {
      type: 0,
      sn: '',
      msg : {
            call_id: "",
            members: [ ]
        }
    }
};

const tokenApiCall = (uri)=> {
  return new Promise(async (resolve, reject) => {
    try
    {
      const refresh_url =`${url}/${uri}`;
      await fetch(refresh_url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          'User-Agent': 'OpenAPI',
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(authBody)
      })
      .then((json) => json.json())
      .then(function (data) {
        //console.log(data);
        resolve(data);
      })
      .catch(function (error) {
        //console.log("Request failed", error);
        reject(error);
      });

    }catch (error) {
      console.log(error);
      reject(error);
    }
  }); 
};

export const getToken = createAsyncThunk(
  "api/get_token",
  async () => {
    return await tokenApiCall('get_token');
  }
);

export const refreshToken = createAsyncThunk(
  "api/refresh_token",
  async () => {
    return await tokenApiCall('refresh_token');
  }
);

export const handleApiCall = createAsyncThunk(
    "api/handleCall",
    async (action) => {
        return new Promise(async (resolve, reject) => {

        try {
          let action_url = action.action_url;
          let channel_id = action.channel_id;

          console.log('action_url:',action_url);
          console.log('channel_id:',channel_id);

           await fetch(action_url, {
              method: 'POST',
              headers: {
                'User-Agent': 'OpenAPI',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({channel_id : channel_id}), // Send callId as part of the body
            })
            .then((json) => json.json())
            .then(function (data) {
              //console.log(data);
              resolve(data);
            })
            .catch(function (error) {
              //console.log("Request failed", error);
              reject(error);
            });

        } catch (error) {
          console.log(error);
          reject(error);
        }

        });
      }
);


const apiCallSlice = createSlice({
    name: "callApi",
    initialState,
    reducers: {
        updateCaller(state, action) {
            state.caller = action.payload;
          },
        updateIncoming(state, action) {
            state.incoming = action.payload;
          },
        updateAuth(state, action) {
            state.auth = action.payload;
          },
        updateEvents(state, action) {
            state.events = action.payload;
          },
        updateSendRefreshToken(state, action) {
          state.token.send_refresh_token = action.payload;
        }

    },
    extraReducers: (builder) => {
      
      builder.addCase(getToken.fulfilled, (state, action) => {
        // Add user to the state array
        console.log(action.payload);
        if(action.payload.errcode===0)
        {
          state.auth = action.payload;
          state.websocket.url = `wss://${base_url}/${api_url}/subscribe?`;
          let date = new Date();
          state.token.startTime =  date.toISOString(true);
  
          state.handle.accept_url = `${url}/call/accept_inbound?access_token=${state.auth.access_token}`;
          state.handle.reject_url = `${url}/call/refuse_inbound?access_token=${state.auth.access_token}`;
  
        }else{
          state.error = action.payload;
        }

      });
      builder.addCase(refreshToken.pending, (state, action) => {
        state.token.send_refresh_token = true;
      });
      builder.addCase(refreshToken.fulfilled, (state, action) => {
        // Add user to the state array
        console.log(action.payload);
        if(action.payload.errcode===0)
        {
          state.auth = action.payload;
          state.websocket.url = `wss://${base_url}/${api_url}/subscribe?`;
          state.token.send_refresh_token = true;
          let date = new Date();
          state.token.startTime =  date.toISOString(true);
  
          state.handle.accept_url = `${url}/call/accept_inbound?access_token=${state.auth.access_token}`;
          state.handle.reject_url = `${url}/call/reject_inbound?access_token=${state.auth.access_token}`;
        }else{
          state.error = action.payload;
        }

      });
      builder.addCase(handleApiCall.fulfilled, (state, action) => {
        // Add user to the state array
        console.log(action.payload);
      });
      
    }
});

export const {
    updateCaller,
    updateIncoming,
    updateAuth,
    updateEvents,
    updateSendRefreshToken,

  } = apiCallSlice.actions;

export default apiCallSlice.reducer;


export const getCaller = (state) => state.callApi.caller;
export const getIncoming = (state) => state.callApi.incoming;
export const getAuth = (state) => state.callApi.auth;
export const getWebsocketUrl = (state) => state.callApi.websocket.url;
export const getEvents = (state) => state.callApi.events;

export const getTokenMgn  = (state) => state.callApi.token;

export const getHandle  = (state) => state.callApi.handle;

