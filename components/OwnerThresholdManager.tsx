import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Input,
  Button,
  Text,
  NumberInput,
  NumberInputField,
  useToast,
  IconButton,
  HStack,
  VStack,
  Divider,
  Spinner,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { ethers } from 'ethers';
import { getSafeOwnersAndThreshold, buildOwnerChangeTx } from '../lib/safeApi';

type Props = {
  safeAddress: string;
  provider: ethers.providers.JsonRpcProvider;
  signer: ethers.Signer;
};

export const OwnerThresholdManager: React.FC<Props> = ({
  safeAddress,
  provider,
  signer,
}) => {
  const [owners, setOwners] = useState<string[]>([]);
  const [threshold, setThreshold] = useState<number>(1);
  const [newOwner, setNewOwner] = useState('');
  const [pendingOwners, setPendingOwners] = useState<string[]>([]);
  const [pendingThreshold, setPendingThreshold] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    (async () => {
      try {
        const { owners, threshold } = await getSafeOwnersAndThreshold(
          safeAddress,
          provider
        );
        setOwners(owners);
        setPendingOwners(owners);
        setThreshold(threshold);
        setPendingThreshold(threshold);
      } catch (err) {
        toast({
          title: 'Failed to load Safe data.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    })();
  }, [safeAddress, provider, toast]);

  const handleAddOwner = () => {
    if (!ethers.utils.isAddress(newOwner)) {
      toast({
        title: 'Invalid address',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (pendingOwners.includes(newOwner)) {
      toast({
        title: 'Owner already added',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setPendingOwners([...pendingOwners, newOwner]);
    setNewOwner('');
  };

  const handleRemoveOwner = (address: string) => {
    const updated = pendingOwners.filter((o) => o !== address);
    setPendingOwners(updated);

    if (pendingThreshold > updated.length) {
      setPendingThreshold(updated.length);
    }
  };

  const handleSubmitChanges = async () => {
    setLoading(true);
    try {
      const tx = await buildOwnerChangeTx({
        safeAddress,
        signer,
        currentOwners: owners,
        newOwners: pendingOwners,
        newThreshold: pendingThreshold,
      });

      toast({
        title: 'Transaction ready!',
        description: 'Check your Safe queue to sign.',
        status: 'success',
        duration: 6000,
        isClosable: true,
      });

      console.log('Built multisend TX:', tx);
    } catch (err) {
      toast({
        title: 'Failed to build transaction',
        description: (err as Error).message,
        status: 'error',
        duration: 6000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  return (
    <Box mt="6">
      <Heading size="md" mb="4">
        Owners
      </Heading>

      <SimpleGrid columns={1} spacing={2}>
        {pendingOwners.map((owner) => (
          <HStack key={owner} justify="space-between" border="1px" borderColor="gray.200" p="2" borderRadius="md">
            <Text fontSize="sm" wordBreak="break-all">{owner}</Text>
            <IconButton
              icon={<DeleteIcon />}
              size="sm"
              aria-label="Remove"
              colorScheme="red"
              onClick={() => handleRemoveOwner(owner)}
              isDisabled={owners.length === 1}
            />
          </HStack>
        ))}
      </SimpleGrid>

      <HStack mt="4">
        <Input
          placeholder="0xNewOwnerAddress"
          value={newOwner}
          onChange={(e) => setNewOwner(e.target.value)}
        />
        <Button onClick={handleAddOwner} colorScheme="blue">
          Add
        </Button>
      </HStack>

      <Divider my="6" />

      <VStack align="start" spacing="4">
        <Box>
          <Text>Threshold</Text>
          <NumberInput
            value={pendingThreshold}
            min={1}
            max={pendingOwners.length}
            onChange={(v) => setPendingThreshold(Number(v))}
            width="100px"
          >
            <NumberInputField />
          </NumberInput>
        </Box>

        <Button
          colorScheme="teal"
          onClick={handleSubmitChanges}
          isLoading={loading}
          loadingText="Building TX"
        >
          Submit Changes
        </Button>
      </VStack>
    </Box>
  );
};
