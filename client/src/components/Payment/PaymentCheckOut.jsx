import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { Mutation } from 'react-apollo';
import { Modal, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import axios from 'axios';
import { UpdateCredit } from '../../mutations/mutations.js';
import { usdToCredit } from './helper.js';

class PaymentCheckOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usd: '',
      credits: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handlePayment = this.handlePayment.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
      credits: usdToCredit(evt.target.value),
    });
  }

  handlePayment(UpdateCredit) {
    UpdateCredit({ variables: { id: this.props.id, credit: this.state.credits } }).then(() => {
      this.props.handleClose();
      this.props.data.refetch();
      alert(`You received ${this.state.credits}`);
    });
  }

  async submit(UpdateCredit) {
    let token = await this.props.stripe.createToken({ name: this.props.username });
    console.log(token);

    axios
      .post('/charge', {
        usd: this.state.usd,
        token: token,
      })
      .then(res => {
        if (res.data.paid) {
          console.log('Purchase Complete!', res.data);
          this.handlePayment(UpdateCredit);
        }
      });
  }

  render() {
    const tooltipOneDollar = (
      <Tooltip id="modal-tooltip">
        <em>0 bonus credit</em>
      </Tooltip>
    );
    const tooltipFiveDollar = (
      <Tooltip id="modal-tooltip">
        <em>50 bonus credit</em>
      </Tooltip>
    );
    const tooltipTenDollar = (
      <Tooltip id="modal-tooltip">
        <em>150 bonus credit</em>
      </Tooltip>
    );
    const tooltipTwentyDollar = (
      <Tooltip id="modal-tooltip">
        <em>450 bonus credit</em>
      </Tooltip>
    );
    const tooltipFiftyDollar = (
      <Tooltip id="modal-tooltip">
        <em>1500 bonus credit</em>
      </Tooltip>
    );
    const tooltipHundredDollar = (
      <Tooltip id="modal-tooltip">
        <em>4000 bonus credit</em>
      </Tooltip>
    );
    return (
      <Mutation mutation={UpdateCredit}>
        {(UpdateCredit, { loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error...</p>;
          return (
            <div>
              <Modal show={this.props.showComponent} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Transaction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <h4>Limited Offer</h4>
                  <p>
                    <em>
                      <b>100</b>{' '}
                      <OverlayTrigger overlay={tooltipOneDollar}>
                        <a href="#tooltipOneDollar">credit</a>
                      </OverlayTrigger>{' '}
                      for <b>1</b> usd
                    </em>
                    <br />
                    <em>
                      <b>550</b>{' '}
                      <OverlayTrigger overlay={tooltipFiveDollar}>
                        <a href="#tooltipFiveDollar">credit</a>
                      </OverlayTrigger>{' '}
                      for <b>5</b> usd
                    </em>
                    <br />
                    <em>
                      <b>1150</b>{' '}
                      <OverlayTrigger overlay={tooltipTenDollar}>
                        <a href="#tooltipTenDollar">credit</a>
                      </OverlayTrigger>{' '}
                      for <b>10</b> usd
                    </em>
                    <br />
                    <em>
                      <b>2450</b>{' '}
                      <OverlayTrigger overlay={tooltipTwentyDollar}>
                        <a href="#tooltipTwentyDollar">credit</a>
                      </OverlayTrigger>{' '}
                      for <b>20</b> usd
                    </em>
                    <br />
                    <em>
                      <b>6500</b>{' '}
                      <OverlayTrigger overlay={tooltipFiftyDollar}>
                        <a href="#tooltipFiftyDollar">credit</a>
                      </OverlayTrigger>{' '}
                      for <b>50</b> usd
                    </em>
                    <br />
                    <em>
                      <b>14000</b>{' '}
                      <OverlayTrigger overlay={tooltipHundredDollar}>
                        <a href="#tooltipHundredDollar">credit</a>
                      </OverlayTrigger>{' '}
                      for <b>100</b> usd
                    </em>
                    <br />
                  </p>

                  <hr />

                  <img
                    src="http://www.pngmart.com/files/3/Major-Credit-Card-Logo-PNG-Clipart.png"
                    style={{ width: '450px', height: '80px' }}
                  />

                  <hr />

                  <div>
                    <p>Please declare amount in usd</p>

                    <div className="form-group">
                      <span>$</span>
                      <input
                        type="number"
                        placeholder="usd"
                        min="0"
                        name="usd"
                        onChange={this.handleChange}
                      />
                      <small>
                        <em> You will receive {this.state.credits} credits!</em>
                      </small>
                    </div>
                  </div>

                  <hr />

                  <p>Would you like to complete the purchase?</p>
                  <div className="checkout">
                    <form
                      onClick={() => {
                        this.submit(UpdateCredit);
                      }}
                      onSubmit={() => {
                        this.submit(UpdateCredit);
                      }}
                    >
                      <div className="card-field">
                        <CardElement />
                        <br />
                      </div>
                      <Button>Confirm Order</Button>
                    </form>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={this.props.handleClose}>Close</Button>
                </Modal.Footer>
              </Modal>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default injectStripe(PaymentCheckOut);
