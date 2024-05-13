import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, SafeAreaView, _ScrollView, StyleSheet, Button } from 'react-native';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import { Image, Animated } from 'react-native';
import  {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import styles from './styles.ts';
import Geolocation from '@react-native-community/geolocation';
import { Platform } from 'react-native';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';

const greetings = [
  "Hello, Charlie BC",
  "Hola, Charlie BC",
  "Bonjour, Charlie BC",
  "Howdy, Charlie BC", // Informal, often used in the South of the USA
  "Namaste, Charlie BC", // More formal, suitable for professional contexts
  "Goddag, Charlie BC?", // Very informal
  "Hey, Charlie BC", // Casual greeting
  "Guten Tag, Charlie BC", // Suitable for morning time
  "Nǐn hǎo, Charlie BC", // Suitable for afternoon
  "Zdravstvuyte, Charlie BC", // Suitable for evening
 // Informal and friendly
];

const LogoContainer = () => (
  <View style={styles.logoContainer}>
    <Image source={require('./runna_logo.png')} style ={styles.logo} />
  </View>
);
const NavContainer = ({ setCurrentScreen }) => (
  <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navButton} onPress={() => setCurrentScreen('Map')}>
          <Icon name="map-outline" size={20} color="black" />
          <Text style={styles.navText}>Map</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={() => setCurrentScreen('Home')}>
          <Icon name="home-outline" size={20} color="black" />
          <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={() => setCurrentScreen('Account')}>
          <Icon name="person-outline" size={20} color="black" />
          <Text style={styles.navText}>Account</Text>
      </TouchableOpacity>
      
  </View>
);

