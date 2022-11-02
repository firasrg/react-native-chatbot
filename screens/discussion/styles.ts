import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  msgContainer:{
    top: "-4%",
    height: "102%",
    flexDirection: "column",
    backgroundColor: "#ecf9fc"
  },
  quickReply:{
    flexDirection: "column",
    borderRadius: 2,
  },
  quickReplyItem:{
    width: "90%",
    backgroundColor: "transparent",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 10,
  },
  quickReplyText:{
    color: "black",
    bottom: "50%",
    left: "2%",
  },
  botAvatarImg:{
    width: 40,
    height: 40, 
    backgroundColor: "transparent"
  }
});
