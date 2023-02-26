Chents is a service for decentralized applications (dApps) and different blockchain services which provides a convient way to subscribe to blockchain events, transactions and internal calls (or internal transactions) (blockchain data).

### What is DApp

Decentralized applications, also known as DApps, are applications that operate on a decentralized network of computers instead of a centralized server. This means that they are not controlled by a single entity or organization, but rather are governed by a decentralized network of users.

DApps are typically built using blockchain technology, which allows for secure and transparent transactions without the need for a central authority. They can be used for a variety of purposes, including financial transactions, file storage, and social networking.

One key feature of DApps is that they use smart contracts, which are self-executing contracts with the terms of the agreement between buyer and seller being directly written into lines of code. This eliminates the need for intermediaries, such as lawyers or banks, which can make transactions more efficient and cost-effective.

Examples of popular DApps include decentralized exchanges like Uniswap and PancakeSwap, social media platforms like Minds and Steemit, and gaming platforms like Axie Infinity.

### Why DApp need to track:

#### Events

Detecting changes in the state of the blockchain: DApps are built on top of a blockchain, which is a distributed ledger of transactions. By tracking blockchain events, DApps can detect when new transactions are added to the blockchain or when existing transactions are updated or deleted. This allows the DApp to stay up-to-date with the state of the blockchain.

- Triggering actions based on blockchain events: DApps often need to perform specific actions when certain blockchain events occur. For example, a DApp that facilitates a decentralized exchange may need to execute a trade when a certain transaction is confirmed on the blockchain. By tracking blockchain events, the DApp can identify when these events occur and trigger the appropriate actions.

- Updating user interfaces: DApps typically have user interfaces that display information about the blockchain and the DApp's functionality. By tracking blockchain events, the DApp can update the user interface in real-time to reflect changes in the blockchain.

- Monitoring performance: By tracking blockchain events, DApps can monitor the performance of the blockchain and the DApp itself. This can help developers identify potential issues or bottlenecks and make optimizations to improve the DApp's performance.

- Overall, tracking blockchain events is an essential aspect of DApp functionality, allowing DApps to stay up-to-date with the state of the blockchain, trigger actions based on blockchain events, update user interfaces, and monitor performance.

- DApps need to monitor on-chain events, transactions and internal calls (transactions) to provide an interactive user experience.

- The ability to understand when and what events happened on a blockchain is a core part of web3 and decentralized applications. These events can trigger updates or notifications within the application that are then communicated to users.

Overall, tracking blockchain events is an essential aspect of DApp functionality, allowing DApps to stay up-to-date with the state of the blockchain, trigger actions based on blockchain events, update user interfaces, and monitor performance.

#### transactions

- Verification of transactions: As DApps are built on a decentralized network, every transaction needs to be verified by the network's participants to ensure that it is legitimate. Tracking user transactions allows the network to verify the transaction and prevent fraud or double-spending.

- Transparency: One of the key features of blockchain technology is transparency, and tracking user transactions is crucial for achieving this. DApps can make all transactions publicly visible and traceable, allowing users to see the history of transactions on the network.

- Compliance: Some DApps are required to comply with regulatory requirements, such as anti-money laundering (AML) and know-your-customer (KYC) regulations. Tracking user transactions can help ensure compliance with these regulations.

- Rewards and incentives: Some DApps use token incentives or rewards to encourage users to contribute to the network. Tracking user transactions can help ensure that users are rewarded appropriately for their contributions.

Overall, tracking user transactions is an essential aspect of DApp functionality, helping to ensure the security, transparency, tracking user transaction history and compliance of the network,

#### internal calls

- Debugging and troubleshooting: When a smart contract encounters an error, it can be difficult to identify the root cause. By tracing the internal calls that led to the error, developers can identify where the problem occurred and take steps to fix it.

- Security auditing: Smart contracts can be vulnerable to attacks, such as reentrancy attacks and denial-of-service attacks. By tracing the internal calls that a contract makes, auditors can identify potential vulnerabilities and suggest ways to mitigate them.

- Performance optimization: By analyzing the internal calls made by a contract, developers can identify areas where the contract is taking too much time or gas and optimize its performance.

- Compliance and regulatory reporting: Some DApps may be subject to regulatory requirements, such as anti-money laundering (AML) and know-your-customer (KYC) regulations. By tracking internal calls, DApp developers can demonstrate compliance with these requirements and generate reports for regulatory authorities.

- User behavior analysis: By tracing the internal calls made by users, DApp developers can gain insights into how users are interacting with the DApp and identify ways to improve the user experience.

In summary, tracking internal calls can provide valuable insights for developers, auditors, regulators, and users of DApps. It can be used for a variety of purposes, such as debugging, security auditing, performance optimization, compliance reporting, and user behavior analysis.

## What ways exist to synchronize blockchain data

### Blockchain nodes

Blockchain nodes provide APIs to sync blockchain data, but these APIs have strict rate limits. Also, syncing progress using these API is unconvient and not fault tolerant.

### Blockchain data APIs

There are a lot of projects which provides blockchain data APIs. The situation is the same as with blockchain nodes, but rate limits are less strict. Also theses APIs fully syncs all the data and it takes a lot of disk space, additionally to the same data stored in blockchain node.

## Why Chents is better?

Chents can be a better option for synchronizing blockchain data because it provides a convenient and efficient way to subscribe to blockchain events, transactions, and internal calls. It offers a real-time data stream of blockchain data, which allows dApps to stay up-to-date with the state of the blockchain and respond quickly to changes.

Compared to syncing data through blockchain nodes or APIs, using Chents can be more convenient because it simplifies the process of subscribing to and processing blockchain data. Chents also offers a range of customization options, such as the ability to filter data by specific parameters, which can help developers optimize the performance of their dApps.

In addition, Chents uses a decentralized architecture that can improve fault tolerance and reliability. ~~Chents is built on top of the Swarm network, which is a peer-to-peer decentralized storage and communication platform. This means that Chents can distribute data processing and storage across multiple nodes, reducing the risk of downtime or data loss.~~

Overall, Chents can be a useful tool for dApp developers who want a convenient, reliable, and customizable way to synchronize blockchain data in real-time.

### The core aspects:

1. Chents doesn't fully sync blockchain. It syncs only the data requested by users.
1. Chents provide user and API to get event one-by-one, so Chents' clients don't need to implement the queue handling by their own.
1. Chents is horizontally scalabale. So if some DApps use a lot of contracts, it can get its own instance of chain, which doesn't require a lot of time to be synced.
1. Chents doesn't need a lot of nodes to sync the blockchain data. It will have only one instance syncing the data, and all other will receive updates by the main Chents instance.
1. Data processing can be moved into chents
