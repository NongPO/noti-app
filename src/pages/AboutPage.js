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
          name :events.events.sn,
          ext : '',
          isWaiting: true,
          callId : events.events.msg.call_id,
          error : null
        };
        
        console.log('events.events.type:',events.events.type);

        switch(events.events.type)
        {
          case 30011:
            // caller.isWaiting = false;
            // if ( events.events.msg.hasOwnProperty("members"))
            //   {
            //     events.events.msg.members.forEach((member) => {
            //       console.log(member);

            //       if(member.hasOwnProperty("inbound"))
            //       {
            //         caller.ext = `call from ${member.inbound.from} to ${member.inbound.to} status ${member.inbound.member_status}`;
            //         dispatch( updateIncoming(
            //           {
            //             call_id:events.events.msg.call_id,
            //             channel_id:member.inbound.channel_id
            //           }
            //         ));
            //         return;
            //       }

            //       if(member.hasOwnProperty("extension"))
            //         {
            //           caller.ext = `call from ${member.extension.number}   status ${member.extension.member_status}`;
            //           dispatch(updateIncoming(
            //             {
            //               call_id:events.events.msg.call_id,
            //               channel_id:member.extension.channel_id
            //             }
            //           ));
            //           return;
            //         }

            //     });
            //   }

            break;
          case 30016:
            caller.isWaiting = false;
            if ( events.events.msg.hasOwnProperty("members"))
            {

              events.events.msg.members.forEach((member) => {

                console.log(member);

                if(member.hasOwnProperty("inbound"))
                {
                  caller.ext = `call from ${member.inbound.from} to ${member.inbound.to} status ${member.inbound.member_status}`;
                  dispatch(updateIncoming(
                    {
                      call_id:events.events.msg.call_id,
                      channel_id:member.inbound.channel_id
                    }
                  ));
                  return;
                }
              });
            }
            break;
          case 30012:
            caller.isWaiting = true;
            break;
          default:

            break;
        }

        dispatch(updateCaller(caller));
    }


    return () => {

    }
  },[events,dispatch]);

  const handleAnswerClick = async () => {
    console.log(incomingCall);
    if (callHandle.accept_url && incomingCall.channel_id) {
      dispatch(handleApiCall({ action_url: callHandle.accept_url, channel_id: incomingCall.channel_id }));
    } else {
      console.error('Error: action_url or channel_id is undefined');
    }
  };
  
  const handleRejectClick = async () => {
    console.log(incomingCall);
    if (callHandle.reject_url && incomingCall.channel_id) {
      dispatch(handleApiCall({ action_url: callHandle.reject_url, channel_id: incomingCall.channel_id }));
    } else {
      console.error('Error: action_url or channel_id is undefined');
    }
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
