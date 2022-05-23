import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Transfer } from "../target/types/transfer";

describe("transfer", () => {
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Transfer as Program<Transfer>;
  const senderKeyPair = anchor.web3.Keypair.generate();
  const receiverKeyPair = anchor.web3.Keypair.generate();

  it('Is Initialize!', async () => {
      const AIRDROP_AMOUNT = 10 ** 9;
      await safeAirdrop(program.provider.connection, senderKeyPair.publicKey, AIRDROP_AMOUNT);
      await safeAirdrop(program.provider.connection, receiverKeyPair.publicKey, AIRDROP_AMOUNT);
  });
  
  it('send sol', async() => {
    const amount = 0.01 * 10 ** 9;
    const tx = await program.methods.sendSolToAddr(new anchor.BN(amount))
      .accounts({
          toAddress: receiverKeyPair.publicKey,
          authority: senderKeyPair.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
      }).signers([senderKeyPair]).rpc();
      console.log("Your transaction signature", tx);
      const senderBalance = await program.provider.connection.getBalance(senderKeyPair.publicKey);
      const receiverBalance = await program.provider.connection.getBalance(receiverKeyPair.publicKey);
      console.log("senderBalance", senderBalance);
      console.log("receiverBalance", receiverBalance);
  });
});

async function safeAirdrop(connection: anchor.web3.Connection, destination: anchor.web3.PublicKey, amount = 100000000) {
  while (await connection.getBalance(destination) < amount){
    try{
      // Request Airdrop for user
      await connection.confirmTransaction(
        await connection.requestAirdrop(destination, amount),
        "confirmed"
      );
    }catch{
    }
  };
}