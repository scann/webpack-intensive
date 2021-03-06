// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';

// Styles
import Styles from './postcss.css';
import Sass from './styles.scss';
import kitty from '../theme/images/kitty.jpg';
import { ReactComponent as ReactLogoComponent } from '../theme/images/react.svg';
import reactLogo from '../theme/images/react.svg';

import { Button } from './Button';

class Clicker extends Component {
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
                        '--mainColor':       'rebeccapurple',
                        '--headingFontSize': `${this.state.count}px`,
                    } }>
                    <ReactLogoComponent width = { 100 } />

                    <img src = { reactLogo } />
                    <img src = { kitty } />
                    <h1 className = { Sass.test }>Тест: {count}</h1>
                    <Button onClick = { this.inc }>INCREMENT</Button>
                    <Button onClick = { this.dec }>Decrement</Button>
                </section>
            );
        }
}

export default hot(Clicker);
