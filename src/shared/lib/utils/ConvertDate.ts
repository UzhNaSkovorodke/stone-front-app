import Moment from 'moment';
import 'moment/locale/ru';

export const convertDate = (date: string): string => {
    const now = Moment(date);
    Moment.locale('ru');
    
    return now.format('DD MMMM YYYY');
}
