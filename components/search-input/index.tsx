import { ActionIcon, TextInput, useMantineTheme } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconSearch, IconArrowRight, IconArrowLeft } from '@tabler/icons';

export default function SearchInput({ initValue, onSubmit }: { initValue: string; onSubmit: Function }): JSX.Element {
  const theme = useMantineTheme();
  const form = useForm({
    initialValues: {
      keyword: initValue,
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => onSubmit && onSubmit(values.keyword))}>
      <TextInput
        icon={<IconSearch size={18} stroke={1.5} />}
        radius="xl"
        size="md"
        rightSection={
          <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled" type="submit">
            {theme.dir === 'ltr' ? <IconArrowRight size={18} stroke={1.5} /> : <IconArrowLeft size={18} stroke={1.5} />}
          </ActionIcon>
        }
        placeholder="Search any name or place..."
        rightSectionWidth={42}
        {...form.getInputProps('keyword')}
      />
    </form>
  );
}
