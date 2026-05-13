// // import * as admin from 'firebase-admin';
// // admin.initializeApp({
// //   credential: admin.credential.applicationDefault(),
// // });

// // export { admin };
// import { Module, Global } from '@nestjs/common';
// import * as admin from 'firebase-admin';

// const firebaseteacherProvider = {
//   provide: 'FIREBASE_ADMIN',
//   useFactory: () => {
//     if (admin.apps.length === 0) {
//       admin.initializeApp({
//   credential: admin.credential.cert({
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//     privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
//   }),
// });
//     }
//     return admin;
//   },
// };

// @Global()
// @Module({
//   providers: [firebaseteacherProvider],
//   exports: [firebaseteacherProvider],
// })
// export class FirebaseAdminModule {}
import { Module, Global } from '@nestjs/common';
import * as admin from 'firebase-admin';

const firebaseteacherProvider = {
  provide: 'FIREBASE_TEACHER',

  useFactory: () => {
    if (admin.apps.length === 0) {

      const serviceAccount = {
        project_id: process.env.FIREBASE_PROJECT_ID2,
        client_email: process.env.FIREBASE_CLIENT_EMAIL2,
        private_key: process.env.FIREBASE_PRIVATE_KEY2?.replace(/\\n/g, '\n'),
      };

      console.log(serviceAccount);

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      });
    }

    return admin;
  },
};

@Global()
@Module({
  providers: [firebaseteacherProvider],
  exports: [firebaseteacherProvider],
})
export class FirebaseAdminModule {}