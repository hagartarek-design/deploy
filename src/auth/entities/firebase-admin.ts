import { Module, Global } from '@nestjs/common';
import * as admin from 'firebase-admin';

const firebaseAdminProvider = {
  provide: 'FIREBASE_ADMIN',

  useFactory: () => {
    const appName = 'admin-app';

    const existingApp = admin.apps.find(app => app.name === appName);

    if (existingApp) {
      return existingApp;
    }

    const serviceAccount = {
      project_id: process.env.FIREBASE_PROJECT_ID,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    };

    return admin.initializeApp(
      {
        credential: admin.credential.cert(
          serviceAccount as admin.ServiceAccount,
        ),
      },
      appName,
    );
  },
};
@Global()
@Module({
  providers: [firebaseAdminProvider],
  exports: [firebaseAdminProvider],
})
export class FirebaseAdminModule {}