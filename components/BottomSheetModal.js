import React, { useState,useCallback, useEffect, useRef } from 'react';
import { View, StyleSheet,TouchableOpacity,  Keyboard} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
import Filter from './Filter';
import { showBottomsheet } from '../store/actions/MoviesListAction';
import constants from '../constants';
export default () => {
  const bottomSheetRef = useRef(null);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const initialSnapPoints = ['25%', '50%', '75%'];
  const keyboardSnapPoints = ['50%', '75%'];

  const dispatch = useDispatch();
  const { showBottomSheet, bottomSheetData } = useSelector(state => state.movies);

  const GetContent = () => {
    switch (bottomSheetData) {
      case 'filter':
        return <Filter />;
      default:
        return <View />;
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
      showBottomSheet &&bottomSheetRef.current.snapToIndex(1); // Adjust index based on your needs
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
      showBottomSheet && bottomSheetRef.current.snapToIndex(0); // Snap back to the initial position
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
      bottomSheetRef?.current?.snapToIndex(0);
      bottomSheetRef?.current?.close();
    };
  }, [showBottomSheet]);

  useEffect(() => {
    if (showBottomSheet) {
      bottomSheetRef.current?.snapToIndex(0);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [showBottomSheet]);

  

  const handleSheetChanges = (index) => {
    if (index === -1) {
      dispatch(showBottomsheet({
        showBottomSheet: false,
        type: '',
      }));
    }
  };

  return (
    <>
    {showBottomSheet && (
        <TouchableOpacity
         style={styles.backgroundOverlay} 
         onPress={()=>
          dispatch(showBottomsheet({
            showBottomSheet: false,
            type: '',
          }))

         }
         />
      )}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1} // Initial hidden state
        snapPoints={keyboardVisible ? keyboardSnapPoints : initialSnapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
        handleStyle={styles.handleStyle}
        backgroundStyle={styles.bottomSheetBackground}

      >
        <View
        style={styles.contentContainer}
      
        >
          {GetContent()}
        </View>
      </BottomSheet>

      
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    // flex: 1,
    backgroundColor: constants.colors.primary,
    
  },
  backgroundOverlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zindex:1, 
  },
  handleStyle: {
    backgroundColor : constants.colors.secondary,
    borderTopLeftRadius : 20,
    borderTopRightRadius : 20
  },
  bottomSheetBackground : {
    backgroundColor :constants.colors.primary,
    borderTopLeftRadius : 20,
    borderTopRightRadius : 20
  }
});