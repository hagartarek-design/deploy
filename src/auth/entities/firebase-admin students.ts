import { Module, Global } from '@nestjs/common';
import * as admin from 'firebase-admin';

const firebaseAdminProvider = {
  provide: 'FIREBASE_ADMIN',

  useFactory: () => {
    if (admin.apps.length === 0) {

      const serviceAccount = {
        project_id: process.env.FIREBASE_PROJECT_ID,
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
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
  providers: [firebaseAdminProvider],
  exports: [firebaseAdminProvider],
})
export class FirebaseAdminModule {}