import 'react-redux';
import { AppDispatch, RootState } from '../redux';

declare module 'react-redux' {
    interface DefaultRootState extends RootState {}
}

declare module 'react-redux' {
    interface Dispatch extends AppDispatch {}
}
