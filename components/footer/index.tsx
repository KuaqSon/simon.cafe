import { createStyles, Text } from '@mantine/core';
import Credit from 'components/credit';

const useStyles = createStyles((theme) => ({
  footer: {
    borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
    padding: '12px',
  },
}));

export default function Footer() {
  const { classes } = useStyles();
  return (
    <div className={classes.footer}>
      <Text align="center" mb="md" size="sm">
        Made by Son Nguyen with ❤️
      </Text>
      <Credit />
    </div>
  );
}
