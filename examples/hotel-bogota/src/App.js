import React, { useState, useEffect } from 'react';
import LogoCard from './LogoCard';
import RoomCard from './RoomCard';
import TokenNotificationCard from './TokenNotificationCard';
import Typography from '@material-ui/core/Typography';
import EthereumLogo from './EthereumLogo';
import BookingDate from './BookingDate';
import { Negotiator } from 'token-negotiator';
import './App.css';

// mock data e.g. server side hotel room price database
const mockRoomData = [{"type":"Deluxe Room","price": 0.5,"frequency":"per night","image":"./hotel_3.jpg"},{"type":"King Suite","price": 0.4,"frequency":"per night","image":"./hotel_2.png"},{"type":"Superior Deluxe Suite","price": 0.6,"frequency":"per night","image":"./hotel_1.jpg"}]
// mock discount of 10% applied to any ticket selected. In a real world scenario, this maybe different per ticket type and retrieved from a backend service.
const mockRoomDiscountData = 10;

function App() {

  // Devcon Tickets (local react state of tokens)
  let [tokens, setTokens] = useState([]);

  // local react state of token specical offer
  let [freeShuttle, setFreeShuttle] = useState(false);

  // local react state of hotel room data
  let [roomTypesData, setRoomTypesData] = useState([]);

  // Selected token instance to apply discount, with the discount value on hotel booking.
  let [discount, setDiscount] = useState({ value: undefined, tokenInstance: null });

  // Add filters when specific tokens are required
  let filter = {};

  // set required negotiator options
  const options = {
    attestationOrigin: "https://stage.attestation.id",
    tokenOrigin: "https://tokenscript.github.io/token-negotiator/examples/ticket-issuer/build/index.html"
    // tokenOrigin: "http://localhost:3000/" // Development Use
  };

  // Create new instance of the Negotiator with params
  const negotiator = new Negotiator(filter, options);
  
  // async example of initial hotel data loaded from source
  const getRoomTypesData = () => {
    return mockRoomData;
  }

  // example to return a discount
  const getApplicableDiscount = () => {
    return mockRoomDiscountData;
  }

  // When a ticket is present and user applies it, the discount will be shown
  const applyDiscount = async (ticket) => {
    if (!ticket) {
      setDiscount({ value: undefined, tokenInstance: undefined })
    } else {
      setDiscount({ value: getApplicableDiscount(), tokenInstance: ticket });
    }
  }

  // apply discount
  const book = async (form) => {
    // TODO add web3 transaction here to use ticket
    // Ticket can be acquired from discount object
    console.log(form);
  }

  // react effect
  useEffect(() => {
    // on success assign tokens / changes to react state
    negotiator.getTokenInstances(res => {
      if(res.success){
         setTokens(res.tokens);
         setFreeShuttle(true);
      }
    });
    // assign room data to react local state
    setRoomTypesData(getRoomTypesData());
  }, []);

  return (
    <div>
      <LogoCard title={"Hotel Bogota"} />
      <div style={{ position: 'absolute', top: '0px', right: '20px' }}>
        {tokens.length > 0 &&
          <TokenNotificationCard tokensNumber={tokens.length} />
        }
      </div>
      <BookingDate />
      <div className="roomCardsContainer">
        {roomTypesData.map((room, index) => {
          return <RoomCard
            key={index}
            room={room}
            applyDiscount={applyDiscount}
            discount={discount}
            tokens={tokens}
            book={book}
          />
        })}
      </div>
      {
        freeShuttle &&
        <div>
          <EthereumLogo />
          <Typography
            style={{ padding: '20px' }}
            className="applyDiscountCopyContainer"
            gutterBottom
            variant="body2"
            component="p">
            Free shuttle service available to you as a Devcon Ticket holder! Enjoy the event.
          </Typography>
        </div>
      }
    </div>
  );
}

export default App;