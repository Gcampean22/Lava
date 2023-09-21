import { Aptos } from 'aptos';
import { LavaSDK } from "@lavanet/lava-sdk"; 

async function runAptosRequest(aptosClient: Aptos, accountAddress: string) {
  try {
    const result = await aptosClient.getAccountResources(accountAddress);
    return result;
  } catch (error) {
    throw error;
  }
}

async function main() {
  try {
    
    const lavaGatewayRpcUrl = 'https://gateway.lavanet.xyz/projects/817b9e24bd1ad2619b69bdab90ad3383';
    const doNotFixNodeUrl = !lavaGatewayRpcUrl.endsWith('/v1');
    const aptosClient = new Aptos({
      nodeUrl: lavaGatewayRpcUrl,
      doNotFixNodeUrl,
    });
    const lavaSDK = await new LavaSDK({
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
    await runAptosRequest(aptosClient, accountAddress);
    let validRequestCount = 0;
    let errorCount = 0;

    for (let i = 0; i < 100; i++) {
      try {
        await runAptosRequest(aptosClient, accountAddress);
        validRequestCount++;
      } catch (error) {
        errorCount++;
        console.error('Error:', error);
      }
    }

    console.log(`Valid Requests: ${validRequestCount}, Errors: ${errorCount}`);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();