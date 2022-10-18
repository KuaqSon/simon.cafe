import { Box, Center, Image, Stack, Text, Title } from '@mantine/core';
import CafeShortcut from 'components/cafe-shortcut';
import { ICafe } from 'src/interfaces/cafe';

export default function CafeDetail({ cafe }: { cafe: ICafe }) {
  return (
    <Stack sx={{ minHeight: '90vh' }} spacing="xs">
      <Stack py="xl">
        <Box sx={{ textAlign: 'center' }}>
          <Title>{cafe.name}</Title>
          <Text color="gray.9">{cafe.address}</Text>
        </Box>
        <Center>
          <CafeShortcut cafe={cafe} />
        </Center>
      </Stack>
      {cafe.images.map((image, i) => (
        <Box key={i}>
          <Image imageProps={{ loading: 'lazy' }} radius="sm" src={image.url} />
        </Box>
      ))}
    </Stack>
  );
}
