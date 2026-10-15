import React, { useState } from 'react';
import {
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
  date: string;
  time: string;
  onBack: () => void;
  onPurchase: (
    seats: string[]
  ) => void;
};

const rows = ['A', 'B', 'C', 'D', 'E', 'F'];

const occupiedSeats = [
  'A4',
  'B2',
  'C5',
  'D3',
  'E1',
];

export default function SeatSelectionScreen({
  movie,
  date,
  time,
  onBack,
  onPurchase,
}: Props) {
  const [selectedSeats, setSelectedSeats] =
    useState<string[]>([]);

  const toggleSeat = (seat: string) => {
    if (occupiedSeats.includes(seat)) {
      return;
    }

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(
        selectedSeats.filter(
          (item) => item !== seat
        )
      );
    } else {
      setSelectedSeats([
        ...selectedSeats,
        seat,
      ]);
    }
  };

  const total =
    selectedSeats.length * movie.price;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <Pressable
            onPress={onBack}
            style={styles.backButton}
          >
            <Text style={styles.backText}>
              ‹
            </Text>
          </Pressable>

          <Text style={styles.headerTitle}>
            Выбор места
          </Text>

          <View style={{ width: 44 }} />
        </View>

        <View style={styles.movieInfo}>
          <Text style={styles.movieTitle}>
            {movie.title}
          </Text>

          <Text style={styles.movieDetails}>
            {date} • {time} • Зал 3
          </Text>
        </View>

        <View style={styles.screenBox}>
          <View style={styles.screen} />

          <Text style={styles.screenText}>
            ЭКРАН
          </Text>
        </View>

        <Text style={styles.chooseText}>
          Выберите места
        </Text>

        <View style={styles.seatsContainer}>
          {rows.map((row) => (
            <View
              key={row}
              style={styles.row}
            >
              <Text style={styles.rowLabel}>
                {row}
              </Text>

              {Array.from({
                length: 6,
              }).map((_, index) => {
                const seat =
                  `${row}${index + 1}`;

                const occupied =
                  occupiedSeats.includes(
                    seat
                  );

                const selected =
                  selectedSeats.includes(
                    seat
                  );

                return (
                  <Pressable
                    key={seat}
                    onPress={() =>
                      toggleSeat(seat)
                    }
                    style={[
                      styles.seat,
                      occupied &&
                        styles.occupied,
                      selected &&
                        styles.selected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.seatText,
                        (occupied ||
                          selected) &&
                          styles.whiteText,
                      ]}
                    >
                      {index + 1}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          ))}
        </View>

        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View
              style={[
                styles.legendBox,
                styles.free,
              ]}
            />
            <Text>Свободно</Text>
          </View>

          <View style={styles.legendItem}>
            <View
              style={[
                styles.legendBox,
                styles.selected,
              ]}
            />
            <Text>Выбрано</Text>
          </View>

          <View style={styles.legendItem}>
            <View
              style={[
                styles.legendBox,
                styles.occupied,
              ]}
            />
            <Text>Занято</Text>
          </View>
        </View>

        <View style={styles.summary}>
          <View>
            <Text style={styles.summaryLabel}>
              Места
            </Text>

            <Text style={styles.summarySeats}>
              {selectedSeats.length > 0
                ? selectedSeats.join(', ')
                : 'Не выбраны'}
            </Text>
          </View>

          <View style={styles.totalBox}>
            <Text style={styles.totalLabel}>
              Итого
            </Text>

            <Text style={styles.total}>
              {total} ₸
            </Text>
          </View>
        </View>

        <Pressable
          disabled={
            selectedSeats.length === 0
          }
          onPress={() =>
            onPurchase(selectedSeats)
          }
          style={[
            styles.purchaseButton,
            selectedSeats.length === 0 &&
              styles.disabledButton,
          ]}
        >
          <Text style={styles.purchaseText}>
            Оплатить билет
          </Text>
        </Pressable>
      </ScrollView>
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
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  backText: {
    fontSize: 34,
    color: '#222',
    lineHeight: 38,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1B1923',
  },

  movieInfo: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 17,
    marginTop: 20,
  },

  movieTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#222',
  },

  movieDetails: {
    marginTop: 5,
    color: '#888',
  },

  screenBox: {
    alignItems: 'center',
    marginTop: 30,
  },

  screen: {
    width: '80%',
    height: 7,
    borderRadius: 10,
    backgroundColor: '#A855F7',
  },

  screenText: {
    marginTop: 8,
    color: '#999',
    fontSize: 11,
    fontWeight: '700',
  },

  chooseText: {
    fontSize: 19,
    fontWeight: '800',
    marginTop: 30,
    color: '#222',
    textAlign: 'center',
  },

  seatsContainer: {
    marginTop: 25,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  rowLabel: {
    width: 25,
    color: '#999',
    fontWeight: '700',
  },

  seat: {
    width: 40,
    height: 34,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginHorizontal: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },

  free: {
    backgroundColor: '#fff',
  },

  selected: {
    backgroundColor: '#A855F7',
  },

  occupied: {
    backgroundColor: '#BDBDBD',
  },

  seatText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#777',
  },

  whiteText: {
    color: '#fff',
  },

  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 25,
  },

  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  legendBox: {
    width: 15,
    height: 15,
    borderRadius: 4,
  },

  summary: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 17,
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  summaryLabel: {
    color: '#999',
    fontSize: 12,
  },

  summarySeats: {
    marginTop: 5,
    color: '#222',
    fontWeight: '800',
  },

  totalBox: {
    alignItems: 'flex-end',
  },

  totalLabel: {
    color: '#999',
    fontSize: 12,
  },

  total: {
    color: '#A855F7',
    fontSize: 20,
    fontWeight: '900',
    marginTop: 3,
  },

  purchaseButton: {
    height: 55,
    borderRadius: 16,
    backgroundColor: '#A855F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  disabledButton: {
    backgroundColor: '#CCC',
  },

  purchaseText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
});