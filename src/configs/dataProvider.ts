import {
    FirebaseAuthProvider,
    FirebaseDataProvider,
} from 'react-admin-firebase';
import { firebaseConfig as config, app } from './firebaseConfig';

const options = {
    app,
};

export const dataProvider = FirebaseDataProvider(config, options);
export const authProvider = FirebaseAuthProvider(config, options);