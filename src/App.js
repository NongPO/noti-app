import React, {  useState, useEffect , useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './component/Header';
import Footer from './component/Footer';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/Contact'; // นำเข้าหน้านี้
import Aboutus from '../src/pages/Aboutus'


import { useSelector, useDispatch } from "react-redux";
import {
 // getToken,
  refreshToken,
  getTokenMgn,
  getAuth,
  getWebsocketUrl,
  updateEvents,
  updateSendRefreshToken
} from "./store/callApi";


function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => getAuth(state));
  const wss_url = useSelector((state) => getWebsocketUrl(state));
  const tokenMgn  = useSelector((state) => getTokenMgn(state));
  const [socket, setSocket] = useState(null);


  const heartBeat = useCallback(async () => {
    /// Please read
    /// https://help.yeastar.com/en/p-series-appliance-edition/developer-guide/monitor-websocket-api-events-with-postman.html
    if(socket)
    {
     // console.log('Send a heartbeat to keep the connection alive.');
      socket.send('heartbeat');
    }

    if(tokenMgn && tokenMgn.startTime && auth.refresh_token && auth.refresh_token!=="" && auth.refresh_token_expire_time)
    {
      let endDate   = new Date();
      let startDate = new Date(tokenMgn.startTime)
      let seconds = (endDate.getTime() - startDate.getTime()) / 1000;
      let remain = auth.access_token_expire_time - seconds
      if(remain <= 1000)
      {
        console.log('refreshToken for Auth.');
        dispatch( refreshToken());
      }else{
       // console.log('refreshToken remain:', remain);
      }

    }

  }, [socket , tokenMgn, dispatch, auth]);




  useEffect(() => {

    const intervalId = setInterval(() => {
      heartBeat();
    }, 5000); // Poll every 5 seconds


    if(tokenMgn && tokenMgn.send_refresh_token === false)
    {
      dispatch( updateSendRefreshToken(true));
      console.log('refreshToken for Auth.');
      dispatch( refreshToken());
    }


    if(wss_url !== "" && auth.access_token !== "" && socket === null && auth.access_token !== undefined)
    {
      
        const url = `${wss_url}access_token=${auth.access_token}`;
        const ws = new WebSocket(url);
        console.log('Connected to ', url);
        ws.onopen = () => {
          console.log('Connected to WebSocket');
          ws.send(JSON.stringify({topic_list:[30016,30011]}));


        };
    
        ws.onmessage = async (event) => {
          try
          {
            const obj = JSON.parse(event.data);
            //console.log(obj);
            if (obj && obj.hasOwnProperty("msg") && obj.msg) {
              const msg =  JSON.parse(obj.msg);
              let evObj = {
                events: obj
              };
              evObj.events.msg = msg;
              console.log(msg);
              dispatch(updateEvents(evObj));
            }
            
          }catch{}

        };
    
        ws.onclose = () => {
          console.log('WebSocket connection closed');
        };
    
        setSocket(ws);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [auth,tokenMgn, wss_url, socket, setSocket, heartBeat, dispatch]);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
        <Route path="/" element={<AboutPage />} />
          <Route path='/Aboutus' element={<Aboutus/>} />
          <Route path="/AboutPage" element={<AboutPage />} />
          <Route path="/Aboutus" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
export default App
