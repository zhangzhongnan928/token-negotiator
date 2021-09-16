import { TokenContextProvider } from './token-negotiator-local';
import BookingPage from './BookingPage';

const App = () => {
  const options = {
    tokenSelectorContainer: ".tokenSelectorContainerElement"
  };
  return (
    <TokenContextProvider tokenName={'devcon-ticket'} options={options}>
      <>
        <BookingPage/>
        <div className="tokenSelectorContainerElement" style={{position: 'fixed', right: 0, bottom: 0}}/>
      </>
    </TokenContextProvider>
  )
}

export default App;
