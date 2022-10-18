import { createStyles, Header, Box } from '@mantine/core';
import MainLogo from 'components/shared/main-logo';
import Link from 'next/link';
import { useAuth } from 'src/context/auth-context';

const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    padding: '0 16px',
    boxShadow: theme.shadows.xs,
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },

  linkHightLight: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      color: '#fff',
    },
  },
}));

export default function PublicHeader() {
  const { classes } = useStyles();
  const { isAuthenticated } = useAuth();

  return (
    <Header height={60} sx={{ position: 'fixed', top: 0, left: 0, right: 0 }}>
      <Box className={classes.header}>
        <Link href={isAuthenticated ? '/app' : '/'}>
          <Box>
            <MainLogo />
          </Box>
        </Link>
      </Box>
    </Header>
  );
}
