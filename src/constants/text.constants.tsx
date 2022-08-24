import React from 'react';

export const FalseReceiptStatusDescription = (
  <>
    <p>If you call smart contract A, and it calls smart contract B, and smart contract B fails, the receipt status will be false, but it is up to smart contact A how to handle that. </p>
    <p>There are 2 ways:</p>
    <p>1. Smart contract A aborts the transaction execution, so in this way receipt status will be false and no changes will occur in the state of blockchain.</p>
    <p>2. Smart contract A continues the execution, so the receipt status will be false, but the blockchain state will be changed. </p>
  </>
)
