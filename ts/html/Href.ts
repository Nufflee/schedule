import UiComponent from '../UiComponent';
import Tag from './Tag';

export default class Href implements UiComponent {
    constructor(private _url: string,
                private _body?: UiComponent,
                private _openInNewTab: boolean = false,
                private _attrs?: {[key: string]: any}) {
    }

    appendTo(entry: HTMLElement | null): void {
        new Tag(
            "a",
            this._body,
            Object.assign({"href": this._url, "target": this._openInNewTab ? "_blank" : ""}, this._attrs),
        ).appendTo(entry);
    }
}
