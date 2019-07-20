import 'moment-timezone';
import * as moment from 'moment';
import Event from './Event';
import EventsForCurrentPeriod from './EventsForCurrentPeriod';
import FailedScheduleLoad from './FailedScheduleLoad'
import StateFromUrl from './StateFromUrl'
import Weekday from './Weekday'

new StateFromUrl(`https://gist.githubusercontent.com/Nufflee/a02f18f9195ca8dd3b5dbae4a67427a0/raw/Stream%2520Schedule.json?timestamp=${moment.utc().unix()}`)
    .asPromise()
    .then(
        (state) => new EventsForCurrentPeriod(state),
        () => new FailedScheduleLoad()
    )
    .then((c) => c.appendTo(document.getElementById('root')));
