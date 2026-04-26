import React, { useMemo, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  ActivityIndicator,
} from 'react-native';
import { Card, List, TextInput } from 'react-native-paper';
import { useQuery } from '@tanstack/react-query';
import { generateMockMedicines } from '../store/actions';

const DetailsScreen = ({ navigation, ...props }) => {
  const { item } = props.route.params;
  const [expandedId, setExpandedId] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ['medicines', item.part, page, ITEMS_PER_PAGE],
    queryFn: () => generateMockMedicines(item.part, page, ITEMS_PER_PAGE),
    placeholderData: previousData => previousData,
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 5,
  });

  const medicines = data?.medicines || [];

  const filteredData = useMemo(() => {
    if (!search.trim()) return medicines;

    const text = search.toLowerCase();
    return medicines.filter(med => med.name?.toLowerCase().includes(text));
  }, [search, medicines]);

  const renderItem = ({ item }) => {
    return (
      <Card style={styles.card}>
        <List.Accordion
          title={item.name || 'Unknown Medicine'}
          expanded={expandedId === item.id}
          left={props => (
            <MaterialCommunityIcons
              name="medical-bag"
              size={28}
              color="red"
              style={{ margin: 5 }}
            />
          )}
          style={styles.accordion}
          titleStyle={[
            styles.title,
            expandedId === item.id && { color: '#2563eb', fontWeight: '700' },
          ]}
          descriptionStyle={styles.accordionDesc}
          onPress={() => setExpandedId(expandedId === item.id ? null : item.id)}
          right={props => (
            <MaterialCommunityIcons
              name={expandedId === item.id ? 'chevron-up' : 'chevron-down'}
              size={28}
              color="#2563eb"
            />
          )}
        >
          <View style={styles.content}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.description}>
              {item.description || 'Detailed medical description goes here.'}
            </Text>
          </View>
        </List.Accordion>
      </Card>
    );
  };

  const renderLoader = () => {
    const active = isLoading || isFetching;
    return active ? (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    ) : null;
  };

  const isPageLoading = isFetching && medicines.length > 0;

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        placeholder="Search medicines"
        value={search}
        onChangeText={setSearch} // ✅ ONLY update search
        style={styles.search}
        left={<TextInput.Icon icon="magnify" />}
        right={
          search ? (
            <TextInput.Icon icon="close" onPress={() => setSearch('')} />
          ) : null
        }
      />
      <FlatList
        data={filteredData || []}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => {
          if (isLoading) {
            return renderLoader();
          }
          return (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No medicines found.</Text>
            </View>
          );
        }}
        ListFooterComponent={() => {
          const hasPrevious = page > 1;
          const hasNext = page < (data?.totalPages || 1);

          if (isFetching && medicines.length > 0) {
            return (
              <View style={styles.footerLoaderContainer}>
                <ActivityIndicator size="small" color="#2563eb" />
              </View>
            );
          }

          if ((data?.totalPages || 1) <= 1) {
            return null;
          }

          return (
            <View style={styles.paginationContainer}>
              <Button
                title="Previous"
                onPress={() => setPage(prev => Math.max(prev - 1, 1))}
                disabled={!hasPrevious || isFetching}
              />
              <Button
                title="Next"
                onPress={() => setPage(prev => prev + 1)}
                disabled={!hasNext || isFetching}
              />
            </View>
          );
        }}
      />
      {isPageLoading && (
        <View style={styles.pageLoadingOverlay} pointerEvents="none">
          <ActivityIndicator size="large" color="#2563eb" />
        </View>
      )}
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  card: {
    marginBottom: 12,
    borderRadius: 14,
    backgroundColor: '#ffffff',
  },
  accordion: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  accordionDesc: {
    fontSize: 12,
    color: '#6b7280',
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 14,
    paddingTop: 4,
  },
  descriptionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  search: {
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    color: '#6b7280',
    fontSize: 15,
  },
  footerLoaderContainer: {
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageLoadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
