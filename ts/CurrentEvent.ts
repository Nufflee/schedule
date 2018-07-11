import * as $ from 'jquery';
import * as dto from './dto';
import * as moment from 'moment';
import Countdown from './Countdown';
import UiComponent from './UiComponent';

export default class CurrentEvent implements UiComponent {
    constructor(private _event: dto.Event) {
    }

    appendTo(entry: JQuery<HTMLElement>): JQuery<HTMLElement> {
        let element = $(`<div id="_${this._event.datetime.utc().unix()}" class="current event">`);
        entry.append(element);

        element.append($(`<div class="timestamp"><a href="#_${this._event.datetime.utc().unix()}">${this._event.datetime.utc().unix()}</a></div>`));
        element.append($(`<h1><a href="${this._event.url}">${this._event.title}</a></h1>`));
        new Countdown(this._event.datetime, "started ").appendTo(element);
        element.append($(`<div class="description markdown">${this._event.description}</div>`));

        return entry;
    }
}