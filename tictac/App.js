import React,{Component} from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native';

export default class App extends Component {
  constructor(props){
    super(props);

    this.state={
      gameState:[
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ],

      currentPlayer:1

    }
   
  }
  componentDidMount(){
    this.initializerGame();
  }

   initializerGame = () =>{
     this.setState ({ gameState: [
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ]

     })

   
   }
   renderIcon =(row, col) =>{
     let value= this.state.gameState [row][col];
     switch(value){
       case 1: return <Image source={require('./img/batgirl.jpeg')} style={styles.img}/>;
       case -1: return  <Image source={require('./img/huason.jpeg')} style={styles.img}/>;
       default: return <View/>;
     }



   }
   onTilePress(row,col){
    // no dejar que cambie el icono despues de apretado
    let value=this.state.gameState[row][col];
    if (value !== 0) {return;}


    // guada el icono recurrente
    let currentPlayer= this.state.currentPlayer;

    //seleccionando  icono cuando aprete
    let arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({gameState:arr});
    //cambiar al otro jugador
    let nextPlayer=(currentPlayer === 1)? -1 : 1;
    this.setState({currentPlayer:nextPlayer});


   }


  
  render(){
  return (
    <View style={styles.container}>

      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={()=> this.onTilePress(0,0)} style={[styles.title, { borderLeftWidth: 0, borderTopWidth: 0 }]} >
           {this.renderIcon(0,0)} 

        </TouchableOpacity >
        <TouchableOpacity onPress={()=> this.onTilePress(0,1)} style={[styles.title, { borderTopWidth: 0 }]}>
        {this.renderIcon(0,1)} 
        </TouchableOpacity >

        <TouchableOpacity onPress={()=> this.onTilePress(0,2)} style={[styles.title, { borderTopWidth: 0, borderRightWidth: 0 }]} >
        {this.renderIcon(0,2)}

        </TouchableOpacity >

      </View>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity  onPress={()=> this.onTilePress(1,0)} style={[styles.title, { borderLeftWidth: 0 }]} >
        {this.renderIcon(1,0)} 
        </TouchableOpacity >
        <TouchableOpacity onPress={()=> this.onTilePress(1,1)} style={[styles.title,]} >
        {this.renderIcon(1,1)}
        </TouchableOpacity >
        <TouchableOpacity onPress={()=> this.onTilePress(1,2)} style={[styles.title, { borderRightWidth: 0 }]} >
          
        {this.renderIcon(1,2)}
        
      </TouchableOpacity >
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity  onPress={()=> this.onTilePress(2,0)} style={[styles.title, { borderBottomWidth: 0, borderLeftWidth: 0 }]} >
        {this.renderIcon(2,0)} 
        </TouchableOpacity >
        <TouchableOpacity onPress={()=> this.onTilePress(2,1)} style={[styles.title, { borderBottomWidth: 0 }]} >
        {this.renderIcon(2,1)} 
        </TouchableOpacity >
        <TouchableOpacity  onPress={()=> this.onTilePress(2,2)} style={[styles.title, { borderBottomWidth: 0, borderRightWidth: 0 }]} >
        {this.renderIcon(2,2)} 
        </TouchableOpacity >

      </View>
    

    </View>
  );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    borderWidth: 8,
    width: 100,
    height: 100,
  },
  img: {
    width:80,
    height:80,

  }

});
