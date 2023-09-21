import { AptosClient } from 'aptos';
import { LavaSDK } from "@lavanet/lava-sdk";


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

async function main() {
  try {
    const lavaGatewayRpcUrl = 'https://g.w.lavanet.xyz:443/gateway/apt1/rest/817b9e24bd1ad2619b69bdab90ad3383';
    const doNotFixNodeUrl = !lavaGatewayRpcUrl.endsWith('/v1');
    const aptosClient = new AptosClient(lavaGatewayRpcUrl);
    const sdk = require("@lavanet/lava-sdk");

    const lavaSDK = await new sdk.LavaSDK({
      badge: {
        badgeServerAddress: "https://badges.lavanet.xyz",
        projectId: "817b9e24bd1ad2619b69bdab90ad3383",
      },
      chainID: "APT1",
      rpcInterface:  "rest",
      geolocation: "2",
    });

    const info = await lavaSDK.sendRelay({
      method: "GET",
      url: "/",
    });

    const accountAddress = '0xb794f5ea0ba39494ce839613fffba74279579268';
    let validRequestCount = 0;
    let errorCount = 0;

    for (let i = 0; i < 100; i++) {
      try {
        const result = await aptosClient.getAccountResources(accountAddress);
        validRequestCount++;
      } catch (error) {
        errorCount++;
        console.error('Error:', error);
      }
    }

    
    console.log("Blockchain Info:", blockchainInfo);

    console.log(`Valid Requests: ${validRequestCount}, Errors: ${errorCount}`);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();