const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

const INITIAL_STRING = 'Hi there';
let accounts;
let inbox;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [INITIAL_STRING] })
    .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {
  it('should deploys a contract', () => {
    assert.ok(inbox.options.address);
  });

  it('should has a default message ', async () => {
    const message = await inbox.methods.message().call();

    assert.equal(message, INITIAL_STRING);
  });

  it('should can change the message', async () => {
    const messageSent = 'bye';
    await inbox.methods.setMessage(messageSent).send({ from: accounts[0], gas: '1000000' });

    const message = await inbox.methods.message().call();

    assert.equal(messageSent, message);
  });
});
