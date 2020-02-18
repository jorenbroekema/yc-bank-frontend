import { css, html, LitElement } from 'lit-element';

class YcTransaction extends LitElement {
  static get properties() {
    return {
      data: {
        type: Object,
      },
    };
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        font-family: sans-serif;
        max-width: 300px;
        padding: 20px;
        background-color: #efefef;
      }

      .name {
        flex-grow: 1;
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchTransaction('../mock-data/transaction-1.json');
  }

  async fetchTransaction(path) {
    const response = await fetch(path);
    const data = await response.json();

    // Fake a loading delay of 1 second ;)
    setTimeout(() => {
      // Set the data to the data prop which causes a re-render of the template
      this.data = data;
    }, 1000);
  }

  render() {
    return html`
      ${this.data
        ? html`
            <div class="name">${this.data.fromName}</div>
            <div>
              ${new Intl.NumberFormat(document.documentElement.lang, {
                style: 'currency',
                currency: this.data.currency,
                currencyDisplay: 'code',
              }).format(this.data.amount)}
            </div>
          `
        : `Loading...`}
    `;
  }
}
customElements.define('yc-transaction', YcTransaction);
