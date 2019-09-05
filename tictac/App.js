import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Button, Alert,ImageBackground, } from 'react-native';
// import SweetAlert from 'react-native-sweet-alert';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],

      currentPlayer: 1

    }

  }
  componentDidMount() {
    this.initializerGame();
  }
  initializerGame = () => {
    this.setState({
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ]

    });


  }
  tieGame =(arr)=>{
   
    // check que ninguno de los espaciones esta vacio
      for(let i=0; i<3; i++){
        for(let j=0; j<3; j++){
            // uno de los espacios esta vacio
            if(arr[i][j] == 0){
                return false;   
            }   
        }   
    }
    return true;
  
  
  }
  onTilePress(row, col) {
    // no dejar que cambie el icono despues de apretado
    let value = this.state.gameState[row][col];
    if (value !== 0) { return; }


    // guada el icono recurrente
    let currentPlayer = this.state.currentPlayer;

    //seleccionando  icono cuando aprete
    let arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({ gameState: arr });
    //cambiar al otro jugador
    let nextPlayer = (currentPlayer === 1) ? -1 : 1;
    this.setState({ currentPlayer: nextPlayer });

    //alert del ganadore

    let winner = this.getWinner();
    if (winner === 1) { Alert.alert("Batichica vence con el poder de la noche"); this.initializerGame();}

    else if (winner === -1) { Alert.alert("Joker ríe nuevamente"); this.initializerGame(); }
    else if (winner == 0){
      let tieGame=this.tieGame(arr);
      if( tieGame){
        Alert.alert(
          'Empate',
         'se volveran a encontrar',
         
        );
      }}

  }
  getWinner() {

    const NUM_TILES = 3;
    let arr = this.state.gameState;
    let sum;
    //iteramos las row

    for (let i = 0; i < NUM_TILES; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum === 3) { return 1; }
      else if (sum === -3) { return -1; }
    }
    //iteramos col
    for (let i = 0; i < NUM_TILES; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum === 3) { return 1; }
      else if (sum === -3) { return -1; }
    }
    //revisamos diagonales
    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if (sum === 3) { return 1; }
    else if (sum === -3) { return -1; }

    sum = arr[2][0] + arr[1][1] + arr[0][2];
    if (sum === 3) { return 1; }
    else if (sum === -3) { return -1; }

    return 0;

  }



  renderIcon = (row, col) => {
    let value = this.state.gameState[row][col];
    switch (value) {
      case 1: return <Image source={require('./img/batgirl.jpeg')} style={styles.img} />;
      case -1: return <Image source={require('./img/huason.jpeg')} style={styles.img} />;
      default: return <View />;
    }



  }

  newGAmePress = () => {
    this.initializerGame();
  }



  render() {
    return (
      <ImageBackground source={require('./img/gotham3.jpg')}  style={styles.backgroundImage}>
      <View style={styles.container}>
        
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => this.onTilePress(0, 0)} style={[styles.title, { borderLeftWidth: 0, borderTopWidth: 0 }]} >
            {this.renderIcon(0, 0)}

          </TouchableOpacity >
          <TouchableOpacity onPress={() => this.onTilePress(0, 1)} style={[styles.title, { borderTopWidth: 0 }]}>
            {this.renderIcon(0, 1)}
          </TouchableOpacity >

          <TouchableOpacity onPress={() => this.onTilePress(0, 2)} style={[styles.title, { borderTopWidth: 0, borderRightWidth: 0 }]} >
            {this.renderIcon(0, 2)}

          </TouchableOpacity >

        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => this.onTilePress(1, 0)} style={[styles.title, { borderLeftWidth: 0 }]} >
            {this.renderIcon(1, 0)}
          </TouchableOpacity >
          <TouchableOpacity onPress={() => this.onTilePress(1, 1)} style={[styles.title,]} >
            {this.renderIcon(1, 1)}
          </TouchableOpacity >
          <TouchableOpacity onPress={() => this.onTilePress(1, 2)} style={[styles.title, { borderRightWidth: 0 }]} >

            {this.renderIcon(1, 2)}

          </TouchableOpacity >
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => this.onTilePress(2, 0)} style={[styles.title, { borderBottomWidth: 0, borderLeftWidth: 0 }]} >
            {this.renderIcon(2, 0)}
          </TouchableOpacity >
          <TouchableOpacity onPress={() => this.onTilePress(2, 1)} style={[styles.title, { borderBottomWidth: 0 }]} >
            {this.renderIcon(2, 1)}
          </TouchableOpacity >
          <TouchableOpacity onPress={() => this.onTilePress(2, 2)} style={[styles.title, { borderBottomWidth: 0, borderRightWidth: 0 }]} >
            {this.renderIcon(2, 2)}
          </TouchableOpacity >

        </View>
        <View style={styles.boton} >
          <Button title="Nueva pelea"size={15}
      color="#602080" onPress={this.newGAmePress} />
        </View>

      </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    borderWidth: 8,
    width: 100,
    height: 100,
   borderColor:'#b030b0'
  },
  img: {
    width: 80,
    height: 80,

  },
  boton: {
    paddingTop: 68,
    // backgroundColor:'#602080'

  },
  backgroundImage: {
    flex: 1,
    resizeMode:'contain', 
  }

});
