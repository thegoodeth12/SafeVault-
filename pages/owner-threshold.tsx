import { Box, Button, Text, Heading, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import { useWallet } from '../hooks/useWallet';
import { OwnerThresholdManager } from '../components/OwnerThresholdManager';

const OwnerThresholdPage = () => {
  const { provider, signer, address, error } = useWallet();

  return (
    <Box maxW="600px" mx="auto" mt="10" px="4">
      <Heading mb="6">🔐 Manage Safe Owners & Threshold</Heading>

      {!signer && (
        <>
          <Text mb="4">Please connect your wallet to proceed.</Text>
          {error && (
            <Alert status="error" mb="4">
              <AlertIcon />
              {error}
            </Alert>
          )}
        </>
      )}

      {signer && provider ? (
        <OwnerThresholdManager
          safeAddress={process.env.NEXT_PUBLIC_SAFE_ADDRESS!}
          provider={provider}
          signer={signer}
        />
      ) : (
        <Spinner size="lg" />
      )}

      {address && (
        <Text mt="6" fontSize="sm" color="gray.500">
          Connected wallet: <b>{address}</b>
        </Text>
      )}
    </Box>
  );
};

export default OwnerThresholdPage;
