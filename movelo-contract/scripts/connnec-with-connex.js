import { ABI } from './abi.js'
const contractAddress = "0x8161ffc13309613f9De0a3bc56e2586c92a4D6dE";

const connex = new Connex({
    node: 'https://node-testnet.vechaindev.energy',
    network: 'test'
  })

const contract = connex.thor.account(contractAddress).method(abi);

contract.method.call('getAllCampaigns', index)
    .then(response => {
        console.log('Campaign data:', response.decoded);
    })
    .catch(error => {
        console.error('Error calling campaigns getter:', error);
    });

