// Import necessary libraries
import React, { forwardRef, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

const BottomSheetComponent = forwardRef(({ height, content }, ref) => {
  // Define snap points, the height of the BottomSheet
  const snapPoints = useMemo(() => [height], [height]);

  // Render function for BottomSheet content
  const renderContent = useCallback(() => {
    return (
      <View style={styles.contentContainer}>
        {content}
      </View>
    );
  }, [content]);

  return (
    <BottomSheet
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
    >
      {renderContent()}
    </BottomSheet>
  );
});

// Default styles
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BottomSheetComponent;