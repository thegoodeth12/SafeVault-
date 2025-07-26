import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { OwnerThresholdManager } from '../components/OwnerThresholdManager';
import * as safeApi from '../lib/safeApi';
import { ethers } from 'ethers';

jest.mock('../lib/safeApi');

const mockSigner = {} as ethers.Signer;
const mockProvider = {} as ethers.providers.JsonRpcProvider;

const safeAddress = '0xSafeAddress123';

describe('OwnerThresholdManager', () => {
  beforeEach(() => {
    (safeApi.getSafeOwnersAndThreshold as jest.Mock).mockResolvedValue({
      owners: ['0x123', '0x456'],
      threshold: 2,
    });

    (safeApi.buildOwnerChangeTx as jest.Mock).mockResolvedValue({
      data: '0xMockTxData',
    });
  });

  it('renders owners and threshold', async () => {
    render(
      <ChakraProvider>
        <OwnerThresholdManager
          safeAddress={safeAddress}
          provider={mockProvider}
          signer={mockSigner}
        />
      </ChakraProvider>
    );

    expect(await screen.findByText(/0x123/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue('2')).toBeInTheDocument();
  });

  it('adds a new owner', async () => {
    render(
      <ChakraProvider>
        <OwnerThresholdManager
          safeAddress={safeAddress}
          provider={mockProvider}
          signer={mockSigner}
        />
      </ChakraProvider>
    );

    const input = await screen.findByPlaceholderText(/0xNewOwnerAddress/i);
    fireEvent.change(input, { target: { value: '0x789' } });

    fireEvent.click(screen.getByText(/Add/i));

    expect(await screen.findByText(/0x789/i)).toBeInTheDocument();
  });

  it('builds multisend transaction on submit', async () => {
    render(
      <ChakraProvider>
        <OwnerThresholdManager
          safeAddress={safeAddress}
          provider={mockProvider}
          signer={mockSigner}
        />
      </ChakraProvider>
    );

    await waitFor(() => screen.getByText(/Submit Changes/i));
    fireEvent.click(screen.getByText(/Submit Changes/i));

    await waitFor(() =>
      expect(safeApi.buildOwnerChangeTx).toHaveBeenCalledWith(
        expect.objectContaining({
          safeAddress,
          signer: mockSigner,
        })
      )
    );
  });
});
