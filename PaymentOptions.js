//This is an example code to Scan QR code//
import React, { Component } from 'react';
//import react in our code.
import { Text, View, TouchableHighlight, StyleSheet,BackAndroid} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';


export default class ProductOptions extends Component {
    state = {
        data: [
          {
            label: 'Paypal',
            size: 32,
          },
          {
            label: 'Net Banking',
            size: 32,
           },
           {
            label: 'Debit Card',
            size: 32,
           },
           {
            label: 'Credit Card',
            size: 32,
           }
        ],
        payment:false
      };
    
      // update state
      onPress = data => this.setState({ data });
      paymentOptions(){
            this.setState({
                payment:true
            });
       }
       paymentClose(){
        BackAndroid.exitApp();
       }
      render() {
        let selectedButton = this.state.data.find(e => e.selected == true);
        selectedButton = selectedButton ? selectedButton.value : this.state.data[0].label;
        return (
          <View style={styles.container}>
          {this.state.payment? 
          <View style={styles.container}>
            <Text style={{ fontSize: 18,fontWeight:'bold', marginBottom: 20,marginTop: 50 }}>
                    Order Sucessfully Placed
            </Text> 
             <Text style={{ fontSize: 18,fontWeight:'bold', marginBottom: 20,marginTop: 50 }}>
                Your Order id : {`AUZ000000${Math.floor((Math.random() * 10) + 1)}`}
            </Text> 
            <TouchableHighlight
              onPress={() => this.props.navigateFirst()}
              style={styles.button}>
                <Text style={{ color: '#FFFFFF', fontSize: 12 }}>
                    Close
                </Text>
            </TouchableHighlight> 
          </View>  
          
          :
          <View>
            <Text style={{ fontSize: 18,fontWeight:'bold', marginBottom: 20,marginTop: 50 }}>
                Product Info
            </Text>
            <Text style={{ fontSize: 16, marginBottom: 20,marginTop: 20 }}>{this.props.productInfo.name} : ${this.props.productInfo.price}</Text>
            <Text style={{ fontSize: 16, fontWeight:'bold',  marginBottom: 20,marginTop: 20 }}>Total : ${this.props.productInfo.price}</Text>
                        
            <Text style={{ fontSize: 18, marginBottom: 20,marginTop: 50 }}>
            Choose your Payment Options
            </Text>
            <RadioGroup radioButtons={this.state.data} onPress={this.onPress} />
            <TouchableHighlight
              onPress={() => this.paymentOptions()}
              style={styles.button}>
                <Text style={{ color: '#FFFFFF', fontSize: 12 }}>
                    Proceed Your Payment
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