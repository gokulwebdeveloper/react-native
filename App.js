//This is an example code to Scan QR code//
import React, { Component } from 'react';
//import react in our code.
import { Text, View, Linking,Image, Button, TouchableHighlight, FlatList, PermissionsAndroid, Platform, StyleSheet} from 'react-native';
// import all basic components
import { CameraKitCameraScreen, } from 'react-native-camera-kit';
import ProductDisplay from './ProductDisplay.js'

//import CameraKitCameraScreen we are going to use.


export default class App extends Component {
  constructor() {
    super();
     this.state = {
      //variable to hold the qr value
      qrvalue: '',
      opneScanner: false,
    };
    this.navigateFirst = this.navigateFirst.bind(this);
  }
  onOpenlink() {
    //Function to open URL, If scanned 
    Linking.openURL(this.state.qrvalue);
    //Linking used to open the URL in any browser that you have installed
  }
  onBarcodeScan(qrvalue) {
    //called after te successful scanning of QRCode/Barcode
    this.setState({ qrvalue: qrvalue });
    this.setState({ opneScanner: false });
  }
  navigateFirst() {    
    this.setState({
      qrvalue: '',
      opneScanner: false
    });
  }
  onOpneScanner() {
    var that =this;
    //To Start Scanning
    if(Platform.OS === 'android'){
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,{
              'title': 'CameraExample App Camera Permission',
              'message': 'CameraExample App needs access to your camera '
            }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //If CAMERA Permission is granted
            that.setState({ qrvalue: '' });
            that.setState({ opneScanner: true });
          } else {
            alert("CAMERA permission denied");
          }
        } catch (err) {
          alert("Camera permission err",err);
          console.warn(err);
        }
      }
      //Calling the camera permission function
      requestCameraPermission();
    }else{
      that.setState({ qrvalue: '' });
      that.setState({ opneScanner: true });
    }    
  }

 

  render() {
    let displayModal;
    const tableView = this.state.qrvalue;
    //If qrvalue is set then return this view
    if (!this.state.opneScanner) {
      return (
        <View style={styles.container}>
          <View style={styles.logoBg}>
            <Text style={styles.logoText}>AutoZone for the pro</Text>
          </View>
        <View style={styles.container}>
        {tableView ?
         <View style={styles.container}>
        <FlatList
        data={JSON.parse(tableView)}
        renderItem={({ item }) => <ProductDisplay productInfo={item} navigateFirst={this.navigateFirst}  />}
        keyExtractor={item => item.name}
      />
      </View>  
      :  
      <View style={styles.container}>
      <Text style={styles.heading}>Autozone Product QR Codes </Text>
            <TouchableHighlight
              onPress={() => this.onOpneScanner()}
              style={styles.button}>
                <Text style={{ color: '#FFFFFF', fontSize: 12 }}>
                Open QR Scanners
                </Text>
            </TouchableHighlight>
        </View>    
        }
        </View>
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <CameraKitCameraScreen
          showFrame={false}
          //Show/hide scan frame
          scanBarcode={true}
          //Can restrict for the QR Code only
          laserColor={'blue'}
          //Color can be of your choice
          frameColor={'yellow'}
          //If frame is visible then frame color
          colorForScannerFrame={'black'}
          //Scanner Frame color
          onReadCode={event =>
            this.onBarcodeScan(event.nativeEvent.codeStringValue)
          }
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'white'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 10,
    width:300,
    marginTop:16
  },
  heading: { 
    color: 'black', 
    fontSize: 24, 
    alignSelf: 'center', 
    padding: 10, 
    marginTop: 30 
  },
  title: { 
    color: 'black', 
    fontSize: 25, 
    fontWeight: 'bold',
    alignSelf: 'center', 
    padding: 20, 
    marginTop: 16,
    textTransform:'capitalize'
  },
  simpleText: { 
    color: 'black', 
    fontSize: 20, 
    fontWeight: 'bold',
    alignSelf: 'center', 
    padding: 10, 
    marginTop: 10,
    textTransform:'capitalize'
  },
  productDesc: { 
    color: 'black', 
    fontSize: 14, 
    fontWeight: 'normal',
    alignSelf:'flex-start', 
    padding: 15, 
    textAlign:'justify',
    marginTop: 5,
    textTransform:'capitalize'
  },
  item: {
    backgroundColor: '#f9c2ff',
  },
  stretch: {
    width: 250,
    height: 250,
    resizeMode: 'stretch'
  },
  logoText: {
   color:'red',
   fontSize:18,
   fontWeight:'bold',
   textAlign:"center"
 },
 logoBg:{
   padding:20,
   backgroundColor:'#000',
   width:400,
   textAlign:"center",
 }
});