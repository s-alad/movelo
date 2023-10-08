![](./branding/logo.png)

Movelo leverages blockchain technology to incentivize eco-friendly commuting choices such as walking or biking. By participating in campaigns sponsored by local businesses, users can earn rewards for choosing greener transportation options. Our smart contract on the Ethereum blockchain automates the process of tracking and rewarding these eco-conscious decisions.

## Smart Contract Functions

Below are the technical functions provided by the Movelo smart contract:

### 1. `createSponsorship`
- Allows a business to sponsor a campaign encouraging people to visit their location.
- Input parameters:
  - `budget` (uint256): The total budget allocated for the campaign.
  - `name` (string): The name of the campaign.
  - `description` (string): A description of the campaign.
  - `imageURL` (string): A URL to an image representing the campaign.
  - `duration` (uint256): The duration of the campaign in seconds.
  - `ratePerMile` (uint256): The rate paid per mile walked or biked.
  - `allowedAddresses` (address[]): (Optional) An array of addresses allowed to participate in the campaign.
  - `locationLatitudes` (uint256[]): An array of latitudes representing targeted locations.
  - `locationLongitudes` (uint256[]): An array of longitudes representing targeted locations.
  
### 2. `payout`
- Allows a user to claim a payout after walking or biking to a sponsored location.
- Input parameters:
  - `miles` (uint256): The number of miles walked or biked.
  - `sponsorshipId` (uint256): The ID of the sponsorship campaign.

### 3. `awardBadge`
- Allows the contract owner to award badges to users.
- Input parameters:
  - `user` (address): The address of the user to award the badge to.
  - `imageURI` (string): A URI to an image representing the badge.
  - `description` (string): A description of the badge.
  - `sponsor` (address): The address of the sponsor awarding the badge.

### 4. `isAddressInList`
- A helper function to check if an address is in a given list of addresses.
- Input parameters:
  - `user` (address): The address to check.
  - `list` (address[]): The list of addresses to check against.

### 5. `campaignRunning`
- Checks if a campaign is still running.
- Input parameters:
  - `campaignId` (uint256): The ID of the campaign to check.

### 6. `withdrawUnspentFunds`
- Allows a sponsor to withdraw any unspent funds from a campaign after it has ended.
- Input parameters:
  - `sponsorshipId` (uint256): The ID of the sponsorship campaign.

## Events

- `SponsorshipCreated`: Emitted when a new sponsorship campaign is created.
- `Payout`: Emitted when a user claims a payout.
- `BadgeEarned`: Emitted when a user earns a badge.
- `EmergencyStopActivated`: Emitted when the contract owner activates the emergency stop feature.
- `EmergencyStopDeactivated`: Emitted when the contract owner deactivates the emergency stop feature.

## Modifiers

- `onlyOwner`: Ensures that only the contract owner can call certain functions.

## Constructor

- The constructor initializes the contract with the address of the BadgeCreator contract.

Movelo’s smart contract provides a reliable and transparent way to motivate and reward eco-friendly commuting, making a positive impact on local communities and the environment.
