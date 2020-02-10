import * as dto from './dto';
import * as html from './html';
import * as moment from 'moment';
import copy = require('clipboard-copy')
import ComponentsArray from './ComponentsArray';
import Countdown from './Countdown';
import UiComponent from './UiComponent';
import TwitchPlayer from './TwitchPlayer';
import Timestamp from './Timestamp'

export default class CurrentEvent implements UiComponent {
    constructor(private _event: dto.Event,
                private _timestamp: string) {
    }

    appendTo(entry: HTMLElement | null): void {
        new html.Div(
            new ComponentsArray([
                new Timestamp(this._timestamp),
                new html.Div(
                    new html.Href(
                        this._event.channel ? this._event.channel : "https://twitch.tv/nuffleee",
                        new html.Tag(
                            "i",
                            new html.Empty(),
                            {"class": "watch fas fa-external-link-alt fa-lg"}
                        ),
                        true
                    ),
                    {"class": "watch"}
                ),
                new html.H1(
                    new html.Href(
                        `${this._event.url}`,
                        new html.Text(`${this._event.title}`),
                        true
                    ),
                ),
                new Countdown(this._event.datetime, "started "),
                new html.Div(
                    new html.Href(
                        this._event.channel,
                        new html.Text(this._event.channel),
                        true
                    ),
                    {"class": "channel"}
                ),
                new html.Div(
                    new html.Markdown(`${this._event.description}`),
                    {"class": "description markdown"}
                ),
                new TwitchPlayer(new URL(this._event.channel).pathname.substring(1))
            ]),
            {
                "id": `_${this._event.datetime.utc().unix()}`,
                "class": "current event"
            }
        ).appendTo(entry);
    }
}
