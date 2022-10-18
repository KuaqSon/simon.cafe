import {
  ActionIcon,
  Box,
  Button,
  Center,
  Container,
  Group,
  Modal,
  SimpleGrid,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { IconX } from '@tabler/icons';
import CafeCard from 'components/cafe-card';
import CafeDetail from 'components/cafe-detail';
import SearchInput from 'components/search-input';
import CafeSkeletons from 'components/shared/ui-kit/CafeSkeletons';
import { useRouter } from 'next/router';

import React, { useState } from 'react';
import { useQueryCafes } from 'src/hook/use-query-cafes';
import { useMobileBreak } from 'src/hook/use-screen-break';
import { ICafe } from 'src/interfaces/cafe';
import { IPaginatorRequest } from 'src/interfaces/common';

import { DEFAULT_PAGINATOR } from 'src/utils/constants';

export default function FeedsContainer() {
  const router = useRouter();
  const initKeyword = router.query.keyword ? `${router.query.keyword}` : '';
  const [params, setParams] = useState<IPaginatorRequest>({ ...DEFAULT_PAGINATOR, q: initKeyword });

  const { isLoading, isFetchingNextPage, fetchNextPage, data, currentParams, lastResult, hasNextPage } =
    useQueryCafes(params);

  const [activeCafe, setActiveCafe] = useState<ICafe | null>(null);
  const isMobile = useMobileBreak();
  const theme = useMantineTheme();

  const handleSearch = (keyword: string) => {
    setParams((prev) => ({ ...prev, q: keyword }));
    router.push(
      {
        pathname: '/',
        query: {
          keyword,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <>
      <Box>
        <Container p="md" mb="xl" size="sm">
          <Title align="center">Simon.Cafe</Title>
          <Box py="xl">
            <SearchInput initValue={initKeyword} onSubmit={handleSearch} />
          </Box>
          {lastResult ? (
            <Text align="center" color="gray.8">
              {lastResult.data.count || 0} kết quả
            </Text>
          ) : null}
        </Container>

        <Modal
          opened={!!activeCafe}
          onClose={() => setActiveCafe(null)}
          size={isMobile ? '100%' : 'lg'}
          fullScreen={isMobile}
          padding="xs"
          overlayColor={theme.colors.dark[9]}
          overlayOpacity={0.95}
          withCloseButton={false}
        >
          <Group position="right">
            <ActionIcon onClick={() => setActiveCafe(null)} size="lg">
              <IconX />
            </ActionIcon>
          </Group>
          {activeCafe ? <CafeDetail cafe={activeCafe} /> : null}
        </Modal>

        <Container mb="xl" size="xl">
          <SimpleGrid
            cols={3}
            spacing="md"
            verticalSpacing="md"
            breakpoints={[
              { maxWidth: 980, cols: 2, spacing: 'sm', verticalSpacing: 'sm' },
              { maxWidth: 755, cols: 1, spacing: 'sm', verticalSpacing: 'sm' },
            ]}
          >
            {data?.pages.map((group, i) => (
              <React.Fragment key={i}>
                {group.data.items.map((cafe) => (
                  <CafeCard key={cafe.id} cafe={cafe} onClick={() => setActiveCafe(cafe)} />
                ))}
              </React.Fragment>
            ))}
            {(isLoading || isFetchingNextPage) && <CafeSkeletons />}
            {hasNextPage && (
              <Center sx={{ backgroundColor: theme.colors.gray[4], borderRadius: theme.radius.sm }} py="xl">
                <Button
                  my="xl"
                  variant="white"
                  onClick={() =>
                    fetchNextPage({
                      pageParam: { ...currentParams, offset: currentParams.offset + currentParams.limit },
                    })
                  }
                >
                  Load More
                </Button>
              </Center>
            )}
          </SimpleGrid>
        </Container>
      </Box>
    </>
  );
}
