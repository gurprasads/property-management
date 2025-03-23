const { Client, AccountBalanceQuery, PrivateKey } = require('@hashgraph/sdk');
require('dotenv').config();

async function checkBalance() {
  try {
    console.log("Account ID:", process.env.HEDERA_ACCOUNT_ID);
    console.log("Private Key (first 10 chars):", process.env.HEDERA_PRIVATE_KEY.substring(0, 10));

    // Use only node 0.0.3
    const client = Client.forNetwork({
      "35.237.200.180:50211": "0.0.3"
    });
    const privateKey = PrivateKey.fromStringED25519(process.env.HEDERA_PRIVATE_KEY);
    client.setOperator(process.env.HEDERA_ACCOUNT_ID, privateKey);

    console.log("Connecting to Testnet (Node 0.0.3)...");
    const balance = await new AccountBalanceQuery()
      .setAccountId(process.env.HEDERA_ACCOUNT_ID)
      .execute(client);

    console.log(`Balance: ${balance.hbars.toString()} HBAR`);
    client.close();
  } catch (err) {
    console.error("Error:", err);
    if (err.nodeAccountId) console.error("Failed Node:", err.nodeAccountId);
  }
}

checkBalance();
