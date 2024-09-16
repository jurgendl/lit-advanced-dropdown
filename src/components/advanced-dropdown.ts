import { LitElement, /*css,*/ html, unsafeCSS } from 'lit'
import { customElement, state, /*query,*/ property } from 'lit/decorators.js'
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
//import { classMap } from 'lit/directives/class-map.js';
//import { styleMap } from 'lit/directives/style-map.js';
import styleString from "./advanced-dropdown.scss?inline";


class AdvancedDropdownOption {
	constructor(public value: string, public label: string) { }
}

@customElement('advanced-dropdown')
export class AdvancedDropdown extends LitElement {
	static styles = unsafeCSS(styleString);

	// Property to store the name of the hidden input
	@property({ type: String }) inputName!: string;

	@state() options: AdvancedDropdownOption[] = [];

	@state() selection: AdvancedDropdownOption = new AdvancedDropdownOption('', 'select an option');

	@state() isOptionsVisible = false;

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

	// Ensure `inputName` is provided, otherwise throw an error
	// firstUpdated = lifecycle method
	firstUpdated() {
		if (!this.inputName) {
			throw new Error('inputName is required but was not provided');
		}
	}

	// Toggles the visibility of the dropdown
	toggleOptions() {
		this.isOptionsVisible = !this.isOptionsVisible; // Toggle the visibility

		if (this.isOptionsVisible) {
			// Add document click listener when the dropdown is opened
			document.addEventListener('click', this.handleClickOutside, true);
		} else {
			// Remove document click listener when the dropdown is closed
			document.removeEventListener('click', this.handleClickOutside, true);
		}
	}

	selectOption(option: AdvancedDropdownOption) {
		this.selection = option; // Update the selection with the clicked option
		this.isOptionsVisible = false; // Hide the options after selection

		document.removeEventListener('click', this.handleClickOutside, true);
	}

	// Method to handle clicks outside the dropdown
	handleClickOutside = (event: Event) => {
		const path = event.composedPath(); // To handle shadow DOM clicks
		const dropdown = this.shadowRoot?.querySelector('.advanced-dropdown');
		if (!dropdown || !path.includes(dropdown)) {
			this.isOptionsVisible = false;
			document.removeEventListener('click', this.handleClickOutside, true);
		}
	};

	render() {
		return html`
			<div class="advanced-dropdown">
				<!-- Hidden input value bound to the selection value, and name bound to the inputName property -->
				<input type="hidden" .name="${this.inputName}" .value="${this.selection.value}">
				<!-- Dropdown selection area -->
				<div class="selection" @click="${this.toggleOptions}">
					<div value="${this.selection.value}">
						${unsafeHTML(this.selection.label)}
					</div>
				</div>
				<!-- Dropdown options -->
				<div class="options" style="display: ${this.isOptionsVisible ? 'grid' : 'none'};">
					${this.options.map(option => html`
						<div class="option" value="${option.value}" @click="${() => this.selectOption(option)}">
							${unsafeHTML(option.label)}
						</div>
					`)}	
				</div>
			</div>
		`;
	}
}