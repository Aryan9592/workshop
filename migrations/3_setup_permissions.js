/* global artifacts */
/* eslint-disable no-unused-vars */
const fs = require('fs');

const Reserve = artifacts.require('./KyberReserve.sol');

const networkConfig = JSON.parse(fs.readFileSync('../config/network.json', 'utf8'));

function tx(result, call) {
  const logs = (result.logs.length > 0) ? result.logs[0] : { address: null, event: null };

  console.log();
  console.log(`   Calling ${call}`);
  console.log('   ------------------------');
  console.log(`   > transaction hash: ${result.tx}`);
  console.log(`   > contract address: ${logs.address}`);
  console.log(`   > gas used: ${result.receipt.gasUsed}`);
  console.log(`   > event: ${logs.event}`);
  console.log();
}

module.exports = async (deployer, network, accounts) => {
  const { alerter, operator } = networkConfig.KyberReserve;

  // Set the instances
  const ReserveInstance = await Reserve.at(Reserve.address);

  // Set permissions of contracts
  tx(await ReserveInstance.addOperator(operator), 'addOperator()');
  tx(await ReserveInstance.addAlerter(alerter), 'addAlerter()');
};
