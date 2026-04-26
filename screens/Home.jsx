import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { Card, TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { fetchData } from '../store/actions';
import { headData } from '../store/util';

const Home = ({ navigation }) => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPart, setSelectedPart] = useState(null);
  const ITEMS_PER_PAGE = 6;

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredCards = useMemo(() => {
    if (selectedPart) {
      return headData.filter(item => item.part === selectedPart);
    }

    if (!normalizedQuery) {
      return headData;
    }

    return headData.filter(
      item =>
        item.title.toLowerCase().includes(normalizedQuery) ||
        item.part.toLowerCase().includes(normalizedQuery),
    );
  }, [normalizedQuery, selectedPart]);

  const handlePress = item => {
    dispatch(fetchData({ part: item.part, limit: ITEMS_PER_PAGE }));
    navigation.navigate('Details', { item, page, setPage, ITEMS_PER_PAGE });
  };

  const handleSearchChange = value => {
    setSearchQuery(value);
    if (!value.trim()) {
      setSelectedPart(null);
      return;
    }

    if (selectedPart) {
      setSelectedPart(null);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSelectedPart(null);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setPage(1);
    });

    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item)}>
      <Card style={styles.card}>
        <ImageBackground
          source={item.imageUrl}
          style={styles.cardBackground}
          imageStyle={{ borderRadius: 8 }}
          resizeMode="cover"
        />
      </Card>
      <Text numberOfLines={2} style={styles.cardText}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchWrapper}>
        <TextInput
          mode="outlined"
          placeholder="Search by body part"
          value={searchQuery}
          onChangeText={handleSearchChange}
          style={styles.searchInput}
          left={<TextInput.Icon icon="magnify" />}
          right={
            searchQuery ? (
              <TextInput.Icon icon="close" onPress={clearSearch} />
            ) : null
          }
        />
      </View>
      <FlatList
        data={filteredCards}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        numColumns={3}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={false}
        ListEmptyComponent={
          <Text style={styles.emptyState}>
            No categories match your search.
          </Text>
        }
      />
    </View>
  );
};

export default Home;

const CARD_HEIGHT = 150;
const CARD_MARGIN = 5;
const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = (SCREEN_WIDTH - CARD_MARGIN * 2 * 3 - 10) / 3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchWrapper: {
    paddingHorizontal: 10,
    paddingTop: 10,
    zIndex: 2,
  },
  searchInput: {
    backgroundColor: '#fff',
  },
  dropdown: {
    marginTop: 6,
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 4,
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#d1d5db',
  },
  dropdownTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  dropdownSubtitle: {
    marginTop: 2,
    fontSize: 12,
    color: '#6b7280',
    textTransform: 'capitalize',
  },
  list: {
    padding: 5,
    paddingTop: 10,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    justifyContent: 'center',
    borderRadius: 8,
    elevation: 3,
  },
  cardText: {
    textAlign: 'center',
    paddingTop: 5,
    fontWeight: '500',
  },
  cardBackground: {
    width: '100%',
    height: '100%',
  },
  emptyState: {
    paddingTop: 32,
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 15,
  },
});
