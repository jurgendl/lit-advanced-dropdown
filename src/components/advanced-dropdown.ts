import { LitElement, css, html } from 'lit'
import { customElement, state, query } from 'lit/decorators.js'
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
//import { classMap } from 'lit/directives/class-map.js';
//import { styleMap } from 'lit/directives/style-map.js';



class AdvancedDropdownOption {
	constructor(public value: string, public label: string) { }
}

@customElement('advanced-dropdown')
export class AdvancedDropdown extends LitElement {
	@state()
	options: AdvancedDropdownOption[] = [];

	constructor() {
		super();
		this.options = [
			new AdvancedDropdownOption('1', '<img src="https://picsum.photos/40?1"> option 1'),
			new AdvancedDropdownOption('2', '<img src="https://picsum.photos/40?2"> option 2'),
			new AdvancedDropdownOption('3', '<img src="https://picsum.photos/40?3"> option 3'),
			new AdvancedDropdownOption('4', '<img src="https://picsum.photos/40?4"> option 4'),
			new AdvancedDropdownOption('5', '<img src="https://picsum.photos/40?5"> option 5'),
			new AdvancedDropdownOption('6', '<img src="https://picsum.photos/40?6"> option 6'),
			new AdvancedDropdownOption('7', '<img src="https://picsum.photos/40?7"> option 7'),
			new AdvancedDropdownOption('8', '<img src="https://picsum.photos/40?8"> option 8'),
			new AdvancedDropdownOption('9', '<img src="https://picsum.photos/40?9"> option 9'),
			new AdvancedDropdownOption('10', '<img src="https://picsum.photos/40?10"> option 10'),
		];
	}

	render() {
		return html`
			<div class="advanced-dropdown">
				<input type="hidden" name="optionInput">
				<div class="selection">
					select an option
				</div>
				<div class="options" style="display: none;">
					${this.options.map(option => html`
						<div class="option" value="${option.value}">
							<div>
								${unsafeHTML(option.label)}
							</div>
						</div>
						`)}	
				</div>
			</div>
		`;
	}


	static styles = css`
		.advanced-dropdown {
			position: relative;
		}

		.advanced-dropdown .selection {
			border: 1pt solid black;
			min-height: 1em;
			padding: .5em 1em;
			/* make text unselectable */
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
		}

		.advanced-dropdown .selection:hover {
			cursor: pointer;
			background-color: lightgray;
		}

		.advanced-dropdown .options {
			position: absolute;
			top: 100%;
			left: 0;
			width: 100%;
			background-color: white;
			border: 1pt solid black;
			border-top: none;
			max-height: 20em;
			overflow-y: auto;
			display: grid;
			grid-template-rows: 1fr;
			grid-gap: 0em;
			padding: .5em;
		}

		.advanced-dropdown .options .option {
			padding: .5em;
			position: relative;
		}

		.advanced-dropdown .options .option:not(:first-child)::after {
			content: '';
			position: absolute;
			background-color: darkgray;
			z-index: 1;
			inline-size: 100%;
			block-size: 1pt;
			inset-inline-start: 0;
			inset-block-start: 0;
		}

		.advanced-dropdown .options .option:hover {
			cursor: pointer;
			background-color: lightgray;
		}

		.advanced-dropdown img {
			border-radius: 3px;
			border: 1pt solid lightgray;
		}
		`
}