import React, { useState, useEffect } from 'react';
import { Negotiator } from 'token-negotiator';
// import { Negotiator } from './temp/negotiator';
import Card from './Card';
import './App.css';

// A minimal example to read tokens and render them to a view.

const mockTicketData = [
  {
    ticket: "MIGWMA0MATYCBWE3ap3-AgEABEEEKJZVxMEXbkSZZBWnNUTX_5ieu8GUqf0bx_a0tBPF6QYskABaMJBYhDOXsmQt3csk_TfMZ2wdmfRkK7ePCOI2kgNCAOOZKRpcE6tLBuPbfE_SmwPk2wNjbj5vpa6kkD7eqQXvBOCa0WNo8dEHKvipeUGZZEWWjJKxooB44dEYdQO70Vgc",
    secret:"45845870684",
    id:"mah@mah.com"
  },
  {
    ticket: "MIGXMA4MAjExAgVhN2qd_gIBAARBBCiWVcTBF25EmWQVpzVE1_-YnrvBlKn9G8f2tLQTxekGLJAAWjCQWIQzl7JkLd3LJP03zGdsHZn0ZCu3jwjiNpIDQgBbJBY1Ctlp_czUwB85yF1e5kpZ-lQ_-UZ7jaCYSFoEx028Jit1HIDLCJezKdsNn9c9IO7-HC-_r2ZLaYQ9GGrbHA==",
    secret:"45845870684",
    id:"mah@mah.com"
  },
  {
    ticket: "MIGTMAoMATYCAgDeAgEABEEEKJZVxMEXbkSZZBWnNUTX_5ieu8GUqf0bx_a0tBPF6QYskABaMJBYhDOXsmQt3csk_TfMZ2wdmfRkK7ePCOI2kgNCAEZYXbNmWXDsAqIc5uf7SirR-dLCMLdEVN5teFrV93VbcKE_DED8c6jtFQ5LH2SRXwPEtXZqWfEh1c2OHTEYqfwb",
    secret:"45845870684",
    id:"mah@mah.com"
  },
  {
    ticket: "MIGSMAkMATECAQECAQAEQQQollXEwRduRJlkFac1RNf_mJ67wZSp_RvH9rS0E8XpBiyQAFowkFiEM5eyZC3dyyT9N8xnbB2Z9GQrt48I4jaSA0IAOf4d0N9shWfPIgRXZPdBRhlRyIARDT0tJwNWYwy2ILVKnIy-qPzFsgdI6sZHm1OY6UsJKuDlp0A7EMC8vS5YhRs=",
    secret:"45845870684",
    id:"mah@mah.com"
  },
];

function App() {

  if(document.hasStorageAccess) {
    document.hasStorageAccess().then((hasAccess) => {
      console.log("user access: ", hasAccess);
      if (!hasAccess) {
        document.requestStorageAccess().then(hasAccessFromRequest => {
          console.log("user access from request: ", hasAccessFromRequest);
        });
      }
    });
  }

  // local State: tokens[], setTokens: Method to update the state of tokens.
  let [tokens, setTokens] = useState([]);
  // create instance of Negotiator.
  const filter = {};
  const token = "devcon-ticket";
  const options = {};
  const negotiator = new Negotiator(filter, token, options);
  //
  useEffect(async () => {
    // on success assign tokens to react state
    const devconData = await negotiator.negotiate();
    if(devconData.success) setTokens(devconData.tokens);
  }, []);

  // This is one example of how the ticket can be loaded inside a new tab
  // when navigating back to this page you will find the ticket in view.
  // Alternative ways include; navigation to the ticket store page, which redirects
  // back to this page once complete.
  const openTicketInNewTab = async ({event, ticket, secret, id}) => {
    event.preventDefault();
    const magicLink = `https://devcontickets.herokuapp.com/outlet/?ticket=${ticket}&secret=${secret}&id=${id}`;
    negotiator.addTokenThroughIframe(magicLink); 
    // For this demo - where tickets are loaded from within the page a timeout is used to allow time for the token to be negotiated
    // and loaded into the view. 
    // In a scenario where the ticket is embeded within a URL, when the end user navigates to the link, links could be provided in this
    // page to direct the user e.g. to Devcon or third parties who accept the token. 
    negotiator.negotiate().then(res => {
      if(res.success) setTokens(res.tokens);
    });
  }

  return (
    <main>
      <a href="/"><img className="logo" src="./devcon.svg"></img></a>
      <div className="flexCenter">
        <p>[DEMO Ticket Issuer Website]</p>
      </div>
      <div className="flexCenter">
        <img className="devcon_bogota" src="./devcon_bogota.svg"></img>
      </div>
      <div className="flexCenter">
        <p>A Devcon ticket provides access to the event and special offers between the dates X-XX for hotel bookings, travel, restaurants and more.</p>
      </div>
      <div className="flexCenter">
        <p>Your tickets:</p>
      </div>
      <div className="flexCenter">
        <div className="tokensWrapper">
          {
            tokens && tokens.length > 0 && tokens.map((tokenInstance, index) => {
              return <Card key={index} tokenInstance={tokenInstance} />
            })
          }
          {
            !tokens.length && <div>
              <b>- no ticket found -</b>
              <p>Generate ticket:</p>
              <div className="ticketWrapper">
                {
                  mockTicketData.map((mockTicket, index) => {
                    return (
                      <button key={index} className="makeTicket" onClick={event => openTicketInNewTab({ 
                        event,
                        ticket: mockTicket.ticket,
                        secret: mockTicket.secret,
                        id: mockTicket.id
                      })}>Create Ticket</button> 
                    )
                  })
                }
              </div>
            </div>
          }
        </div>
      </div>
    </main>
  );
}

export default App;