function shuffleArray(array: any[]) {
  var currentIndex = array.length, temporaryValue, randomIndex;


  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
const shuffledGreetings = shuffleArray(greetings);


const coordinates = [
  { latitude: 34.0522, longitude: -118.2437 },
  { latitude: 33.894, longitude: -117.2438 },
  { latitude: 34.0724, longitude: -118.7439 },
  // Add more coordinates as needed
];

function convertToTime(decimalTime: number) {
  const hours = Math.floor(decimalTime / 60);
  const minutes = Math.floor(decimalTime % 60);
  const seconds = Math.floor((decimalTime * 60) % 60);

  return `${hours}h ${minutes}m ${seconds}s`;
}

const MapScreen = ({ coordinates, pickup, dropoff, OnReady }) => {
  const [region, setRegion] = useState({
    latitude: 34.0522,
    longitude: -118.2437,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [duration, setDuration] = useState(0);
  const [pickupCoords, setPickup] = useState( {latitude: 34.0522, longitude: -118.2437});
  const [dropoffCoords, setDropoff] = useState({latitude: 34.0724, longitude: -118.7439});
  const [distance, setDistance] = useState(0);
  

  const fetchCoordinates = async (address) => {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyB-RG5dQfj60YTARN4ZolI0q9VZIzQ92Po`);
    const data = await response.json();
    return data.results[0].geometry.location; // returns { lat, lng }
  };

  useEffect(() => {
    fetchCoordinates('UCLA').then(location => setPickup({ latitude: location.lat, longitude: location.lng }));
    fetchCoordinates('LAX').then(location => setDropoff({ latitude: location.lat, longitude: location.lng }));
  }, []);

     useEffect(() => {
    const requestLocationPermission = async () => {
      const permissionStatus = await request(Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (permissionStatus === RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(position => {
          const { latitude, longitude } = position.coords;
          setPickup({ latitude, longitude }); // Update to the current location
        }, error => console.error(error), { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
      } else {
        console.log("Location permission denied");
      }
    };

    requestLocationPermission();
  }, []);

  const mapRef = useRef(null);
  return (
    <View style={StyleSheet.absoluteFillObject}>
    <MapView
    ref={mapRef}

    style={StyleSheet.absoluteFill}
      region={region}
      mapType="standard"
      showsUserLocation={true}
      followsUserLocation={true}
      showsMyLocationButton={true}
    >
      <MapViewDirections
        origin={pickup}
        destination={dropoff} 
        apikey='AIzaSyB-RG5dQfj60YTARN4ZolI0q9VZIzQ92Po'
        strokeWidth={3.5} 
        strokeColor='blue'
        precision='high'
        
        onReady={result => {
          setDistance(result.distance);
          setDuration(result.duration);
          fetchCoordinates(pickup).then(location => setPickup({ latitude: location.lat, longitude: location.lng }));
          fetchCoordinates(dropoff).then(location => setDropoff({ latitude: location.lat, longitude: location.lng }));
            mapRef.current.fitToCoordinates([pickupCoords, dropoffCoords], {
              edgePadding: { top: 50, right: 50, bottom: 300, left: 50 },
              animated: true,
            });
          }}
        

      />
          
           
           <Marker coordinate={pickupCoords}>
      <Image
        source={require('./marker.png')} // Replace with your desired pickup marker image
        style={{ width: 30, height: 30 }} // Specify your desired size
      />
    </Marker>

    <Marker coordinate ={dropoffCoords}>
      <Image
        source={require('./marker.png')} // Replace with your desired dropoff marker image
        style={{ width: 30, height: 30 }} // Specify your desired size
      />
    </Marker>


      {coordinates.map((coordinate, index) => (
        <Marker key={index} coordinate={coordinate}>
          <Image
            source={require('./car-top.png')}
            style={{ width: 50, height: 50, transform: [{ rotate: '45deg' }] }} // Specify your desired size
          />
        </Marker>
      ))}
   </MapView>
<View style={{top: 60, left: 20, marginRight: 150, }}>
  <Text >Pickup: {pickup}</Text>
  <Text >Dropoff: {dropoff}</Text>
  <Text >Distance: {distance} km</Text>
  <Text >Duration: {convertToTime(duration)}</Text>
</View>
</View>
    
  );
};

  
const HomeMapScreen = () => {
  const [destination, setDestination] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState<{ place: any, timestamp: number } | null>(null);
  const [coordinates, setCoordinates] = useState([]);
  const [pickup, setPickup] = useState(null);
  const [dropoff, setDropoff] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null); 
  
  const [isAutocompleteVisible, setIsAutocompleteVisible] = useState(false);
  const [isfirsAutocompletevisible, setIsFirstAutocompletevisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  
  const pastRides = [
    { id: 1, destination: "Central Park", fare: "$15.20", date: "04/10/2024" },
    { id: 2, destination: "Times Square", fare: "$12.50", date: "04/08/2024" },
    { id: 3, destination: "Empire State Building", fare: "$18.75", date: "04/07/2024" },
    { id: 4, destination: "Statue of Liberty", fare: "$20.30", date: "04/05/2024" },
    { id: 5, destination: "Brooklyn Bridge", fare: "$14.50", date: "04/03/2024" },
    { id: 6, destination: "Wall Street", fare: "$16.00", date: "03/31/2024" },
    { id: 7, destination: "Metropolitan Museum of Art", fare: "$19.90", date: "03/29/2024" },
    { id: 8, destination: "Madison Square Garden", fare: "$13.65", date: "03/25/2024" },
    { id: 9, destination: "Yankee Stadium", fare: "$18.00", date: "03/20/2024" },
    { id: 10, destination: "Coney Island", fare: "$22.25", date: "03/18/2024" }
];
const [isUp, setIsUp] = useState(false);
const [verticalAnim, setVerticalAnim] = useState(new Animated.Value(0)); // Declare the missing variable

const animateContainer = () => {
  Animated.timing(
    verticalAnim,
    {
      toValue: isUp ? 0 : 220, // Move up or down based on isUp state
      duration: 400,
      useNativeDriver: true,
    }
  ).start(() => setIsUp(!isUp)); // Update isUp state after animation
};

const [text, setText] = useState('');
const [greetingIndex, setGreetingIndex] = useState(0);


const [isBackspacing, setIsBackspacing] = useState(false);

const [isFirstSearchFocused, setIsFirstSearchFocused] = useState(false);

const [isSecondSearchFocused, setIsSecondSearchFocused] = useState(false);
const [showInfoBox, setShowInfoBox] = useState(false);

useEffect(() => {
  const currentGreeting = shuffledGreetings[greetingIndex];

  
  let i = isBackspacing ? text.length - 1 : -1;
  let timeoutId: NodeJS.Timeout;

  const typeText = () => {
    if (isBackspacing) {
      if (i >=0) {
        setText((prevText) => prevText.slice(0, -1));
        i--;
        timeoutId = setTimeout(typeText, 150);
      } else {
        setIsBackspacing(false);
        setGreetingIndex((prevIndex) => {
          let newIndex;
          do {
            newIndex = Math.floor(Math.random() * greetings.length);
          } while (newIndex === prevIndex);
          return newIndex;
        });
      }
    } else {
      if (i < currentGreeting.length-1) {
        i++;
        setText((prevText) => prevText + currentGreeting[i]);
        
        console.log(i);
        timeoutId = setTimeout(typeText, 90); // Adjust speed as needed
      } else {
        
        timeoutId = setTimeout(() => setIsBackspacing(true), 2000); // Start backspacing after a 2 second pause
      }

    }
  };

  typeText();

  return () => {

      clearTimeout(timeoutId);
  };

}, [greetingIndex]);

return (
  
  <View style={StyleSheet.absoluteFillObject}>
    <MapScreen
      coordinates={coordinates}
      pickup={pickup}
      dropoff={dropoff}
      onReady={(result: { distance: React.SetStateAction<null>; duration: React.SetStateAction<number>; }) => {
        setDistance(result.distance);
        setDuration(result.duration);
      }}
       />

    <Animated.View style={[styles.bottomContainer, { transform: [{ translateY: verticalAnim }] }]}>
      <TouchableOpacity onPress={animateContainer}>
        <Text style={styles.bottomContainerText}>{text}</Text>
      </TouchableOpacity>
      <View style={styles.searchcontainer}>
        <GooglePlacesAutocomplete
          textInputProps={{ 
            onFocus: () => setIsFirstAutocompletevisible(true),
            onBlur: () => {
              setIsFirstAutocompletevisible(false);
              setIsFirstSearchFocused(false);
            },

            onChangeText: (text) => {setIsFocused(!!text);
              if (text.length > 0) {
                setIsFirstAutocompletevisible(true);
              } else {
                setIsFirstAutocompletevisible(false);
              }
            }}
            }
          placeholder="Pickup Location?"
          fetchDetails={true}
  

          onPress={(data, details = null) => {
            setPickup(data.description);
  
    
          }}
          query={{
            key: 'AIzaSyB-RG5dQfj60YTARN4ZolI0q9VZIzQ92Po',
            language: 'en',
          }}
          styles={{
            textInputContainer: {
              width: '90%',
              alignSelf: 'center',
              paddingBottom: 5,
              backgroundColor: 'white', // Set the background color to white
              borderRadius: 5, // Add some border radius
              borderWidth: 2, // Add some border width
              borderColor: 'gray', // Set the border color to light grey
              height: 50,
              
            },
            textInput: {
              color: 'black',
              fontSize: 16,
              paddingLeft: 10, // Add some padding to the left
            },
            listView: {
              
              borderColor: '#ddd', // Set the border color to light grey
              zIndex: 1,
              position: 'absolute', // Set the position to absolute
              marginTop: 120, // Position it at the bottom of the page
            },
            description: {
              color: 'black', // Set the text color to black
            },
            predefinedPlacesDescription: {
              color: 'blue', // Set the text color to blue
              top: 50,
            },
        
          }}

        />
        
       
        <GooglePlacesAutocomplete
   textInputProps={{ 
    onFocus: () => {
      setIsAutocompleteVisible(true);
      
    },
    onBlur: () => {
      setIsAutocompleteVisible(false);
      setIsSecondSearchFocused(false);
    },
    onChangeText: (text) => {setIsFocused(!!text);
      if (text.length > 0) {
        setIsAutocompleteVisible(true);
      } else {
        setIsAutocompleteVisible(false);
      }
    }
    }}

    placeholder="Where to?"
    fetchDetails={true}
    
    onPress={(data, details = null) => {
      setDropoff(data.description);
      if (isUp != true) {
      animateContainer();
    }
    }}
      query={{
        key: 'AIzaSyB-RG5dQfj60YTARN4ZolI0q9VZIzQ92Po',
        language: 'en',
      }}
  
      styles={{
        textInputContainer: {
          flex: null,
          height: 50,
          width: '90%',
          alignSelf: 'center',
          backgroundColor: 'white', // Set the background color to white
          borderRadius: 5, // Add some border radius
          borderWidth: 2, // Add some border width
          borderColor: 'gray', // Set the border color to light grey
          zIndex: 3, // Set the position to absolute
        },
        textInput: {
          color: '#5d5d5d',
          fontSize: 16,
        },
        listView: {
       // Set the background color to white
       postion: 'absolute',
         marginTop: 60,
          borderColor: '#ddd', // Set the border color to light grey
          position: 'absolute', // Set the position to absolute // Position it at the bottom of the page
          width: '100%', // Make it span the full width of the page
          height: 400, // Set the height of the list view
          
        },
        description: {
          color: 'black', // Set the text color to black
        },
        predefinedPlacesDescription: {
          color: 'blue', // Set the text color to blue
        },
    
      }}
  
  />


      
</View>

<View style={styles.buttonContainer}>
  <TouchableOpacity style={styles.gobutton2} onPress={() => { /* handle go action */ }}>
    <Text style={styles.gobutton}>Go</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.gobutton2} onPress={() => { /* handle cancel action */ }}>
    <Text style={styles.gobutton}>Cancel</Text>
  </TouchableOpacity>
</View>
 

{ (!isfirsAutocompletevisible && !isAutocompleteVisible) && (
  <ScrollView style={styles.mapcontainer}>
    {pastRides.map((ride, index) => (
      <React.Fragment key={ride.id}>
        <TouchableOpacity style={styles.MapRideItem}>
          <Text>{ride.destination}</Text>
          <Text>{ride.fare}</Text>
        </TouchableOpacity>
        {index < pastRides.length - 1 && <View style={styles.divider} />}
      </React.Fragment>
    ))}
  </ScrollView>
)}

</Animated.View>

</View>

);
};
 

const AccountScreen = () => {
  const [currentScreen, setCurrentScreen] = useState('Help');

  return (
    <View style={styles.accountContainer}>
      <View style={styles.profileHeader}>
      <Text style={styles.userName}>{currentScreen}</Text>
      </View>
      <View style={styles.menuOptions}>
        <TouchableOpacity style={styles.menuButton} onPress={() => setCurrentScreen('Help')}>
          <Icon name="help-circle-outline" size={20} color="black" />
          <Text style={styles.menuText}>Help</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={() => setCurrentScreen('Wallet')}>
          <Icon name="wallet-outline" size={20} color="black" />
          <Text style={styles.menuText}>Wallet</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={() => setCurrentScreen('Activity')}>
          <Icon name="list-outline" size={20} color="black" />
          <Text style={styles.menuText}>Activity</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.AccountOutput}>
      {currentScreen === 'Help' && <HelpScreen />}
      {currentScreen === 'Wallet' && <WalletScreen />}
      {currentScreen === 'Activity' && <ActivityScreen />}
      </View>
    </View>
   
  );
  
};
const InfoBox = ({ pickup, dropoff, time, distance }) => {
  return (
    <View style={styles.MapBottom}>
      <Text>Pickup: {pickup}</Text>
      <Text>Dropoff: {dropoff}</Text>
      <Text>Time: {time}</Text>
      <Text>Distance: {distance}</Text>
    </View>
  );
};

const WalletScreen = () => {
  return (
    <ScrollView style={styles.walletscroll}>
    <View style={styles.container2}>
      <Text style={styles.description}>
        Runna employs blockchain technology to reduce service and transaction costs. Keeping the price of ride low the rider and paying the driver maximum amount.
      </Text>

      <Text style={styles.subHeader}>Why Blockchain?</Text>
      <Text style={styles.listItem}>1. Decentralized smart contracts{"\n"}Less service charges and ride expenses</Text>
      <Text style={styles.listItem}>2. Direct Payments{"\n"}Riders know exactly where their money is going</Text>
      <Text style={styles.listItem}>3. Transparency and Trust{"\n"}Drivers can earn a livable wage.</Text>
      <Text style={styles.description2}>
        Below we offer multiple ways to transfer money and use our blockchain technology. Please select one of the options below to get started!
      </Text>
      <View style={styles.paymentMethods}>
  <TouchableOpacity style={styles.paymentButton}>
    <Image
      source={require('./VENMO_LOGO.png')} // Replace with your actual image path
      style={styles.venmoimage} // Add this style if needed
    />
  </TouchableOpacity>
  <TouchableOpacity style={styles.paymentButton}>
    <Image
      source={require('./APPLE_PAY.png')} // Replace with your actual image path
      style={styles.appleimage}
    />
  </TouchableOpacity>
  <TouchableOpacity style={styles.paymentButton}>
    <Image
      source={require('./ZELLE_LOGO.png')} // Replace with your actual image path
      style={styles.zelleimage} // Add this style if needed
    />
  </TouchableOpacity>
</View>
      <View style={styles.balanceSection}>
        <Text style={styles.balanceText}>Ethereum Balance:</Text>
        <Text style={styles.balanceValue}>$46.76</Text>
      </View>
      <View style={styles.autoReload}>
        <Text style={styles.autoReloadText}>Auto Reload:</Text>
        
      </View>
    </View>
    </ScrollView>

  );
};

const HelpScreen = () => {
  return (
    <ScrollView style={styles.helpscroll}>
      <Text style={styles.description}>
        At Runna, our mission is to enhance connectivity between riders and drivers,
        reducing unnecessary expenses. To achieve this, we have assembled a
        dedicated team of necessary personnel. When you contact our office by
        phone, a sophisticated AI assistant will greet you, designed to efficiently
        address your queries and streamline your experience.
      </Text>
      <Text style={styles.description}>
        Should you prefer to communicate with a human representative, please
        direct your emails to the address provided below. One of our attentive staff
        members will respond within three to five business days.
      </Text>
      <Text style={styles.description}>
        For any assistance, our support channels are always available. Do not
        hesitate to reach out to us at any time using the contact information below.
        We are committed to ensuring that your experience with Runna is both
        effective and satisfying.
      </Text>
      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="Name" />
        <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />
        <TextInput style={styles.input} placeholder="Enter question or feedback" multiline />
        <TouchableOpacity style={styles.submitbutton}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const ActivityScreen = () => {
  // Define past rides data inside the component
  const pastRides = [
    { id: 1, destination: "Central Park", fare: "$15.20", date: "04/10/2024" },
    { id: 2, destination: "Times Square", fare: "$12.50", date: "04/08/2024" },
    { id: 3, destination: "Empire State Building", fare: "$18.75", date: "04/07/2024" },
    { id: 4, destination: "Statue of Liberty", fare: "$20.30", date: "04/05/2024" },
    { id: 5, destination: "Brooklyn Bridge", fare: "$14.50", date: "04/03/2024" },
    { id: 6, destination: "Wall Street", fare: "$16.00", date: "03/31/2024" },
    { id: 7, destination: "Metropolitan Museum of Art", fare: "$19.90", date: "03/29/2024" },
    { id: 8, destination: "Madison Square Garden", fare: "$13.65", date: "03/25/2024" },
    { id: 9, destination: "Yankee Stadium", fare: "$18.00", date: "03/20/2024" },
    { id: 10, destination: "Coney Island", fare: "$22.25", date: "03/18/2024" }
];


  // Render the component
  return (
    <View style={styles.container}>
      <ScrollView style={styles.activityscroll}>
        {pastRides.map(ride => (
          <View key={ride.id} style={styles.rideItem}>
            <View>
              <Text style={styles.destination}>{ride.destination}</Text>
              <Text style={styles.fare}>{ride.fare}</Text>
            </View>
            <Text style={styles.activitydate}>{ride.date}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
const App = () => {
  const [currentScreen, setCurrentScreen] = useState('Home');
  const [selectedPlace, setSelectedPlace] = useState(null);


  const renderScreen = () => {
    switch (currentScreen) {
      case 'Map': return <MapScreen coordinates={coordinates} pickup={'LAX'} dropoff={'UCLA'} OnReady={null} />;
      case 'Account': return <AccountScreen />;
      case 'Wallet': return <WalletScreen />;
      case 'Help': return <HelpScreen/>;
      case 'Activity': return <ActivityScreen/>;
      default: return <HomeMapScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LogoContainer />
      {renderScreen()}
      <NavContainer setCurrentScreen={setCurrentScreen} />
    </SafeAreaView>
  );
};
  
export default App;


function setGreetingIndex(arg0: number) {
  const [greetingIndex, setGreetingIndex2] = useState(0);

  setGreetingIndex2((prevIndex) => (prevIndex + 1) % greetings.length);
}

