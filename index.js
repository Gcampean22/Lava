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
const blockchainInfo = {
    chain_id: 1,
    epoch: "4138",
    ledger_version: "270507752",
    oldest_ledger_version: "120707752",
    ledger_timestamp: "1695324045201005",
    node_role: "full_node",
    oldest_block_height: "46900972",
    block_height: "94924592",
    git_hash: "84a67d185df4a9c12947f6091d0c0dc3427703f1",
};
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const lavaGatewayRpcUrl = 'https://g.w.lavanet.xyz:443/gateway/apt1/rest/817b9e24bd1ad2619b69bdab90ad3383';
            const doNotFixNodeUrl = !lavaGatewayRpcUrl.endsWith('/v1');
            const aptosClient = new aptos_1.AptosClient(lavaGatewayRpcUrl);
            const lavaSDK = yield new lava_sdk_1.LavaSDK({
                privateKey: 'c197c8019f312cd9fc4adaa24e7d0dc5998942abc13ded641eb5d261636d8ef4',
                chainID: "APT1",
                rpcInterface: "rest",
            });
            const info = yield lavaSDK.sendRelay({
                method: "GET",
                url: "/",
            });
            const accountAddress = '0xFf11d49abC89Ea8F2ffF88f4331B11649b274E3A';
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
            console.log("Blockchain Info:", blockchainInfo);
            console.log(`Valid Requests: ${validRequestCount}, Errors: ${errorCount}`);
        }
        catch (error) {
            console.error('Error:', error);
        }
    });
}
main();
