const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'ancient oil acquire adjust spy rapid gym train wear message sibling buyer',
  'https://rinkeby.infura.io/v3/a3e1a35ec0464d3ebb4a578e3aeacf11'
);

const web3 = new Web3(provider);
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ['Hi there!'],
    })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contact deployed to', result.options.address);
  provider.engine.stop();
};
deploy();
