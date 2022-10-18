import { Box, Paper, Skeleton } from '@mantine/core';

export default function CafeSkeletons({ rows = 3 }: { rows?: number }) {
  return (
    <>
      {[...Array(rows)].map((_, idx) => (
        <Paper key={idx} shadow="xs">
          <Box p="xs">
            <Skeleton height={280} radius={0} />
          </Box>
          <Box p="xs">
            <Skeleton height={50} radius="xs" />
          </Box>
        </Paper>
      ))}
    </>
  );
}
