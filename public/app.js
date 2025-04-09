let web3;
let userAccount;
let contract;

const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS";
const ABI_URL = "/abi.json"; 

document.getElementById("connectBtn").onclick = async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    userAccount = accounts[0];
    document.getElementById("wallet").innerText = `Conectado: ${userAccount}`;

    const abi = await fetch(ABI_URL).then(res => res.json());
    contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);
  } else {
    alert("MetaMask não encontrada!");
  }
};

document.getElementById("uploadForm").onsubmit = async (e) => {
  e.preventDefault();

  if (!userAccount || !contract) {
    return alert("Conecte a carteira primeiro.");
  }

  const form = document.getElementById("uploadForm");
  const formData = new FormData(form);
  document.getElementById("status").innerText = "📤 Enviando para IPFS...";

  try {
    const res = await fetch("http://localhost:8080/upload", {
      method: "POST",
      body: formData
    });
    
    const data = await res.json();
    const tokenURI = data.tokenURI;
    console.log(tokenURI);

    document.getElementById("status").innerText = "⛓️ Chamando o contrato...";

    const tx = await contract.methods.tokenizeAsset(tokenURI).send({
      from: userAccount
    });

    document.getElementById("status").innerText = `🎉 Token criado! TX: ${tx.transactionHash}`;
  } catch (err) {
    console.error(err);
    document.getElementById("status").innerText = "❌ Erro ao criar token.";
  }
};
