import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Ticket = {
  id: string;
  movieTitle: string;
  poster: string;
  date: string;
  time: string;
  hall: string;
  seats: string[];
  total: number;
};

type Props = {
  tickets: Ticket[];
  onHome: () => void;
  onProfile: () => void;
};

export default function MyTicketsScreen({
  tickets,
  onHome,
  onProfile,
}: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>
          Мои билеты
        </Text>

        {tickets.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>
              🎟️
            </Text>

            <Text style={styles.emptyTitle}>
              У вас пока нет билетов
            </Text>

            <Text style={styles.emptyText}>
              Выберите фильм и купите билет,
              чтобы он появился здесь.
            </Text>

            <Pressable
              onPress={onHome}
              style={styles.homeButton}
            >
              <Text
                style={styles.homeButtonText}
              >
                Выбрать фильм
              </Text>
            </Pressable>
          </View>
        ) : (
          tickets.map((ticket) => (
            <View
              key={ticket.id}
              style={styles.ticket}
            >
              <Image
                source={{
                  uri: ticket.poster,
                }}
                style={styles.poster}
              />

              <View style={styles.ticketInfo}>
                <Text
                  style={styles.movieTitle}
                  numberOfLines={2}
                >
                  {ticket.movieTitle}
                </Text>

                <Text style={styles.info}>
                  📅 {ticket.date}
                </Text>

                <Text style={styles.info}>
                  🕐 {ticket.time}
                </Text>

                <Text style={styles.info}>
                  🎬 {ticket.hall}
                </Text>

                <Text style={styles.info}>
                  💺 {ticket.seats.join(', ')}
                </Text>

                <Text style={styles.total}>
                  {ticket.total} ₸
                </Text>
              </View>
            </View>
          ))
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.bottomNav}>
        <Pressable
          onPress={onHome}
          style={styles.navItem}
        >
          <Text style={styles.navIcon}>
            🏠
          </Text>
          <Text style={styles.navText}>
            Главная
          </Text>
        </Pressable>

        <View style={styles.navItem}>
          <Text style={styles.navIcon}>
            🎟
          </Text>
          <Text style={styles.navActive}>
            Билеты
          </Text>
        </View>

        <Pressable
          onPress={onProfile}
          style={styles.navItem}
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

  title: {
    fontSize: 29,
    fontWeight: '900',
    color: '#1B1923',
    marginBottom: 25,
  },

  ticket: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 12,
    flexDirection: 'row',
    marginBottom: 16,
  },

  poster: {
    width: 105,
    height: 150,
    borderRadius: 12,
  },

  ticketInfo: {
    flex: 1,
    marginLeft: 14,
  },

  movieTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: '#222',
    marginBottom: 10,
  },

  info: {
    color: '#666',
    fontSize: 13,
    marginBottom: 5,
  },

  total: {
    color: '#A855F7',
    fontSize: 17,
    fontWeight: '900',
    marginTop: 5,
  },

  empty: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginTop: 50,
  },

  emptyIcon: {
    fontSize: 50,
  },

  emptyTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#222',
    marginTop: 15,
  },

  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 8,
    lineHeight: 21,
  },

  homeButton: {
    backgroundColor: '#A855F7',
    borderRadius: 13,
    paddingHorizontal: 20,
    paddingVertical: 13,
    marginTop: 20,
  },

  homeButtonText: {
    color: '#fff',
    fontWeight: '800',
  },

  bottomNav: {
    height: 78,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  navItem: {
    alignItems: 'center',
  },

  navIcon: {
    fontSize: 21,
    marginBottom: 4,
  },

  navText: {
    color: '#888',
    fontSize: 12,
  },

  navActive: {
    color: '#A855F7',
    fontSize: 12,
    fontWeight: '800',
  },
});