const { sha256 } = require("ethereum-cryptography/sha256");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { hexToBytes, toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const secp = require("ethereum-cryptography/secp256k1");

//const privateKey = secp.utils.randomPrivateKey();
//const message = Buffer.from('Send 20 from 0x1 to 0x2')
// Generate a random private key
//const privateKey = Buffer.from(genprivateKey);

// Create a message to sign
//const message = 'Hello, World!';

// Hash the message using Keccak-256
//const messageHash = keccak256(message);
//console.log(toHex(messageHash));
// // Sign the message hash with the private key, using recovery bit true
//const signature = secp.sign(toHex(messageHash), privateKey, { recoverable: true });
//console.log(signature.then(res=>console.log(toHex(res))));

// async function signMessage(msg) {
//     // sign the hash message with the private key and set recovered to true to get the recovered bit
//     try{
//         const data = await secp.sign(msg, privateKey, {recovered: true}).then(res=>{return res});
//         //let result;
//         //data.then(res=>{result=res;console.log('res',result)});
//         //console.log('inside async',data[0]);
//         return data;
//     }catch(e){
//         console.log(e);
//     }
// }


// let recoveryBit;
// let signature;
// let publicKey;
// let mainsignature;

// async function signMessage(msg, privateKey) {
//   try {
//     const result = await secp.sign(msg, privateKey, {recovered: true});
//     console.log('Result:', result);
//     mainsignature = result;
//     signature = result[0];
//     recoveryBit = result[1];
//   } catch (error) {
//     console.error(error);
//   }
// }





// async function signverify(){
//   await signMessage(messageHash, privateKey).then((res)=>{
//     console.log('After sign',recoveryBit,signature,mainsignature);
// });

// console.log('recoveryBit',recoveryBit);
// console.log('signature',signature);



// await recoverKey(messageHash,signature,recoveryBit).then(res=>{
//   console.log(res);
//   console.log('long public key',toHex(res));
//     //toHex(res);
//   publicKey =  toHex(res.slice(-20));  //toHex(res);
// }).catch(err=>console.log(err));
// console.log('publickey',publicKey);

// const isSigned = secp.verify(mainsignature, messageHash, publicKey);
// console.log('isSigned',isSigned)



//signverify();

async function signandverify(props) {
  // You pass either a hex string, or Uint8Array
  //const privateKey = secp.utils.randomPrivateKey();
  const privateKey = props.privateKey;
  const message = Buffer.from(`Send ${props.amount} from ${props.sender} to ${props.recipient}`);
  const messageHash = keccak256(message);

  //console.log('privatekey',toHex(privateKey));
  //const messageHash = toHex(sha256(message));
  console.log('messagehash',messageHash);
  const publicKey = secp.getPublicKey(privateKey);
  console.log('publicKey',toHex(publicKey));
  const signature = await secp.sign(messageHash, privateKey,{recovered:true});
  console.log('signature',signature);
  const recoverPublicKey = secp.recoverPublicKey(messageHash, signature[0], signature[1]);
  console.log('recoveredPublicKey',toHex(recoverPublicKey.slice(-20)));
  const isSigned = secp.verify(signature[0], messageHash, recoverPublicKey);
  console.log('isSigned',isSigned)
  return isSigned;
};

module.exports = signandverify;



// let sig;
// const signature = signMessage(messageHash).then(([data,number])=>{
//     sig=[data,number];
// });

// console.log('signature',sig);

//const data = secp.sign(messageHash, privateKey, {recovered: true});
//console.log('data',data)

// async function recoverKey(msg, signature, recoveryBit) {
//     // recover the public key by passing in the hash message, signature, and recovery bit
//     return secp.recoverPublicKey(msg, signature, recoveryBit);
// }
//console.log('s',signature);

//  const publicKey = recoverKey(messageHash,signature,recoveryBit).then(res=>console.log(res)).catch(err=>console.log(err));
//  console.log(publicKey);
// Recover the public key from the signature and message hash, using recovery bit true
//const publicKey = secp.recoverPublicKey(messageHash, signature.signature, signature.recovery, true);


//console.log(publicKey);

