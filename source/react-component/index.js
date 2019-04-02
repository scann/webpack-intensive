// Core
import React, { Component } from 'react';
import { render } from 'react-dom';
import { hot } from 'react-hot-loader';

// Styles
import Styles from './postcss.css';

const Clicker = hot(module)(
    class extends Component {
        state = {
            count: 34,
        };

        inc = () => void this.setState(({ count }) => ({
            count: count + 1,
        }));

        dec = () => void this.setState(({ count }) => ({
            count: count - 1,
        }));

        render () {
            const { count } = this.state;

            return (
                <section
                    className = { Styles.clicker }
                    style = { {
                        '--mainColor': 'rebeccapurple',
                        '--headingFontSize': this.state.count + 'px',
                    } }>
                    <h1>Counter: {count}</h1>
                    <button onClick = { this.inc }>Increment</button>
                    <button onClick = { this.dec }>Decrement</button>
                </section>
            );
        }
    },
);

render(<Clicker />, document.getElementById('app'));
