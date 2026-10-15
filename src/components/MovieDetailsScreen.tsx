import React, { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
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
  movie: Movie;
  onBack: () => void;
  onBuy: (
    movie: Movie,
    date: string,
    time: string
  ) => void;
};

const dates = [
  'Сегодня',
  'Завтра',
  '8 окт.',
  '9 окт.',
];

const times = [
  '15:10',
  '18:20',
  '20:40',
  '22:10',
];

export default function MovieDetailsScreen({
  movie,
  onBack,
  onBuy,
}: Props) {
  const [selectedDate, setSelectedDate] =
    useState('Сегодня');

  const [selectedTime, setSelectedTime] =
    useState('18:20');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.posterContainer}>
          <Image
            source={{
              uri: movie.poster,
            }}
            style={styles.poster}
            resizeMode="cover"
          />

          <Pressable
            style={styles.backButton}
            onPress={onBack}
          >
            <Text style={styles.backText}>
              ‹
            </Text>
          </Pressable>
        </View>

        <View style={styles.content}>
          <View style={styles.titleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>
                {movie.title}
              </Text>

              <Text style={styles.genre}>
                {movie.genre}
              </Text>
            </View>

            <View style={styles.ratingBox}>
              <Text style={styles.rating}>
                ★ {movie.rating}
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>
                Возраст
              </Text>
              <Text style={styles.infoValue}>
                {movie.age}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>
                Длительность
              </Text>
              <Text style={styles.infoValue}>
                {movie.duration}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>
                Цена
              </Text>
              <Text style={styles.infoValue}>
                {movie.price} ₸
              </Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>
            О фильме
          </Text>

          <Text style={styles.description}>
            {movie.description}
          </Text>

          <Text style={styles.sectionTitle}>
            Выберите дату
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {dates.map((date) => {
              const active =
                selectedDate === date;

              return (
                <Pressable
                  key={date}
                  onPress={() =>
                    setSelectedDate(date)
                  }
                  style={[
                    styles.dateButton,
                    active &&
                      styles.activeButton,
                  ]}
                >
                  <Text
                    style={[
                      styles.dateText,
                      active &&
                        styles.activeText,
                    ]}
                  >
                    {date}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          <Text style={styles.sectionTitle}>
            Время
          </Text>

          <View style={styles.times}>
            {times.map((time) => {
              const active =
                selectedTime === time;

              return (
                <Pressable
                  key={time}
                  onPress={() =>
                    setSelectedTime(time)
                  }
                  style={[
                    styles.timeButton,
                    active &&
                      styles.activeButton,
                  ]}
                >
                  <Text
                    style={[
                      styles.timeText,
                      active &&
                        styles.activeText,
                    ]}
                  >
                    {time}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Pressable
            style={styles.buyButton}
            onPress={() =>
              onBuy(
                movie,
                selectedDate,
                selectedTime
              )
            }
          >
            <Text style={styles.buyText}>
              Купить билет
            </Text>
          </Pressable>

          <View style={{ height: 30 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FA',
  },

  posterContainer: {
    height: 390,
    position: 'relative',
  },

  poster: {
    width: '100%',
    height: '100%',
  },

  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  backText: {
    color: '#fff',
    fontSize: 36,
    lineHeight: 40,
  },

  content: {
    padding: 20,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    fontSize: 27,
    fontWeight: '900',
    color: '#1B1923',
  },

  genre: {
    color: '#888',
    marginTop: 5,
    fontSize: 15,
  },

  ratingBox: {
    backgroundColor: '#A855F7',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 12,
  },

  rating: {
    color: '#fff',
    fontWeight: '800',
  },

  infoRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginTop: 20,
    padding: 15,
    justifyContent: 'space-between',
  },

  infoItem: {
    alignItems: 'center',
    flex: 1,
  },

  infoLabel: {
    color: '#999',
    fontSize: 11,
  },

  infoValue: {
    color: '#222',
    fontWeight: '800',
    marginTop: 5,
    fontSize: 13,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#1B1923',
    marginTop: 25,
    marginBottom: 10,
  },

  description: {
    fontSize: 15,
    lineHeight: 23,
    color: '#666',
  },

  dateButton: {
    paddingHorizontal: 17,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginRight: 10,
  },

  activeButton: {
    backgroundColor: '#A855F7',
  },

  dateText: {
    color: '#555',
    fontWeight: '700',
  },

  activeText: {
    color: '#fff',
  },

  times: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  timeButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 13,
  },

  timeText: {
    color: '#555',
    fontWeight: '700',
  },

  buyButton: {
    backgroundColor: '#A855F7',
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },

  buyText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '800',
  },
});