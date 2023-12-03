class PresentationController extends HTMLElement {
    constructor() {
        super();

        this.activeIndex = 0;
        this.elements = [];
        this.steppingNumber = 2;

        // Navigation controllers:
        // - buttons
        this.nextButton;
        this.previousButton;
        // - indexes
        this.nextIndex;
        this.previousIndex;
    }

    connectedCallback() {
        setTimeout(() => {
            this.elements = this.querySelectorAll('.main-section');
            this.container = this.querySelector('main');
            this.nextButton = this.querySelector('#next');
            this.previousButton = this.querySelector('#previous');
            this.nextIndex = this.querySelector('#nextIndex');
            this.previousIndex = this.querySelector('#previousIndex');

            this.nextButton.addEventListener('click', () => this.stepForwards());
            this.previousButton.addEventListener('click', () => this.stepBackwards());

            this.querySelector('nav').removeAttribute('hidden');
            this.setActivePresentation()
        }, 0);
    }

    setActivePresentation() {
        this.toggleButtonVisibility();
        this.container.replaceChildren(...Array.from({ length: this.steppingNumber }).map((_, index) => this.elements[this.activeIndex + index]))

        this.previousIndex.innerHTML = this.activeIndex.toLocaleString(undefined, { minimumIntegerDigits: 2 })
        this.nextIndex.innerHTML = (this.activeIndex + 1).toLocaleString(undefined, { minimumIntegerDigits: 2 })
    }

    toggleButtonVisibility() {
        if (this.activeIndex < this.elements.length - 2) {
            if (this.nextButton.hasAttribute('hidden')) {
                this.nextButton.removeAttribute('hidden');
            }
        } else {
            this.nextButton.setAttribute('hidden', true);
        }

        if (this.activeIndex > 0) {
            if (this.previousButton.hasAttribute('hidden')) {
                this.previousButton.removeAttribute('hidden');
            }
        } else {
            this.previousButton.setAttribute('hidden', true);
        }
    }

    stepForwards() {
        if (this.elements[this.activeIndex + this.steppingNumber]) {
            this.activeIndex += this.steppingNumber;
        }

        this.setActivePresentation()
    }

    stepBackwards() {
        if (this.elements[this.activeIndex - this.steppingNumber]) {
            this.activeIndex -= this.steppingNumber;
        }

        this.setActivePresentation()
    }

}

customElements.define('presentation-controller', PresentationController)
