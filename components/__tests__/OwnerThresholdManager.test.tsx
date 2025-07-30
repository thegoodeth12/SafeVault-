import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { OwnerThresholdManager } from '../OwnerThresholdManager';
import * as safeApi from '../../lib/safeApi';
import * as safeOwnerTxs from '../../lib/safeOwnerTxs';
import Safe from '@safe-global/safe-core-sdk';

// Mock fetchSafeOwnersAndThreshold to return fixed data
jest.mock('../../lib/safeApi');
jest.mock('../../lib/safeOwnerTxs');
jest.mock('@safe-global/safe-core-sdk');

const mockFetchSafeOwnersAndThreshold = safeApi.fetchSafeOwnersAndThreshold as jest.MockedFunction<typeof safeApi.fetchSafeOwnersAndThreshold>;
const mockBuildOwnerChangeTxs = safeOwnerTxs.buildOwnerChangeTxs as jest.MockedFunction<typeof safeOwnerTxs.buildOwnerChangeTxs>;
const mockSafeCreate = Safe.create as jest.Mock;

describe('OwnerThresholdManager', () => {
  const safeAddress = '0xSafeAddress';
  const provider = {} as any;
  const signer = {} as any;

  beforeEach(() => {
    jest.clearAllMocks();

    mockFetchSafeOwnersAndThreshold.mockResolvedValue({
      owners: ['0x1111111111111111111111111111111111111111', '0x2222222222222222222222222222222222222222'],
      threshold: 2,
    });

    mockBuildOwnerChangeTxs.mockResolvedValue([
      { to: safeAddress, value: 0, data: '0xdeadbeef' }
    ]);

    mockSafeCreate.mockResolvedValue({
      createTransaction: jest.fn().mockResolvedValue({}),
      signTransaction: jest.fn().mockResolvedValue({}),
      executeTransaction: jest.fn().mockResolvedValue({
        transactionResponse: {
          wait: jest.fn().mockResolvedValue(true),
        },
        hash: '0xTransactionHash',
      }),
    });
  });

  test('renders loading initially', () => {
    render(<OwnerThresholdManager safeAddress={safeAddress} provider={provider} signer={signer} />);
    expect(screen.getByText(/loading safe data/i)).toBeInTheDocument();
  });

  test('renders owners and threshold after load', async () => {
    render(<OwnerThresholdManager safeAddress={safeAddress} provider={provider} signer={signer} />);
    await waitFor(() => expect(screen.getByText(/current owners/i)).toBeInTheDocument());

    expect(screen.getByText('0x1111111111111111111111111111111111111111')).toBeInTheDocument();
    expect(screen.getByText('0x2222222222222222222222222222222222222222')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2')).toBeInTheDocument();
  });

  test('adds a new owner', async () => {
    render(<OwnerThresholdManager safeAddress={safeAddress} provider={provider} signer={signer} />);
    await waitFor(() => screen.getByText(/current owners/i));

    fireEvent.change(screen.getByPlaceholderText(/new owner address/i), { target: { value: '0x3333333333333333333333333333333333333333' } });
    fireEvent.click(screen.getByText(/add owner/i));

    expect(screen.getByText('0x3333333333333333333333333333333333333333')).toBeInTheDocument();
  });

  test('removes an owner with confirmation', async () => {
    window.confirm = jest.fn(() => true);
    render(<OwnerThresholdManager safeAddress={safeAddress} provider={provider} signer={signer} />);
    await waitFor(() => screen.getByText(/current owners/i));

    const removeButtons = screen.getAllByText(/remove/i);
    fireEvent.click(removeButtons[0]);

    expect(screen.queryByText('0x1111111111111111111111111111111111111111')).not.toBeInTheDocument();
  });

  test('submits changes and shows success alert', async () => {
    window.alert = jest.fn();
    render(<OwnerThresholdManager safeAddress={safeAddress} provider={provider} signer={signer} />);
    await waitFor(() => screen.getByText(/current owners/i));

    fireEvent.click(screen.getByText(/submit changes/i));

    await waitFor(() => expect(window.alert).toHaveBeenCalledWith('Transaction submitted successfully!'));
  });

  test('shows error when wallet not connected', async () => {
    render(<OwnerThresholdManager safeAddress={safeAddress} provider={provider} signer={null} />);
    await waitFor(() => screen.getByText(/current owners/i));

    fireEvent.click(screen.getByText(/submit changes/i));

    expect(screen.getByText(/wallet not connected/i)).toBeInTheDocument();
  });
});
