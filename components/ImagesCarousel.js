import React from 'react';
import { View, FlatList, Image, StyleSheet,Text } from 'react-native';

export default ({ images }) => {
    
  const renderItem = ({ item }) => {
    let source = item?.profile_path ? 
    `https://image.tmdb.org/t/p/w500/${item?.profile_path}` : 
    '';
    let image = source ? 
                <Image source={{ uri: source }} style={styles.image} /> :
                <Image source={require('../assets/person.png')} style={styles.image} />
     return  (   
     <View style={styles.itemContainer

     }>
        <View style={styles.imageContainer}>
         {image}
        </View>
      
        <View
        style={{
            width : '75%',
            height : 50,
            alignItems : 'center',
        }}
        >
          <Text style={styles.name}>{item?.name}</Text>
        </View>
        
     </View>)
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
 
  itemContainer :{
    width : 130,
    alignItems : 'center',
    justifyContent : 'center',
  },
  imageContainer : {
    width: 100,
    height: 100,
    borderRadius : 50,
    marginHorizontal: 5,
    borderRadius: 10,
    marginVertical :5,
    shadowColor: '#012326',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  image: {
    width : '100%',
    height : '100%',
    borderRadius : 50,
    
  },
  name : {
    fontSize :12,
    fontWeight :'bold',
    color : '#012326'
  }
});

