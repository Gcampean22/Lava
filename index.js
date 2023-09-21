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
const aptos_1 = require("aptos");
const lava_sdk_1 = require("@lavanet/lava-sdk");
function runAptosRequest(aptosClient, accountAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield aptosClient.getAccountResources(accountAddress);
            return result;
        }
        catch (error) {
            throw error;
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const lavaGatewayRpcUrl = 'https://gateway.lavanet.xyz/projects/817b9e24bd1ad2619b69bdab90ad3383';
            const doNotFixNodeUrl = !lavaGatewayRpcUrl.endsWith('/v1');
            const aptosClient = new aptos_1.Aptos({
                nodeUrl: lavaGatewayRpcUrl,
                doNotFixNodeUrl,
            });
            const lavaSDK = yield new lava_sdk_1.LavaSDK({
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
            yield runAptosRequest(aptosClient, accountAddress);
            let validRequestCount = 0;
            let errorCount = 0;
            for (let i = 0; i < 100; i++) {
                try {
                    yield runAptosRequest(aptosClient, accountAddress);
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
