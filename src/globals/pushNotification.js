// import PushNotification from "react-native-push-notification";
// import Firesase from '@react-native-firebase/app'
// export const PushNotify=()=>{
//     Firesase.initializeApp();
    
//     PushNotification.configure({
   
//       onRegister: function (token) {
//         console.log("TOKEN:", token);
//       },
    
    
//       onNotification: function (notification) {
//         console.log("NOTIFICATION:", notification);
//       },
    
//       onAction: function (notification) {
//         console.log("ACTION:", notification.action);
//         console.log("NOTIFICATION:", notification);
    
//         // process the action
//       },
    
     
//       onRegistrationError: function(err) {
//         console.error(err.message, err);
//       },
    
     
//       permissions: {
//         alert: true,
//         badge: true,
//         sound: true,
//       },
    
    
//       popInitialNotification: true,
    
    
//       requestPermissions: true,
//     });
   
// }