//This is an example code to Scan QR code//
import React, { Component } from 'react';
//import react in our code.
import { Text, View, Linking,Image, Button, TouchableHighlight, FlatList, PermissionsAndroid, Platform, StyleSheet} from 'react-native';
import PaymentOptions from './PaymentOptions.js'


export default class ProductDisplay extends Component {
  constructor() {
    super();
     this.state = {
         payment:false
    };
  }
  paymentOptions(){
      this.setState({
          payment:true
      });
  }

  render() {
     
      return (
        <View style={styles.container}>
        {this.state.payment ?
            <PaymentOptions productInfo = {this.props.productInfo} navigateFirst={this.props.navigateFirst} />
        : 
        <View style={styles.container}> 
        <Text style={styles.title}>{this.props.productInfo.name}</Text>
        <Image
          style={styles.stretch}
          source={{uri: this.props.productInfo.img}}
        />
        <Text style={styles.simpleText} >No of quantity : {this.props.productInfo.quantity}</Text>
        <Text style={styles.productDesc}>{this.props.productInfo.description}</Text>
        <TouchableHighlight
              onPress={() => this.paymentOptions()}
              style={styles.button}>
                <Text style={{ color: '#FFFFFF', fontSize: 12 }}>
                Place Your Order
                </Text>
            </TouchableHighlight> 
        </View>         
        }
        
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