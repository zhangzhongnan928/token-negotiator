import { SignedDevconTicket } from './Attestation/SignedDevonTicket';

/*

    Changes to implement:

    attestationOrigin = idAttestationOrigin
    tokenOrigin = tokenAttestationOrigin
    tokenIssuerPublicKey: "TODO", // e.g. Issuer would generate this.

*/

interface Item {
    onChain: any;
    tokenIssuerPublicKey?: any;
    title?: any;    
    tokenName?: any;
    attestationOrigin?: any;
    tokenOrigin?: any;
    tokenUrlName?: any;
    tokenSecretName?: any;
    tokenIdName?: any;
    unsignedTokenDataName?: any;
    itemStorageKey?: any;
    ethKeyitemStorageKey?: any;
    emblem?: any;
    unEndPoint?: any;
    tokenParser?: any;
    smartContractAddress?: any;
    symbol?: any;
}

interface TokenLookupInterface {
    [issuer: string]: Item
}

export const tokenLookup:TokenLookupInterface = {
    "devcon": {
        onChain: false,
        tokenIssuerPublicKey: "TODO", // e.g. Issuer would generate this.
        title: 'Devcon 2022',
        tokenName: 'devcon-ticket-local-3002',
        attestationOrigin: "https://stage.attestation.id/", // CHECK, EMAIL, TWITTER, WALLET ADDRESS MATCH
        tokenOrigin: "http://localhost:3002/", // TOKEN ORIGIN IS TOKEN ISSUER WEB PAGE
        tokenUrlName: 'ticket', // MAGIC LINK QUERY PARAM
        unEndPoint: 'https://crypto-verify.herokuapp.com/use-devcon-ticket', // UNPREDICTABLE NUMBER
        tokenSecretName: 'secret', // MAGIC LINK QUERY PARAM
        tokenIdName: 'id', // MAGIC LINK QUERY PARAM
        unsignedTokenDataName: 'ticket', // MAGIC LINK QUERY PARAM
        itemStorageKey: 'dcTokens', // LOCAL STORAGE COOKIE NAME -
        ethKeyitemStorageKey: 'dcEthKeys', // 
        emblem: 'https://raw.githubusercontent.com/TokenScript/token-negotiator/main/mock-images/devcon.svg', // CAN REMOVE THIS
        tokenParser: SignedDevconTicket // 
    }
}
