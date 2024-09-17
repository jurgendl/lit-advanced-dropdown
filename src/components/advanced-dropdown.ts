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
	// Property to store the name of the hidden input
	@property({ type: String }) inputName!: string;

	@property({ type: Array }) options: AdvancedDropdownOption[] = [];

	@state() selection: AdvancedDropdownOption | null = null;

	@state() isOptionsVisible = false;

	constructor() {
		super();
	}

	/*createRenderRoot(): ShadowRoot | this {
		return this;
	}*/

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
		this.adjustListener();
	}

	adjustListener() {
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
		this.adjustListener();
	}

	// Method to handle clicks outside the dropdown
	handleClickOutside = (event: Event) => {
		const path = event.composedPath(); // To handle shadow DOM clicks
		const dropdown = this.shadowRoot?.querySelector('.advanced-dropdown');
		if (!dropdown || !path.includes(dropdown)) {
			this.isOptionsVisible = false;
			this.adjustListener();
		}
	};

	render() {
		return html`
			<div class="advanced-dropdown">
				<!-- Hidden input value bound to the selection value, and name bound to the inputName property -->
				<input type="hidden" .name="${this.inputName}" .id="${this.inputName}" .value="${this.selection?.value || ''}">
				<!-- Dropdown selection area -->
				<div class="selection" @click="${this.toggleOptions}">
					<div class="display" value="${this.selection?.value || ''}">
						${this.selection ? unsafeHTML(this.selection.label) : '...'}
					</div>
				</div>
				<!-- Dropdown options -->
				<div class="options" style="display: ${this.isOptionsVisible ? 'grid' : 'none'};">
					${this.options.map(option => html`
						<div class="option display" value="${option.value}" @click="${() => this.selectOption(option)}">
							${unsafeHTML(option.label)}
						</div>
					`)}	
				</div>
			</div>
		`;
	}

	// needs to be static and last
	static styles = unsafeCSS(styleString);
}

// error
/*declare global {
	interface HTMLElementTagNameMap {
		'advanced-dropdown': AdvancedDropdown
	}
}*/