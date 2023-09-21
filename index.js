"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Aptos_1 = require("Aptos");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const lavaGatewayRpcUrl = 'https://gateway.lavanet.xyz/projects/817b9e24bd1ad2619b69bdab90ad3383';
            const doNotFixNodeUrl = !lavaGatewayRpcUrl.endsWith('/v1');
            const aptosClient = new Aptos_1.Aptos({
                nodeUrl: lavaGatewayRpcUrl,
                doNotFixNodeUrl,
            });
            // Add your additional code here
            const sdk = require("@lavanet/lava-sdk");
            const lavaSDK = yield new sdk.LavaSDK({
                badge: {
                    badgeServerAddress: "https://badges.lavanet.xyz",
                    projectId: "817b9e24bd1ad2619b69bdab90ad3383",
                },
                chainID: "APT1",
                rpcInterface: "rest",
                geolocation: "2",
            });
            const info = yield lavaSDK.sendRelay({
                method: "GET",
                url: "/",
            });
            const accountAddress = '0xb794f5ea0ba39494ce839613fffba74279579268';
            let validRequestCount = 0;
            let errorCount = 0;
            for (let i = 0; i < 100; i++) {
                try {
                    const result = yield aptosClient.getAccountResources(accountAddress);
                    validRequestCount++;
                }
                catch (error) {
                    errorCount++;
                    console.error('Error:', error);
                }
            }
            console.log(`Valid Requests: ${validRequestCount}, Errors: ${errorCount}`);
        }
        catch (error) {
            console.error('Error:', error);
        }
    });
}
main();
