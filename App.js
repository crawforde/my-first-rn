import React from 'react';
import { ListView, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
var _ = require('underscore');


export default class App extends React.Component {
  constructor(){
    super();
    var dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => (r1 != r2)
    });
    var data = ['Loading...'];
    this.state = {
      data: data,
      dataSource: dataSource.cloneWithRows(data)
    };
  }

  componentDidMount(){
    fetch('https://horizons-json-cors.s3.amazonaws.com/products.json')
    .then((resp)=>{
      return resp.json();
    })
    .then((json)=>{
      return Promise.all(json.map((item)=>(fetch(item.url))));
    })
    .then((responses)=>{
      return Promise.all(responses.map((resp)=>resp.json()));
    })
    .then((items)=>{
      const list = items.map((item)=>(item.name + ': ' + item.priceCents));
      this.setState({
        data: list,
        dataSource: this.state.dataSource.cloneWithRows(list)
      });
    })
    .catch((error)=>{
      alert('Error: ' + error);
    })
  }

  render() {
    return (
      <View style={{
        flex: 1,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <ListView
          renderRow={(item,sectionID,rowID)=>(
            <View key={rowID} style={{
              alignItems: 'center'
            }}>
              <Text style={{
                fontSize: 10
              }}>
                {item}
              </Text>
            </View>
          )}
          dataSource={this.state.dataSource}
        />
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
});





// NUMBER WITH + AND - BUTTONS TO CHANGE IT ///////////////////////////////////
/*
export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      number: 0
    }
  }

  up(){
    this.setState({
      number: this.state.number + 1
    });
  }

  down(){
    this.setState({
      number: this.state.number - 1
    });
  }

  render() {
    console.log('hello');
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'purple'
      }}>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{
            fontSize: 50
          }}>
            {this.state.number}
          </Text>
        </View>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <TouchableOpacity onPress={()=>(this.up())} style={{
            backgroundColor: 'gray',
            height: 50,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 5
          }}>
            <Text>
              +
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>(this.down())} style={{
            backgroundColor: 'gray',
            height: 50,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 5
          }}>
            <Text>
              -
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
*/


// ADDING AND REMOVING NUMBERS FROM A LIST WITH BUTTONS /////////////////////

/*

export default class App extends React.Component {
  constructor(){
    super();
    var dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => (r1 != r2)
    });
    var data = _.range(10);
    this.state = {
      data: data,
      dataSource: dataSource.cloneWithRows(data)
    };
  }

  add(){
    var newData = this.state.data.slice();
    newData.push(this.state.data.length);
    this.setState({
      data: newData,
      dataSource: this.state.dataSource.cloneWithRows(newData)
    });
  }

  remove(){
    var newData = this.state.data.slice();
    newData.pop();
    this.setState({
      data: newData,
      dataSource: this.state.dataSource.cloneWithRows(newData)
    });
  }

  render() {
    return (
      <View style={{
        flex: 1,
        marginTop: 20,
        alignItems: 'center'
      }}>
        <TouchableOpacity onPress={this.add.bind(this)}><Text style={{fontSize: 20}}>+</Text></TouchableOpacity>
        <TouchableOpacity onPress={this.remove.bind(this)}><Text style={{fontSize: 20}}>-</Text></TouchableOpacity>
        <ListView
          renderRow={(item, sectionID, rowID)=>(
            <View key={rowID} style={{
              alignItems: 'center'
            }}>
              <Text style={{
                fontSize: 30
              }}>
                {item}
              </Text>
            </View>
          )}
          dataSource={this.state.dataSource}
        />
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
});
*/

// WORDS IN POEM EXERCISE //////////////////////////////////////////////////////
/*
export default class App extends React.Component {
  constructor(){
    super();
    this.state={
      numWords: 'Loading...'
    };
  }

  componentDidMount(){
    fetch('https://horizons-json-cors.s3.amazonaws.com/poem.txt')
    .then((resp)=>{
      var numWords = resp._bodyText.split(' ').length;
      this.setState({
        numWords
      })
    })
    .catch(function(error){
      alert('Error: ' + error);
    });
  }

  render() {
    return (
      <View style={{
        flex: 1,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Text>{this.state.numWords}</Text>
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
});
*/

// PRODUCT LIST EXERCISE /////////////////////////////////////////////////////
/*
export default class App extends React.Component {
  constructor(){
    super();
    var dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => (r1 != r2)
    });
    var data = ['Loading...'];
    this.state = {
      data: data,
      dataSource: dataSource.cloneWithRows(data)
    };
  }

  componentDidMount(){
    fetch('https://horizons-json-cors.s3.amazonaws.com/products.json')
    .then((resp)=>{
      return resp.json();
    })
    .then((json)=>{
      return Promise.all(json.map((item)=>(fetch(item.url))));
    })
    .then((responses)=>{
      return Promise.all(responses.map((resp)=>resp.json()));
    })
    .then((items)=>{
      const list = items.map((item)=>(item.name + ': ' + item.priceCents));
      this.setState({
        data: list,
        dataSource: this.state.dataSource.cloneWithRows(list)
      });
    })
    .catch((error)=>{
      alert('Error: ' + error);
    })
  }

  render() {
    return (
      <View style={{
        flex: 1,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <ListView
          renderRow={(item,sectionID,rowID)=>(
            <View key={rowID} style={{
              alignItems: 'center'
            }}>
              <Text style={{
                fontSize: 10
              }}>
                {item}
              </Text>
            </View>
          )}
          dataSource={this.state.dataSource}
        />
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
});

*/
