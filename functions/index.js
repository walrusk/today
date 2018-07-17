const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

// exports.createHomePoint = functions.auth.user().onCreate(event => {
//     return admin.firestore().collection('points')
//         .where('_owner', '==', event.data.uid)
//         .where('_parent', '==', null)
//         .limit(1).get().then(querySnapshot => {
//             if (querySnapshot.empty) {
//                 admin.firestore().collection('points').add({
//                     _fields: [],
//                     _sequence: 0,
//                     _created: admin.firestore.FieldValue.serverTimestamp(),
//                     _owner: event.data.uid,
//                     _parent: null,
//                     name: 'Home',
//                 });
//             }
//             return querySnapshot;
//         });
// });

exports.blockSignup = functions.auth.user().onCreate(event => {
    return admin.auth().updateUser(event.data.uid, { disabled: true })
        .then(userRecord => console.log('Auto blocked user', userRecord.toJSON()))
	    .catch(error => console.log('Error auto blocking:', error));
});
