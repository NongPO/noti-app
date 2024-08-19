import React, { useEffect, /*useState,   useCallback */ } from 'react';
import '../assets/Css/AboutPage.css';

import { useSelector, useDispatch } from "react-redux";
import {
  handleApiCall,
  getCaller,
  getIncoming,
  getEvents,
  updateCaller,
  updateIncoming,
  getHandle
} from "../store/callApi";


const AboutPage = () => {
  const dispatch = useDispatch();
  const caller = useSelector((state) => getCaller(state));
  const incomingCall = useSelector((state) => getIncoming(state));
  const events = useSelector((state) => getEvents(state));
  const callHandle = useSelector((state) => getHandle(state));

  useEffect(() => {

    console.log(events);
    if (events.events && events.events.type)
    {
        let caller={
          name :'',
          ext : '',
          isWaiting: true,
          callId :'',
          error : null
        };

        switch(events.events.type)
        {
          case 30011:

            break;
          case 30012:

            break;
          case 30016:
            //   let caller={
            //       name : events.events.sn,
            //       ext : events.events.msg.members[0].extension.number,
            //       isWaiting: false,
            //       callId : events.events.msg.call_id,
            //       error : null
            //   };
            //   dispatch(updateIncoming(
            //     {
            //       call_id:events.events.msg.call_id,
            //       channel_id:events.events.msg.members[0].extension.channel_id
            //     }
            //   ))
              
            //   dispatch(updateCaller( caller));
            break;
          default:
            dispatch(updateCaller( caller));
            break;
        }
    }


    // if (events.events && events.events.msg.hasOwnProperty("members") && events.events.msg.members[0]) {
    //   let caller={
    //       name : events.events.sn,
    //       ext : events.events.msg.members[0].extension.number,
    //       isWaiting: false,
    //       callId : events.events.msg.call_id,
    //       error : null
    //   };
    //   dispatch(updateIncoming(
    //     {
    //       call_id:events.events.msg.call_id,
    //       channel_id:events.events.msg.members[0].extension.channel_id
    //     }
    //   ))
      
    //   dispatch(updateCaller( caller));
    // }

    // if (events.events && events.events.msg.hasOwnProperty("call_from") && events.events.msg.call_from) {
    //   let call_from=events.events.msg.call_from;
    //   let call_to=events.events.msg.call_to;
    //   let call_duration=events.events.msg.call_duration;
    //   let caller={
    //     name : events.events.sn,
    //     ext : `call from ${call_from} to ${call_to} duration ${call_duration} `,
    //     isWaiting: true,
    //     callId : events.events.msg.call_id,
    //     error : null
    // };
    
    //   dispatch(updateCaller( caller));
    // }

    return () => {

    }
  },[events,dispatch]);

  const handleAnswerClick = async () => {
    console.log(incomingCall);
     dispatch( handleApiCall(callHandle.accept_url, incomingCall.channel_id));
  };

  const handleRejectClick = async () => {
    console.log(incomingCall);
     dispatch(handleApiCall(callHandle.reject_url, incomingCall.channel_id));
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 overflow-hidden">
      <div className="relative z-10 bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
        <img
          src="https://scontent.fbkk12-2.fna.fbcdn.net/v/t1.6435-9/74268828_2186597561640157_2831256456001486848_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeEVhxxHEJ5CBu6xWmqBfKh545j-HUQhzUPjmP4dRCHNQ-SNMCsqbUSE3glWtCG-dNUfDX7mukqYOtm_wPAliXar&_nc_ohc=JDMlubRFAy0Q7kNvgGf4MgA&_nc_ht=scontent.fbkk12-2.fna&oh=00_AYAbxuGowO_y4wO0z2ks-wTvu4PKuzJHOJ1f9cZzghXB6A&oe=66E28FD4"
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        <h2 className="text-2xl font-semibold mb-2">{caller.name || 'No Call'}</h2>
        <p className="text-gray-600 mb-4">{caller.ext ? `Ext. ${caller.ext}` : 'No active extension'}</p>

        {caller.isWaiting && !caller.error && (
          <p className="text-gray-600 mb-4">Waiting for an incoming call...</p>
        )}

        {!caller.isWaiting && caller.callId && (
          <div className="flex justify-between mb-4">
            <button
              className="px-10 py-3 rounded-full button-answer"
              aria-label="Answer"
              onClick={handleAnswerClick}
            >
              Answer
            </button>
            <button
              className="px-11 py-2 rounded-full button-reject"
              aria-label="Reject"
              onClick={handleRejectClick}
            >
              Reject
            </button>
          </div>
        )}

        {caller.error && (
          <p className="text-red-600 mb-4">{caller.error}</p>
        )}
      </div>
    </div>
  );
};

export default AboutPage;
