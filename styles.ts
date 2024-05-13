import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    
  },
  recents:{

  },
  searchcontainer: {
  
    width: '100%',
    backgroundColor: 'white', 
    height: 120,
    zIndex: 1,

  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    width: '75%',
    alignSelf: 'center',
    padding: 5,


  },


  gobutton2: { 
    fontWeight: 'bold',
    width: 100,
textAlign: 'center',
color: 'black',
backgroundColor: '#f0f0f0',
padding: 10,
borderRadius: 10,

  },
  gobutton: { 
    fontWeight: 'bold',

textAlign: 'center',

color: 'black',
backgroundColor: '#f0f0f0',

borderRadius: 20,

  },

  searchcontainer2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'black',
  },

  header: {
    alignItems: 'center',
    marginBottom: 20,
  },

  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  listContainer: {

width: '100%',
alignSelf: 'center',
  },
  listcontainer2: {
    top: -40,
    width: '90%',
    alignSelf: 'center',
    height: 200,
  },
  title: {

    fontSize: 24, // Make the text big
    fontWeight: 'bold', // Make the text bold
    padding: 10, // Add some padding
    
  },
  mapcontainer :{ 
    marginTop: 20,
      height: 400,
      marginBottom: 0,
      paddingBottom: 80,
  },

      appleimage : {
        width: 150,
        height: 100,
        resizeMode: 'contain',
      },
      zelleimage : {
        width: 110,
        height: 100,
        resizeMode: 'contain',
      },
      venmoimage : {
        width: 60,
        height: 100,
        resizeMode: 'contain',
      },

  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
  },
  listItem: {
    fontSize: 16,
    marginBottom: 10
  ,
  },
  helpscroll:{
    marginBottom: 100,
    paddingBottom: 60,
    padding: 20,
  },
  activityscroll: {
    marginBottom: 100,
  },
  paymentMethods: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
   width : '90%',
   marginBottom : 20,
   backgroundColor: '#f0f0f0',
   height: 90,
   borderRadius: 20,
    

  },
  outputText: {
    fontSize: 16,
    fontWeight: 'normal',
    left : -68,  
  },
 
  paymentText: {
    fontSize: 16,
  },
  balanceSection: {
    marginTop: 20,
    marginBottom: 10,
  },
  balanceText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  balanceValue: {
    fontSize: 18,
    color: 'green',
  },
  autoReload: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 50,
  },
  autoReloadText: {
    fontSize: 18,
  },
  walletscroll: {
    marginBottom: 100,
  },

    fullScreen: {
      flex: 1,

    },
    TimeText : {
      fontWeight: 'bold',
      fontSize: 24,
      marginBottom: 10,

    },
    DistanceText : {
      fontWeight: 'bold',
      fontSize: 24,
    },
    MapBottom: {
      position: 'absolute',
      bottom: 200, // Adjust this value as needed
      backgroundColor: 'white',
      width: '100%',

      shadowColor: '#000',
      padding :30, 
   
    },
    
    MapRideItem: {
      flexDirection: 'row', // Display the location and price on one line
      justifyContent: 'space-between', // Add space between the location and price
      padding: 12, // Add some padding
      

      paddingTop: 15,
    },
    divider: {
      height: 1, // Make the divider one pixel high
      backgroundColor: '#f0f0f0', // Change the color to black
    },
    topContainer: {
      position: 'absolute',
      top: 0,
      height: 50, // adjust as needed
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2, // ensure the container is above the map
    },
    bottomContainer: {
      position: 'absolute',
      bottom: 60,
      height: 550,
      width: '100%',
      backgroundColor: 'white', // adjust as needed
      borderRadius: 30, // add border radius
      borderWidth: 2, // add border
      shadowRadius: 5, // add shadow
      shadowOpacity: 0.3, // add shadow
      borderColor: '#f0f0f0', // add border color
      borderBottomLeftRadius: 0, // adjust as needed
      borderBottomRightRadius: 0, // adjust as needed
    },
    bottomContainerText: {
      fontSize: 30,
      left: 20,
      fontWeight: 'bold',
      marginBottom: 30,
      marginTop: 30,
      width: '100%',
 
      
    
    },
  
    container2: {
      top: 10,
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
    },

    map: {
        flex: 1,
        ...StyleSheet.absoluteFillObject,
      
    },
    overlay: {
        position: 'absolute',
        top: 50,
        padding: 20,
        width: '75%',
        flex : 0.1,
    },
    searchInput: {
        backgroundColor: 'white',
        bottom: 0,
        borderRadius: 8,
        fontSize: 16,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        width : '100%',
        marginBottom: 0,
      
    },
    addressContainer: {

        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    addressButton: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 8,
    },
    addressText: {
        fontWeight: 'bold',
        fontSize: 16,
    },

    addressSubText: {
        fontSize: 14,
    },
    
        logoContainer: {
          position: 'absolute',
          top: 0,
          height: 100, // adjust as needed
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2, // ensure the container is above the map
        },
      

  
    navButton: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1, 
    },
    navText: {
        marginTop: 5,
        color: 'black',
        fontSize: 16,
    },
    accountContainer: {
        flex: 1,
        padding: 0,
        top:40,

    },
    username: {
      left: 0,
      marginBottom: 0,
    },
        AccountOutput: {
        flex: 1,
        height: 100,
    
  
    },
    profileHeader: {
      flexDirection: 'row',
      justifyContent: 'left', // align items to the right
      alignContent: 'left', 
      left : 20,
      marginBottom: 40,
    },
    userName: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'right', // align text to the right
  },
    menuOptions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    menuButton: {
        padding: 10,
        flexDirection: 'column', // stack items vertically
      alignItems: 'center', // center items horizontally
      borderRadius: 10,
      backgroundColor: '#f0f0f0',
      width: 100,
      height: 60 ,
    },
    menuText: {
        fontSize: 16,
    },
  car: {
    width: 10,
    height: 10,
    resizeMode: 'contain',
  },
  

    mapinput: {
        backgroundColor: 'lightgray',
        padding: 4,
        fontSize: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
        width: '75%',
        zIndex: 1,
       

   
    },

    mapinput2: {
    
    },

    TextInput: {
      width: '50%',
    },

    inputContainer: {
        marginTop: 20,
        alignContent: 'center', 
       
       
    },
    paymentContainer: {
        marginTop: 20,
    },
    paymentText: {
        fontSize: 16,
        marginBottom: 10,
    },
  
    paymentButton: {
      width: 100, // fixed width
      height: 50, // fixed height
      padding: 10,
    
      borderRadius: 10,
      margin: 10, // equal spacing
      justifyContent: 'center', // align items vertically
      alignItems : 'center'
     
    },
    logo: {
        width: 120,
        height: 120,
        right: 0,
        top : 40,
        position: 'absolute',
    },

    bottomNav: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        borderTopWidth: 2,
        borderTopColor: 'black',
        backgroundColor: 'white',
        zIndex: 1,
        height: 100,
    },

     activitydate : {
      fontSize: 12,
      color: 'gray',
    },
  

      walletheader: {
        
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center', // Center the header text
      },

      rideItem: {
        backgroundColor: '#f0f0f0', // Light gray background for each item
        borderRadius: 10,
        padding: 15,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',

      },
      destination: {
        fontSize: 16,
        fontWeight: 'bold',
      },

      mapdestination: {
        fontSize: 16,
        fontWeight: 'normal',
        width: '75%', 
        color : 'gray',
      },

      fare: {
        fontSize: 16,
        color: 'green', // Color for the fare to make it stand out
      },

      mapfare : {
        fontSize: 16,
        color: 'gray'
      },

    container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },

  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description2: {
    fontSize: 16,
    marginBottom: 30,
    lineHeight: 24,
  },
  form: {
    marginTop: 20,

  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  walletdescription: {
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 24,
  },
  form: {
    marginTop: 20,
    padding: 10, 
    borderWidth: 1,
    borderRadius: 10,
    bordercolor: 'black',
  },
    input:  {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
    fontSize: 15,
   
  },
    submitbutton: {
    backgroundColor: 'gray',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  });