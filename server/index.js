const express = require("express");
const app = express();
const cors = require("cors");
const signandverify = require("./signatureUtil");
const port = 3042;

app.use(cors());
app.use(express.json());

const PRIVATE_KEY = 'f2d2fac8bb463a35fd7db650e95c03fcfd5f0d7fbfea4a0fc418e971d1084072';

let address_list = ["0462b29408196a947972094a31757bbf354e1aec51cfb20c1c04129e8c53ff8afab4a7cec2c2597bb4e37071e556da6a207a3805b473a1b8aa92f4835d627aaaca","040c6c5ae6236725b183c6d912cc7db2612e43e3885f090d8893628a70fc26b3a425e6375d992fcab05e83c98e8943bc9c165c9846e5953ab7416ca215da0788b7","04e41fb2c96d7f61d8bad3d968e85c92c5d4c0c822a56b636ecf13b6086bc97ed6c8765f08e150c9f712b83bf5843dfc47d9540dc9daa0540977737dac0cd701f8"];

const balances = {};

for (let i = 0; i < address_list.length; i++) {
  balances[address_list[i]] = 100;
}

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount ) {
    res.status(400).send({ message: "Not enough funds!" });
  } 
  else if(!signandverify({from:sender,to:recipient,amount:amount,privateKey:PRIVATE_KEY})){
    res.status(400).send({ message: "Invalid signature!" });
  }else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
