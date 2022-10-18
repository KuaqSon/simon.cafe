import { Anchor, Group, ThemeIcon } from '@mantine/core';
import { IconMapSearch, IconSearch } from '@tabler/icons';
import { stringify } from 'querystring';
import { ICafe } from 'src/interfaces/cafe';

export default function CafeShortcut({ cafe }: { cafe: ICafe }): JSX.Element {
  return (
    <Group spacing="xs">
      <Anchor href={`https://www.google.com/search?${stringify({ q: cafe.name })}`} target="_blank">
        <ThemeIcon radius="xl" color="dark">
          <IconSearch size={16} />
        </ThemeIcon>
      </Anchor>
      <Anchor href={`https://www.google.com/maps/search/${cafe.address}/`} target="_blank">
        <ThemeIcon radius="xl" color="dark">
          <IconMapSearch size={16} />
        </ThemeIcon>
      </Anchor>
    </Group>
  );
}
