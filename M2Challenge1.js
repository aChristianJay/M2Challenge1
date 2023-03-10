
// Import Solana web3 functinalities
const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js");


const UserKey = process.argv.slice(2).toString();

// Exact the public and private key from the keypair
const publicKey = new PublicKey(UserKey).toString();


// Connection to the Devnet
console.log("Public Key of the generated keypair", publicKey);

// Get the wallet balance from the user private key
const getWalletBalance = async () => {
    try {
        // Connect to the Devnet
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        console.log("Connection object is:", connection);

       
        const walletBalance = await connection.getBalance(
            new PublicKey(publicKey)
        );
        console.log(`Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL`);
    } catch (err) {
        console.log(err);
    }
};

const airDropSol = async () => {
    try {
      // Connect to the Devnet
      const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

      // Request airdrop of 2 SOL to the wallet
      console.log("Airdropping some SOL to my wallet!");
      const fromAirDropSignature = await connection.requestAirdrop(
        new PublicKey(publicKey),
        2 * LAMPORTS_PER_SOL
      );
      await connection.confirmTransaction(fromAirDropSignature);
    } catch (err) {
      console.log(err);
    }
  };

// Show the wallet balance before and after airdropping SOL
const mainFunction = async () => {
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
}

mainFunction();
