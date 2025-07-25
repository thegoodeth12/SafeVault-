export default function ProposalQueue() {
  return (
    <div>
      <h2>🧾 Proposal Queue</h2>
      <p>View and approve pending Safe transactions here.</p>
    </div>
  );
}
import React from 'react';
import { SafeTransactionDataPartial } from '@reownlabs/appkit';

interface ProposalQueueProps {
  transactions: SafeTransactionDataPartial[];
  onSelect: (tx: SafeTransactionDataPartial) => void;
}

export const ProposalQueue: React.FC<ProposalQueueProps> = ({ transactions, onSelect }) => {
  if (transactions.length === 0) {
    return <p>No pending proposals to approve.</p>;
  }

  return (
    <div>
      <h3>Pending Proposals</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {transactions.map((tx, i) => (
          <li
            key={i}
            onClick={() => onSelect(tx)}
            style={{
              border: '1px solid #ccc',
              padding: '12px',
              marginBottom: '8px',
              cursor: 'pointer',
              borderRadius: '4px',
            }}
            title="Click to view details and approve"
          >
            <strong>To:</strong> {tx.to} <br />
            <strong>Value:</strong> {tx.value?.toString() || '0'} wei <br />
            <strong>Data:</strong> {tx.data ? tx.data.slice(0, 20) + '...' : '—'}
          </li>
        ))}
      </ul>
    </div>
  );
};
