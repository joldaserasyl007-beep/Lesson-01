import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  userName?: string;
  phone?: string;
  city?: string | null;
  ticketsCount: number;
  onHome: () => void;
  onTickets: () => void;
  onLogout: () => void;
};

export default function ProfileScreen({
  userName,
  phone,
  city,
  ticketsCount,
  onHome,
  onTickets,
  onLogout,
}: Props) {
  const name = userName || 'Пользователь';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          Профиль
        </Text>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {name.charAt(0).toUpperCase()}
            </Text>
          </View>

          <Text style={styles.name}>
            {name}
          </Text>

          <Text style={styles.phone}>
            {phone || 'Номер не указан'}
          </Text>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>
              Город
            </Text>

            <Text style={styles.value}>
              {city || 'Алматы'}
            </Text>
          </View>

          <View style={styles.line} />

          <View style={styles.infoRow}>
            <Text style={styles.label}>
              Куплено билетов
            </Text>

            <Text style={styles.value}>
              {ticketsCount}
            </Text>
          </View>
        </View>

        <Pressable
          onPress={onTickets}
          style={styles.menuButton}
        >
          <Text style={styles.menuIcon}>
            🎟
          </Text>

          <Text style={styles.menuText}>
            Мои билеты
          </Text>

          <Text style={styles.arrow}>
            ›
          </Text>
        </Pressable>

        <Pressable
          onPress={onLogout}
          style={styles.logoutButton}
        >
          <Text style={styles.logoutText}>
            Выйти из аккаунта
          </Text>
        </Pressable>
      </View>

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

        <Pressable
          onPress={onTickets}
          style={styles.navItem}
        >
          <Text style={styles.navIcon}>
            🎟
          </Text>

          <Text style={styles.navText}>
            Билеты
          </Text>
        </Pressable>

        <View style={styles.navItem}>
          <Text style={styles.navIcon}>
            👤
          </Text>

          <Text style={styles.navActive}>
            Профиль
          </Text>
        </View>
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
    flex: 1,
  },

  title: {
    fontSize: 29,
    fontWeight: '900',
    color: '#1B1923',
  },

  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    padding: 25,
    marginTop: 25,
  },

  avatar: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#A855F7',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    color: '#fff',
    fontSize: 34,
    fontWeight: '900',
  },

  name: {
    marginTop: 14,
    fontSize: 22,
    fontWeight: '900',
    color: '#222',
  },

  phone: {
    marginTop: 5,
    color: '#888',
  },

  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    marginTop: 18,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  label: {
    color: '#888',
  },

  value: {
    color: '#222',
    fontWeight: '800',
  },

  line: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },

  menuButton: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },

  menuIcon: {
    fontSize: 21,
  },

  menuText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
  },

  arrow: {
    fontSize: 28,
    color: '#999',
  },

  logoutButton: {
    marginTop: 25,
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E55',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoutText: {
    color: '#D33',
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