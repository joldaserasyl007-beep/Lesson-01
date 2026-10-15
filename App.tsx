import React, { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';

import LoginScreen from './src/components/LoginScreen';
import ForgetPassword from './src/components/ForgetPassword';
import VerifyCode from './src/components/VerifyCode';
import ResetPassword from './src/components/ResetPassword';
import Registration from './src/components/Registration';
import ChooseCity from './src/components/ChooseCity';

import HomeScreen from './src/components/HomeScreen';
import MovieDetailsScreen from './src/components/MovieDetailsScreen';
import SeatSelectionScreen from './src/components/SeatSelectionScreen';
import MyTicketsScreen from './src/components/MyTicketsScreen';
import ProfileScreen from './src/components/ProfileScreen';

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

export type Ticket = {
  id: string;
  movieTitle: string;
  poster: string;
  date: string;
  time: string;
  hall: string;
  seats: string[];
  total: number;
};

type Screen =
  | 'login'
  | 'forgot'
  | 'verify'
  | 'reset'
  | 'register'
  | 'city'
  | 'home'
  | 'movie'
  | 'seats'
  | 'tickets'
  | 'profile';

type VerifyFlow = 'forgot' | 'register';

export default function App() {
  const [screen, setScreen] = useState<Screen>('login');

  const [phone, setPhone] = useState('');
  const [userName, setUserName] = useState('');
  const [city, setCity] = useState<string | null>(null);

  const [verifyFlow, setVerifyFlow] =
    useState<VerifyFlow>('forgot');

  const [selectedMovie, setSelectedMovie] =
    useState<Movie | null>(null);

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const [tickets, setTickets] = useState<Ticket[]>([]);

  // ANDROID-тың жүйелік "Артқа" батырмасы / жесті
  // Ескерту: бұл хук барлық `if (screen === ...) return` жолдарынан ЖОҒАРЫ тұруы керек
  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        switch (screen) {
          case 'forgot':
          case 'register':
            setScreen('login');
            return true;

          case 'verify':
            setScreen(
              verifyFlow === 'forgot' ? 'forgot' : 'register'
            );
            return true;

          case 'reset':
            setScreen('verify');
            return true;

          case 'city':
            setScreen('verify');
            return true;

          case 'movie':
            setScreen('home');
            return true;

          case 'seats':
            setScreen('movie');
            return true;

          case 'tickets':
          case 'profile':
            setScreen('home');
            return true;

          default:
            // 'login' және 'home': қосымшадан шығуға рұқсат
            return false;
        }
      }
    );

    return () => subscription.remove();
  }, [screen, verifyFlow]);

  // LOGIN
  if (screen === 'login') {
    return (
      <LoginScreen
        onForgotPassword={() => setScreen('forgot')}
        onRegister={() => setScreen('register')}
        onLoginSuccess={() => {
          setScreen('home');
        }}
      />
    );
  }

  // FORGOT PASSWORD
  if (screen === 'forgot') {
    return (
      <ForgetPassword
        onBack={() => setScreen('login')}
        onContinue={(enteredPhone: string) => {
          setPhone(enteredPhone);
          setVerifyFlow('forgot');
          setScreen('verify');
        }}
      />
    );
  }

  // REGISTRATION
  if (screen === 'register') {
    return (
      <Registration
        onBack={() => setScreen('login')}
        onLogin={() => setScreen('login')}
        onContinue={({
          name,
          phone: enteredPhone,
        }: {
          name: string;
          phone: string;
        }) => {
          setUserName(name);
          setPhone(enteredPhone);
          setVerifyFlow('register');
          setScreen('verify');
        }}
      />
    );
  }

  // VERIFY CODE
  if (screen === 'verify') {
    return (
      <VerifyCode
        onBack={() =>
          setScreen(
            verifyFlow === 'forgot'
              ? 'forgot'
              : 'register'
          )
        }
        phone={phone}
        onSubmitCode={(code: string) => {
          console.log('Введённый код:', code);

          if (verifyFlow === 'forgot') {
            setScreen('reset');
          } else {
            setScreen('city');
          }
        }}
        onResend={() =>
          console.log('Кодты қайта жіберу басылды')
        }
      />
    );
  }

  // RESET PASSWORD
  if (screen === 'reset') {
    return (
      <ResetPassword
        onBack={() => setScreen('verify')}
        onContinue={(newPassword: string) => {
          console.log(
            'Жаңа пароль орнатылды:',
            newPassword
          );

          setScreen('login');
        }}
      />
    );
  }

  // CHOOSE CITY
  if (screen === 'city') {
    return (
      <ChooseCity
        onBack={() => setScreen('verify')}
        onContinue={(selectedCity: string) => {
          setCity(selectedCity);
          setScreen('home');
        }}
      />
    );
  }

  // HOME
  if (screen === 'home') {
    return (
      <HomeScreen
        city={city}
        userName={userName}
        onMoviePress={(movie: Movie) => {
          setSelectedMovie(movie);
          setScreen('movie');
        }}
        onTicketsPress={() => setScreen('tickets')}
        onProfilePress={() => setScreen('profile')}
      />
    );
  }

  // MOVIE DETAILS
  if (screen === 'movie' && selectedMovie) {
    return (
      <MovieDetailsScreen
        movie={selectedMovie}
        onBack={() => setScreen('home')}
        onBuy={(
          movie: Movie,
          date: string,
          time: string
        ) => {
          setSelectedMovie(movie);
          setSelectedDate(date);
          setSelectedTime(time);
          setScreen('seats');
        }}
      />
    );
  }

  // SEAT SELECTION
  if (screen === 'seats' && selectedMovie) {
    return (
      <SeatSelectionScreen
        movie={selectedMovie}
        date={selectedDate}
        time={selectedTime}
        onBack={() => setScreen('movie')}
        onPurchase={(selectedSeats: string[]) => {
          const newTicket: Ticket = {
            id: Date.now().toString(),
            movieTitle: selectedMovie.title,
            poster: selectedMovie.poster,
            date: selectedDate,
            time: selectedTime,
            hall: 'Зал 3',
            seats: selectedSeats,
            total:
              selectedSeats.length *
              selectedMovie.price,
          };

          setTickets((prev) => [
            ...prev,
            newTicket,
          ]);

          setScreen('tickets');
        }}
      />
    );
  }

  // MY TICKETS
  if (screen === 'tickets') {
    return (
      <MyTicketsScreen
        tickets={tickets}
        onHome={() => setScreen('home')}
        onProfile={() => setScreen('profile')}
      />
    );
  }

  // PROFILE
  if (screen === 'profile') {
    return (
      <ProfileScreen
        userName={userName}
        phone={phone}
        city={city}
        ticketsCount={tickets.length}
        onHome={() => setScreen('home')}
        onTickets={() => setScreen('tickets')}
        onLogout={() => {
          setScreen('login');
        }}
      />
    );
  }

  return null;
}
