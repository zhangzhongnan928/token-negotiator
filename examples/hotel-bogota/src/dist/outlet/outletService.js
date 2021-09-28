import { readTokens } from '../core';
class OutletService {
    constructor() {
        this.eventReciever = (data) => {
            switch (data.evt) {
                case 'getTokens':
                    debugger;
                    const tokens = readTokens(data.localStorageItemName);
                    this.eventSender.emitTokens(tokens);
                    break;
            }
        };
        this.eventSender = {
            emitTokens: (tokens) => {
                debugger;
                window.parent.postMessage({
                    evt: 'setTokens',
                    tokens: tokens
                }, "*");
            }
        };
    }
    ;
}
export default OutletService;
