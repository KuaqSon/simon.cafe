import { Paper, Box, MantineTheme, Image } from '@mantine/core';
import CafeShortcut from 'components/cafe-shortcut';
import { ICafe } from 'src/interfaces/cafe';

export default function CafeCard({ cafe, onClick }: { cafe: ICafe; onClick?: Function }): JSX.Element {
  return (
    <Paper shadow="xs">
      <Box
        sx={(theme: MantineTheme) => ({
          borderTopRightRadius: theme.radius.sm,
          borderTopLeftRadius: theme.radius.sm,
          overflow: 'hidden',
          cursor: 'pointer',
          position: 'relative',
        })}
        onClick={() => onClick && onClick(cafe)}
      >
        <Image imageProps={{ loading: 'lazy' }} height={300} src={cafe.cover} />
        <Box sx={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }} p="xs">
          <CafeShortcut cafe={cafe} />
        </Box>
      </Box>

      <Box p="md">
        <Box sx={{ fontWeight: 600, fontSize: '14px' }}>{cafe.name}</Box>
        <Box sx={{ fontSize: '12px' }}>{cafe.address}</Box>
      </Box>
    </Paper>
  );
}
