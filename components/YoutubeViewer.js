import React, {  useState,useCallback } from "react";
import { View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";


// const getId = (url)=>{
//     let URL = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
//     return (URL[2] !== undefined) ? URL[2].split(/[^0-9a-z_\-]/i)[0] : URL[0]; 
// };

export default ({
    videoId
})=>{
    const [playing, setPlaying] = useState(true);

    let id = videoId ?? "";


    const onStateChange = useCallback((state) => {
        if (state === "ended") {
          setPlaying(false);
          // Alert.alert("انتهي الفيديو");
        }
      }, []);

    return (
      <View
      style={{
        flex:1,
        width :'100%',
        height : "100%",
       
        justifyContent : 'center'
      }}
      >
        <YoutubePlayer
          height={'100%'}
          play={playing}
          videoId={id ?? ""}
          onChangeState={onStateChange}
          allowWebViewZoom={true}
        />
      </View>
      
    )
};