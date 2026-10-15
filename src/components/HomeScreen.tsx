import React, { useMemo, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Movie = {
  id: string;
  title: string;
  genre: string;
  rating: number;
  poster: string;
  price: number;
  description: string;
  duration: string;
  age: string;
};

type Props = {
  city?: string | null;
  userName?: string;
  onMoviePress: (movie: Movie) => void;
  onTicketsPress: () => void;
  onProfilePress: () => void;
};

const MOVIES: Movie[] = [
  {
    id: '1',
    title: 'Обитель зла',
    genre: 'Ужасы',
    rating: 7.3,
    poster:
      'https://i.ibb.co.com/WvmjHTYy/600x900-2026-09-10-T181113-765-1.webp',
    price: 1700,
    description:
      'Курьер оказывается в отдалённой больнице во время вспышки неизвестного вируса и пытается выжить.',
    duration: '1 ч 30 мин',
    age: '18+',
  },
  {
    id: '2',
    title: '7 қарақшы',
    genre: 'Боевик',
    rating: 7.3,
    poster:
      'https://i.ibb.co.com/hRjDv0wB/600x900-2026-09-10-T180751-641-1.webp',
    price: 1700,
    description:
      'Приключенческий фильм о семерых героях, которым предстоит выполнить сложную миссию.',
    duration: '2 ч 00 мин',
    age: '14+',
  },
  {
    id: '3',
    title: '25 теңге. Басты миссия',
    genre: 'Боевик',
    rating: 7.5,
    poster:
      'https://i.ibb.co.com/99sxWDGk/600x900-2026-09-21-T161433-475-1.webp',
    price: 1700,
    description:
      'Три друга снова оказываются вместе, когда ценная монета неожиданно становится причиной большой истории.',
    duration: '1 ч 39 мин',
    age: '14+',
  },
  {
    id: '4',
    title: 'Вышка 2',
    genre: 'Триллер',
    rating: 6.8,
    poster:
      'https://i.ibb.co.com/kggs01vC/600x900-95-1.webp',
    price: 1700,
    description:
      'Опасное путешествие превращается в борьбу за выживание.',
    duration: '1 ч 50 мин',
    age: '18+',
  },
];

const COMING_SOON: Movie[] = [
  {
    id: '5',
    title: 'Диггер',
    genre: 'Драма',
    rating: 7.3,
    poster:
      'https://i.ibb.co.com/99sxWDGk/600x900-2026-09-21-T161433-475-1.webp',
    price: 1700,
    description:
      'Новая драматическая история.',
    duration: '1 ч 46 мин',
    age: '18+',
  },
  {
    id: '6',
    title: 'Девятая планета',
    genre: 'Фантастика',
    rating: 5.7,
    poster:
      'https://i.ibb.co.com/kggs01vC/600x900-95-1.webp',
    price: 1700,
    description:
      'Фантастическое приключение.',
    duration: '1 ч 50 мин',
    age: '16+',
  },
];

const GENRES = [
  'Все',
  'Боевик',
  'Комедия',
  'Драма',
  'Фантастика',
  'Ужасы',
  'Триллер',
];

export default function HomeScreen({
  city,
  userName,
  onMoviePress,
  onTicketsPress,
  onProfilePress,
}: Props) {
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] =
    useState('Все');

  const filteredMovies = useMemo(() => {
    return MOVIES.filter((movie) => {
      const searchMatch =
        movie.title
          .toLowerCase()
          .includes(search.toLowerCase());

      const genreMatch =
        selectedGenre === 'Все' ||
        movie.genre === selectedGenre;

      return searchMatch && genreMatch;
    });
  }, [search, selectedGenre]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* HEADER */}

        <View style={styles.header}>
          <View>
            <Text style={styles.smallText}>
              Город
            </Text>

            <Text style={styles.city}>
              {city || 'Алматы'} ▾
            </Text>
          </View>

          <Pressable
            style={styles.avatar}
            onPress={onProfilePress}
          >
            <Text style={styles.avatarText}>
              {(userName || 'U')
                .charAt(0)
                .toUpperCase()}
            </Text>
          </Pressable>
        </View>

        {/* GREETING */}

        <Text style={styles.greeting}>
          Привет{userName ? `, ${userName}` : ''}!
        </Text>

        <Text style={styles.subtitle}>
          Что будем смотреть сегодня?
        </Text>

        {/* SEARCH */}

        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>
            🔍
          </Text>

          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Поиск фильма"
            placeholderTextColor="#999"
            style={styles.searchInput}
          />
        </View>

        {/* GENRES */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.genreScroll}
        >
          {GENRES.map((genre) => {
            const active =
              genre === selectedGenre;

            return (
              <Pressable
                key={genre}
                onPress={() =>
                  setSelectedGenre(genre)
                }
                style={[
                  styles.genreButton,
                  active &&
                    styles.genreButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.genreText,
                    active &&
                      styles.genreTextActive,
                  ]}
                >
                  {genre}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* SECTION */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Сейчас в кино
          </Text>

          <Text style={styles.seeAll}>
            Все
          </Text>
        </View>

        {/* MOVIES */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {filteredMovies.map((movie) => (
            <Pressable
              key={movie.id}
              style={styles.movieCard}
              onPress={() =>
                onMoviePress(movie)
              }
            >
              <Image
                source={{
                  uri: movie.poster,
                }}
                style={styles.poster}
                resizeMode="cover"
              />

              <View style={styles.rating}>
                <Text style={styles.ratingText}>
                  ★ {movie.rating}
                </Text>
              </View>

              <Text
                style={styles.movieTitle}
                numberOfLines={1}
              >
                {movie.title}
              </Text>

              <Text style={styles.movieGenre}>
                {movie.genre}
              </Text>

              <Text style={styles.price}>
                от {movie.price} ₸
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* FEATURE */}

        {filteredMovies.length > 0 && (
          <Pressable
            style={styles.featureCard}
            onPress={() =>
              onMoviePress(filteredMovies[0])
            }
          >
            <Image
              source={{
                uri: filteredMovies[0].poster,
              }}
              style={styles.featureImage}
            />

            <View style={styles.featureOverlay}>
              <Text style={styles.featureSmall}>
                РЕКОМЕНДУЕМ
              </Text>

              <Text style={styles.featureTitle}>
                {filteredMovies[0].title}
              </Text>

              <Text style={styles.featureInfo}>
                ★ {filteredMovies[0].rating} •{' '}
                {filteredMovies[0].genre}
              </Text>

              <View style={styles.featureButton}>
                <Text
                  style={
                    styles.featureButtonText
                  }
                >
                  Смотреть
                </Text>
              </View>
            </View>
          </Pressable>
        )}

        {/* COMING SOON */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Скоро в кино
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {COMING_SOON.map((movie) => (
            <View
              key={movie.id}
              style={styles.comingCard}
            >
              <Image
                source={{
                  uri: movie.poster,
                }}
                style={styles.comingPoster}
                resizeMode="cover"
              />

              <Text
                style={styles.comingTitle}
                numberOfLines={1}
              >
                {movie.title}
              </Text>

              <Text style={styles.comingGenre}>
                {movie.genre}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* BOTTOM NAV */}

      <View style={styles.bottomNav}>
        <Pressable style={styles.navItem}>
          <Text style={styles.navIcon}>
            🏠
          </Text>
          <Text style={styles.navActive}>
            Главная
          </Text>
        </Pressable>

        <Pressable
          style={styles.navItem}
          onPress={onTicketsPress}
        >
          <Text style={styles.navIcon}>
            🎟
          </Text>
          <Text style={styles.navText}>
            Билеты
          </Text>
        </Pressable>

        <Pressable
          style={styles.navItem}
          onPress={onProfilePress}
        >
          <Text style={styles.navIcon}>
            👤
          </Text>
          <Text style={styles.navText}>
            Профиль
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FA',
  },

  content: {
    padding: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  smallText: {
    fontSize: 12,
    color: '#999',
  },

  city: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1B1923',
    marginTop: 3,
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#A855F7',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

  greeting: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1B1923',
    marginTop: 25,
  },

  subtitle: {
    fontSize: 15,
    color: '#777',
    marginTop: 5,
  },

  searchBox: {
    height: 52,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#222',
  },

  genreScroll: {
    marginTop: 18,
  },

  genreButton: {
    paddingHorizontal: 17,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginRight: 8,
  },

  genreButtonActive: {
    backgroundColor: '#A855F7',
  },

  genreText: {
    color: '#666',
    fontWeight: '600',
  },

  genreTextActive: {
    color: '#fff',
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: '#1B1923',
  },

  seeAll: {
    color: '#A855F7',
    fontWeight: '600',
  },

  movieCard: {
    width: 155,
    marginRight: 15,
  },

  poster: {
    width: 155,
    height: 225,
    borderRadius: 15,
    backgroundColor: '#ddd',
  },

  rating: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#1B1923',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
  },

  ratingText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },

  movieTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '800',
    color: '#1B1923',
  },

  movieGenre: {
    marginTop: 4,
    fontSize: 13,
    color: '#888',
  },

  price: {
    marginTop: 5,
    fontSize: 13,
    color: '#A855F7',
    fontWeight: '700',
  },

  featureCard: {
    height: 210,
    marginTop: 30,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#222',
  },

  featureImage: {
    width: '100%',
    height: '100%',
  },

  featureOverlay: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 18,
  },

  featureSmall: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '800',
  },

  featureTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '900',
    marginTop: 5,
  },

  featureInfo: {
    color: '#eee',
    marginTop: 4,
  },

  featureButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#A855F7',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 10,
    marginTop: 10,
  },

  featureButtonText: {
    color: '#fff',
    fontWeight: '700',
  },

  comingCard: {
    width: 135,
    marginRight: 14,
  },

  comingPoster: {
    width: 135,
    height: 190,
    borderRadius: 14,
  },

  comingTitle: {
    marginTop: 8,
    fontWeight: '800',
    color: '#222',
  },

  comingGenre: {
    color: '#888',
    fontSize: 12,
    marginTop: 3,
  },

  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 78,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },

  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  navIcon: {
    fontSize: 21,
    marginBottom: 4,
  },

  navActive: {
    color: '#A855F7',
    fontSize: 12,
    fontWeight: '800',
  },

  navText: {
    color: '#888',
    fontSize: 12,
  },
});