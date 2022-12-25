import { IUser } from '../interfaces/user';

class LocalStorageUserData {
    getUserData(): string | null {
        return localStorage.getItem('user');
    }

    setUserData(data: IUser) {
        return localStorage.setItem('user', JSON.stringify(data));
    }
}

export const localStorageUserData = new LocalStorageUserData();
